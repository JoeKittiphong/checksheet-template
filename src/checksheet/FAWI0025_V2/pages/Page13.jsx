import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0025_V2-setting";

// Import image
import page13Image from "@/assets/FAWI0025_V2/page13_lock_screw.png";

const Page13 = () => {
    const prefix = "p13";
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

    // Check areas - Screw Filter Plate (2PC) ○△
    const checkAreas = [
        // Top left - 2 PC Screw Filter Plate
        { id: 1, name: "screw_filter_top", top: "-2%", left: "25%", label: "2 PC Screw Filter Plate (Top)" },

        // Right side - 2 PC Screw Filter Plate
        { id: 2, name: "screw_filter_right", top: "34%", left: "85%", label: "2 PC Screw Filter Plate (Right)" },

        // Bottom left - 3 PC Screw Panel
        { id: 3, name: "screw_panel_3pc", top: "93%", left: "17%", label: "3 PC Screw Panel" },

        // Bottom center - 2 PC Screw Bed Cover L
        { id: 4, name: "screw_bed_cover", top: "90%", left: "73%", label: "2 PC Screw Bed Cover L" },
    ];

    return (
        <A4Paper content={content} currentPage={13}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <div className="text-center font-bold text-[14px] mb-1 underline">
                    Check Lock Screw ALN400G/ALN600G(iG+E)& ALN400Q/ALN600Q (iG+E)
                </div>
                <SectionTitle>1. ด้านซ้ายของเครื่องจักร</SectionTitle>

                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page13Image}
                        alt="Lock Screw Left Side"
                        className="w-full h-full object-contain"
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

export default Page13;