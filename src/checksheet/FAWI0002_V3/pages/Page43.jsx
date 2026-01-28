import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import assets
import image49_1 from '@/assets/FAWI0002_V3/image-49-1.JPG';
import image49_2 from '@/assets/FAWI0002_V3/image-49-2.JPG';

function Page43() {
    return (
        <A4Paper content={content} currentPage={43}>
            <div className="flex flex-col min-h-[250mm] relative">
                {/* 49. Wire Rotation Check */}
                <div className="flex flex-col gap-1">
                    <FormItemCheck
                        name="p43_49_group_check"
                        label={<SectionTitle className="!inline mt-0">49. Wire Rotation Check  ตรวจสอบการหมุนรอบตัวเองของลวด</SectionTitle>}
                    />
                    <p className="text-[10px] text-red-500 font-bold ml-10">
                        (ก่อนที่จะทำการตรวจสอบ Wire Rotation ต้องปรับตำแหน่งของ Lower Guide หรือเปลี่ยน Parts ที่เกี่ยวข้องให้เรียบร้อยก่อน)
                    </p>
                </div>

                {/* Prepare before check */}
                <div className="flex flex-col gap-2 ml-4">
                    <FormItemCheck
                        name="p43_49_prep_group"
                        label={<span className="text-[14px] font-bold underline">Prepare before check (ขั้นตอนการเตรียมก่อนตรวจสอบ)</span>}
                    />

                    <div className="flex flex-col gap-4 ml-2">
                        {/* Step 1 */}
                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p43_49_prep_1_angle"
                                label={<span className="text-sm">Place the Angle Gauge on Lower Guide [วาง Angle Gauge ลงบน Lower Guide]</span>}
                            />
                            <div className="flex justify-center my-2">
                                <img src={image49_1} alt="Angle Gauge Setup" className="h-48 object-contain" />
                            </div>
                        </div>

                        {/* Step 2 & 3 */}
                        <div className="flex flex-col gap-3">
                            <FormItemCheck
                                name="p43_49_prep_2_z_axis"
                                label={<span className="text-sm">Z axis (G959) {'<'} 100 mm [ระยะแกน Z {'<'} 100 mm]</span>}
                            />

                            <div className="flex items-start gap-2">
                                <FormItemCheck name="p43_49_prep_3_mdi" className="mt-0" />
                                <div className="text-sm flex gap-4 items-center">
                                    <div className="flex flex-col leading-tight">
                                        <span>Input on MDI {'=>'} JET0;</span>
                                        <span className="ml-[105px]">T91;</span>
                                        <span className="ml-[105px]">Press ENT</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-4xl font-light">(</span>
                                        <div className="flex flex-col leading-tight mx-2 italic">
                                            <span>Input ลงหน้าจอ MDI {'=>'} JET0;</span>
                                            <span className="ml-[115px]">T91;</span>
                                            <span className="ml-[115px]">กด ENT</span>
                                        </div>
                                        <span className="text-4xl font-light">)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col gap-1">
                            <FormItemCheck
                                name="p43_49_prep_4_rot_check"
                                label={
                                    <div className="flex flex-col text-sm">
                                        <span>Run program "ROT_CHECK" ,Z axis auto move = 250 mm</span>
                                        <span>[รันโปรแกรม "ROT_CHECK" ,แกน Z = 250 mm โดยอัตโนมัติเหมือนกันทั้ง AL400G/AL600G]</span>
                                    </div>
                                }
                            />
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <FormItemCheck
                                    name="p43_49_prep_5_clip"
                                    label={
                                        <div className="flex flex-col text-sm">
                                            <span>Insert CLIP below Upper Guide {'=>'} Input 0 in KEYIN Window {'=>'} Press ENTER</span>
                                            <span>[เสียบ CLIP ใต้ Upper Guide {'=>'} Input 0 ลงในช่อง KEYIN {'=>'} จับ CLIP ให้นิ่งสนิท {'=>'} กด ENTER]</span>
                                        </div>
                                    }
                                />
                            </div>
                            <div className="flex justify-center my-2">
                                <img src={image49_2} alt="Clip Setup" className="h-44 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature - Fixed at bottom of content area */}
                <div className="absolute bottom-25 right-4 w-full flex justify-end">
                    <FormCheckedBox name="p43_checked" label="Checked by :" className="w-1/3" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page43;