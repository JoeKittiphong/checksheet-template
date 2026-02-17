import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image1 from "@/assets/FAMB0007_V3/FAMB0007-1.PNG";
import image2 from "@/assets/FAMB0007_V3/FAMB0007-2.PNG";

function Page1() {
    const { control } = useFormContext();

    // Standards for Y-axis (ข้อ 1)
    const yAxisStandards = [
        { min: 0, max: 5, arrow: '+' }, // 1: 0-5 ↑
        { min: 0, max: 0, arrow: '' },  // 2: 0
        { min: 0, max: 0, arrow: '' },  // 3: 0
        { min: 0, max: 0, arrow: '' },  // 4: 0
        { min: 0, max: 0, arrow: '' },  // 5: 0
        { min: 0, max: 0, arrow: '' },  // 6: 0
        { min: 0, max: 5, arrow: '-' }, // 7: 0-5 ↓
    ];

    // Standards for X-axis (ข้อ 2)
    const xAxisStandards = [
        { min: 0, max: 5, arrow: '+' }, // 1: 0-5
        { min: 0, max: 0, arrow: '' }, // 2: 0
        { min: 0, max: 0, arrow: '' }, // 3: 0
        { min: 0, max: 0, arrow: '' }, // 4: 0
        { min: 0, max: 5, arrow: '-' }, // 5: 0-5
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="p-2 select-none">
                {/* 1. Leveling Check Y axis */}
                <div className="mb-4">
                    <p className="text-sm font-bold mb-2">1. Leveling Check Y axis [การเช็คระดับน้ำแกน Y] หน่วยวัดเป็น µm</p>
                    <div className="flex items-start">
                        <div className="mr-4">
                            <img src={image1} alt="Y Axis Diagram" className="w-[300px] h-auto object-contain" />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[10px] mb-1">(เว้นระยะห่างช่องละ 80 mm)</p>
                            <FormLevelTableYAB
                                name="p1_y_axis_data"
                                control={control}
                                rows={7}
                                labelA="A=KB"
                                labelB="B"
                                showStd={true}
                                standards={yAxisStandards}
                                axis="y"
                            />
                            <div className="mt-4 self-start">
                                <FormChecknumber
                                    name="p1_level_gauge_no_y"
                                    label="Level gauge No."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Leveling Check X axis */}
                <div className="mb-4">
                    <p className="text-sm font-bold mb-2">2. Leveling Check X axis [การเช็คระดับน้ำแกน X] หน่วยวัดเป็น µm</p>
                    <div className="flex flex-col items-center">
                        <img src={image2} alt="X Axis Diagram" className="w-[500px] h-auto object-contain mb-2" />
                        <p className="text-[10px] mb-1">(เว้นระยะห่างช่องละ 80 mm)</p>
                        <FormLevelTableXAB
                            name="p1_x_axis_data"
                            cols={5}
                            labelA="B"
                            labelB="A=KB"
                            showStd={true}
                            standards={xAxisStandards}
                            validateStd={true}
                            axis="x"
                            control={control}
                        />
                        <div className="w-full flex justify-between items-end mt-4 px-10">
                            <FormChecknumber
                                name="p1_level_gauge_no_x"
                                label="Level gauge No."
                            />
                            <div>
                                <FormCheckedBox
                                    name="p1_checked_by"
                                    label="Check By/Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;