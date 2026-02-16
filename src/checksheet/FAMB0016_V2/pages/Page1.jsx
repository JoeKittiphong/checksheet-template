import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image1 from "@/assets/FAMB0016_V2/FAMB0016-1.PNG";
import image2 from "@/assets/FAMB0016_V2/FAMB0016-2.PNG";

function Page1() {
    const { control } = useFormContext();

    const item2Standards = [
        { min: 0, max: 5, arrow: '-' }, // 1
        { min: 0, max: 0 },             // 2
        { min: 0, max: 0 },             // 3
        { min: 0, max: 0 },             // 4
        { min: 0, max: 0 },             // 5
        { min: 0, max: 0 },             // 6
        { min: 0, max: 0 },             // 7
        { min: 0, max: 0 },             // 8
        { min: 0, max: 5, arrow: '+' }, // 9
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px]">

                {/* 1. CHECK DATA LEVEL Z AXIS FROM MA */}
                <div className="mb-10">
                    <h2 className="font-bold mb-4">1. CHECK DATA LEVEL Z AXIS FROM MA (เช็คค่าระดับน้ำแกน Z จาก MA)</h2>
                    <div className="flex px-4 items-start justify-between">
                        <div className="w-[180px]">
                            <img src={image1} alt="Z Axis Diagram" className="w-[140px]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex flex-col items-end">
                                <FormLevelTableYAB
                                    name="page1.item1Data"
                                    rows={9}
                                    labelA="A"
                                    labelB="B"
                                    showC={false}
                                />
                                <div className="mt-2 text-[11px] flex items-center gap-2">
                                    <FormChecknumber
                                        name="page1.levelingNo1"
                                        label="LEVEL GUAGE NO."
                                        inputClass="w-34 border-b border-black text-center"
                                        hideBottomBorder={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-48 pt-8">
                            <FormCheckedBox
                                name="page1.item1.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. CHECK DATA LEVEL Z AXIS(ASSEMBLY) */}
                <div className="flex-1">
                    <h2 className="font-bold mb-4 uppercase">2. CHECK DATA LEVEL Z AXIS(ASSEMBLY) (เช็คค่าระดับน้ำแกน Z ของ AS)</h2>
                    <div className="flex px-4 items-start justify-between gap-5">
                        <div className="w-[180px]">
                            <img src={image2} alt="Z Axis Assembly Diagram" className="w-[140px]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex flex-col items-end gap-2">
                                <FormLevelTableYAB
                                    name="page1.item2Data"
                                    rows={9}
                                    standards={item2Standards}
                                    labelA="A"
                                    labelB="B"
                                    showC={false}
                                    showArrows={true}
                                    showStd={true}
                                    validateStd={true}
                                />
                                <div className="mt-2 text-[11px] flex items-center gap-2">
                                    <FormChecknumber
                                        name="page1.levelingNo2"
                                        label="LEVEL GUAGE NO."
                                        inputClass="w-34 border-b border-black text-center"
                                        hideBottomBorder={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-48 pt-32">
                            <FormCheckedBox
                                name="page1.item2.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page1;