import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image10_1 from "@/assets/FAMB0016_V2/FAMB0016-10-1.PNG";
import image10_2 from "@/assets/FAMB0016_V2/FAMB0016-10-2.PNG";

function Page7() {
    const axesConfig = [
        { key: 'zkb', label: 'Z axis (KB)' },
        { key: 'zkc', label: 'Z axis (KC)' }
    ];

    return (
        <A4Paper content={content} currentPage={7}>
            <div className="flex flex-col h-full font-sans p-4 leading-tight">

                {/* 10. Check การประกอบสาย tube (in,out) เข้ากับ Hose connector ที่ linear coil แกน Z */}
                <h2 className="text-[14px] font-bold mb-1 uppercase">
                    10. Check การประกอบสาย tube (in,out) เข้ากับ Hose connector ที่ linear coil แกน Z
                </h2>
                <p className="text-[14px] font-bold mb-6 ml-6">
                    (ก่อนประกอบ Linear coil เข้ากับ Quill support A ทั้งสองด้าน)
                </p>

                {/* 10.1 Subsection */}
                <div className="mb-10">
                    <p className="text-[13px] font-bold mb-4 ml-4">
                        10.1 Check การ lock hose connector แกน Z
                    </p>

                    <div className="flex px-4 items-start gap-10">
                        {/* Diagram */}
                        <img src={image10_1} alt="10.1 Lock Check" className="w-[180px]" />

                        {/* Table and Sign */}
                        <div className="flex-1 flex gap-6 items-start">
                            <div className="flex flex-col flex-1">
                                <FormEDMCoilTubeCheck
                                    name="page7.item10_1.lockData"
                                    axes={axesConfig}
                                    headerResult="การล็อค"
                                />
                            </div>

                            <div className="">
                                <FormCheckedBox
                                    name="page7.item10_1.checkedInfo"
                                    label="Checked by / Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10.2 Subsection */}
                <div className="flex-1">
                    <p className="text-[13px] font-bold mb-4 ml-4">
                        10.2 Check การดึงสาย tube ที่ต่อกับ Hose connector ของ Linear Coil แกน Z ทั้งสองข้าง
                    </p>

                    <div className="flex px-4 items-start gap-10">
                        {/* Diagram */}
                        <img src={image10_2} alt="10.2 Pull Check" className="w-[180px]" />

                        {/* Table and Sign */}
                        <div className="flex-1 flex gap-6 items-start">
                            <div className="flex flex-col flex-1">
                                <FormEDMCoilTubeCheck
                                    name="page7.item10_2.pullData"
                                    axes={axesConfig}
                                    headerResult="ทดสอบด้วยการดึง"
                                />
                            </div>

                            <div className="">
                                <FormCheckedBox
                                    name="page7.item10_2.checkedInfo"
                                    label="Checked by / Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page7;