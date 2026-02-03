import React, { useState, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import axios from 'axios';
import { Camera, Image, X, ZoomIn, Loader2, Square, Circle, Triangle } from 'lucide-react';

/**
 * ShapedCheckGroup Component
 * 
 * Displays a group of 3 shaped checkboxes (Square, Circle, Triangle) with camera/image buttons below each.
 * - Square (□) = Check 1 (By Final)
 * - Circle (○) = Check 2 (By FG Inspection)
 * - Triangle (△) = Check 3 (By Double Check)
 * 
 * @param {Object} props
 * @param {string} props.name - Base field name (e.g. "p06_check_area1")
 * @param {string} props.apiEndpoint - Base API endpoint
 * @param {string} props.uploadFolder - Upload folder (default: 'double_check')
 * @param {Object} props.extraData - Extra data for upload (model, machine_no, etc.)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.required - If true, all check fields are required (default: false)
 * @param {Array<number>} props.visibleShapes - Which shapes to display: 1=Square, 2=Circle, 3=Triangle (default: [1,2,3])
 * @param {boolean} props.showCamera - If true, show camera/image buttons (default: true)
 */
const ShapedCheckGroup = ({
    name,
    apiEndpoint,
    uploadFolder = 'double_check',
    extraData = {},
    className = "",
    required = false,
    visibleShapes = [1, 2, 3],
    showCamera = true
}) => {
    const { register, setValue, control, formState: { errors } } = useFormContext();
    const [uploading, setUploading] = useState({ 1: false, 2: false, 3: false });
    const [showModal, setShowModal] = useState({ open: false, checkNum: null });

    const inputRefs = {
        1: useRef(null),
        2: useRef(null),
        3: useRef(null)
    };

    // Watch current image values
    const img1 = useWatch({ name: `${name}_c1_image`, control });
    const img2 = useWatch({ name: `${name}_c2_image`, control });
    const img3 = useWatch({ name: `${name}_c3_image`, control });

    // Watch check states (checkmark toggle)
    const check1 = useWatch({ name: `${name}_c1_check`, control });
    const check2 = useWatch({ name: `${name}_c2_check`, control });
    const check3 = useWatch({ name: `${name}_c3_check`, control });

    const images = { 1: img1, 2: img2, 3: img3 };
    const checks = { 1: check1, 2: check2, 3: check3 };

    // Build image URL
    const getImageUrl = (file) => {
        if (!file) return null;
        if (file instanceof File) return URL.createObjectURL(file);
        if (typeof file === 'string' && apiEndpoint) {
            const staticBase = String(apiEndpoint).replace(/\/api\/?$/, '');
            return file.startsWith('http') ? file : `${staticBase}/uploads/${uploadFolder}/${file}`;
        }
        return null;
    };

    // Resize image
    const resizeImage = (file, maxWidth = 1200) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    if (img.width <= maxWidth) {
                        resolve(file);
                        return;
                    }
                    const ratio = maxWidth / img.width;
                    const canvas = document.createElement('canvas');
                    canvas.width = maxWidth;
                    canvas.height = img.height * ratio;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    }, 'image/jpeg', 0.85);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Delete old file
    const deleteOldFile = async (filename) => {
        if (filename && typeof filename === 'string') {
            try {
                await axios.delete(`${apiEndpoint}/api/upload/delete`, {
                    data: { filename, folder: uploadFolder },
                    withCredentials: true
                });
            } catch (err) {
                console.warn('Could not delete file:', err.message);
            }
        }
    };

    // Handle file upload
    const handleFileChange = async (checkNum, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fieldName = `${name}_c${checkNum}_image`;
        const currentFile = images[checkNum];

        // Delete old file if exists
        if (currentFile && typeof currentFile === 'string') {
            await deleteOldFile(currentFile);
        }

        const resizedFile = await resizeImage(file, 1200);
        setUploading(prev => ({ ...prev, [checkNum]: true }));

        const formData = new FormData();
        formData.append('image', resizedFile);
        Object.entries(extraData).forEach(([k, v]) => {
            if (v) formData.append(k, v);
        });
        formData.append('step', checkNum);

        try {
            const res = await axios.post(`${apiEndpoint}/api/upload/double-check`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                setValue(fieldName, res.data.filename, { shouldDirty: true });
            } else {
                alert('Upload failed: ' + res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploading(prev => ({ ...prev, [checkNum]: false }));
            if (inputRefs[checkNum].current) inputRefs[checkNum].current.value = '';
        }
    };

    // Handle camera click
    const handleCameraClick = (checkNum) => {
        if (!uploading[checkNum] && inputRefs[checkNum].current) {
            inputRefs[checkNum].current.click();
        }
    };

    // Handle shape click (cycle through tristate: empty -> pass -> fail -> na -> empty)
    // States: null/undefined = empty, 'pass' = ✓, 'fail' = ✗, 'na' = N/A
    const handleShapeClick = (checkNum) => {
        const fieldName = `${name}_c${checkNum}_check`;
        const currentValue = checks[checkNum];

        // Cycle: empty -> pass -> fail -> na -> empty
        let nextValue;
        if (!currentValue) {
            nextValue = 'pass';
        } else if (currentValue === 'pass') {
            nextValue = 'fail';
        } else if (currentValue === 'fail') {
            nextValue = 'na';
        } else {
            nextValue = null; // back to empty
        }

        setValue(fieldName, nextValue, { shouldDirty: true });
    };

    // Get display info for check state
    const getCheckDisplay = (checkValue) => {
        switch (checkValue) {
            case 'pass':
                return { symbol: '✓', color: 'text-green-600', title: 'ผ่าน' };
            case 'fail':
                return { symbol: '✗', color: 'text-red-600', title: 'ไม่ผ่าน' };
            case 'na':
                return { symbol: 'N/A', color: 'text-gray-500', title: 'ไม่ใช้งาน' };
            default:
                return { symbol: null, color: '', title: 'กดเพื่อตรวจสอบ' };
        }
    };

    // Handle view image
    const handleViewImage = (checkNum) => {
        setShowModal({ open: true, checkNum });
    };

    // Handle remove image
    const handleRemoveImage = async () => {
        const checkNum = showModal.checkNum;
        if (!checkNum) return;

        if (!window.confirm("คุณต้องการลบภาพนี้ใช่หรือไม่?")) return;

        const fieldName = `${name}_c${checkNum}_image`;
        await deleteOldFile(images[checkNum]);
        setValue(fieldName, null, { shouldDirty: true });
        setShowModal({ open: false, checkNum: null });
    };

    // Handle replace image
    const handleReplaceImage = () => {
        const checkNum = showModal.checkNum;
        if (!checkNum) return;

        if (!window.confirm("คุณต้องการเปลี่ยนภาพใช่หรือไม่?")) return;

        setShowModal({ open: false, checkNum: null });
        handleCameraClick(checkNum);
    };

    // Shape definitions (no border, black color)
    const allShapes = [
        { num: 1, Icon: Square, label: '□', color: 'text-black' },
        { num: 2, Icon: Circle, label: '○', color: 'text-black' },
        { num: 3, Icon: Triangle, label: '△', color: 'text-black' }
    ];

    // Filter shapes based on visibleShapes prop
    const shapes = allShapes.filter(s => visibleShapes.includes(s.num));

    return (
        <>
            {/* Hidden file inputs - only for visible shapes */}
            {visibleShapes.map(num => (
                <React.Fragment key={num}>
                    <input type="hidden" {...register(`${name}_c${num}_image`)} />
                    <input
                        type="hidden"
                        {...register(`${name}_c${num}_check`, {
                            validate: required ? (value) => !!value || 'กรุณาเลือกสถานะ' : undefined
                        })}
                    />
                    <input
                        ref={inputRefs[num]}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleFileChange(num, e)}
                        className="hidden"
                    />
                </React.Fragment>
            ))}

            {/* Shape Group */}
            <div className={`inline-flex items-center gap-1 ${className}`}>
                {shapes.map(({ num, Icon, label, color, bg, border }) => (
                    <div key={num} className="flex flex-col items-center gap-0.5">
                        {/* Shape Icon (Clickable to cycle tristate) */}
                        <button
                            type="button"
                            onClick={() => handleShapeClick(num)}
                            className={`w-6 h-6 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer relative rounded ${errors[`${name}_c${num}_check`] ? 'ring-2 ring-red-500 bg-red-50' : ''
                                }`}
                            title={getCheckDisplay(checks[num]).title}
                        >
                            <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
                            {/* State overlay */}
                            {checks[num] && (
                                <span className={`absolute inset-0 flex items-center justify-center font-bold ${getCheckDisplay(checks[num]).color} ${checks[num] === 'na' ? 'text-[8px]' : 'text-[14px]'}`}>
                                    {getCheckDisplay(checks[num]).symbol}
                                </span>
                            )}
                        </button>

                        {/* Camera/Image Button - only if showCamera is true */}
                        {showCamera && (
                            uploading[num] ? (
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                </div>
                            ) : images[num] ? (
                                <button
                                    type="button"
                                    onClick={() => handleViewImage(num)}
                                    className="w-6 h-6 flex items-center justify-center bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                                    title="ดูภาพ"
                                >
                                    <Image className="w-4 h-4 text-blue-600" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleCameraClick(num)}
                                    className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded border border-dashed border-gray-400 transition-colors"
                                    title="ถ่ายภาพ"
                                >
                                    <Camera className="w-4 h-4 text-gray-500" />
                                </button>
                            )
                        )}
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {showModal.open && showModal.checkNum && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal({ open: false, checkNum: null })}
                >
                    <div
                        className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b">
                            <span className="font-medium text-slate-700 text-sm">
                                ดูภาพ - Check {showModal.checkNum}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleReplaceImage}
                                    className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                                >
                                    เปลี่ยนภาพ
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                                >
                                    ลบ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal({ open: false, checkNum: null })}
                                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="p-4 flex items-center justify-center bg-slate-50">
                            <img
                                src={getImageUrl(images[showModal.checkNum])}
                                alt={`Check ${showModal.checkNum}`}
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShapedCheckGroup;
