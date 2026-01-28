import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import assets
import image48 from '@/assets/FAWI0002_V3/image-48.JPG';

function Page42() {
    return (
        <A4Paper content={content} currentPage={42}>
            <div>
                {/* 48. Pulley B UNIT CHECK */}
                <div className="flex flex-col gap-4">
                    <SectionTitle>48. Pulley B UNIT CHECK</SectionTitle>

                    <div className="pl-4 flex flex-col gap-6">
                        {/* Resistance Check */}
                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p42_48_1_resistance_check"
                                label={
                                    <div className="flex flex-col text-sm">
                                        <span className="font-bold">Check the resistance(with wire threading) STD = ∞ Ω</span>
                                        <span>[ตรวจสอบค่าความต้านทานระหว่าง (ร้อยลวดแล้ว) STD = ∞ Ω ]</span>
                                    </div>
                                }
                            />

                            <div className="flex items-center gap-10 mt-2 pl-8">
                                <img src={image48} alt="Pulley B Unit" className="h-48 object-contain" />

                                <div className="border-2 border-red-500 border-dashed p-4 rounded-lg bg-red-50/30">
                                    <p className="text-red-600 font-bold text-sm mb-2 underline">ก่อนทำการวัดค่าความต้านทานต้องทำ ดังนี้</p>
                                    <ol className="text-red-600 text-sm list-decimal pl-5 flex flex-col gap-1">
                                        <li>ร้อยลวด</li>
                                        <li>Power off เครื่อง</li>
                                        <li>เป่าน้ำออกจากบริเวณ Lower Guide Unit</li>
                                        <li>ปรับ Range ของ Multi-Meter ไปที่ 1kΩ</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Air Leak Check */}
                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p42_48_2_air_leak_check"
                                label={
                                    <div className="flex flex-col text-sm">
                                        <span className="font-bold">Check Air Leak around Lower Guide Unit (TANK FILL ON state)</span>
                                        <span>[ตรวจสอบบริเวณรอบๆ Lower Guide Unit ต้องไม่มีฟองอากาศออกมา (Tank Fill)]</span>
                                    </div>
                                }
                            />
                        </div>

                        {/* Signature */}
                        <div className="flex justify-end mt-4 pr-4">
                            <FormCheckedBox name="p42_checked" label="Checked by :" className="w-1/3" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page42;