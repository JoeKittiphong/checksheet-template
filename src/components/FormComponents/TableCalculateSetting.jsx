import React, { useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";

function TableCalculateSetting({
    multiplier,
    registerPrefix = "p43",
    startIndex = 0,
    title = `"Disch-Page9-[[331~340] DPW PC32 V0~V9]"`,
    // If provided, rowConfig overrides startIndex/calculatedRowsCount behavior for more specific control
    // rowConfig schema: [{ index: 10, label: "V10", presentSuffix: "(#320)", inputSuffix: "(#1320)", isCalculated: true }]
    rowConfig,
    // Optional: Object mapping row index to multiplier value e.g. { 0: "1.23", 1: "4.56" }
    rowMultipliers,
    calculatedRowsCount = 8,
    maxValueRefIndex,
    enableScroll = true,
    headers // Optional: Array of strings for column headers e.g. ["V*", "Present...", ...]
}) {
    const { register, setValue, control, formState: { errors } } = useFormContext();

    // Default headers
    const defaultHeaders = [
        "V*",
        "Present<br />Setting",
        "Record Calculate<br />Result (3)",
        "Calculate<br />New Setting",
        "Input<br />Data Setting"
    ];

    const displayHeaders = headers || defaultHeaders;

    // Determine rows to render
    // If rowConfig is provided, use it. Otherwise, generate based on startIndex.
    const rows = rowConfig || Array.from({ length: 10 }, (_, i) => ({
        index: startIndex + i,
        label: `V${startIndex + i} `,
        isCalculated: i < calculatedRowsCount
    }));

    // Watch all present values to trigger calculations
    const watchedValues = useWatch({
        control,
        name: rows.map(r => `${registerPrefix}_v${r.index}_present`)
    });

    useEffect(() => {
        // Common multiplier
        const commonMult = parseFloat(multiplier);


        // Get max value reference if exists
        let maxVal = Infinity;
        if (maxValueRefIndex !== undefined) {
            // watchedValues index corresponds to rows array index
            // Ref index must be relative to the rows array
            const refVal = parseFloat(watchedValues[maxValueRefIndex]);
            if (!isNaN(refVal)) {
                maxVal = refVal;
            }
        }

        rows.forEach((row, idx) => {
            if (!row.isCalculated) return;

            const presentVal = parseFloat(watchedValues[idx]);

            // Determine effective multiplier for this row
            let effectiveMult = commonMult;
            if (rowMultipliers && rowMultipliers[row.index] !== undefined) {
                effectiveMult = parseFloat(rowMultipliers[row.index]);
            }

            if (!isNaN(presentVal) && !isNaN(effectiveMult)) {
                // Formula: Present * Multiplier
                let calculated = presentVal * effectiveMult;

                // Clamping logic
                if (calculated > maxVal) {
                    calculated = maxVal;
                }

                // Show 2 decimal places
                setValue(`${registerPrefix}_v${row.index}_calc`, calculated.toFixed(2));
            } else {
                setValue(`${registerPrefix}_v${row.index}_calc`, "");
            }
        });
    }, [watchedValues, multiplier, rowMultipliers, setValue, registerPrefix, rows, maxValueRefIndex]);

    return (
        <div className={`${enableScroll ? 'overflow-x-auto' : ''} w-full`}>
            <table className="w-full border-collapse border border-black text-xs">
                <thead>
                    <tr className="bg-white">
                        <th className="border border-black p-1 w-12"></th>
                        <th className="border border-black p-1 w-10"><span dangerouslySetInnerHTML={{ __html: displayHeaders[0] }} /></th>
                        <th className="border border-black p-1"><span dangerouslySetInnerHTML={{ __html: displayHeaders[1] }} /></th>
                        <th className="border border-black p-1"><span dangerouslySetInnerHTML={{ __html: displayHeaders[2] }} /></th>
                        <th className="border border-black p-1"><span dangerouslySetInnerHTML={{ __html: displayHeaders[3] }} /></th>
                        <th className="border border-black p-1"><span dangerouslySetInnerHTML={{ __html: displayHeaders[4] }} /></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        const presentName = `${registerPrefix}_v${row.index}_present`;
                        const inputName = `${registerPrefix}_v${row.index}_input`;

                        return (
                            <tr key={row.index}>
                                {idx === 0 && (
                                    <td rowSpan={rows.length} className="border border-black text-center w-12 bg-white relative">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-bold w-64 text-center">
                                            <span dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />
                                        </div>
                                    </td>
                                )}
                                <td className="border border-black text-center bg-gray-300 font-bold">{row.label}</td>

                                {/* Present Setting */}
                                <td className="border border-black p-0 relative">
                                    <input
                                        type="number"
                                        step="any"
                                        className={`w-full h-full text-center focus:outline-none p-1 ${row.presentSuffix ? 'pr-8' : ''} ${errors[presentName] ? 'bg-red-200' : ''}`}
                                        {...register(presentName, { required: true })}
                                    />
                                    {row.presentSuffix && (
                                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[10px] text-gray-500 pointer-events-none">
                                            {row.presentSuffix}
                                        </span>
                                    )}
                                </td>

                                {/* Result (3) - Multiplier */}
                                <td className="gap-3 border border-black text-center">
                                    {row.isCalculated && <span className="mr-5">X</span>}
                                    {row.isCalculated
                                        ? (rowMultipliers && rowMultipliers[row.index] !== undefined ? rowMultipliers[row.index] : multiplier)
                                        : "Do not culculate"}
                                </td>

                                {/* Calculate New Setting */}
                                <td className="border border-black text-center bg-gray-100">
                                    {row.isCalculated ? (
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="font-bold text-lg">=</span>
                                            <input
                                                type="text"
                                                readOnly
                                                className="w-20 text-center bg-transparent focus:outline-none font-bold"
                                                {...register(`${registerPrefix}_v${row.index}_calc`)}
                                            />
                                        </div>
                                    ) : (
                                        "Input present setting"
                                    )}
                                </td>

                                {/* Input Data Setting */}
                                <td className="border border-black p-0 relative">
                                    <input
                                        type="number"
                                        step="any"
                                        className={`w-full h-full text-center focus:outline-none p-1 ${row.inputSuffix ? 'pr-8' : ''} ${errors[inputName] ? 'bg-red-200' : ''}`}
                                        {...register(inputName, { required: true })}
                                    />
                                    {row.inputSuffix && (
                                        <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[10px] text-gray-500 pointer-events-none">
                                            {row.inputSuffix}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableCalculateSetting;
