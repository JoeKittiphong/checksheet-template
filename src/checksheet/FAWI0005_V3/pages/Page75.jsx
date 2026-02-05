
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import diagramTop from "@/assets/FAWI0005_V3/page75_diagram_top.png";
import diagramSide from "@/assets/FAWI0005_V3/page75_diagram_side.png";

function Page75() {
    const renderTable = (title, unit, values, highlightIndices = []) => (
        <div className="mb-4">
            <div className="font-bold mb-1">{title} ({unit})</div>
            <table className="w-full border-collapse border border-black text-center text-xs">
                <thead>
                    <tr className="bg-white">
                        <th className="border border-black p-1 w-16">Point</th>
                        <th className="border border-black p-1">a (4th)</th>
                        <th className="border border-black p-1">b (4th)</th>
                        <th className="border border-black p-1">c (4th)</th>
                        <th className="border border-black p-1">d (4th)</th>
                        <th className="border border-black p-1">e (4th)</th>
                        <th className="border border-black p-1">f (4th)</th>
                        <th className="border border-black p-1">g (4th)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-black p-1">0.20mm</td>
                        {values.map((val, idx) => (
                            <td key={idx} className={`border border-black p-1 ${highlightIndices.includes(idx) ? 'text-red-600 font-bold' : ''}`}>
                                {val}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <A4Paper content={content} currentPage={75}>
            <SectionTitle>20.1 Roughness check IG-S4 (For 0.20mm Wire)</SectionTitle>

            <div className="p-4 text-sm font-sans relative">

                {/* Tables and Top Diagram */}
                <div className="flex gap-4">
                    <div className="w-3/4">
                        <div className="mb-2">
                            Have priority "Ra " value over "RzDIN".
                        </div>
                        {renderTable("Standard Roughness", "Ra \u03BCm",
                            ["No Need", "No Need", "No Need", "~0.33", "No Need", "~0.33", "No Need"],
                            [3, 5] // Indices for d and f
                        )}
                        {renderTable("Standard Roughness", "RzDIN \u03BCm",
                            ["No Need", "No Need", "No Need", "~2.60", "No Need", "~2.60", "No Need"],
                            [3, 5]
                        )}
                        <div className="text-xs mb-4">Roughness check = Styrus; 2mm , Cut-OFF; 300:1</div>

                        <div className="font-bold mb-4">Adjust rourhness to STD fallowing if you see over or under STD.</div>
                    </div>

                    {/* Top Diagram */}
                    <div className="w-1/4 flex flex-col items-center">
                        <img src={diagramTop} alt="Top View Diagram" className="w-full max-w-[150px]" />
                    </div>
                </div>

                {/* Main Content & Side Diagram */}
                <div className="flex gap-4">
                    <div className="w-3/4 space-y-6">
                        {/* Section 1 */}
                        <div>
                            <div className="italic mb-2">---4th Cut quality (For 0.20mm Wire)---</div>
                            <div className="mb-2">
                                When the measurement surface roughness is larger than the reference value (rough)
                            </div>
                            <div className="mb-2 pl-4">
                                Disch-Page8-[DPW PC3-23 V11] = source data-[**]
                            </div>
                            <div className="mb-2 pl-4 text-xs">
                                &#123;Note ; original data-5-&gt; surface roughness equal to-0.01mmRa of measured values.&#125;
                            </div>
                            <div>
                                When the setting is changed, rework it.
                            </div>
                        </div>

                        {/* Max Input Command 1 */}
                        <div className="pl-4">
                            <div className="font-bold mb-1">Max. input command [DPW PC03-23 V11]= [10] ~ [-10] <span className="float-right mr-20">&larr;</span></div>
                            <div className="mb-1">e.g.-&gt; pre-processing setpoint [DPW PC03-23 V11] = 109]</div>
                            <div>--&gt; The max. input command is "Disch-Page8-[DPW PC03-23 V11] = [99 ~ 119]. <span className="float-right mr-20">&larr;</span></div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <div className="mb-2 mt-6">
                                When the measurement surface roughness is smaller than the reference value (fine)
                            </div>
                            <div className="mb-2 pl-4">
                                "Disch-Page8-[DPW PC03-23 V11] = Default + [**]
                            </div>
                            <div className="mb-2 pl-4 text-xs">
                                &#123;Note ; original data + 5--&gt; measured value + surface roughness equal to 0.01mmRa&#125;
                            </div>
                            <div>
                                When the setting is changed, rework it.
                            </div>
                        </div>

                        {/* Max Input Command 2 */}
                        <div className="pl-4">
                            <div className="font-bold mb-1">Max. input command [DPW PC03-23 V11]= [10] ~ [-10] <span className="float-right mr-20">&larr;</span></div>
                            <div className="mb-1">e.g.-&gt; pre-processing setpoint [DPW PC03-23 V11] = 109]</div>
                            <div>--&gt; The max. input command is "Disch-Page8-[DPW PC03-23 V11] = [99 ~ 119]. <span className="float-right mr-20">&larr;</span></div>
                        </div>
                    </div>

                    {/* Side Diagram */}
                    <div className="w-1/4 flex flex-col items-center justify-start pt-10">
                        <img src={diagramSide} alt="Side View Diagram" className="w-full max-w-[100px]" />
                        <div className="text-[10px] mt-2 text-center">Measurement point of roughness</div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page75;