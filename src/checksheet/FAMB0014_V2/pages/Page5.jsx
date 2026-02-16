import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0014_V2-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormInputCheckStd from "@/components/FormComponents/FormInputCheckStd";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";

// Images
import image6 from "@/assets/FAMB0014_V2/FAMB0015-6.PNG";
import image7_11 from "@/assets/FAMB0014_V2/FAMB0015-7-11.PNG";
import image7_21 from "@/assets/FAMB0014_V2/FAMB0015-7-12.PNG";

function Page5() {
    return (
        <A4Paper content={content} currentPage={5}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px]">

                {/* 6. CYLINDER CHECK */}
                <div className="mb-10">
                    <h2 className="font-bold mb-4">6. CYLINDER CHECK</h2>

                    <div className="flex">
                        <div className="flex-1 space-y-4">
                            <div>
                                <p className="mb-2">6.1 Check Cylinder before ass'y</p>
                                <div className="ml-8 space-y-2">
                                    <div className="flex items-start">
                                        <FormItemCheck name="page5.item6_1.shaft" label="" />
                                        <span className="ml-2">Cylinder ไม่มีรอยบุบและความเสียหายที่ Shaft ก่อนการประกอบ</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FormItemCheck name="page5.item6_1.bkt" label="" />
                                        <span className="ml-2">Cylinder BKT ไม่มีจุดเสียหาย ก่อนการประกอบ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="mb-4">6.2 Setting STD of Cylinder</p>
                                <div className="ml-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span>STD</span>
                                            <span className="border border-black px-2 py-0.5">A</span>
                                            <span>= 15 ± 0.5 mm.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="whitespace-nowrap">DATA CHECK =</span>
                                            <FormInputCheckStd
                                                name="page5.item6_2.dataA"
                                                label=""
                                                minStd={14.5}
                                                maxStd={15.5}
                                                inputWidth="w-64"
                                                showCheckbox={false}
                                                unit="mm."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span>STD</span>
                                            <span className="border border-black px-2 py-0.5">B</span>
                                            <span>= 41 ± 0.5 mm.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="whitespace-nowrap">DATA CHECK =</span>
                                            <FormInputCheckStd
                                                name="page5.item6_2.dataB"
                                                label=""
                                                minStd={40.5}
                                                maxStd={41.5}
                                                inputWidth="w-64"
                                                showCheckbox={false}
                                                unit="mm."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[350px] flex flex-col items-center">
                            <img src={image6} alt="Cylinder Diagram" className="w-full mb-4" />
                            <div className="w-48">
                                <FormCheckedBox
                                    name="page5.item6.checkedInfo"
                                    label="CHECK BY/DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 7. BELLOWS(Z) CHECK */}
                <div className="flex-1">
                    <h2 className="font-bold mb-4">7. BELLOWS(Z) CHECK</h2>
                    <p className="ml-6 mb-6">7.1 CHECKING BELLOWS(Z) SPEC</p>

                    <div className="flex px-4 gap-20">
                        {/* AL40G Section */}
                        <div className="flex-1 flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start ml-4">
                                <FormItemCheck name="page5.item7_1.al40g" label="" />
                                <span className="font-bold">AL40G</span>
                            </div>

                            <img src={image7_11} alt="AL40G Diagram" className="h-48 object-contain mb-4" />

                            <div className="w-full max-w-[200px]">
                                <FormQuickTable
                                    columns={[
                                        { header: "SPECIFICATION", key: "label", width: "70%", className: "text-center font-bold" },
                                        { header: "", key: "value", width: "30%", className: "text-center" }
                                    ]}
                                    data={[
                                        { label: "MAX", value: "355" },
                                        { label: "MIN", value: "45" },
                                        { label: "จำนวนครีบของ Bellows", value: "16" }
                                    ]}
                                    className="w-full"
                                    hideHeader={false}
                                />
                            </div>
                        </div>

                        {/* AL60G Section */}
                        <div className="flex-1 flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start ml-4">
                                <FormItemCheck name="page5.item7_1.al60g" label="" />
                                <span className="font-bold">AL60G</span>
                            </div>

                            <img src={image7_21} alt="AL60G Diagram" className="h-48 object-contain mb-4" />

                            <div className="w-full max-w-[200px]">
                                <FormQuickTable
                                    columns={[
                                        { header: "SPECIFICATION", key: "label", width: "70%", className: "text-center font-bold" },
                                        { header: "", key: "value", width: "30%", className: "text-center" }
                                    ]}
                                    data={[
                                        { label: "MAX", value: "430" },
                                        { label: "MIN", value: "40" },
                                        { label: "จำนวนครีบของ Bellows", value: "22" }
                                    ]}
                                    className="w-full"
                                    hideHeader={false}
                                />
                            </div>
                        </div>

                        {/* Bellows Signature */}
                        <div className="w-48 self-end pb-4">
                            <div>
                                <FormCheckedBox
                                    name="page5.item7.checkedInfo"
                                    label="CHECK BY/DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page5;