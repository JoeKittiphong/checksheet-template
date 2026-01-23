import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableXPR Component
 * ตารางแสดงข้อมูล X axis แบบแนวนอน ที่มี P และ R rows
 * - P: ใช้ลูกศรซ้ายขวา (← →) แทนค่าลบ/บวก
 * - R: ใช้ลูกศรขึ้นลง (↑ ↓) แทนค่าบวก/ลบ
 * - STD: ค่า +5 ถึง -5 ทั้ง P และ R
 * - Auto focus เมื่อกด Enter
 * - รับ input เป็นตัวเลขเท่านั้น
 * - Validate ค่าตาม STD
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { p: [], r: [] }
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละคอลัมน์ [{p: {min: -5, max: 5}, r: {min: -5, max: 5}}, ...]
 * @param {number} props.cols - จำนวนคอลัมน์ (default: 3)
 * @param {number} props.referenceCol - คอลัมน์ที่เป็นจุดอ้างอิง (0-indexed), default คอลัมน์กลาง
 */
function TableXPR({
    data = { p: [], r: [] },
    onChange = () => { },
    standards = [],
    cols = 3,
    referenceCol = 1  // คอลัมน์ที่เป็นจุดอ้างอิง (0-indexed), default คอลัมน์กลาง
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsP = useRef([]);
    const inputRefsR = useRef([]);

    // Track which cell is being edited (null = none)
    const [editingCell, setEditingCell] = useState(null);
    // Track the raw input value while editing
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร สำหรับ P (ซ้าย/ขวา)
    const formatDisplayP = (value) => formatWithArrows(value, 'x');

    // แปลงค่าที่แสดงเป็นลูกศร สำหรับ R (ขึ้น/ลง)
    const formatDisplayR = (value) => formatWithArrows(value, 'y');

    // แปลงค่าจาก input เป็นตัวเลข สำหรับ P (รองรับ ← →)
    const parseInputP = (value) => parseArrowInput(value);

    // แปลงค่าจาก input เป็นตัวเลข สำหรับ R (รองรับ ↑ ↓)
    const parseInputR = (value) => parseArrowInput(value);

    // Format STD display สำหรับ P (ซ้าย/ขวา)
    const formatStdP = (std) => {
        if (!std) return '↔';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        if (minAbs === maxAbs) {
            return `←${maxAbs}→`;
        }
        return `←${minAbs} - ${maxAbs}→`;
    };

    // Format STD display สำหรับ R (ขึ้น/ลง)
    const formatStdR = (std) => {
        if (!std) return '↕';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        if (minAbs === maxAbs) {
            return `↕${maxAbs}`;
        }
        return `${maxAbs}↑ - ${minAbs}↓`;
    };

    // เมื่อ focus เริ่ม edit
    const handleFocus = (row, index) => {
        const rowData = data[row] || [];
        const currentValue = rowData[index] || '';
        setEditingCell({ row, index });
        setEditingValue(currentValue);
    };

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ blur หรือ Enter
    const commitValue = (row, index) => {
        const parseFunc = row === 'p' ? parseInputP : parseInputR;
        const numericValue = parseFunc(editingValue);

        const newData = { ...data };
        if (!newData[row]) {
            newData[row] = [];
        }
        newData[row][index] = numericValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

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

    // Handle Enter key
    const handleKeyDown = (e, row, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(row, index);

            if (row === 'p') {
                moveFocus(e, index, inputRefsP.current, {
                    direction: 1,
                    onBoundary: () => {
                        // Go to R start (find first existing ref in R)
                        // moveFocus assumes we start at index 0 if we provide logic, 
                        // but here we want to just focus whatever is available in R.
                        // I'll manually focus the first available R ref.
                        // Since inputRefsR might have holes (referenceCol), I need to find first.
                        const rRefs = inputRefsR.current;
                        const firstR = rRefs.find(r => r);
                        if (firstR) firstR.focus();
                    }
                });
            } else if (row === 'r') {
                moveFocus(e, index, inputRefsR.current, { direction: 1 });
            }
        }
    };

    // Get display value
    const getInputValue = (row, index) => {
        const isEditing = editingCell && editingCell.row === row && editingCell.index === index;
        if (isEditing) {
            return editingValue;
        }
        const rowData = data[row] || [];
        if (row === 'p') {
            return formatDisplayP(rowData[index]);
        }
        return formatDisplayR(rowData[index]);
    };

    // Validate value
    const isValid = (row, index) => {
        const std = standards[index] || {};
        const stdRow = std[row] || { min: -5, max: 5 };
        const rowData = data[row] || [];
        return validateValue(rowData[index], {
            min: stdRow.min,
            max: stdRow.max,
            validateStd: true
        });
    };

    // Render header columns (1, 2, 3, ...)
    const renderHeaderCols = () => {
        const headers = [];
        for (let i = 0; i < cols; i++) {
            headers.push(
                <th key={i} className="border border-black p-1 w-14 text-center">{i + 1}</th>
            );
        }
        return headers;
    };

    // Render STD P row
    const renderStdPRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const std = standards[i] || {};
            cells.push(
                <td key={i} className="border border-black p-1 text-center text-xs bg-gray-100">
                    {isReference ? '0' : formatStdP(std.p)}
                </td>
            );
        }
        return cells;
    };

    // Render STD R row
    const renderStdRRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const std = standards[i] || {};
            cells.push(
                <td key={i} className="border border-black p-1 text-center text-xs bg-gray-100">
                    {isReference ? '0' : formatStdR(std.r)}
                </td>
            );
        }
        return cells;
    };

    // Render Act. P row (input)
    const renderActPRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const valid = isReference ? true : isValid('p', i);

            if (isReference) {
                cells.push(
                    <td key={i} className="border border-black p-1 text-center text-sm bg-gray-50">
                        ←0→
                    </td>
                );
            } else {
                cells.push(
                    <td key={i} className={`border border-black p-1 ${!valid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsP.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('p', i)}
                            onFocus={() => handleFocus('p', i)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('p', i)}
                            onKeyDown={(e) => handleKeyDown(e, 'p', i)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                );
            }
        }
        return cells;
    };

    // Render Act. R row (input)
    const renderActRRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const valid = isReference ? true : isValid('r', i);

            if (isReference) {
                cells.push(
                    <td key={i} className="border border-black p-1 text-center text-sm bg-gray-50">
                        0↕
                    </td>
                );
            } else {
                cells.push(
                    <td key={i} className={`border border-black p-1 ${!valid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsR.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('r', i)}
                            onFocus={() => handleFocus('r', i)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('r', i)}
                            onKeyDown={(e) => handleKeyDown(e, 'r', i)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                );
            }
        }
        return cells;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <tbody>
                {/* Row 1: Header with No. and column numbers */}
                <tr>
                    <td rowSpan="5" className="border border-black p-2 text-center font-bold w-10">
                        X
                    </td>
                    <td className="border border-black p-1 w-10 text-center bg-gray-50"></td>
                    <td className="border border-black p-1 w-10 text-center bg-gray-50">No.</td>
                    {renderHeaderCols()}
                </tr>
                {/* Row 2: STD P */}
                <tr>
                    <td rowSpan="2" className="border border-black p-1 text-center font-medium bg-gray-100">
                        STD
                    </td>
                    <td className="border border-black p-1 text-center font-medium">P</td>
                    {renderStdPRow()}
                </tr>
                {/* Row 3: STD R */}
                <tr>
                    <td className="border border-black p-1 text-center font-medium">R</td>
                    {renderStdRRow()}
                </tr>
                {/* Row 4: Act. P */}
                <tr>
                    <td rowSpan="2" className="border border-black p-1 text-center font-medium">
                        Act.
                    </td>
                    <td className="border border-black p-1 text-center font-medium">P</td>
                    {renderActPRow()}
                </tr>
                {/* Row 5: Act. R */}
                <tr>
                    <td className="border border-black p-1 text-center font-medium">R</td>
                    {renderActRRow()}
                </tr>
            </tbody>
        </table>
    );
}

export default TableXPR;
