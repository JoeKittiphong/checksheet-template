import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images for section 23
import imgHoseMovement from '@/assets/FAWI0002_V3/image-22-1.JPG';
import imgHoseLabelSupply from '@/assets/FAWI0002_V3/image-22-2-1.JPG';
import imgHoseLabelProcess from '@/assets/FAWI0002_V3/image-22-2-2.JPG';

function Page23() {
    return (
        <A4Paper content={content} currentPage={23}>
            <div>
                {/* 22. Hose of Supply Tank Check */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">22. Hose of Supply Tank Check</h2>

                    {/* 22.1 Movement of Hose Check */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start pr-10">
                            <div className="flex flex-col gap-1 ml-5">
                                <p className="text-sm">22.1 Movement of Hose Check</p>
                                <p className="ml-6 text-gray-700 italic">Cooling spec (AKW 459)</p>
                                <p className="ml-6">(สาย Hose ระหว่าง Supply Tank กับ Process Tank)</p>
                                <div className="mt-4 ml-5 flex flex-col gap-2">
                                    <FormItemCheck name="p23_hose_not_bent" label="Move X axis , Hose was not bent." className="font-bold" />
                                    <p className="ml-8">(เลื่อนแกน X , สาย Hose ไม่หัก)</p>
                                </div>
                            </div>
                            <img src={imgHoseMovement} alt="Hose Movement" className="h-40" />
                        </div>
                    </div>

                    {/* 22.2 Connect Hose and Label Check */}
                    <div className="flex flex-col ml-5">
                        <p className="text-sm">22.2 Connect Hose and Label Check</p>

                        <div className="ml-6 flex flex-col">
                            {/* Supply Tank Label Check */}
                            <div className="flex flex-col">
                                <p className="italic text-gray-800">- ตรวจสอบการติด label ที่ Supply Tank</p>
                                <div className="ml-6 flex flex-col gap-2">
                                    <FormItemCheck name="p23_supply_label_a" label={<span>สาย Hose จาก Sending Pump ที่ Manifold ต้องติด <span className="underline font-black">Label "A"</span></span>} />
                                    <FormItemCheck name="p23_supply_label_b" label={<span>สาย Hose จาก Flushing Pump ที่ Manifold ต้องติด <span className="underline font-black">Label "B"</span></span>} />
                                </div>
                                <div className="mt-2 flex justify-center">
                                    <img src={imgHoseLabelSupply} alt="Supply Tank Labels" className="h-45" />
                                </div>
                            </div>

                            {/* Process Tank Label Check */}
                            <div className="flex flex-col">
                                <p className="italic text-gray-800">- ตรวจสอบการติด label ที่ Process Tank</p>
                                <div className="ml-6 flex flex-col">
                                    <FormItemCheck name="p23_process_label_a" label={<span>สาย Hose ยาว ต้องติด <span className="underline font-black">Label "A"</span> และที่ Supply Tank ต้องติด <span className="underline font-black font-arial italic">Label A</span> เหมือนกัน</span>} />
                                    <FormItemCheck name="p23_process_label_b" label={<span>สาย Hose สั้น ต้องติด <span className="underline font-black">Label "B"</span> และที่ Supply Tank ต้องติด <span className="underline font-black font-arial italic">Label B</span> เหมือนกัน</span>} />
                                </div>
                                <div className="mt-2 flex justify-center">
                                    <img src={imgHoseLabelProcess} alt="Process Tank Labels" className="h-45" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Leak Check */}
                    <div className="mt-4 ml-15 flex flex-col gap-2">
                        <FormItemCheck name="p23_sending_hose_leak" label="Check จุดต่อชุด Sending Hose ด้านหลัง" />
                        <p className="ml-8">Process Tank ว่ามีน้ำรั่วซึมหรือไม่</p>
                    </div>
                </div>

                <div className="flex justify-end pr-10 mt-4 relative bottom-20">
                    <FormCheckedBox name="p23_final_signature" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page23;