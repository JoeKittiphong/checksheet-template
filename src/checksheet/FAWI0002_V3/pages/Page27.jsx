import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

import imgNG from '@/assets/FAWI0002_V3/image-29-21.JPG';
import imgGood from '@/assets/FAWI0002_V3/image-29-22.JPG';

function Page27() {
    return (
        <A4Paper content={content} currentPage={27}>
            <div>
                <SectionTitle>29. Aspirator check</SectionTitle>

                <div className="ml-5 flex flex-col gap-2">
                    <p className="text-sm">29.1 Water full Process Tank and Wire Run "ON". (เปิดน้ำขึ้นเต็ม Process Tank และเปิด Wire Run)</p>
                    <div className="ml-5 flex flex-col gap-1">
                        <FormItemCheck
                            name="p27_aspirator_speed_max"
                            label={<span className="text-sm">Adjust the Speed Control maximum. (เปิด Speed Control จนสุด)</span>}
                        />
                        <FormItemCheck
                            name="p27_aspirator_speed_leak"
                            label={<span className="text-sm">Slowly close the Speed Control that the water leaked at Wire Eject. (ค่อยๆปิด Speed Control จนกระทั่งมีน้ำไหลออกจาก Wire Eject)</span>}
                        />
                        <FormItemCheck
                            name="p27_aspirator_speed_cycle"
                            label={<span className="text-sm">Open the Speed Control ==&gt; 3 cycle. (เปิด Speed Control อีก 3 รอบ)</span>}
                        />
                    </div>

                    <p className="text-sm mt-2">29.2 Water level is full Process Tank (ระดับน้ำเต็ม Process Tank)</p>
                    <div className="ml-5 flex flex-col gap-1">
                        <FormItemCheck
                            name="p27_aspirator_bubble_check"
                            label={<span className="text-sm">Lower Guide, Pulley B, Acylic Pipe should have no bubble. (Lower Guide, Pulley B, Acrylic Pipe จะต้องไม่มีฟองอากาศ)</span>}
                        />
                    </div>

                    <div className="text-red-600 text-[11px] font-bold mt-1 leading-tight">
                        <p>*หมายเหตุ: ก่อนจะตรวจสอบฟองอากาศที่ Lower Guide, Pulley B, Acrylic Pipe</p>
                        <p className="ml-13">ต้องรอให้น้ำขึ้นเต็ม Process Tank (ประมาณ 4 นาที) และกระแสน้ำนิ่งก่อน</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-bold underline">ที่ Lower Guide</h3>

                        {/* Comparison Rows */}
                        <div className="mt-4 flex flex-col gap-6">
                            {/* NG Row */}
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <img src={imgNG} alt="NG - Bubble" className="h-50" />
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    <FormItemCheck
                                        name="p27_lower_guide_ng"
                                        label={<span className="text-sm font-bold">NG =&gt; <span className="font-normal">แจ้ง Leader Up เพื่อติดต่อกลุ่มงานที่เกี่ยวข้องมาแก้ไข</span></span>}
                                    />
                                    <FormItemCheck
                                        name="p27_lower_guide_ng_fixed"
                                        label={<span className="text-sm font-bold">แก้ไขแล้ว =&gt; <span className="font-normal">ตรวจสอบฟองอากาศอีกครั้ง =&gt; OK ไม่พบฟองอากาศแล้ว</span></span>}
                                    />
                                </div>
                            </div>

                            {/* Good Row */}
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <img src={imgGood} alt="Good - No Bubble" className="h-44" />
                                </div>
                                <div className="flex flex-col mt-10">
                                    <FormItemCheck
                                        name="p27_lower_guide_ok"
                                        label={<span className="text-sm font-bold">OK =&gt; <span className="font-normal">ไม่พบฟองอากาศ</span></span>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature */}
                <div className="mt-auto flex justify-end pr-10 mb-4">
                    <FormCheckedBox name="p27_checked_sig" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page27;