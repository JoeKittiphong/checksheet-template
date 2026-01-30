import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images
import imgCuttingArea from '@/assets/FAWI0005_V3/p18_cutting_area.png';

function Page20() {
    const machiningData = [
        { c: "C0002 =", on: "0013", off: "013", ip: "2215", hrp: "000", mao: "245", sv: "+015.0", v: "9.0", sf: "0060", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "105", wp: "063", pc: "000000", sk: "000000", bsa: "000000" }
    ];

    const machiningColumns = [
        { header: "", key: "c", width: "8%", className: "text-center text-[8px]" },
        { header: "ON", key: "on", width: "4%", className: "text-center text-[8px]" },
        { header: "OFF", key: "off", width: "4%", className: "text-center text-[8px]" },
        { header: "IP", key: "ip", width: "5%", className: "text-center text-[8px]" },
        { header: "HRP", key: "hrp", width: "5%", className: "text-center text-[8px]" },
        { header: "MAO", key: "mao", width: "5%", className: "text-center text-[8px]" },
        { header: "SV", key: "sv", width: "6%", className: "text-center text-[8px]" },
        { header: "V", key: "v", width: "5%", className: "text-center text-[8px]" },
        { header: "SF", key: "sf", width: "5%", className: "text-center text-[8px]" },
        { header: "C", key: "c_val", width: "3%", className: "text-center text-[8px]" },
        { header: "PIK", key: "pik", width: "4%", className: "text-center text-[8px]" },
        { header: "CTRL", key: "ctrl", width: "6%", className: "text-center text-[8px]" },
        { header: "WK", key: "wk", width: "4%", className: "text-center text-[8px]" },
        { header: "WT", key: "wt", width: "4%", className: "text-center text-[8px]" },
        { header: "WS", key: "ws", width: "4%", className: "text-center text-[8px]" },
        { header: "WP", key: "wp", width: "4%", className: "text-center text-[8px]" },
        { header: "PC", key: "pc", width: "6%", className: "text-center text-[8px]" },
        { header: "SK", key: "sk", width: "6%", className: "text-center text-[8px]" },
        { header: "BSA", key: "bsa", width: "6%", className: "text-center text-[8px]" },
    ];

    const speedData = [
        { label: "Cutting Speed", std: "2.90~3.00", name: "p20_speed", minStd: 2.90, maxStd: 3.00 },
        { label: "Voltage (LCD)", std: "23~31", name: "p20_voltage", minStd: 23, maxStd: 31 },
        { label: "Current (LCD)", std: "13~16", name: "p20_current", minStd: 13, maxStd: 16 },
    ];

    const speedColumns = [
        { header: "", key: "label", width: "30%", className: "pl-2 font-bold border-black h-8", isLabel: true },
        { header: "Standard", key: "std", width: "35%", className: "text-center font-bold border-black h-8", isLabel: true },
        { header: "Measured", key: "name", width: "35%", type: "input", className: "p-0 border-black", required: true },
    ];

    const compensationData = [
        { speed: "3.21~3.30", check: "p20_comp_1", pulse: "-8" },
        { speed: "3.11~3.20", check: "p20_comp_2", pulse: "-7" },
        { speed: "3.01~3.10", check: "p20_comp_3", pulse: "-6" },
        { speed: "2.90~3.00", check: "p20_comp_4", pulse: "-5 (Def)", className: "bg-gray-200" },
        { speed: "2.80~2.89", check: "p20_comp_5", pulse: "-4" },
        { speed: "2.70~2.79", check: "p20_comp_6", pulse: "-3" },
        { speed: "2.60~2.69", check: "p20_comp_7", pulse: "-2" },
        { speed: "2.50~2.59", check: "p20_comp_8", pulse: "-1" },
        { speed: "-", check: "p20_comp_9", pulse: "0" },
    ];

    const compensationColumns = [
        { key: "speed", width: "35%", className: "font-bold border-black h-7", isLabel: true },
        { key: "check", width: "15%", type: "tristate", className: "border-black h-7" },
        { key: "pulse", width: "50%", className: "font-bold border-black h-7", isLabel: true },
    ];

    const compensationHeaderRows = [
        [
            {
                header: "Wire Diameter =0.20mm",
                headerCheckbox: "p20_wire_dia_020",
                width: "35%",
                className: "text-left py-2"
            },
            {
                header: "[Input Value] Discharge - Page 5/14\nPulse-conversion compensation TM (W) PC9",
                colSpan: 2,
                width: "65%",
                className: "text-center leading-tight text-[9px]"
            }
        ],
        [
            { header: "Measured cutting speed" },
            { header: "Check" },
            { header: "Pulse offset" }
        ]
    ];

    return (
        <A4Paper content={content} currentPage={20}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <SectionTitle className="w-max mb-1">12b. First Cutting Speed Check [PC9]</SectionTitle>
                        <div className="mt-4 space-y-1">
                            <div className="flex"><span>1. Water Resistivity</span><span className="mx-2">:</span><span>5 – 5.2 x 10⁴ Ω.cm (Checked by handy type Resistivity tester)</span></div>
                            <div className="flex"><span>2. Water State</span><span className="mx-2">:</span><span>Submerge with High pressure flushing</span></div>
                            <div className="flex"><span>3. Work Piece</span><span className="mx-2">:</span><span>SKD-11 Thickness 40 mm</span></div>
                            <div className="flex"><span>4. Wire Electrode</span><span className="mx-2">:</span><span className="font-bold">TSUBAME Plus 0.20mm</span></div>
                            <div className="flex"><span>5. Adjust Position</span><span className="mx-2">:</span><span>Manage - Parameter - Discharge - Page 5/14</span></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img src={imgCuttingArea} alt="Cutting Area Diagram" className="h-28 object-contain" />
                    </div>
                </div>

                <div className="mt-2 text-center font-bold underline uppercase">MODIFY P.C. TM W) PC9</div>

                <div className="mt-1 flex flex-col">
                    <div className="text-[9px] text-red-600 font-bold mb-0.5">0.20mm Wire NC Program for checking : <span className="underline">12_0201ST_SPEEDCK_09.NC</span></div>
                    <FormQuickTable
                        columns={machiningColumns}
                        data={machiningData}
                        className="[&_thead]:bg-white"
                        showHead={true}
                    />
                </div>

                {/* Table 12b.1 */}
                <div className="mt-4 flex items-center gap-4">
                    <div className="w-[60%] ml-auto">
                        <div className="flex border border-black border-b-0">
                            <div className="w-[30%] border-r border-black p-1 text-center font-bold"></div>
                            <div className="w-[70%] p-0">
                                <FormItemCheck
                                    name="p20_wire_020"
                                    label="Wire 0.20mm"
                                    className="justify-center h-full border-none"
                                />
                            </div>
                        </div>
                        <FormQuickTable
                            columns={speedColumns}
                            data={speedData}
                            className="[&_thead]:bg-white"
                            showHead={true}
                        />
                    </div>
                    <div className="w-[30%] font-bold text-[11px] italic pr-4 italic">
                        &lt;&lt; TSUBAME(e40) Wire : Adjust 3.00~3.10
                    </div>
                </div>

                {/* Table 12c.2 - Pulse Compensation */}
                <div className="mt-6 w-[70%] mx-auto relative">
                    <div className="font-bold mb-1 -ml-16">12c.2 ตรวจสอบค่า Speed, ถ้าค่า Speed ไม่ได้ตาม STD ให้ตรวจสอบว่าค่า Speed อยู่ในข่วงไหน</div>

                    <div className="relative">
                        <FormQuickTable
                            columns={compensationColumns}
                            data={compensationData}
                            headerRows={compensationHeaderRows}
                            className="[&_thead]:bg-white border-black"
                        />

                        {/* Side Label */}
                        <div className="absolute left-[102%] top-[55%] italic text-[10px] w-max">
                            (Previous version Def)
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="mt-4 space-y-1 text-[9px] italic leading-tight">
                    <div className="flex gap-4">
                        <span className="underline cursor-pointer not-italic font-bold">ตัวอย่าง 1</span>
                        <span>Speed is faster than standard ==&gt; MODIFY P. CONVERT TM(W) PC9 is set to -</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="underline cursor-pointer not-italic font-bold">ตัวอย่าง 2</span>
                        <span>Speed is slower than standard ==&gt; MODIFY P. CONVERT TM(W) PC9 value is incremented.</span>
                    </div>
                    <div className="font-bold mt-3 text-[10px] text-black not-italic pt-1">
                        Contact to ENG Division before go to next check, if you have to input over "0"or under "-8".
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page20;