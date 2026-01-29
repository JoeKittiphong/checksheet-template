import React, { useState, useEffect, useRef } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import Checknumber from "@/components/UIcomponent/Checknumber";
import { useFormContext } from 'react-hook-form';

/**
 * Single Yawing Graph Component
 * กราฟ Yawing แบบ SVG พร้อม label และ value field
 */
function SingleYawingGraph({
    label,           // "X-", "Xc", "X+"
    value,           // calculated diff value
    onChange,
    points,
    onPointChange,
    zeroX,           // X position of Y-axis
    polarity,        // 1 = go right, -1 = go left
    axisLayout       // "leftStyle" (X-, Xc) or "rightStyle" (X+)
}) {
    const [activePoint, setActivePoint] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 3;
    const yPositions = { top: 15, mid1: 40, mid2: 65, bot: 90 };

    const getCoords = (key, val) => {
        const num = (val === '' || val === null || val === undefined) ? 0 : (parseFloat(val) || 0);
        const xOffset = num * scale * polarity;
        return {
            x: zeroX + xOffset,
            y: yPositions[key] || 25,
            isEmpty: val === '' || val === null || val === undefined
        };
    };

    // Auto-calc diff (bot is 0, top/mid1/mid2 have values)
    useEffect(() => {
        // Filter out empty values, always include 0 as reference
        const rawValues = [points.top, points.mid1, points.mid2];
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
        <div className="flex-1 p-1 relative" style={{ minHeight: '140px' }}>
            <svg
                width="100%" height="100%" viewBox="0 0 200 130"
                onClick={() => setIsSelected(false)}
            >
                {/* X- / Xc Style: Y-axis on LEFT, X goes RIGHT */}
                {axisLayout === "leftStyle" && (
                    <>
                        {/* Y-axis vertical line on LEFT */}
                        <line x1={zeroX} y1="15" x2={zeroX} y2="90" stroke="black" strokeWidth="1.5" />
                        {/* X-axis horizontal line at bottom going RIGHT - same length as Y */}
                        <line x1={zeroX} y1="90" x2={zeroX + 75} y2="90" stroke="black" strokeWidth="1.5" />

                        {/* Y label at top */}
                        <text x={zeroX} y="12" fontSize="10" textAnchor="middle">Y</text>
                        <text x={zeroX - 8} y="22" fontSize="8" textAnchor="end">-</text>
                        <text x={zeroX + 8} y="22" fontSize="8" textAnchor="start">+</text>

                        {/* Dash mark at bottom right end */}
                        <line x1={zeroX + 75} y1="85" x2={zeroX + 75} y2="95" stroke="black" strokeWidth="1.5" />

                        {/* Labels: 0 at bottom left corner */}
                        <text x={zeroX} y="103" fontSize="8" textAnchor="middle">0</text>
                        <text x={zeroX + 5} y="98" fontSize="7" textAnchor="start">+</text>
                        <text x={zeroX + 75} y="98" fontSize="7" textAnchor="middle">-</text>
                    </>
                )}

                {/* X+ Style: Y-axis on RIGHT, X goes LEFT */}
                {axisLayout === "rightStyle" && (
                    <>
                        {/* Y-axis vertical line on RIGHT */}
                        <line x1={zeroX} y1="15" x2={zeroX} y2="90" stroke="black" strokeWidth="1.5" />
                        {/* X-axis horizontal line at bottom going LEFT - same length as Y */}
                        <line x1={zeroX - 75} y1="90" x2={zeroX} y2="90" stroke="black" strokeWidth="1.5" />

                        {/* Y label at top - swapped +/- */}
                        <text x={zeroX} y="12" fontSize="10" textAnchor="middle">Y</text>
                        <text x={zeroX + 8} y="22" fontSize="8" textAnchor="start">-</text>
                        <text x={zeroX - 8} y="22" fontSize="8" textAnchor="end">+</text>

                        {/* Dash mark at bottom left end */}
                        <line x1={zeroX - 75} y1="85" x2={zeroX - 75} y2="95" stroke="black" strokeWidth="1.5" />

                        {/* Labels: - at left end (swapped), 0 at Y-axis */}
                        <text x={zeroX - 75} y="98" fontSize="7" textAnchor="middle">-</text>
                        <text x={zeroX} y="103" fontSize="8" textAnchor="middle">0</text>
                    </>
                )}

                {/* Path (Brown line with points) */}
                {(() => {
                    const pTop = getCoords('top', points.top);
                    const pMid1 = getCoords('mid1', points.mid1);
                    const pMid2 = getCoords('mid2', points.mid2);
                    const pBot = getCoords('bot', 0);
                    const path = `M ${pTop.x} ${pTop.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pBot.x} ${pBot.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="brown" strokeWidth="1.5" fill="none" className="pointer-events-none" />

                            {['top', 'mid1', 'mid2', 'bot'].map((key) => {
                                const isBot = key === 'bot';
                                const pointVal = isBot ? 0 : points[key];
                                const coords = getCoords(key, pointVal);
                                const hasValue = pointVal !== '' && pointVal !== null && pointVal !== undefined;

                                // Skip rendering for bot point (reference at 0)
                                if (isBot) return null;

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
                                                x={coords.x + (polarity > 0 ? 10 : -10)}
                                                y={coords.y + 4}
                                                fontSize="9"
                                                fill="brown"
                                                textAnchor={polarity > 0 ? "start" : "end"}
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

            {/* Label below graph: X- = ___ μm */}
            <div className="absolute bottom-2 left-2 flex items-end pointer-events-none">
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
                        left: `${(getCoords(activePoint, points[activePoint]).x / 200) * 100}%`,
                        top: `${(getCoords(activePoint, points[activePoint]).y / 130) * 100}%`,
                        transform: 'translate(10px, -50%)',
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
 * EDMYawingX Component
 * ตารางกราฟ Yawing X แบบ 3 กราฟ (X-, Xc, X+)
 */
function EDMYawingX({
    data = { xMinus: '', xC: '', xPlus: '' },
    onChange = () => { },
    stdMinus = 3,      // Standard for X- graph diff
    stdC = 3,          // Standard for Xc graph diff
    stdPlus = 3,       // Standard for X+ graph diff
    stdYawing = 2,     // Standard for overall Yawing X
    stdSquare = 10     // Standard for Square Y value
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const [allPoints, setAllPoints] = useState(data.points || {
        xMinus: { top: '', mid1: '', mid2: '' },
        xC: { top: '', mid1: '', mid2: '' },
        xPlus: { top: '', mid1: '', mid2: '' }
    });

    const [yawingDiff, setYawingDiff] = useState('0');
    const [isYawingValid, setIsYawingValid] = useState(true);

    // Validation states for each graph
    const [validMinus, setValidMinus] = useState(true);
    const [validC, setValidC] = useState(true);
    const [validPlus, setValidPlus] = useState(true);
    const [validSquare, setValidSquare] = useState(true);

    const handlePointUpdate = (graphKey, pointKey, val) => {
        const newPoints = {
            ...allPoints,
            [graphKey]: {
                ...allPoints[graphKey],
                [pointKey]: val
            }
        };
        setAllPoints(newPoints);
        onChange('points', newPoints);
    };

    // Calculate overall Yawing X
    // คำนวณจากค่าจุดแต่ละจุดในกราฟ (ไม่ใช่ค่า diff)
    // X- และ Xc ใช้ค่าตรง, X+ สลับเครื่องหมาย
    useEffect(() => {
        // รวมทุกค่าจุดจากทุกกราฟ - filter out empty values
        const parseVal = (v) => (v === '' || v === null || v === undefined) ? null : (parseFloat(v) || 0);

        const rawValues = [
            // X- values (direct)
            parseVal(allPoints.xMinus.top), parseVal(allPoints.xMinus.mid1), parseVal(allPoints.xMinus.mid2),
            // Xc values (direct)
            parseVal(allPoints.xC.top), parseVal(allPoints.xC.mid1), parseVal(allPoints.xC.mid2),
            // X+ values (inverted: สลับ +/-)
            parseVal(allPoints.xPlus.top) !== null ? -parseVal(allPoints.xPlus.top) : null,
            parseVal(allPoints.xPlus.mid1) !== null ? -parseVal(allPoints.xPlus.mid1) : null,
            parseVal(allPoints.xPlus.mid2) !== null ? -parseVal(allPoints.xPlus.mid2) : null
        ];

        const allValues = rawValues.filter(v => v !== null);
        allValues.push(0); // Always include 0 as reference

        const max = Math.max(...allValues);
        const min = Math.min(...allValues);
        const diff = Math.abs(max - min);

        const formatted = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');
        setYawingDiff(formatted);
        setIsYawingValid(validateValue(diff, { maxValue: stdYawing, validateStd: true }));

        // Validate Square Y (xC value)
        const xCVal = parseFloat(data.xC) || 0;
        setValidSquare(validateValue(xCVal, { maxValue: stdSquare, useAbs: true, validateStd: true }));

    }, [allPoints, stdYawing, data.xC, stdSquare]);

    // Validate individual graph diffs
    useEffect(() => {
        const parseVal = (v) => (v === '' || v === null || v === undefined) ? null : (parseFloat(v) || 0);

        const calcDiff = (points) => {
            const vals = [parseVal(points.top), parseVal(points.mid1), parseVal(points.mid2)].filter(v => v !== null);
            vals.push(0);
            return Math.abs(Math.max(...vals) - Math.min(...vals));
        };

        setValidMinus(validateValue(calcDiff(allPoints.xMinus), { maxValue: stdMinus, validateStd: true }));
        setValidC(validateValue(calcDiff(allPoints.xC), { maxValue: stdC, validateStd: true }));
        setValidPlus(validateValue(calcDiff(allPoints.xPlus), { maxValue: stdPlus, validateStd: true }));
    }, [allPoints, stdMinus, stdC, stdPlus]);

    return (
        <div className="flex flex-col border border-black w-[160mm] bg-white">
            {/* Graphs Row */}
            <div className="flex w-full">
                {/* X- Graph: Y-axis LEFT, X goes RIGHT */}
                <div className={`flex-1 ${!validMinus ? 'bg-red-100' : ''} mb-5`}>
                    <SingleYawingGraph
                        label="X -"
                        value={data.xMinus}
                        onChange={(val) => onChange('xMinus', val)}
                        points={allPoints.xMinus}
                        onPointChange={(pk, val) => handlePointUpdate('xMinus', pk, val)}
                        zeroX={40}
                        polarity={1}
                        axisLayout="leftStyle"
                    />
                </div>

                {/* Xc Graph: Same layout as X- */}
                <div className={`flex-1 ${!validC ? 'bg-red-100' : ''}`}>
                    <SingleYawingGraph
                        label="Xc"
                        value={data.xC}
                        onChange={(val) => onChange('xC', val)}
                        points={allPoints.xC}
                        onPointChange={(pk, val) => handlePointUpdate('xC', pk, val)}
                        zeroX={40}
                        polarity={1}
                        axisLayout="leftStyle"
                    />
                </div>

                {/* X+ Graph: Y-axis RIGHT, X goes LEFT */}
                <div className={`flex-1 ${!validPlus ? 'bg-red-100' : ''}`}>
                    <SingleYawingGraph
                        label="X+"
                        value={data.xPlus}
                        onChange={(val) => onChange('xPlus', val)}
                        points={allPoints.xPlus}
                        onPointChange={(pk, val) => handlePointUpdate('xPlus', pk, val)}
                        zeroX={160}
                        polarity={-1}
                        axisLayout="rightStyle"
                    />
                </div>
            </div>

            {/* Bottom Section: Square Y, Yawing X, and SQUARE SIDE */}
            <div className="flex w-full">
                {/* Left side: Square Y and Yawing X */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                    {/* Square Y = value from Xc */}
                    <div className="flex items-center mb-2">
                        <span className="mr-2 text-sm">Square Y =</span>
                        <span className={`border-b border-black px-3 min-w-[50px] text-center ${!validSquare ? 'bg-red-200 text-red-600' : ''}`}>
                            {data.xC || '0'}
                        </span>
                        <span className="ml-1 text-sm">μm</span>
                    </div>

                    {/* Yawing X */}
                    <div className="flex items-center">
                        <span className="mr-2 text-sm">Yawing X =</span>
                        <span className={`border-b border-black px-3 min-w-[50px] text-center ${(!isYawingValid || (isSubmitted && (!data.xMinus || !data.xC || !data.xPlus))) ? 'bg-red-200 text-red-600' : ''}`}>
                            {yawingDiff || '0'}
                        </span>
                        <span className="ml-1 text-sm">μm</span>
                    </div>
                </div>

                {/* Right side: SQUARE SIDE options */}
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
                                        name="edmYawingX_squareSideX"
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
                                        name="edmYawingX_squareSideY"
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

export default EDMYawingX;
