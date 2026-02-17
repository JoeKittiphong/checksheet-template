import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormStartFinishTime from "@/components/FormComponents/FormStartFinishTime";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormHorizontalTableSingleRow from "@/components/FormComponents/FormHorizontalTableSingleRow";
import { useFormContext } from "react-hook-form";

// Images
import image8 from "@/assets/FAMB0007_V3/FAMB0007-8.PNG";
import image10 from "@/assets/FAMB0007_V3/FAMB0007-10.PNG";

function Page3() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="p-3 select-none text-xs relative h-full">
                {/* 7. Check Straightness of Front Z, W Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1 text-sm">7. Check Straightness of Front Z , W Axis (ตรวจสอบค่าความตรงด้านหน้าของแกน Z และ W) (SD = 5 µm)</p>
                    <div className="flex flex-col items-center space-y-4">
                        <p className="text-[10px]">(เว้นระยะห่างช่องละ 76 mm.)</p>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <FormHorizontalTableSingleRow name="p3_front_z" header={"Front"} label="Z" cols={7} headerStart={0} axis="x" standard={5} showArrows={false} validateStd={true} />
                            </div>
                            <div className="flex items-center">
                                <FormHorizontalTableSingleRow name="p3_front_w" header={"Front"} label="W" cols={7} headerStart={0} axis="x" standard={5} showArrows={false} validateStd={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. Check Ball Screw's Parallel of Z - Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1 text-sm">8. Check Ball Screw's Parallel of Z - Axis [เช็คค่าความขนานของ Ball Screw แกน Z โดยใช้ Jig] (SD = 5 µm)</p>
                    <div className="flex">
                        <div className="w-[45%] flex flex-col">
                            <img src={image8} alt="Ball Screw Z Diagram" className="w-[280px] h-auto object-contain mb-2" />
                            <div className="flex">
                                <FormChecknumber name="p3_z_ballscrew_no" label="Ball Screw No." />
                                <FormChecknumber name="p3_z_dial_gauge_no" label="Dial guage No." />
                            </div>
                        </div>
                        <div className="w-[55%] pl-10 pt-4 flex flex-col">
                            <div className="flex items-center mb-2">
                                <span className="mr-1">(</span>
                                <div className="w-16">
                                    <FormInputCheckSTD name="p3_z_bs_parallel_val" minStd={0} maxStd={5} inputWidth="w-full" hideLabel={true} unit="" className="border-none" />
                                </div>
                                <span className="ml-1">) µm</span>
                                <span className="ml-4 whitespace-nowrap">- Test Bar at Motor Mount</span>
                            </div>
                            <div className="pl-12 space-y-1">
                                <div className='flex'>
                                    <FormChecknumber name="p3_z_bs_top" label="Top" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                                <div className='flex'>
                                    <FormChecknumber name="p3_z_bs_side" label="Side" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. Check Straightness of Side Z , W Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1 text-sm">9. Check Straightness of Side Z , W Axis (ตรวจสอบค่าความตรงด้านข้างของแกน Z และ W) (SD = 5 µm)</p>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px]">(เว้นระยะห่างช่องละ 76 mm)</p>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <FormHorizontalTableSingleRow name="p3_side_z" header={"Side"} label="Z" cols={7} headerStart={0} axis="x" standard={5} showArrows={false} validateStd={true} />
                            </div>
                            <div className="flex items-center">
                                <FormHorizontalTableSingleRow name="p3_side_w" header={"Side"} label="W" cols={7} headerStart={0} axis="x" standard={5} showArrows={false} validateStd={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. Check Ball Screw's Parallel of W - Axis */}
                <div className="mb-6">
                    <p className="font-bold mb-1 text-sm">10. Check Ball Screw's Parallel of W - Axis [เช็คค่าความขนานของ Ball Screw แกน W โดยใช้ Jig] (SD = 5 µm)</p>
                    <div className="flex">
                        <div className="w-[45%] flex flex-col">
                            <img src={image10} alt="Ball Screw W Diagram" className="w-[280px] h-auto object-contain mb-2" />
                            <div className="flex">
                                <FormChecknumber name="p3_w_ballscrew_no" label="Ball Screw No." />
                                <FormChecknumber name="p3_w_dial_gauge_no" label="Dial guage No." />
                            </div>
                        </div>
                        <div className="w-[55%] pl-10 pt-4 flex flex-col">
                            <div className="flex items-center mb-2">
                                <span className="mr-1">(</span>
                                <div className="w-16">
                                    <FormInputCheckSTD name="p3_w_bs_parallel_val" minStd={0} maxStd={5} inputWidth="w-full" hideLabel={true} unit="" className="border-none" />
                                </div>
                                <span className="ml-1">) µm</span>
                                <span className="ml-4 whitespace-nowrap">- Test Bar at Motor Mount</span>
                            </div>
                            <div className="pl-12 space-y-1">
                                <div className='flex'>
                                    <FormChecknumber name="p3_w_bs_top" label="Top" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                                <div className='flex'>
                                    <FormChecknumber name="p3_w_bs_side" label="Side" labelClass="w-12 inline-block" />
                                    <span className="text-xs ml-1">µm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 11. Machine running 2 Hrs. */}
                <div className="mb-4">
                    <p className="font-bold mb-2 text-sm">11. Machine running 2 Hrs.(Full stroke of W, X, Y, Z)</p>
                    <div className="">
                        <FormStartFinishTime
                            name="p3_running_test"
                            minHours={2}
                            validateStd={true}
                        />
                    </div>
                </div>

                {/* Absolute Signature Footer */}
                <div className="absolute bottom-0 right-0">
                    <FormCheckedBox
                        name="p3_checked_by"
                        label="Check By/Date"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;