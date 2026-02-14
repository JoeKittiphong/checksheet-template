import React, { useState, useRef } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { useGridNavigation } from '../../hooks/useGridNavigation';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { validateValue } from '../../utils/validationUtils';

/**
 * PitchingTable Component
 * 
 * A generic table for Pitching data (X or Y axis).
 * Supports both horizontal (X-like) and vertical (Y-like) layouts.
 * Refactored to use granular Controllers.
 */
const PitchingTable = ({
    name,
    control,
    axis = 'x', // 'x' or 'y'
    config = {
        rows: [],      // [{ key: 'b', label: 'B' }, { key: 't', label: 'T' }]
        cols: [],      // [{ label: 'X+' }, { label: 'X0', isRef: true }, { label: 'X-' }]
        diffLabel: 'DIFF',
        dataLabel: 'DATA PITCHING'
    },
    standard = { min: -20, max: 20 },
    arrowAxis = null // Optional: override arrow direction ('x' or 'y')
}) => {
    const { formState: { isSubmitted } } = useFormContext();

    // Configuration
    const dataKeys = config.dataKeys || [];
    const dimensions = config.dimensions || [];
    const isX = axis.toLowerCase() === 'x';
    const effectiveArrowAxis = arrowAxis || axis;
    const layout = config.layout || (isX ? 'horizontal' : 'vertical');

    // Navigation Grid Size
    const navRows = isX ? dataKeys.length : dimensions.length;
    const navCols = isX ? dimensions.length : dataKeys.length;

    const { setRef, handleKeyDown, focusCell } = useGridNavigation({
        rows: navRows,
        cols: navCols,
        onEnter: (r, c) => {
            if (!focusCell(r + 1, c)) {
                focusCell(0, c + 1);
            }
        }
    });

    // Watch values for calculation
    const watchedData = useWatch({
        control,
        name: name,
        defaultValue: {}
    });

    // Helper: Safely get value from watched data structure
    // structure: { b: [val0, val1, ...], t: [...] }
    const getValue = (key, index) => {
        return (watchedData[key] || [])[index];
    };

    // Diff Calculation
    const getDiff = (index) => {
        let val1, val2;

        if (dataKeys.length >= 2) {
            val1 = parseFloat(getValue(dataKeys[0].key, index));
            val2 = parseFloat(getValue(dataKeys[1].key, index));
        } else if (dataKeys.length === 1 && config.calcDiffWithZero) {
            val1 = parseFloat(getValue(dataKeys[0].key, index));
            val2 = 0;
        } else {
            return '';
        }

        if (isNaN(val1) || isNaN(val2)) return '';

        const diff = val1 - val2;
        if (diff === 0) return '0';

        const absValue = Math.abs(diff).toFixed(2).replace(/\.?0+$/, '');

        if (effectiveArrowAxis.toLowerCase() === 'x') {
            return diff > 0 ? `${absValue}→` : `←${absValue}`;
        } else {
            return diff > 0 ? `${absValue}↑` : `${absValue}↓`;
        }
    };

    const isDiffValid = (index) => {
        let val1, val2;

        if (dataKeys.length >= 2) {
            val1 = parseFloat(getValue(dataKeys[0].key, index));
            val2 = parseFloat(getValue(dataKeys[1].key, index));
        } else if (dataKeys.length === 1 && config.calcDiffWithZero) {
            val1 = parseFloat(getValue(dataKeys[0].key, index));
            val2 = 0;
        } else {
            return true;
        }

        if (isNaN(val1) || isNaN(val2)) return true;

        return validateValue(val1 - val2, { min: standard.min, max: standard.max, validateStd: true });
    };

    // Overall Calculation
    const getDataPitching = () => {
        const diffValues = [];
        dimensions.forEach((dim, idx) => {
            if (dim.isRef) {
                diffValues.push(0);
                return;
            }

            let val1, val2;
            let isValid = false;

            if (dataKeys.length >= 2) {
                val1 = parseFloat(getValue(dataKeys[0].key, idx));
                val2 = parseFloat(getValue(dataKeys[1].key, idx));
                if (!isNaN(val1) && !isNaN(val2)) isValid = true;
            } else if (dataKeys.length === 1 && config.calcDiffWithZero) {
                val1 = parseFloat(getValue(dataKeys[0].key, idx));
                val2 = 0;
                if (!isNaN(val1)) isValid = true;
            }

            if (isValid) {
                diffValues.push(val1 - val2);
            }
        });

        if (diffValues.length === 0) return '';
        if (diffValues.length < 2 && dimensions.length > 1 && !dimensions.some(d => d.isRef)) return '';

        const maxDiff = Math.max(...diffValues);
        const minDiff = Math.min(...diffValues);
        return Math.abs(maxDiff - minDiff).toFixed(2).replace(/\.?0+$/, '');
    };

    const overallValue = getDataPitching();
    const isOverallValid = !overallValue ? true : validateValue(overallValue, { maxValue: standard.max, validateStd: true, useAbs: true });

    // Cell Rendering Logic
    const renderCell = (rowKey, colIndex, rIdx, cIdx) => {
        return (
            <Controller
                name={`${name}.${rowKey}.${colIndex}`}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => {
                    const [isEditing, setIsEditing] = useState(false);

                    // Display Logic: Show number if editing, Arrow if blurred
                    const displayValue = isEditing
                        ? (field.value || '')
                        : formatWithArrows(field.value, effectiveArrowAxis);

                    const isValid = !field.value ? false : validateValue(field.value, { min: standard.min, max: standard.max, validateStd: true });

                    return (
                        <input
                            ref={(e) => {
                                field.ref(e);
                                setRef(e, rIdx, cIdx);
                            }}
                            type="text"
                            inputMode="decimal"
                            className={`w-full h-full text-center bg-transparent outline-none text-sm 
                                ${error ? 'border-2 border-red-500' : ''} 
                                ${!error && !isValid && field.value ? 'bg-red-200' : ''}`}
                            value={displayValue}
                            onFocus={() => setIsEditing(true)}
                            onBlur={() => {
                                setIsEditing(false);
                                // Parse arrow input on blur
                                const parsed = parseArrowInput(field.value);
                                if (parsed !== field.value) {
                                    field.onChange(parsed);
                                }
                                field.onBlur();
                            }}
                            onChange={(e) => {
                                const clean = cleanNumericInput(e.target.value);
                                field.onChange(clean);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, rIdx, cIdx)}
                        />
                    );
                }}
            />
        );
    };

    if (layout === 'horizontal') {
        // --- X-Style Render ---
        return (
            <div>
                <table className="border-collapse border border-black text-sm">
                    <thead>
                        <tr>
                            <th className="border border-black p-1 w-12 text-center bg-gray-50"></th>
                            {dimensions.map((dim, i) => (
                                <th key={i} className="border border-black p-1 w-16 text-center">{dim.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataKeys.map((rowKeyObj, rIdx) => (
                            <tr key={rowKeyObj.key}>
                                <td className="border border-black p-1 text-center font-medium">{rowKeyObj.label}</td>
                                {dimensions.map((dim, cIdx) => {
                                    if (dim.isRef) {
                                        return (
                                            <td key={cIdx} className="border border-black p-1 text-center text-sm bg-gray-50">
                                                {formatWithArrows(0, effectiveArrowAxis)}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={cIdx} className="border border-black p-1 p-0 relative h-8">
                                            {renderCell(rowKeyObj.key, cIdx, rIdx, cIdx)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        <tr>
                            <td className="border border-black p-1 text-center font-medium">{config.diffLabel}</td>
                            {dimensions.map((dim, i) => (
                                <td key={i} className={`border border-black p-1 text-center text-sm ${(!dim.isRef && !isDiffValid(i)) ? 'bg-red-200' : ''}`}>
                                    {dim.isRef ? formatWithArrows(0, effectiveArrowAxis) : getDiff(i)}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div className="mt-1 flex items-center text-sm">
                    <span className="font-medium mr-2">{config.dataLabel} =</span>
                    <span className={`border-b border-black min-w-16 text-center ${!isOverallValid ? 'bg-red-200' : ''}`}>
                        {overallValue}
                    </span>
                </div>
            </div>
        );
    } else {
        // --- Y-Style Render (Vertical) ---
        return (
            <div>
                <table className="border-collapse border border-black text-sm">
                    <thead>
                        <tr>
                            <th className="border border-black p-1 w-10 text-center bg-gray-50"></th>
                            {dataKeys.map((k, i) => (
                                <th key={i} className="border border-black p-1 w-16 text-center">{k.label}</th>
                            ))}
                            <th className="border border-black p-1 w-16 text-center">{config.diffLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dimensions.map((dim, rIdx) => {
                            if (dim.isRef) {
                                return (
                                    <tr key={rIdx}>
                                        <td className="border border-black p-1 text-center font-medium">{dim.label}</td>
                                        {dataKeys.map((_, cIdx) => (
                                            <td key={cIdx} className="border border-black p-1 text-center text-sm bg-gray-50">
                                                {formatWithArrows(0, effectiveArrowAxis)}
                                            </td>
                                        ))}
                                        <td className="border border-black p-1 text-center text-sm">0{effectiveArrowAxis === 'x' ? '↔' : '↕'}</td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={rIdx}>
                                    <td className="border border-black p-1 text-center font-medium">{dim.label}</td>
                                    {dataKeys.map((keyObj, cIdx) => (
                                        <td key={cIdx} className="border border-black p-1 p-0 relative h-8">
                                            {renderCell(keyObj.key, rIdx, rIdx, cIdx)}
                                        </td>
                                    ))}
                                    <td className={`border border-black p-1 text-center text-sm ${!isDiffValid(rIdx) ? 'bg-red-200' : ''}`}>
                                        {getDiff(rIdx)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-1 flex items-center text-sm">
                    <span className="font-medium mr-2">{config.dataLabel} =</span>
                    <span className={`border-b border-black min-w-16 text-center ${!isOverallValid ? 'bg-red-200' : ''}`}>
                        {overallValue}
                    </span>
                </div>
            </div>
        );
    }
};

export default PitchingTable;
