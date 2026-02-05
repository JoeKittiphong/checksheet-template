import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useGridNavigation } from '../../hooks/useGridNavigation';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { validateValue } from '../../utils/validationUtils';

/**
 * PitchingTable Component
 * 
 * A generic table for Pitching data (X or Y axis).
 * Supports both horizontal (X-like) and vertical (Y-like) layouts.
 * 
 * @param {Object} props
 * @param {string} props.axis 'x' | 'y'
 * @param {Object} props.data { rowKey1: [], rowKey2: [] }
 * @param {Function} props.onChange Callback(newData)
 * @param {Object} props.config Configuration object for rows/cols
 * @param {Object} props.standard { min, max }
 */
const PitchingTable = ({
    axis = 'x', // 'x' or 'y'
    data = {},
    onChange = () => { },
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

    // Navigation Grid Size
    // If Horizontal (X): Rows = dataKeys, Cols = dimensions
    // If Vertical (Y): Rows = dimensions, Cols = dataKeys
    const navRows = isX ? dataKeys.length : dimensions.length;
    const navCols = isX ? dimensions.length : dataKeys.length;

    const { setRef, handleKeyDown, focusCell } = useGridNavigation({
        rows: navRows,
        cols: navCols,
        onEnter: (r, c) => {
            // Default enter behavior: move down (r+1)
            // If at bottom, maybe move to next col top?
            if (!focusCell(r + 1, c)) {
                // optionally move to next col
                focusCell(0, c + 1);
            }
        }
    });

    // Reference Indices
    const refColIndex = dimensions.findIndex(c => c.isRef); // For X
    const refRowIndex = dimensions.findIndex(c => c.isRef); // For Y
    // Wait, let's clarify config.cols vs config.rows meanings.
    // X-Table (Original PitchingX): 
    //   Cols (Horizontal headers): X+, X0 (Ref), X-
    //   Rows (Vertical headers): B, T
    // Y-Table (Original PitchingY):
    //   Rows (Vertical entries): Y+, Y0 (Ref), Y-
    //   Cols (Horizontal headers): B, C

    // To make this truly generic, we need to respect the generic "Rows" and "Cols" concept of a table.
    // X layout: Table Rows = Data Keys (B, T). Table Columns = Data Indices (X+, X0, X-).
    // Y layout: Table Rows = Data Indices (Y+, Y0, Y-). Table Columns = Data Keys (B, C).

    // Let's assume the passed `config` structure describes the *physical* table.
    // X-Table: physicalRows=[{key:'b'}, {key:'t'}], physicalCols=[{label:'X+'}, {label:'X0'}]
    // Y-Table: physicalRows=[{label:'Y+'}, {label:'Y0'}], physicalCols=[{key:'b'}, {key:'c'}]
    //
    // BUT `config.rows` in my prop was intended to be the data keys.
    // Let's refine props to be explicit.
    // config.dataKeys: [{ key: 'b', label: 'B' }, { key: 't', label: 'T' }]
    // config.dimensions: [{ label: 'X+' }, { label: 'X0', isRef: true }, ...]
    // layout: 'horizontal' (X) | 'vertical' (Y)

    const layout = config.layout || (isX ? 'horizontal' : 'vertical');

    // -- State for Editing --
    const [editingCell, setEditingCell] = useState(null); // { key, index }
    const [editingValue, setEditingValue] = useState('');
    const justCommittedRef = useRef(false);

    // Helpers
    const formatDisplay = (val) => formatWithArrows(val, effectiveArrowAxis);
    const parseInput = (val) => parseArrowInput(val);

    // Value Handlers
    const handleFocus = (key, index, currentVal) => {
        setEditingCell({ key, index });
        setEditingValue(currentVal || '');
    };

    const handleInputChange = (val) => {
        setEditingValue(cleanNumericInput(val));
    };

    const commitValue = (key, index) => {
        const numericValue = parseInput(editingValue);
        const newData = { ...data };
        if (!newData[key]) newData[key] = [];
        newData[key][index] = numericValue;

        onChange(newData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (key, index) => {
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell && editingCell.key === key && editingCell.index === index) {
            commitValue(key, index);
        }
    };

    const onKeyDown = (e, r, c, key, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(key, index);
        }
        handleKeyDown(e, r, c);
    };

    // Validation
    const isValid = (key, index) => {
        const rowData = data[key] || [];
        return validateValue(rowData[index], { min: standard.min, max: standard.max, validateStd: true });
    };

    // Diff Calculation
    const getDiff = (index) => {
        if (dataKeys.length < 2) return '';
        const val1 = parseFloat((data[dataKeys[0].key] || [])[index]);
        const val2 = parseFloat((data[dataKeys[1].key] || [])[index]); // Assumes 2 keys for diff
        if (isNaN(val1) || isNaN(val2)) return '';

        const diff = val1 - val2;
        if (diff === 0) return '0';

        const absValue = Math.abs(diff).toFixed(2).replace(/\.?0+$/, '');
        // Direction logic from legacy: 
        // X: B-T > 0 -> Right, < 0 -> Left. 
        // Y: B-C > 0 -> Up, < 0 -> Down.

        if (effectiveArrowAxis.toLowerCase() === 'x') {
            return diff > 0 ? `${absValue}→` : `←${absValue}`;
        } else {
            return diff > 0 ? `${absValue}↑` : `${absValue}↓`;
        }
    };

    const isDiffValid = (index) => {
        if (dataKeys.length < 2) return true;
        const val1 = parseFloat((data[dataKeys[0].key] || [])[index]);
        const val2 = parseFloat((data[dataKeys[1].key] || [])[index]);
        if (isNaN(val1) || isNaN(val2)) return true;

        return validateValue(val1 - val2, { min: standard.min, max: standard.max, validateStd: true });
    };

    // Overall Data Pitching Calculation
    const getDataPitching = () => {
        const diffValues = [];
        dimensions.forEach((dim, idx) => {
            if (dim.isRef) {
                diffValues.push(0);
                return;
            }
            if (dataKeys.length >= 2) {
                const val1 = parseFloat((data[dataKeys[0].key] || [])[idx]);
                const val2 = parseFloat((data[dataKeys[1].key] || [])[idx]);
                if (!isNaN(val1) && !isNaN(val2)) {
                    diffValues.push(val1 - val2);
                }
            }
        });

        if (diffValues.length < 2 && dimensions.length > 1) return '';
        // Logic check: if only 1 dimension + ref, maybe enough? 
        // Legacy: "if (diffValues.length < 2) return '';" implying we need at least 2 points to calculate range?
        // Actually range = max - min. If only 1 val (0), range is 0. 
        // If 1 val (5) and ref (0), range is 5.
        // Let's stick to legacy logic if possible, or robust one.
        if (diffValues.length === 0) return '';

        const maxDiff = Math.max(...diffValues);
        const minDiff = Math.min(...diffValues);
        return Math.abs(maxDiff - minDiff).toFixed(2).replace(/\.?0+$/, '');
    };

    const overallValue = getDataPitching();
    const isOverallValid = !overallValue ? true : validateValue(overallValue, { maxValue: standard.max, validateStd: true, useAbs: true });

    // -- Rendering Logic --

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
                        {dataKeys.map((rowKey, rIdx) => (
                            <tr key={rowKey.key}>
                                <td className="border border-black p-1 text-center font-medium">{rowKey.label}</td>
                                {dimensions.map((dim, cIdx) => {
                                    if (dim.isRef) {
                                        return (
                                            <td key={cIdx} className="border border-black p-1 text-center text-sm bg-gray-50">
                                                {formatWithArrows(0, effectiveArrowAxis)}
                                            </td>
                                        );
                                    }
                                    const val = (data[rowKey.key] || [])[cIdx];
                                    const isReqError = isSubmitted && (val === '' || val === null || val === undefined);
                                    const valid = isValid(rowKey.key, cIdx);

                                    const displayVal = (editingCell?.key === rowKey.key && editingCell?.index === cIdx)
                                        ? editingValue
                                        : formatDisplay(val);

                                    return (
                                        <td key={cIdx} className={`border p-1 ${isReqError ? 'border-red-500 border-2' : 'border-black'} ${!isReqError && !valid ? 'bg-red-200' : ''}`}>
                                            <input
                                                ref={el => setRef(el, rIdx, cIdx)}
                                                type="text"
                                                inputMode="numeric"
                                                value={displayVal}
                                                onFocus={() => handleFocus(rowKey.key, cIdx, val)}
                                                onChange={(e) => handleInputChange(e.target.value)}
                                                onBlur={() => handleBlur(rowKey.key, cIdx)}
                                                onKeyDown={(e) => onKeyDown(e, rIdx, cIdx, rowKey.key, cIdx)}
                                                className="w-full h-full text-center bg-transparent outline-none text-sm"
                                            />
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
                                        {/* Diff for ref is 0 */}
                                        <td className="border border-black p-1 text-center text-sm">0↕</td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={rIdx}>
                                    <td className="border border-black p-1 text-center font-medium">{dim.label}</td>
                                    {dataKeys.map((keyObj, cIdx) => {
                                        const val = (data[keyObj.key] || [])[rIdx];
                                        const isReqError = isSubmitted && (val === '' || val === null || val === undefined);
                                        const valid = isValid(keyObj.key, rIdx);

                                        const displayVal = (editingCell?.key === keyObj.key && editingCell?.index === rIdx)
                                            ? editingValue
                                            : formatDisplay(val);

                                        return (
                                            <td key={cIdx} className={`border p-1 ${isReqError ? 'border-red-500 border-2' : 'border-black'} ${!isReqError && !valid ? 'bg-red-200' : ''}`}>
                                                <input
                                                    ref={el => setRef(el, rIdx, cIdx)}
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={displayVal}
                                                    onFocus={() => handleFocus(keyObj.key, rIdx, val)}
                                                    onChange={(e) => handleInputChange(e.target.value)}
                                                    onBlur={() => handleBlur(keyObj.key, rIdx)}
                                                    onKeyDown={(e) => onKeyDown(e, rIdx, cIdx, keyObj.key, rIdx)}
                                                    className="w-full h-full text-center bg-transparent outline-none text-sm"
                                                />
                                            </td>
                                        );
                                    })}
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
