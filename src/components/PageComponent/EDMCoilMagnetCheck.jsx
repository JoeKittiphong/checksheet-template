import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

/**
 * EDMCoilMagnetCheck Component
 * component สำหรับตารางเช็ค Spec ของ Magnet, Coil และ Linear Scale
 * Refactored for Granular Validation (Checkbox + S/N).
 */
function EDMCoilMagnetCheck({
    name,
    control,
    title = "MAGNET PLATE SPEC",
    config = [], // [{ axis: 'X', specs: ['spec1', 'spec2'] }]
    defaultValue = {}
}) {
    // Note: We don't necessarily need useWatch for the whole object if we map via config.
    // The Controllers will handle their own state.

    return (
        <table className="w-full border-collapse text-[11px] font-sans border-2 border-black mb-2 print:mb-2">
            <thead>
                <tr className="bg-white">
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[12%]">AXIS</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[8%] text-xs">☒</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[40%]">{title}</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[25%]">S/N</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[15%]">Item</th>
                </tr>
            </thead>
            <tbody>
                {config.map((group) => {
                    const rows = group.specs || [];
                    const rowCount = rows.length;

                    return rows.map((spec, idx) => (
                        <tr key={`${group.axis}-${idx}`} className="h-8">
                            {idx === 0 && (
                                <td
                                    rowSpan={rowCount}
                                    className="border border-black text-center align-middle font-bold text-[12px] bg-white"
                                >
                                    {group.axis}
                                </td>
                            )}

                            {/* Checkbox (X) Column */}
                            <td className="border border-black text-center align-middle">
                                <Controller
                                    name={`${name}.${group.axis}.${idx}.checked`}
                                    control={control}
                                    defaultValue={false}
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => (
                                        <div
                                            className={`w-[4.5mm] h-[4.5mm] flex items-center justify-center cursor-pointer m-auto text-[10px] font-bold bg-white
                                                ${error ? 'border-2 border-red-500 bg-red-50' : 'border border-black'}
                                            `}
                                            onClick={() => field.onChange(!field.value)}
                                        >
                                            {field.value ? 'X' : ''}
                                        </div>
                                    )}
                                />
                            </td>

                            <td className="border border-black text-center align-middle font-medium px-2">
                                {spec}
                            </td>

                            {/* S/N Input Column */}
                            <td className="border border-black text-center align-middle">
                                <Controller
                                    name={`${name}.${group.axis}.${idx}.sn`}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => (
                                        <input
                                            type="text"
                                            className={`w-full h-full border-none text-center text-[11px] outline-none p-1 
                                                ${error ? 'border border-red-500 bg-red-50 px-1' : 'bg-transparent'}
                                            `}
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                            </td>

                            {/* Item Input Column */}
                            <td className="border border-black text-center align-middle">
                                <Controller
                                    name={`${name}.${group.axis}.${idx}.item`}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            className="w-full h-full border-none text-center text-[11px] outline-none p-1 bg-transparent"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                            </td>
                        </tr>
                    ));
                })}
            </tbody>
        </table>
    );
}

export default EDMCoilMagnetCheck;
