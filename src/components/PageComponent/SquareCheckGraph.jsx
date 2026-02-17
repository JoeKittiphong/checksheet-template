import React, { useState, useEffect, useRef } from 'react';
import { cleanNumericInput } from '../../utils/formatUtils';
import Checknumber from "@/components/UIcomponent/Checknumber";

function SingleSquareGraph({
    value = '',
    onChange = () => { }
}) {
    return (
        <div className="flex flex-col items-center">
            {/* Diagram Area */}
            <div className="relative w-64 h-48 flex items-center justify-center">
                <svg width="200" height="150" viewBox="0 0 200 150">
                    {/* Horizontal Axis */}
                    <line x1="40" y1="110" x2="160" y2="110" stroke="black" strokeWidth="1.5" />
                    <line x1="40" y1="105" x2="40" y2="115" stroke="black" strokeWidth="1.5" /> {/* X tick */}

                    {/* Vertical Axis */}
                    <line x1="160" y1="30" x2="160" y2="110" stroke="black" strokeWidth="1.5" />
                    <line x1="155" y1="30" x2="165" y2="30" stroke="black" strokeWidth="1.5" /> {/* Y tick */}

                    {/* Labels */}
                    <text x="25" y="115" fontSize="16" fontWeight="bold">X</text>
                    <text x="157" y="20" fontSize="16" fontWeight="bold">Y</text>

                    {/* Zero points */}
                    <text x="40" y="130" fontSize="12" fontWeight="black">0</text>
                    <text x="175" y="35" fontSize="12" fontWeight="black">0</text>
                    <text x="170" y="115" fontSize="12" fontWeight="black">0</text>
                </svg>
            </div>

            {/* Thick Arrow and Result Y below diagram */}
            <div className="flex items-center gap-2 mt-2 w-full pl-8">
                <span className="text-sm font-black">0</span>
                <div className="relative flex-1 flex items-center">
                    {/* Thicker black arrow */}
                    <div className="h-1 bg-black w-full relative">
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-black"></div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-base font-black">(</span>
                    <input
                        type="text"
                        className="w-24 border-b border-black text-center font-black outline-none bg-transparent h-8"
                        value={value}
                        onChange={(e) => onChange(cleanNumericInput(e.target.value))}
                        placeholder="        "
                    />
                    <span className="text-base font-black">) μm</span>
                </div>
            </div>
        </div>
    );
}

function SquareCheckGraph({
    data = { resultY: '', squareSideX: '', squareSideY: '', squareNo: '' },
    onChange = () => { }
}) {
    // Utility to handle checkbox-like radio behavior
    const handleSideChange = (axis, val) => {
        onChange(axis, val);
    };

    return (
        <div className="flex items-center justify-between w-full p-6 bg-white gap-12">
            {/* Left Side: Diagram */}
            <div className="flex-1 flex justify-center">
                <SingleSquareGraph
                    value={data.resultY}
                    onChange={(val) => onChange('resultY', val)}
                />
            </div>

            {/* Right Side: Dashed Box */}
            <div className="w-[350px] border-2 border-black border-dashed p-6 min-h-[220px] flex flex-col justify-between">
                <div>
                    <p className="font-black text-lg mb-4">Square Side</p>
                    <div className="space-y-4 pl-2">
                        <div className="flex items-center gap-4">
                            <span className="w-8 font-black text-lg">X =</span>
                            <div className="flex gap-2">
                                {['A', 'B', 'C', 'D'].map(side => (
                                    <div
                                        key={side}
                                        onClick={() => handleSideChange('squareSideX', side)}
                                        className={`
                                            w-8 h-8 flex items-center justify-center border border-black cursor-pointer font-bold select-none transition-colors
                                            ${data.squareSideX === side ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
                                        `}
                                    >
                                        {side}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-8 font-black text-lg">Y =</span>
                            <div className="flex gap-2">
                                {['A', 'B', 'C', 'D'].map(side => (
                                    <div
                                        key={side}
                                        onClick={() => handleSideChange('squareSideY', side)}
                                        className={`
                                            w-8 h-8 flex items-center justify-center border border-black cursor-pointer font-bold select-none transition-colors
                                            ${data.squareSideY === side ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
                                        `}
                                    >
                                        {side}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-end gap-2 text-lg mt-6">
                    <span className="font-black whitespace-nowrap">Square No.</span>
                    <input
                        type="text"
                        className="flex-1 border-b border-black text-center outline-none bg-transparent font-black h-8"
                        value={data.squareNo}
                        onChange={(e) => onChange('squareNo', cleanNumericInput(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}

export default SquareCheckGraph;
