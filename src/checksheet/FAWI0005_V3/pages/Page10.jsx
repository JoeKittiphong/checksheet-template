import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import WaveformImg from '@/assets/FAWI0005_V3/10_GALPM_Waveform.png';

function Page10() {

    // --- Top Parameter Table ---
    const paramTable10 = [
        { c: "C0004", on: "015", off: "024", ip: "0515", hrp: "000", mao: "000", sv: "+3.0", v: "0-4", sf: "1048", c_val: "0", pik: "000", wk: "020", wt: "160", ws: "105", wp: "240", pc: "0000" }
    ];

    const paramColumns10 = [
        { header: "", key: "c", width: "7%", className: "text-center" },
        { header: "ON", key: "on", width: "6%", className: "text-center" },
        { header: "OFF", key: "off", width: "6%", className: "text-center" },
        { header: "IP", key: "ip", width: "7%", className: "text-center" },
        { header: "HRP", key: "hrp", width: "6%", className: "text-center" },
        { header: "MAO", key: "mao", width: "6%", className: "text-center" },
        { header: "SV", key: "sv", width: "7%", className: "text-center" },
        { header: "V", key: "v", width: "7%", className: "text-center" },
        { header: "SF", key: "sf", width: "7%", className: "text-center" },
        { header: "C", key: "c_val", width: "5%", className: "text-center" },
        { header: "PIK", key: "pik", width: "6%", className: "text-center" },

        // Right side headers (border-left separator simulated by structure or just column)
        { header: "WK", key: "wk", width: "6%", className: "text-center border-l-2 border-l-black" },
        { header: "WT", key: "wt", width: "6%", className: "text-center" },
        { header: "WS", key: "ws", width: "6%", className: "text-center" },
        { header: "WP", key: "wp", width: "6%", className: "text-center" },
        { header: "PC", key: "pc", width: "6%", className: "text-center" },
    ];

    // --- Main Table (V0*-V4) ---
    const data10 = [
        { v: "V0*", ref_volt: "112V", measured_volt: "p10_v0_volt", ref_speed: "11.5~12.0", measured_speed: "p10_v0_speed", setting: "p10_v0_setting" },
        { v: "V1", ref_volt: "151V", measured_volt: "p10_v1_volt", ref_speed: "15.6~16.8", measured_speed: "p10_v1_speed", setting: "p10_v1_setting" },
        { v: "V2", ref_volt: "187V", measured_volt: "p10_v2_volt", ref_speed: "19.4~20.6", measured_speed: "p10_v2_speed", setting: "p10_v2_setting" },
        { v: "V3", ref_volt: "226V", measured_volt: "p10_v3_volt", ref_speed: "24.0~25.2", measured_speed: "p10_v3_speed", setting: "p10_v3_setting" },
        { v: "V4", ref_volt: "281V", measured_volt: "p10_v4_volt", ref_speed: "29.8~30.0", measured_speed: "p10_v4_speed", setting: "p10_v4_setting" },
    ];

    const columns10 = [
        { header: "V*", key: "v", width: "10%", className: "text-center bg-gray-300 font-bold" },
        { header: "Reference Voltage", key: "ref_volt", width: "15%", className: "text-center" },
        { header: "Measured Voltage (+2V)", key: "measured_volt", width: "20%", className: "text-center p-0", type: "input" },
        { header: "Reference Speed", key: "ref_speed", width: "15%", className: "text-center" },
        { header: "Measured Speed (mm/min)", key: "measured_speed", width: "20%", className: "text-center p-0", type: "input" },
        { header: "Data Setting", key: "setting", width: "20%", className: "text-center p-0", type: "input" },
    ];

    // --- 7.1 Table ---
    const data7_1 = [
        { item: "GALPM SIG CHG (ON10 OF 10 ~ ON 30 OF31)", std: "1.0", setting: "p10_galpm_setting", setting_min: 1.0, setting_max: 1.0, setting_expected: 1.0 }
    ];

    const columns7_1 = [
        { header: "Manage-Parameter-Discharge-11", key: "item", width: "60%", className: "pl-2" },
        { header: "Standard", key: "std", width: "20%", className: "text-center" },
        { header: "Data Setting", key: "setting", width: "20%", className: "text-center p-0", type: "input" },
    ];


    return (
        <A4Paper content={content} currentPage={10}>
            <div className="flex flex-col text-[10px] h-full relative">
                <div className="font-bold flex flex-col items-center justify-center text-[12px] mb-2">
                    <div className="w-full flex flex-col">
                        <span>Do not place work piece !!! (ห้ามวาง Work Piece)</span>
                        <span>Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)</span>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <SectionTitle className="mt-0 w-max">7. GALPM Voltage wave form check</SectionTitle>
                    <div className="flex gap-8 px-2 font-bold mb-1">
                        <span>Submerge</span>
                        <span>With out spark</span>
                    </div>
                </div>

                {/* Top Parameter Table */}
                <div className="mt-1">
                    <FormQuickTable columns={paramColumns10} data={paramTable10} headerClassName="font-bold border-b border-black" />
                </div>

                {/* Directions */}
                <div className="mt-2 pl-2">
                    <div className="grid grid-cols-[80px_1fr] gap-1">
                        <span>Direction :</span>
                        <div className="flex flex-col gap-1">
                            <span>1. Water Resisitivity : 5.0 - 5.2 x 10<sup className="text-[8px]">4</sup> Ω.cm (Checked by handy type Resistivity tester)</span>
                            <span>2. Wire Diameter : Ø0.2 mm</span>
                            <span>3. Water State : Submerge with low pressure flushing</span>
                            <span>4. AXIS Position : <span className="font-bold">X:Center Position   Y:120. (G959)   Z:40. (G959)</span></span>
                            <span>5. Check Point : Upper Guide (+) amd Work table (GND)</span>
                            <span>6. Adjust Position : Manage - Parameter - Discharge - P11 (GALPM MACHING V0-V4)</span>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <p>Check "Manage-Parameter-P3-individual machining SV compensation 19 = 0" before this check.</p>
                </div>

                {/* Main Table */}
                <div className="mt-2">
                    <FormQuickTable columns={columns10} data={data10} headerClassName="font-bold" />
                </div>

                {/* Waveform Image */}
                <div className="mt-2 flex flex-col items-center">
                    <img src={WaveformImg} alt="Waveform Adjustment" className="w-[80%] border border-black" />
                    <p className="mt-1 font-bold">"V0" วัดค่าได้ 104V =={'>'} แก้ไขค่า Data Setting ที่ GALPM MACHING V0 จนได้ 112V</p>
                </div>

                {/* 7.1 Cutting Speed */}
                <div className="mt-6">
                    <p className="font-bold mb-1">7.1 Cutting Speed adjustment <span className="font-normal">(Adjust the cutting speed follow to standard "V0" only.)</span></p>
                    <FormQuickTable columns={columns7_1} data={data7_1} headerClassName="font-bold bg-gray-300" />
                </div>

                {/* Remarks */}
                <div className="mt-2 text-[9px]">
                    <div className="flex items-start gap-1">
                        <span className="underline">Remark</span> :
                        <div className="flex flex-col gap-1">
                            <span>- ถ้าค่า Cutting Speed น้อยกว่า STD ให้<span className="underline">เพิ่มค่า</span> GALPM SIG CHG (ON10 OF 10 ~ ON 30 OF31) ให้<span className="underline">มากกว่า 1.0</span></span>
                            <span>- ถ้าค่า Cutting Speed มากกว่า STD ให้<span className="underline">ลดค่า</span> GALPM SIG CHG (ON10 OF 10 ~ ON 30 OF31) ให้<span className="underline">น้อยกว่า 1.0</span></span>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end mt-4 absolute bottom-[-90px]">
                    <FormCheckedBox name="p10_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page10;