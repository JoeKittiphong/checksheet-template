import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import ShapedCheckGroup from "@/components/FormComponents/ShapedCheckGroup";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import image
import page11Image from "@/assets/FAWI0038_V2/page11_machine_front_right.png";
import page11Image2 from "@/assets/FAWI0038_V2/page11_machine_front_left.png";

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
        { id: 1, name: "p11_c1", top: "15%", left: "-2%", label: "P11_C1" },        
        { id: 2, name: "p11_c2", top: "39%", left: "3%", label: "P11_C2" },        
        { id: 3, name: "p11_c3", top: "75%", left: "3%", label: "P11_C3" },        
        { id: 4, name: "p11_c4", top: "75%", left: "50%", label: "P11_C4" },        
        { id: 5, name: "p11_c5", top: "95%", left: "85%", label: "P11_C5" },        
        { id: 6, name: "p11_c6", top: "40%", left: "91%", label: "P11_C6" },        
        { id: 7, name: "p11_c7", top: "6%", left: "91%", label: "P11_C7" },        
        { id: 8, name: "p11_c8", top: "82%", left: "61%", label: "P11_C8" },        
    ];

    // Section 4: ด้านขวาของเครื่องจักร (bottom half)
    const section4Areas = [
        { id: 9, name: "p11_c9", top: "0%", left: "15%", label: "P11_C9" },  
        { id: 10, name: "p11_c10", top: "15%", left: "-2%", label: "P11_C10" },  
        { id: 11, name: "p11_c11", top: "57%", left: "2%", label: "P11_C11" },  
        { id: 12, name: "p11_c12", top: "89%", left: "12%", label: "P11_C12" },  
        { id: 13, name: "p11_c13", top: "90%", left: "66%", label: "P11_C13" },  
        { id: 14, name: "p11_c14", top: "90%", left: "87%", label: "P11_C14" },  
        { id: 15, name: "p11_c15", top: "42%", left: "85%", label: "P11_C15" },  
        { id: 16, name: "p11_c16", top: "25%", left: "79%", label: "P11_C16" },  
        { id: 17, name: "p11_c17", top: "12%", left: "91%", label: "P11_C17" },  
        { id: 18, name: "p11_c18", top: "3%", left: "67%", label: "P11_C18" },  
        { id: 19, name: "p11_c19", top: "-3%", left: "42%", label: "P11_C19" },  
        { id: 20, name: "p11_c20", top: "-3%", left: "30%", label: "P11_C20" },  
    ];
    const section5Areas = [
        
    ];


    return (
        <A4Paper content={content} currentPage={11}>
            <div className="p-1 flex flex-col h-full bg-white text-[10px]">
                <SectionTitle>4. ที่หน้าจอของเครื่องจักร (CNT UNIT)</SectionTitle>
                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="mb-2 flex-1 relative">
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

                    
                </div>

                <SectionTitle>5. ด้านหลังของเครื่องจักร</SectionTitle>
                {/* Main Image with Positioned ShapedCheckGroups */}
                <div className="flex-1 relative">
                    <img
                        src={page11Image2}
                        alt="Machine Front and Right View"
                        className="w-full h-full object-contain"
                    />

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

                    {/* Section 5 ShapedCheckGroups - Circle + Triangle */}
                    {section5Areas.map((area) => (
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