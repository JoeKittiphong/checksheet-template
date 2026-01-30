import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import HALTSTOPImg from '@/assets/FAWI0005_V3/9_11_HALTSTOP.png';

function Page9() {

    // Same columns from Page 7/8
    const paramColumns6_6 = [
        { header: "", key: "c", width: "6%", className: "text-center" },
        { header: "ON", key: "on", width: "6%", className: "text-center" },
        { header: "OFF", key: "off", width: "6%", className: "text-center" },
        { header: "IP", key: "ip", width: "6%", className: "text-center" },
        { header: "HRP", key: "hrp", width: "6%", className: "text-center" },
        { header: "MAO", key: "mao", width: "6%", className: "text-center" },
        { header: "SV", key: "sv", width: "6%", className: "text-center" },
        { header: "V", key: "v", width: "6%", className: "text-center" },
        { header: "SF", key: "sf", width: "6%", className: "text-center" },
        { header: "C", key: "c_val", width: "4%", className: "text-center" },
        { header: "PIK", key: "pik", width: "6%", className: "text-center" },
        { header: "CTRL", key: "ctrl", width: "6%", className: "text-center" },
        { header: "WT", key: "wt", width: "6%", className: "text-center" },
        { header: "WS", key: "ws", width: "6%", className: "text-center" },
        { header: "WP", key: "wp", width: "6%", className: "text-center" },
        { header: "PC", key: "pc", width: "6%", className: "text-center" },
    ];

    const cuttingColumns6_6 = [
        { header: "Cutting Condition", key: "cond", width: "10%", className: "text-center bg-gray-300 font-bold", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "Setting Data", key: "setting", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "H20 - H4", key: "h20", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "Wave Form", key: "wave", width: "10%", className: "text-center", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "F - Speed STD", key: "std", width: "10%", className: "text-center bg-gray-300 font-bold", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "F - Speed (mm/min)", key: "fspeed", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "Voltage (V)", key: "volt", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "Current (A)", key: "curr", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
        { header: "Voltmeter(LCD) STD", key: "lcd_std", width: "10%", className: "text-center font-bold bg-gray-300", headerClassName: "bg-gray-300 h-10 align-bottom text-[8px] leading-tight" },
        { header: "Volt Data (V)", key: "volt_data", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom leading-tight" },
    ];

    // --- 6.10 Data ---
    const paramTable6_10 = [
        { c: "C0616", on: "316", off: "001", ip: "0015", hrp: "000", mao: "000", sv: "+75.0", v: "4.0", sf: "9030", c_val: "0", pik: "000", ctrl: "0000", wt: "160", ws: "050", wp: "012", pc: "0000" }
    ];

    const cuttingTable6_10 = [
        {
            cond: "C0616",
            setting: "p9_c0616_setting",
            h20: "p9_c0616_h20",
            wave: "\\",
            std: "9.5~10.5",
            fspeed: "p9_c0616_fspeed",
            volt: "p9_c0616_volt",
            curr: "p9_c0616_curr",
            lcd_std: "90V",
            volt_data: "p9_c0616_volt_data"
        }
    ];

    return (
        <A4Paper content={content} currentPage={9}>
            <div className="flex flex-col text-[10px] h-full relative">

                {/* 6.10 C0616 SV DATA */}
                <div className="mt-1">
                    <div className="flex justify-between items-center">
                        <FormItemCheck name="p9_c0616_check" label="6.10 C0616 SV DATA Input Method" showCheckbox={true} className="font-bold" />
                        <div className="flex gap-8 px-2">
                            <span>Submerge</span>
                            <span>With out spark</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <FormQuickTable columns={paramColumns6_6} data={paramTable6_10} headerClassName="font-bold" />
                    </div>

                    <div className="mt-2 text-center">
                        <FormQuickTable columns={cuttingColumns6_6} data={cuttingTable6_10} />
                    </div>

                    <p className="mt-2">If the value displayed on the voltmeter (LCD) is other than 90, change the value of</p>
                    <p className="font-bold">Manage-Parameter-Discharge-P3-ALPM Maching V3</p>
                    <p className="text-gray-600">(ถ้าค่า Volt Meter(LCD) ไม่อยู่ในช่วง 90 ให้แก้ไขค่า Manage - Parameter - Disch - P3 - ALPM Maching V3)</p>
                </div>

                {/* 6.11 HALT STOP Check */}
                <div className="mt-6">
                    <FormItemCheck name="p9_halt_stop_check" label="6.11 HALT STOP Check (Save Wave Form) *** Non rust" showCheckbox={true} className="font-bold" />

                    <div className="flex items-start mt-4 pl-12">
                        <div className="flex flex-col items-center">
                            <p className="mb-2">HALT STOP Check</p>
                            <div className="border border-black max-w-[300px]">
                                <img src={HALTSTOPImg} alt="HALT STOP Check" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4">
                    <FormCheckedBox name="p9_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page9;