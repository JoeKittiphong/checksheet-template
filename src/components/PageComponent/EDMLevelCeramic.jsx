import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';

/**
 * EDMLevelCeramic Component
 * ตาราง Level Check แบบ 3x3 สำหรับ X-Axis และ Y-Axis
 * - X-Axis: ลูกศรแนวนอน (↔) แทนค่า +/-
 * - Y-Axis: ลูกศรแนวตั้ง (↕) แทนค่า +/-
 * - 9 จุด รวมจุดกลาง (mc) ที่เป็น 0
 * - คำนวณ Max dif X และ Max dif Y แยกกัน
 */
function EDMLevelCeramic({
    dataX = {},
    dataY = {},
    onChangeX = () => { },
    onChangeY = () => { },
    standardX = 20,
    standardY = 20
}) {
    // Refs for focus management
    const refsX = {
        tl: useRef(null), tc: useRef(null), tr: useRef(null),
        ml: useRef(null), mr: useRef(null),
        bl: useRef(null), bc: useRef(null), br: useRef(null),
    };
    const refsY = {
        tl: useRef(null), tc: useRef(null), tr: useRef(null),
        ml: useRef(null), mr: useRef(null),
        bl: useRef(null), bc: useRef(null), br: useRef(null),
    };

    // Focus order (mc is 0 so skip it, cycle through all 8 inputs)
    const focusOrder = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];

    const [editingKey, setEditingKey] = useState(null);
    const [editingAxis, setEditingAxis] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // Grid layout
    const topRow = ['tl', 'tc', 'tr'];
    const midRow = ['ml', 'mc', 'mr'];  // mc is 0 reference (center)
    const botRow = ['bl', 'bc', 'br'];

    // Get all values for an axis (mc is 0 reference - center position)
    const getAllValues = (data) => {
        const values = [0]; // mc (center) is always 0
        focusOrder.forEach(key => {
            const val = parseFloat(data[key]);
            if (!isNaN(val)) {
                values.push(val);
            }
        });
        return values;
    };

    // Calculate Max Diff for an axis
    const getMaxDiff = (data) => {
        const values = getAllValues(data);
        if (values.length < 2) return '';
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(1);
    };

    // Check if diff is valid
    const isDiffValid = (data, standard) => {
        return validateValue(getMaxDiff(data), {
            maxValue: standard,
            validateStd: true
        });
    };

    const handleFocus = (key, axis) => {
        setEditingKey(key);
        setEditingAxis(axis);
        const data = axis === 'x' ? dataX : dataY;
        // When focus, show raw numeric value without arrows
        setEditingValue(data[key] || '');
    };

    const handleInputChange = (val) => {
        setEditingValue(cleanNumericInput(val));
    };

    // แปลงค่า input: -5 หรือ 5- ให้เป็น -5
    const parseInput = (value) => parseArrowInput(value);

    const commitValue = (key, axis) => {
        const onChange = axis === 'x' ? onChangeX : onChangeY;
        const data = axis === 'x' ? dataX : dataY;
        const parsedValue = parseInput(editingValue);
        const newData = { ...data, [key]: parsedValue };
        onChange(newData);
        setEditingKey(null);
        setEditingAxis(null);
        setEditingValue('');
    };

    const handleBlur = (key, axis) => {
        if (editingKey === key && editingAxis === axis) {
            commitValue(key, axis);
        }
    };

    const handleKeyDown = (e, key, axis) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitValue(key, axis);

            const refs = axis === 'x' ? refsX : refsY;
            const currentIndex = focusOrder.indexOf(key);
            // Cycle to next input (wrap around to first)
            const nextIndex = (currentIndex + 1) % focusOrder.length;
            const nextKey = focusOrder[nextIndex];
            if (refs[nextKey]?.current) {
                refs[nextKey].current.focus();
            }
        }
    };

    // แปลงค่าที่แสดงเป็นลูกศร
    // X-Axis: ค่าลบ = ←, ค่าบวก = →
    // Y-Axis: ค่าลบ = ↓, ค่าบวก = ↑
    const formatDisplay = (value, axis) => formatWithArrows(value, axis);

    const getValue = (key, axis) => {
        if (editingKey === key && editingAxis === axis) return editingValue;
        const data = axis === 'x' ? dataX : dataY;
        // When not editing, show with arrow
        return formatDisplay(data[key], axis);
    };

    const renderInput = (key, axis) => {
        const refs = axis === 'x' ? refsX : refsY;

        // mc (middle center) is 0 reference point
        if (key === 'mc') {
            return (
                <div className="w-10 h-6 flex items-center justify-center text-xs font-bold">
                    0
                </div>
            );

        }

        return (
            <input
                ref={refs[key]}
                type="text"
                inputMode="numeric"
                className="w-10 h-6 border border-black text-center outline-none bg-transparent text-xs"
                value={getValue(key, axis)}
                onFocus={() => handleFocus(key, axis)}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={() => handleBlur(key, axis)}
                onKeyDown={(e) => handleKeyDown(e, key, axis)}
            />
        );
    };

    const renderGrid = (axis) => {
        const data = axis === 'x' ? dataX : dataY;
        const standard = axis === 'x' ? standardX : standardY;
        const isValid = isDiffValid(data, standard);

        return (
            <div className="flex flex-col items-center">
                {/* Title */}
                <div className="text-sm font-bold mb-2">
                    {axis === 'x' ? 'X - Axis' : 'Y - Axis'}
                </div>

                {/* 3x3 Grid */}
                <div className="border border-black">
                    <table className="border-collapse">
                        <tbody>
                            {/* Top Row */}
                            <tr>
                                {topRow.map(key => (
                                    <td key={key} className="border border-black p-0.5">
                                        {renderInput(key, axis)}
                                    </td>
                                ))}
                            </tr>
                            {/* Middle Row */}
                            <tr>
                                {midRow.map(key => (
                                    <td key={key} className="border border-black p-0.5">
                                        {renderInput(key, axis)}
                                    </td>
                                ))}
                            </tr>
                            {/* Bottom Row */}
                            <tr>
                                {botRow.map(key => (
                                    <td key={key} className="border border-black p-0.5">
                                        {renderInput(key, axis)}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Arrow Icon wrapper with fixed height for alignment */}
                <div className="mt-2 h-12 flex items-center justify-center">
                    <div className={`border border-black flex items-center justify-center 
                        ${axis === 'x' ? 'px-6 py-1' : 'px-3 py-3'}`}>
                        {axis === 'x'
                            ? <span className="text-xl">↔</span>
                            : <span className="text-xl">↕</span>
                        }
                    </div>
                </div>

                {/* Max Diff Display with Standard */}
                <div className={`mt-3 text-xs ${!isValid ? 'text-red-600 font-bold' : ''}`}>
                    <div>
                        <span>Max dif {axis.toUpperCase()} = </span>
                        <span className="border-b border-black px-4 inline-block min-w-12 text-center">
                            {getMaxDiff(data)}
                        </span>
                        <span> μm</span>
                    </div>
                    <div className="text-center text-gray-600 mt-1">
                        (STD: ≤ {standard} μm)
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex gap-8 justify-center">
            {renderGrid('x')}
            {renderGrid('y')}
        </div>
    );
}

export default EDMLevelCeramic;

