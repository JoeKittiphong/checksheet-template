import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0008_V3-setting";

// Import image
import page8CheckImg from "@/assets/FAWI0008_V3/page8_check.png";
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
        // Top row
        { id: 1, name: "j44593b", top: "8%", left: "10%", label: "J44593B" },
        { id: 2, name: "j44593c", top: "-1%", left: "43%", label: "J44593C" },
        { id: 3, name: "j44593d", top: "0%", left: "78%", label: "J44593D" },
        { id: 4, name: "j44593e", top: "11%", left: "86%", label: "J44593E" },
        { id: 5, name: "j44593f", top: "22%", left: "23%", label: "J44593F" },
        { id: 6, name: "j44593g", top: "29%", left: "5%", label: "J44593G" },
        { id: 7, name: "j44593h", top: "37%", left: "24%", label: "J44593H" },
        { id: 8, name: "j44593i", top: "41%", left: "80%", label: "J44593I" },
        { id: 9, name: "j44593j", top: "58%", left: "79%", label: "J44593J" },
        { id: 10, name: "j44593k", top: "65%", left: "79%", label: "J44593K" },
        { id: 11, name: "j44593l", top: "83%", left: "65%", label: "J44593L" },
        //--
        
    ];
    const checkAreas2 = [
        { id: 12, name: "j44593m", top: "93%", left: "9%", label: "J44593M" },
        { id: 13, name: "j44593n", top: "93%", left: "28%", label: "J44593N" },
        { id: 14, name: "j44593o", top: "93%", left: "46%", label: "J44593O" },
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
                <h2 className='font-bold text-center mb-2'>Check  List  Sticker AL400G/AL600G (iG+E)</h2>
                <SectionTitle>1. ด้านหน้าของเครื่องจักร</SectionTitle>
                <SectionTitle>1.1 หน้าเครื่อง AL400G/AL600G (iG+E)</SectionTitle>
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
                    <div className="absolute p-1 text-[10px]" style={{ top: "40%", left: "90%", width: "18%" }}>
                        
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

export default Page8;