import React, { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import FormChecknumber from '../FormComponents/FormChecknumber';

const StoneTableGrid = ({
    name,
    control,
    maxName,
    minName,
    difName,
    dialGaugeNoName,
    registerInput,
    focusCell
}) => {
    const { setValue } = useFormContext();

    // 3x3 keys: row-col
    const gridKeys = [
        ['0-0', '0-1', '0-2'],
        ['1-0', '1-1', '1-2'], // 1-0 is fixed 0
        ['2-0', '2-1', '2-2']
    ];

    // Watch the values for display and calculations
    const gridValues = useWatch({
        control,
        name: name,
        defaultValue: {}
    });

    const stoneMax = useWatch({ control, name: maxName });
    const stoneMin = useWatch({ control, name: minName });
    const stoneDif = useWatch({ control, name: difName });

    const isStoneValid = stoneDif === undefined || stoneDif === "" || stoneDif <= 15;

    useEffect(() => {
        const values = [0]; // Fixed 1-0 is always 0
        Object.values(gridValues || {}).forEach(val => {
            const num = parseFloat(val);
            if (!isNaN(num)) values.push(num);
        });

        if (values.length > 1) {
            const max = Math.max(...values);
            const min = Math.min(...values);
            const dif = Math.abs(max - min);

            if (maxName) setValue(maxName, max);
            if (minName) setValue(minName, min);
            if (difName) setValue(difName, dif);
        }
    }, [gridValues, setValue, maxName, minName, difName]);

    const handleKeyDown = (e, r, c) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let nextC = c + 1;
            let nextR = r;
            if (nextC > 2) {
                nextC = 0;
                nextR = r + 1;
            }
            if (nextR <= 2) {
                if (nextR === 1 && nextC === 0) nextC = 1;
                focusCell(nextR, nextC);
            }
        }
    };

    return (
        <div className="flex gap-12 items-start w-full">
            {/* Left Section: Diagram and Grid Area */}
            <div className="flex flex-col gap-6">
                <div className="flex border-2 border-black bg-white w-[300px] shadow-sm transform transition-all duration-300">
                    {/* Left Side: Diagram */}
                    <div className="w-2/5 border-r-2 border-black flex items-center justify-center p-4 bg-gray-50/30">
                        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-sm">
                            <defs>
                                <marker id="arrowhead-std" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                                </marker>
                            </defs>
                            <line x1="20" y1="50" x2="85" y2="50" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead-std)" />
                            <line x1="50" y1="20" x2="50" y2="85" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead-std)" />
                            <circle cx="50" cy="50" r="1.5" fill="black" />
                        </svg>
                    </div>

                    {/* Right Side: 3x3 Grid */}
                    <div className="w-3/5 p-4 flex flex-col items-center justify-center bg-white">
                        <table className="border-collapse gap-1">
                            <tbody>
                                {gridKeys.map((row, rIdx) => (
                                    <tr key={rIdx}>
                                        {row.map((key, cIdx) => {
                                            if (key === '1-0') {
                                                return (
                                                    <td key={key} className="p-1">
                                                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-bold bg-gray-100 text-base shadow-inner">
                                                            0
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            return (
                                                <td key={key} className="p-1">
                                                    <Controller
                                                        name={`${name}.${key}`}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field, fieldState: { error } }) => (
                                                            <input
                                                                {...field}
                                                                ref={registerInput(rIdx, cIdx)}
                                                                type="text"
                                                                inputMode="numeric"
                                                                placeholder="-"
                                                                className={`w-10 h-10 border-2 text-center text-base font-medium outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-300 ${error ? 'border-red-500 bg-red-50' : 'border-black hover:border-gray-600'}`}
                                                                onKeyDown={(e) => handleKeyDown(e, rIdx, cIdx)}
                                                            />
                                                        )}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Middle Section: Summary Table and Controls */}
            <div className="flex flex-col gap-4 flex-1 max-w-[200px]">
                <table className="w-full border-2 border-black border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border-2 border-black p-1 w-1/3 font-black">SD</th>
                            <th className="border-2 border-black p-1 w-2/3 font-black">DATA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-24">
                            <td className="border-2 border-black p-2 text-center align-middle">
                                <div className="font-bold">15 μm</div>
                                <div className="font-bold mt-2">MAX</div>
                            </td>
                            <td className="border-2 border-black p-2">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-end gap-1">
                                        <span className="font-bold min-w-[30px]">MAX</span>
                                        <div className={`flex-1 border-b border-black text-center font-bold px-1 min-h-[20px] transition-colors ${!isStoneValid ? 'text-red-600' : ''}`}>
                                            {stoneMax ?? ""}
                                        </div>
                                        <span className="text-[10px]">μm</span>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="font-bold min-w-[30px]">MIN</span>
                                        <div className={`flex-1 border-b border-black text-center font-bold px-1 min-h-[20px] transition-colors ${!isStoneValid ? 'text-red-600' : ''}`}>
                                            {stoneMin ?? ""}
                                        </div>
                                        <span className="text-[10px]">μm</span>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="font-bold min-w-[30px]">DIF</span>
                                        <div className={`flex-1 border-b border-black text-center font-bold px-1 min-h-[20px] transition-colors ${!isStoneValid ? 'text-red-600' : ''}`}>
                                            {stoneDif ?? ""}
                                        </div>
                                        <span className="text-[10px]">μm</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-4 flex items-end gap-2 text-sm">
                    <span className="font-bold whitespace-nowrap">Dial guage No.</span>
                    <FormChecknumber
                        name={dialGaugeNoName}
                        hideLabel
                        label={""}
                        className="flex-1"
                        inputClass="w-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default StoneTableGrid;
