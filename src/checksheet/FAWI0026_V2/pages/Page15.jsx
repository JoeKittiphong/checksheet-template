import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0026_V2-setting";

// Import images
import page15Front from "@/assets/FAWI0026_V2/page15_nut_front.png";
import page15Left from "@/assets/FAWI0026_V2/page15_nut_left.png";
import ShapedCheckGroup from '@/components/FormComponents/ShapedCheckGroup';

const Page15 = () => {
    const prefix = "p15";
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={15}>
            <div className="p-1 flex flex-col h-full bg-white text-[11px]">
                {/* Header */}
                <div className="text-center font-bold text-[14px] mb-2 underline">
                    7. Check Nut and Leveling Bolt ALN400Q&ALN600Q (iG+E)
                </div>

                {/* Section 1: ด้านหน้าของเครื่องจักร */}
                <SectionTitle>1. ด้านหน้าของเครื่องจักร</SectionTitle>
                <div className="relative flex gap-4 mt-1 mb-4">
                    {/* Image */}
                    <div className="flex-1">
                        <img
                            src={page15Front}
                            alt="Front View"
                            className="w-full h-[280px] object-contain"
                        />
                    </div>
                    {/* Check Items */}
                    
                    <div className="absolute top-55 right-0 flex-1 flex flex-col justify-center gap-2 pl-2">
                        <div className='flex items-center gap-2'>
                            <ShapedCheckGroup
                                name={`${prefix}_front_leveling_bolt`}
                                apiEndpoint={apiEndpoint}
                                extraData={{}}
                                required={true}
                                visibleShapes={[2, 3]}
                                showCamera={false}
                            />
                            <h2 className='text-[12px]'>Nut และ Leveling Bolt ต้องถูกหมุนขึ้นไปหา Bed</h2>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ShapedCheckGroup
                                name={`${prefix}_front_nut_damage`}
                                apiEndpoint={apiEndpoint}
                                extraData={{}}
                                required={true}
                                visibleShapes={[2, 3]}
                                showCamera={false}
                            />
                            <h2 className='text-[12px]'>รอบๆเหลี่ยมของ Nut ต้องไม่มีรอยเสียหาย</h2>
                        </div>
                    </div>
                </div>

                {/* Section 2: ด้านซ้ายของเครื่องจักร */}
                <SectionTitle>2. ด้านซ้ายของเครื่องจักร</SectionTitle>
                <div className="relative flex gap-4 mt-1 mb-4">
                    {/* Image */}
                    <div className="flex-1">
                        <img
                            src={page15Left}
                            alt="Left View"
                            className="w-full h-[280px] object-contain"
                        />
                    </div>
                    {/* Check Items */}
                    <div className="absolute top-55 right-0 flex-1 flex flex-col justify-center gap-2 pl-2">
                        <div className='flex items-center gap-2'>
                            <ShapedCheckGroup
                                name={`${prefix}_left_leveling_bolt`}
                                apiEndpoint={apiEndpoint}
                                extraData={{}}
                                required={true}
                                visibleShapes={[2, 3]}
                                showCamera={false}
                            />
                            <h2 className='text-[12px]'>Nut และ Leveling Bolt ต้องถูกหมุนขึ้นไปหา Bed</h2>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ShapedCheckGroup
                                name={`${prefix}_left_nut_damage`}
                                apiEndpoint={apiEndpoint}
                                extraData={{}}
                                required={true}
                                visibleShapes={[2, 3]}
                                showCamera={false}
                            />
                            <h2 className='text-[12px]'>รอบๆเหลี่ยมของ Nut ต้องไม่มีรอยเสียหาย</h2>
                        </div>
                    </div>
                </div>

                {/* Remark Section */}
                <div className="mt-10 p-1 text-[12px]">
                    <div className="font-bold mb-0.5">หมายเหตุ</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <div className="flex items-center gap-1">
                            <span className="font-bold">จุดตรวจสอบในแต่ละกลุ่มงาน :</span>
                            <span>□ By Final</span>
                            <span>○ By FG Inspection</span>
                            <span>△ By Double Check</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 mt-0.5">
                        <div className="flex items-center gap-1">
                            <span className="font-bold">เครื่องหมายแสดงผลการตรวจ :</span>
                            <span>✓ : ตรวจสอบเรียบร้อย (ผ่าน)</span>
                            <span>✗ : Not pass / ต้องแก้ไข</span>
                            <span>N/A : ไม่ได้ใช้งาน</span>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
};

export default Page15;