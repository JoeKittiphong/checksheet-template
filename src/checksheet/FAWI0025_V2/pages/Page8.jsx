import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0025_V2-setting";

// Import image
import page8CheckImg from "@/assets/FAWI0025_V2/page8_check.png";

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
        { id: 1, name: "j44593b", top: "5%", left: "3%", label: "J44593B" },
        { id: 2, name: "j73699a", top: "-1%", left: "35%", label: "J73699A" },
        { id: 3, name: "ts9770a", top: "-1%", left: "90%", label: "TS9770A" },
        { id: 4, name: "ts9773a", top: "7%", left: "90%", label: "TS9773A" },

        // Middle section - Window area
        { id: 5, name: "window_1", top: "48%", left: "6%", label: "Window Check 1" },

        // ALN400G middle
        { id: 6, name: "aln400g", top: "26%", left: "89%", label: "ALN400G" },

        // Finish Good Card Machine
        { id: 7, name: "finish_good", top: "38%", left: "81%", label: "Finish Good Card" },

        
        { id: 12, name: "lock_check", top: "97%", left: "38%", label: "Instruction Lock ARM" },
    ];

    const checkAreas2 = [
        // Position Lock / Stopper (bottom right)
        { id: 8, name: "position_lock", top: "75%", left: "60%", label: "Position Lock" },
        { id: 9, name: "stopper_supply", top: "75%", left: "78%", label: "Stopper Supply Tank" },

        // Bolt Hole / Instruction
        { id: 10, name: "bolt_hole", top: "95%", left: "60%", label: "Bolt Hole Cap Sheet" },
        { id: 11, name: "instruction_lock", top: "95%", left: "78%", label: "Instruction Lock ARM" },
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
                            />
                        </div>
                    ))}

                    {/* FINISH GOOD CARD MACHINE Section */}
                    <div className="absolute p-1 text-[10px]" style={{ top: "46%", left: "82%", width: "18%" }}>
                        
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
                    <div className="mt-24 h-25 absolute bg-white border border-black p-1 text-[10px]" style={{ top: "54%", left: "2%", width: "22%" }}>
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
                    <div className="mt-24 h-25 absolute bg-white border border-black p-2 text-[10px]" style={{ top: "54%", left: "26%", width: "22%" }}>
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