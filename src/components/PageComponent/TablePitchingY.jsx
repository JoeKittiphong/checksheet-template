import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TablePitchingY Component
 * ตารางแสดงข้อมูล Pitching Y axis แบบแนวตั้ง
 * - แถว: Y+, 0 (reference), Y-
 * - คอลัมน์: B, C, DIFF
 * - ใช้ลูกศรขึ้นลง (↑ ↓) แทนค่าบวก/ลบ
 * - DIFF = |B - C|
 * - แถว 0 เป็นจุดอ้างอิง แสดง 0 ไม่สามารถแก้ไขได้
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { b: [], c: [] } สำหรับแต่ละแถว
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Object} props.standard - ค่า STD เดียว {min: -20, max: 20} ใช้กับทุกตำแหน่ง
 * @param {number} props.referenceRow - แถวที่เป็นจุดอ้างอิง (0-indexed), default = 1 (0)
 */
function TablePitchingY({
    data = { b: [], c: [] },
    onChange = () => { },
    standard = { min: -20, max: 20 },
    referenceRow = 1  // แถว 0 เป็น reference (0-indexed = 1)
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    const rows = 3; // Y+, 0, Y-
    const rowHeaders = ['Y+', '0', 'Y-'];

    const inputRefsB = useRef([]);
    const inputRefsC = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร (ขึ้น/ลง)
    const formatDisplay = (value) => formatWithArrows(value, 'y');

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // Format STD display
    const formatStd = (std) => {
        if (!std) return '↑↓';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        if (minAbs === maxAbs) {
            return `↑${maxAbs}↓`;
        }
        return `${maxAbs}↑ - ${minAbs}↓`;
    };

    // เมื่อ focus
    const handleFocus = (col, index) => {
        const colData = data[col] || [];
        const currentValue = colData[index] || '';
        setEditingCell({ col, index });
        setEditingValue(currentValue);
    };

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ blur หรือ Enter
    const commitValue = (col, index) => {
        const numericValue = parseInput(editingValue);

        const newData = { ...data };
        if (!newData[col]) {
            newData[col] = [];
        }
        newData[col][index] = numericValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (col, index) => {
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell && editingCell.col === col && editingCell.index === index) {
            commitValue(col, index);
        }
    };

    // Handle Enter key
    const handleKeyDown = (e, col, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(col, index);

            if (col === 'b') {
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => moveFocus(e, -1, inputRefsC.current, { direction: 1 })
                });
            } else if (col === 'c') {
                moveFocus(e, index, inputRefsC.current, { direction: 1 });
            }
        }
    };

    // Get display value
    const getInputValue = (col, index) => {
        const isEditing = editingCell && editingCell.col === col && editingCell.index === index;
        if (isEditing) {
            return editingValue;
        }
        const colData = data[col] || [];
        return formatDisplay(colData[index]);
    };

    // Validate value
    const isValid = (col, index) => {
        const colData = data[col] || [];
        return validateValue(colData[index], {
            min: standard.min,
            max: standard.max,
            validateStd: true
        });
    };

    // Validate DIFF value
    // Validate DIFF value
    const isDiffValid = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const cVal = parseFloat((data.c || [])[index]);
        if (isNaN(bVal) || isNaN(cVal)) return true;
        return validateValue(bVal - cVal, {
            min: standard.min,
            max: standard.max,
            validateStd: true
        });
    };

    // Calculate DIFF = B - C (with direction arrows)
    const getDiff = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const cVal = parseFloat((data.c || [])[index]);
        if (isNaN(bVal) || isNaN(cVal)) return '';
        const diff = bVal - cVal;
        if (diff === 0) return '0';
        const absValue = Math.abs(diff).toFixed(2).replace(/\.?0+$/, '');
        // ถ้า B > C แสดง ↑, ถ้า B < C แสดง ↓
        if (diff > 0) {
            return `${absValue}↑`;
        } else {
            return `${absValue}↓`;
        }
    };

    // Calculate overall DATA PITCHING - Y = max(DIFF) - min(DIFF) ของทั้ง 3 แถว
    const getDataPitching = () => {
        const diffValues = [];
        for (let i = 0; i < rows; i++) {
            // Reference row มีค่า DIFF = 0 เสมอ
            if (i === referenceRow) {
                diffValues.push(0);
                continue;
            }
            const bVal = parseFloat((data.b || [])[i]);
            const cVal = parseFloat((data.c || [])[i]);
            if (!isNaN(bVal) && !isNaN(cVal)) {
                diffValues.push(bVal - cVal);
            }
        }
        if (diffValues.length < 2) return '';
        const maxDiff = Math.max(...diffValues);
        const minDiff = Math.min(...diffValues);
        return Math.abs(maxDiff - minDiff).toFixed(2).replace(/\.?0+$/, '');
    };

    // Validate DATA PITCHING value
    // Validate DATA PITCHING value
    const isDataPitchingValid = () => {
        return validateValue(getDataPitching(), {
            maxValue: standard.max, // Check absolute value <= max
            validateStd: true,
            useAbs: true
        });
    };

    // Render rows
    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const isReference = i === referenceRow;
            const validB = isReference ? true : isValid('b', i);
            const validC = isReference ? true : isValid('c', i);

            if (isReference) {
                // Reference row - แสดงค่า 0 พร้อมลูกศร
                rowElements.push(
                    <tr key={i}>
                        <td className="border border-black p-1 text-center font-medium">{rowHeaders[i]}</td>
                        <td className="border border-black p-1 text-center text-sm bg-gray-50">0↕</td>
                        <td className="border border-black p-1 text-center text-sm bg-gray-50">0↕</td>
                        <td className="border border-black p-1 text-center text-sm">0↕</td>
                    </tr>
                );
            } else {
                // Normal row - รับ input ได้
                const rowDataB = data['b'] || [];
                const valB = rowDataB[i];
                const isReqErrorB = isSubmitted && (valB === '' || valB === null || valB === undefined);

                const rowDataC = data['c'] || [];
                const valC = rowDataC[i];
                const isReqErrorC = isSubmitted && (valC === '' || valC === null || valC === undefined);

                rowElements.push(
                    <tr key={i}>
                        <td className="border border-black p-1 text-center font-medium">{rowHeaders[i]}</td>
                        <td className={`border p-1 ${isReqErrorB ? 'border-red-500 border-2' : 'border-black'} ${!isReqErrorB && !validB ? 'bg-red-200' : ''}`}>
                            <input
                                ref={(el) => (inputRefsB.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                value={getInputValue('b', i)}
                                onFocus={() => handleFocus('b', i)}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onBlur={() => handleBlur('b', i)}
                                onKeyDown={(e) => handleKeyDown(e, 'b', i)}
                                className="w-full h-full text-center bg-transparent outline-none text-sm"
                            />
                        </td>
                        <td className={`border p-1 ${isReqErrorC ? 'border-red-500 border-2' : 'border-black'} ${!isReqErrorC && !validC ? 'bg-red-200' : ''}`}>
                            <input
                                ref={(el) => (inputRefsC.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                value={getInputValue('c', i)}
                                onFocus={() => handleFocus('c', i)}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onBlur={() => handleBlur('c', i)}
                                onKeyDown={(e) => handleKeyDown(e, 'c', i)}
                                className="w-full h-full text-center bg-transparent outline-none text-sm"
                            />
                        </td>
                        <td className={`border border-black p-1 text-center text-sm ${!isDiffValid(i) ? 'bg-red-200' : ''}`}>
                            {getDiff(i)}
                        </td>
                    </tr>
                );
            }
        }
        return rowElements;
    };

    return (
        <div>
            <table className="border-collapse border border-black text-sm">
                <thead>
                    <tr>
                        <th className="border border-black p-1 w-10 text-center bg-gray-50"></th>
                        <th className="border border-black p-1 w-16 text-center">B</th>
                        <th className="border border-black p-1 w-16 text-center">C</th>
                        <th className="border border-black p-1 w-16 text-center">DIFF</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            <div className="mt-1 flex items-center text-sm">
                <span className="font-medium mr-2">DATA PITCHING - Y =</span>
                <span className={`border-b border-black min-w-16 text-center ${!isDataPitchingValid() ? 'bg-red-200' : ''}`}>{getDataPitching()}</span>
            </div>
        </div>
    );
}

export default TablePitchingY;
