import React, { useEffect, useState } from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Reuse assets from Page 77 as requested
import diagramTop from "@/assets/FAWI0005_V3/page75_diagram_top.png";
import diagramSide from "@/assets/FAWI0005_V3/page75_diagram_side.png";

function Page95() {
    return (
        <A4Paper content={content} currentPage={95}>
            <SectionTitle>22.1 Roughness check STD2 (For 0.20mm Wire)</SectionTitle>

            <div className="px-4 mt-4 text-xs font-sans">
                {/* Top Section: Tables (Left) and Top Diagram (Right) */}
                <div className="flex justify-between gap-4">
                    {/* Left Column: Tables */}
                    <div className="w-3/4">
                        {/* Table 1: Ra */}
                        <div className="mb-4">
                            <p className="font-bold mb-1">The value of "Ra" is prioritized over the reference value of surface roughness (Ra mm) "RzDIN"</p>
                            <div className="border border-black text-center">
                                {/* Header */}
                                <div className="grid grid-cols-8 divide-x divide-black border-b border-black bg-gray-100 font-bold">
                                    <div className="p-1">Point</div>
                                    <div className="p-1">a (3rd)</div>
                                    <div className="p-1">b (4th)</div>
                                    <div className="p-1">c (3rd)</div>
                                    <div className="p-1">d (4th)</div>
                                    <div className="p-1">e (3rd)</div>
                                    <div className="p-1">f (4th)</div>
                                    <div className="p-1">g (3rd)</div>
                                </div>
                                {/* Data Row */}
                                <div className="grid grid-cols-8 divide-x divide-black">
                                    <div className="p-1">0.20mm</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1 font-bold">~0.300</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1 font-bold">~0.300</div>
                                    <div className="p-1">No Need</div>
                                </div>
                            </div>
                        </div>

                        {/* Table 2: RzDIN */}
                        <div className="mb-2">
                            <p className="font-bold mb-1">Reference surface roughness (RzDIN mm)</p>
                            <div className="border border-black text-center">
                                {/* Header */}
                                <div className="grid grid-cols-8 divide-x divide-black border-b border-black bg-gray-100 font-bold">
                                    <div className="p-1">Point</div>
                                    <div className="p-1">a (3rd)</div>
                                    <div className="p-1">b (4th)</div>
                                    <div className="p-1">c (3rd)</div>
                                    <div className="p-1">d (4th)</div>
                                    <div className="p-1">e (3rd)</div>
                                    <div className="p-1">f (4th)</div>
                                    <div className="p-1">g (3rd)</div>
                                </div>
                                {/* Data Row */}
                                <div className="grid grid-cols-8 divide-x divide-black">
                                    <div className="p-1">0.20mm</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1 font-bold">2.30~2.60</div>
                                    <div className="p-1">No Need</div>
                                    <div className="p-1 font-bold">2.30~2.60</div>
                                    <div className="p-1">No Need</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-[10px] mb-4">
                            Surface roughness check = stylus; 2mm, cut-off ratio; 300:1
                        </div>

                        {/* Middle Instruction */}
                        <div className="font-bold text-sm mb-6">
                            If the measured value is smaller than the reference or, change the set value as shown below.
                        </div>
                    </div>

                    {/* Right Column: Top Diagram */}
                    <div className="w-1/4 flex flex-col items-center">
                        <img src={diagramTop} alt="Top Diagram" className="w-50 object-contain max-h-40" />
                    </div>
                </div>

                {/* Bottom Section: Logic Text (Left) and Side Diagram (Right) */}
                <div className="flex gap-4">
                    <div className="w-3/4">
                        {/* Logic Block */}
                        <div className="mb-2 italic font-bold">---4th Cut quality (For 0.20mm Wire)---</div>

                        <div className="space-y-6">
                            {/* Case 1: Rough */}
                            <div>
                                <p className="mb-1">When the measured surface roughness is larger than the reference value (rough)</p>
                                <p className="mb-1 pl-4">Discharging-Page4-[DPW PC2-22 V8] = source data-[**]</p>
                                <p className="mb-1 pl-4 text-[10px] text-gray-600">{`{Note ; original data-5-> surface roughness equal to-0.01mmRa of measured values.}`}</p>
                                <p className="mb-2 font-semibold">When the setting is changed, rework it.</p>

                                <div className="text-[11px]">
                                    <p className="font-bold mb-1">Input-range [DPW PC02-22 V8] = [* initial value-20] to [* initial value...</p>
                                    <p className="mb-1">e.g.-&gt; pre-processing setpoint [DPW PC02-22 V8] = 87]</p>
                                    <p>--&gt; The input-range is "Discharge-Page7-[DPW PC02-22 V8] = [67 ~ 102]. &larr;</p>
                                </div>
                            </div>

                            {/* Case 2: Fine */}
                            <div>
                                <p className="mb-1">When the measured surface roughness is smaller than the reference value (fine)</p>
                                <p className="mb-1 pl-4">"Disch-Page4-[DPW PC02-22 V8" = Default + [**]</p>
                                <p className="mb-1 pl-4 text-[10px] text-gray-600">{`{Note ; original data + 5--> measured value + surface roughness equal to 0.01mmRa}`}</p>
                                <p className="mb-2 font-semibold">When the setting is changed, rework it.</p>

                                <div className="text-[11px]">
                                    <p className="font-bold mb-1">Input-range [DPW PC02-22 V8] = [* initial value-20] to [* initial value...</p>
                                    <p className="mb-1">e.g.-&gt; pre-processing setpoint [DPW PC02-22 V8] = 87]</p>
                                    <p>--&gt; The input-range is "Discharge-Page7-[DPW PC02-22 V8] = [67 ~ 102]. &larr;</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Diagram */}
                    <div className="w-1/4 flex flex-col items-center justify-start pt-10">
                        <img src={diagramSide} alt="Side Diagram" className="w-2/3 object-contain mb-2" />
                        <div className="text-[10px] text-center">
                            Measurement point of roughness
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page95;