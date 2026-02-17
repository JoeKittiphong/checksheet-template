import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormStoneTableGrid from '@/components/FormComponents/FormStoneTableGrid';
import FormSquareCheckGraph from '@/components/FormComponents/FormSquareCheckGraph';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import images if available, otherwise use placeholders or empty for now
// Based on Page 3 pattern:
// import image12 from "@/assets/FAMB0007_V3/FAMB0007-12.PNG"; 
// I'll assume standard naming but I'll check if they exist or just use the UI components.

function Page4() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={4}>
            <div className="p-8 h-full relative border border-gray-300">
                {/* 12. Stone Table Check */}
                <div className="mb-12">
                    <p className="font-bold mb-4 text-base border-b border-black inline-block pb-1">12. Stone Table Check (SD = 15 μm.)</p>

                    <div className="flex gap-12 items-start mt-4">
                        {/* Diagram and Grid Area */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-10">
                                {/* Vertical Axis Diagram (Xc) */}
                                <div className="flex flex-col items-center">
                                    <p className="text-xs font-bold mb-2 text-gray-700">Y-Axis (Xc)</p>
                                    <div className="relative h-28 w-12 flex flex-col items-center">
                                        <div className="text-sm font-bold">0</div>
                                        <div className="flex-1 w-[2px] bg-black relative">
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-black"></div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-1 text-sm">
                                        <FormChecknumber name="p4_y_axis_xc" label={""} className="w-10 h-7" hideLabel inputClass={"w-10 h-7"} />
                                    </div>
                                </div>

                                {/* The 3x3 Grid Component */}
                                <FormStoneTableGrid
                                    name="p4_stone_grid"
                                    maxName="p4_stone_max"
                                    minName="p4_stone_min"
                                    difName="p4_stone_dif"
                                    dialGaugeNoName="p4_stone_dial_gauge_no"
                                />
                            </div>

                            {/* Horizontal Axis Diagram (Yc) */}
                            <div className="flex items-center gap-6 ml-24 relative pt-4">
                                <p className="text-xs font-bold absolute -top-2 left-0 text-gray-700">X-Axis (Yc)</p>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-bold">0</div>
                                    <div className="relative w-32 h-[2px] bg-black">
                                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-black"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm whitespace-nowrap bg-white p-1 rounded shadow-sm border border-gray-100">
                                    <FormChecknumber name="p4_x_axis_yc" label={""} className="w-10 h-7" hideLabel inputClass={"w-10 h-7"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 13. Square XY Check */}
                <div className="mb-12">
                    <p className="font-bold mb-4 text-base border-b border-black inline-block pb-1">13. Square XY Check. (SD = 5 μm)</p>
                    <div className="pl-4">
                        <FormSquareCheckGraph name="p4_sq_graph" />
                    </div>
                </div>

                {/* 14. Stone Table parallel check */}
                <div className="mb-8">
                    <p className="font-bold mb-4 text-base border-b border-black inline-block pb-1">14. Stone Table parallel check. (SD = 10 μm.)</p>
                    <div className="flex gap-20 pl-4 items-center">
                        {/* Diagram */}
                        <div className="relative w-44 h-44 bg-white border-2 border-dashed border-gray-300 rounded shadow-sm flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 border-2 border-black flex">
                                <div className="flex-1 border-r-2 border-black"></div>
                                <div className="flex-1 border-l-2 border-black -ml-[2px]"></div>
                            </div>
                            <div className="absolute inset-0 flex flex-col">
                                <div className="flex-1 border-b-2 border-black"></div>
                                <div className="flex-1 border-t-2 border-black -mt-[2px]"></div>
                            </div>

                            {/* Front Indicator SVG */}
                            <div className="absolute -bottom-14 left-0 w-full flex flex-col items-center">
                                <svg width="120" height="20" className="mb-1">
                                    <line x1="10" y1="10" x2="110" y2="10" stroke="black" strokeWidth="1" strokeDasharray="4 2" />
                                    <path d="M10 5 L0 10 L10 15 Z" fill="black" />
                                    <path d="M110 5 L120 10 L110 15 Z" fill="black" />
                                    <text x="15" y="9" className="text-[8px] font-bold">0</text>
                                    <text x="100" y="9" className="text-[8px] font-bold">0</text>
                                </svg>
                                <span className="text-sm font-bold tracking-widest uppercase text-gray-800">Front</span>
                            </div>

                            {/* Stylized Dial Gauge Indicator */}
                            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-blue-500 border border-white shadow-md"></div>
                            <div className="absolute -bottom-3 right-0 w-[4px] h-6 bg-gray-400 origin-bottom rotate-[35deg] rounded-full"></div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl flex flex-col gap-6 w-full max-w-[300px]">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-600 uppercase text-xs tracking-widest">Measurement Data</span>
                                <div className="flex items-center gap-1">
                                    <FormChecknumber name="p4_parallel_data" hideLabel className="w-24 h-9 text-xl font-black text-blue-600" />
                                    <span className="text-sm text-gray-400 font-bold italic">μm</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <FormChecknumber
                                    name="p4_parallel_dial_gauge_no"
                                    label="Dial guage No."
                                    labelClass="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1"
                                    inputClass="bg-gray-50 border-b-2 border-blue-500 font-bold h-9 px-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-6 right-8">
                    <FormCheckedBox
                        name="p4_checked_by"
                        label="Check By/Date"
                        className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 border-t-4 border-t-green-500"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;