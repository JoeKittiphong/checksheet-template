import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

import imgLeakCheck from '@/assets/FAWI0002_V3/image-31.JPG';

function Page31() {
    return (
        <A4Paper content={content} currentPage={31}>
            <div>

                {/* 31. Water Leaked Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>31. Water Leaked Check (ตรวจสอบน้ำรั่ว)</SectionTitle>

                    <div className="flex justify-center my-2">
                        <img src={imgLeakCheck} alt="Water Leaked Check points" className="h-44 object-contain" />
                    </div>

                    <div className="ml-5 flex flex-col gap-2">
                        <FormItemCheck
                            name="p31_leak_drain_gutter"
                            label={<span className="text-sm">Drain Gutter (รางน้ำ)</span>}
                        />
                        <FormItemCheck
                            name="p31_leak_process_tank"
                            label={<span className="text-sm">Process Tank (ขณะกำลังเปิดน้ำขึ้น Tank)</span>}
                        />
                        <FormItemCheck
                            name="p31_leak_simultaneity"
                            label={
                                <span className="text-sm">
                                    Ckeck Drain of water (ในขณะที่เปิดน้ำขึ้น Process Tank น้ำจะต้องขึ้นมาจากทางด้านซ้ายของ Process tank พร้อมกับฝั่งด้านขวาของ Process Tank)
                                </span>
                            }
                        />

                        <div className="text-[11px] font-bold italic mt-1">
                            *** ถ้าเปิดน้ำขึ้น Process Tank แล้วเกิดปัญหาน้ำขึ้นไม่พร้อมกัน ให้แจ้งกลุ่มงานที่เกี่ยวข้องมาตรวจสอบแก้ไข
                        </div>

                        <div className="mt-2 flex flex-col gap-2 relative mb-5">
                            <FormItemCheck
                                name="p31_leak_slide_plate"
                                label={<span className="text-sm">Slide Plate (เปิดน้ำเต็ม Tank)</span>}
                            />
                            <FormItemCheck
                                name="p31_leak_drain_gutter_cover_b"
                                label={<span className="text-sm">Drain Gutter (รางน้ำ) + Drain Cover-B (Cover ) (เปิดน้ำเต็ม Tank)</span>}
                            />
                            <div className="absolute bottom-[-70px] right-[-30px] flex justify-end pr-10">
                                <FormCheckedBox name="p31_leak_sig" label="Checked by :" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* 32. JET LESS Action Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>32. JET LESS Action Check</SectionTitle>

                    <div className="ml-5 flex flex-col gap-1 text-[13px]">
                        <p>32.1 Move Slide Tank to up position of limit. (เลื่อน Slide Tank ให้อยู่ที่ตำแหน่งสูงสุด)</p>
                        <p>32.2 Change Data Setting JET LESS follow under table (MANAGE ==&gt; PARAMETER ==&gt; FLAG)</p>
                        <p>32.3 Check AWT Jet and Pulley B ==&gt; AWT Jet SW = ON/OFF</p>
                    </div>

                    <div className="ml-5 mt-2 flex gap-4 items-start">
                        <FormQuickTable
                            columns={[
                                { header: "JET LESS", key: "jetless", rowGroup: true, width: "96px", className: "font-bold" },
                                { header: "Drain Shutter", key: "shutter", width: "96px" },
                                { header: "AWT Jet", key: "awt", width: "80px", className: "font-bold" },
                                { header: "Pulley B", key: "pulley", width: "80px" },
                                { header: "Check", key: "id", type: "tristate", width: "64px" },
                            ]}
                            data={[
                                { jetless: "JET LESS = 0", shutter: "Open", awt: "✕", pulley: "✓", id: "p31_jetless_0_open" },
                                { jetless: "JET LESS = 0", shutter: "Close", awt: "✕", pulley: "✓", id: "p31_jetless_0_close" },
                                { jetless: "JET LESS = 1", shutter: "Open", awt: "✓", pulley: "✓", id: "p31_jetless_1_open" },
                                { jetless: "JET LESS = 1", shutter: "Close", awt: "✓", pulley: "✓", id: "p31_jetless_1_close" },
                                { jetless: "JET LESS = 2", shutter: "Open", awt: "✓", pulley: "✓", id: "p31_jetless_2_open" },
                                { jetless: "JET LESS = 2", shutter: "Close", awt: "✕", pulley: "✓", id: "p31_jetless_2_close" },
                            ]}
                        />

                        <div className="flex flex-col gap-4">
                            <div className="text-[11px] leading-tight">
                                <p>- ต้องปิด AWT Jet SW ก่อนทุกครั้ง</p>
                                <p className="ml-2">เมื่อมีการเปลี่ยนสถานะของ Drain Shutter</p>
                                <p className="mt-2">- เมื่อตรวจสอบเสร็จแล้วให้ใส่ data</p>
                                <p className="ml-2 font-bold">JET LESS = 2</p>
                            </div>
                            <div className="mt-2 border border-black p-2 text-[11px] bg-gray-50">
                                <p className="font-bold underline mb-1">Note :</p>
                                <p>✓ = have water (มีน้ำ)</p>
                                <p>✕ = no have water (ไม่มีน้ำ)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex justify-end pr-10 mb-2">
                        <FormCheckedBox name="p31_jetless_sig" label="Checked by :" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page31;