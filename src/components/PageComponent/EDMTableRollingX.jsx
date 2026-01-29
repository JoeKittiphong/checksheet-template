import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { useFormContext } from 'react-hook-form';

/**
 * EDMTableRollingX Component
 * ตารางแสดงข้อมูล Rolling แบบแนวนอน
 * - แถว: Header (1,2,3...), STD, Rolling (input)
 * - ลูกศรขึ้น/ลง (↑ ↓) สำหรับ Rolling
 * 
 * @param {Object} props
 * @param {Array} props.data - ข้อมูล input ['', '', '', '', '']
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละคอลัมน์ [{min: 0, max: 5, arrow: '+'}, ...]
 * @param {number} props.cols - จำนวนคอลัมน์ (default: 5)
 * @param {boolean} props.showStd - แสดง/ซ่อน row STD (default: true)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า (default: true)
 * @param {string} props.label - label สำหรับ row input (default: 'Rolling')
 */
function EDMTableRollingX({
    data = [],
    onChange = () => { },
    standards = [],
    cols = 5,
    showStd = true,
    validateStd = true,
    label = 'Rolling'
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    const inputRefs = useRef([]);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const justCommittedRef = useRef(false);

    // แปลงค่าที่แสดงเป็นลูกศร (ขึ้น/ลง สำหรับ Rolling)
    const formatDisplay = (value) => formatWithArrows(value, 'y');

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
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell === index) {
            commitValue(index);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(index);
            moveFocus(e, index, inputRefs.current, { direction: 1 });
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

    // Format STD display with arrow (ขึ้น/ลง)
    const formatStd = (std) => {
        if (!std) return '';
        const { min, max, arrow } = std;
        const arrowSymbol = arrow === '-' ? '↓' : arrow === '+' ? '↑' : '';
        if (min === max) {
            if (min === 0 && !arrow) return '0';
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

    const renderInputCols = () => {
        const inputs = [];
        for (let i = 0; i < cols; i++) {
            const valid = isValid(i);
            inputs.push(
                <td key={i} className={`border border-black p-1 ${!valid ? 'bg-red-200' : ''}`}>
                    <input
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        value={getInputValue(i)}
                        onFocus={() => handleFocus(i)}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={() => handleBlur(i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className={`w-full h-full text-center outline-none ${isSubmitted && !data[i] ? 'bg-red-50 border border-red-500' : 'bg-transparent'}`}
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
                    <th className="border border-black p-1 w-16 bg-gray-100"></th>
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
                    <td className="border border-black p-1 text-center font-medium">{label}</td>
                    {renderInputCols()}
                </tr>
            </tbody>
        </table>
    );
}

export default EDMTableRollingX;
