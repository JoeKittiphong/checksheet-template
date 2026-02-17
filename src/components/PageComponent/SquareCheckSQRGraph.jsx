import React, { useState, useEffect, useRef } from 'react';
import { cleanNumericInput } from '../../utils/formatUtils';

function SingleSQRGraph({
    label,
    value,
    onChange,
    points,
    onPointChange,
    axisLabelX = "X",
    axisLabelY = "Y"
}) {
    const [activePoint, setActivePoint] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [isSelected, setIsSelected] = useState(false);

    const scale = 5;
    const zeroX = 160; // Origin X (Right)
    const yPositions = { top: 20, mid1: 50, mid2: 80, bot: 110 }; // Origin Y (Bottom)

    const getCoords = (key, val) => {
        const num = parseFloat(val) || 0;
        // Polarity -1: Positive goes Left
        const xOffset = num * scale * -1;
        return {
            x: zeroX + xOffset,
            y: yPositions[key] || 110
        };
    };

    const handlePointClick = (key) => {
        setActivePoint(key);
        setInputValue(points[key].toString());
    };

    const submitValue = () => {
        if (activePoint) {
            const num = parseFloat(inputValue);
            const finalVal = isNaN(num) ? 0 : num;
            onPointChange(activePoint, finalVal);
            setActivePoint(null);
        }
    };

    return (
        <div className="flex-1 p-2 relative h-48 flex items-center justify-center bg-white">
            {/* Display Value Label */}
            <div className="absolute top-4 left-4 flex items-center gap-1 z-10">
                <span className="text-sm font-bold">{axisLabelY} =</span>
                <input
                    type="text"
                    className="w-16 border-b border-black text-center outline-none bg-transparent"
                    value={value || ''}
                    readOnly
                />
                <span className="text-sm">μm</span>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 200 150" onClick={() => setIsSelected(false)}>
                {/* Axes (Origin Bottom-Right) */}
                {/* Vertical Y-axis pointing UP */}
                <line x1="160" y1="110" x2="160" y2="10" stroke="black" strokeWidth="1.5" />
                {/* Horizontal X-axis pointing LEFT */}
                <line x1="160" y1="110" x2="60" y2="110" stroke="black" strokeWidth="1.5" />

                {/* Arrowheads */}
                <path d="M 160 10 L 157 15 L 163 15 Z" fill="black" />
                <path d="M 60 110 L 65 107 L 65 113 Z" fill="black" />

                {/* Labels */}
                <text x="160" y="5" fontSize="12" textAnchor="middle">{axisLabelY}</text>
                <text x="150" y="20" fontSize="10" textAnchor="end">-</text>
                <text x="170" y="20" fontSize="10" textAnchor="start">+</text>

                <text x="50" y="115" fontSize="12" textAnchor="end">{axisLabelX}</text>
                <text x="60" y="105" fontSize="10" textAnchor="middle">+</text>
                <text x="160" y="125" fontSize="10" textAnchor="middle">0</text>

                {/* Path */}
                {(() => {
                    const pTop = getCoords('top', points.top);
                    const pMid1 = getCoords('mid1', points.mid1);
                    const pMid2 = getCoords('mid2', points.mid2);
                    const pBot = getCoords('bot', 0);
                    const path = `M ${pTop.x} ${pTop.y} L ${pMid1.x} ${pMid1.y} L ${pMid2.x} ${pMid2.y} L ${pBot.x} ${pBot.y}`;

                    return (
                        <>
                            <path d={path} stroke="transparent" strokeWidth="20" fill="none" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsSelected(true); }} />
                            <path d={path} stroke="brown" strokeWidth="2" fill="none" />
                            {['top', 'mid1', 'mid2'].map((key) => {
                                const coords = getCoords(key, points[key]);
                                return isSelected ? (
                                    <circle key={'p' + key} cx={coords.x} cy={coords.y} r="5" fill="brown" stroke="white" className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePointClick(key); }} />
                                ) : (
                                    <text key={'t' + key} x={coords.x - 12} y={coords.y + 4} fontSize="10" fill="brown" textAnchor="end">{points[key] !== 0 ? points[key] : ''}</text>
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
                        left: `${(getCoords(activePoint, points[activePoint]).x / 200) * 100}%`,
                        top: `${(getCoords(activePoint, points[activePoint]).y / 150) * 100}%`,
                        transform: 'translate(-110%, -50%)',
                        zIndex: 10
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-12 text-center outline-none border-b border-gray-300 text-sm"
                        value={inputValue}
                        onChange={(e) => setInputValue(cleanNumericInput(e.target.value))}
                        onKeyDown={(e) => e.key === 'Enter' && submitValue()}
                        onBlur={submitValue}
                        autoFocus
                    />
                    <span className="text-xs ml-1">μm</span>
                </div>
            )}
        </div>
    );
}

function SquareCheckSQRGraph({ data = { resultY: '', points: { top: 0, mid1: 0, mid2: 0 } }, onChange = () => { } }) {
    const handlePointUpdate = (pointKey, val) => {
        const newPoints = { ...data.points, [pointKey]: val };

        // Calculate diff (max-min including 0)
        const vals = [0, newPoints.top, newPoints.mid1, newPoints.mid2].map(v => parseFloat(v) || 0);
        const max = Math.max(...vals);
        const min = Math.min(...vals);
        const diff = Math.abs(max - min);
        const formatted = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');

        onChange({
            ...data,
            resultY: formatted,
            points: newPoints
        });
    };

    return (
        <div className="flex w-full items-center justify-center">
            <SingleSQRGraph
                label="Square"
                value={data.resultY}
                points={data.points || { top: 0, mid1: 0, mid2: 0 }}
                onPointChange={(pk, val) => handlePointUpdate(pk, val)}
                axisLabelX="X"
                axisLabelY="Y"
            />
        </div>
    );
}

export default SquareCheckSQRGraph;
