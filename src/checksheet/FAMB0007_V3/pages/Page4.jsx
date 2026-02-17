import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormStoneTableGrid from '@/components/FormComponents/FormStoneTableGrid';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Images
import image13 from "@/assets/FAMB0007_V3/FAMB0007-13.PNG";
import image14 from "@/assets/FAMB0007_V3/FAMB0007-14.PNG";

function Page4() {
    const { control, register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={4}>
            <div className="h-full relative flex flex-col">
                {/* 12. Stone Table Check */}
                <div className="mb-6">
                    <p className="font-bold mb-4">12. Stone Table Check (SD = 15 μm.)</p>

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
                                        <span>μm</span>
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
                                <div className="flex items-center gap-1 text-sm">
                                    <FormChecknumber name="p4_x_axis_yc" label={""} className="w-10 h-7" hideLabel inputClass={"w-10 h-7"} />
                                    <span>μm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 13. Square XY Check */}
                <div className="mb-2">
                    <p className="font-bold">13. Square XY Check. (SD = 5 μm)</p>
                    <div className="flex gap-20 items-center justify-center">
                        {/* Diagram with Result Input */}
                        <div className="flex flex-col items-center">
                            <img src={image13} alt="Square Check Diagram" className="w-[180px] h-auto mb-2" />
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-lg text-gray-600">(</span>
                                <FormChecknumber
                                    name="p4_sq_result"
                                    hideLabel
                                    inputClass="w-10 h-8 text-center font-bold text-lg"
                                    label=""
                                />
                                <span>) μm</span>
                            </div>
                        </div>

                        {/* Square Side Selection Box */}
                        <div className="border border-black border-dashed p-6 min-w-[300px]">
                            <p className="font-bold text-lg mb-4">Square Side</p>

                            <div className="flex items-center gap-6 mb-4">
                                <span className="font-bold text-lg w-8">X =</span>
                                <div className="flex gap-4">
                                    {['A', 'B', 'C', 'D'].map((val) => (
                                        <label key={val} className="flex items-center gap-1 cursor-pointer select-none">
                                            <input
                                                type="radio"
                                                value={val}
                                                className="w-5 h-5 accent-black cursor-pointer"
                                                {...register("p4_sq_side_x")}
                                            />
                                            <span className="font-bold text-lg">{val}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <span className="font-bold text-lg w-8">Y =</span>
                                <div className="flex gap-4">
                                    {['A', 'B', 'C', 'D'].map((val) => (
                                        <label key={val} className="flex items-center gap-1 cursor-pointer select-none">
                                            <input
                                                type="radio"
                                                value={val}
                                                className="w-5 h-5 accent-black cursor-pointer"
                                                {...register("p4_sq_side_y")}
                                            />
                                            <span className="font-bold text-lg">{val}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-auto">
                                <span className="font-bold">Square No.</span>
                                <input
                                    type="text"
                                    className="border-b border-black outline-none w-32 text-center font-bold bg-transparent"
                                    {...register("p4_sq_no")}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* 14. Stone Table parallel check */}
                <div className="mb-4">
                    <p className="font-bold mb-4">14. Stone Table parallel check. (SD = 10 μm.)</p>
                    <div className="flex gap-16 items-center justify-center">
                        {/* Diagram */}
                        <div className="flex flex-col items-center">
                            <img src={image14} alt="Parallel Check Diagram" className="w-[160px] h-auto" />
                        </div>

                        {/* Data Box */}
                        <div className="flex flex-col gap-4 min-w-[220px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <FormChecknumber name="p4_parallel_data" label="Data" hideLabel inputClass="w-24 h-7 text-center" />
                                    <span className="font-bold text-sm">μm</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <FormChecknumber name="p4_parallel_dial_gauge_no" label="Dial guage No." hideLabel inputClass="w-24 h-7 text-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;