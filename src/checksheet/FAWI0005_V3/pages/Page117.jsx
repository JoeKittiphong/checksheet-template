import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

// Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Assets
import diagramTop from "@/assets/FAWI0005_V3/page114_diagram_top.png";
import diagramBottom from "@/assets/FAWI0005_V3/page114_diagram_bottom.png";

function Page117() {

    // Config for FinalEDWwireCheck
    const checkItems = [
        { label: "Disch-Page5-[[163]PULSE CONVERT ON 02]=", key: "p117_check1" },
        { label: "Disch-Page5-[[193] MODIFY P.CONVERT TM(W) PC0_8]=", key: "p117_check2" },
        { label: "Disch-Page5-[[194] MODIFY P.CONVERT TM(W) PC9]=", key: "p117_check3" },
        { label: "Disch-Page3 -[MODIFY WORKING CORE SV18]=           => (ห้ามแก้ไขก่อนแจ้ง ENG)", key: "p117_check4" },
        { label: "Disch-Page3 -[MODIFY WORKING CORE SV19]=           => (ห้ามแก้ไขก่อนแจ้ง ENG)", key: "p117_check5" },
        { label: "Disch-Page4-[[148]  DPW PC02-22 V7]=           (For 5th Cutting)      => (ห้ามแก้ไขก่อนแจ้ง ENG)", key: "p117_check6" },
        { label: "Disch-Page4-[[149]  DPW PC02-22 V8]=           (For 5th Cutting)      => (ห้ามแก้ไขก่อนแจ้ง ENG)", key: "p117_check7" },
        { label: "Disch-Page4-[[135]  DPW PC01-21 V4]=           (For 7th Cutting)", key: "p117_check8" },
        { label: "Disch-Page4-[[136]  DPW PC01-21 V5]=           (For 7th Cutting)", key: "p117_check9" },
        { label: "Disch-Page4-[[137]  DPW PC01-21 V6]=           (For 6th Cutting)", key: "p117_check10" },
        { label: "Disch-Page4-[[138]  DPW PC01-21 V7]=           (For 6th Cutting)", key: "p117_check11" },
    ];

    // Config for EDWFinalRecordCutting
    const cuttingRows = [
        { id: "C0001", stdKey: "c0001", voltage_key: "p117_c1_v", current_key: "p117_c1_a", speed_key: "p117_c1_spd", time_label: "H071=", placeholderV: "H121", placeholderA: "H141", placeholderSpeed: "H101" },
        { id: "C0002", stdKey: "c0002", voltage_key: "p117_c2_v", current_key: "p117_c2_a", speed_key: "p117_c2_spd", time_label: "H072=", placeholderV: "H124", placeholderA: "H144", placeholderSpeed: "H104" },
        { id: "C0003", stdKey: "c0003", voltage_key: "p117_c3_v", current_key: "p117_c3_a", speed_key: "p117_c3_spd", time_label: "H073=", placeholderV: "H125", placeholderA: "H145", placeholderSpeed: "H105" },
        { id: "C0004", stdKey: "c0004", voltage_key: "p117_c4_v", current_key: "p117_c4_a", speed_key: "p117_c4_spd", time_label: "H074=", placeholderV: "H128", placeholderA: "H148", placeholderSpeed: "H108" },
        { id: "C0905", stdKey: "c0905", voltage_key: "p117_c5_v", current_key: "p117_c5_a", speed_key: "p117_c5_spd", time_label: "H075=", disabled: { current: true }, placeholderV: "H129", placeholderSpeed: "H109" },
        { id: "C0906", stdKey: "c0906", voltage_key: "p117_c6_v", current_key: "p117_c6_a", speed_key: "p117_c6_spd", time_label: "H076=", disabled: { current: true }, placeholderV: "H132", placeholderSpeed: "H112" },
        { id: "C0907", stdKey: "c0907", voltage_key: "p117_c7_v", current_key: "p117_c7_a", speed_key: "p117_c7_spd", time_label: "H077=", disabled: { current: true }, placeholderV: "H133", placeholderSpeed: "H113" },
        { id: "Wire broken", isFooter: true, key: "p117_wire_broken", time_key: "p117_h081_time", speed_key: "p117_time_s", timeLabel: "H081=" }
    ];

    const page117Standards = {
        c0001: { v: "25~28", a: "11~14", speed: "4.8~5.4", time: "H071= 07:40~08:40" },
        c0002: { v: "60~66", a: "0.4~1.0", speed: "2.0~3.0", time: "H072= 10:30~13:00" },
        c0003: { v: "43~48", a: "0.2~0.6", speed: "6.5~8.5", time: "H073= 03:50~04:50" },
        c0004: { v: "9~15", a: "0.2~0.7", speed: "4.0~9.0", time: "H074= 05:30~08:10" },
        c0905: { v: "5~40", a: "-", speed: "8.5~9.5", time: "H075= 03:30~04:30" },
        c0906: { v: "22~37", a: "-", speed: "5.9~6.1", time: "H076= 05:50~06:00" },
        c0907: { v: "10~25", a: "-", speed: "4.9~5.1", time: "H077= 06:55~07:05" },
        totalTime: "H081= 45:00~51:00"
    };

    const standardRows = [
        { v: "25~28", a: "11~14", speed: "4.8~5.4", time: "H071= 07:40~08:40", className: "text-[9px] font-bold" },
        { v: "60~66", a: "0.4~1.0", speed: "2.0~3.0", time: "H072= 10:30~13:00", className: "text-[9px] font-bold" },
        { v: "43~48", a: "0.2~0.6", speed: "6.5~8.5", time: "H073= 03:50~04:50", className: "text-[9px] font-bold" },
        { v: "9~15", a: "0.2~0.7", speed: "4.0~9.0", time: "H074= 05:30~08:10", className: "text-[9px] font-bold" },
        { v: "5~40", a: "-", speed: "8.5~9.5", time: "H075= 03:30~04:30", className: "text-[9px] font-bold" },
        { v: "22~37", a: "-", speed: "5.9~6.1", time: "H076= 05:50~06:00", className: "text-[9px] font-bold" },
        { v: "10~25", a: "-", speed: "4.9~5.1", time: "H077= 06:55~07:05", className: "text-[9px] font-bold" },
        { v: "", a: "", speed: "", time: "H081= 45:00~51:00", className: "text-[9px] bg-green-500 font-bold" }
    ];

    return (
        <A4Paper content={content} currentPage={117}>
            <div className="relative text-[10px] font-sans">
                <SectionTitle>24.5 For 0.20mm Wire Cutting Data CUT-4 (ACR2-20mm-7th)</SectionTitle>
                <div className='flex mb-17'>
                    <div>
                        {checkItems.map((item) => (
                            <p key={item.key} name={item.key}>{item.label}</p>
                        ))}
                    </div>
                    <div className="flex items-end ml-2">
                        <div className="w-full">
                            <FinalEDWwireCheck
                                items={checkItems}
                                prefix="p117_"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute top-34 left-40 w-1/3 flex items-center justify-start pt-2">
                    <div className="text-red-600 font-bold text-[10px]">Check point of Cutting Data</div>
                    <img src={diagramTop} alt="Cutting Diagram" className="h-[100px]" />
                </div>

                <div>
                    <EDWFinalRecordCutting
                        prefix="p117_"
                        dataRows={cuttingRows}
                        standardRows={standardRows}
                        standards={page117Standards}
                        lastTimeRow={{ label: "H081=", std: "H081= 45:00~51:00", key: "p117_h081_time" }} // Added support for H081 if component supports it, or custom
                    />
                    {/* If component doesn't support the extra H081 row naturally, we might need to append it or check how Page107 handled "Wire Broken". */}
                    <div className="flex gap-4 items-center mt-2 text-xs">
                        <FormItemCheck name="p117_wb_upper" label="Upper Guide" />
                        <FormItemCheck name="p117_wb_lower" label="Lower Guide" />
                        <FormItemCheck name="p117_wb_work" label="Work Piece" />
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-s">Record measured data to fallowing</h3>
                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <h4 className="font-bold text-xs underline mb-1">Roughness (Ra <span style={{ fontFamily: 'serif' }}>μ</span>m)</h4>
                            <EDWFinalRoughnessCheck
                                prefix="p117_ra_"
                                variant="4th"
                                headerSuffix="(7th)"
                                standards={{
                                    range: "0.15 ~ 0.20",
                                    inputs: {
                                        Up: { x_minus: true, x_plus: true },
                                        Mid: { x_minus: true, x_plus: true },
                                        Low: { x_minus: true, x_plus: true }
                                    }
                                }}
                            />
                        </div>
                        <div className="w-1/3">
                            <h4 className="font-bold text-xs underline mb-1">Roughness (Rz Din <span style={{ fontFamily: 'serif' }}>μ</span>m)</h4>
                            <EDWFinalRoughnessCheck
                                prefix="p117_rz_"
                                variant="4th" // Reusing 4th variant logic or generic if suited. 4th usually implies specific input pattern.
                                headerSuffix="(7th)"
                                standards={{
                                    range: "~ 1.9",
                                    inputs: {
                                        Up: { x_minus: true, x_plus: true },
                                        Mid: { x_minus: true, x_plus: true },
                                        Low: { x_minus: true, x_plus: true }
                                    }
                                }}
                            />
                            <div className="text-[10px] mt-1">(Have priority "Ra " value over "RzDIN")</div>
                        </div>
                        <div className="w-1/3 flex flex-col justify-between">
                            <div className="text-[10px] text-right mb-2">Before Cutting Check (LINK communication)</div>
                            <div className="border border-black text-center text-xs p-1 mb-2">
                                <div className="grid grid-cols-4 border-b border-black">
                                    <div className="col-span-2 border-r border-black">Check of Manage - Check - Motor I/O - Page7</div>
                                    <div className="border-r border-black bg-gray-200">STD</div>
                                    <div className="bg-gray-200">ACT</div>
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className="border-r border-black p-1">#80061</div>
                                    <div className="border-r border-black p-1">IO Retry</div>
                                    <div className="border-r border-black p-1">0</div>
                                    <div className="p-1"><input type="text" className="w-full text-center" /></div>
                                </div>
                            </div>
                            <div className="text-[10px] text-red-600 mb-4">ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</div>
                            <div className="text-xs">
                                Wire Lot No. <input type="text" className="border-b border-black w-32" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/3">
                        <h3 className="font-bold text-sm mb-1">Size (Record measured data only)</h3>
                        <EDWFinalSizeRecord
                            prefix="p117_size_"
                            variant="4th"
                            headerSuffix="(7th)"
                            standards={{
                                range: "7.9980~8.0020",
                                x_minus: "7.9980~8.0020",
                                y: "7.9980~8.0020"
                            }}
                        />
                    </div>
                    <div className="w-2/3 flex justify-center items-end">
                        <img src={diagramBottom} alt="Measurement Diagram" className="h-[160px]" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page117;