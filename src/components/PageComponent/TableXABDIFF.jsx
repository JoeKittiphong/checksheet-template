import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableXABDIFF Component
 * ตารางแสดงข้อมูล Level แบบแนวนอน (คอลัมน์ 1-7)
 * - แถว STD: แสดงค่า standard
 * - แถว B: input row
 * - แถว A = Kb: input row  
 * - แถว DIFF: แสดงค่า |A - B|
 * - Auto focus เมื่อกด Enter
 * - รับ input เป็นตัวเลขเท่านั้น
 * - แสดง ↑ แทนค่าบวก, ↓ แทนค่าลบ (หลังกด Enter หรือ blur)
 * - Validate ค่าตาม STD
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { b: [], a: [] }
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละคอลัมน์ [{min: 0, max: 5, arrow: '+'}, ...]
 * @param {number} props.cols - จำนวนคอลัมน์ (default: 7)
 * @param {boolean} props.useArrow - ใช้ลูกศรบอกทิศทางในค่า input (default: true)
 * @param {boolean} props.showStd - แสดง/ซ่อน row STD (default: true)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า STD (default: true)
 * @param {string} props.labelA - label สำหรับแถว A (default: 'A = Kb')
 * @param {string} props.labelB - label สำหรับแถว B (default: 'B')
 */
function TableXABDIFF({
    data = { b: [], a: [] },
    onChange = () => { },
    standards = [],
    cols = 7,
    useArrow = true,
    showStd = true,
    validateStd = true,
    labelA = 'A = Kb',
    labelB = 'B'
}) {
    const inputRefsB = useRef([]);
    const inputRefsA = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร
    // ค่าลบ: ลูกศรซ้ายอยู่ด้านหน้า (←5)
    // ค่าบวก: ลูกศรขวาอยู่ด้านหลัง (5→)
    // แปลงค่าที่แสดง (มีลูกศร)
    const formatDisplay = (value) => {
        if (!useArrow) {
            // If not using arrow, just return string or 0
            if (value === '' || value === undefined || value === null) return '';
            const num = parseFloat(value);
            return isNaN(num) ? value : (num === 0 ? '0' : num.toString());
        }
        return formatWithArrows(value, 'x');
    };

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // Format STD display
    // ค่าบวก (+): 5→ - 0
    // ค่าลบ (-): ←5 - 0
    // Format STD display
    // ค่าบวก (+): 5→ - 0
    // ค่าลบ (-): ←5 - 0
    const formatStd = (std) => {
        if (!std) return '';
        if (std.min === std.max) {
            return std.min.toString();
        }

        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);

        if (std.arrow === 'up' || std.arrow === '+') {
            return `${maxAbs}→ - ${minAbs}`;
        } else if (std.arrow === 'down' || std.arrow === '-') {
            return `←${minAbs} - ${maxAbs}`;
        }
        return `${std.min} - ${std.max}`;
    };

    // เมื่อ focus
    const handleFocus = (row, index) => {
        const rowData = data[row] || [];
        const currentValue = rowData[index] || '';
        setEditingCell({ row, index });
        setEditingValue(currentValue);
    };

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        const cleanValue = value.replace(/[^0-9.\-]/g, '');
        setEditingValue(cleanValue);
    };

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ blur หรือ Enter
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
                // แถว B: ไปคอลัมน์ถัดไป
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => {
                        // จบแถว B ไปเริ่มแถว A
                        if (inputRefsA.current[0]) inputRefsA.current[0].focus();
                    }
                });
            } else if (row === 'a') {
                // แถว A: ไปคอลัมน์ถัดไป
                moveFocus(e, index, inputRefsA.current, { direction: 1 });
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
        return formatDisplay(rowData[index]);
    };

    // Validate value
    const isValid = (row, index) => {
        const std = standards[index] || {};
        const rowData = data[row] || [];
        return validateValue(rowData[index], {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });
    };

    // Calculate DIFF
    const getDiff = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const aVal = parseFloat((data.a || [])[index]);
        if (isNaN(bVal) || isNaN(aVal)) return '';
        return Math.abs(aVal - bVal).toFixed(2).replace(/\.?0+$/, '');
    };

    const renderHeaderCols = () => {
        const headers = [];
        for (let i = 0; i < cols; i++) {
            headers.push(
                <th key={i} className="border border-black p-1 w-14 text-center">{i + 1}</th>
            );
        }
        return headers;
    };

    const renderStdCols = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const std = standards[i] || { min: 0, max: 0 };
            cells.push(
                <td key={i} className="border border-black p-1 text-center text-xs">{formatStd(std)}</td>
            );
        }
        return cells;
    };

    const renderInputCols = (row, refs) => {
        const inputs = [];
        for (let i = 0; i < cols; i++) {
            const valid = isValid(row, i);
            inputs.push(
                <td key={i} className={`border border-black p-1 ${!valid ? 'bg-red-200' : ''}`}>
                    <input
                        ref={(el) => (refs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        value={getInputValue(row, i)}
                        onFocus={() => handleFocus(row, i)}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleBlur(row, i)}
                        onKeyDown={(e) => handleKeyDown(e, row, i)}
                        className="w-full h-full text-center bg-transparent outline-none text-sm"
                    />
                </td>
            );
        }
        return inputs;
    };

    // Validate DIFF value
    const isDiffValid = (index) => {
        const std = standards[index] || { min: 0, max: 0 };
        const maxMag = Math.max(Math.abs(std.min), Math.abs(std.max));
        const diff = getDiff(index);

        return validateValue(diff, {
            maxDiff: maxMag,
            validateStd,
            useAbs: true
        });
    };

    const renderDiffCols = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const valid = isDiffValid(i);
            cells.push(
                <td key={i} className={`border border-black p-1 text-center ${!valid ? 'bg-red-200' : ''}`}>{getDiff(i)}</td>
            );
        }
        return cells;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th className="border border-black p-1 w-16 bg-gray-100"></th>
                    {renderHeaderCols()}
                </tr>
            </thead>
            <tbody>
                {showStd && (
                    <tr>
                        <td className="border border-black p-1 text-center font-medium">STD</td>
                        {renderStdCols()}
                    </tr>
                )}
                <tr>
                    <td className="border border-black p-1 text-center font-medium">{labelB}</td>
                    {renderInputCols('b', inputRefsB)}
                </tr>
                <tr>
                    <td className="border border-black p-1 text-center font-medium">{labelA}</td>
                    {renderInputCols('a', inputRefsA)}
                </tr>
                <tr>
                    <td className="border border-black p-1 text-center font-medium">DIFF</td>
                    {renderDiffCols()}
                </tr>
            </tbody>
        </table>
    );
}

export default TableXABDIFF;
