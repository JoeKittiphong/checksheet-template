import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

import imgSealFrame from '@/assets/FAWI0002_V3/image-27.JPG';

function Page26() {
    return (
        <A4Paper content={content} currentPage={26}>
            <div>

                {/* 27. Seal Frame Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>27. Seal Frame Check</SectionTitle>
                    <div className="ml-5 flex flex-col">
                        <FormItemCheck
                            name="p26_seal_frame_leak_check"
                            label={<span className="text-sm">ตรวจสอบ Seal Frame ต้องมีน้ำไหลออกมาจากรู Cleaning สม่ำเสมอ</span>}
                        />

                        <div className="flex justify-center">
                            <img src={imgSealFrame} alt="Seal Frame Check" className="h-60" />
                        </div>

                        <div className="text-red-500 text-xs font-bold leading-relaxed">
                            <p>หมายเหตุ : หากตรวจสอบแล้วพบว่าน้ำไม่ไหลออกจากรู Cleaning ของ Seal Frame</p>
                            <p>ให้แจ้ง Leader Up เพื่อติดต่อกลุ่มงาน Semi มาแก้ไข</p>
                        </div>

                        <div className="flex justify-end pr-10">
                            <FormCheckedBox name="p26_seal_frame_sig" label="Checked by :" />
                        </div>
                    </div>
                </div>

                {/* 28. Middle Liquid Level Control Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>28. Middle Liquid Level Control Check</SectionTitle>
                    <div className="ml-5 flex flex-col gap-4">
                        <div className="text-sm font-medium">
                            เปลี่ยน Data Setting ที่ MANAGE - PARAMETER - IGUANODON - SECRET - PAGE 3
                        </div>

                        <FormItemCheck
                            name="p26_middle_level_param_check"
                            label={<span className="text-sm">MACHINE FUNCTION 9 = 001000041(G-Type), MACHINE FUNCTION 9 = 0(Q-Type)</span>}
                        />

                        <FormItemCheck
                            name="p26_middle_level_process_check"
                            label={
                                <div className="text-sm">
                                    <p>เลื่อน Slide Tank ลงสุด ==&gt; <span className="underline">Drain Close</span> "ON" ==&gt; <span className="underline">Tank Fill</span> "ON" ==&gt;</p>
                                    <p>ต้องมีน้ำขึ้นมาที่ Process Tank (ด้านซ้าย) ==&gt; <span className="underline">Sensor Float</span> "ON" ==&gt;</p>
                                    <p><span className="underline">Drain Shutter</span> (ด้านขวา) "OPEN" ==&gt; <span className="underline">Sensor Float</span> "OFF" ==&gt;</p>
                                </div>
                            }
                        />

                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p26_middle_level_height_check"
                                label={<span className="text-sm">ตรวจสอบความสูงของระดับน้ำ โดยระดับน้ำต้องสูงขึ้นมาห่างจาก Work Stand</span>}
                            />
                            <div className="ml-10 flex gap-10">
                                <FormItemCheck
                                    name="p26_middle_level_g_type"
                                    label={<span className="text-sm">(G-Type = 70 mm)</span>}
                                />
                                <FormItemCheck
                                    name="p26_middle_level_q_type"
                                    label={<span className="text-sm">(Q-Type = 50-55 mm)</span>}
                                />
                            </div>
                        </div>

                        <div className="text-sm italic">
                            เมื่อตั้งระดับน้ำได้แล้ว ให้ประกอบ Drain Cover RA และตรวจสอบความสูงของระดับน้ำอีกครั้ง
                        </div>

                        <div className="flex justify-end pr-10">
                            <FormCheckedBox name="p26_middle_level_sig" label="Checked by :" />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page26;