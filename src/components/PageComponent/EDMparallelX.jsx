import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EDMparallelX Component
 * ตารางแสดงข้อมูล Parallel X แบบแนวนอน (คอลัมน์ 1-7)
 * - แถว B: input row
 * - แถว A = Kb: input row  
 * - แถว A+B: แสดงค่า A + B (ผลบวก)
 * - Auto focus เมื่อกด Enter
 * - รับ input เป็นตัวเลขเท่านั้น
 * - ไม่มีลูกศรบอกทิศทาง
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { b: [], a: [] }
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Array} props.standards - ค่า STD แต่ละคอลัมน์ [{min: 0, max: 5}, ...]
 * @param {number} props.cols - จำนวนคอลัมน์ (default: 7)
 * @param {boolean} props.showStd - แสดง/ซ่อน row STD (default: false)
 * @param {boolean} props.validateStd - เปิด/ปิดการตรวจสอบค่า (default: true)
 */
function EDMparallelX({
    data = { b: [], a: [] },
    onChange = () => { },
    standards = [],
    cols = 7,
    showStd = false,
    validateStd = true
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsB = useRef([]);
    const inputRefsA = useRef([]);

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

    // Format STD display
    const formatStd = (std) => {
        if (!std) return '';
        if (std.min === std.max) return std.min.toString();
        return `${std.min} - ${std.max}`;
    };

    const handleFocus = (row, index) => {
        const rowData = data[row] || [];
        const currentValue = rowData[index] || '';
        setEditingCell({ row, index });
        setEditingValue(currentValue);
    };

    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    const justCommittedRef = useRef(false);

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
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell && editingCell.row === row && editingCell.index === index) {
            commitValue(row, index);
        }
    };

    const handleKeyDown = (e, row, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(row, index);

            if (row === 'b') {
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => {
                        const firstA = inputRefsA.current[0];
                        if (firstA) firstA.focus();
                        else if (inputRefsA.current.find(r => r)) inputRefsA.current.find(r => r).focus();
                    }
                });
            } else if (row === 'a') {
                moveFocus(e, index, inputRefsA.current, { direction: 1 });
            }
        }
    };

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
            validateStd,
            useAbs: true
        });
    };

    // Calculate A+B (sum)
    const getSum = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const aVal = parseFloat((data.a || [])[index]);
        if (isNaN(bVal) || isNaN(aVal)) return '';
        return (aVal + bVal).toFixed(2).replace(/\.?0+$/, '');
    };

    // Validate A+B
    const isSumValid = (index) => {
        const std = standards[index] || {};
        return validateValue(getSum(index), {
            min: std.min,
            max: std.max,
            validateStd,
            useAbs: true
        });
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

    const renderSumCols = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const valid = isSumValid(i);
            cells.push(
                <td key={i} className={`border border-black p-1 text-center ${!valid ? 'bg-red-200' : ''}`}>{getSum(i)}</td>
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
                    <td className="border border-black p-1 text-center font-medium">B</td>
                    {renderInputCols('b', inputRefsB)}
                </tr>
                <tr>
                    <td className="border border-black p-1 text-center font-medium">A = Kb</td>
                    {renderInputCols('a', inputRefsA)}
                </tr>
                <tr>
                    <td className="border border-black p-1 text-center font-medium">A+B</td>
                    {renderSumCols()}
                </tr>
            </tbody>
        </table>
    );
}

export default EDMparallelX;
