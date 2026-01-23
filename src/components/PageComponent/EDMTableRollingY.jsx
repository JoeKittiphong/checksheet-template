import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EDMTableRollingY Component
 * ตารางแสดงข้อมูล Rolling แบบแนวตั้ง (สำหรับ Y axis)
 * - คอลัมน์: No., STD, ROLLING
 * - ลูกศรซ้าย/ขวา (← →)
 * - รองรับการ validate ตามค่า standard
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูลแถว ['', '', '', '', '']
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละแถว [{min: 0, max: 5}, ...]
 * @param {number} props.rows - จำนวนแถว (default: 5)
 * @param {boolean} props.showStd - แสดง/ซ่อน column STD (default: true)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า (default: true)
 */
function EDMTableRollingY({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 5,
    showStd = true,
    validateStd = true
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefs = useRef([]);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร (ซ้าย/ขวา สำหรับ Y axis Rolling)
    const formatDisplay = (value) => formatWithArrows(value, 'x');

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    const handleFocus = (index) => {
        const currentValue = data[index] || '';
        setEditingCell(index);
        setEditingValue(currentValue);
    };

    const handleChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    const commitValue = (index) => {
        const numericValue = parseInput(editingValue);
        const newData = [...data];
        newData[index] = numericValue;
        onChange(newData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (index) => {
        commitValue(index);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            commitValue(index);
            // Auto focus จากล่างขึ้นบน
            moveFocus(e, index, inputRefs.current, { direction: -1 });
        }
    };

    const getInputValue = (index) => {
        if (editingCell === index) {
            return editingValue;
        }
        return formatDisplay(data[index]);
    };

    const isValid = (index) => {
        const std = standards[index] || {};
        return validateValue(data[index], {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });
    };

    // Format STD display with arrow (ซ้าย/ขวา)
    const formatStd = (std) => {
        if (!std) return '';
        if (std.min === std.max) {
            if (std.min === 0) return '0';
            if (std.arrow === '+') return `${std.min}→`;
            if (std.arrow === '-') return `${std.min}←`;
            return std.min.toString();
        }
        if (std.arrow === '+') {
            return `${std.min}~${std.max}→`;
        } else if (std.arrow === '-') {
            return `${std.min}~${std.max}←`;
        }
        return `${std.min}~${std.max}`;
    };

    const renderRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            const std = standards[i] || { min: 0, max: 0 };
            const valid = isValid(i);
            rowElements.push(
                <tr key={i}>
                    <td className="border border-black py-0.5 px-1 text-center w-8">{i + 1}</td>
                    {showStd && <td className="border border-black py-0.5 px-1 text-center w-12">{formatStd(std)}</td>}
                    <td className={`border border-black py-0.5 px-1 ${!valid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i)}
                            onFocus={() => handleFocus(i)}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur(i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-full h-full text-center bg-transparent outline-none"
                        />
                    </td>
                </tr>
            );
        }
        return rowElements;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th className="border border-black py-0.5 px-1 w-8"></th>
                    {showStd && <th className="border border-black py-0.5 px-1 w-12">STD</th>}
                    <th className="border border-black py-0.5 px-1 w-14">ROLLING</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default EDMTableRollingY;
