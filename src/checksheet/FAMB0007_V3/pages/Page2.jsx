import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormTableXABDIFF from "@/components/FormComponents/FormTableXABDIFF";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image4 from "@/assets/FAMB0007_V3/FAMB0007-4.PNG";
import image6 from "@/assets/FAMB0007_V3/FAMB0007-6.PNG";

function Page2() {
    const { control } = useFormContext();

    // Standards for Section 3 (Y-axis Parallel) - SD=5um
    const parallelYStandards = Array(6).fill({ min: 0, max: 5 });

    // Standards for Section 5 (X-axis Parallel) - based on image STD row
    const parallelXStandards = [
        { min: 0, max: 0 }, // 1: 0
        { min: 0, max: 1 }, // 2: 1
        { min: 0, max: 3 }, // 3: 3
        { min: 0, max: 5 }, // 4: 5
        { min: 0, max: 3 }, // 5: 3
        { min: 0, max: 1 }, // 6: 1
        { min: 0, max: 0 }, // 7: 0
    ];

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="p-2 select-none text-sm">
                {/* 3. Check Parallel of Y - Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1">3. Check Parallel of Y - Axis [ค่าความขนานแกน Y หลังจากที่ประกอบ Lm-guide แล้ว] (SD = 5 µm)</p>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] mb-1">(เว้นระยะห่างช่องละ 98 mm)</p>
                        <FormTableXABDIFF
                            name="p2_parallel_y_data"
                            cols={6}
                            labelA="A=KB"
                            labelB="B"
                            labelDiff="A+B"
                            calcType="sum"
                            useArrow={false}
                            showStd={false}
                            validateStd={true}
                            standards={parallelYStandards}
                        />
                    </div>
                </div>

                {/* 4. Check Ball Screw's Parallel of Y - Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1">4. Check Ball Screw's Parallel of Y - Axis [เช็คค่าความขนานของ Ball Screw แกน Y โดยใช้ Jig] (SD = 5 µm)</p>
                    <div className="flex">
                        <div className="w-1/2 flex flex-col items-center">
                            <img src={image4} alt="Ball Screw Y Diagram" className="w-[350px] h-auto object-contain mb-2" />
                            <div className="flex space-x-4">
                                <FormChecknumber name="p2_y_ballscrew_no" label="Ball Screw No." />
                                <FormChecknumber name="p2_y_dial_gauge_no" label="Dial guage No." />
                            </div>
                        </div>
                        <div className="w-1/2 pl-10 pt-4 flex flex-col">
                            <div className="flex items-center mb-1">
                                <span className="mr-1">(</span>
                                <div className="w-12">
                                    <FormInputCheckSTD name="p2_y_bs_parallel_val" minStd={0} maxStd={5} inputWidth="w-full" hideLabel={true} unit="" className="border-none" />
                                </div>
                                <span className="ml-1">) µm</span>
                                <span className="ml-4 whitespace-nowrap">- Test Bar at Motor Mount</span>
                            </div>
                            <div className="pl-12 space-y-1">
                                <div className='flex'>
                                    <FormChecknumber name="p2_y_bs_top" label="Top" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                                <div className='flex'>
                                    <FormChecknumber name="p2_y_bs_side" label="Side" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Check Parallel of X - Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1">5. Check Parallel of X - Axis [ค่าความขนานแกน X หลังจากที่ประกอบ Lm-guide แล้ว] (SD = 5 µm)</p>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] mb-1">(เว้นระยะห่างช่องละ 53 mm.)</p>
                        <FormTableXABDIFF
                            name="p2_parallel_x_data"
                            cols={7}
                            labelA="A=KB"
                            labelB="B"
                            labelDiff="A+B"
                            calcType="sum"
                            useArrow={false}
                            showStd={true}
                            validateStd={true}
                            standards={parallelXStandards}
                        />
                    </div>
                </div>

                {/* 6. Check Ball Screw's Parallel of X - Axis */}
                <div className="mb-4">
                    <p className="font-bold mb-1">6. Check Ball Screw's Parallel of X - Axis [เช็คค่าความขนานของ Ball Screw แกน X โดยใช้ Jig] (SD = 5 µm)</p>
                    <div className="flex">
                        <div className="w-1/2 flex flex-col items-center">
                            <img src={image6} alt="Ball Screw X Diagram" className="w-[250px] h-auto object-contain mb-2" />
                            <div className="flex space-x-4">
                                <FormChecknumber name="p2_x_ballscrew_no" label="Ball Screw No." />
                                <FormChecknumber name="p2_x_dial_gauge_no" label="Dial guage No." />
                            </div>
                        </div>
                        <div className="w-1/2 pl-10 pt-2 flex flex-col">
                            <div className="flex items-center mb-1">
                                <span className="mr-1">(</span>
                                <div className="w-12">
                                    <FormInputCheckSTD name="p2_x_bs_parallel_val" minStd={0} maxStd={5} inputWidth="w-full" hideLabel={true} unit="" className="border-none" />
                                </div>
                                <span className="ml-1">) µm</span>
                                <span className="ml-4 whitespace-nowrap">- Test Bar at Motor Mount</span>
                            </div>
                            <div className="pl-12 space-y-1">
                                <div className='flex'>
                                    <FormChecknumber name="p2_x_bs_top" label="Top" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                                <div className='flex'>
                                    <FormChecknumber name="p2_x_bs_side" label="Side" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="flex justify-end mt-4 px-10">
                    <div>
                        <FormCheckedBox
                            name="p2_checked_by"
                            label="Check By/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;