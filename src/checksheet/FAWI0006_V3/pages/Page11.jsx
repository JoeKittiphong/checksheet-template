import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0006_V3-setting";

// Import image
import page11Image from "@/assets/FAWI0006_V3/page11_machine_front_right.png";

const Page11 = () => {
    const prefix = "p11";
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

    // Section 3: ที่หน้าจอของเครื่องจักร (top half)
    const section3Areas = [
        { id: 1, name: "screen_1", top: "-1%", left: "8%", label: "Screen Check 1" },
        { id: 2, name: "ext_memory", top: "18%", left: "1%", label: "EXT.Memory" },
        { id: 3, name: "light", top: "37%", left: "40%", label: "LIGHT" },
        { id: 4, name: "remocon", top: "34%", left: "56%", label: "REMOCON" },
        { id: 5, name: "538663", top: "23%", left: "70%", label: "538663" },//---
        { id: 6, name: "118099a_s3", top: "-2%", left: "72%", label: "118099A" },
        { id: 7, name: "95007za_s3", top: "10%", left: "72%", label: "95007ZA" },
    ];

    // Section 4: ด้านขวาของเครื่องจักร (bottom half)
    const section4Areas = [
        { id: 8, name: "maker_tie_a", top: "34%", left: "6%", label: "Maker tie โดย A" },
        { id: 9, name: "maker_a", top: "37%", left: "24%", label: "Maker A" },
        { id: 10, name: "maker_b", top: "57%", left: "10%", label: "Maker B" },
        // { id: 11, name: "sticker_5", top: "39%", left: "66%", label: "Sticker มี 5 ชิ้นครบ" },
        { id: 12, name: "std_ts1674b", top: "45%", left: "74%", label: "STD: TS1674B" },
        { id: 13, name: "foam_sheet", top: "90%", left: "10%", label: "Foam Sheet Bed Cover" },
        { id: 14, name: "950447a_s4", top: "93%", left: "41%", label: "950447A" },
        { id: 15, name: "950835c_s4", top: "94%", left: "56%", label: "950835C (2 PCS)" },
        { id: 16, name: "fork_japan_s4", top: "93%", left: "85%", label: "Japan Fork Sticker" },
        { id: 17, name: "shatter_proof", top: "64%", left: "84%", label: "Shatter Proof Sheet A" },
    ];


    return (
        <A4Paper content={content} currentPage={11}>
            <SectionTitle>3. ที่หน้าจอของเครื่องจักร</SectionTitle>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page11Image}
                        alt="Machine Front and Right View"
                        className="w-full h-full object-contain"
                    />

                    {/* Section 3 ShapedCheckGroups - Circle + Triangle */}
                    {section3Areas.map((area) => (
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

                    {/* Section 4 ShapedCheckGroups - Circle + Triangle */}
                    {section4Areas.map((area) => (
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

                    {/* Model EL / Serial No. Section */}
                    <div className="absolute p-1 text-[10px]" style={{ top: "38%", left: "84%", width: "18%" }}>
                        <FormItemCheck
                            name={`${prefix}_model_el_check`}
                            label="Model EL."
                            labelClassName="text-[10px]"
                            showCheckbox={false}
                            input={{ name: `${prefix}_model_el_input`, width: "80px" }}
                        />
                        <FormItemCheck
                            name={`${prefix}_serial_no_check`}
                            label="Serial No."
                            labelClassName="text-[10px]"
                            showCheckbox={false}
                            input={{ name: `${prefix}_serial_no_input`, width: "80px" }}
                        />
                    </div>
                </div>

                {/* Remark Section */}
                <div className="mt-1 p-1 text-[12px]">
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

export default Page11;