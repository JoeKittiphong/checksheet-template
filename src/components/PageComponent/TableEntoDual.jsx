import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableEntoDual Component
 * 
 * Structure based on image:
 * Left: Z1L (A up, B down, diff) | Z2L (same)
 * Right: Z1R (B up, A down, diff) | Z2R (same) | A+B
 * 
 * Simplified version:
 * Left: mm | Z1L (A, B, diff) | Z2L header
 * Right: Z1R (B, A, diff) | Z2R header | A+B
 * 
 * A+B = Left A + Right B (or A-B based on formula)
 */
function TableEntoDual({
    data = { left: { a: [], b: [] }, right: { a: [], b: [] } },
    onChange = () => { },
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    formula = "A+B"  // "A+B" or "A-B"
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    // Ensure nested structures exist
    const leftData = data?.left || { a: [], b: [] };
    const rightData = data?.right || { a: [], b: [] };

    // Generate Row labels: top = (rowCount-1)*stepSize, bottom = 0
    const rowLabels = [];
    for (let i = 0; i < rowCount; i++) {
        rowLabels.push((rowCount - 1 - i) * stepSize);
    }

    // Refs for all inputs
    const refsLeftA = useRef([]);
    const refsLeftB = useRef([]);
    const refsRightB = useRef([]);  // Right starts with B (going up)
    const refsRightA = useRef([]);  // Right A (going down)

    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const handleFocus = (table, col, index, val) => {
        setEditingCell({ table, col, index });
        setEditingValue(val || '');
    };

    const handleChange = (val) => {
        setEditingValue(cleanNumericInput(val));
    };

    const commitValue = () => {
        if (!editingCell) return;
        const { table, col, index } = editingCell;

        const nextData = {
            ...data,
            left: { ...leftData },
            right: { ...rightData }
        };

        if (table === 'left') {
            const newCols = { ...nextData.left };
            if (!newCols[col]) newCols[col] = [];
            newCols[col][index] = editingValue;
            nextData.left = newCols;
        } else {
            const newCols = { ...nextData.right };
            if (!newCols[col]) newCols[col] = [];
            newCols[col][index] = editingValue;
            nextData.right = newCols;
        }

        onChange(nextData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleKeyDown = (e, table, col, index) => {
        if (e.key === 'Enter') {
            commitValue();

            // Auto-focus logic:
            // Left: A (bottom up) -> Left B (top down, skip row 0) -> Right B (bottom up) -> Right A (top down, skip row 0)
            if (table === 'left') {
                if (col === 'a') {
                    moveFocus(e, index, refsLeftA.current, {
                        direction: -1,
                        onBoundary: () => {
                            // Finished Left A, move to Left B at row 1 (skip row 0)
                            const bRow1 = refsLeftB.current[1];
                            if (bRow1) bRow1.focus();
                        }
                    });
                } else if (col === 'b') {
                    moveFocus(e, index, refsLeftB.current, {
                        direction: 1,
                        onBoundary: () => {
                            // Finished Left B, move to Right B at bottom
                            // Right B starts from bottom (rowCount-1) going UP
                            // Wait, Right B description says (bottom up). 
                            // So we need to focus the LAST element of refsRightB.
                            const lastRightB = refsRightB.current[rowCount - 1];
                            if (lastRightB) lastRightB.focus();
                        }
                    });
                }
            } else {
                if (col === 'b') {
                    // Right B goes UP (bottom up)
                    moveFocus(e, index, refsRightB.current, {
                        direction: -1,
                        onBoundary: () => {
                            // Finished Right B (at top), move to Right A at row 1 (skip row 0)
                            const aRow1 = refsRightA.current[1];
                            if (aRow1) aRow1.focus();
                        }
                    });
                } else if (col === 'a') {
                    // Right A goes DOWN (top down)
                    moveFocus(e, index, refsRightA.current, { direction: 1 });
                }
            }
        }
    };

    const handleBlur = () => {
        commitValue();
    };

    const getVal = (table, col, idx) => {
        const data = table === 'left' ? leftData : rightData;
        if (editingCell?.table === table && editingCell?.col === col && editingCell?.index === idx) {
            return editingValue;
        }
        return data[col]?.[idx] || '';
    };

    // Diff: |A - B| - but for simplified table, we show the value from same column going back
    // For Left: shows difference between going up (A) and going down (needs B column storage)
    // For Right: shows difference between going up (B) and going down (needs A column storage)
    const getDiff = (table, idx) => {
        const data = table === 'left' ? leftData : rightData;
        const a = parseFloat(data.a?.[idx]);
        const b = parseFloat(data.b?.[idx]);
        if (isNaN(a) || isNaN(b)) return '';
        return Math.abs(a - b).toFixed(3).replace(/\.?0+$/, '');
    };

    // A+B or A-B: Left A +/- Right B
    const getABFormula = (idx) => {
        const leftA = parseFloat(leftData.a?.[idx]);
        const rightB = parseFloat(rightData.b?.[idx]);
        if (isNaN(leftA) || isNaN(rightB)) return '';
        const result = formula === "A+B" ? (leftA + rightB) : (leftA - rightB);
        return result.toFixed(3).replace(/\.?0+$/, '');
    };

    // Max of Left A (going up column)
    const getMaxLeftA = () => {
        const nums = (leftData.a || []).slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        if (nums.length === 0) return '';
        return Math.max(...nums).toFixed(3).replace(/\.?0+$/, '');
    };

    // Max of Right B (going up column)
    const getMaxRightB = () => {
        const nums = (rightData.b || []).slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        if (nums.length === 0) return '';
        return Math.max(...nums).toFixed(3).replace(/\.?0+$/, '');
    };

    // Max of A+B/A-B column
    const getMaxABFormula = () => {
        const vals = [];
        for (let i = 0; i < rowCount; i++) {
            const leftA = parseFloat(leftData.a?.[i]);
            const rightB = parseFloat(rightData.b?.[i]);
            if (!isNaN(leftA) && !isNaN(rightB)) {
                const result = formula === "A+B" ? (leftA + rightB) : (leftA - rightB);
                vals.push(result);
            }
        }
        if (vals.length === 0) return '';
        return Math.max(...vals).toFixed(3).replace(/\.?0+$/, '');
    };

    // Validation
    const isABInvalid = (table, col, idx) => {
        const data = table === 'left' ? leftData : rightData;
        return !validateValue(data[col]?.[idx], {
            maxValue,
            validateStd: true
        });
    };

    const isDiffInvalid = (table, idx) => {
        return !validateValue(getDiff(table, idx), {
            maxDiff,
            validateStd: true
        });
    };

    const isMaxLeftAInvalid = () => {
        return !validateValue(getMaxLeftA(), {
            maxValue,
            validateStd: true
        });
    };

    const isMaxRightBInvalid = () => {
        return !validateValue(getMaxRightB(), {
            maxValue,
            validateStd: true
        });
    };

    const isMaxABFormulaInvalid = () => {
        return !validateValue(getMaxABFormula(), {
            maxValue, // Using same maxValue for A+B/A-B
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

    const thGrayStyle = {
        ...thStyle,
        backgroundColor: '#e0e0e0'
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
        fontSize: '10px',
        padding: 0,
        margin: 0,
        background: 'transparent',
        outline: 'none'
    };

    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };
    const grayBgStyle = { backgroundColor: '#f2f2f2' };

    const renderInput = (table, col, idx, refs) => {
        const val = getVal(table, col, idx);
        const isReqError = isSubmitted && !val;
        const invalid = !isReqError && isABInvalid(table, col, idx);

        return (
            <td style={{ ...tdStyle, padding: 0, ...grayBgStyle, ...(invalid ? invalidStyle : {}) }}>
                <input
                    ref={el => refs.current[idx] = el}
                    type="text"
                    style={{
                        ...inputStyle,
                        ...(isReqError ? { border: '2px solid red' } : {}),
                        ...(invalid ? { color: 'red' } : {})
                    }}
                    value={val}
                    onFocus={() => handleFocus(table, col, idx, (table === 'left' ? leftData : rightData)[col]?.[idx])}
                    onChange={e => handleChange(e.target.value)}
                    onKeyDown={e => handleKeyDown(e, table, col, idx)}
                    onBlur={handleBlur}
                />
            </td>
        );
    };

    return (
        <div className="inline-block">
            <table style={tableStyle}>
                <thead>
                    {/* Row 1: Left | Right */}
                    <tr>
                        <th style={{ ...thStyle, border: 'none' }}></th>
                        <th colSpan={3} style={thGrayStyle}>Left</th>
                        <th colSpan={4} style={thGrayStyle}>Right</th>
                    </tr>
                    {/* Row 2: mm | Z1L | Z1R | A+B */}
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '8mm' }}>mm</th>
                        <th colSpan={3} style={thStyle}>Z1L</th>
                        <th colSpan={3} style={thStyle}>Z1R</th>
                        <th rowSpan={2} style={thStyle}>{formula}</th>
                    </tr>
                    {/* Row 3: A | B | diff | B | A | diff */}
                    <tr>
                        <th style={{ ...thStyle, width: '8mm' }}>A</th>
                        <th style={{ ...thStyle, width: '8mm' }}></th>
                        <th style={{ ...thStyle, width: '8mm' }}></th>
                        <th style={{ ...thStyle, width: '8mm' }}>B</th>
                        <th style={{ ...thStyle, width: '8mm' }}></th>
                        <th style={{ ...thStyle, width: '8mm' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, idx) => (
                        <tr key={idx}>
                            <td style={tdStyle}>{label}</td>

                            {/* Left A (going up) */}
                            {renderInput('left', 'a', idx, refsLeftA)}

                            {/* Left B (going down) */}
                            {renderInput('left', 'b', idx, refsLeftB)}

                            {/* Left Diff (A-B) */}
                            <td style={{ ...tdStyle, ...(isDiffInvalid('left', idx) ? invalidStyle : {}) }}>
                                {getDiff('left', idx)}
                            </td>

                            {/* Right B (going up) */}
                            {renderInput('right', 'b', idx, refsRightB)}

                            {/* Right A (going down) */}
                            {renderInput('right', 'a', idx, refsRightA)}

                            {/* Right Diff (A-B) */}
                            <td style={{ ...tdStyle, ...(isDiffInvalid('right', idx) ? invalidStyle : {}) }}>
                                {getDiff('right', idx)}
                            </td>

                            {/* A+B / A-B (Left A + Right B) */}
                            <td style={{ ...tdStyle, ...grayBgStyle }}>{getABFormula(idx)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {/* Footer row with max values */}
                    <tr>
                        <td style={{ ...tdStyle, ...grayBgStyle, fontWeight: 'bold' }}>MAX</td>
                        <td style={{ ...tdStyle, ...grayBgStyle, fontWeight: 'bold', ...(isMaxLeftAInvalid() ? invalidStyle : {}) }}>
                            {getMaxLeftA()}
                        </td>
                        <td style={{ ...tdStyle, ...grayBgStyle }}></td>
                        <td style={{ ...tdStyle, ...grayBgStyle }}></td>
                        <td style={{ ...tdStyle, ...grayBgStyle, fontWeight: 'bold', ...(isMaxRightBInvalid() ? invalidStyle : {}) }}>
                            {getMaxRightB()}
                        </td>
                        <td style={{ ...tdStyle, ...grayBgStyle }}></td>
                        <td style={{ ...tdStyle, ...grayBgStyle }}></td>
                        <td style={{ ...tdStyle, ...grayBgStyle, fontWeight: 'bold', ...(isMaxABFormulaInvalid() ? invalidStyle : {}) }}>
                            {getMaxABFormula()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TableEntoDual;
