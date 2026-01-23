import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * LevelTableYAB Component
 * ตารางแสดงข้อมูล Level แบบ 2 คอลัมน์ (A, B)
 * - คอลัมน์ A: กด Enter จะ focus แถวก่อนหน้า (จากล่างขึ้นบน) ถ้าถึงแถว 1 จะไปคอลัมน์ B แถว 1
 * - คอลัมน์ B: กด Enter จะ focus แถวถัดไป (จากบนลงล่าง)
 * - รับ input เป็นตัวเลขเท่านั้น
 * - แสดง ↑ แทนค่าบวก, ↓ แทนค่าลบ (หลังกด Enter หรือ blur)
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูลแถว [{a: '', b: ''}, ...]
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {number} props.rows - จำนวนแถว (default: 7)
 * @param {Array} props.standards - ค่า STD แต่ละแถว [{min: 0, max: 5, arrow: '-'}, ...]
 * @param {boolean} props.showStd - แสดงคอลัมน์ STD หรือไม่ (default: false)
 * @param {boolean} props.validateStd - เช็ค STD หรือไม่ (default: true)
 */
function LevelTableYAB({
    data = [],
    onChange = () => { },
    rows = 7,
    labelA = 'A',
    labelB = 'B',
    standards = [],
    showStd = false,
    validateStd = true
}) {
    const { moveFocus } = useFocusNavigation();
    // Refs สำหรับ input fields
    const inputRefsA = useRef([]);
    const inputRefsB = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ focus
    const handleFocus = (index, column) => {
        const rowData = data[index] || { a: '', b: '' };
        const currentValue = rowData[column] || '';
        setEditingCell({ index, column });
        setEditingValue(currentValue);
    };

    // แปลงค่าที่แสดงเป็นลูกศร (บน/ล่าง สำหรับ Y axis)
    const formatDisplay = (value) => formatWithArrows(value, 'y');

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // เมื่อ blur หรือ Enter - บันทึกค่า
    const commitValue = (index, column) => {
        const newData = [...data];
        if (!newData[index]) {
            newData[index] = { a: '', b: '' };
        }
        newData[index][column] = editingValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    // Handle blur
    const handleBlur = (index, column) => {
        // Skip if we just committed via Enter
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        // Only commit if still editing this cell
        if (editingCell && editingCell.index === index && editingCell.column === column) {
            commitValue(index, column);
        }
    };

    // Handle Enter key สำหรับ auto focus
    const handleKeyDown = (e, index, column) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(index, column);

            if (column === 'a') {
                // A col: Bottom -> Top (Decreasing index)
                moveFocus(e, index, inputRefsA.current, {
                    direction: -1,
                    onBoundary: () => {
                        // Top of A (index 0), go to Top of B (index 0)
                        if (inputRefsB.current[0]) inputRefsB.current[0].focus();
                    }
                });
            } else if (column === 'b') {
                // B col: Top -> Bottom (Increasing index)
                moveFocus(e, index, inputRefsB.current, { direction: 1 });
            }
        }
    };



    // Get display value for input
    const getInputValue = (index, column) => {
        const isEditing = editingCell && editingCell.index === index && editingCell.column === column;
        if (isEditing) {
            return editingValue;
        }
        const rowData = data[index] || { a: '', b: '' };
        return formatDisplay(rowData[column]);
    };

    // Validate value against standard
    const isValid = (index, column) => {
        const std = standards[index] || {};
        const rowData = data[index] || { a: '', b: '' };
        return validateValue(rowData[column], {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });
    };

    // Format STD display with arrow (up/down for Y axis)
    const formatStd = (std) => {
        if (!std) return '';
        const { min, max, arrow } = std;
        const arrowSymbol = arrow === '-' ? '↓' : arrow === '+' ? '↑' : '';
        if (min === max) {
            return `${min}${arrowSymbol}`;
        }
        return `${min}~${max}${arrowSymbol}`;
    };

    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const std = standards[i] || null;
            const validA = isValid(i, 'a');
            const validB = isValid(i, 'b');

            rowElements.push(
                <tr key={i}>
                    <td className="border border-black py-0.5 px-1 text-center w-12">{i + 1}</td>
                    {showStd && (
                        <td className="border border-black py-0.5 px-1 text-center text-xs bg-gray-50">
                            {std ? formatStd(std) : ''}
                        </td>
                    )}
                    <td className={`border border-black py-0.5 px-1 ${!validA ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsA.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i, 'a')}
                            onFocus={() => handleFocus(i, 'a')}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur(i, 'a')}
                            onKeyDown={(e) => handleKeyDown(e, i, 'a')}
                            className="w-full h-full text-center bg-transparent outline-none"
                        />
                    </td>
                    <td className={`border border-black py-0.5 px-1 ${!validB ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsB.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i, 'b')}
                            onFocus={() => handleFocus(i, 'b')}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur(i, 'b')}
                            onKeyDown={(e) => handleKeyDown(e, i, 'b')}
                            className="w-full h-full text-center bg-transparent outline-none"
                        />
                    </td>
                </tr>
            );
        }
        return rowElements;
    };

    return (
        <table className="border-collapse border border-black text-sm w-40">
            <thead>
                <tr>
                    <th rowSpan="2" className="border border-black py-0.5 px-1 w-12">No.</th>
                    {showStd && (
                        <th rowSpan="2" className="border border-black py-0.5 px-1 w-16 bg-gray-100">STD</th>
                    )}
                    <th className="border border-black py-0.5 px-1 w-24">{labelA}</th>
                    <th className="border border-black py-0.5 px-1 w-24">{labelB}</th>
                </tr>
                <tr>
                    <th className="border border-black py-0.5 px-1">DATA</th>
                    <th className="border border-black py-0.5 px-1">DATA</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default LevelTableYAB;
