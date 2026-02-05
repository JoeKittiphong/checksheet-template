import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import image
import page10MachineLeft from "@/assets/FAWI0038_V2/page10_machine_left.png";

const Page10 = () => {
    const prefix = "p10";
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
        // Top section
        { id: 1, name: "p10_c1", top: "16%", left: "39%", label: "P10_C1" },
        { id: 2, name: "p10_c2", top: "16%", left: "83%", label: "P10_C2" },
        { id: 3, name: "p10_c3", top: "25%", left: "91%", label: "P10_C3" },
        { id: 4, name: "p10_c4", top: "38%", left: "71%", label: "P10_C4" },
        { id: 5, name: "p10_c5", top: "27%", left: "40%", label: "P10_C5" },
        { id: 6, name: "p10_c6", top: "31%", left: "22%", label: "P10_C6" },
        { id: 7, name: "p10_c7", top: "67%", left: "-2%", label: "P10_C7" },
        { id: 8, name: "p10_c8", top: "76%", left: "4%", label: "P10_C8" },
        { id: 9, name: "p10_c9", top: "85%", left: "4%", label: "P10_C9" },
        { id: 10, name: "p10_c10", top: "93%", left: "35%", label: "P10_C10" },
        { id: 11, name: "p10_c11", top: "96%", left: "64%", label: "P10_C11" },
    ];
    const checkAreas2 = [
        //---
        { id: 12, name: "p10_c12", top: "73%", left: "84%", label: "P10_C12" },
        //---
    ]
    const checkAreas3 = [
        //---
        { id: 13, name: "p10_c13", top: "55%", left: "87%", label: "P10_C13" },
        { id: 14, name: "p10_c14", top: "55%", left: "72%", label: "P10_C14" },
        { id: 15, name: "p10_c15", top: "76%", left: "56%", label: "P10_C15" },
        { id: 16, name: "p10_c16", top: "76%", left: "67%", label: "P10_C16" },
        //---
    ]

    return (
        <A4Paper content={content} currentPage={10}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <SectionTitle>2.2 ด้านในของเครื่องจักร (ด้านซ้าย)</SectionTitle>

                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page10MachineLeft}
                        alt="Machine Left Side"
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
                    {checkAreas2.map((area) => (
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
                    {checkAreas3.map((area) => (
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
                                visibleShapes={[1]}
                                showCamera={false}
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

export default Page10;