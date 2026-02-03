import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import { content, apiEndpoint } from "../FAWI0008_V3-setting";

// Import images
import msControllerDiagram from "@/assets/FAWI0008_V3/ms_controller_diagram.png";
import zSideBoxCheck from "@/assets/FAWI0008_V3/z_side_box_check.png";

const Page7 = () => {
    const prefix = "p07";
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

    // Check items 4.1 - 4.6
    const checkItems = [
        { id: "4.1", name: "check_4_1", label: "4.1 ตรวจสอบภายใน MS Controller Screw,Part, Cable tie จะต้องไม่มีตกอยู่ภายใน" },
        { id: "4.2", name: "check_4_2", label: "4.2 ตรวจสอบการประกอบ Terminal Cover (Upper)" },
        { id: "4.3", name: "check_4_3", label: "4.3 ตรวจสอบการประกอบ Terminal Cover (Lower)" },
        { id: "4.4", name: "check_4_4", label: "4.4 ประกอบ Cable - E ที่ MSC PANEL" },
        { id: "4.5", name: "check_4_5", label: "4.5 ประกอบ Connector CN-FAN(MS)" },
        { id: "4.6", name: "check_4_6", label: "4.6 Confirm Mark สีขาวที่ Connector" },
    ];

    // ShapedCheckGroup areas (from bottom images)
    const checkAreas = [
        { id: 1, name: "arm_right_1", label: "ARM Right 1" },
        { id: 2, name: "arm_right_2", label: "ARM Right 2" },
        { id: 3, name: "arm_v_left", label: "ARM V Left" },
        { id: 4, name: "z_side_box", label: "Z Side Box" },
    ];

    return (
        <A4Paper content={content} currentPage={7}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Header */}
                <SectionTitle>4. MS CONTROLLER and Z Side Box R,L Check (ตรวจสอบการประกอบและความเรียบร้อย)</SectionTitle>

                {/* Main Content - Two Column Layout */}
                <div className="flex gap-2 flex-1">
                    {/* Left Column - Diagram */}
                    <div className="w-[45%]">
                        <img
                            src={msControllerDiagram}
                            alt="MS Controller Diagram"
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Right Column - Check Items */}
                    <div className="w-[55%] flex flex-col">
                        {/* Note */}
                        <div className="text-[12px] mb-1 underline font-bold">
                            ในกรณีที่ MSC PANEL ประกอบจาก Final Inspection แล้ว<br />
                            หัวข้อที่ *4.1 - *4.6 ไม่ต้องตรวจสอบ
                        </div>

                        {/* Check Items */}
                        <div className="space-y-0.5">
                            {checkItems.map(item => (
                                <FormItemCheck
                                    key={item.id}
                                    name={`${prefix}_${item.name}`}
                                    label={item.label}
                                    labelClassName="text-[9px]"
                                    checkboxClassName="scale-[0.7]"
                                />
                            ))}
                        </div>

                        {/* Inspector Section */}
                        <div className="mt-2 flex justify-end gap-2 text-[10px]">
                            <FormCheckedBox
                                name={`${prefix}_inspector`}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Z Side Box Images */}
                <div className="mt-10">
                    <div className="flex gap-1 text-[12px] font-bold mb-1">
                        <div className="w-1/2">Check ARM and Z Side Box Right</div>
                        <div className="w-1/2">Check ARM V and Z Side Box Left</div>
                    </div>

                    {/* Images with ShapedCheckGroup */}
                    <div className="flex gap-1">
                        <div className="flex-1 relative">
                            <img
                                src={zSideBoxCheck}
                                alt="Z Side Box Check"
                                className="w-full h-auto object-contain"
                            />
                            {/* Positioned ShapedCheckGroups */}
                            <div className="absolute bottom-[-8%] left-[12%] bg-white/90 rounded px-0.5">
                                <ShapedCheckGroup
                                    name={`${prefix}_${checkAreas[0].name}`}
                                    apiEndpoint={apiEndpoint}
                                    extraData={{ ...extraData, part_name: checkAreas[0].label }}
                                    required={true}
                                />
                            </div>
                            <div className="absolute bottom-[-8%] left-[31%] bg-white/90 rounded px-0.5">
                                <ShapedCheckGroup
                                    name={`${prefix}_${checkAreas[1].name}`}
                                    apiEndpoint={apiEndpoint}
                                    extraData={{ ...extraData, part_name: checkAreas[1].label }}
                                    required={true}
                                />
                            </div>
                            <div className="absolute bottom-[-8%] left-[60%] bg-white/90 rounded px-0.5">
                                <ShapedCheckGroup
                                    name={`${prefix}_${checkAreas[2].name}`}
                                    apiEndpoint={apiEndpoint}
                                    extraData={{ ...extraData, part_name: checkAreas[2].label }}
                                    required={true}
                                />
                            </div>
                            <div className="absolute bottom-[3%] right-[0%] bg-white/90 rounded px-0.5">
                                <ShapedCheckGroup
                                    name={`${prefix}_${checkAreas[3].name}`}
                                    apiEndpoint={apiEndpoint}
                                    extraData={{ ...extraData, part_name: checkAreas[3].label }}
                                    required={true}
                                />
                            </div>
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

export default Page7;