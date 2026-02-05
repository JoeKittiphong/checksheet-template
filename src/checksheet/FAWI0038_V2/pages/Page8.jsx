import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import image
import page8CheckImg from "@/assets/FAWI0038_V2/page8_check.png";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

const Page8 = () => {
    const prefix = "p08";
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

    // Check areas based on the image - positioned by approximate percentage
    const checkAreas = [
        { id: 1, name: "p8_c1", top: "2%", left: "9%", label: "P8_C1" },
        { id: 2, name: "p8_c2", top: "1%", left: "86%", label: "P8_C2" },
        { id: 3, name: "p8_c3", top: "10%", left: "92%", label: "P8_C3" },
        { id: 4, name: "p8_c4", top: "22%", left: "87%", label: "P8_C4" },
        { id: 5, name: "p8_c5", top: "21%", left: "-2%", label: "P8_C5" },
        { id: 6, name: "p8_c6", top: "11%", left: "-1%", label: "P8_C6" },
        { id: 7, name: "p8_c7", top: "30%", left: "-2%", label: "P8_C7" },
        { id: 11, name: "p8_c11", top: "81%", left: "72%", label: "P8_C11" },
    ];
    const checkAreas2 = [
        { id: 8, name: "p8_c8", top: "94%", left: "9%", label: "P8_C8" },        
        { id: 9, name: "p8_c9", top: "94%", left: "29%", label: "P8_C9" },        
        { id: 10, name: "p8_c10", top: "94%", left: "47%", label: "P8_C10" },        
    ]
        
    

    // Wire spec check items
    const wireSpec020 = [
        { name: "wire_guide_020", label: "- Dice(Color) Wire Guide 87-3 0.205" },
        { name: "dice_aq1u_020", label: "- Dice AQ-1U(T) 0.205" },
        { name: "awt_dice_020", label: "- AWT DICE (F)0.220" },
    ];

    const wireSpec025 = [
        { name: "wire_guide_025", label: "- Dice(Color) Wire Guide 87-3 0.255" },
        { name: "dice_aq1u_025", label: "- Dice AQ-1U(T) 0.255" },
        { name: "awt_dice_f_025", label: "- AWT DICE (F)0.270" },
        { name: "awt_dice_f2_025", label: "- AWT DICE(F)0.270" },
    ];

    return (
        <A4Paper content={content} currentPage={8}>
            <div className="p-1 flex flex-col h-full bg-white">
                <h2 className='font-bold text-center mb-2'>Check  List  Sticker ALC400G/ALC600G (iG+E)</h2>
                <SectionTitle>1. ด้านหน้าของเครื่องจักร</SectionTitle>
                <SectionTitle>1.1 หน้าเครื่อง ALC400G/ALC600G (iG+E)</SectionTitle>
                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page8CheckImg}
                        alt="Page 8 Check Areas"
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

                    {/* FINISH GOOD CARD MACHINE Section */}
                    <div className="absolute p-1 text-[10px]" style={{ top: "35%", left: "85%", width: "18%" }}>
                        
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

                    {/* Wire Spec 0.20 Section */}
                    <div className="mt-24 h-25 absolute bg-white border border-black p-1 text-[10px]" style={{ top: "36%", left: "2%", width: "22%" }}>
                        <div className="font-bold underline mb-0.5">Wire spec : 0.20</div>
                        {wireSpec020.map(item => (
                            <FormItemCheck
                                key={item.name}
                                name={`${prefix}_${item.name}`}
                                label={item.label}
                                labelClassName="text-[10px]"
                                checkboxSize="w-3 h-3"
                            />
                        ))}
                        <div className="mt-1 absolute" style={{ top: "100%", left: "0%", width: "22%" }}>
                            <ShapedCheckGroup
                                name={`${prefix}_wire_020_group`}
                                apiEndpoint={apiEndpoint}
                                extraData={{ ...extraData, part_name: "Wire Spec 0.20" }}
                                required={true}
                                visibleShapes={[2, 3]}
                            />
                        </div>
                    </div>

                    {/* Wire Spec 0.25 Section */}
                    <div className="mt-24 h-25 absolute bg-white border border-black p-2 text-[10px]" style={{ top: "36%", left: "26%", width: "22%" }}>
                        <div className="font-bold underline mb-0.5">Wire spec : 0.25</div>
                        {wireSpec025.map(item => (
                            <FormItemCheck
                                key={item.name}
                                name={`${prefix}_${item.name}`}
                                label={item.label}
                                labelClassName="text-[8px]"
                                checkboxSize="w-3 h-3"
                            />
                        ))}
                        <div className="mt-1 absolute" style={{ top: "100%", left: "0%", width: "22%" }}>
                            <ShapedCheckGroup
                                name={`${prefix}_wire_025_group`}
                                apiEndpoint={apiEndpoint}
                                extraData={{ ...extraData, part_name: "Wire Spec 0.25" }}
                                required={true}
                                visibleShapes={[2, 3]}
                            />
                        </div>
                    </div>
                </div>
                {/* Remark Section */}
                <div className="mt-5 p-1 text-[12px]">
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

export default Page8;