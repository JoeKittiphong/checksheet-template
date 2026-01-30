import axios from 'axios';

export const saveForm = async ({ apiEndpoint, formId, meta, formData, status }) => {
    // Prepare payload
    const payload = {
        id: formId, // Include ID (null if new)
        department: meta.department,
        model: meta.model,
        as_group: meta.as_group,
        checksheet_name: meta.checksheet_name,
        machine_no: formData.machine_no || "UNKNOWN", // Get from Cover Page
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
    const id = params.get("id");
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
