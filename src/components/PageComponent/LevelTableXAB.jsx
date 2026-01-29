import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { useFormContext } from 'react-hook-form';

// ...

/**
* LevelTableXAB Component
* ตารางแสดงข้อมูล Level แบบแนวนอน (คอลัมน์ 1-7)
* - แถว B: กด Enter จะ focus คอลัมน์ถัดไป (ซ้ายไปขวา)
* - แถว A = Kb: กด Enter จะ focus คอลัมน์ถัดไป (ซ้ายไปขวา)
* - รับ input เป็นตัวเลขเท่านั้น
* - Validate ค่าตาม standards
* 
* @param {Object} props
* @param {Object} props.data - ข้อมูล { b: [], a: [] }
* @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
* @param {Array} props.standards - ค่า STD แต่ละคอลัมน์ [{min: 0, max: 5, arrow: '-'}, ...]
* @param {number} props.cols - จำนวนคอลัมน์ (default: 7)
* @param {boolean} props.showStd - แสดงแถว STD หรือไม่ (default: true)
* @param {boolean} props.validateStd - เช็ค STD หรือไม่ (default: true)
*/
function LevelTableXAB({
    data = { b: [], a: [] },
    onChange = () => { },
    standards = [],
    cols = 7,
    labelA = "A = Kb",
    labelB = "B",
    showStd = true,
    validateStd = true
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    // Refs สำหรับ input fields
    const inputRefsB = useRef([]);
    const inputRefsA = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ focus
    const handleFocus = (row, index) => {
        const rowData = data[row] || [];
        const currentValue = rowData[index] || '';
        setEditingCell({ row, index });
        setEditingValue(currentValue);
    };

    // แปลงค่าที่แสดงเป็นลูกศร (ซ้าย/ขวา สำหรับ X axis)
    // ค่าลบ: ลูกศรซ้ายอยู่ด้านหน้า (←5)
    // ค่าบวก: ลูกศรขวาอยู่ด้านหลัง (5→)
    // แปลงค่าที่แสดงเป็นลูกศร (ซ้าย/ขวา สำหรับ X axis)
    const formatDisplay = (value) => formatWithArrows(value, 'x');

    // แปลงค่าจาก input เป็นตัวเลข
    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // เมื่อ blur หรือ Enter - บันทึกค่า
    const commitValue = (row, index) => {
        const numericValue = parseInput(editingValue);

        const newData = { ...data };
        if (!newData[row]) {
            newData[row] = [];
        }
        newData[row][index] = numericValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    // Handle blur
    const handleBlur = (row, index) => {
        // Skip if we just committed via Enter
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        // Only commit if still editing this cell
        if (editingCell && editingCell.row === row && editingCell.index === index) {
            commitValue(row, index);
        }
    };

    // Handle Enter key สำหรับ auto focus
    const handleKeyDown = (e, row, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(row, index);

            if (row === 'b') {
                // B row: Left -> Right
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => {
                        // End of B, go to start of A
                        if (inputRefsA.current[0]) inputRefsA.current[0].focus();
                    }
                });
            } else if (row === 'a') {
                // A row: Left -> Right
                moveFocus(e, index, inputRefsA.current, { direction: 1 });
            }
        }
    };

    // Get display value for input
    const getInputValue = (row, index) => {
        const isEditing = editingCell && editingCell.row === row && editingCell.index === index;
        if (isEditing) {
            return editingValue;
        }
        const rowData = data[row] || [];
        return formatDisplay(rowData[index]);
    };

    // Validate value against standard
    const isValid = (row, index) => {
        const std = standards[index] || {};
        const rowData = data[row] || [];
        return validateValue(rowData[index], {
            min: std.min,
            max: std.max,
            validateStd,
            useAbs: true
        });
    };

    // Format STD display with arrow (left/right for X axis)
    const formatStd = (std) => {
        if (!std) return '';
        const { min, max, arrow } = std;
        const arrowSymbol = arrow === '-' ? '←' : arrow === '+' ? '→' : '';
        if (min === max) {
            return `${min}${arrowSymbol}`;
        }
        return `${min}~${max}${arrowSymbol}`;
    };

    const renderHeaderCols = () => {
        const headers = [];
        for (let i = 0; i < cols; i++) {
            headers.push(
                <th key={i} className="border border-black p-1 w-12 text-center">{i + 1}</th>
            );
        }
        return headers;
    };

    // Render STD row
    const renderStdRow = () => {
        const stdCells = [];
        for (let i = 0; i < cols; i++) {
            const std = standards[i] || null;
            stdCells.push(
                <td key={i} className="border border-black p-1 text-center text-xs">
                    {std ? formatStd(std) : ''}
                </td>
            );
        }
        return stdCells;
    };

    const renderInputCols = (row, refs) => {
        const inputs = [];
        for (let i = 0; i < cols; i++) {
            const valid = isValid(row, i);
            const val = getInputValue(row, i);
            // Check if empty and submitted
            // getInputValue returns formatted string. data[row][i] is raw.
            const rawVal = data[row]?.[i];
            const isReqError = isSubmitted && (rawVal === '' || rawVal === null || rawVal === undefined);

            inputs.push(
                <td key={i} className={`border border-black p-1 ${isReqError ? 'border-red-500 border-2' : ''} ${!isReqError && !valid ? 'bg-red-200' : ''}`}>
                    <input
                        ref={(el) => (refs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        value={getInputValue(row, i)}
                        onFocus={() => handleFocus(row, i)}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleBlur(row, i)}
                        onKeyDown={(e) => handleKeyDown(e, row, i)}
                        className="w-full h-full text-center bg-transparent outline-none"
                    />
                </td>
            );
        }
        return inputs;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th className="border border-black p-1 w-16 bg-gray-100">
                    </th>
                    {renderHeaderCols()}
                </tr>
            </thead>
            <tbody>
                {showStd && (
                    <tr>
                        <td className="border border-black p-1 text-center font-medium bg-gray-100">STD</td>
                        {renderStdRow()}
                    </tr>
                )}
                <tr>
                    <td className="border border-black p-1 text-center font-medium">{labelA}</td>
                    {renderInputCols('a', inputRefsA)}
                </tr>
                <tr>
                    <td className="border border-black p-1 text-center font-medium">{labelB}</td>
                    {renderInputCols('b', inputRefsB)}
                </tr>
            </tbody>
        </table>
    );
}

export default LevelTableXAB;
