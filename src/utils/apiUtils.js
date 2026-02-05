import axios from 'axios';

/**
 * Compresses an image file using Canvas API
 * @param {File} file - Original file
 * @param {Object} options - { maxWidth, quality }
 * @returns {Promise<Blob>} - Compressed Blob
 */
const compressImage = (file, { maxWidth = 1200, quality = 0.7 } = {}) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Resize logic
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to Blob (Force JPEG for better compression)
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            // Create a new file from the blob to preserve original filename extension (but as .jpg)
                            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error('Canvas toBlob failed'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

export const saveForm = async ({ apiEndpoint, formId, meta, formData, status }) => {
    // Prepare payload
    // Extract Metadata from form inputs if available (Priority: Form Data > Meta > Default)
    // Note: ASSY_PROBLEM uses mc_model/mc_model_input and mc_no/mc_no_input
    const model = formData.mc_model || formData.mc_model_input || formData.model || meta.model || "UNKNOWN";
    const machineNo = formData.mc_no || formData.mc_no_input || formData.machine_no || meta.machine_no || "UNKNOWN";

    // Determine AS Group if not set in meta (try to derive from form checkboxes like div_semi etc.)
    // But usually meta.as_group is correct for the template. If dynamic, logic might be needed.
    // For now, stick to meta unless we need to override.

    const payload = {
        id: formId, // Include ID (null if new)
        department: meta.department,
        model: model,
        as_group: meta.as_group,
        checksheet_name: meta.checksheet_name,
        machine_no: machineNo,
        checksheet_data: formData,
        status: status || "work_in_progress" // Default to work_in_progress if not specified (e.g. regular save)
    };

    try {
        const response = await axios.post(`${apiEndpoint}/api/save-form`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Ensure cookies are sent if needed
        });

        const result = response.data;

        if (result.success) {
            return { success: true, message: "บันทึกข้อมูลเรียบร้อยแล้ว!", data: result.data };
        } else {
            throw new Error(result.error || "Save failed");
        }
    } catch (error) {
        console.error("Error saving form:", error);
        // Axios error handling
        const errorMessage = error.response?.data?.error || error.message || "เกิดข้อผิดพลาดในการบันทึก";
        throw new Error(errorMessage);
    }
};

export const loadForm = async ({ apiEndpoint, searchParams, meta }) => {
    const params = new URLSearchParams(searchParams);
    let id = params.get("id");

    if (!id) {
        // More robust fallback: Check full URL and Pathname for id= pattern
        const fullUrl = window.location.href;
        const idMatch = fullUrl.match(/[?&/]id=([^&?/]+)/);
        if (idMatch) {
            id = idMatch[1];
        }
    }

    const machine_no = params.get("machine_no");

    let url = null;

    if (id) {
        url = `${apiEndpoint}/api/load-form/${id}`;
    } else if (machine_no) {
        url = `${apiEndpoint}/api/load-form-by-machine?machine_no=${machine_no}&checksheet_name=${meta.checksheet_name}`;
    } else {
        return null; // No ID or Machine No to load
    }

    try {
        const response = await axios.get(url, {
            withCredentials: true
        });

        const result = response.data;
        if (result.success && result.data) {
            return result.data;
        }
    } catch (error) {
        console.error("Error loading form data:", error);
        throw error; // Re-throw to let component handle if needed
    }

    return null;
};

export const deleteForm = async ({ apiEndpoint, formId }) => {
    try {
        const response = await axios.delete(`${apiEndpoint}/api/delete-form/${formId}`, {
            withCredentials: true
        });

        const result = response.data;
        if (result.success) {
            return { success: true, message: "ลบฟอร์มเรียบร้อยแล้ว (Deleted successfully)" };
        } else {
            throw new Error(result.error || "Delete failed");
        }
    } catch (error) {
        console.error("Error deleting form:", error);
        // Extract error message
        const errorMessage = error.response?.data?.error || error.message || "เกิดข้อผิดพลาดในการลบ";

        // Pass status code for specialized handling (e.g. 403 Forbidden)
        const status = error.response?.status;

        throw { message: errorMessage, status };
    }
};

export const uploadPendingFiles = async (formData, apiEndpoint) => {
    const updatedData = { ...formData };
    let hasChanges = false;

    // Simple shallow check for now (expand to recursive if needed for nested files)
    for (const key in updatedData) {
        const value = updatedData[key];

        if (value instanceof File) {
            // Found a file, compress it first
            console.log(`Original size: ${(value.size / 1024).toFixed(2)} KB`);
            const compressedFile = await compressImage(value);
            console.log(`Compressed size: ${(compressedFile.size / 1024).toFixed(2)} KB`);

            // Found a file, upload it
            const uploadFormData = new FormData();

            // Append Metadata for Filename
            const model = updatedData.mc_model || updatedData.mc_model_input || updatedData.model || 'UNKNOWN';
            const machine = updatedData.mc_no || updatedData.mc_no_input || updatedData.machine_no || updatedData.machineNo || 'UNKNOWN';

            // Determine AS Group from div fields
            let asGroup = 'OTHER';
            const divMap = {
                'div_semi': 'SEMI',
                'div_body': 'BODY',
                'div_mc': 'MC_CHECK',
                'div_insp': 'INSPECTION',
                'div_acc': 'ACCURACY',
                'div_other': 'OTHER'
            };

            for (const [field, label] of Object.entries(divMap)) {
                // Check for truthy value (RHF might store true/false or other truthy values)
                if (updatedData[field]) {
                    asGroup = label;
                    break;
                }
            }

            uploadFormData.append('model', model);
            uploadFormData.append('machine_no', machine);
            uploadFormData.append('as_group', asGroup);

            // Append Image LAST
            uploadFormData.append('image', compressedFile);

            // Determine Upload Route based on Field Name
            // Double Check fields usually contain '_dc_' and '_image'
            const isDoubleCheck = key.includes('_dc_') && key.includes('_image');
            const uploadPath = isDoubleCheck ? '/api/upload/double-check' : '/api/upload/assy';

            if (isDoubleCheck) {
                // Key format: pXX_dc_ROWID_cSTEP_image
                const keyParts = key.split('_');
                if (keyParts.length >= 4) {
                    const rowId = keyParts[2];
                    const stepMatch = keyParts[3].match(/c(\d+)/);
                    if (stepMatch) uploadFormData.append('step', stepMatch[1]);

                    // Retrieve Part Name from hidden field if available
                    // Hidden field format: pXX_dc_ROWID_partName
                    // Note: We need the original prefix which is the same as the image key's first two parts
                    const prefix = `${keyParts[0]}_${keyParts[1]}`;
                    const partNameField = `${prefix}_${rowId}_partName`;
                    const partName = updatedData[partNameField];

                    if (partName) uploadFormData.append('part_name', partName);
                    uploadFormData.append('row_id', rowId);
                }
            }

            try {
                const res = await axios.post(`${apiEndpoint}${uploadPath}`, uploadFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                });

                if (res.data.success) {
                    updatedData[key] = res.data.filename;
                    hasChanges = true;
                } else {
                    throw new Error(`Upload failed for ${key}: ${res.data.message}`);
                }
            } catch (err) {
                console.error(err);
                throw new Error(`Upload error for ${key}: ${err.message}`);
            }
        }
    }

    return { updatedData, hasChanges };
};
