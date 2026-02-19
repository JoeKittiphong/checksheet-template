import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const PropertyEditor = ({ element, onUpdate, onClose }) => {
    const { register, handleSubmit, reset } = useForm();

    // Reset form when selected element changes
    useEffect(() => {
        if (element) {
            reset(element.props || {});
        }
    }, [element, reset]);

    const onSubmit = (data) => {
        // Convert string numbers to actual numbers where appropriate
        const processedData = { ...data };
        Object.keys(processedData).forEach(key => {
            if (typeof processedData[key] === 'string' && processedData[key] !== '' && !isNaN(processedData[key])) {
                // Only convert if it looks like a simple number and isn't a likely ID/Name
                if (['min', 'max', 'minStd', 'maxStd', 'w', 'h', 'cols', 'rows', 'rowCount', 'stepSize', 'multiplier'].includes(key)) {
                    processedData[key] = Number(processedData[key]);
                }
            }
        });
        onUpdate(processedData);
    };

    if (!element) return <div className="p-4 text-gray-500 italic">Select an element to edit properties.</div>;

    return (
        <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col shadow-xl z-20">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-700">Properties</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                    ✕
                </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">
                            {element.component}
                        </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono select-all">ID: {element.i}</div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Identification */}
                    <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Identification</h3>
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Name (RHF key)</label>
                            <input
                                {...register('name')}
                                placeholder="field_name"
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Label / Title</label>
                            <input
                                {...register('label')}
                                placeholder="DisplayName"
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Dimensions & Scale (Read from layout preferably, but sometimes props) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Width (Grid)</label>
                            <input type="number" {...register('w')} className="w-full px-2 py-1 text-sm border rounded bg-gray-50 cursor-not-allowed" disabled />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Height (Grid)</label>
                            <input type="number" {...register('h')} className="w-full px-2 py-1 text-sm border rounded bg-gray-50 cursor-not-allowed" disabled />
                        </div>
                    </div>

                    {/* Common Constraints */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Constraints & Defaults</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Min Std</label>
                                <input {...register('minStd')} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Max Std</label>
                                <input {...register('maxStd')} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Unit</label>
                            <input {...register('unit')} placeholder="mm, kg, etc." className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded outline-none" />
                        </div>

                        <div className="flex items-center gap-2 py-1">
                            <input type="checkbox" {...register('required')} id="prop-req" className="w-4 h-4 text-blue-600" />
                            <label htmlFor="prop-req" className="text-sm text-gray-700 select-none">Mark as Required</label>
                        </div>
                    </div>

                    {/* Component Specific (Visible if key exists) */}
                    {element.props?.rowCount !== undefined && (
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-600 mb-1">Row Count</label>
                            <input type="number" {...register('rowCount')} className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded" />
                        </div>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-md active:transform active:scale-[0.98] transition-all"
                        >
                            Save Properties
                        </button>
                    </div>
                </form>

                {/* Raw Props Debug/Edit */}
                <div className="mt-10 pt-4 border-t border-gray-200">
                    <details className="group">
                        <summary className="text-[10px] text-gray-400 font-bold uppercase tracking-widest cursor-pointer hover:text-gray-600 list-none flex items-center justify-between">
                            Advanced JSON
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <div className="mt-2 relative">
                            <textarea
                                className="w-full h-48 text-[10px] font-mono border border-gray-200 rounded p-2 bg-gray-900 text-green-400 focus:ring-1 focus:ring-green-500 outline-none"
                                defaultValue={JSON.stringify(element.props, null, 2)}
                                placeholder="Raw JSON Props..."
                                onBlur={(e) => {
                                    try {
                                        const json = JSON.parse(e.target.value);
                                        onUpdate(json);
                                    } catch (err) {
                                        console.error("Invalid JSON", err);
                                    }
                                }}
                            />
                            <div className="absolute top-1 right-1 px-1 bg-gray-800 text-white text-[8px] rounded">JSON</div>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1 italic">
                            * Warning: Manual JSON editing may break component if schema is invalid.
                        </p>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default PropertyEditor;
