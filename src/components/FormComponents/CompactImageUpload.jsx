import React, { useState, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import axios from 'axios';
import { Camera, Loader2, X, Image, ZoomIn } from 'lucide-react';

/**
 * CompactImageUpload Component
 * 
 * A compact image upload component that displays "ภาพ" text instead of the actual image.
 * Clicking on "ภาพ" opens a modal to view the full image.
 * 
 * @param {Object} props
 * @param {string} props.name - Form field name to store the filename
 * @param {string} props.apiEndpoint - Base API endpoint (e.g. http://localhost:3000/api)
 * @param {string} props.uploadPath - Upload route path (default: '/upload/assy')
 * @param {string} props.uploadFolder - Static folder path for viewing (default: 'assy_problem_images')
 * @param {string} props.label - Label text for upload button (default: "เพิ่มภาพ")
 * @param {string} props.viewLabel - Label text when image exists (default: "ภาพ")
 * @param {boolean} props.deferred - If true, store File object instead of immediate upload
 * @param {Object} props.extraData - Extra form data to send with upload (e.g. { machine_no: 'NO.1' })
 */
const CompactImageUpload = ({
    name,
    apiEndpoint,
    uploadPath = '/upload/assy',
    uploadFolder = 'assy_problem_images',
    label = "เพิ่มภาพ",
    viewLabel = "ภาพ",
    deferred = false,
    extraData = {},
    className = ""
}) => {
    const { register, setValue, control } = useFormContext();
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    // Watch current value
    const currentFile = useWatch({ name, control });

    // Determine Image URL
    let imageUrl = null;
    if (currentFile) {
        if (currentFile instanceof File) {
            imageUrl = URL.createObjectURL(currentFile);
        } else if (typeof currentFile === 'string' && apiEndpoint) {
            // Remove trailing /api/ and ensure it's a string
            const safeEndpoint = String(apiEndpoint);
            const staticBase = safeEndpoint.replace(/\/api\/?$/, '');

            if (currentFile.startsWith('http')) {
                imageUrl = currentFile;
            } else {
                imageUrl = `${staticBase}/uploads/${uploadFolder}/${currentFile}`;
            }
        }
    }

    // Resize image using Canvas API (client-side)
    const resizeImage = (file, maxWidth = 1200) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    // Check if resize needed
                    if (img.width <= maxWidth) {
                        resolve(file); // No resize needed
                        return;
                    }

                    // Calculate new dimensions
                    const ratio = maxWidth / img.width;
                    const newWidth = maxWidth;
                    const newHeight = img.height * ratio;

                    // Create canvas and resize
                    const canvas = document.createElement('canvas');
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Convert to blob
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(resizedFile);
                    }, 'image/jpeg', 0.85);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Helper to delete old file from server
    const deleteOldFile = async (filename) => {
        if (filename && typeof filename === 'string') {
            try {
                await axios.delete(`${apiEndpoint}/api/upload/delete`, {
                    data: {
                        filename: filename,
                        folder: uploadFolder
                    },
                    withCredentials: true
                });
                console.log('File deleted from server:', filename);
            } catch (err) {
                console.warn('Could not delete file from server:', err.message);
            }
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Delete old file if it exists on server
        if (currentFile && typeof currentFile === 'string') {
            await deleteOldFile(currentFile);
        }

        // Resize image before processing
        const resizedFile = await resizeImage(file, 1200);

        if (deferred) {
            setValue(name, resizedFile, { shouldDirty: true });
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        // Immediate Mode
        setUploading(true);
        const formData = new FormData();
        formData.append('image', resizedFile);

        // Append extra data (e.g. machine_no for folder structure)
        Object.entries(extraData).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            const res = await axios.post(`${apiEndpoint}${uploadPath}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                setValue(name, res.data.filename, { shouldDirty: true });
            } else {
                alert('Upload failed: ' + res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleRemove = async (e) => {
        e.stopPropagation();
        if (!window.confirm("คุณต้องการลบภาพนี้ใช่หรือไม่?")) {
            return;
        }
        await deleteOldFile(currentFile);
        setValue(name, null, { shouldDirty: true });
        setShowModal(false);
    };

    const handleUploadClick = () => {
        if (!uploading && inputRef.current) {
            // If image already exists, ask for confirmation before changing
            if (currentFile) {
                if (!window.confirm("คุณต้องการเปลี่ยนภาพใช่หรือไม่? (ภาพเก่าจะถูกลบออกจากระบบทันที)")) {
                    return;
                }
            }
            inputRef.current.click();
        }
    };

    const handleViewClick = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    return (
        <>
            {/* Registered hidden input */}
            <input type="hidden" {...register(name)} />

            {/* Compact Display */}
            <div className={`inline-flex items-center gap-1 ${className}`}>
                {uploading ? (
                    <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>กำลังอัปโหลด...</span>
                    </span>
                ) : currentFile ? (
                    <button
                        type="button"
                        onClick={handleViewClick}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded transition-colors"
                    >
                        <Image className="w-4 h-4" />
                        <span>{viewLabel}</span>
                        <ZoomIn className="w-3 h-3 opacity-50" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded border border-dashed border-gray-400 transition-colors"
                    >
                        <Camera className="w-4 h-4" />
                        <span>{label}</span>
                    </button>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />

            {/* Image Modal */}
            {showModal && imageUrl && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b">
                            <span className="font-medium text-slate-700 text-sm">ดูภาพ</span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                                >
                                    เปลี่ยนภาพ
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                                >
                                    ลบ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="p-4 flex items-center justify-center bg-slate-50">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompactImageUpload;
