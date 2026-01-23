import React from 'react';

/**
 * EDMCoilMagnetCheck Component
 * component สำหรับตารางเช็ค Spec ของ Magnet, Coil และ Linear Scale
 * ใช้ Tailwind CSS สำหรับ Styling
 */
function EDMCoilMagnetCheck({
    title = "MAGNET PLATE SPEC",
    config = [], // [{ axis: 'X', specs: ['spec1', 'spec2'] }]
    data = {},   // { X: [{ checked: false, sn: '' }, ...] }
    onChange = () => { }
}) {
    const handleUpdate = (axis, index, field, value) => {
        const newData = { ...data };
        if (!newData[axis]) newData[axis] = [];
        // Ensure array is long enough
        while (newData[axis].length <= index) {
            newData[axis].push({ checked: false, sn: '' });
        }
        newData[axis][index] = { ...newData[axis][index], [field]: value };
        onChange(newData);
    };

    const getVal = (axis, index, field) => data[axis]?.[index]?.[field] || (field === 'checked' ? false : '');

    return (
        <table className="w-full border-collapse text-[11px] font-sans border-2 border-black mb-4 print:mb-2">
            <thead>
                <tr className="bg-white">
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[12%]">AXIS</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[8%] text-xs">x</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[15%] min-w-[60px]">ITEM</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[40%]">{title}</th>
                    <th className="border-[1.5px] border-black p-1.5 text-center font-bold uppercase w-[25%]">S/N</th>
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
                                    className="border border-black p-0.5 text-center align-middle font-bold text-[12px] bg-white"
                                >
                                    {group.axis}
                                </td>
                            )}
                            <td className="border border-black text-center align-middle">
                                <div
                                    className="w-[4.5mm] h-[4.5mm] border border-black flex items-center justify-center cursor-pointer m-auto text-[10px] font-bold bg-white"
                                    onClick={() => handleUpdate(group.axis, idx, 'checked', !getVal(group.axis, idx, 'checked'))}
                                >
                                    {getVal(group.axis, idx, 'checked') ? 'X' : ''}
                                </div>
                            </td>
                            <td className="border border-black  text-center align-middle"></td>
                            <td className="border border-black text-center align-middle font-medium px-2">
                                {spec}
                            </td>
                            <td className="border border-black text-center align-middle">
                                <input
                                    type="text"
                                    className="w-full h-full border-none text-center text-[11px] bg-transparent outline-none p-1"
                                    value={getVal(group.axis, idx, 'sn')}
                                    onChange={(e) => handleUpdate(group.axis, idx, 'sn', e.target.value)}
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
