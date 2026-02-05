import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page102() {
    const { register, setValue, control } = useFormContext();

    // Watch inputs for calculation
    const val7 = parseFloat(useWatch({ control, name: 'p102_val_7' })) || 0;
    const val8 = parseFloat(useWatch({ control, name: 'p102_val_8' })) || 0;
    const val9 = parseFloat(useWatch({ control, name: 'p102_val_9' })) || 0;
    const val10 = parseFloat(useWatch({ control, name: 'p102_val_10' })) || 0;

    // Calculate m, n, o
    const m = val9 + val7; // Based on text "m (9) + (7) ="
    const n = val10 + val8; // Based on text "n (10) + (8) ="
    const o = (n - m) !== 0 ? (n - m) / 5 : 0; // Based on text "o (n - m) / 5 =" (Assumed division for step size)

    // Effect to update calculated fields
    useEffect(() => {
        setValue('p102_m', m.toFixed(2));
        setValue('p102_n', n.toFixed(2));
        setValue('p102_o', o.toFixed(2));

        // Calculate V0-V19 based on table formulas
        // V0 = m - (o * 11)
        setValue('p102_calc_v0', (m - (o * 11)).toFixed(2));
        setValue('p102_calc_v1', (m - (o * 10)).toFixed(2));
        setValue('p102_calc_v2', (m - (o * 9)).toFixed(2));
        setValue('p102_calc_v3', (m - (o * 8)).toFixed(2));
        setValue('p102_calc_v4', (m - (o * 7)).toFixed(2));
        setValue('p102_calc_v5', (m - (o * 5)).toFixed(2));
        setValue('p102_calc_v6', (m - (o * 3)).toFixed(2));
        setValue('p102_calc_v7', (m - (o * 1)).toFixed(2));
        setValue('p102_calc_v8', m.toFixed(2)); // m (without calculation)
        setValue('p102_calc_v9', (m + (o * 1)).toFixed(2));

        setValue('p102_calc_v10', (m + (o * 2)).toFixed(2));
        setValue('p102_calc_v11', (m + (o * 3)).toFixed(2));
        setValue('p102_calc_v12', (m + (o * 4)).toFixed(2));
        // V13 No calculation
        setValue('p102_calc_v14', (m + (o * 6)).toFixed(2));
        setValue('p102_calc_v15', (m + (o * 7)).toFixed(2));
        // V16-V19 No calculation

    }, [m, n, o, setValue]);


    return (
        <A4Paper content={content} currentPage={102}>
            <SectionTitle>22.5 Recheck D-PIKA-W voltage setting. (PC02-22) (V0~V9) (For STD2-40mm-4th 0.20mm Wire)</SectionTitle>

            <div className="px-8 mt-4 font-sans text-xs">
                {/* 22.5.1 */}
                <div className="mb-4">
                    <div className="mb-1">22.5.1 Enter the value of the setting value [DPW PC02-22 V8] "No.14 Page" (9.3) prior to machining adjustment in (7).</div>
                    <div className="flex items-center gap-2 pl-4">
                        <span>[DPW PC02-22 V8] &gt;&gt; [</span>
                        <input className="border-b border-black w-20 text-center outline-none" {...register("p102_val_7")} />
                        <span>] --&gt; (7)</span>
                    </div>
                </div>

                {/* 22.5.2 */}
                <div className="mb-4">
                    <div className="mb-1">22.5.2 Write the value of the setting value [DPW PC02-22 V13] "No.15 Page" (9.5) before installation in (8).</div>
                    <div className="flex items-center gap-2 pl-4">
                        <span>[DPW PC02-22 V13] &gt;&gt; [</span>
                        <input className="border-b border-black w-20 text-center outline-none" {...register("p102_val_8")} />
                        <span>] --&gt; (8)</span>
                    </div>
                </div>

                {/* 22.5.3 */}
                <div className="mb-4">
                    <div className="mb-1">22.5.3 Set value determined after machining adjustment</div>
                    <div className="flex items-center gap-2 pl-4">
                        <span>Enter "Disch-Page4-[DPW PC02-22 V8]" &gt;&gt; [</span>
                        <input className="border-b border-black w-20 text-center outline-none" {...register("p102_val_9")} />
                        <span>] --&gt; (9)</span>
                    </div>
                </div>

                {/* 22.5.4 */}
                <div className="mb-4">
                    <div className="mb-1">22.5.4 Set value determined after machining adjustment</div>
                    <div className="flex items-center gap-2 pl-4">
                        <span>Enter "Disch-Page7-[DPW PC02-22 V13]" &gt;&gt; [</span>
                        <input className="border-b border-black w-20 text-center outline-none" {...register("p102_val_10")} />
                        <span>] --&gt; (10)</span>
                    </div>
                </div>

                {/* 22.5.5 */}
                <div className="mb-6">
                    <div className="mb-2">22.5.5 Fill out the calculation results in (7)(9) and (8).(10)</div>
                    <div className="space-y-2 pl-4">
                        <div className="flex items-center gap-2">
                            <span>m (9) + (7) = </span>
                            <input className="border-b border-black w-32 text-center outline-none bg-gray-50" readOnly {...register("p102_m")} />
                            <span>(V8)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>n (10) + (8) = </span>
                            <input className="border-b border-black w-32 text-center outline-none bg-gray-50" readOnly {...register("p102_n")} />
                            <span>(V13)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>o (n - m) / 5 = </span>
                            <input className="border-b border-black w-32 text-center outline-none bg-gray-50" readOnly {...register("p102_o")} />
                        </div>
                    </div>
                </div>

                {/* 22.5.6 Table */}
                <div className="mb-2">22.5.6 Using data at [20.5.5].</div>
                <div className="flex w-full">
                    {/* Left Column (V0-V9) */}
                    <div className="w-1/2 border-r border-black">
                        <div className="text-center font-bold border border-black p-1 bg-white">"Disch-Page4-[[141~150]<br />DPW PC02-22 V0~V9]"</div>
                        <table className="w-full border-collapse border border-black text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-black p-1">V*</th>
                                    <th className="border border-black p-1">Calculation formula</th>
                                    <th className="border border-black p-1 text-[9px]">Completion of calculation results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { v: "V0", f: "m - (o x 11)", res: "p102_calc_v0" },
                                    { v: "V1", f: "m - (o x 10)", res: "p102_calc_v1" },
                                    { v: "V2", f: "m - (o x 9)", res: "p102_calc_v2" },
                                    { v: "V3", f: "m - (o x 8)", res: "p102_calc_v3" },
                                    { v: "V4", f: "m - (o x 7)", res: "p102_calc_v4" },
                                    { v: "V5", f: "m - (o x 5)", res: "p102_calc_v5" },
                                    { v: "V6", f: "m - (o x 3)", res: "p102_calc_v6" },
                                    { v: "V7", f: "m - (o x 1)", res: "p102_calc_v7" },
                                    { v: "V8", f: "m (without calculation)", res: "p102_calc_v8" },
                                    { v: "V9", f: "m + (o x 1)", res: "p102_calc_v9" },
                                ].map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="border border-black p-1 font-bold bg-gray-300">{row.v}</td>
                                        <td className="border border-black p-1">{row.f}</td>
                                        <td className="border border-black p-1">
                                            <input className="w-full text-center bg-transparent outline-none" readOnly {...register(row.res)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Right Column (V10-V19) */}
                    <div className="w-1/2">
                        <div className="text-center font-bold border border-black border-l-0 p-1 bg-white">"Disch-Page4-[[141~150]<br />DPW PC02-22 V0~V9]"</div>
                        <table className="w-full border-collapse border border-black border-l-0 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-black p-1">V*</th>
                                    <th className="border border-black p-1">Calculation formula</th>
                                    <th className="border border-black p-1 text-[9px]">Completion of calculation results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { v: "V10", f: "m + (o x 2)", res: "p102_calc_v10" },
                                    { v: "V11", f: "m + (o x 3)", res: "p102_calc_v11" },
                                    { v: "V12", f: "m + (o x 4)", res: "p102_calc_v12" },
                                ].map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="border border-black p-1 font-bold bg-gray-300">{row.v}</td>
                                        <td className="border border-black p-1">{row.f}</td>
                                        <td className="border border-black p-1">
                                            <input className="w-full text-center bg-transparent outline-none" readOnly {...register(row.res)} />
                                        </td>
                                    </tr>
                                ))}
                                {/* V13 */}
                                <tr>
                                    <td className="border border-black p-1 font-bold bg-gray-300">V13</td>
                                    <td className="border border-black p-1">No calculation</td>
                                    <td className="border border-black p-1 bg-gray-200">No calculation</td>
                                </tr>
                                {/* V14, V15 */}
                                {[
                                    { v: "V14", f: "m + (o x 6)", res: "p102_calc_v14" },
                                    { v: "V15", f: "m + (o x 7)", res: "p102_calc_v15" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="bg-white">
                                        <td className="border border-black p-1 font-bold bg-gray-300">{row.v}</td>
                                        <td className="border border-black p-1">{row.f}</td>
                                        <td className="border border-black p-1">
                                            <input className="w-full text-center bg-transparent outline-none" readOnly {...register(row.res)} />
                                        </td>
                                    </tr>
                                ))}
                                {/* V16-V19 Merged */}
                                <tr>
                                    <td className="border border-black p-1 font-bold bg-gray-300">V16</td>
                                    <td rowSpan={4} colSpan={2} className="border border-black p-1 align-middle text-center bg-white">
                                        No calculation
                                    </td>
                                </tr>
                                <tr><td className="border border-black p-1 font-bold bg-gray-300">V17</td></tr>
                                <tr><td className="border border-black p-1 font-bold bg-gray-300">V18</td></tr>
                                <tr><td className="border border-black p-1 font-bold bg-gray-300">V19</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page102;