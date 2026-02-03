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
        { id: 2, name: "p10_c2", top: "15%", left: "79%", label: "P10_C2" },
        { id: 3, name: "p10_c3", top: "23%", left: "83%", label: "P10_C3" },        
        { id: 5, name: "p10_c5", top: "60%", left: "3%", label: "P10_C5" },
        { id: 6, name: "p10_c6", top: "81%", left: "3%", label: "P10_C6" },
        { id: 7, name: "p10_c7", top: "94%", left: "13%", label: "P10_C7" },
        { id: 8, name: "p10_c8", top: "94%", left: "39%", label: "P10_C8" },
        { id: 9, name: "p10_c9", top: "85%", left: "78%", label: "P10_C9" },
        { id: 10, name: "p10_c10", top: "60%", left: "90%", label: "P10_C10" },
    ];
    const checkAreas2 = [
        //---
        { id: 4, name: "p10_c4", top: "45%", left: "6%", label: "P10_C4" },
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