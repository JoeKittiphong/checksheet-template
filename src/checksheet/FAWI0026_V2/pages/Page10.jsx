import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0026_V2-setting";

// Import image
import page10MachineLeft from "@/assets/FAWI0026_V2/page10_machine_left.png";

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
        { id: 1, name: "118099a", top: "-3%", left: "77%", label: "118099A (2 PCS)" },
        { id: 2, name: "95007za", top: "-1%", left: "23%", label: "95007ZA (2 pcs)" },
        { id: 3, name: "option_wire_feeder", top: "-2%", left: "50%", label: "Option Wire Feeder 20kg" },

        // Right side - top
        { id: 4, name: "951023", top: "10%", left: "91%", label: "951023" },
        { id: 5, name: "95003yb", top: "25%", left: "91%", label: "95003YB" },

        // Left side 
        { id: 6, name: "950713", top: "33%", left: "21%", label: "950713" },

        // Middle - J08477H
        { id: 7, name: "j08477h", top: "42%", left: "86%", label: "J08477H (เฉพาะ USA)" },

        // Fork area
        { id: 8, name: "950835c", top: "52%", left: "80%", label: "950835C (Japan)" },
        { id: 9, name: "fork_left", top: "57%", left: "9%", label: "FORK Left" },
        { id: 10, name: "fork_japan", top: "73%", left: "30%", label: "Japan Fork Sticker" },

        // Bottom left - Jumbo Feeder
        { id: 11, name: "jumbo_feeder", top: "70%", left: "11%", label: "Jumbo Feeder Cover" },

        { id: 13, name: "jumbo_20kg", top: "95%", left: "17%", label: "Jumbo Feeder 20 kg" },


        // Right side - Grease UP
        { id: 14, name: "grease_up", top: "59%", left: "80%", label: "Grease UP P type 950639" },

        // Bottom right
        { id: 15, name: "grease", top: "74%", left: "90%", label: "Grease" },
        { id: 16, name: "950447a", top: "92%", left: "90%", label: "950447A" },


    ];
    const checkAreas2 = [
        //---
        { id: 12, name: "pvc_clear", top: "63%", left: "41%", label: "PVC Clear Option" },
        //---
    ]
    const checkAreas3 = [
        // Cable check table area
        { id: 17, name: "cable_check_1", top: "83%", left: "69%", label: "Cable Check 1" },
        { id: 18, name: "cable_check_2", top: "87%", left: "69%", label: "Cable Check 2" },
        { id: 19, name: "cable_check_3", top: "91%", left: "69%", label: "Cable Check 3" },
        { id: 20, name: "cable_check_4", top: "95%", left: "69%", label: "Cable Check 4" },
    ]

    return (
        <A4Paper content={content} currentPage={10}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <SectionTitle>2. ด้านซ้ายของเครื่องจักร</SectionTitle>

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
                                visibleShapes={[3]}
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
                                visibleShapes={[3]}
                                showCamera={false}
                            />
                        </div>
                    ))}

                    {/* Model (EL) and Serial No.(EL) Section */}
                    <div className="absolute p-1 text-[10px]" style={{ top: "12%", left: "1%", width: "15%" }}>
                        <FormItemCheck
                            name={`${prefix}_model_el_check`}
                            label="Model (EL)"
                            labelClassName="text-[10px]"
                            showCheckbox={false}
                            input={{ name: `${prefix}_model_el_input`, width: "70px" }}
                        />
                        <FormItemCheck
                            name={`${prefix}_serial_no_el_check`}
                            label="Serial No.(EL)"
                            labelClassName="text-[10px]"
                            showCheckbox={false}
                            input={{ name: `${prefix}_serial_no_el_input`, width: "70px" }}
                        />
                    </div>
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

export default Page10;