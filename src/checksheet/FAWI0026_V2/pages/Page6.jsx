import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0026_V2-setting";

// Import controller check image
import controllerCheckImg from "@/assets/FAWI0026_V2/controller_check.png";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

const Page6 = () => {
    const prefix = "p06_ctrl";
    const { control } = useFormContext();

    // Watch global form metadata
    const currentModel = useWatch({ control, name: 'model' }) || 'UNKNOWN';
    const watchMachineNo = useWatch({ control, name: 'machineNo' });
    const watchMachine_no = useWatch({ control, name: 'machine_no' });
    const currentMachineNo = watchMachineNo || watchMachine_no || 'UNKNOWN';

    const extraData = {
        model: currentModel,
        machine_no: currentMachineNo
    };

    // 6 inspection areas based on the image positions
    // Positioned using absolute positioning relative to the image
    const checkAreas = [
        { id: 1, name: "area1", top: "11%", left: "46%", partName: "Controller_Area1_TopLeft" },
        { id: 2, name: "area2", top: "16%", left: "88%", partName: "Controller_Area2_TopCenter" },
        { id: 3, name: "area3", top: "31%", left: "17%", partName: "Controller_Area3_LeftWires" },
        { id: 4, name: "area4", top: "67%", left: "18%", partName: "Controller_Area4_BottomLeft" },
        { id: 5, name: "area5", top: "88%", left: "24%", partName: "Controller_Area5_MainRight" },
        { id: 6, name: "area6", top: "90%", left: "69%", partName: "Controller_Area6_BottomRight" },
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div className="p-1 flex flex-col h-full bg-white">
                {/* Header */}
                <SectionTitle>3. Controller Check พื้นที่ใน Controller ทั้งหมด ทุกตำแหน่ง จะต้องไม่มี Part, Screw หรือสิ่งอื่นใด ตกอยู่ภายใน</SectionTitle>

                {/* Image Container with Positioned Checkboxes */}
                <div className="flex-1 relative">
                    {/* Main Image */}
                    <img
                        src={controllerCheckImg}
                        alt="Controller Check Areas"
                        className="w-full h-full object-contain"
                    />

                    {/* Positioned ShapedCheckGroup components */}
                    {checkAreas.map((area) => (
                        <div
                            key={area.id}
                            className="absolute bg-white/95 rounded px-1 py-0.5 shadow-sm border border-gray-300"
                            style={{ top: area.top, left: area.left }}
                        >
                            <ShapedCheckGroup
                                name={`${prefix}_${area.name}`}
                                apiEndpoint={apiEndpoint}
                                uploadFolder="double_check"
                                extraData={{
                                    ...extraData,
                                    part_name: area.partName
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Remark Section */}
                <div className="mt-1 p-1 text-[12px]">
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                        <div className="flex items-center gap-1">
                            <span className="font-bold">หมายเหตุ:</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold">จุดตรวจสอบในแต่ละกลุ่มงาน :</span>
                            <span className="flex items-center gap-0.5">□ By Final</span>
                            <span className="flex items-center gap-0.5">○ By FG Inspection</span>
                            <span className="flex items-center gap-0.5">△ By Double Check</span>
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

export default Page6;