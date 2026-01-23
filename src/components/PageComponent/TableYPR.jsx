import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableYPR Component
 * ตารางแสดงข้อมูล Y axis ที่มี P และ R columns
 * - P: ใช้ลูกศรขึ้นลง (↑ ↓) แทนค่าบวก/ลบ
 * - R: ใช้ลูกศรซ้ายขวา (← →) แทนค่าลบ/บวก
 * - STD: ค่า +5 ถึง -5 ทั้ง P และ R
 * - Auto focus เมื่อกด Enter
 * - รับ input เป็นตัวเลขเท่านั้น
 * - Validate ค่าตาม STD
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูลแถว [{p: '', r: ''}, ...]
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละแถว [{p: {min: -5, max: 5}, r: {min: -5, max: 5}}, ...]
 * @param {number} props.rows - จำนวนแถว (default: 3)
 */
function TableYPR({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 3,
    referenceRow = 1  // แถวที่เป็นจุดอ้างอิง (0-indexed), default แถวกลาง
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsP = useRef([]);
    const inputRefsR = useRef([]);

    // Track which cell is being edited (null = none)
    const [editingCell, setEditingCell] = useState(null);
    // Track the raw input value while editing
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร สำหรับ P (ขึ้น/ลง)
    const formatDisplayP = (value) => formatWithArrows(value, 'y');

    // แปลงค่าที่แสดงเป็นลูกศร สำหรับ R (ซ้าย/ขวา)
    const formatDisplayR = (value) => formatWithArrows(value, 'x');

    // แปลงค่าจาก input เป็นตัวเลข สำหรับ P (รองรับ ↑ ↓)
    const parseInputP = (value) => parseArrowInput(value);

    // แปลงค่าจาก input เป็นตัวเลข สำหรับ R (รองรับ ← →)
    const parseInputR = (value) => parseArrowInput(value);

    // เมื่อ focus เริ่ม edit
    const handleFocus = (index, column) => {
        const rowData = data[index] || { p: '', r: '' };
        const currentValue = rowData[column] || '';
        setEditingCell({ index, column });
        setEditingValue(currentValue);
    };

    // เมื่อพิมพ์
    const handleChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // เมื่อ blur หรือ Enter - บันทึกค่า
    const commitValue = (index, column) => {
        const parseFunc = column === 'p' ? parseInputP : parseInputR;
        const numericValue = parseFunc(editingValue);

        const newData = [...data];
        if (!newData[index]) {
            newData[index] = { p: '', r: '' };
        }
        newData[index][column] = numericValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    // Handle blur
    const handleBlur = (index, column) => {
        commitValue(index, column);
    };

    // Handle Enter key สำหรับ auto focus
    const handleKeyDown = (e, index, column) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitValue(index, column); // Note: commitValue invalidates editingCell ref, so we must rely on passed index

            if (column === 'p') {
                // Focus R next to it
                if (inputRefsR.current[index]) {
                    inputRefsR.current[index].focus();
                }
            } else if (column === 'r') {
                // Focus P of next row
                // Find next P ref (skip holes)
                // Since this is vertical flow logic but components might have holes,
                // we'll assume linear navigation is P[i] -> R[i] -> P[i+1].
                // We'll use manual logic here since moveFocus is designed for single list traversal.
                // Or I can use moveFocus(e, index, inputRefsP.current, { direction: 1 }) if I pass index+1 manually?
                // But moveFocus takes current index.
                // moveFocus(e, index, inputRefsP.current, { direction: 1 }) -> finds inputRefsP[index+1].
                // Yes! That's what we want.

                moveFocus(e, index, inputRefsP.current, { direction: 1 });
            }
        }
    };

    // Validate value ตาม STD
    const isValid = (index, column) => {
        const rowData = data[index] || { p: '', r: '' };
        const stdRow = standards[index] || {};
        const std = stdRow[column] || { min: -5, max: 5 };

        return validateValue(rowData[column], {
            min: std.min,
            max: std.max,
            validateStd: true
        });
    };

    // Format STD display สำหรับ P (ขึ้น/ลง)
    const formatStdP = (std) => {
        if (!std) return '↕';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        // แสดงแบบลูกศรสองทิศทาง เช่น ↕5
        if (minAbs === maxAbs) {
            return `↕${maxAbs}`;
        }
        return `${maxAbs}↑ - ${minAbs}↓`;
    };

    // Format STD display สำหรับ R (ซ้าย/ขวา)
    const formatStdR = (std) => {
        if (!std) return '←→';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        // แสดงแบบลูกศรสองทิศทาง เช่น ↔5
        if (minAbs === maxAbs) {
            return `←${maxAbs}→`;
        }
        return `←${minAbs} - ${maxAbs}→`;
    };

    // Get display value for input
    const getInputValue = (index, column) => {
        const isEditing = editingCell && editingCell.index === index && editingCell.column === column;
        if (isEditing) {
            return editingValue;
        }
        const rowData = data[index] || { p: '', r: '' };
        if (column === 'p') {
            return formatDisplayP(rowData[column]);
        }
        return formatDisplayR(rowData[column]);
    };

    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const isReference = i === referenceRow;
            const stdRow = standards[i] || { p: { min: -5, max: 5 }, r: { min: -5, max: 5 } };
            const isPValid = isReference ? true : isValid(i, 'p');
            const isRValid = isReference ? true : isValid(i, 'r');

            if (isReference) {
                // แถวอ้างอิง - แสดงค่า 0 พร้อมลูกศรบอกทิศทาง และไม่สามารถแก้ไขได้
                rowElements.push(
                    <tr key={i}>
                        {/* Fixed P = 0 with vertical arrow */}
                        <td className="border border-black p-1 w-12 text-center text-sm bg-gray-50">
                            0↕
                        </td>
                        {/* Fixed R = 0 with horizontal arrow */}
                        <td className="border border-black p-1 w-12 text-center text-sm bg-gray-50">
                            ←0→
                        </td>
                        {/* STD P = 0 */}
                        <td className="border border-black p-1 w-12 text-center text-xs bg-gray-100">
                            0
                        </td>
                        {/* STD R = 0 */}
                        <td className="border border-black p-1 w-12 text-center text-xs bg-gray-100">
                            0
                        </td>
                        {/* No. */}
                        <td className="border border-black p-1 w-10 text-center bg-gray-200 font-medium">
                            {rows - i}
                        </td>
                    </tr>
                );
            } else {
                // แถวปกติ - รับ input ได้
                rowElements.push(
                    <tr key={i}>
                        {/* Input P */}
                        <td className={`border border-black p-1 w-12 ${!isPValid ? 'bg-red-200' : ''}`}>
                            <input
                                ref={(el) => (inputRefsP.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                value={getInputValue(i, 'p')}
                                onFocus={() => handleFocus(i, 'p')}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={() => handleBlur(i, 'p')}
                                onKeyDown={(e) => handleKeyDown(e, i, 'p')}
                                className="w-full h-full text-center bg-transparent outline-none text-sm"
                            />
                        </td>
                        {/* Input R */}
                        <td className={`border border-black p-1 w-12 ${!isRValid ? 'bg-red-200' : ''}`}>
                            <input
                                ref={(el) => (inputRefsR.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                value={getInputValue(i, 'r')}
                                onFocus={() => handleFocus(i, 'r')}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={() => handleBlur(i, 'r')}
                                onKeyDown={(e) => handleKeyDown(e, i, 'r')}
                                className="w-full h-full text-center bg-transparent outline-none text-sm"
                            />
                        </td>
                        {/* STD P */}
                        <td className="border border-black p-1 w-12 text-center text-xs bg-gray-100">
                            {formatStdP(stdRow.p)}
                        </td>
                        {/* STD R */}
                        <td className="border border-black p-1 w-12 text-center text-xs bg-gray-100">
                            {formatStdR(stdRow.r)}
                        </td>
                        {/* No. */}
                        <td className="border border-black p-1 w-10 text-center bg-gray-200 font-medium">
                            {rows - i}
                        </td>
                    </tr>
                );
            }
        }
        return rowElements;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th colSpan="5" className="border border-black p-2 text-center font-bold">
                        Y
                    </th>
                </tr>
                <tr>
                    <th colSpan="2" className="border border-black p-1"></th>
                    <th colSpan="3" className="border border-black p-1 text-center bg-gray-50">
                        STD
                    </th>
                </tr>
                <tr>
                    <th className="border border-black p-1 w-12 text-center">P</th>
                    <th className="border border-black p-1 w-12 text-center">R</th>
                    <th className="border border-black p-1 w-12 text-center bg-gray-100">P</th>
                    <th className="border border-black p-1 w-12 text-center bg-gray-100">R</th>
                    <th className="border border-black p-1 w-10 text-center bg-gray-200">No.</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default TableYPR;
