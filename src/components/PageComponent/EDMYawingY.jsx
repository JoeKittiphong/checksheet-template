import React, { useState, useEffect, useRef } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import Checknumber from "@/components/UIcomponent/Checknumber";

/**
 * Single Yawing Y Graph Component
 * กราฟ Yawing Y แบบ SVG - แนวนอน (Y-axis อยู่บน, X-axis อยู่ซ้าย)
 */
function SingleYawingYGraph({
    label,           // "Y+", "Yc", "Y-"
    value,           // calculated diff value
    onChange,
    points,
    onPointChange,
    zeroY,           // Y position of X-axis (where points start)
    polarity,        // 1 = go down, -1 = go up
    axisLayout       // "topStyle" (Y+, Yc) or "bottomStyle" (Y-)
}) {
    const [activePoint, setActivePoint] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 3;
    // X positions for points (left to right): left is reference (0), others have values
    // ปรับให้ความยาวเส้นกราฟเท่ากับแกน X (75 หน่วย)
    const xPositions = { left: 20, mid1: 45, mid2: 70, right: 95 };

    const getCoords = (key, val) => {
        const num = (val === '' || val === null || val === undefined) ? 0 : (parseFloat(val) || 0);
        const yOffset = num * scale * polarity;
        return {
            x: xPositions[key] || 25,
            y: zeroY + yOffset,
            isEmpty: val === '' || val === null || val === undefined
        };
    };

    // Auto-calc diff (left is 0, mid1/mid2/right have values)
    useEffect(() => {
        // Filter out empty values, always include 0 as reference
        const rawValues = [points.mid1, points.mid2, points.right];
        const numericValues = rawValues
            .filter(v => v !== '' && v !== null && v !== undefined)
            .map(v => parseFloat(v) || 0);
        numericValues.push(0); // Reference point

        const max = Math.max(...numericValues);
        const min = Math.min(...numericValues);
        const diff = Math.abs(max - min);
        const formattedDiff = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');

        if (formattedDiff !== value) {
            onChange(formattedDiff);
        }
    }, [points, value, onChange]);

    const handlePointClick = (key) => {
        setActivePoint(key);
        setInputValue(points[key].toString());
    };

    const handleInputChange = (e) => {
        setInputValue(cleanNumericInput(e.target.value));
    };

    const submitValue = () => {
        if (activePoint) {
            const num = parseFloat(inputValue);
            const finalVal = isNaN(num) ? 0 : num;
            onPointChange(activePoint, finalVal);
            setActivePoint(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') submitValue();
    };

    useEffect(() => {
        if (activePoint && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activePoint]);

    return (
        <div className="p-1 relative flex-1" style={{ minHeight: '130px' }}>
            <svg
                width="100%" height="80%" viewBox="0 0 180 100"
                onClick={() => setIsSelected(false)}
            >
                {/* Y+ Style: Y-axis at TOP, X-axis going DOWN */}
                {axisLayout === "topStyle" && (
                    <>
                        {/* Y-axis horizontal line on TOP - length 75 */}
                        <line x1="20" y1={zeroY} x2={20 + 75} y2={zeroY} stroke="black" strokeWidth="1.5" />
                        {/* X-axis vertical line on LEFT going DOWN - length 75 */}
                        <line x1="20" y1={zeroY} x2="20" y2={zeroY + 75} stroke="black" strokeWidth="1.5" />

                        {/* Y label at left */}
                        <text x="10" y={zeroY + 5} fontSize="10" textAnchor="middle">Y</text>
                        <text x="10" y={zeroY - 5} fontSize="8" textAnchor="middle">-</text>
                        <text x="30" y={zeroY - 5} fontSize="8" textAnchor="middle">+</text>

                        {/* Dash mark at right end of Y-axis */}
                        <line x1={20 + 75} y1={zeroY - 5} x2={20 + 75} y2={zeroY + 5} stroke="black" strokeWidth="1.5" />

                        {/* Dash mark at bottom of X-axis */}
                        <line x1="15" y1={zeroY + 75} x2="25" y2={zeroY + 75} stroke="black" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="20" y={zeroY + 12} fontSize="8" textAnchor="middle">0</text>
                        <text x="28" y={zeroY + 75} fontSize="7" textAnchor="start">+</text>
                        <text x={20 + 75} y={zeroY + 12} fontSize="7" textAnchor="middle">-</text>
                    </>
                )}

                {/* Yc Style: Y-axis at BOTTOM, X-axis going UP */}
                {axisLayout === "bottomAxisStyle" && (
                    <>
                        {/* Y-axis horizontal line at BOTTOM - length 75 */}
                        <line x1="20" y1={zeroY} x2={20 + 75} y2={zeroY} stroke="black" strokeWidth="1.5" />
                        {/* X-axis vertical line on LEFT going UP - length 75 */}
                        <line x1="20" y1={zeroY} x2="20" y2={zeroY - 75} stroke="black" strokeWidth="1.5" />

                        {/* Y label at left */}
                        <text x="10" y={zeroY + 5} fontSize="10" textAnchor="middle">Y</text>
                        <text x="10" y={zeroY + 12} fontSize="8" textAnchor="middle">-</text>
                        <text x="30" y={zeroY + 12} fontSize="8" textAnchor="middle">+</text>

                        {/* Dash mark at right end of Y-axis */}
                        <line x1={20 + 75} y1={zeroY - 5} x2={20 + 75} y2={zeroY + 5} stroke="black" strokeWidth="1.5" />

                        {/* Dash mark at top of X-axis */}
                        <line x1="15" y1={zeroY - 75} x2="25" y2={zeroY - 75} stroke="black" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="20" y={zeroY - 5} fontSize="8" textAnchor="middle">0</text>
                        <text x="28" y={zeroY - 75 + 10} fontSize="7" textAnchor="start">+</text>
                        <text x={20 + 75} y={zeroY - 5} fontSize="7" textAnchor="middle">-</text>
                    </>
                )}

                {/* Y- Style: Y-axis at BOTTOM, X-axis going UP, +/- swapped */}
                {axisLayout === "bottomStyle" && (
                    <>
                        {/* Y-axis horizontal line at BOTTOM - length 75 */}
                        <line x1="20" y1={zeroY} x2={20 + 75} y2={zeroY} stroke="black" strokeWidth="1.5" />
                        {/* X-axis vertical line on LEFT going UP - length 75 */}
                        <line x1="20" y1={zeroY} x2="20" y2={zeroY - 75} stroke="black" strokeWidth="1.5" />

                        {/* Y label at left - swapped +/- */}
                        <text x="10" y={zeroY + 5} fontSize="10" textAnchor="middle">Y</text>
                        <text x="10" y={zeroY + 12} fontSize="8" textAnchor="middle">+</text>
                        <text x="30" y={zeroY + 12} fontSize="8" textAnchor="middle">-</text>

                        {/* Dash mark at right end of Y-axis */}
                        <line x1={20 + 75} y1={zeroY - 5} x2={20 + 75} y2={zeroY + 5} stroke="black" strokeWidth="1.5" />

                        {/* Dash mark at top of X-axis */}
                        <line x1="15" y1={zeroY - 75} x2="25" y2={zeroY - 75} stroke="black" strokeWidth="1.5" />

                        {/* Labels - swapped */}
                        <text x="20" y={zeroY - 5} fontSize="8" textAnchor="middle">0</text>
                        <text x="28" y={zeroY - 75 + 10} fontSize="7" textAnchor="start">-</text>
                        <text x={20 + 75} y={zeroY - 5} fontSize="7" textAnchor="middle">+</text>
                    </>
                )}

                {/* Path (Brown line with points) */}
                {(() => {
                    const pLeft = getCoords('left', 0);
                    const pMid1 = getCoords('mid1', points.mid1);
                    const pMid2 = getCoords('mid2', points.mid2);
                    const pRight = getCoords('right', points.right);
                    const path = `M ${pLeft.x} ${pLeft.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pRight.x} ${pRight.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="brown" strokeWidth="1.5" fill="none" className="pointer-events-none" />

                            {['left', 'mid1', 'mid2', 'right'].map((key) => {
                                const isLeft = key === 'left';
                                const pointVal = isLeft ? 0 : points[key];
                                const coords = getCoords(key, pointVal);
                                const hasValue = pointVal !== '' && pointVal !== null && pointVal !== undefined;

                                // Skip rendering for left point (reference at 0)
                                if (isLeft) return null;

                                return isSelected ? (
                                    // Only show clickable circle if value exists
                                    hasValue ? (
                                        <circle
                                            key={'p' + key}
                                            cx={coords.x}
                                            cy={coords.y}
                                            r="5"
                                            fill="brown"
                                            stroke="white"
                                            className="cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); handlePointClick(key); }}
                                        />
                                    ) : (
                                        // Invisible clickable area for empty points
                                        <circle
                                            key={'p' + key}
                                            cx={coords.x}
                                            cy={coords.y}
                                            r="5"
                                            fill="transparent"
                                            stroke="gray"
                                            strokeDasharray="2,2"
                                            className="cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); handlePointClick(key); }}
                                        />
                                    )
                                ) : (
                                    <React.Fragment key={'t' + key}>
                                        {hasValue && (
                                            <text
                                                x={coords.x}
                                                y={coords.y + (polarity > 0 ? 15 : -8)}
                                                fontSize="9"
                                                fill="brown"
                                                textAnchor="middle"
                                                className="pointer-events-none"
                                            >
                                                {pointVal}
                                            </text>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </>
                    );
                })()}
            </svg>

            {/* Label below graph */}
            <div className="absolute bottom-0 left-2 flex items-end pointer-events-none">
                <span className="mr-1 text-sm">{label} =</span>
                <input
                    type="text"
                    className="w-12 border-b border-black text-center outline-none bg-transparent text-sm pointer-events-none"
                    value={value || ''}
                    readOnly
                />
                <span className="ml-1 text-sm">μm</span>
            </div>

            {/* Input Popover */}
            {activePoint && (
                <div
                    className="absolute bg-white border border-gray-400 p-1 flex items-center shadow-md rounded"
                    style={{
                        left: `${(getCoords(activePoint, points[activePoint]).x / 180) * 100}%`,
                        top: `${(getCoords(activePoint, points[activePoint]).y / 100) * 100}%`,
                        transform: 'translate(-50%, 10px)',
                        zIndex: 10
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-12 text-center outline-none border-b border-gray-300 text-sm"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={submitValue}
                    />
                    <span className="text-xs ml-1">μm</span>
                </div>
            )}
        </div>
    );
}

/**
 * EDMYawingY Component
 * ตารางกราฟ Yawing Y แบบ 3 กราฟ (Y+, Yc, Y-)
 */
function EDMYawingY({
    data = { yPlus: '', yC: '', yMinus: '' },
    onChange = () => { },
    stdPlus = 3,       // Standard for Y+ graph diff
    stdC = 3,          // Standard for Yc graph diff
    stdMinus = 3,      // Standard for Y- graph diff
    stdYawing = 2,     // Standard for overall Yawing Y
    stdSquare = 10     // Standard for Square X value
}) {
    const [allPoints, setAllPoints] = useState({
        yPlus: { mid1: '', mid2: '', right: '' },
        yC: { mid1: '', mid2: '', right: '' },
        yMinus: { mid1: '', mid2: '', right: '' }
    });

    const [yawingDiff, setYawingDiff] = useState('0');
    const [isYawingValid, setIsYawingValid] = useState(true);

    // Validation states for each graph
    const [validPlus, setValidPlus] = useState(true);
    const [validC, setValidC] = useState(true);
    const [validMinus, setValidMinus] = useState(true);
    const [validSquare, setValidSquare] = useState(true);

    const handlePointUpdate = (graphKey, pointKey, val) => {
        setAllPoints(prev => ({
            ...prev,
            [graphKey]: {
                ...prev[graphKey],
                [pointKey]: val
            }
        }));
    };

    // Calculate overall Yawing Y
    // Y+ และ Yc ใช้ค่าตรง, Y- สลับเครื่องหมาย
    useEffect(() => {
        // filter out empty values
        const parseVal = (v) => (v === '' || v === null || v === undefined) ? null : (parseFloat(v) || 0);

        const rawValues = [
            // Y+ values (direct)
            parseVal(allPoints.yPlus.mid1), parseVal(allPoints.yPlus.mid2), parseVal(allPoints.yPlus.right),
            // Yc values (inverted)
            parseVal(allPoints.yC.mid1) !== null ? -parseVal(allPoints.yC.mid1) : null,
            parseVal(allPoints.yC.mid2) !== null ? -parseVal(allPoints.yC.mid2) : null,
            parseVal(allPoints.yC.right) !== null ? -parseVal(allPoints.yC.right) : null,
            // Y- values (inverted)
            parseVal(allPoints.yMinus.mid1) !== null ? -parseVal(allPoints.yMinus.mid1) : null,
            parseVal(allPoints.yMinus.mid2) !== null ? -parseVal(allPoints.yMinus.mid2) : null,
            parseVal(allPoints.yMinus.right) !== null ? -parseVal(allPoints.yMinus.right) : null
        ];

        const allValues = rawValues.filter(v => v !== null);
        allValues.push(0); // Always include 0 as reference

        const max = Math.max(...allValues);
        const min = Math.min(...allValues);
        const diff = Math.abs(max - min);

        const formatted = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');
        setYawingDiff(formatted);
        setIsYawingValid(validateValue(diff, { maxValue: stdYawing, validateStd: true }));

        // Validate Square X (yC value)
        const yCVal = parseFloat(data.yC) || 0;
        setValidSquare(validateValue(yCVal, { maxValue: stdSquare, useAbs: true, validateStd: true }));

    }, [allPoints, stdYawing, data.yC, stdSquare]);

    // Validate individual graph diffs
    useEffect(() => {
        const parseVal = (v) => (v === '' || v === null || v === undefined) ? null : (parseFloat(v) || 0);

        const calcDiff = (points) => {
            const vals = [parseVal(points.mid1), parseVal(points.mid2), parseVal(points.right)].filter(v => v !== null);
            vals.push(0);
            return Math.abs(Math.max(...vals) - Math.min(...vals));
        };

        setValidPlus(validateValue(calcDiff(allPoints.yPlus), { maxValue: stdPlus, validateStd: true }));
        setValidC(validateValue(calcDiff(allPoints.yC), { maxValue: stdC, validateStd: true }));
        setValidMinus(validateValue(calcDiff(allPoints.yMinus), { maxValue: stdMinus, validateStd: true }));
    }, [allPoints, stdPlus, stdC, stdMinus]);

    return (
        <div className="flex border border-black w-[100mm] h-[110mm] bg-white">
            {/* Graphs Column */}
            <div className="flex flex-col" style={{ width: '200px' }}>
                {/* Y+ Graph */}
                <div className={`${!validPlus ? 'bg-red-100' : ''}`}>
                    <SingleYawingYGraph
                        label="Y +"
                        value={data.yPlus}
                        onChange={(val) => onChange('yPlus', val)}
                        points={allPoints.yPlus}
                        onPointChange={(pk, val) => handlePointUpdate('yPlus', pk, val)}
                        zeroY={20}
                        polarity={1}
                        axisLayout="topStyle"
                    />
                </div>

                {/* Yc Graph: Y-axis at bottom, X going up */}
                <div className={`${!validC ? 'bg-red-100' : ''}`}>
                    <SingleYawingYGraph
                        label="Yc"
                        value={data.yC}
                        onChange={(val) => onChange('yC', val)}
                        points={allPoints.yC}
                        onPointChange={(pk, val) => handlePointUpdate('yC', pk, val)}
                        zeroY={85}
                        polarity={-1}
                        axisLayout="bottomAxisStyle"
                    />
                </div>

                {/* Y- Graph: Y-axis at bottom, X going up, swapped +/- */}
                <div className={`${!validMinus ? 'bg-red-100' : ''}`}>
                    <SingleYawingYGraph
                        label="Y -"
                        value={data.yMinus}
                        onChange={(val) => onChange('yMinus', val)}
                        points={allPoints.yMinus}
                        onPointChange={(pk, val) => handlePointUpdate('yMinus', pk, val)}
                        zeroY={85}
                        polarity={-1}
                        axisLayout="bottomStyle"
                    />
                </div>
            </div>

            {/* Right Section: Square Y, Yawing Y, and SQUARE SIDE */}
            <div className="flex flex-col flex-1">
                {/* Top: Square X and Yawing Y */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                    {/* Square X = value from Yc */}
                    <div className="flex items-center mb-2">
                        <span className="mr-2 text-sm">Square X =</span>
                        <span className={`border-b border-black px-3 min-w-[50px] text-center ${!validSquare ? 'bg-red-200 text-red-600' : ''}`}>
                            {data.yC || '0'}
                        </span>
                        <span className="ml-1 text-sm">μm</span>
                    </div>

                    {/* Yawing Y */}
                    <div className="flex items-center">
                        <span className="mr-2 text-sm">Yawing Y =</span>
                        <span className={`border-b border-black px-3 min-w-[50px] text-center ${!isYawingValid ? 'bg-red-200 text-red-600' : ''}`}>
                            {yawingDiff || '0'}
                        </span>
                        <span className="ml-1 text-sm">μm</span>
                    </div>
                </div>

                {/* Bottom: SQUARE SIDE options */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                    <div className="text-sm font-bold mb-2">SQUARE SIDE</div>

                    {/* X Selection */}
                    <div className="flex items-center mb-1">
                        <span className="text-sm mr-2">X =</span>
                        <div className="flex space-x-2 text-sm">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'x' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="edmYawingY_squareSideX"
                                        value={opt}
                                        checked={data.squareSideX === opt}
                                        onChange={() => onChange('squareSideX', opt)}
                                        className="mr-0.5"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Y Selection */}
                    <div className="flex items-center mb-2">
                        <span className="text-sm mr-2">Y =</span>
                        <div className="flex space-x-2 text-sm">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'y' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="edmYawingY_squareSideY"
                                        value={opt}
                                        checked={data.squareSideY === opt}
                                        onChange={() => onChange('squareSideY', opt)}
                                        className="mr-0.5"
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* SQUARE NO. */}
                    <Checknumber
                        label="SQUARE NO."
                        value={data.squareNo || ''}
                        onChange={(val) => onChange('squareNo', val)}
                        labelClass="text-xs"
                        inputClass="w-16 text-xs"
                    />

                    {/* DIAL GAUGE NO. */}
                    <Checknumber
                        label="DIAL GAUGE NO."
                        value={data.dialGaugeNo || ''}
                        onChange={(val) => onChange('dialGaugeNo', val)}
                        labelClass="text-xs"
                        inputClass="w-16 text-xs"
                    />
                </div>
            </div>
        </div>
    );
}

export default EDMYawingY;
