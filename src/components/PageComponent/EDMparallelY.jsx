import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EDMparallelY Component
 * ตารางแสดงข้อมูล Parallel Y แบบ 4 คอลัมน์ (No., A=KB, B, A+B)
 * - Auto focus เมื่อกด Enter (ล่างขึ้นบน)
 * - รับ input เป็นตัวเลขเท่านั้น
 * - ไม่มีลูกศรบอกทิศทาง
 * - แสดงค่า A+B = A + B (ผลบวก)
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูลแถว [{a: '', b: ''}, ...]
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละแถว [{min: 0, max: 5}, ...]
 * @param {number} props.rows - จำนวนแถว (default: 9)
 * @param {boolean} props.showStd - แสดง/ซ่อน column STD (default: false)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า (default: true)
 */
function EDMparallelY({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 9,
    showStd = false,
    validateStd = true
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsA = useRef([]);
    const inputRefsB = useRef([]);

    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดง (ไม่มีลูกศร)
    const formatDisplay = (value) => {
        if (value === '' || value === undefined || value === null) return '';
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        return num.toString();
    };

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => cleanNumericInput(value);

    const handleFocus = (index, column) => {
        const rowData = data[index] || { a: '', b: '' };
        const currentValue = rowData[column] || '';
        setEditingCell({ index, column });
        setEditingValue(currentValue);
    };

    const handleChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    const commitValue = (index, column) => {
        const numericValue = parseInput(editingValue);
        const newData = [...data];
        if (!newData[index]) {
            newData[index] = { a: '', b: '' };
        }
        newData[index][column] = numericValue;
        onChange(newData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (index, column) => {
        commitValue(index, column);
    };

    // Handle Enter key - auto focus ล่างขึ้นบน
    const handleKeyDown = (e, index, column) => {
        if (e.key === 'Enter') {
            commitValue(index, column); // Note: commitValue clears editingCell but does not use index passed to it, uses state.
            // But wait, commitValue(index, column) DOES use passed args in the original code? 
            // In original code: commitValue(index, column) -> uses parseInput(editingValue). 
            // `moveFocus` with direction -1 will act like "ArrowUp" or "Shift+Tab" logic visually if items are indexed top-down.
            // Wait, rows are rendered 0 to N (top to bottom).
            // But requirement says "Auto focus เมื่อกด Enter (ล่างขึ้นบน)".
            // This means entering data usually happens from bottom to top?
            // "No." column: 1, 2, ... rows
            // If the user wants to go UP, we use direction -1.

            if (column === 'a') {
                moveFocus(e, index, inputRefsA.current, {
                    direction: -1,
                    onBoundary: () => {
                        // Reached top of A (index 0).
                        // Go to B top (index 0) or bottom?
                        // Original logic: `if (index === 0) inputRefsB.current[0].focus()`
                        // So A goes up -> then jumps to B top -> then B goes down?
                        // Original logic for B: `nextIndex = index + 1`. So B goes down.
                        const firstB = inputRefsB.current[0];
                        if (firstB) firstB.focus();
                    }
                });
            } else if (column === 'b') {
                moveFocus(e, index, inputRefsB.current, { direction: 1 });
            }
        }
    };

    const getInputValue = (index, column) => {
        const isEditing = editingCell && editingCell.index === index && editingCell.column === column;
        if (isEditing) {
            return editingValue;
        }
        const rowData = data[index] || { a: '', b: '' };
        return formatDisplay(rowData[column]);
    };

    // คำนวณ A+B และ validate
    const getRowStatus = (index) => {
        const rowData = data[index] || { a: '', b: '' };
        const std = standards[index] || { min: 0, max: 0 };

        const aVal = parseFloat(rowData.a);
        const bVal = parseFloat(rowData.b);

        // คำนวณ A+B (ผลบวก)
        let sum = '';
        if (!isNaN(aVal) && !isNaN(bVal)) {
            sum = (aVal + bVal).toFixed(2).replace(/\.?0+$/, '');
        }

        const isAValid = validateValue(rowData.a, {
            min: std.min,
            max: std.max,
            validateStd,
            useAbs: true
        });

        const isBValid = validateValue(rowData.b, {
            min: std.min,
            max: std.max,
            validateStd,
            useAbs: true
        });

        const isSumValid = validateValue(sum, {
            min: std.min,
            max: std.max,
            validateStd,
            useAbs: true
        });

        return { sum, isAValid, isBValid, isSumValid };
    };

    const formatStd = (std) => {
        if (!std) return '';
        if (std.min === std.max) return std.min.toString();
        return `${std.min} - ${std.max}`;
    };

    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const std = standards[i] || { min: 0, max: 0 };
            const { sum, isAValid, isBValid, isSumValid } = getRowStatus(i);

            rowElements.push(
                <tr key={i}>
                    <td className="border border-black py-0.5 px-1 text-center w-8">{i + 1}</td>
                    {showStd && <td className="border border-black py-0.5 px-1 text-center w-14">{formatStd(std)}</td>}
                    <td className={`border border-black py-0.5 px-1 ${!isAValid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsA.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i, 'a')}
                            onFocus={() => handleFocus(i, 'a')}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur(i, 'a')}
                            onKeyDown={(e) => handleKeyDown(e, i, 'a')}
                            className="w-full h-full text-center bg-transparent outline-none"
                        />
                    </td>
                    <td className={`border border-black py-0.5 px-1 ${!isBValid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsB.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i, 'b')}
                            onFocus={() => handleFocus(i, 'b')}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur(i, 'b')}
                            onKeyDown={(e) => handleKeyDown(e, i, 'b')}
                            className="w-full h-full text-center bg-transparent outline-none"
                        />
                    </td>
                    <td className={`border border-black py-0.5 px-1 text-center w-12 ${!isSumValid ? 'bg-red-200' : ''}`}>
                        {sum}
                    </td>
                </tr>
            );
        }
        return rowElements;
    };

    return (
        <table className="border-collapse border border-black text-sm w-60">
            <thead>
                <tr>
                    <th rowSpan="2" className="border border-black w-8">No.</th>
                    {showStd && <th rowSpan="2" className="border border-black w-14">STD.</th>}
                    <th className="border border-black w-14">A=KB</th>
                    <th className="border border-black w-14">B</th>
                    <th rowSpan="2" className="border border-black w-12">A+B</th>
                </tr>
                <tr>
                    <th className="border border-black">DATA</th>
                    <th className="border border-black">DATA</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default EDMparallelY;
