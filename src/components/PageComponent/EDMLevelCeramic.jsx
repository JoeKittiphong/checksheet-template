import { useRef, useState } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
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
    name, // Prefix e.g. "page10.levelCeramicData"
    control,
    standardX = 20,
    standardY = 20
}) {
    const { formState: { isSubmitted } } = useFormContext();

    // Watch all fields for calculation
    const watchedValues = useWatch({
        control,
        name: name,
        defaultValue: {
            x: { tl: '', tc: '', tr: '', ml: '', mr: '', bl: '', bc: '', br: '' },
            y: { tl: '', tc: '', tr: '', ml: '', mr: '', bl: '', bc: '', br: '' }
        }
    });

    const dataX = watchedValues?.x || {};
    const dataY = watchedValues?.y || {};

    // Focus management
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

    const focusOrder = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];

    // State for display toggle (Number vs Arrow)
    const [editingKey, setEditingKey] = useState(null);
    const [editingAxis, setEditingAxis] = useState(null);

    // Layout
    const topRow = ['tl', 'tc', 'tr'];
    const midRow = ['ml', 'mc', 'mr'];
    const botRow = ['bl', 'bc', 'br'];

    // Calculations
    const getAllValues = (data) => {
        const values = [0]; // mc is always 0
        focusOrder.forEach(key => {
            const val = parseFloat(data?.[key]);
            if (!isNaN(val)) {
                values.push(val);
            }
        });
        return values;
    };

    const getMaxDiff = (data) => {
        const values = getAllValues(data);
        // Ensure strictly only calculated if we have inputs.
        // Actually for Max Diff, we include 0.
        // If only 0 exists and no inputs, return empty to avoid showing "0.0" when empty.
        const hasInput = focusOrder.some(key => data?.[key] !== undefined && data?.[key] !== '' && data?.[key] !== null);
        if (!hasInput) return '';

        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(1);
    };

    const isDiffValid = (data, standard) => {
        const maxDiff = getMaxDiff(data);
        if (maxDiff === '') return true;
        return validateValue(maxDiff, {
            maxValue: standard,
            validateStd: true
        });
    };

    // Navigation and Input handlers
    const handleFocus = (key, axis) => {
        setEditingKey(key);
        setEditingAxis(axis);
    };

    const handleBlur = () => {
        setEditingKey(null);
        setEditingAxis(null);
    };

    const handleKeyDown = (e, key, axis) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const refs = axis === 'x' ? refsX : refsY;
            const currentIndex = focusOrder.indexOf(key);
            const nextIndex = (currentIndex + 1) % focusOrder.length;
            const nextKey = focusOrder[nextIndex];
            if (refs[nextKey]?.current) {
                refs[nextKey].current.focus();
            }
            // Blur current to trigger arrow display
            e.target.blur();
            if (refs[nextKey]?.current) {
                // Focus next
                setTimeout(() => refs[nextKey].current.focus(), 0);
            }
        }
    };

    // Formatter
    const formatDisplay = (value, axis) => {
        if (value === '' || value === null || value === undefined) return '';
        // If pure number string, format it
        return formatWithArrows(value, axis);
    };

    const parseInput = (value) => parseArrowInput(value);


    const renderInput = (key, axis) => {
        if (key === 'mc') {
            return (
                <div className="w-10 h-6 flex items-center justify-center text-xs font-bold">0</div>
            );
        }

        const fieldName = `${name}.${axis}.${key}`;
        const isEditing = editingKey === key && editingAxis === axis;

        return (
            <Controller
                name={fieldName}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => {
                    const displayValue = isEditing
                        ? (field.value || '')
                        : formatDisplay(field.value, axis);

                    return (
                        <input
                            ref={(e) => {
                                field.ref(e);
                                if (axis === 'x') refsX[key].current = e;
                                else refsY[key].current = e;
                            }}
                            type="text"
                            inputMode="numeric"
                            className={`w-10 h-6 text-center outline-none bg-transparent text-xs ${error ? 'border border-red-500 bg-red-50' : 'border border-black'}`}
                            value={displayValue}
                            onFocus={() => handleFocus(key, axis)}
                            onChange={(e) => {
                                // While editing, just type numbers/symbols
                                const cleanVal = cleanNumericInput(e.target.value);
                                field.onChange(cleanVal);
                            }}
                            onBlur={() => {
                                // On blur, parse arrow input if user typed arrow-like syntax (e.g. 5-)
                                const parsed = parseInput(field.value);
                                if (parsed !== field.value) {
                                    field.onChange(parsed);
                                }
                                field.onBlur();
                                handleBlur();
                            }}
                            onKeyDown={(e) => handleKeyDown(e, key, axis)}
                        />
                    );
                }}
            />
        );
    };

    const renderGrid = (axis) => {
        const data = axis === 'x' ? dataX : dataY;
        const standard = axis === 'x' ? standardX : standardY;
        const isValid = isDiffValid(data, standard);

        return (
            <div className="flex flex-col items-center">
                <div className="text-sm font-bold mb-2">
                    {axis === 'x' ? 'X - Axis' : 'Y - Axis'}
                </div>
                <div className="border border-black">
                    <table className="border-collapse">
                        <tbody>
                            <tr>
                                {topRow.map(key => <td key={key} className="border border-black p-0.5">{renderInput(key, axis)}</td>)}
                            </tr>
                            <tr>
                                {midRow.map(key => <td key={key} className="border border-black p-0.5">{renderInput(key, axis)}</td>)}
                            </tr>
                            <tr>
                                {botRow.map(key => <td key={key} className="border border-black p-0.5">{renderInput(key, axis)}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 h-12 flex items-center justify-center">
                    <div className={`border border-black flex items-center justify-center ${axis === 'x' ? 'px-6 py-1' : 'px-3 py-3'}`}>
                        {axis === 'x' ? <span className="text-xl">↔</span> : <span className="text-xl">↕</span>}
                    </div>
                </div>
                <div className={`mt-3 text-xs ${!isValid ? 'text-red-600 font-bold' : ''}`}>
                    <div>
                        <span>Max dif {axis.toUpperCase()} = </span>
                        <span className="border-b border-black px-4 inline-block min-w-12 text-center">
                            {getMaxDiff(data)}
                        </span>
                        <span> μm</span>
                    </div>
                    <div className="text-center text-gray-600 mt-1">(STD: ≤ {standard} μm)</div>
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
