import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import Checknumber from "@/components/UIcomponent/Checknumber";

// Single Graph Component for Yawing Y
function SingleYawingGraphY({
    label,
    value,
    onChange,
    points,
    onPointChange,
    secondaryPoints,
    onSecondaryPointChange,
    zeroLineY = 40,
    polarity = -1, // Default -1 (Up is +) based on Y+ image logic
    graphType = "horizontal",
    axisLayout = "topRight", // "topRight", "bottomRight", "cornerGamma"
    error = false
}) {
    const [activePoint, setActivePoint] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 5;

    // Horizontal Span: 60 -> 160 (Length 100)
    // Matches Visual Ratio better and "goes all the way" to the vertical axis at 160
    const xPositions = {
        start: 160,
        mid1: 126,
        mid2: 93,
        end: 60
    };

    const getCoords = (key, val, setType = 'primary') => {
        const num = parseFloat(val) || 0;

        // Primary (Red) is always Horizontal Scan (moving X, dev Y)
        if (setType === 'primary') {
            // Map 'bot' to 'end' for horizontal graph logic consistency
            const xKey = key === 'bot' ? 'end' : key;
            const x = xPositions[xKey] || xPositions.start;

            // Y Deviation
            const y = zeroLineY + (num * scale * polarity);
            return { x, y };
        }

        // Secondary (Blue) - Vertical Arm of Corner (Right Side)
        if (setType === 'secondary') {
            // Gamma Corner: Vertical Arm is on the RIGHT (at X=160).
            // It scans Vertically.
            // Start (Top) -> Down?
            // Top(160, 40) -> Bot(160, 140)?
            // Using logic from YawingX but shifted to X=160?

            // Let's assume points are: start(top), mid1, mid2, bot(bottom)
            // Y positions:
            const yMap = { start: 40, mid1: 66, mid2: 93, end: 120 }; // Using YawingX vertical spacing

            // Map key
            const yKey = key === 'bot' ? 'end' : key;
            const y = yMap[yKey] || 40;
            const xBase = 160;

            // Deviation in X.
            // Inside is +, Outside is -?
            // "Gamma" shape: Vertical bar is on Right.
            // Usually + is "Inside" (Leftward).
            // Let's assume Polarity 1 = Left? 
            // SVG X increases to Right. So -1 = Left.
            // Let's default to -1 (Left) for positive input on Right-side axis?
            // We'll expose a secondaryPolarity prop if needed, or assume -1.
            const x = xBase + (num * scale * -1);

            return { x, y };
        }
        return { x: 0, y: 0 };
    };

    // Auto-calc logic
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
        <div className="flex-1 p-2 relative h-32 border-b border-black w-full last:border-b-0">
            <svg
                width="100%" height="100%" viewBox="0 0 200 150"
                onClick={() => setIsSelected(false)}
            >
                <defs>
                    <marker
                        id="arrowhead-red-y"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="brown" />
                    </marker>
                </defs>

                {/* Axes Drawing */}
                {axisLayout === "topRight" && (
                    <>
                        {/* Origin Top Right? No, just Horizontal Top, Vertical Right */}
                        {/* Horizontal Line: 60 -> 160 */}
                        <line x1="60" y1="40" x2="160" y2="40" stroke="black" strokeWidth="1.5" />
                        <line x1="55" y1="35" x2="55" y2="45" stroke="black" strokeWidth="1.5" />

                        {/* Vertical Line on Right: 160, 40 -> 160, 120 */}
                        <line x1="160" y1="40" x2="160" y2="120" stroke="black" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="50" y="45" fontSize="14" textAnchor="end">X</text>
                        <text x="60" y="30" fontSize="12" textAnchor="middle">+</text>
                        <text x="60" y="55" fontSize="12" textAnchor="middle">-</text>
                        {/* + is Top for TopRight graph (Y+) */}

                        <text x="160" y="135" fontSize="14" textAnchor="middle">Y</text>
                    </>
                )}

                {axisLayout === "cornerGamma" && (
                    <>
                        {/* Gamma Shape: Horizontal Top, Vertical Right */}
                        <line x1="60" y1="40" x2="160" y2="40" stroke="black" strokeWidth="1.5" />
                        <line x1="160" y1="40" x2="160" y2="120" stroke="black" strokeWidth="1.5" />

                        <text x="170" y="45" fontSize="14" textAnchor="start">0</text>

                        <text x="50" y="45" fontSize="14" textAnchor="end">X</text>
                        <text x="60" y="30" fontSize="12" textAnchor="middle">+</text>
                        <text x="60" y="55" fontSize="12" textAnchor="middle">-</text>

                        <text x="160" y="135" fontSize="14" textAnchor="middle">Y</text>
                        <text x="150" y="120" fontSize="12" textAnchor="end">+</text>
                        <text x="170" y="120" fontSize="12" textAnchor="start">-</text>
                    </>
                )}

                {axisLayout === "bottomRight" && (
                    <>
                        {/* Horizontal Bottom: 60 -> 160 (at Y=120) */}
                        <line x1="60" y1="120" x2="160" y2="120" stroke="black" strokeWidth="1.5" />
                        <line x1="55" y1="115" x2="55" y2="125" stroke="black" strokeWidth="1.5" />

                        {/* Vertical Right: 160, 40 -> 160, 120 */}
                        <line x1="160" y1="120" x2="160" y2="40" stroke="black" strokeWidth="1.5" />

                        {/* Labels */}
                        <text x="50" y="120" fontSize="14" textAnchor="end">X</text>
                        <text x="60" y="135" fontSize="12" textAnchor="middle">+</text>
                        <text x="60" y="110" fontSize="12" textAnchor="middle">-</text>
                        {/* + is Bottom for BottomRight graph (Y-) */}

                        <text x="160" y="30" fontSize="14" textAnchor="middle">Y</text>
                    </>
                )}

                {/* Primary Path (Red) */}
                {(() => {
                    const pStart = getCoords('start', 0, 'primary');
                    const pMid1 = getCoords('mid1', points.mid1, 'primary');
                    const pMid2 = getCoords('mid2', points.mid2, 'primary');
                    const pEnd = getCoords('bot', points.bot, 'primary');

                    // Reverse Path: From End (Right) to Start (Left) so arrow points to X
                    const path = `M ${pEnd.x} ${pEnd.y} L ${pMid2.x} ${pMid2.y} L ${pMid1.x} ${pMid1.y} L ${pStart.x} ${pStart.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="brown" strokeWidth="1.5" fill="none" className="pointer-events-none" />
                            {['mid1', 'mid2', 'bot'].map((key) => {
                                const coordKey = key === 'bot' ? 'end' : key;
                                const coords = getCoords(coordKey, points[key], 'primary');

                                return isSelected ? (
                                    <circle key={'p' + key} cx={coords.x} cy={coords.y} r="5" fill="brown" stroke="white" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePointClick(key, 'primary'); }} />
                                ) : (
                                    <text key={'t' + key} x={coords.x} y={coords.y - 8} fontSize="10" fill="brown" textAnchor="middle" className="pointer-events-none">{points[key] !== 0 ? points[key] : ''}</text>
                                );
                            })}
                        </>
                    )
                })()}

                {/* Secondary Path (Blue) - Gamma Corner */}
                {graphType === 'corner' && secondaryPoints && (() => {
                    // Blue vertical arm on Right
                    const pStart = getCoords('start', 0, 'secondary');
                    const pMid1 = getCoords('mid1', secondaryPoints.mid1, 'secondary');
                    const pMid2 = getCoords('mid2', secondaryPoints.mid2, 'secondary');
                    const pEnd = getCoords('bot', secondaryPoints.bot, 'secondary');
                    const path = `M ${pStart.x} ${pStart.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pEnd.x} ${pEnd.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="steelblue" strokeWidth="1.5" fill="none" className="pointer-events-none" />
                            {['mid1', 'mid2', 'bot'].map((key) => {
                                const xKey = key === 'bot' ? 'end' : key;
                                const coords = getCoords(xKey, secondaryPoints[key], 'secondary');
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
                        left: `${(getCoords(
                            activePoint.setType === 'secondary'
                                ? (activePoint.key === 'bot' ? 'end' : activePoint.key) // secondary used different key mapping in getCoords? No, shared yMap logic?
                                : (activePoint.key === 'bot' ? 'end' : activePoint.key),
                            activePoint.setType === 'secondary' ? secondaryPoints[activePoint.key] : points[activePoint.key],
                            activePoint.setType
                        ).x / 200) * 100}%`,

                        top: `${(getCoords(
                            activePoint.setType === 'secondary'
                                ? (activePoint.key === 'bot' ? 'end' : activePoint.key)
                                : (activePoint.key === 'bot' ? 'end' : activePoint.key),
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

            <div className="absolute bottom-2 left-4 flex items-end">
                <span className="mr-2 text-sm font-bold">{label}</span>
                <input
                    type="text"
                    className={`w-16 border-b border-black text-center outline-none bg-transparent ${error ? 'bg-red-50 border-red-500' : ''}`}
                    value={value || ''}
                    readOnly
                />
                <span className="ml-1 text-sm">μm</span>
            </div>
        </div>
    );
}

function YawingY({
    data = { yPlus: '', yC: '', yMinus: '' },
    onChange = () => { }
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const [allPoints, setAllPoints] = useState({
        yPlus: { mid1: 0, mid2: 0, bot: 0 },
        yC: { mid1: 0, mid2: 0, bot: 0 },
        yC_Blue: { mid1: 0, mid2: 0, bot: 0 },
        yMinus: { mid1: 0, mid2: 0, bot: 0 }
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
        // Calculation logic
        // Y+ -> +ve is UP (-1). stored as +ve value.
        // Yc -> +ve is UP (-1). stored as +ve value.
        // Y- -> +ve is DOWN (1). stored as +ve value.
        // Global Yawing Y: same logic as Yawing X? 
        // Max - Min of all points? 
        // Or do we invert Y-?
        // Standard: Opposite side measurements are usually inverted.
        // If Y+ is UP(+), and Y- is DOWN(+)...
        // If the machine leans, it leans one way.
        // Say it leans UP.
        // Y+ shows Up (+).
        // Y- (bottom) would also move Up. "Up" is negative in Y- graph (because Y- +ve is Down).
        // So Y- would be negative.
        // So we have +val and -val. Diff is large. Correct.
        // So we just take raw values if they are relative to their own axes.
        // WAIT.
        // In YawingX, we inverted X-. Use input: `pointsList = [..., -allPoints.xMinus...]`.
        // Let's use the same logic here.

        const pointsList = [
            0, allPoints.yPlus.mid1, allPoints.yPlus.mid2, allPoints.yPlus.bot,
            0, allPoints.yC.mid1, allPoints.yC.mid2, allPoints.yC.bot,
            0, -allPoints.yMinus.mid1, -allPoints.yMinus.mid2, -allPoints.yMinus.bot
        ];

        const max = Math.max(...pointsList);
        const min = Math.min(...pointsList);
        const diff = Math.abs(max - min);

        const formatted = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');
        setYawingDiff(formatted);
        setIsValid(validateValue(diff, { maxValue: 2, validateStd: true }));

    }, [allPoints.yPlus, allPoints.yC, allPoints.yMinus]);

    return (
        <div className="flex border border-black w-120 h-[400px]">
            {/* Left Summary */}

            <div className="w-40 border-r border-black flex flex-col">
                <div className="flex-1 p-2 flex flex-col justify-start space-y-1">
                    <div className="text-sm mb-1">SQUARE SIDE</div>

                    {/* X Selection */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">X=</span>
                        <div className="flex space-x-1 text-xs">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'x' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="yawingY_squareSideX"
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
                        <span className="text-sm font-bold">Y=</span>
                        <div className="flex space-x-1 text-xs">
                            {['A', 'B', 'C', 'D'].map(opt => (
                                <label key={'y' + opt} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="yawingY_squareSideY"
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

                    <div className="mt-1 text-sm">
                        <Checknumber
                            label="SQUARE NO."
                            value={data.squareNo || ''}
                            onChange={(val) => onChange('squareNo', val)}
                            labelClass="text-[10px]"
                            inputClass="w-12 text-[10px]"
                            error={isSubmitted && !data.squareNo}
                        />
                    </div>
                    <div className="text-sm">
                        <Checknumber
                            label="DIAL GAUGE NO."
                            value={data.dialGaugeNo || ''}
                            onChange={(val) => onChange('dialGaugeNo', val)}
                            labelClass="text-[10px]"
                            inputClass="w-12 text-[10px]"
                            error={isSubmitted && !data.dialGaugeNo}
                        />
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-2 border-black">
                    <div className="flex items-end mb-4">
                        <span className="mr-2 font-bold whitespace-nowrap text-sm">Yawing Y =</span>
                        <div className={`px-2 border-b border-black text-center ${!isValid ? 'bg-red-200 text-red-600' : ''}`}>
                            {yawingDiff}
                        </div>
                        <span className="ml-1 text-sm">μm</span>
                    </div>
                    <div className="text-sm space-y-1">
                        <div>STD ≤ 2  μm</div>
                        <div>P type ≤ 1  μm</div>
                    </div>
                </div>
            </div>

            {/* Right Graphs */}
            <div className="w-100 flex flex-col">
                {/* Y+ */}
                <SingleYawingGraphY
                    label="Y+ ="
                    value={data.yPlus}
                    onChange={(val) => onChange('yPlus', val)}
                    points={allPoints.yPlus}
                    onPointChange={(pk, val) => handlePointUpdate('yPlus', pk, val)}
                    zeroLineY={40}
                    polarity={-1} // UP is +
                    axisLayout="topRight"
                    error={isSubmitted && !data.yPlus}
                />

                {/* Yc */}
                <SingleYawingGraphY
                    label="Yc ="
                    value={data.yC}
                    onChange={(val) => onChange('yC', val)}
                    points={allPoints.yC} // Red
                    onPointChange={(pk, val) => handlePointUpdate('yC', pk, val)}
                    secondaryPoints={allPoints.yC_Blue} // Blue
                    onSecondaryPointChange={(pk, val) => handlePointUpdate('yC_Blue', pk, val)}
                    zeroLineY={40}
                    polarity={-1} // UP is +
                    axisLayout="cornerGamma"
                    graphType="corner"
                    error={isSubmitted && !data.yC}
                />

                {/* Y- */}
                <SingleYawingGraphY
                    label="Y- ="
                    value={data.yMinus}
                    onChange={(val) => onChange('yMinus', val)}
                    points={allPoints.yMinus}
                    onPointChange={(pk, val) => handlePointUpdate('yMinus', pk, val)}
                    zeroLineY={120}
                    polarity={1} // DOWN is +
                    axisLayout="bottomRight"
                    error={isSubmitted && !data.yMinus}
                />
            </div>
        </div>
    );
}

export default YawingY;
