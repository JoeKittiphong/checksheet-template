import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import ALPMC615Img from '@/assets/FAWI0005_V3/8_9_ALPMC615.png';

function Page8() {

    // Same columns as Page 7
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

    // --- 6.8 Data ---
    const paramTable6_8 = [
        { c: "C0614", on: "316", off: "001", ip: "0015", hrp: "000", mao: "000", sv: "+43.0", v: "2.0", sf: "9030", c_val: "0", pik: "000", ctrl: "0000", wt: "160", ws: "050", wp: "012", pc: "0000" }
    ];

    const cuttingTable6_8 = [
        {
            cond: "C0614",
            setting: "p8_c0614_setting",
            h20: "p8_c0614_h20",
            wave: "\\",
            std: "11.2~11.9",
            fspeed: "p8_c0614_fspeed",
            volt: "p8_c0614_volt",
            curr: "p8_c0614_curr",
            lcd_std: "61V",
            volt_data: "p8_c0614_volt_data"
        }
    ];

    // --- 6.9 Data ---
    const paramTable6_9 = [
        { c: "C0615", on: "316", off: "001", ip: "0015", hrp: "000", mao: "000", sv: "+54.0", v: "3.0", sf: "9030", c_val: "0", pik: "000", ctrl: "0000", wt: "160", ws: "050", wp: "012", pc: "0000" }
    ];

    const cuttingTable6_9 = [
        {
            cond: "C0615",
            setting: "p8_c0615_setting",
            h20: "p8_c0615_h20",
            wave: "SAVE",
            std: "12.8~13.5",
            fspeed: "p8_c0615_fspeed",
            volt: "p8_c0615_volt",
            curr: "p8_c0615_curr",
            lcd_std: "74V",
            volt_data: "p8_c0615_volt_data"
        }
    ];


    return (
        <A4Paper content={content} currentPage={8}>
            <div className="flex flex-col text-[10px] h-full relative">

                {/* 6.8 C0614 SV DATA */}
                <div className="mt-1">
                    <div className="flex justify-between items-center">
                        <FormItemCheck name="p8_c0614_check" label="6.8 C0614 SV DATA Input Method" showCheckbox={true} className="font-bold" />
                        <div className="flex gap-8 px-2">
                            <span>Submerge</span>
                            <span>With out spark</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <FormQuickTable columns={paramColumns6_6} data={paramTable6_8} headerClassName="font-bold" />
                    </div>

                    <div className="mt-2 text-center">
                        <FormQuickTable columns={cuttingColumns6_6} data={cuttingTable6_8} />
                    </div>

                    <p className="mt-2">If the value displayed on the voltmeter (LCD) is other than 62V, change the value of</p>
                    <p className="font-bold">Manage-Parameter-Discharge-P3-ALPM Maching V2</p>
                    <p className="text-gray-600">(ถ้าค่า Volt Meter(LCD) ไม่อยู่ในช่วง 61 ให้แก้ไขค่า Manage - Parameter - Disch - P3 - ALPM Maching V2)</p>
                </div>

                {/* 6.9 C0615 SV DATA */}
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <FormItemCheck name="p8_c0615_check" label="6.9 C0615 SV DATA Input Method (Save Wave Form)" showCheckbox={true} className="font-bold" />
                        <div className="flex gap-8 px-2">
                            <span>Submerge</span>
                            <span>With out spark</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <FormQuickTable columns={paramColumns6_6} data={paramTable6_9} headerClassName="font-bold" />
                    </div>

                    <div className="mt-2 text-center">
                        <FormQuickTable columns={cuttingColumns6_6} data={cuttingTable6_9} />
                    </div>

                    <p className="mt-2">If the value displayed on the voltmeter (LCD) is other than 74, change the value of</p>
                    <p className="font-bold">Manage-Parameter-Discharge-P3-ALPM Maching V3</p>
                    <p className="text-gray-600">(ถ้าค่า Volt Meter(LCD) ไม่อยู่ในช่วง 74 ให้แก้ไขค่า Manage - Parameter - Disch - P3 - ALPM Maching V3)</p>

                    <div className="mt-2 flex flex-col items-center w-[50%] ml-10">
                        <p className="font-bold mb-1">ALPM C615</p>
                        <img src={ALPMC615Img} alt="ALPM C615" className="w-full border border-black" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page8;