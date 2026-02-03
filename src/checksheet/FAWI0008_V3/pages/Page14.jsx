import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0008_V3-setting";

// Import image
import page14Image from "@/assets/FAWI0008_V3/page14_lock_screw_back.png";

const Page14 = () => {
    const prefix = "p14";
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

    // Check areas - Back side screw check (○△)
    const checkAreas = [
        // Top - 2 PC Screw Filter Plate
        { id: 1, name: "screw_filter_top", top: "7%", left: "54%", label: "2 PC Screw Filter Plate (Top)" },

        // Right side - 6 PC Screw Panel
        { id: 2, name: "screw_panel_6pc", top: "45%", left: "75%", label: "6 PC Screw Panel" },

        // Bottom - 2 PC Screw Filter Plate
        { id: 3, name: "screw_filter_bottom", top: "95%", left: "27%", label: "2 PC Screw Filter Plate (Bottom)" },
    ];

    return (
        <A4Paper content={content} currentPage={14}>
            <div className="p-1 flex flex-col bg-white text-[10px]">
                {/* Section Header */}
                <SectionTitle>2. ด้านหลังของเครื่องจักร</SectionTitle>

                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page14Image}
                        alt="Lock Screw Back Side"
                        className="w-full h-[700px] object-contain"
                    />

                    {/* Check Areas - Circle + Triangle */}
                    {checkAreas.map((area) => (
                        <div
                            key={area.id}
                            className="absolute bg-white/90 rounded px-0.5 shadow-sm"
                            style={{ top: area.top, left: area.left }}
                        >
                            <ShapedCheckGroup
                                name={`${prefix}_${area.name}`}
                                apiEndpoint={apiEndpoint}
                                extraData={{ ...extraData, part_name: area.label }}
                                required={true}
                                visibleShapes={[2, 3]}
                            />
                        </div>
                    ))}
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

export default Page14;