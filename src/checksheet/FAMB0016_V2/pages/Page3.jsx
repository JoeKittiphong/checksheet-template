import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormLevelTableWithDirections from "@/components/FormComponents/FormLevelTableWithDirections";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image5 from "@/assets/FAMB0016_V2/FAMB0016-5.PNG";

function Page3() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px]">

                {/* 5. CHECK DATA PITCHING & ROLLING Z AXIS */}
                <h2 className="font-bold mb-6 uppercase leading-tight">
                    5. CHECK DATA PITCHING & ROLLING Z AXIS (เช็คค่า pitching และ rolling แกน Z)
                </h2>

                <div className="flex px-4 gap-8">
                    {/* Left side Diagram - Spans both sections */}
                    <div className="w-[180px] flex-shrink-0 pt-4">
                        <img src={image5} alt="Pitching & Rolling Diagram" className="w-[180px] mx-auto" />
                    </div>

                    {/* Right side Stacked Sections */}
                    <div className="flex-1 flex flex-col gap-10">

                        {/* 5.1 Pitching Section */}
                        <div className="flex flex-col">
                            <h3 className="font-bold mb-2">Pitching</h3>
                            <div className="flex items-start">
                                <FormLevelTableWithDirections
                                    name="page3.pitching"
                                    control={control}
                                    direction="pitching"
                                />
                                <div className="flex flex-col ml-8 gap-4 pt-10">
                                    <div className="w-32">
                                        <FormCheckedBox
                                            name="page3.pitching.checkedInfo"
                                            label="Checked By / Date"
                                            className="h-28"
                                        />
                                    </div>
                                    <div className="text-[11px] flex items-center gap-2 mt-2">
                                        <FormChecknumber
                                            name="page3.pitching.levelNo"
                                            label="LEVEL GUAGE NO."
                                            inputClass="w-24 border-b border-black text-center"
                                            hideBottomBorder={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5.2 Rolling Section */}
                        <div className="flex flex-col">
                            <h3 className="font-bold mb-2">Rolling</h3>
                            <div className="flex items-start">
                                <FormLevelTableWithDirections
                                    name="page3.rolling"
                                    control={control}
                                    direction="rolling"
                                />
                                <div className="flex flex-col ml-8 gap-4 pt-10">
                                    <div className="w-32">
                                        <FormCheckedBox
                                            name="page3.rolling.checkedInfo"
                                            label="Checked By / Date"
                                            className="h-28"
                                        />
                                    </div>
                                    <div className="text-[11px] flex items-center gap-2 mt-2">
                                        <FormChecknumber
                                            name="page3.rolling.levelNo"
                                            label="LEVEL GUAGE NO."
                                            inputClass="w-24 border-b border-black text-center"
                                            hideBottomBorder={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page3;