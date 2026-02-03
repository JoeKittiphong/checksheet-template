import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0006_V3-setting";

// Import image
import page9MachineFront from "@/assets/FAWI0006_V3/page9_machine_front.png";

const Page9 = () => {
    const prefix = "p09";
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

    // Check areas based on the image positions
    const checkAreas = [
        // Top section - STD
        { id: 1, name: "std", top: "6%", left: "0%", label: "STD" },
        { id: 2, name: "950902a", top: "1%", left: "58%", label: "950902A" },

        // Option section
        // { id: 3, name: "option_ts6925a", top: "10%", left: "1%", label: "Option TS6925A" },

        // Right side - top
        { id: 4, name: "950834b", top: "16%", left: "89%", label: "950834B" },

        // Left side - middle
        { id: 5, name: "951020a", top: "21%", left: "0%", label: "951020A" },

        // Right side - 95105NC
        { id: 6, name: "95105nc", top: "33%", left: "90%", label: "95105NC" },

        // Middle section
        { id: 7, name: "951021a", top: "32%", left: "0%", label: "951021A" },
        { id: 8, name: "950346a", top: "67%", left: "81%", label: "950346A (4 PCS)" },

        // Left side - 951782B
        { id: 9, name: "951782b", top: "49%", left: "1%", label: "951782B" },
        { id: 10, name: "950755b", top: "87%", left: "1%", label: "950755B" },

        // Middle area
        { id: 11, name: "915938", top: "59%", left: "-1%", label: "915938" },
        { id: 12, name: "950733a", top: "45%", left: "69%", label: "950733A (2 PCS)" },

        // TS9768A
        { id: 13, name: "ts9768a", top: "71%", left: "-1%", label: "TS9768A" },
        { id: 14, name: "ts9767a", top: "55%", left: "90%", label: "TS9767A" },

        // Bottom section - Linear Motor Drive
        { id: 15, name: "ts9772b", top: "82%", left: "88%", label: "TS9772B/TS9775B" },
        { id: 16, name: "ts9772b", top: "90%", left: "81%", label: "TS9772B/TS9775B" },

        // Bottom left
        { id: 17, name: "ts9771b", top: "78%", left: "5%", label: "TS9771B/TS9774A" },

        // Bottom right 
        { id: 18, name: "95106wb", top: "74%", left: "88%", label: "95106WB/95106VB" },

        // Option W2
        { id: 18, name: "option_w2", top: "90%", left: "38%", label: "Option W2" },
    ];

    return (
        <A4Paper content={content} currentPage={9}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <SectionTitle>1.1 ด้านหน้าของเครื่องจักร</SectionTitle>

                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page9MachineFront}
                        alt="Machine Front View"
                        className="w-full h-full object-contain"
                    />

                    {/* Positioned ShapedCheckGroups */}
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
                <div className="mt-1 p-1 text-[10px]">
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

export default Page9;