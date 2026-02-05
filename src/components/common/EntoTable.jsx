import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EntoTable Component
 * Generic component for TableEnto and TableEntoDual.
 * 
 * Features:
 * - Configurable Sections: Supports single or multiple side-by-side sections.
 * - Snake-like Navigation: Column 1 (Bottom->Top) -> Column 2 (Top->Bottom).
 * - Automatic Diff calculation.
 * - Shared 'mm' column.
 * - Flexible Header generation.
 * 
 * @param {Object} props
 * @param {Object} props.data - Data object containing values.
 * @param {Function} props.onChange - Callback (newData) => void.
 * @param {Array} props.sections - Configuration for sections.
 *   Example: [
 *     { key: 'left', label: 'Z1L', cols: ['a', 'b'], headerCols: ['A', 'B'] },
 *     { key: 'right', label: 'Z1R', cols: ['b', 'a'], headerCols: ['B', 'A'] }
 *   ]
 * @param {number} props.rowCount - Number of rows (default 21).
 * @param {number} props.stepSize - Step size for mm labels (default 20).
 * @param {number} props.maxValue - Max value validation for inputs.
 * @param {number} props.maxDiff - Max difference validation.
 * @param {string} props.formula - Optional formula column label (e.g. "A+B").
 * @param {Function} props.onCalculateFormula - Optional function (rowIndex, allData) => value.
 */
