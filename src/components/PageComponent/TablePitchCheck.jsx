import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useWatch, Controller, useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TablePitchCheck Component
 * Refactored to use granular Controllers and Enable/Disable support.
 * Supports continuity calculation via linkedNextVal and external focus control.
 */
const TablePitchCheck = forwardRef(({
    name,
    control,
    axisLabel = "X1",
    rowCount = 16,
    stepSize = 20,
    maxAB = 15,
    maxDiff = 1,
    showCalcCol = true,
    enabled = true, // Default enabled
    onToggle = null, // Optional toggle handler
    minVal = 0, // Optional minimum value for labels
    linkedNextVal = null, // Value from the "next" table for continuity calculation
    onReachTop = null, // Callback when Enter is pressed at Top Row (Index 0)
    onReachBottomB = null, // Callback when Enter is pressed at Bottom Row B (or last enabled B)
    disableBottomRowA = false,
    disableBottomRowB = false,
    disablePenultimateRowB = false, // Disable rowCount - 2 in Col B
    disableReturnRow = false,
    disableTopRowB = true, // Default true (standard 0 start)
    disableTopRowA = false,
    disableSecondRowB = false
}, ref) => {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();

    const inputRefsA = useRef([]);
    const inputRefsB = useRef([]);

    // Expose focus method to parent
    useImperativeHandle(ref, () => ({
        focusIndex: (index, col = 'a') => {
            if (col === 'a') inputRefsA.current[index]?.focus();
            else inputRefsB.current[index]?.focus();
        }
    }));

    const tableData = useWatch({
        control,
        name: name,
        defaultValue: { a: [], b: [] }
    });

    const getVal = (col, idx) => tableData[col]?.[idx] || '';

    const getCalcCol = (idx) => {
        const currA = parseFloat(getVal('a', idx));
        // If last row, try using linkedNextVal for continuity
        const nextValRaw = (idx === rowCount - 1 && linkedNextVal !== null)
            ? linkedNextVal
            : getVal('a', idx + 1);

        const nextA = parseFloat(nextValRaw);

        if (isNaN(currA) || isNaN(nextA)) return '';
        return ((currA - nextA) * 5).toFixed(3).replace(/\.?0+$/, '');
    };

    const getDiffAB = (idx) => {
        const a = parseFloat(getVal('a', idx));
        const b = parseFloat(getVal('b', idx));
        if (isNaN(a) || isNaN(b)) return '';
        return Math.abs(a - b).toFixed(3).replace(/\.?0+$/, '');
    };

    const isABInvalid = (val) => !validateValue(val, { maxValue: maxAB, validateStd: true });

    const isDiffInvalid = (idx) => {
        const diff = getDiffAB(idx);
        if (diff === '') return false;
        return !validateValue(diff, { maxDiff, validateStd: true, useAbs: true });
    };

    const getPositionMax = () => {
        const nums = (tableData.a || []).slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        return nums.length > 0 ? Math.max(...nums).toFixed(3).replace(/\.?0+$/, '') : '';
    };

    const getLostMotion = () => {
        const diffs = [];
        for (let i = 0; i < rowCount; i++) {
            const a = parseFloat(tableData.a?.[i]);
            const b = parseFloat(tableData.b?.[i]);
            if (!isNaN(a) && !isNaN(b)) {
                diffs.push(Math.abs(a - b));
            }
        }
        return diffs.length > 0 ? Math.max(...diffs).toFixed(3).replace(/\.?0+$/, '') : '';
    };

    const handleKeyDown = (e, col, index) => {
        if (!enabled) return;

        if (e.key === 'Enter') {
            e.preventDefault();

            if (col === 'a') {
                moveFocus(e, index, inputRefsA.current, {
                    direction: -1, // Moving UP (calculating from bottom)
                    onBoundary: () => {
                        // If at Top (Index 0), trigger callback
                        if (index === 0 && onReachTop) {
                            onReachTop();
                        } else {
                            if (inputRefsB.current[1]) inputRefsB.current[1].focus();
                        }
                    }
                });
            } else if (col === 'b') {
                moveFocus(e, index, inputRefsB.current, {
                    direction: 1, // Moving DOWN
                    onBoundary: () => {
                        // Check if we are at bottom or last enabled row
                        const isBottom = index === rowCount - 1;
                        if (isBottom && onReachBottomB) {
                            onReachBottomB();
                        } else {
                            const retRow = inputRefsB.current[rowCount];
                            if (retRow && !disableReturnRow) retRow.focus();
                        }
                    }
                });
            }
        }
    };

    const rowLabels = Array.from({ length: rowCount }, (_, i) => minVal + ((rowCount - 1 - i) * stepSize));
    const returnIndex = rowCount;

    // Styles
    const tableStyle = { borderCollapse: 'collapse', fontSize: '8px', fontFamily: 'Arial, sans-serif' };
    const thStyle = { border: '1px solid black', padding: '2px 4px', textAlign: 'center', fontWeight: 'normal', backgroundColor: 'white' };
    const tdStyle = { border: '1px solid black', padding: '2px 4px', textAlign: 'center', height: '14px', minWidth: '24px' };
    const inputStyle = { width: '100%', height: '100%', border: 'none', textAlign: 'center', fontSize: '8px', padding: 0, margin: 0, background: 'transparent', outline: 'none' };
    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };

    return (
        <div style={{ display: 'inline-block' }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '30px' }}>mm</th>
                        <th rowSpan={2} style={{ ...thStyle, width: '24px' }}></th>
                        <th colSpan={3} style={thStyle}>
                            <div className="flex items-center justify-center gap-1">
                                {onToggle && <input type="checkbox" checked={enabled} onChange={onToggle} />}
                                <span>{axisLabel}</span>
                            </div>
                        </th>
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
                            <td style={tdStyle}>{showCalcCol && enabled ? getCalcCol(idx) : ''}</td>

                            {/* Column A */}
                            <td style={{ ...tdStyle, padding: 0, ...(!enabled ? { backgroundColor: '#e0e0e0' } : {}) }}>
                                <Controller
                                    name={`${name}.a.${idx}`}
                                    control={control}
                                    rules={{ required: enabled }}
                                    render={({ field, fieldState: { error } }) => {
                                        const val = field.value || '';
                                        const disabledRow = (idx === rowCount - 1 && disableBottomRowA) ||
                                            (idx === 0 && disableTopRowA);
                                        const invalid = enabled && !disabledRow && isABInvalid(val) && (isSubmitted || val);
                                        const isDisabled = !enabled || disabledRow;

                                        return (
                                            <input
                                                ref={(e) => {
                                                    field.ref(e);
                                                    inputRefsA.current[idx] = e;
                                                }}
                                                type="text"
                                                disabled={isDisabled}
                                                style={{
                                                    ...inputStyle,
                                                    ...(error && !isDisabled ? { border: '2px solid red', backgroundColor: '#fff0f0' } : {}),
                                                    ...(invalid ? { color: 'red' } : {}),
                                                    ...(isDisabled ? { cursor: 'not-allowed', backgroundColor: '#e0e0e0' } : {})
                                                }}
                                                value={val}
                                                onChange={(e) => field.onChange(cleanNumericInput(e.target.value))}
                                                onKeyDown={(e) => handleKeyDown(e, 'a', idx)}
                                                onBlur={field.onBlur}
                                            />
                                        );
                                    }}
                                />
                            </td>

                            {/* Column B */}
                            <td style={{ ...tdStyle, padding: 0, ...((idx === 0 && disableTopRowB) || !enabled ? { backgroundColor: '#e0e0e0' } : {}) }}>
                                {(idx > 0 || !disableTopRowB) && (
                                    <Controller
                                        name={`${name}.b.${idx}`}
                                        control={control}
                                        rules={{ required: enabled }}
                                        render={({ field, fieldState: { error } }) => {
                                            const val = field.value || '';
                                            const disabledRow = (idx === rowCount - 1 && disableBottomRowB) ||
                                                (idx === rowCount - 2 && disablePenultimateRowB) ||
                                                (idx === 0 && disableTopRowB) ||
                                                (idx === 1 && disableSecondRowB);
                                            const invalid = enabled && !disabledRow && isABInvalid(val) && (isSubmitted || val);
                                            const isDisabled = !enabled || disabledRow;

                                            return (
                                                <input
                                                    ref={(e) => {
                                                        field.ref(e);
                                                        inputRefsB.current[idx] = e;
                                                    }}
                                                    type="text"
                                                    disabled={isDisabled}
                                                    style={{
                                                        ...inputStyle,
                                                        ...(error && !isDisabled ? { border: '2px solid red', backgroundColor: '#fff0f0' } : {}),
                                                        ...(invalid ? { color: 'red' } : {}),
                                                        ...(isDisabled ? { cursor: 'not-allowed', backgroundColor: '#e0e0e0' } : {})
                                                    }}
                                                    value={val}
                                                    onChange={(e) => field.onChange(cleanNumericInput(e.target.value))}
                                                    onKeyDown={(e) => handleKeyDown(e, 'b', idx)}
                                                    onBlur={field.onBlur}
                                                />
                                            );
                                        }}
                                    />
                                )}
                            </td>

                            {/* Diff Column */}
                            <td style={{ ...tdStyle, ...(enabled && isDiffInvalid(idx) ? invalidStyle : {}), ...(!enabled ? { backgroundColor: '#e0e0e0' } : {}) }}>
                                {enabled ? getDiffAB(idx) : ''}
                            </td>
                        </tr>
                    ))}

                    {/* RETURN Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px' }}>RETURN</td>
                        <td style={{ ...tdStyle, padding: 0, ...(!enabled ? { backgroundColor: '#e0e0e0' } : {}) }}>
                            <Controller
                                name={`${name}.b.${returnIndex}`}
                                control={control}
                                rules={{ required: enabled }}
                                render={({ field, fieldState: { error } }) => (
                                    <input
                                        ref={(e) => {
                                            field.ref(e);
                                            inputRefsB.current[returnIndex] = e;
                                        }}
                                        type="text"
                                        disabled={!enabled}
                                        style={{
                                            ...inputStyle,
                                            ...(error ? { border: '2px solid red', backgroundColor: '#fff0f0' } : {}),
                                            ...(!enabled ? { cursor: 'not-allowed', backgroundColor: '#e0e0e0' } : {})
                                        }}
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(cleanNumericInput(e.target.value))}
                                        onKeyDown={(e) => handleKeyDown(e, 'b', returnIndex)}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                        </td>
                        <td style={{ ...tdStyle, ...(!enabled ? { backgroundColor: '#e0e0e0' } : {}) }}></td>
                    </tr>

                    {/* POSITION MAX Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px', fontWeight: 'bold' }}>POSITION MAX</td>
                        <td colSpan={2} style={tdStyle}>{enabled ? getPositionMax() : ''}</td>
                    </tr>

                    {/* LOST MOTION Row */}
                    <tr>
                        <td colSpan={3} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '4px', fontWeight: 'bold' }}>LOST MOTION</td>
                        <td colSpan={2} style={tdStyle}>{enabled ? getLostMotion() : ''}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default TablePitchCheck;
