import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
// Assuming the user will place the image
import diagram from "@/assets/FAWI0005_V3/page97_diagram.png";

function Page97() {
    return (
        <A4Paper content={content} currentPage={97}>
            <SectionTitle>22.3 STD2 for checking streaks and unevenness</SectionTitle>

            <div className="px-4 mt-4 font-sans text-xs">
                {/* Top Instruction */}
                <div className="mb-4">
                    Check under white fluorescent light. (Distance from work piece to light (white light) = less than 2.5m)
                </div>

                {/* Main Content Area: Table/Instructions (Left) and Diagram (Right) */}
                <div className="flex gap-4">
                    <div className="w-2/3">
                        {/* Check Table */}
                        <table className="w-full border-collapse border border-black text-center mb-6">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-black p-1 w-[14%]">Point</th>
                                    <th className="border border-black p-1 w-[14%]">a (3rd)</th>
                                    <th className="border border-black p-1 w-[14%]">b (4th)</th>
                                    <th className="border border-black p-1 w-[14%]">c (3rd)</th>
                                    <th className="border border-black p-1 w-[14%]">d (4th)</th>
                                    <th className="border border-black p-1 w-[14%]">e (3rd)</th>
                                    <th className="border border-black p-1 w-[14%]">f (4th)</th>
                                    <th className="border border-black p-1 w-[14%]">g (3rd)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-1">0.20mm</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                    <td className="border border-black p-1">Check</td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="mb-2 font-bold">Complete check</p>
                        <p className="mb-8">No ruggedness, no unevenness on the surface, and no roughness when viewed with the naked eye</p>

                        <div className="mb-2 italic font-bold">1. When there is deep square roughness when viewed with the eye</div>
                        <div className="mb-2 italic text-[11px] pl-2">--- 4th Cut Surface---</div>

                        <p className="mb-2">"Discharging-Page4-[DPW PC02-22 V8] = default + [1]</p>
                        <p className="mb-6">When the setting is changed, rework it.</p>

                        <div className="mt-4">
                            <p className="font-bold mb-2">Input-range [DPW PC02-22 V8] = [* initial value-20] to [* initial value + 15]</p>
                            <p className="mb-2">e.g.-&gt; Default setting [DPW PC02-22 V8] = 87]</p>
                            <p>--&gt; Input-range is "Discharging-Page7-[[274] DPW PC02-22 V8] = [67 ~ 102].</p>
                        </div>
                    </div>

                    {/* Diagram Section */}
                    <div className="w-1/3 flex flex-col items-center pt-2">
                        <img src={diagram} alt="Check Diagram" className="w-full object-contain mb-4" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page97;