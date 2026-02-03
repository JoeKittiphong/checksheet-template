import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import CompactImageUpload from './CompactImageUpload';

/**
 * FormDoubleCheckTable Component
 * ตารางตรวจสอบชิ้นส่วน Double Check พร้อม 3-step verification
 * 
 * @param {string} title - หัวข้อตาราง
 * @param {array} rows - ข้อมูลแต่ละแถว [{id, partName, qty, torque, image, modelLabel}]
 * @param {string} fieldPrefix - Prefix สำหรับ RHF fields (e.g., "p01_dc")
 * @param {string} apiEndpoint - API Endpoint for image upload
 */
function FormDoubleCheckTable({
    title = "Double Check",
    rows = [],
    fieldPrefix = "dc",
    apiEndpoint
}) {
    const { setValue, control, register } = useFormContext();

    // Watch global form metadata to pass down for correct folder creation during immediate uploads
    const currentModel = useWatch({ control, name: 'model' }) || 'UNKNOWN';
    const watchMachineNo = useWatch({ control, name: 'machineNo' });
    const watchMachine_no = useWatch({ control, name: 'machine_no' });
    const currentMachineNo = watchMachineNo || watchMachine_no || 'UNKNOWN';

    // Helper component for exclusive checkboxes in a cell
    const CheckCell = ({ rowId, step, okLabel = "OK", ngLabel = "NO GOOD", partName = "", customCheck = null }) => {
        const okName = `${fieldPrefix}_${rowId}_c${step}_ok`;
        const ngName = step === 1 ? `${fieldPrefix}_${rowId}_c${step}_short` : `${fieldPrefix}_${rowId}_c${step}_nogood`;
        const imageName = `${fieldPrefix}_${rowId}_c${step}_image`;

        // Watch values to handle exclusivity and conditional rendering
        const isOk = useWatch({ control, name: okName });
        const isNg = useWatch({ control, name: ngName });

        const handleOkChange = (e) => {
            const checked = e.target.checked;
            setValue(okName, checked);
            if (checked) {
                setValue(ngName, false);
            }
        };

        const handleNgChange = (e) => {
            const checked = e.target.checked;
            setValue(ngName, checked);
            if (checked) {
                setValue(okName, false);
            }
        };

        return (
            <div className="flex flex-col gap-1">
                {/* Custom Input (e.g., for Micron value) */}
                {customCheck && customCheck.step === step && (
                    <div className="flex items-center gap-1 mb-1 border-b border-dotted border-black pb-1">
                        <input
                            type="text"
                            {...register(`${fieldPrefix}_${rowId}_c${step}_val`)}
                            className="w-12 bg-transparent text-center outline-none border-b border-black text-xs h-4"
                        />
                        <span className="text-[10px] font-bold">{customCheck.label}</span>
                    </div>
                )}

                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!isOk}
                        onChange={handleOkChange}
                        className="w-3 h-3"
                    />
                    <span className="text-[10px]">{okLabel}</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!isNg}
                        onChange={handleNgChange}
                        className="w-3 h-3"
                    />
                    <span className="text-[10px]">{ngLabel}</span>
                </label>

                {/* Always show Upload button */}
                <div className="mt-1">
                    <CompactImageUpload
                        name={imageName}
                        apiEndpoint={apiEndpoint}
                        label="UP"
                        viewLabel="IMG"
                        className="scale-90 origin-left"
                        deferred={true} // Upload on Save
                        uploadFolder="double_check" // Correct folder for viewing/deletion logic
                        extraData={{
                            model: currentModel,
                            machine_no: currentMachineNo,
                            part_name: partName,
                            step: step
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Title */}
            <div className="font-bold text-sm mb-1">{title}</div>

            {/* Table */}
            <table className="w-full border-collapse text-xs">
                {/* Header */}
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-black p-1 w-8">No.</th>
                        <th className="border border-black p-1 w-36">Part Name</th>
                        <th className="border border-black p-1 w-12">Q'ty</th>
                        <th className="border border-black p-1 w-16">Torque<br />(kgf.cm)</th>
                        <th className="border border-black p-1 w-20">Picture</th>
                        <th className="border border-black p-1 w-24">Check - 1</th>
                        <th className="border border-black p-1 w-24">Check - 2</th>
                        <th className="border border-black p-1 w-24">Check - 3</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {rows.map((row, idx) => (
                        <tr key={row.id || idx}>
                            {/* No. */}
                            <td className="border border-black p-1 text-center align-top">
                                {idx + 1}.
                                <input
                                    type="hidden"
                                    {...register(`${fieldPrefix}_${row.id}_partName`)}
                                    value={row.partName}
                                />
                            </td>

                            {/* Part Name */}
                            <td className="border border-black p-1 align-top">
                                <div className="whitespace-pre-line text-xs leading-tight">
                                    {row.modelLabel && (
                                        <div className="text-[10px] text-gray-500 mb-0.5 font-bold underline">
                                            {row.modelLabel}
                                        </div>
                                    )}
                                    <div className="font-semibold">{row.partName}</div>
                                    {row.subParts && row.subParts.map((sub, i) => (
                                        <div key={i} className="text-[10px]">{sub}</div>
                                    ))}
                                    {row.note && (
                                        <div className="text-[9px] text-gray-500 mt-0.5">
                                            ({row.note})
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* Q'ty */}
                            <td className="border border-black p-1 text-center align-top whitespace-nowrap">
                                {Array.isArray(row.qty) ? row.qty.join(' / ') : row.qty}
                            </td>

                            {/* Torque */}
                            <td className="border border-black p-1 text-center align-top whitespace-nowrap">
                                {Array.isArray(row.torque) ? row.torque.join(' / ') : row.torque}
                            </td>

                            {/* Picture */}
                            <td className="border border-black p-1 text-center align-middle">
                                {row.image ? (
                                    <img
                                        src={row.image}
                                        alt={row.partName}
                                        className="max-w-full max-h-16 mx-auto object-contain"
                                    />
                                ) : (
                                    <div className="h-16 bg-gray-100 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </td>

                            {/* Checks */}
                            <td className="border border-black p-1 align-top text-center">
                                <CheckCell
                                    rowId={row.id}
                                    step={1}
                                    ngLabel={row.ngLabel || "NO GOOD"}
                                    partName={row.partName}
                                    customCheck={row.customCheck}
                                />
                            </td>
                            <td className="border border-black p-1 align-top text-center">
                                <CheckCell
                                    rowId={row.id}
                                    step={2}
                                    partName={row.partName}
                                    customCheck={row.customCheck}
                                />
                            </td>
                            <td className="border border-black p-1 align-top text-center">
                                <CheckCell
                                    rowId={row.id}
                                    step={3}
                                    partName={row.partName}
                                    customCheck={row.customCheck}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormDoubleCheckTable;
