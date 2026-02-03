import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0025_V2-setting";

// Import image
import page12Image from "@/assets/FAWI0025_V2/page12_machine_back.png";

const Page12 = () => {
    const prefix = "p12";
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

    // Section 5: ด้านหลังของเครื่องจักร - Main check areas (○△)
    const checkAreas = [
        // Top section
        { id: 1, name: "95007za", top: "1%", left: "13%", label: "95007ZA" },
        { id: 2, name: "118099a_back", top: "-2%", left: "40%", label: "118099A" },
        { id: 3, name: "950348a_top", top: "-2%", left: "62%", label: "950348A" },

        // Right side
        // { id: 4, name: "1pc", top: "3%", left: "87%", label: "1PC Exhaust Port" },
        { id: 5, name: "lan", top: "25%", left: "91%", label: "LAN" },

        // Left side
        { id: 6, name: "951320b", top: "37%", left: "2%", label: "951320B" },

        // Column area
        { id: 7, name: "column_950447", top: "38%", left: "80%", label: "Column (950447)" },

        // Grease UP
        // { id: 8, name: "950639", top: "43%", left: "75%", label: "950639 P type" },
        // { id: 9, name: "grease_up_back", top: "56%", left: "81%", label: "Grease UP" },

        // Bottom left
        { id: 10, name: "950348a_bottom", top: "70%", left: "8%", label: "950348A" },

        // Model plate
        { id: 11, name: "model_sn_date", top: "95%", left: "18%", label: "Model, S/N, Date" },
    ];

    // 4PCS check areas (□○△)
    const pcsCheckAreas = [
        { id: 12, name: "4pcs_no_option", top: "95%", left: "63%", label: "4PCS No Option" },
        { id: 13, name: "4pcs_with_option", top: "95%", left: "83%", label: "4PCS With Option" },
    ];

    return (
        <A4Paper content={content} currentPage={12}>
            <SectionTitle>5. ด้านหลังของเครื่องจักร</SectionTitle>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page12Image}
                        alt="Machine Back View"
                        className="w-full h-full object-contain"
                    />

                    {/* Main Check Areas - Circle + Triangle */}
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

                    {/* 4PCS Check Areas - All shapes */}
                    {pcsCheckAreas.map((area) => (
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
                                visibleShapes={[1, 2, 3]}
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

export default Page12;