import React, { useState, useRef, useEffect } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';
import { useFormContext, Controller, useWatch } from 'react-hook-form';

/**
 * EDMTableStraightness Component
 * ตารางสำหรับ Straightness Check พร้อมกราฟ
 * 
 * Props:
 * - title: หัวข้อตาราง เช่น "Straight of X Axis"
 * - rowCount: จำนวนแถว (default: 31 -> 0-30)
 * - strokeStep: ระยะห่างของ stroke (default: 20)
 * - name: RHF name prefix
 * - control: RHF control
 * - standard: ค่ามาตรฐานสำหรับ validation (default: 3)
 */
function EDMTableStraightness({
    name,
    control,
    title = "Straight of X Axis",
    rowCount = 31,
    strokeStep = 20,
    standard = 3,
    cols = 5,
    fontSize = "text-xs",
    width = "280px",
    colWidths = ['w-8', 'w-10', 'w-12'],
    rowHeight = 16
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    const inputRefs = useRef([]);
    const [focusedRow, setFocusedRow] = useState(null);

    // Generate rows from 0 to rowCount-1
    const rows = Array.from({ length: rowCount }, (_, i) => i);

    // Watch all fields for graph plotting
    // Note: If data is stored as array or object in RHF, useWatch returns it.
    const rowValues = useWatch({
        control,
        name: name,
        defaultValue: {}
    });

    // Calculations
    const getValuesArray = () => {
        // rowValues might be an object { "0": "val", "1": "val" } or array
        // We filter standard logic
        return Object.values(rowValues || {})
            .filter(v => v !== '' && v !== undefined && v !== null)
            .map(v => parseFloat(v));
    };

    const getDiffValue = () => {
        const values = getValuesArray().filter(v => !isNaN(v));
        if (values.length > 0) {
            const max = Math.max(...values);
            const min = Math.min(...values);
            return Math.abs(max - min);
        }
        return 0;
    };

    const diffValue = getDiffValue();
    const isValid = validateValue(diffValue, { maxDiff: standard, useAbs: true });

    // Graph Logic
    const graphPadding = 10;
    const graphWidth = 110;
    const graphCenter = graphWidth / 2;
    const usableWidth = graphWidth - (graphPadding * 2);

    const getGraphX = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return graphCenter; // Fallback
        const clamped = Math.max(-5, Math.min(5, num));
        return graphCenter - (clamped * (usableWidth / 10));
    };

    // const rowHeight = 16; // Moved to props
    const headerHeight = 0; // Removed header row
    const footerHeight = 14;
    const graphAreaHeight = rowCount * rowHeight;
    const totalHeight = headerHeight + graphAreaHeight + footerHeight;

    // Handlers
    const handleKeyDown = (e, rowIndex) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            moveFocus(e, rowIndex, inputRefs.current, { direction: 1 });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            // Custom FocusNext logic or reuse existing utils if compatible
            if (rowIndex < rowCount - 1) {
                // Direction -1 (visual up in table? Table is reversed visually? No, Table renders rows... wait)
                // In DOM:
                // ... map((rowIndex) => ...
                // If we render rows reversed in visual (bottom-to-top), ArrowUp should go to rowIndex + 1?
                // Let's check render order.
                // [...rows].reverse().map...
                // So row 30 is at top? row 0 is at bottom? (Graph style)
                // Let's check original code.
                // Yes, `[...rows].reverse().map`
                // So visual TOP is row 30. Visual BOTTOM is row 0.
                // ArrowUp should go to RowIndex + 1.
                const nextIndex = rowIndex + 1;
                if (inputRefs.current[nextIndex]) inputRefs.current[nextIndex].focus();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (rowIndex > 0) {
                const nextIndex = rowIndex - 1;
                if (inputRefs.current[nextIndex]) inputRefs.current[nextIndex].focus();
            }
        }
    };

    // Auto focus row 0 on mount?
    // Original had useEffect for row 0 focus. Might not be needed or annoying if multiple tables.
    // Omitted for now to avoid scroll jumping.

    return (
        <div className="border border-black bg-white" style={{ width: width }}>
            <div className="border-b border-black px-2 py-0 text-sm font-medium flex justify-between items-center">
                <span>{title}</span>
                <span className={`px-2 py-0.5 ${!isValid ? 'bg-red-200 text-red-600' : ''}`}>
                    Diff: {diffValue.toFixed(1)} / STD: {standard}
                </span>
            </div>

            <div className="flex">
                <div className="flex flex-col">


                    {[...rows].reverse().map((rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex border-b border-black"
                            style={{ height: `${rowHeight}px` }}
                        >
                            <div className={`${colWidths[0]} border-r border-black flex items-center justify-center ${fontSize}`}>
                                {rowIndex}
                            </div>
                            <div className={`${colWidths[1]} border-r border-black flex items-center justify-center ${fontSize}`}>
                                {rowIndex * strokeStep}
                            </div>
                            <div className={`${colWidths[2]} border-r border-black flex items-center justify-center`}>
                                <Controller
                                    name={`${name}.${rowIndex}`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => (
                                        <input
                                            ref={(e) => {
                                                field.ref(e);
                                                inputRefs.current[rowIndex] = e;
                                            }}
                                            type="text"
                                            inputMode="decimal" // Better for mobile
                                            className={`w-full h-full text-center outline-none ${fontSize} ${error ? 'bg-red-50 border border-red-500' : 'bg-transparent'}`}
                                            value={field.value || ''}
                                            onChange={(e) => {
                                                const val = cleanNumericInput(e.target.value);
                                                field.onChange(val);
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                            onFocus={() => setFocusedRow(rowIndex)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 relative">
                    <svg
                        width="100%"
                        height={totalHeight}
                        viewBox={`0 0 ${graphWidth} ${totalHeight}`}
                        preserveAspectRatio="none"
                    >
                        {/* X-axis labels (footer) */}
                        {[5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5].map((val) => {
                            const x = getGraphX(val);
                            return (
                                <text
                                    key={`label-${val}`}
                                    x={x}
                                    y={headerHeight + graphAreaHeight + 10}
                                    fontSize="7"
                                    textAnchor="middle"
                                    fill="#333"
                                >
                                    {val}
                                </text>
                            );
                        })}

                        {/* Grid lines vertical */}
                        {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => {
                            const x = getGraphX(val);
                            return (
                                <line
                                    key={`grid-${val}`}
                                    x1={x}
                                    y1={headerHeight}
                                    x2={x}
                                    y2={headerHeight + graphAreaHeight}
                                    stroke="#ccc"
                                    strokeWidth="0.5"
                                />
                            );
                        })}

                        {/* Center line */}
                        <line
                            x1={graphCenter}
                            y1={headerHeight}
                            x2={graphCenter}
                            y2={headerHeight + graphAreaHeight}
                            stroke="#666"
                            strokeWidth="1"
                        />

                        {/* X-axis line (bottom) */}
                        <line
                            x1={0}
                            y1={headerHeight + graphAreaHeight}
                            x2={graphWidth}
                            y2={headerHeight + graphAreaHeight}
                            stroke="black"
                            strokeWidth="1"
                        />

                        {/* Horizontal grid lines */}
                        {rows.map((rowIndex) => {
                            const y = headerHeight + ((rowCount - 1 - rowIndex) * rowHeight);
                            return (
                                <line
                                    key={`hgrid-${rowIndex}`}
                                    x1={0}
                                    y1={y}
                                    x2={graphWidth}
                                    y2={y}
                                    stroke="#eee"
                                    strokeWidth="0.5"
                                />
                            );
                        })}

                        {/* Plot */}
                        {(() => {
                            const validPoints = rows
                                .filter(idx => {
                                    const val = rowValues?.[idx];
                                    return val !== undefined && val !== '' && val !== null && !isNaN(parseFloat(val));
                                })
                                .map(idx => {
                                    const val = rowValues[idx];
                                    const x = getGraphX(val);
                                    // Row 0 is at bottom.
                                    // y = headerHeight + graphAreaHeight - (rowIndex * rowHeight)
                                    // This puts row 0 at the line.
                                    const y = headerHeight + graphAreaHeight - (idx * rowHeight);
                                    return { x, y, idx };
                                })
                                .sort((a, b) => a.idx - b.idx);

                            if (validPoints.length < 2) return null;

                            const pathD = validPoints.map((p, i) =>
                                (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)
                            ).join(' ');

                            return (
                                <path
                                    d={pathD}
                                    stroke="brown"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            );
                        })()}

                        {/* Points */}
                        {rows.map((rowIndex) => {
                            const val = rowValues?.[rowIndex];
                            if (val === undefined || val === '' || val === null || isNaN(parseFloat(val))) return null;
                            const x = getGraphX(val);
                            const y = headerHeight + graphAreaHeight - (rowIndex * rowHeight);
                            return (
                                <circle
                                    key={`point-${rowIndex}`}
                                    cx={x}
                                    cy={y}
                                    r="2"
                                    fill="brown"
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default EDMTableStraightness;
