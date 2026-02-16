import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0015_V1-setting";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image5_1 from "@/assets/FAMB0015_V1/FAMB0015-5-1.PNG";
import image5_2 from "@/assets/FAMB0015_V1/FAMB0015-5-2.PNG";

function Page4() {
    const axesConfig = [
        { key: 'zkb', label: 'Z axis (KB)' },
        { key: 'zkc', label: 'Z axis (KC)' }
    ];

    return (
        <A4Paper content={content} currentPage={4}>
            <div className="flex flex-col h-full font-sans">
                <h2 className="text-sm font-bold mb-4">
                    5. Check การประกอบสาย Tube (In, Out) เข้ากับ Hose connector ที่ Linear Coil แกน Z
                </h2>
                <p className="text-sm font-bold mb-6 ml-6">
                    (ก่อนประกอบ Linear coil เข้ากับ Quill support A ทั้งสองด้าน)
                </p>

                {/* 5.1 Subsection */}
                <div className="mb-10">
                    <p className="text-[13px] font-bold mb-4 ml-4">
                        5.1 Check การ lock hose connector แกน Z <span className="underline font-normal">(STD. ในการล็อค connector ให้เหลือ 1 - 2 เกลียว)</span>
                    </p>

                    <div className="flex px-8 items-start gap-12">
                        {/* Diagram */}
                        <div>
                            <img src={image5_1} alt="5.1 Lock Check" className="w-50" />
                        </div>

                        {/* Table and Sign */}
                        <div className="flex-1 flex gap-4">
                            <div className="flex flex-col">
                                <FormEDMCoilTubeCheck
                                    name="page4.item5_1.lockData"
                                    axes={axesConfig}
                                    headerResult="การล็อค"
                                />
                            </div>

                            <div className="w-40 pt-16">
                                <FormCheckedBox
                                    name="page4.item5_1.checkedInfo"
                                    label="CHECK BY/DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5.2 Subsection */}
                <div className="flex-1">
                    <p className="text-[13px] font-bold mb-4 ml-4">
                        5.2 Check การดึงสาย Tube ที่ต่อกับ Hose connector ของ Linear Coil แกน Z ทั้งสองข้าง
                    </p>

                    <div className="flex px-8 items-start gap-12">
                        {/* Diagram */}
                        <div>
                            <img src={image5_2} alt="5.2 Pull Check" className="w-50" />
                        </div>

                        {/* Table and Sign */}
                        <div className="flex-1 flex gap-4">
                            <div className="flex flex-col">
                                <FormEDMCoilTubeCheck
                                    name="page4.item5_2.pullData"
                                    axes={axesConfig}
                                    headerResult="การล็อค"
                                />
                            </div>

                            <div className="w-40 pt-16">
                                <FormCheckedBox
                                    name="page4.item5_2.checkedInfo"
                                    label="CHECK BY/DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Footer Signature if required by general pattern */}
                <div className="mt-auto flex justify-end p-4">
                    {/* Placeholder or specific global sign if needed */}
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;
