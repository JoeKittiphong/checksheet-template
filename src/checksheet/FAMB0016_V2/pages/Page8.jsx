import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormInputCheckStd from "@/components/FormComponents/FormInputCheckStd";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";

// Images
import image11 from "@/assets/FAMB0016_V2/FAMB0016-11.PNG";
import image12 from "@/assets/FAMB0016_V2/FAMB0016-12-1.PNG";

function Page8() {
    return (
        <A4Paper content={content} currentPage={8}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px] leading-tight">

                {/* 11. CYLINDER CHECK */}
                <div className="mb-10">
                    <h2 className="font-bold mb-4 uppercase">11. CYLINDER CHECK</h2>

                    <div className="flex px-2">
                        <div className="flex-1 space-y-4">
                            <div>
                                <p className="font-bold mb-2">11.1 Check Cylinder before ass'y</p>
                                <div className="ml-8 space-y-3">
                                    <div className="flex items-start">
                                        <FormItemCheck name="page8.item11_1.shaft" label="" />
                                        <span className="ml-2">Cylinder ไม่มีรอยบุบและความเสียหายที่ Shaft ก่อนการประกอบ</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FormItemCheck name="page8.item11_1.bkt" label="" />
                                        <span className="ml-2">Cylinder BKT ไม่มีจุดเสียหาย ก่อนการประกอบ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-bold mb-4">11.2 Setting STD of Cylinder</p>
                                <div className="ml-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span>STD</span>
                                            <span className="border border-black px-2 py-0.5 font-bold">A</span>
                                            <span>= 19 ± 0.5 mm.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="whitespace-nowrap font-bold">DATA CHECK =</span>
                                            <FormInputCheckStd
                                                name="page8.item11_2.dataA"
                                                label=""
                                                minStd={18.5}
                                                maxStd={19.5}
                                                inputWidth="w-64"
                                                showCheckbox={false}
                                                unit="mm."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span>STD</span>
                                            <span className="border border-black px-2 py-0.5 font-bold">B</span>
                                            <span>= 38 ± 0.5 mm.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="whitespace-nowrap font-bold">DATA CHECK =</span>
                                            <FormInputCheckStd
                                                name="page8.item11_2.dataB"
                                                label=""
                                                minStd={37.5}
                                                maxStd={38.5}
                                                inputWidth="w-64"
                                                showCheckbox={false}
                                                unit="mm."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[380px] flex flex-col items-center gap-4">
                            <img src={image11} alt="Cylinder Diagram" className="w-full object-contain" />
                            <div className="w-48 self-end">
                                <FormCheckedBox
                                    name="page8.item11.checkedInfo"
                                    label="Checked By / Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. BELLOWS(Z) CHECK */}
                <div className="flex-1">
                    <h2 className="font-bold mb-4 uppercase">12. BELLOWS(Z) CHECK</h2>
                    <p className="ml-6 mb-6 font-bold">12.1 CHECKING BELLOWS(Z) SPEC</p>

                    <div className="flex px-8 gap-20">
                        <div className="flex-1 flex flex-col items-center">
                            <img src={image12} alt="Bellows Diagram" className="h-64 object-contain mb-6" />

                            <div className="w-full max-w-[280px]">
                                <FormQuickTable
                                    columns={[
                                        { header: "SPECIFICATION", key: "label", width: "70%", className: "text-center font-bold" },
                                        { header: "", key: "value", width: "30%", className: "text-center" }
                                    ]}
                                    data={[
                                        { label: "MAX", value: "495" },
                                        { label: "MIN", value: "48" },
                                        { label: "จำนวนครีบของ Bellows", value: "16" }
                                    ]}
                                    className="w-full border-black shadow-sm"
                                    hideHeader={false}
                                />
                            </div>
                        </div>

                        <div className="w-48 self-end pb-10">
                            <FormCheckedBox
                                name="page8.item12.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page8;