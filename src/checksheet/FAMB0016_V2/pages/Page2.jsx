import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image3 from "@/assets/FAMB0016_V2/FAMB0016-3.PNG";
import image4 from "@/assets/FAMB0016_V2/FAMB0016-4.PNG";

function Page2() {
    const { control } = useFormContext();

    const item3Standards = Array(9).fill({ min: 0, max: 5, arrow: '' });
    const item4Standards = Array(9).fill({ min: 0, max: 3, arrow: '' });

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px]">

                {/* 3. CHECK DATA PARALLEL Z AXIS (FROM MA) */}
                <div className="mb-10">
                    <h2 className="font-bold mb-4 uppercase">3. CHECK DATA PARALLEL Z AXIS (FROM MA) (เช็คค่าความขนานแกน Z จาก MA)</h2>
                    <div className="flex px-4 items-start justify-between">
                        <div className="w-[180px]">
                            <img src={image3} alt="Parallel Z Axis Diagram" className="w-[140px]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex flex-col items-end">
                                <FormLevelTableYAB
                                    name="page2.item3Data"
                                    rows={9}
                                    labelA="A"
                                    labelB="B"
                                    showC={false}
                                    showArrows={false}
                                    standards={item3Standards}
                                    validateStd={true}
                                />
                                <div className="mt-2 text-[11px] flex items-center gap-2">
                                    <FormChecknumber
                                        name="page2.dialGaugeNo3"
                                        label="DIAL GUAGE NO."
                                        inputClass="w-34 border-b border-black text-center"
                                        hideBottomBorder={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-48 ml-5">
                            <FormCheckedBox
                                name="page2.item3.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. CHECK DATA PARALLEL Z AXIS (ASSEMBLY) */}
                <div className="flex-1 gap-2">
                    <h2 className="font-bold mb-4 uppercase">4. CHECK DATA PARALLEL Z AXIS (ASSEMBLY) (เช็คค่าความขนานแกน Z ของ AS)</h2>
                    <div className="flex px-4 items-start justify-between gap-5">
                        <div className="w-[180px]">
                            <img src={image4} alt="Parallel Z Axis Assembly Diagram" className="w-[140px]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex flex-col items-end">
                                <FormTableYABDIFF
                                    name="page2.item4Data"
                                    rows={9}
                                    labelA="A"
                                    labelB="B"
                                    labelDiff="DIFF"
                                    diffMode="diff"
                                    // standards={item4Standards}
                                    // validateStd={true}
                                    showArrows={false}
                                    showStd={false}
                                />
                                <div className="mt-2 text-[11px] flex items-center gap-2">
                                    <FormChecknumber
                                        name="page2.dialGaugeNo4"
                                        label="DIAL GUAGE NO."
                                        inputClass="w-34 border-b border-black text-center"
                                        hideBottomBorder={true}
                                    />
                                </div>
                            </div>
                            <div className="w-48 ml-5">
                                <FormCheckedBox
                                    name="page2.item4.checkedInfo"
                                    label="Checked By / Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page2;