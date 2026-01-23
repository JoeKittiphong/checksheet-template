import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableRollingX Component
 * ตารางแสดงข้อมูล Rolling X axis
 * - คอลัมน์: X+, X0 (reference), X-
 * - แถว: B, T, DIFF
 * - ใช้ลูกศรขึ้นลง (↑ ↓) แทนค่าบวก/ลบ
 * - DIFF = B - T
 * - X0 เป็นจุดอ้างอิง แสดง 0 ไม่สามารถแก้ไขได้
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { b: [], t: [] } สำหรับแต่ละคอลัมน์
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Object} props.standard - ค่า STD เดียว {min: -20, max: 20} ใช้กับทุกตำแหน่ง
 * @param {number} props.referenceCol - คอลัมน์ที่เป็นจุดอ้างอิง (0-indexed), default = 1 (X0)
 */
function TableRollingX({
    data = { b: [], t: [] },
    onChange = () => { },
    standard = { min: -20, max: 20 },
    referenceCol = 1,  // X0 เป็น reference (0-indexed)
    showRowT = true,   // แสดง/ซ่อน row T
    showRowDiff = true // แสดง/ซ่อน row DIFF
}) {
    const cols = 3; // X+, X0, X-
    const colHeaders = ['X+', 'X0', 'X-'];

    const { moveFocus } = useFocusNavigation();
    const inputRefsB = useRef([]);
    const inputRefsT = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดงเป็นลูกศร (ขึ้น/ลง)
    const formatDisplay = (value) => formatWithArrows(value, 'y');

    // แปลงค่าจาก input เป็นตัวเลข
    const parseInput = (value) => parseArrowInput(value);

    // Format STD display
    const formatStd = (std) => {
        if (!std) return '↕';
        const minAbs = Math.abs(std.min);
        const maxAbs = Math.abs(std.max);
        if (minAbs === maxAbs) {
            return `↕${maxAbs}`;
        }
        return `${maxAbs}↑ - ${minAbs}↓`;
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
        setEditingValue(cleanNumericInput(value));
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
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell && editingCell.row === row && editingCell.index === index) {
            commitValue(row, index);
        }
    };

    // Handle Enter key
    const handleKeyDown = (e, row, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(row, index);

            if (row === 'b') {
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => moveFocus(e, -1, inputRefsT.current, { direction: 1 })
                });
            } else if (row === 't') {
                moveFocus(e, index, inputRefsT.current, { direction: 1 });
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
        const rowData = data[row] || [];
        return validateValue(rowData[index], {
            min: standard.min,
            max: standard.max,
            validateStd: true
        });
    };

    // Validate DIFF value
    // Validate DIFF value
    const isDiffValid = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const tVal = parseFloat((data.t || [])[index]);
        if (isNaN(bVal) || isNaN(tVal)) return true;
        return validateValue(bVal - tVal, {
            min: standard.min,
            max: standard.max,
            validateStd: true
        });
    };

    // Calculate DIFF = B - T (with direction arrows)
    const getDiff = (index) => {
        const bVal = parseFloat((data.b || [])[index]);
        const tVal = parseFloat((data.t || [])[index]);
        if (isNaN(bVal) || isNaN(tVal)) return '';
        const diff = bVal - tVal;
        if (diff === 0) return '0';
        const absValue = Math.abs(diff).toFixed(2).replace(/\.?0+$/, '');
        // ถ้า B > T แสดง ↑, ถ้า B < T แสดง ↓
        if (diff > 0) {
            return `${absValue}↑`;
        } else {
            return `${absValue}↓`;
        }
    };

    // Render header columns
    const renderHeaderCols = () => {
        return colHeaders.map((header, i) => (
            <th key={i} className="border border-black p-1 w-16 text-center">{header}</th>
        ));
    };

    // Render B row
    const renderBRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const valid = isReference ? true : isValid('b', i);

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
                            ref={(el) => (inputRefsB.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('b', i)}
                            onFocus={() => handleFocus('b', i)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('b', i)}
                            onKeyDown={(e) => handleKeyDown(e, 'b', i)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                );
            }
        }
        return cells;
    };

    // Render T row
    const renderTRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const valid = isReference ? true : isValid('t', i);

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
                            ref={(el) => (inputRefsT.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('t', i)}
                            onFocus={() => handleFocus('t', i)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('t', i)}
                            onKeyDown={(e) => handleKeyDown(e, 't', i)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                );
            }
        }
        return cells;
    };

    // Render DIFF row
    const renderDiffRow = () => {
        const cells = [];
        for (let i = 0; i < cols; i++) {
            const isReference = i === referenceCol;
            const diffValid = isReference ? true : isDiffValid(i);
            cells.push(
                <td key={i} className={`border border-black p-1 text-center text-sm ${!diffValid ? 'bg-red-200' : ''}`}>
                    {isReference ? '0↕' : getDiff(i)}
                </td>
            );
        }
        return cells;
    };

    // Calculate overall DATA ROLLING - X = max - min ของทั้ง 3 คอลัมน์
    // ถ้าซ่อน row T ให้คำนวณจากค่า B แทน DIFF
    const getDataRolling = () => {
        const values = [];
        for (let i = 0; i < cols; i++) {
            // Reference column มีค่า = 0 เสมอ
            if (i === referenceCol) {
                values.push(0);
                continue;
            }

            if (showRowT) {
                // ใช้ DIFF = B - T
                const bVal = parseFloat((data.b || [])[i]);
                const tVal = parseFloat((data.t || [])[i]);
                if (!isNaN(bVal) && !isNaN(tVal)) {
                    values.push(bVal - tVal);
                }
            } else {
                // ใช้แค่ค่า B
                const bVal = parseFloat((data.b || [])[i]);
                if (!isNaN(bVal)) {
                    values.push(bVal);
                }
            }
        }
        if (values.length < 2) return '';
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(2).replace(/\.?0+$/, '');
    };

    // Validate DATA ROLLING value
    // Validate DATA ROLLING value
    const isDataRollingValid = () => {
        return validateValue(getDataRolling(), {
            maxValue: standard.max, // Check absolute value <= max
            validateStd: true,
            useAbs: true
        });
    };

    return (
        <div>
            <table className="border-collapse border border-black text-sm">
                <thead>
                    <tr>
                        <th className="border border-black p-1 w-12 text-center bg-gray-50"></th>
                        {renderHeaderCols()}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-black p-1 text-center font-medium">B</td>
                        {renderBRow()}
                    </tr>
                    {showRowT && (
                        <tr>
                            <td className="border border-black p-1 text-center font-medium">T</td>
                            {renderTRow()}
                        </tr>
                    )}
                    {showRowDiff && (
                        <tr>
                            <td className="border border-black p-1 text-center font-medium">DIFF</td>
                            {renderDiffRow()}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-1 flex items-center text-sm">
                <span className="font-medium mr-2">DATA ROLLING - X =</span>
                <span className={`border-b border-black min-w-16 text-center ${!isDataRollingValid() ? 'bg-red-200' : ''}`}>{getDataRolling()}</span>
            </div>
        </div>
    );
}

export default TableRollingX;
