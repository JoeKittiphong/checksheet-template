import React, { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableEnto Component
 * 
 * Structure:
 * - Header: mm | axisLabel (spanning A, B, Diff)
 * - Rows: descending from max to 0
 * - Input flow: A from bottom (0) going UP, then B from top going DOWN
 * - Diff column: absolute difference of A and B
 */
function TableEnto({
    data = { a: [], b: [] },
    onChange = () => { },
    axisLabel = "Z1L",
    rowCount = 21,      // 400 to 0 by 20 = 21 rows
    stepSize = 20,
    maxValue = 15,      // Validation max for A and B
    maxDiff = 1         // Validation max for diff
}) {
    const { moveFocus } = useFocusNavigation();
    // Generate Row labels: top = (rowCount-1)*stepSize, bottom = 0
    const rowLabels = [];
    for (let i = 0; i < rowCount; i++) {
        rowLabels.push((rowCount - 1 - i) * stepSize);
    }

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

            // Auto-focus:
            // A: Start from bottom (index rowCount-1, value 0) going UP (decreasing index)
            // B: Start from top (index 0) going DOWN (increasing index)
            if (col === 'a') {
                moveFocus(e, index, inputRefsA.current, {
                    direction: -1,
                    onBoundary: () => {
                        // Reached top (index 0).
                        // Go to B row 1.
                        const bRow1 = inputRefsB.current[1];
                        if (bRow1) bRow1.focus();
                    }
                });
            } else if (col === 'b') {
                moveFocus(e, index, inputRefsB.current, { direction: 1 });
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

    // Diff: |A - B|
    const getDiff = (idx) => {
        const a = parseFloat(data.a?.[idx]);
        const b = parseFloat(data.b?.[idx]);
        if (isNaN(a) || isNaN(b)) return '';
        return Math.abs(a - b).toFixed(3).replace(/\.?0+$/, '');
    };

    // Validation
    const isABInvalid = (col, idx) => {
        return !validateValue(data[col]?.[idx], {
            maxValue,
            validateStd: true
        });
    };

    const isDiffInvalid = (idx) => {
        return !validateValue(getDiff(idx), {
            maxDiff,
            validateStd: true
        });
    };

    // Styles
    const tableStyle = {
        borderCollapse: 'collapse',
        fontSize: '8px',
        fontFamily: 'Arial, sans-serif'
    };

    const thStyle = {
        border: '1px solid black',
        padding: '1mm 2mm',
        textAlign: 'center',
        fontWeight: 'normal',
        backgroundColor: 'white'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '1mm 2mm',
        textAlign: 'center',
        height: '4mm',
        minWidth: '6mm'
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

    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };

    return (
        <div className="inline-block">
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '8mm' }}>mm</th>
                        <th colSpan={3} style={thStyle}>{axisLabel}</th>
                    </tr>
                    <tr>
                        <th style={{ ...thStyle, width: '8mm' }}>A</th>
                        <th style={{ ...thStyle, width: '8mm' }}>B</th>
                        <th style={{ ...thStyle, width: '8mm' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, idx) => (
                        <tr key={idx}>
                            <td style={tdStyle}>{label}</td>

                            {/* Column A */}
                            <td style={{ ...tdStyle, padding: 0, ...(isABInvalid('a', idx) ? invalidStyle : {}) }}>
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

                            {/* Column B */}
                            <td style={{ ...tdStyle, padding: 0, ...(isABInvalid('b', idx) ? invalidStyle : {}) }}>
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

                            {/* Diff Column */}
                            <td style={{ ...tdStyle, ...(isDiffInvalid(idx) ? invalidStyle : {}) }}>
                                {getDiff(idx)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableEnto;
