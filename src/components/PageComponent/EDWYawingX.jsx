import React, { useState, useEffect, useRef } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import Checknumber from "@/components/UIcomponent/Checknumber";

function SingleYawingGraph({
    label,
    value,
    onChange,
    points,               // Primary Points (Red/Brown) - Calculated
    onPointChange,
    secondaryPoints,      // Secondary Points (Blue) - Visual Only (for Corner)
    onSecondaryPointChange,
    zeroLine,
    polarity,
    graphType = "vertical", // "vertical" | "horizontal" | "corner"
    axisLayout = "standard",
    showZeroLabel = false
}) {
    const [activePoint, setActivePoint] = useState(null); // { set: 'primary'|'secondary', key: 'mid1'|'mid2'|'bot' }
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 5;

    // Helper to get coordinates
    // setType: 'primary' (Red) or 'secondary' (Blue)
    const getCoords = (key, val, setType = 'primary') => {
        const num = parseFloat(val) || 0;

        if (graphType === "corner") {
            // Corner Logic
            // Origin is (160, 40)

            if (setType === 'secondary') {
                // Blue Path (Top Axis -> Horizontal)
                // Spans Leftward from Origin? Or Rightward? 
                // "L shape" -> Top arm is usually to the Left of corner.
                // Origin (160,40) -> End (60,40).
                // Points distributed along X axis (160 -> 60).
                // Key positions (X): 160(Top), 126(Mid1), 93(Mid2), 60(Bot). 
                // Wait, standard is Top->Bot. Here it's Right->Left?
                // Let's us map: Top(0)@160 -> Mid1@126 -> Mid2@93 -> Bot@60.

                const xMap = { top: 160, mid1: 126, mid2: 93, bot: 60 };
                // Value affects Y (Vertical deviation).
                // Polarity: +ve is Down (Inside).
                return { x: xMap[key] || 160, y: 40 + (num * scale * 1) };
            }
            else {
                // Primary/Red Path (Side Axis -> Vertical)
                // Spans Downward from Origin.
                // Origin (160,40) -> End (160,120).
                const yMap = { top: 40, mid1: 66, mid2: 93, bot: 120 };
                // Value affects X (Horizontal deviation).
                // Polarity: +ve is Left (Inside).
                return { x: 160 + (num * scale * -1), y: yMap[key] || 40 };
            }
        }
        else {
            // Standard Vertical (X+, X-)
            const offset = num * scale * polarity;
            const yMap = { top: 40, mid1: 66, mid2: 93, bot: 120 };
            return { x: zeroLine + offset, y: yMap[key] || 40 };
        }
    };

    // Auto-calc logic (Primary Points Only)
    useEffect(() => {
        const values = [0, points.mid1, points.mid2, points.bot];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const diff = Math.abs(max - min);
        const formattedDiff = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');

        if (formattedDiff !== value) {
            onChange(formattedDiff);
        }
    }, [points, value, onChange]);

    // Input Handlers
    const handlePointClick = (key, setType = 'primary') => {
        setActivePoint({ key, setType });
        const val = setType === 'secondary' ? secondaryPoints[key] : points[key];
        setInputValue(val.toString());
    };

    const handleInputChange = (e) => {
        setInputValue(cleanNumericInput(e.target.value));
    };

    const submitValue = () => {
        if (activePoint) {
            const num = parseFloat(inputValue);
            const finalVal = isNaN(num) ? 0 : num;

            if (activePoint.setType === 'secondary') {
                onSecondaryPointChange(activePoint.key, finalVal);
            } else {
                onPointChange(activePoint.key, finalVal);
            }
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
        <div className="flex-1 border-r border-black p-2 relative h-40 last:border-r-0">
            <svg
                width="100%" height="100%" viewBox="0 0 200 150"
                onClick={() => setIsSelected(false)}
            >
                <defs>
                    <marker
                        id="arrowhead-red"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="brown" />
                    </marker>
                </defs>

                {/* Axes */}
                {axisLayout === "standard" && (
                    <>
                        <line x1="60" y1="40" x2="160" y2="40" stroke="black" strokeWidth="1.5" />
                        <line x1="160" y1="40" x2="160" y2="120" stroke="black" strokeWidth="1.5" />

                        {graphType === "corner" ? (
                            <>
                                <line x1="60" y1="35" x2="60" y2="45" stroke="black" strokeWidth="1.5" />
                                <text x="50" y="45" fontSize="14" textAnchor="end">X</text>
                                <text x="60" y="65" fontSize="12" textAnchor="middle">+</text>

                                <text x="160" y="30" fontSize="12" textAnchor="middle">0</text>

                                <line x1="155" y1="120" x2="165" y2="120" stroke="black" strokeWidth="1.5" />
                                <text x="160" y="140" fontSize="14" textAnchor="middle">Y</text>
                                <text x="145" y="120" fontSize="12" textAnchor="end">+</text>
                                <text x="175" y="120" fontSize="12" textAnchor="start">-</text>
                            </>
                        ) : (
                            <>
                                <line x1="60" y1="35" x2="60" y2="45" stroke="black" strokeWidth="1.5" />
                                <text x="50" y="45" fontSize="14" textAnchor="end">X</text>

                                <line x1="155" y1="120" x2="165" y2="120" stroke="black" strokeWidth="1.5" />
                                <text x="160" y="140" fontSize="14" textAnchor="middle">Y</text>
                                <text x="145" y="120" fontSize="12" textAnchor="end">+</text>
                                <text x="175" y="120" fontSize="12" textAnchor="start">-</text>
                            </>
                        )}
                    </>
                )}

                {axisLayout === "inverted" && (
                    <>
                        <line x1="40" y1="120" x2="40" y2="40" stroke="black" strokeWidth="1.5" />
                        <line x1="40" y1="40" x2="140" y2="40" stroke="black" strokeWidth="1.5" />

                        <line x1="140" y1="35" x2="140" y2="45" stroke="black" strokeWidth="1.5" />
                        <text x="150" y="45" fontSize="14" textAnchor="start">X</text>

                        <line x1="35" y1="120" x2="45" y2="120" stroke="black" strokeWidth="1.5" />
                        <text x="40" y="140" fontSize="14" textAnchor="middle">Y</text>
                        <text x="25" y="120" fontSize="12" textAnchor="end">-</text>
                        <text x="55" y="120" fontSize="12" textAnchor="start">+</text>
                    </>
                )}

                {/* Primary Path (Red) */}
                {(() => {
                    const pTop = getCoords('top', 0, 'primary');
                    const pMid1 = getCoords('mid1', points.mid1, 'primary');
                    const pMid2 = getCoords('mid2', points.mid2, 'primary');
                    const pBot = getCoords('bot', points.bot, 'primary');
                    const path = `M ${pTop.x} ${pTop.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pBot.x} ${pBot.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="brown" strokeWidth="1.5" fill="none" className="pointer-events-none" />
                            {['mid1', 'mid2', 'bot'].map((key) => {
                                const coords = getCoords(key, points[key], 'primary');
                                return isSelected ? (
                                    <circle key={'p' + key} cx={coords.x} cy={coords.y} r="5" fill="brown" stroke="white" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePointClick(key, 'primary'); }} />
                                ) : (
                                    <text key={'t' + key} x={coords.x + 8} y={coords.y + 4} fontSize="10" fill="brown" className="pointer-events-none">{points[key] !== 0 ? points[key] : ''}</text>
                                );
                            })}
                        </>
                    );
                })()}

                {/* Secondary Path (Blue) - Corner Only */}
                {graphType === 'corner' && secondaryPoints && (() => {
                    const pTop = getCoords('top', 0, 'secondary');
                    const pMid1 = getCoords('mid1', secondaryPoints.mid1, 'secondary');
                    const pMid2 = getCoords('mid2', secondaryPoints.mid2, 'secondary');
                    const pBot = getCoords('bot', secondaryPoints.bot, 'secondary');
                    const path = `M ${pTop.x} ${pTop.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pBot.x} ${pBot.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="steelblue" strokeWidth="1.5" fill="none" className="pointer-events-none" />
                            {['mid1', 'mid2', 'bot'].map((key) => {
                                const coords = getCoords(key, secondaryPoints[key], 'secondary');
                                return isSelected ? (
                                    <circle key={'s' + key} cx={coords.x} cy={coords.y} r="5" fill="steelblue" stroke="white" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePointClick(key, 'secondary'); }} />
                                ) : (
                                    <text key={'st' + key} x={coords.x + 8} y={coords.y + 4} fontSize="10" fill="steelblue" className="pointer-events-none">{secondaryPoints[key] !== 0 ? secondaryPoints[key] : ''}</text>
                                );
                            })}
                        </>
                    );
                })()}

            </svg>

            {/* Input Popover */}
            {activePoint && (
                <div
                    className="absolute bg-white border border-gray-400 p-1 flex items-center shadow-md rounded"
                    style={{
                        left: `${(getCoords(activePoint.key,
                            activePoint.setType === 'secondary' ? secondaryPoints[activePoint.key] : points[activePoint.key],
                            activePoint.setType
                        ).x / 200) * 100}%`,
                        top: `${(getCoords(activePoint.key,
                            activePoint.setType === 'secondary' ? secondaryPoints[activePoint.key] : points[activePoint.key],
                            activePoint.setType
                        ).y / 150) * 100}%`,
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

            <div className={`absolute bottom-4 ${axisLayout === 'standard' ? 'left-4' : 'right-4'} flex items-end`}>
                <span className="mr-2 text-sm">{label}</span>
                <input
                    type="text"
                    className="w-16 border-b border-black text-center outline-none bg-transparent"
                    value={value || ''}
                    readOnly
                />
                <span className="ml-1 text-sm">μm</span>
            </div>
        </div>
    );
}

function EDWYawingX({
    data = { xPlus: '', xC: '', xMinus: '' },
    onChange = () => { }
}) {
    const [allPoints, setAllPoints] = useState({
        xPlus: { mid1: 0, mid2: 0, bot: 0 },
        xC: { mid1: 0, mid2: 0, bot: 0 },
        xC_Blue: { mid1: 0, mid2: 0, bot: 0 }, // Visual only for Xc
        xMinus: { mid1: 0, mid2: 0, bot: 0 }
    });

    const [yawingDiff, setYawingDiff] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handlePointUpdate = (graphKey, pointKey, val) => {
        setAllPoints(prev => ({
            ...prev,
            [graphKey]: {
                ...prev[graphKey],
                [pointKey]: val
            }
        }));
    };

    useEffect(() => {
        // Only use Primary Points (Red/Calculated)
        const pointsList = [
            0, allPoints.xPlus.mid1, allPoints.xPlus.mid2, allPoints.xPlus.bot,
            0, allPoints.xC.mid1, allPoints.xC.mid2, allPoints.xC.bot,
            0, -allPoints.xMinus.mid1, -allPoints.xMinus.mid2, -allPoints.xMinus.bot
        ];

        const max = Math.max(...pointsList);
        const min = Math.min(...pointsList);
        const diff = Math.abs(max - min);

        const formatted = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');
        setYawingDiff(formatted);
        setIsValid(validateValue(diff, { maxValue: 2, validateStd: true }));

    }, [allPoints.xPlus, allPoints.xC, allPoints.xMinus]); // Ignore xC_Blue

    return (
        <div className="flex flex-col border border-black w-150 max-w-4xl bg-white">
            <div className="flex w-full border-b border-black">
                {/* X+ Graph */}
                <SingleYawingGraph
                    label="X+ ="
                    value={data.xPlus}
                    onChange={(val) => onChange('xPlus', val)}
                    points={allPoints.xPlus}
                    onPointChange={(pk, val) => handlePointUpdate('xPlus', pk, val)}
                    zeroLine={160}
                    polarity={-1}
                    graphType="vertical"
                    axisLayout="standard"
                />

                {/* Xc Graph: Corner Type (Split Paths) */}
                <SingleYawingGraph
                    label="Xc ="
                    value={data.xC}
                    onChange={(val) => onChange('xC', val)}
                    points={allPoints.xC} // Primary Red
                    onPointChange={(pk, val) => handlePointUpdate('xC', pk, val)}
                    secondaryPoints={allPoints.xC_Blue} // Secondary Blue
                    onSecondaryPointChange={(pk, val) => handlePointUpdate('xC_Blue', pk, val)}
                    zeroLine={160} // Not used in corner
                    polarity={-1}
                    graphType="corner"
                    axisLayout="standard"
                    showZeroLabel={true}
                />

                {/* X- Graph */}
                <SingleYawingGraph
                    label="X- ="
                    value={data.xMinus}
                    onChange={(val) => onChange('xMinus', val)}
                    points={allPoints.xMinus}
                    onPointChange={(pk, val) => handlePointUpdate('xMinus', pk, val)}
                    zeroLine={40}
                    polarity={1}
                    graphType="vertical"
                    axisLayout="inverted"
                />
            </div>

            <div className="flex w-full">
                <div className="flex-1 p-4"></div>
                <div className="flex-1 p-4 flex flex-col items-center justify-center">
                    <div className="flex items-end mb-2">
                        <span className="mr-2 font-bold">Yawing X =</span>
                        <div className={`px-2 border-b border-black min-w-[60px] text-center ${!isValid ? 'bg-red-200 text-red-600' : ''}`}>
                            {yawingDiff}
                        </div>
                        <span className="ml-1">μm</span>
                    </div>
                    <div className="text-sm">
                        <div>STD ≤ 2  μm</div>
                        <div>P type ≤ 1  μm</div>
                    </div>
                </div>
                <div className="flex-1 p-2 flex flex-col justify-center space-y-1 border-r-0 border-black">
                    <div className="text-sm mb-1">SQUARE SIDE</div>

                    {/* X Selection */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm whitespace-nowrap">X=</span>
                        <div className="flex space-x-1 text-xs">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'x' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="yawingX_squareSideX"
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
                    <div className="flex items-center space-x-2">
                        <span className="text-sm whitespace-nowrap">Y=</span>
                        <div className="flex space-x-1 text-xs">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'y' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="yawingX_squareSideY"
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

                    <div className="mt-2 text-sm">
                        <Checknumber
                            label="SQUARE NO."
                            value={data.squareNo || ''}
                            onChange={(val) => onChange('squareNo', val)}
                            labelClass="text-[10px]"
                            inputClass="w-12 text-[10px]"
                        />
                    </div>
                    <div className="text-sm">
                        <Checknumber
                            label="DIAL GAUGE NO."
                            value={data.dialGaugeNo || ''}
                            onChange={(val) => onChange('dialGaugeNo', val)}
                            labelClass="text-[10px]"
                            inputClass="w-12 text-[10px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EDWYawingX;
