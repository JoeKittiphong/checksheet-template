import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableYABDIFF Component
 * ตารางแสดงข้อมูล Level แบบ 5 คอลัมน์ (No., STD., A=KB, B, DIFF)
 * - Auto focus เมื่อกด Enter
 * - รับ input เป็นตัวเลขเท่านั้น
 * - แสดง ↑ แทนค่าบวก, ↓ แทนค่าลบ (หลังกด Enter หรือ blur)
 * - Validate ค่าตาม STD (standard)
 * - แสดงค่า DIFF = |A - B|
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูลแถว [{a: '', b: ''}, ...]
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละแถว [{min: 0, max: 5, arrow: 'up'}, ...]
 * @param {number} props.rows - จำนวนแถว (default: 7)
 * @param {boolean} props.showStd - แสดง/ซ่อน column STD (default: true)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า standard (default: true)
 * @param {boolean} props.useArrow - ใช้ลูกศรบอกทิศทางในค่า input (default: true)
 */
function TableYABDIFF({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 7,
    showStd = true,
    validateStd = true,
    useArrow = true
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsA = useRef([]);
    const inputRefsB = useRef([]);

    // Track which cell is being edited (null = none)
    const [editingCell, setEditingCell] = useState(null);
    // Track the raw input value while editing
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร (สำหรับ cells ที่ไม่ได้ edit)
    // แปลงค่าที่แสดง (มีลูกศร)
    const formatDisplay = (value) => {
        if (!useArrow) {
            // If not using arrow, just return string or 0
            if (value === '' || value === undefined || value === null) return '';
            const num = parseFloat(value);
            return isNaN(num) ? value : (num === 0 ? '0' : num.toString());
        }
        return formatWithArrows(value, 'y');
    };

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // เมื่อ focus เริ่ม edit
    const handleFocus = (index, column) => {
        const rowData = data[index] || { a: '', b: '' };
        const currentValue = rowData[column] || '';
        setEditingCell({ index, column });
        setEditingValue(currentValue); // แสดงค่าจริง ไม่ใช่ format
    };

    // เมื่อพิมพ์
    const handleChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // เมื่อ blur หรือ Enter - บันทึกค่า
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

    // Handle blur
    const handleBlur = (index, column) => {
        commitValue(index, column);
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

    // คำนวณ DIFF และ validate
    const getRowStatus = (index) => {
        const rowData = data[index] || { a: '', b: '' };
        const std = standards[index] || { min: 0, max: 0 };

        const aVal = parseFloat(rowData.a);
        const bVal = parseFloat(rowData.b);

        // คำนวณ DIFF (absolute difference)
        let diff = '';
        if (!isNaN(aVal) && !isNaN(bVal)) {
            diff = Math.abs(aVal - bVal).toFixed(2).replace(/\.?0+$/, '');
        }

        // Validate Logic
        // Use centralized utility
        const isAValid = !validateStd || rowData.a === '' || validateValue(aVal, {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });

        const isBValid = !validateStd || rowData.b === '' || validateValue(bVal, {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });

        // Validate ค่า DIFF ตาม STD (ใช้ค่า absolute กับ diff ซึ่งเป็นบวกเสมอ)
        const diffVal = parseFloat(diff);
        const maxMag = Math.max(Math.abs(std.min), Math.abs(std.max));

        const isDiffValid = !validateStd || diff === '' || validateValue(diffVal, {
            maxDiff: maxMag,
            validateStd,
            useAbs: true
        });

        return { diff, isAValid, isBValid, isDiffValid };
    };

    // Format STD display
    // ค่าบวก (+): 5→ - 0
    // ค่าลบ (-): ←5 - 0
    const formatStd = (std) => {
        if (!std) return '';
        if (std.min === std.max) {
            return std.min.toString();
        }

        // Use absolute values for display
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);

        if (std.arrow === 'up' || std.arrow === '+') {
            // For positive, usually min=0, max=5. Display 5-> - 0
            return `${maxAbs}↑ - ${minAbs}`;
        } else if (std.arrow === 'down' || std.arrow === '-') {
            // For negative arrow, usually min=-5, max=0. Display <-5 - 0
            return `${minAbs}↓ - ${maxAbs}`;
        }
        return `${std.min} - ${std.max}`;
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

    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const std = standards[i] || { min: 0, max: 5 };
            const { diff, isAValid, isBValid, isDiffValid } = getRowStatus(i);

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
                    <td className="border border-black py-0.5 px-1 text-center w-12">
                        {diff}
                    </td>
                </tr>
            );
        }
        return rowElements;
    };

    return (
        <table className="border-collapse border border-black text-sm w-60 h-70">
            <thead>
                <tr>
                    <th rowSpan="2" className="border border-black w-8">No.</th>
                    {showStd && <th rowSpan="2" className="border border-black w-14">STD.</th>}
                    <th className="border border-black w-14">A=KB</th>
                    <th className="border border-black w-14">B</th>
                    <th rowSpan="2" className="border border-black w-12">DIFF</th>
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

export default TableYABDIFF;
