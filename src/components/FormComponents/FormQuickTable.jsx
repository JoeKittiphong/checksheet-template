import React from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';

/**
 * FormQuickTable Component
 * สร้างตารางแบบ Dynamic และรองรับ Auto RowSpan จากข้อมูลที่ซ้ำกัน
 * 
 * @param {Array} columns - โครงสร้างหัวตาราง [{ header: 'Name', key: 'id', rowGroup: true, type: 'text', width: '100px' }]
 * @param {Array} data - ข้อมูลแถว [{ id: 'Row1', ... }]
 * @param {string} className - คลาสเพิ่มเติมสำหรับ <table>
 */
const FormQuickTable = ({
    columns = [],
    data = [],
    className = ""
}) => {
    const { register, watch } = useFormContext();

    // -- Helper to calculate row spans for grouping columns --
    const calculateRowSpans = () => {
        const rowSpans = data.map(() => ({}));

        columns.forEach(col => {
            if (!col.rowGroup) return;

            let i = 0;
            while (i < data.length) {
                let span = 1;
                while (i + span < data.length && data[i][col.key] === data[i + span][col.key]) {
                    span++;
                }
                rowSpans[i][col.key] = span;
                for (let j = 1; j < span; j++) {
                    rowSpans[i + j][col.key] = 0; // Skip cells with 0 span
                }
                i += span;
            }
        });
        return rowSpans;
    };

    const rowSpans = calculateRowSpans();

    return (
        <div className="overflow-x-auto">
            <table className={`border-collapse border border-black text-xs ${className}`}>
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                style={{ width: col.width }}
                                className="border border-black text-center font-bold"
                            >
                                {col.headerComponent ? col.headerComponent : (
                                    <div className="flex px-1 py-0.5 justify-center items-center gap-2">
                                        {col.headerCheckbox && (
                                            <input
                                                type="checkbox"
                                                {...register(col.headerCheckbox)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        )}
                                        <span>{col.header}</span>
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rIdx) => (
                        <tr key={rIdx}>
                            {columns.map((col, cIdx) => {
                                const span = rowSpans[rIdx][col.key];
                                if (span === 0) return null; // Skip if spanned by above cell

                                const cellValue = row[col.key];
                                const isLabel = !col.type || col.type === 'label';

                                // Validation logic for inputs
                                let isValid = true;
                                if (col.type === 'input') {
                                    const val = watch(cellValue);
                                    const min = row[`${col.key}_min`];
                                    const max = row[`${col.key}_max`];
                                    if (min !== undefined || max !== undefined) {
                                        isValid = validateValue(val, { min, max });
                                    }
                                }

                                return (
                                    <td
                                        key={cIdx}
                                        rowSpan={span || 1}
                                        className={`
                                            border border-black px-1 py-0.5 text-center
                                            ${isLabel ? 'bg-gray-50' : ''}
                                            ${col.align === 'left' ? 'text-left' : 'text-center'}
                                            ${!isValid ? 'bg-red-200' : ''}
                                        `}
                                    >
                                        {col.type === 'checkbox' ? (
                                            <input
                                                type="checkbox"
                                                {...register(cellValue)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        ) : col.type === 'input' ? (
                                            <input
                                                type="text"
                                                {...register(cellValue)}
                                                defaultValue={row.defaultValue ?? ''}
                                                className="bg-transparent outline-none text-center border-b border-transparent focus:border-blue-500 w-full"
                                            />
                                        ) : (
                                            <span className="whitespace-pre-wrap">{cellValue}</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormQuickTable;
