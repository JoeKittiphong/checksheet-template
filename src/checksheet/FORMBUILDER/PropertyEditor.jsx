import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentSchemas } from './ComponentSchemas';
import AssetManager from './AssetManager';

const PropertyEditor = ({ element, onUpdate, onClose, workspace, onDelete }) => {
    const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'advanced'
    const [jsonText, setJsonText] = useState('');
    const [jsonError, setJsonError] = useState(null);
    const [assetManagerOpen, setAssetManagerOpen] = useState(false);
    const [activeImageField, setActiveImageField] = useState(null);

    const { register, handleSubmit, reset, setValue } = useForm();
    const schema = ComponentSchemas[element?.component] || ComponentSchemas.default;

    // Reset when selected element changes
    useEffect(() => {
        if (element) {
            reset(element.props || {});
            setJsonText(JSON.stringify(element.props || {}, null, 2));
            setJsonError(null);
        }
    }, [element, reset]);

    // Handle Basic Form Submit
    const onBasicSubmit = (data) => {
        const processedData = { ...data };

        schema.forEach(field => {
            const keys = field.name.split('.');
            let current = processedData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (current[keys[i]]) current = current[keys[i]];
                else return;
            }
            const lastKey = keys[keys.length - 1];
            const value = current[lastKey];

            if (value !== undefined && typeof value === 'string') {
                const trimmedValue = value.trim();
                if (field.type === 'number' && trimmedValue !== '' && !isNaN(trimmedValue)) {
                    current[lastKey] = Number(trimmedValue);
                }
                else if ((trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) ||
                    (trimmedValue.startsWith('{') && trimmedValue.endsWith('}'))) {
                    try {
                        current[lastKey] = JSON.parse(trimmedValue);
                    } catch (e) {
                        console.warn(`Failed to parse JSON for field ${field.name}`, e);
                    }
                }
            }
        });

        onUpdate(processedData);
        // Sync JSON text
        setJsonText(JSON.stringify(processedData, null, 2));
    };

    // Handle JSON Text Change
    const handleJsonChange = (e) => {
        const val = e.target.value;
        setJsonText(val);
        try {
            JSON.parse(val);
            setJsonError(null);
        } catch (err) {
            setJsonError(err.message);
        }
    };

    // Apply Advanced JSON
    const onApplyAdvanced = () => {
        try {
            const parsed = JSON.parse(jsonText);
            onUpdate(parsed);
            reset(parsed); // Sync Basic form
            setJsonError(null);
            alert('JSON Properties Applied!');
        } catch (err) {
            setJsonError(err.message);
        }
    };

    const renderField = (field) => {
        const { name, label, type, options, disabled } = field;
        const labelStyles = "block text-[11px] font-semibold text-gray-600 mb-1";
        const inputStyles = "w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none transition-all";
        const disabledStyles = disabled ? "bg-gray-50 cursor-not-allowed text-gray-400" : "";

        switch (type) {
            case 'number':
                return (
                    <div key={name}>
                        <label className={labelStyles}>{label}</label>
                        <input type="number" step="any" {...register(name)} disabled={disabled} className={`${inputStyles} ${disabledStyles}`} />
                    </div>
                );
            case 'boolean':
                return (
                    <div key={name} className="flex items-center gap-2 py-1">
                        <input type="checkbox" {...register(name)} id={`prop-${name}`} disabled={disabled} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <label htmlFor={`prop-${name}`} className="text-sm text-gray-700 select-none cursor-pointer">{label}</label>
                    </div>
                );
            case 'select':
                return (
                    <div key={name}>
                        <label className={labelStyles}>{label}</label>
                        <select {...register(name)} disabled={disabled} className={`${inputStyles} ${disabledStyles} appearance-none bg-white`}>
                            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                );
            case 'image':
                return (
                    <div key={name} className="space-y-2">
                        <label className={labelStyles}>{label}</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    {...register(name)}
                                    disabled={disabled}
                                    className={`${inputStyles} ${disabledStyles} flex-1 text-[10px] font-mono`}
                                    placeholder="http://... or /uploads/..."
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveImageField(name);
                                        setAssetManagerOpen(true);
                                    }}
                                    className="shrink-0 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded text-xs font-bold transition-all active:scale-95 flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                    Library
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-px bg-gray-100 flex-1"></div>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">or</span>
                                <div className="h-px bg-gray-100 flex-1"></div>
                            </div>
                            <label className="cursor-pointer w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 border-dashed rounded text-[10px] font-bold text-gray-500 transition-all text-center">
                                Upload Local (Base64)
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setValue(name, reader.result, { shouldDirty: true });
                                                handleSubmit(onBasicSubmit)();
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                );
            case 'text':
            default:
                return (
                    <div key={name}>
                        <label className={labelStyles}>{label}</label>
                        <input type="text" {...register(name)} disabled={disabled} className={`${inputStyles} ${disabledStyles}`} />
                    </div>
                );
        }
    };

    if (!element) return (
        <div className="w-80 bg-white border-l border-gray-200 h-full flex items-center justify-center p-8 text-center text-gray-400">
            Select an element to edit properties.
        </div>
    );

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col shadow-xl z-30">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Editing</span>
                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-tight truncate max-w-[180px]">
                        {element.component.replace('Form', '')}
                    </h2>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
                <button
                    onClick={() => setActiveTab('basic')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'basic' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Basic
                </button>
                <button
                    onClick={() => setActiveTab('advanced')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'advanced' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Advanced JSON
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {activeTab === 'basic' ? (
                    <form onSubmit={handleSubmit(onBasicSubmit)} className="space-y-4">
                        <div className="mb-4">
                            <div className="text-[10px] text-gray-400 font-mono mb-2 bg-gray-50 p-1.5 rounded border border-dashed border-gray-200 truncate">
                                ID: {element.i}
                            </div>
                        </div>

                        {schema.map(field => renderField(field))}

                        <div className="pt-6 sticky bottom-0 bg-white">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Apply Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="h-full flex flex-col space-y-4">
                        <div className="flex-1 min-h-[400px]">
                            <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-tight">Raw Properties (JSON)</label>
                            <textarea
                                value={jsonText}
                                onChange={handleJsonChange}
                                className={`w-full h-full p-3 font-mono text-[11px] border rounded focus:ring-1 outline-none transition-all resize-none bg-gray-900 text-emerald-400 ${jsonError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                            />
                        </div>

                        {jsonError && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded text-[10px] text-red-600 font-mono leading-tight animate-in fade-in slide-in-from-top-1">
                                <strong>Error:</strong> {jsonError}
                            </div>
                        )}

                        <button
                            onClick={onApplyAdvanced}
                            disabled={!!jsonError}
                            className={`w-full px-4 py-2 text-sm font-bold rounded shadow-lg transition-all flex items-center justify-center gap-2 ${jsonError ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Apply JSON Data
                        </button>

                        <p className="text-[10px] text-gray-400 italic text-center px-4">
                            * Warning: Manual JSON editing gives full control but requires correct syntax.
                        </p>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
                <button
                    onClick={onDelete}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded hover:bg-red-100 hover:text-red-700 shadow-sm border border-red-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete Component
                </button>
            </div>

            <AssetManager
                isOpen={assetManagerOpen}
                onClose={() => setAssetManagerOpen(false)}
                onSelect={(url) => {
                    if (activeImageField) {
                        setValue(activeImageField, url, { shouldDirty: true });
                        handleSubmit(onBasicSubmit)();
                    }
                    setAssetManagerOpen(false);
                }}
                workspace={workspace}
            />
        </div>
    );
};

export default PropertyEditor;
