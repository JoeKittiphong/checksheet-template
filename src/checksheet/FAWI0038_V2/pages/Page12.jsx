import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import image
import page12Image from "@/assets/FAWI0038_V2/page12_machine_back.png";

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
        { id: 1, name: "p12_c1", top: "6%", left: "21%", label: "P12_C1" },
        { id: 2, name: "p12_c2", top: "3%", left: "75%", label: "P12_C2" },
        { id: 3, name: "p12_c3", top: "17%", left: "19%", label: "P12_C3" },
        { id: 4, name: "p12_c4", top: "49%", left: "0%", label: "P12_C4" },
        { id: 5, name: "p12_c5", top: "63%", left: "7%", label: "P12_C5" },
        { id: 6, name: "p12_c6", top: "64%", left: "60%", label: "P12_C6" },
        { id: 7, name: "p12_c7", top: "51%", left: "88%", label: "P12_C7" },
        { id: 8, name: "p12_c8", top: "37%", left: "92%", label: "P12_C8" },
        { id: 9, name: "p12_c9", top: "8%", left: "90%", label: "P12_C9" },
        { id: 10, name: "p12_c10", top: "71%", left: "91%", label: "P12_C10" },
        { id: 11, name: "p12_c11", top: "90%", left: "10%", label: "P12_C11" },
    ];

    // 4PCS check areas (□○△)
    const pcsCheckAreas = [
        { id: 12, name: "p12_c12", top: "55%", left: "10%", label: "P12_C12" },
    ];
    const pcsCheckAreas2 = [
        { id: 13, name: "p12_c13", top: "81.5%", left: "69.5%", label: "P12_C13" },
        { id: 14, name: "p12_c14", top: "85.5%", left: "69.5%", label: "P12_C14" },
        { id: 15, name: "p12_c15", top: "89.5%", left: "69.5%", label: "P12_C15" },
        { id: 16, name: "p12_c16", top: "94%", left: "69.5%", label: "P12_C16" },
    ];

    return (
        <A4Paper content={content} currentPage={12}>
            <SectionTitle>6. ด้านซ้ายของเครื่องจักร</SectionTitle>
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
                                visibleShapes={[3]}
                            />
                        </div>
                    ))}
                    {pcsCheckAreas2.map((area) => (
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
                                visibleShapes={[3]}
                                showCamera={false}
                            />
                        </div>
                    ))}
                </div>


                {/* FINISH GOOD CARD MACHINE Section */}
                <div className="absolute p-1 text-[10px]" style={{ top: "20%", left: "5%", width: "10%" }}>

                    <FormItemCheck
                        name={`${prefix}_machine_no_check`}
                        label="Machine No."
                        labelClassName="text-[10px]"
                        showCheckbox={false}
                        input={{ name: `${prefix}_machine_no_input`, width: "80px" }}
                    />
                    <FormItemCheck
                        name={`${prefix}_controller_no_check`}
                        label="Controller No."
                        labelClassName="text-[10px]"
                        showCheckbox={false}
                        input={{ name: `${prefix}_controller_no_input`, width: "80px" }}
                    />
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