const EntoTable = ({
    data = {},
    onChange = () => { },
    sections = [],
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    formula = null,
    onCalculateFormula = null,
    peakPoint = null, // Default: same as rowCount if null
    maxFormula = null // Validation for formula (A+B) column
}) => {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();

    // Effective Peak Point (number of rows from bottom used)
    const effectivePeak = peakPoint || rowCount;
    // Top Index (0-based) where valid data starts (e.g., if rowCount=21, peak=15 -> topIndex=6)
    const topIndex = rowCount - effectivePeak;

    // Flattened refs for navigation
    // Structure: refs.current[sectionIndex][colIndex][rowIndex]
    const inputRefs = useRef([]);

    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // Generate Row labels (mm)
    // 400 down to 0
    const rowLabels = Array.from({ length: rowCount }, (_, i) => (rowCount - 1 - i) * stepSize);

    // --- Helpers ---

    const getSectionData = (sectionKey) => {
        // If sectionKey is null/empty, assume data is root object (Single mode)
        // If sectionKey exists, assume data[sectionKey] (Dual mode)
        if (!sectionKey) return data;
        return data[sectionKey] || { a: [], b: [] };
    };

    const getValue = (sectionKey, colKey, rowIndex) => {
        if (editingCell?.sectionKey === sectionKey && editingCell?.colKey === colKey && editingCell?.rowIndex === rowIndex) {
            return editingValue;
        }
        const sectionData = getSectionData(sectionKey);
        return sectionData[colKey]?.[rowIndex] || '';
    };

    const getDiff = (sectionKey, rowIndex, cols) => {
        const sectionData = getSectionData(sectionKey);
        const val1 = parseFloat(sectionData[cols[0]]?.[rowIndex]);
        const val2 = parseFloat(sectionData[cols[1]]?.[rowIndex]);
        if (isNaN(val1) || isNaN(val2)) return '';
        return Math.abs(val1 - val2).toFixed(3).replace(/\.?0+$/, '');
    };

    // --- Validation ---

    const isInputInvalid = (val) => {
        return !validateValue(val, { maxValue, validateStd: true });
    };

    const isDiffInvalid = (val) => {
        return !validateValue(val, { maxDiff, validateStd: true, useAbs: true }); // maxDiff implies abs diff usually
    };

    // --- Handlers ---

    const handleFocus = (sectionKey, colKey, rowIndex, val) => {
        setEditingCell({ sectionKey, colKey, rowIndex });
        setEditingValue(val || '');
    };

    const handleChange = (val) => {
        setEditingValue(cleanNumericInput(val));
    };

    const commitValue = () => {
        if (!editingCell) return;
        const { sectionKey, colKey, rowIndex } = editingCell;

        // Clone data
        let newData = { ...data };

        if (sectionKey) {
            // Dual mode: data[sectionKey][colKey][rowIndex]
            newData[sectionKey] = { ...newData[sectionKey] };
            if (!newData[sectionKey][colKey]) newData[sectionKey][colKey] = [];
            newData[sectionKey][colKey][rowIndex] = editingValue;
        } else {
            // Single mode: data[colKey][rowIndex]
            if (!newData[colKey]) newData[colKey] = [];
            newData[colKey][rowIndex] = editingValue;
        }

        onChange(newData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = () => {
        commitValue();
    };

    const handleKeyDown = (e, sectionIdx, colIdx, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitValue();

            // Navigation Logic
            // Even Column Index (0, 2..): Bottom -> Top (Direction -1)
            // Odd Column Index (1, 3..): Top -> Bottom (Direction 1)

            const isGoingUp = colIdx % 2 === 0; // 0=Up, 1=Down
            const direction = isGoingUp ? -1 : 1;

            // Current input list for this column
            const currentColumnInputs = inputRefs.current[sectionIdx]?.[colIdx] || [];

            moveFocus(e, rowIndex, currentColumnInputs, {
                direction,
                onBoundary: () => {
                    // Boundary reached.

                    // Logic:
                    // Find next column absolute index.
                    // Current Abs Col = sectionIdx * 2 + colIdx.

                    let nextSectionIdx = sectionIdx;
                    let nextColIdx = colIdx + 1;

                    if (nextColIdx >= sections[sectionIdx].cols.length) {
                        nextSectionIdx++;
                        nextColIdx = 0;
                    }

                    if (nextSectionIdx < sections.length) {
                        // Determine entry point for next column
                        // Next col direction: 
                        const nextIsGoingUp = nextColIdx % 2 === 0;
                        // If going down (!nextIsGoingUp), skip "Peak" (start at topIndex + 1)
                        // Note: topIndex is the highest valid row.
                        // If going up: star at bottom (rowCount-1)
                        // If going down: start at topIndex + 1 (skipping A's peak)
                        const nextRowIndex = nextIsGoingUp ? rowCount - 1 : topIndex + 1;

                        const nextInput = inputRefs.current[nextSectionIdx]?.[nextColIdx]?.[nextRowIndex];
                        if (nextInput) nextInput.focus();
                    }
                }
            });
        }
    };

    // --- Renders ---

    // Styles (Ported from existing)
    const tableStyle = { borderCollapse: 'collapse', fontSize: '8px', fontFamily: 'Arial, sans-serif' };
    const thStyle = { border: '1px solid black', padding: '1mm 2mm', textAlign: 'center', fontWeight: 'normal', backgroundColor: 'white' };
    const thGrayStyle = { ...thStyle, backgroundColor: '#e0e0e0' };
    const tdStyle = { border: '1px solid black', padding: '1mm 2mm', textAlign: 'center', height: '4mm', minWidth: '6mm' };
    const inputStyle = { width: '100%', height: '100%', border: 'none', textAlign: 'center', fontSize: '10px', padding: 0, margin: 0, background: 'transparent', outline: 'none' };
    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };
    const grayBgStyle = { backgroundColor: '#f2f2f2' };
    const disabledStyle = { ...tdStyle, padding: 0, backgroundColor: '#e0e0e0' }; // Darker gray for disabled

    return (
        <div className="inline-block">
            <table style={tableStyle}>
                <thead>
                    {/* Header Row 1: Section Labels (for Dual) */}
                    {sections.length > 1 && (
                        <tr>
                            <th style={{ ...thStyle, border: 'none' }}></th>
                            {sections.map((section, idx) => (
                                <th key={idx} colSpan={3 + (formula && idx === sections.length - 1 ? 1 : 0)} style={thGrayStyle}>
                                    {section.key === 'left' ? 'Left' : (section.key === 'right' ? 'Right' : '')}
                                </th>
                            ))}
                        </tr>
                    )}

                    {/* Header Row 2: mm | Labels | Formula */}
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '8mm' }}>mm</th>
                        {sections.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <th colSpan={3} style={thStyle}>{section.label}</th>
                            </React.Fragment>
                        ))}
                        {formula && <th rowSpan={2} style={thStyle}>{formula}</th>}
                    </tr>

                    {/* Header Row 3: Columns (A, B, Diff...) */}
                    <tr>
                        {sections.map((section, secIdx) => (
                            <React.Fragment key={secIdx}>
                                {section.headerCols.map((label, cIdx) => (
                                    <th key={cIdx} style={{ ...thStyle, width: '8mm' }}>{label}</th>
                                ))}
                                <th style={{ ...thStyle, width: '8mm' }}></th>
                                {/* Diff column header often empty or 'Diff' */}
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex}>
                            <td style={tdStyle}>{label}</td>

                            {sections.map((section, secIdx) => {
                                // Render inputs for this section
                                const inputs = section.cols.map((colKey, colIdx) => {
                                    // 1. Check if row is out of scope (above peakPoint)
                                    if (rowIndex < topIndex) {
                                        return (
                                            <td key={colIdx} style={disabledStyle}></td>
                                        );
                                    }

                                    const isGoingUp = colIdx % 2 === 0;
                                    // 2. Check if it's top cell of downward column (Skip Peak logic)
                                    // "Top Cell" is now 'topIndex', not 0
                                    const isTopCellOfDownward = !isGoingUp && rowIndex === topIndex;

                                    if (isTopCellOfDownward) {
                                        return (
                                            <td key={colIdx} style={disabledStyle}>
                                                {/* Disabled/Skipped Peak for Downward Col */}
                                            </td>
                                        );
                                    }

                                    const val = getValue(section.key, colKey, rowIndex);
                                    const hasValue = val !== '' && val !== null && val !== undefined;
                                    const isReqError = isSubmitted && !hasValue;
                                    const invalid = isInputInvalid(val) && (isSubmitted || val);

                                    // Store ref
                                    if (!inputRefs.current[secIdx]) inputRefs.current[secIdx] = [];
                                    if (!inputRefs.current[secIdx][colIdx]) inputRefs.current[secIdx][colIdx] = [];

                                    return (
                                        <td key={colIdx} style={{ ...tdStyle, padding: 0, ...grayBgStyle, ...(invalid ? invalidStyle : {}) }}>
                                            <input
                                                ref={el => inputRefs.current[secIdx][colIdx][rowIndex] = el}
                                                type="text"
                                                style={{
                                                    ...inputStyle,
                                                    ...(isReqError ? { border: '2px solid red', backgroundColor: '#fff0f0' } : {}),
                                                    ...(invalid ? { color: 'red' } : {})
                                                }}
                                                value={val}
                                                onFocus={() => handleFocus(section.key, colKey, rowIndex, val)}
                                                onChange={e => handleChange(e.target.value)}
                                                onKeyDown={e => handleKeyDown(e, secIdx, colIdx, rowIndex)}
                                                onBlur={handleBlur}
                                            />
                                        </td>
                                    );
                                });

                                // Diff column
                                // Diff is disabled if row is out of scope OR it's the peak row
                                const isOutOfScope = rowIndex < topIndex;
                                const isPeakRow = rowIndex === topIndex;

                                const diffVal = (isOutOfScope || isPeakRow) ? '' : getDiff(section.key, rowIndex, section.cols);
                                const diffInv = diffVal !== '' && isDiffInvalid(diffVal);

                                return (
                                    <React.Fragment key={secIdx}>
                                        {inputs}
                                        <td style={{ ...tdStyle, ...(diffInv ? invalidStyle : {}) }}>
                                            {diffVal}
                                        </td>
                                    </React.Fragment>
                                );
                            })}

                            {/* Formula Column (Optional) */}
                            {formula && onCalculateFormula && (() => {
                                const val = onCalculateFormula(rowIndex, data);
                                const isInvalid = maxFormula !== null && validateValue(val, { maxValue: maxFormula, validateStd: true, useAbs: true }) === false;
                                return (
                                    <td style={{ ...tdStyle, ...grayBgStyle, ...(isInvalid ? invalidStyle : {}) }}>
                                        {val}
                                    </td>
                                );
                            })()}
                        </tr>
                    ))}
                </tbody>
                {/* Footer with Max Values could be added here if generic enough, 
                    but for now sticking to core table structure. */
                }
            </table>
        </div>
    );
};

export default EntoTable;
