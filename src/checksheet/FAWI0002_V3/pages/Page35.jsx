import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

import imgWireTreat from '@/assets/FAWI0002_V3/image-38-1.JPG';
import imgMechanicalGap from '@/assets/FAWI0002_V3/image-38-2.JPG';

function Page35() {
    return (
        <A4Paper content={content} currentPage={35}>
            <div>

                {/* 37. Bobbin Shaft Rotation Check */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                        <SectionTitle>37. Bobbin Shaft Rotation Check : Bobbin Shaft หมุนนิ่ง ไม่ส่าย</SectionTitle>
                        <div className="mr-5">
                            <FormCheckedBox name="p35_bobbin_sig" label="Checked by :" />
                        </div>
                    </div>
                </div>

                {/* 38. Wire Treat direction operation check */}
                <div className="flex flex-col gap-2 mt-4">
                    <SectionTitle>38. Wire Treat direction operation check</SectionTitle>

                    <div className="ml-5 flex flex-col gap-2">
                        <FormItemCheck
                            name="p35_measure_wire_check"
                            label={
                                <div className="text-sm flex flex-col">
                                    <p>Mearsure the Wire  (ตรวจสอบระยะห่างระหว่าง Base Plate(R) และลวด = 22.5 ± 0.5 mm</p>
                                    <p>ตามตำแหน่งที่ระบุหมายเลข ดังภาพด้านล่าง)</p>
                                </div>
                            }
                        />

                        <div className="flex justify-center my-2">
                            <img src={imgWireTreat} alt="Wire Treatment Measurement" className="h-55" />
                        </div>

                        {/* Checklist Section */}
                        <div className="flex flex-col gap-1.5 mt-2">
                            <FormItemCheck
                                name="p35_spring_check"
                                label={<span className="text-sm">Heavy spring and light spring check (ตรวจสอบแรงดีดตัวของ Spring ที่ Felt ทั้ง 2)</span>}
                            />
                            <FormItemCheck
                                name="p35_pulley_check"
                                label={<span className="text-sm">Pulley position & smoothly rotation (หมุนแบบราบรื่น)</span>}
                            />
                            <FormItemCheck
                                name="p35_urethane_check"
                                label={<span className="text-sm">Urethane roller is not leant and no scratch  ( Urethane roller ไม่เอียงและไม่มีรอย )</span>}
                            />
                            <FormItemCheck
                                name="p35_al600g_pipe_check"
                                label={<span className="text-sm font-bold">[เฉพาะ AL600G] เช็ค EXT Pipe U จะต้องไม่สัมผัสหรือชนกับ Roller ของ Tension Unit.</span>}
                            />
                            <FormItemCheck
                                name="p35_hold_plate_check"
                                label={<span className="text-sm">ตรวจสอบต้องไม่มีช่องว่างระหว่าง Wire Hold Plate และ Stopper</span>}
                            />
                        </div>

                        <p className="text-[10px] text-gray-500 italic mt-1">***ในกรณีที่พบปัญหา ถ้า Power On ใหม่ จะมีปัญหา F-Roller จะหมุนผิดปกติ (หมุนไป-กลับ) และ Tension Error show.</p>

                        {/* Secondary Image section */}
                        <div className="flex justify-center mt-6">
                            <img src={imgMechanicalGap} alt="Mechanical Gap Checks" className="h-40" />
                        </div>

                        <div className="flex flex-col gap-1.5 mt-4">
                            <FormItemCheck
                                name="p35_cylinder_nut_check"
                                label={<span className="text-sm">ตรวจสอบ ระยะห่างระหว่าง Therminal DW กับ Nut ของ Cylinder ให้ได้เท่ากับ 19.0 mm.</span>}
                            />
                            <FormItemCheck
                                name="p35_pipe_center_check"
                                label={<span className="text-sm">ตรวจสอบ Center ของ Pipe ถ้าไม่ได้ Center ให้คลาย Screw ที่ Pipe Support BKT</span>}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page35;