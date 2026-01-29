import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';

function SingleUVGraph({
    label,
    value,
    onChange,
    points,               // Primary Points (Red/Brown)
    onPointChange,
    secondaryPoints,      // Secondary Points (Blue)
    onSecondaryPointChange,
    onSecondaryPointChange,
    axisLabel1 = "U",
    axisLabel2 = "V",
    errorU = false,
    errorV = false
}) {
    const [activePoint, setActivePoint] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 5;

    // Helper to get coordinates for the L-shaped graph
    // Primary (Red): Vertical axis (V) - goes down
    // Secondary (Blue): Horizontal axis (U) - goes left
    const getCoords = (key, val, setType = 'primary') => {
        const num = parseFloat(val) || 0;

        if (setType === 'secondary') {
            // Blue Path (Horizontal - U axis)
            // Origin (160,40) -> Left
            const xMap = { top: 160, mid1: 126, mid2: 93, bot: 60 };
            // Value affects Y (Vertical deviation)
            return { x: xMap[key] || 160, y: 40 + (num * scale * 1) };
        }
        else {
            // Primary/Red Path (Vertical - V axis)
            // Origin (160,40) -> Down
            const yMap = { top: 40, mid1: 66, mid2: 93, bot: 120 };
            // Value affects X (Horizontal deviation)
            return { x: 160 + (num * scale * -1), y: yMap[key] || 40 };
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
        <div className="flex-1 p-4 relative h-48">
            <svg
                width="100%" height="100%" viewBox="0 0 200 150"
                onClick={() => setIsSelected(false)}
            >
                <defs>
                    <marker
                        id="arrowhead-red-uv"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="brown" />
                    </marker>
                    <marker
                        id="arrowhead-blue-uv"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="steelblue" />
                    </marker>
                </defs>

                {/* L-shaped Axes */}
                <line x1="60" y1="40" x2="160" y2="40" stroke="black" strokeWidth="1.5" />
                <line x1="160" y1="40" x2="160" y2="120" stroke="black" strokeWidth="1.5" />

                {/* U axis label (horizontal) */}
                <line x1="60" y1="35" x2="60" y2="45" stroke="black" strokeWidth="1.5" />
                <text x="50" y="45" fontSize="14" textAnchor="end" fill={errorU ? 'red' : 'black'}>{axisLabel1}</text>
                <text x="60" y="65" fontSize="12" textAnchor="middle">+</text>

                {/* Origin 0 */}
                <text x="160" y="30" fontSize="12" textAnchor="middle">0</text>

                {/* V axis label (vertical) */}
                <line x1="155" y1="120" x2="165" y2="120" stroke="black" strokeWidth="1.5" />
                <text x="160" y="140" fontSize="14" textAnchor="middle" fill={errorV ? 'red' : 'black'}>{axisLabel2}</text>
                <text x="145" y="120" fontSize="12" textAnchor="end">+</text>
                <text x="175" y="120" fontSize="12" textAnchor="start">-</text>

                {/* Primary Path (Red) - V axis */}
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

                {/* Secondary Path (Blue) - U axis */}
                {secondaryPoints && (() => {
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
                                    <text key={'st' + key} x={coords.x} y={coords.y - 8} fontSize="10" fill="steelblue" className="pointer-events-none">{secondaryPoints[key] !== 0 ? secondaryPoints[key] : ''}</text>
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
        </div>
    );
}

function YawingUV({
    data = { u: '', v: '' },
    onChange = () => { },
    stdU = 2,
    stdV = 2
}) {
    const { formState: { isSubmitted } } = useFormContext();
    const [allPoints, setAllPoints] = useState({
        primary: { mid1: 0, mid2: 0, bot: 0 },   // V axis (vertical, red)
        secondary: { mid1: 0, mid2: 0, bot: 0 } // U axis (horizontal, blue)
    });

    const [diffU, setDiffU] = useState('');
    const [diffV, setDiffV] = useState('');
    const [isValidU, setIsValidU] = useState(true);
    const [isValidV, setIsValidV] = useState(true);

    const handlePointUpdate = (graphKey, pointKey, val) => {
        setAllPoints(prev => ({
            ...prev,
            [graphKey]: {
                ...prev[graphKey],
                [pointKey]: val
            }
        }));
    };

    // Calculate diff for U (secondary/blue) and V (primary/red) separately
    useEffect(() => {
        // V axis (primary - red)
        const vPoints = [0, allPoints.primary.mid1, allPoints.primary.mid2, allPoints.primary.bot];
        const vMax = Math.max(...vPoints);
        const vMin = Math.min(...vPoints);
        const vDiff = Math.abs(vMax - vMin);
        const vFormatted = Number.isInteger(vDiff) ? vDiff.toString() : vDiff.toFixed(3).replace(/\.?0+$/, '');
        setDiffV(vFormatted);
        setIsValidV(validateValue(vDiff, { maxValue: stdV, validateStd: true }));

        // U axis (secondary - blue)
        const uPoints = [0, allPoints.secondary.mid1, allPoints.secondary.mid2, allPoints.secondary.bot];
        const uMax = Math.max(...uPoints);
        const uMin = Math.min(...uPoints);
        const uDiff = Math.abs(uMax - uMin);
        const uFormatted = Number.isInteger(uDiff) ? uDiff.toString() : uDiff.toFixed(3).replace(/\.?0+$/, '');
        setDiffU(uFormatted);
        setIsValidU(validateValue(uDiff, { maxValue: stdU, validateStd: true }));

        onChange('u', uFormatted);
        onChange('v', vFormatted);
    }, [allPoints.primary, allPoints.secondary, stdU, stdV, onChange]);

    return (
        <div className="flex flex-col w-80 max-w-md bg-white">
            <SingleUVGraph
                label=""
                value=""
                onChange={() => { }}
                points={allPoints.primary}
                onPointChange={(pk, val) => handlePointUpdate('primary', pk, val)}
                secondaryPoints={allPoints.secondary}
                onSecondaryPointChange={(pk, val) => handlePointUpdate('secondary', pk, val)}
                axisLabel1="U"
                axisLabel2="V"
                errorU={isSubmitted && !data.u}
                errorV={isSubmitted && !data.v}
            />

        </div>
    );
}

export default YawingUV;

