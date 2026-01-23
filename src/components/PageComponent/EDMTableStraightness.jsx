import React, { useState, useRef, useEffect } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EDMTableStraightness Component
 * ตารางสำหรับ Straightness Check พร้อมกราฟ
 * 
 * Props:
 * - title: หัวข้อตาราง เช่น "Straight of X Axis"
 * - rowCount: จำนวนแถว (default: 31 -> 0-30)
 * - strokeStep: ระยะห่างของ stroke (default: 20)
 * - data: object เก็บค่า input { 0: value, 1: value, ... }
 * - onChange: callback เมื่อมีการเปลี่ยนแปลงค่า
 * - standard: ค่ามาตรฐานสำหรับ validation (default: 3)
 */
function EDMTableStraightness({
    title = "Straight of X Axis",
    rowCount = 31,
    strokeStep = 20,
    data = {},
    onChange = () => { },
    standard = 3
}) {
    const { moveFocus, focusNext } = useFocusNavigation();
    const inputRefs = useRef([]);
    const [focusedRow, setFocusedRow] = useState(null);
    const [diffValue, setDiffValue] = useState(0);
    const [isValid, setIsValid] = useState(true);

    // Generate rows from 0 to rowCount-1
    const rows = Array.from({ length: rowCount }, (_, i) => i);

    // Handle input change
    const handleInputChange = (rowIndex, value) => {
        // Allow only numbers and minus sign
        const cleaned = cleanNumericInput(value);
        // Create new data object with updated value
        const newData = { ...data, [rowIndex]: cleaned };
        onChange(newData);
    };

    // Handle key down for auto-focus navigation
    const handleKeyDown = (e, rowIndex) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            moveFocus(e, rowIndex, inputRefs.current, { direction: 1 });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusNext(rowIndex, inputRefs.current, { direction: 1 });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusNext(rowIndex, inputRefs.current, { direction: -1 });
        }
    };

    // Auto focus on row 0 when component mounts
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Calculate diff (max - min) of all input values and validate
    useEffect(() => {
        const values = Object.values(data)
            .filter(v => v !== '' && v !== undefined && v !== null)
            .map(v => parseFloat(v) || 0);

        if (values.length > 0) {
            const max = Math.max(...values);
            const min = Math.min(...values);
            const diff = Math.abs(max - min);
            setDiffValue(diff);
            setIsValid(validateValue(diff, { maxDiff: standard, useAbs: true }));
        } else {
            setDiffValue(0);
            setIsValid(true);
        }
    }, [data, standard]);

    // Calculate graph X position for a value
    // X-axis: 5 (left) to -5 (right), total width = 10 units
    // Graph area width in SVG units
    const graphPadding = 10; // Padding on left and right for labels
    const graphWidth = 110; // pixels for graph area including padding
    const graphCenter = graphWidth / 2;
    const usableWidth = graphWidth - (graphPadding * 2); // Actual plottable width

    const getGraphX = (value) => {
        const num = parseFloat(value) || 0;
        // Clamp to -5 to 5
        const clamped = Math.max(-5, Math.min(5, num));
        // 5 -> left, 0 -> center, -5 -> right (with padding)
        // So: x = center - (value * (usableWidth/10))
        return graphCenter - (clamped * (usableWidth / 10));
    };

    // Row height
    const rowHeight = 16;
    const headerHeight = 24;
    const footerHeight = 14; // For X-axis labels
    const graphAreaHeight = rowCount * rowHeight;
    const totalHeight = headerHeight + graphAreaHeight + footerHeight;

    return (
        <div className="border border-black bg-white" style={{ width: '280px' }}>
            {/* Title with Diff display */}
            <div className="border-b border-black px-2 py-1 text-sm font-medium flex justify-between items-center">
                <span>{title}</span>
                <span className={`px-2 py-0.5 ${!isValid ? 'bg-red-200 text-red-600' : ''}`}>
                    Diff: {diffValue.toFixed(1)} / STD: {standard}
                </span>
            </div>

            {/* Table with Graph */}
            <div className="flex">
                {/* Table Columns */}
                <div className="flex flex-col">
                    {/* Header Row */}
                    <div className="flex border-b border-black" style={{ height: `${headerHeight}px` }}>
                        <div className="w-8 border-r border-black flex items-center justify-center text-xs"></div>
                        <div className="w-10 border-r border-black flex items-center justify-center text-xs"></div>
                        <div className="w-12 border-r border-black flex items-center justify-center text-xs"></div>
                    </div>

                    {/* Data Rows - reversed for bottom-to-top display */}
                    {[...rows].reverse().map((rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex border-b border-black"
                            style={{ height: `${rowHeight}px` }}
                        >
                            {/* Row Number */}
                            <div className="w-8 border-r border-black flex items-center justify-center text-xs">
                                {rowIndex}
                            </div>
                            {/* Stroke Value */}
                            <div className="w-10 border-r border-black flex items-center justify-center text-xs">
                                {rowIndex * strokeStep}
                            </div>
                            {/* Input */}
                            <div className="w-12 border-r border-black flex items-center justify-center">
                                <input
                                    ref={el => inputRefs.current[rowIndex] = el}
                                    type="text"
                                    className="w-full h-full text-center text-xs outline-none bg-transparent"
                                    value={data[rowIndex] || ''}
                                    onChange={(e) => handleInputChange(rowIndex, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                                    onFocus={() => setFocusedRow(rowIndex)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Graph Area */}
                <div className="flex-1 relative">
                    <svg
                        width="100%"
                        height={totalHeight}
                        viewBox={`0 0 ${graphWidth} ${totalHeight}`}
                        preserveAspectRatio="none"
                    >
                        {/* Grid lines vertical (every unit from 5 to -5) */}
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

                        {/* Center line (0) - darker */}
                        <line
                            x1={graphCenter}
                            y1={headerHeight}
                            x2={graphCenter}
                            y2={headerHeight + graphAreaHeight}
                            stroke="#666"
                            strokeWidth="1"
                        />

                        {/* X-axis line (bottom border below row 0) */}
                        <line
                            x1={0}
                            y1={headerHeight + graphAreaHeight}
                            x2={graphWidth}
                            y2={headerHeight + graphAreaHeight}
                            stroke="black"
                            strokeWidth="1"
                        />

                        {/* Horizontal grid lines for each row */}
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

                        {/* Plot line connecting all points */}
                        {(() => {
                            const points = rows
                                .filter(idx => data[idx] !== undefined && data[idx] !== '')
                                .map(idx => {
                                    const x = getGraphX(data[idx]);
                                    // Row 0 at bottom (graphAreaHeight from header), each row goes up by rowHeight
                                    const y = headerHeight + graphAreaHeight - (idx * rowHeight);
                                    return { x, y, idx };
                                })
                                .sort((a, b) => a.idx - b.idx);

                            if (points.length < 2) return null;

                            const pathD = points.map((p, i) =>
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

                        {/* Plot points */}
                        {rows.map((rowIndex) => {
                            const value = data[rowIndex];
                            if (value === undefined || value === '') return null;

                            const x = getGraphX(value);
                            // Row 0 at bottom (graphAreaHeight from header), each row goes up by rowHeight
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

                        {/* X-axis labels at bottom (in footer area) */}
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
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default EDMTableStraightness;
