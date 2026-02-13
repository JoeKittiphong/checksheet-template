import React, { useState, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import axios from 'axios';
import { Camera, Loader2, X } from 'lucide-react';

/**
 * ImageUploadBox Component
 * 
 * @param {Object} props
 * @param {string} props.name - Form field name to store the filename
 * @param {string} props.apiEndpoint - Base API endpoint (e.g. http://localhost:3000/api)
 * @param {string} props.uploadPath - Upload route path (default: '/upload/assy')
 * @param {string} props.label - Label text
 */
const ImageUploadBox = ({ name, apiEndpoint, uploadPath = '/upload/assy', label = "Attach Image", deferred = false, className = "" }) => {
    const { register, setValue, control } = useFormContext();
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef(null);

    // Watch current value to show preview
    const currentFile = useWatch({ name, control });

    // Determine Preview URL
    let imageUrl = null;
    if (currentFile) {
        if (currentFile instanceof File) {
            // Local blob for deferred file
            imageUrl = URL.createObjectURL(currentFile);
        } else if (typeof currentFile === 'string') {
            // Server path
            const staticBase = apiEndpoint.replace(/\/api\/?$/, '');
            // Detect if path is full url or relative
            if (currentFile.startsWith('http')) {
                imageUrl = currentFile;
            } else {
                // assume stored in uploads/assy_problem or served statically
                // If backend saves just filename "img-123.jpg", we need to know where it is served
                // Based on server config: app.use('/uploads', ... static(path.join(__dirname, 'uploads')))
                // And uploadConfig puts it in ../upload_images/assy_problem. 
                // For now, let's assume the previous logic for URL construction:
                // If checking "deferred", we rely on the file object.
                // If it's a string, it's already saved.
                imageUrl = `${staticBase}/uploads/assy_problem_images/${currentFile}`;
            }
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (deferred) {
            // Deferred Mode: Just store file in form state
            setValue(name, file, { shouldDirty: true });
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        // Immediate Mode (Original)
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${apiEndpoint}${uploadPath}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                // Save filename to form state
                setValue(name, res.data.filename, { shouldDirty: true });
            } else {
                alert('Upload failed: ' + res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploading(false);
            // Reset input so same file can be selected again if needed
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation(); // Prevent triggering file select
        setValue(name, null, { shouldDirty: true });
    };

    const handleClick = () => {
        if (!uploading && inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="relative">
            {/* Registered hidden input to ensure form state consistency */}
            <input type="hidden" {...register(name)} />

            {/* Clickable Area */}
            <div
                onClick={handleClick}
                className={`
                    group
                    flex flex-col items-center justify-center 
                    transition-all duration-200 cursor-pointer
                    ${currentFile
                        ? 'border-transparent bg-transparent hover:border-blue-500 hover:bg-blue-50'
                        : 'border-gray-400 hover:bg-white/50 bg-white/30 border-2 border-dashed'
                    }
                    rounded-md overflow-hidden relative
                    ${className || 'h-40 w-full min-w-[200px]'}
                `}
            >
                {uploading ? (
                    <div className="flex flex-col items-center text-blue-600">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-xs">Uploading...</span>
                    </div>
                ) : currentFile ? (
                    <>
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="h-full w-auto object-contain"
                        />
                        {/* Remove Button - Show only on hover */}
                        <div
                            onClick={handleRemove}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-all z-10 opacity-0 group-hover:opacity-100"
                        >
                            <X className="w-4 h-4" />
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-600">
                        <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-bold text-sm">{label}</p>
                        <p className="text-[10px] opacity-75">(คลิกเพื่อแนบ)</p>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                />
            </div>
        </div>
    );
};

export default ImageUploadBox;
