import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TablePitchCheck Component
 * 
 * Styled to match the provided image exactly
 */
function TablePitchCheck({
    data = { a: [], b: [] },
    onChange = () => { },
    axisLabel = "X1",
    rowCount = 16,
    stepSize = 20,
    maxAB = 15,      // Max allowed value for A and B columns
    maxDiff = 1,     // Max allowed value for A-B diff
    showCalcCol = true  // Show/hide the calculated column
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    // Generate Row labels: bottom row (before RETURN) = 0, ascending upward
    const rowLabels = [];
    for (let i = 0; i < rowCount; i++) {
        rowLabels.push((rowCount - 1 - i) * stepSize);
    }

    const returnIndex = rowCount;

    const inputRefsA = useRef([]);
    const inputRefsB = useRef([]);

    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const handleFocus = (col, index, val) => {
        setEditingCell({ col, index });
        setEditingValue(val || '');
    };

    const handleChange = (val) => {
        setEditingValue(cleanNumericInput(val));
    };

    const commitValue = () => {
        if (!editingCell) return;
        const { col, index } = editingCell;

        const newData = { ...data };
        if (!newData[col]) newData[col] = [];

        newData[col][index] = editingValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    const handleKeyDown = (e, col, index) => {
        if (e.key === 'Enter') {
            commitValue();
            if (col === 'a') {
                moveFocus(e, index, inputRefsA.current, {
                    direction: -1,
                    onBoundary: () => {
                        // Skip first B row (same as last A row), go to second B row
                        // B starts from top (index 0). Index 1 is the 2nd row.
                        const bRow1 = inputRefsB.current[1];
                        if (bRow1) bRow1.focus();
                    }
                });
            } else if (col === 'b') {
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1,
                    onBoundary: () => {
                        // Go to RETURN row (handled as index returnIndex)
                        const retRow = inputRefsB.current[returnIndex];
                        if (retRow) retRow.focus();
                    }
                });
            }
        }
    };

    const handleBlur = () => {
        commitValue();
    };

    const getVal = (col, idx) => {
        if (editingCell?.col === col && editingCell?.index === idx) return editingValue;
        return data[col]?.[idx] || '';
    };

    // Calculated column: (A[currentRow] - A[nextRow]) * 5
    const getCalcCol = (idx) => {
        const currA = parseFloat(data.a?.[idx]);
        const nextA = parseFloat(data.a?.[idx + 1]);
        if (isNaN(currA) || isNaN(nextA)) return '';
        return ((currA - nextA) * 5).toFixed(3).replace(/\.?0+$/, '');
    };

    // A - B (absolute value)
    const getDiffAB = (idx) => {
        const a = parseFloat(data.a?.[idx]);
        const b = parseFloat(data.b?.[idx]);
        if (isNaN(a) || isNaN(b)) return '';
        return Math.abs(a - b).toFixed(3).replace(/\.?0+$/, '');
    };

    // Validation functions
    const isABInvalid = (col, idx) => {
        return !validateValue(data[col]?.[idx], {
            maxValue: maxAB,
            validateStd: true
        });
    };

    const isDiffInvalid = (idx) => {
        const a = parseFloat(data.a?.[idx]);
        const b = parseFloat(data.b?.[idx]);
        if (isNaN(a) || isNaN(b)) return false;

        const diff = Math.abs(a - b);
        return !validateValue(diff, {
            maxDiff: maxDiff,
            validateStd: true
        });
    };

    // Position Max: Max of Column A
    const getPositionMax = () => {
        const nums = (data.a || []).slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        if (nums.length === 0) return '';
        return Math.max(...nums).toFixed(3).replace(/\.?0+$/, '');
    };

    // Lost Motion: Max of Column (A-B)
    const getLostMotion = () => {
        const diffs = [];
        for (let i = 0; i < rowCount; i++) {
            const a = parseFloat(data.a?.[i]);
            const b = parseFloat(data.b?.[i]);
            if (!isNaN(a) && !isNaN(b)) {
                diffs.push(Math.abs(a - b));
            }
        }
        if (diffs.length === 0) return '';
        return Math.max(...diffs).toFixed(3).replace(/\.?0+$/, '');
    };

    // Styles
    const tableStyle = {
        borderCollapse: 'collapse',
        fontSize: '8px',
        fontFamily: 'Arial, sans-serif'
    };

    const thStyle = {
        border: '1px solid black',
        padding: '2px 4px',
        textAlign: 'center',
        fontWeight: 'normal',
        backgroundColor: 'white'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '2px 4px',
        textAlign: 'center',
        height: '14px',
        minWidth: '24px'
    };

    const inputStyle = {
        width: '100%',
        height: '100%',
        border: 'none',
        textAlign: 'center',
        fontSize: '8px',
        padding: 0,
        margin: 0,
        background: 'transparent',
        outline: 'none'
    };

    const invalidStyle = {
        backgroundColor: '#ffcccc',
        color: 'red'
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '30px' }}>mm</th>
                        <th rowSpan={2} style={{ ...thStyle, width: '24px' }}></th>
                        <th colSpan={3} style={thStyle}>{axisLabel}</th>
                    </tr>
                    <tr>
                        <th style={{ ...thStyle, width: '24px' }}>A</th>
                        <th style={{ ...thStyle, width: '24px' }}>B</th>
                        <th style={{ ...thStyle, width: '30px' }}>A-B</th>
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, idx) => (
                        <tr key={idx}>
                            <td style={tdStyle}>{label}</td>
                            <td style={tdStyle}>{showCalcCol ? getCalcCol(idx) : ''}</td>
                            <td style={{ ...tdStyle, padding: 0, ...(!isSubmitted || getVal('a', idx) ? (isABInvalid('a', idx) ? invalidStyle : {}) : { border: '2px solid red' }) }}>
                                <input
                                    ref={el => inputRefsA.current[idx] = el}
                                    type="text"
                                    style={{ ...inputStyle, ...(isABInvalid('a', idx) ? { color: 'red' } : {}) }}
                                    value={getVal('a', idx)}
                                    onFocus={() => handleFocus('a', idx, data.a?.[idx])}
                                    onChange={e => handleChange(e.target.value)}
                                    onKeyDown={e => handleKeyDown(e, 'a', idx)}
                                    onBlur={handleBlur}
                                />
                            </td>
                            <td style={{ ...tdStyle, padding: 0, ...(!isSubmitted || getVal('b', idx) ? (isABInvalid('b', idx) ? invalidStyle : {}) : { border: '2px solid red' }) }}>
                                <input
                                    ref={el => inputRefsB.current[idx] = el}
                                    type="text"
                                    style={{ ...inputStyle, ...(isABInvalid('b', idx) ? { color: 'red' } : {}) }}
                                    value={getVal('b', idx)}
                                    onFocus={() => handleFocus('b', idx, data.b?.[idx])}
                                    onChange={e => handleChange(e.target.value)}
                                    onKeyDown={e => handleKeyDown(e, 'b', idx)}
                                    onBlur={handleBlur}
                                />
                            </td>
                            <td style={{ ...tdStyle, ...(isDiffInvalid(idx) ? invalidStyle : {}) }}>{getDiffAB(idx)}</td>
                        </tr>
                    ))}

                    {/* RETURN Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px' }}>RETURN</td>
                        <td style={{ ...tdStyle, padding: 0, ...(!isSubmitted || getVal('b', returnIndex) ? {} : { border: '2px solid red' }) }}>
                            <input
                                ref={el => inputRefsB.current[returnIndex] = el}
                                type="text"
                                style={inputStyle}
                                value={getVal('b', returnIndex)}
                                onFocus={() => handleFocus('b', returnIndex, data.b?.[returnIndex])}
                                onChange={e => handleChange(e.target.value)}
                                onKeyDown={e => handleKeyDown(e, 'b', returnIndex)}
                                onBlur={handleBlur}
                            />
                        </td>
                        <td style={tdStyle}></td>
                    </tr>

                    {/* POSITION MAX Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px', fontWeight: 'bold' }}>POSITION MAX</td>
                        <td colSpan={2} style={tdStyle}>{getPositionMax()}</td>
                    </tr>

                    {/* LOST MOTION Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px', fontWeight: 'bold' }}>LOST MOTION</td>
                        <td colSpan={2} style={tdStyle}>{getLostMotion()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TablePitchCheck;
