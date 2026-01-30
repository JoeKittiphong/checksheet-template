import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import ALPMC612Img from '@/assets/FAWI0005_V3/6_6_ALPMC612.png';

function Page7() {

    // --- 6.6 Data ---
    const paramTable6_6 = [
        { c: "C0612", on: "316", off: "001", ip: "0015", hrp: "000", mao: "000", sv: "+23.0", v: "0.0", sf: "9030", c_val: "0", pik: "000", ctrl: "0000", wt: "160", ws: "050", wp: "012", pc: "0000" }
    ];
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

    const cuttingTable6_6 = [
        {
            cond: "C0612",
            setting: "p7_c0612_setting",
            h20: "p7_c0612_h20",
            wave: "SAVE",
            std: "7.9~9.3",
            fspeed: "p7_c0612_fspeed",
            volt: "p7_c0612_volt",
            curr: "p7_c0612_curr",
            lcd_std: "35~36V",
            volt_data: "p7_c0612_volt_data"
        }
    ];

    const cuttingColumns6_6 = [
        { header: "Cutting Condition", key: "cond", width: "10%", className: "text-center bg-gray-300 font-bold", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "Setting Data", key: "setting", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "H20 - H4", key: "h20", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "Wave Form", key: "wave", width: "10%", className: "text-center", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "F - Speed STD", key: "std", width: "10%", className: "text-center bg-gray-300 font-bold", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "F - Speed (mm/min)", key: "fspeed", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "Voltage (V)", key: "volt", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "Current (A)", key: "curr", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
        { header: "Voltmeter(LCD) STD", key: "lcd_std", width: "10%", className: "text-center font-bold bg-gray-300", headerClassName: "bg-gray-300 h-10 align-bottom text-[8px]" },
        { header: "Volt Data (V)", key: "volt_data", width: "10%", className: "text-center p-0", type: "input", headerClassName: "bg-gray-300 h-10 align-bottom" },
    ];


    // --- 6.7 Data ---
    const paramTable6_7 = [
        { c: "C0613", on: "316", off: "001", ip: "0015", hrp: "000", mao: "000", sv: "+33.0", v: "1.0", sf: "9030", c_val: "0", pik: "000", ctrl: "0000", wt: "160", ws: "050", wp: "012", pc: "0000" }
    ];
    // Use same columns as 6.6

    const cuttingTable6_7 = [
        {
            cond: "C0613",
            setting: "p7_c0613_setting",
            h20: "p7_c0613_h20",
            wave: "\\", // Diagonal line representation
            std: "9.6~10.3",
            fspeed: "p7_c0613_fspeed",
            volt: "p7_c0613_volt",
            curr: "p7_c0613_curr",
            lcd_std: "48V",
            volt_data: "p7_c0613_volt_data"
        }
    ];

    return (
        <A4Paper content={content} currentPage={7}>
            <div className="flex flex-col text-[10px] h-full relative">

                {/* 6.6 C0612 SV DATA */}
                <div className="mt-1">
                    <FormItemCheck name="p7_c0612_check" label="6.6 C0612 SV DATA Input Method (Save Wave Form)" showCheckbox={true} className="font-bold mb-1" />
                    <p className="pl-6 ml-2">Cheack Voltage meter of Screen.</p>

                    <div className="flex justify-between mt-2 px-2">
                        <span>(SIG : Volt Meter on LCD)</span>
                        <div className="flex gap-8">
                            <span>Submerge</span>
                            <span>With out spark</span>
                        </div>
                    </div>

                    <div className="mt-1">
                        <FormQuickTable columns={paramColumns6_6} data={paramTable6_6} headerClassName="font-bold" />
                    </div>

                    <div className="mt-2 text-center">
                        <FormQuickTable columns={cuttingColumns6_6} data={cuttingTable6_6} />
                    </div>

                    <p className="mt-2">If the value displayed on the voltmeter (LCD) is other than 35~36V, change the value of</p>
                    <p className="font-bold">Manage-Parameter-Discharge-P3-ALPM Maching V0</p>
                    <p className="text-gray-600">(ถ้าค่า Volt Meter(LCD) ไม่อยู่ในช่วง 35 ~ 36 ให้แก้ไขค่า Manage - Parameter - Disch - P3 - ALPM Maching V0)</p>

                    <div className="flex mt-2 justify-between items-start">
                        <div className="w-[55%] pl-2">
                            <p className="font-bold underline mb-1">EX</p>
                            <div className="pl-4">
                                <p>***VoltMeter(LCD) : 39V --{'>'} ALPM MACHINING V0 = -3</p>
                                <p className="pl-4 text-gray-600">(ค่า KS_M_SIG มากกว่า STD)</p>
                                <p className="mt-1">***VoltMeter(LCD) : 34V --{'>'} ALPM MACHINING V0 = +1</p>
                                <p className="pl-4 text-gray-600">(ค่า KS_M_SIG น้อยกว่า STD)</p>
                            </div>
                        </div>
                        <div className="w-[40%] flex flex-col items-center">
                            <p className="font-bold mb-1">ALPMC612</p>
                            <img src={ALPMC612Img} alt="ALPMC612" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* 6.7 C0613 SV DATA */}
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <FormItemCheck name="p7_c0613_check" label="6.7 C0613 SV DATA Input Method" showCheckbox={true} className="font-bold" />
                        <div className="flex gap-8 px-2">
                            <span>Submerge</span>
                            <span>With out spark</span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <FormQuickTable columns={paramColumns6_6} data={paramTable6_7} headerClassName="font-bold" />
                    </div>

                    <div className="mt-2 text-center">
                        <FormQuickTable columns={cuttingColumns6_6} data={cuttingTable6_7} />
                    </div>

                    <p className="mt-2">If the value displayed on the voltmeter (LCD) is other than 48V, change the value of</p>
                    <p className="font-bold">Manage-Parameter-Discharge-P3-ALPM Maching V1</p>
                    <p className="text-gray-600">(ถ้าค่า Volt Meter(LCD) ไม่อยู่ในช่วง 48 ให้แก้ไขค่า Manage - Parameter - Disch - P3 - ALPM Maching V1)</p>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;