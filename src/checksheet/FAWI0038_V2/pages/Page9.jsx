import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import image
import page9MachineFront from "@/assets/FAWI0038_V2/page9_machine_front.png";

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
        { id: 1, name: "p9_c1", top: "13%", left: "5%", label: "P9_C1" },
        { id: 2, name: "p9_c2", top: "39%", left: "5%", label: "P9_C2" },
        { id: 3, name: "p9_c3", top: "5%", left: "88%", label: "P9_C3" },
        { id: 4, name: "p9_c4", top: "24%", left: "89%", label: "P9_C4" },
        { id: 5, name: "p9_c5", top: "42%", left: "81%", label: "P9_C5" },
        { id: 6, name: "p9_c6", top: "50%", left: "28%", label: "P9_C6" },
        { id: 7, name: "p9_c7", top: "54%", left: "11%", label: "P9_C7" },
        { id: 8, name: "p9_c8", top: "81%", left: "9%", label: "P9_C8" },
        { id: 9, name: "p9_c9", top: "96%", left: "38%", label: "P9_C9" },
        { id: 10, name: "p9_c10", top: "52%", left: "83%", label: "P9_C10" },
        { id: 11, name: "p9_c11", top: "61%", left: "83%", label: "P9_C11" },
        { id: 12, name: "p9_c12", top: "71%", left: "83%", label: "P9_C12" },
        { id: 13, name: "p9_c13", top: "82%", left: "83%", label: "P9_C13" },
        { id: 14, name: "p9_c14", top: "91%", left: "88%", label: "P9_C14" },
        { id: 15, name: "p9_c15", top: "99%", left: "88%", label: "P9_C15" },
    ];

    return (
        <A4Paper content={content} currentPage={9}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <SectionTitle>2. ด้านในของเครื่องจักร</SectionTitle>
                <SectionTitle>2.1 ด้านในของเครื่องจักร (ด้านหน้า)</SectionTitle>

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

export default Page9;