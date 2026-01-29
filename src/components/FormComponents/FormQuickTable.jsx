import React from 'react';
import { useFormContext } from 'react-hook-form';
import { handleInfinityShortcut, getValidationClass } from '../../utils/formUtils';
import { useKeypad } from '../../context/KeypadContext';

/**
 * FormQuickTable Component
 * สร้างตารางแบบ Dynamic และรองรับ Auto RowSpan จากข้อมูลที่ซ้ำกัน
 * 
 * @param {Array} columns - โครงสร้างคอลัมน์และหัวตาราง [{ header: 'Name', key: 'id', rowGroup: true, type: 'text', width: '100px' }]
 * @param {Array} data - ข้อมูลแถว [{ id: 'Row1', ... }]
 * @param {Array} headerRows - (Optional) หัวตารางหลายชั้น [[{ header: 'H1', colSpan: 2 }, ...], [{ header: 'SubH1' }, { header: 'SubH2' }]]
 * @param {string} className - คลาสเพิ่มเติมสำหรับ <table>
 */
const FormQuickTable = ({
    columns = [],
    data = [],
    headerRows = null,
    className = ""
}) => {
    const { register, watch, setValue } = useFormContext();
    const { openKeypad, isKeypadEnabled } = useKeypad();

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
        <div className={`overflow-x-auto ${className}`}>
            <table className={`border-collapse border border-black text-xs ${className}`}>
                <thead className="bg-gray-200">
                    {/* Render complex header rows if provided, else fallback to standard columns */}
                    {headerRows ? (
                        headerRows.map((row, rIdx) => (
                            <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                    <th
                                        key={cIdx}
                                        rowSpan={cell.rowSpan || 1}
                                        colSpan={cell.colSpan || 1}
                                        style={{ width: cell.width }}
                                        className="border border-black text-center font-bold px-1 py-0.5"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            {cell.headerCheckbox && (
                                                <input
                                                    type="checkbox"
                                                    {...register(cell.headerCheckbox)}
                                                    className="w-4 h-4 cursor-pointer"
                                                />
                                            )}
                                            <span>{cell.header}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))
                    ) : (
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
                    )}
                </thead>
                <tbody>
                    {data.map((row, rIdx) => (
                        <tr key={rIdx}>
                            {columns.map((col, cIdx) => {
                                const span = rowSpans[rIdx][col.key];
                                if (span === 0) return null; // Skip if spanned by above cell

                                const cellValue = row[col.key];

                                // Determine cell type: row.type can override col.type, but col.isLabel forces label mode
                                const effectiveType = col.isLabel ? 'label' : (row.type || col.type || 'label');
                                const isLabel = effectiveType === 'label';

                                // Validation logic for inputs
                                let validationClass = "";
                                if (effectiveType === 'input') {
                                    const val = watch(cellValue);
                                    const min = row[`${col.key}_min`];
                                    const max = row[`${col.key}_max`];
                                    const expectedValue = row.std_val === '∞' ? '∞' : row[`${col.key}_expected`];

                                    validationClass = getValidationClass(val, { min, max, expectedValue });
                                }

                                return (
                                    <td
                                        key={cIdx}
                                        rowSpan={span || 1}
                                        className={`
                                            border border-black px-1 py-0.5 text-center
                                            ${isLabel ? 'bg-gray-50' : ''}
                                            ${col.align === 'left' ? 'text-left' : 'text-center'}
                                            ${validationClass}
                                        `}
                                    >
                                        {col.render ? (
                                            col.render(cellValue, row, { register, watch })
                                        ) : effectiveType === 'tristate' ? (
                                            <div
                                                onClick={() => {
                                                    const current = watch(cellValue) || '';
                                                    const next = current === '' ? '✓' : current === '✓' ? '✕' : '';
                                                    setValue(cellValue, next, { shouldValidate: true, shouldDirty: true });
                                                }}
                                                className="w-6 h-6 border border-gray-400 bg-white mx-auto flex items-center justify-center cursor-pointer hover:bg-gray-100 select-none text-sm font-bold shadow-sm rounded-sm"
                                            >
                                                {watch(cellValue)}
                                            </div>
                                        ) : effectiveType === 'checkbox' ? (
                                            <input
                                                type="checkbox"
                                                {...register(cellValue)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                        ) : effectiveType === 'input' ? (
                                            <div className="flex items-center gap-1">
                                                {(() => {
                                                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                                                    return (
                                                        <input
                                                            type="text"
                                                            {...register(cellValue)}
                                                            inputMode={isMobile ? "none" : "text"}
                                                            readOnly={isMobile}
                                                            onClick={() => {
                                                                if (isMobile || isKeypadEnabled) {
                                                                    openKeypad(cellValue, watch(cellValue), { label: cellValue, mode: 'numeric' });
                                                                }
                                                            }}
                                                            onFocus={(e) => {
                                                                if (isMobile) {
                                                                    e.target.blur();
                                                                    openKeypad(cellValue, watch(cellValue), { label: cellValue, mode: 'numeric' });
                                                                }
                                                            }}
                                                            defaultValue={row.defaultValue ?? ''}
                                                            className="bg-transparent outline-none text-center border-b border-transparent focus:border-blue-500 w-full flex-1 cursor-pointer"
                                                        />
                                                    );
                                                })()}
                                                {row.suffix && <span className="shrink-0">{row.suffix}</span>}
                                            </div>
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
