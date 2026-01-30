import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page14() {
    // --- 9.1 Dip-Switch Data ---
    const dipSwitchData = [
        { label: "STD", sw1: "OFF", sw2: "OFF", sw3: "ON", sw4: "ON", sw5: "ON", sw6: "OFF", sw7: "OFF", sw8: "OFF" },
        { label: "Checking (✓)", type: "checkbox", sw1: "p14_sw1_check", sw2: "p14_sw2_check", sw3: "p14_sw3_check", sw4: "p14_sw4_check", sw5: "p14_sw5_check", sw6: "p14_sw6_check", sw7: "p14_sw7_check", sw8: "p14_sw8_check" }
    ];

    const dipSwitchColumns = [
        { header: "Switch", key: "label", width: "12%", className: "text-center", isLabel: true },
        { header: "SW1", key: "sw1", width: "11%", className: "text-center" },
        { header: "SW2", key: "sw2", width: "11%", className: "text-center" },
        { header: "SW3", key: "sw3", width: "11%", className: "text-center font-bold italic underline" },
        { header: "SW4", key: "sw4", width: "11%", className: "text-center font-bold italic underline" },
        { header: "SW5", key: "sw5", width: "11%", className: "text-center font-bold italic underline" },
        { header: "SW6", key: "sw6", width: "11%", className: "text-center" },
        { header: "SW7", key: "sw7", width: "11%", className: "text-center" },
        { header: "SW8", key: "sw8", width: "11%", className: "text-center" },
    ];

    // --- 9.2 Parameter & Voltage Data ---
    const paramData = [
        { c: "C0920 =", on: "0000", off: "000", ip: "0000", hrp: "000", mao: "000", sv: "+000.0", v: "0.0~9.0", sf: "0000", c_val: "0", pik: "040", ctrl: "0000", wk: "090/025", wt: "120", ws: "80", wp: "012", pc: "000002", sk: "000000", bsa: "000000" }
    ];

    const paramColumns = [
        { header: "", key: "c", width: "8%", className: "text-center text-[10px]" },
        { header: "ON", key: "on", width: "4%", className: "text-center text-[10px]" },
        { header: "OFF", key: "off", width: "4%", className: "text-center text-[10px]" },
        { header: "IP", key: "ip", width: "4%", className: "text-center text-[10px]" },
        { header: "HRP", key: "hrp", width: "4%", className: "text-center text-[10px]" },
        { header: "MAO", key: "mao", width: "4%", className: "text-center text-[10px]" },
        { header: "SV", key: "sv", width: "5%", className: "text-center text-[10px]" },
        { header: "V", key: "v", width: "5%", className: "text-center text-[10px]" },
        { header: "SF", key: "sf", width: "4%", className: "text-center text-[10px]" },
        { header: "C", key: "c_val", width: "2%", className: "text-center text-[10px]" },
        { header: "PIK", key: "pik", width: "4%", className: "text-center text-[10px]" },
        { header: "CTRL", key: "ctrl", width: "4%", className: "text-center text-[10px]" },
        { header: "WK", key: "wk", width: "5%", className: "text-center text-[10px]" },
        { header: "WT", key: "wt", width: "4%", className: "text-center text-[10px]" },
        { header: "WS", key: "ws", width: "4%", className: "text-center text-[10px]" },
        { header: "WP", key: "wp", width: "4%", className: "text-center text-[10px]" },
        { header: "PC", key: "pc", width: "5%", className: "text-center text-[10px]" },
        { header: "SK", key: "sk", width: "5%", className: "text-center text-[10px]" },
        { header: "BSA", key: "bsa", width: "5%", className: "text-center text-[10px]" },
    ];

    const voltageData = [
        { v: "V0", ref: "DC 20V", meas: "p14_v0_meas", set: "p14_v0_set", p: "(#00)" },
        { v: "V1", ref: "30V", meas: "p14_v1_meas", set: "p14_v1_set", p: "(#01)" },
        { v: "V2", ref: "40V", meas: "p14_v2_meas", set: "p14_v2_set", p: "(#02)" },
        { v: "V3", ref: "50V", meas: "p14_v3_meas", set: "p14_v3_set", p: "(#03)" },
        { v: "V4", ref: "60V", meas: "p14_v4_meas", set: "p14_v4_set", p: "(#04)" },
        { v: "V5", ref: "80V", meas: "p14_v5_meas", set: "p14_v5_set", p: "(#05)" },
        { v: "V6", ref: "100V", meas: "p14_v6_meas", set: "p14_v6_set", p: "(#06)" },
        { v: "V7", ref: "120V", meas: "p14_v7_meas", set: "p14_v7_set", p: "(#07)" },
        { v: "V8", ref: "130V", meas: "p14_v8_meas", set: "p14_v8_set", p: "(#08)" },
        { v: "V9", ref: "140V", meas: "p14_v9_meas", set: "p14_v9_set", p: "(#09)" },
    ];

    const voltageColumns = [
        { header: "V*", key: "v", width: "15%", className: "text-center bg-gray-300 font-bold" },
        { header: "Reference Voltage", key: "ref", width: "25%", className: "text-center" },
        { header: "Measured Voltage (+1V)", key: "meas", width: "30%", className: "text-center p-0", type: "input", suffix: " V" },
        {
            header: <div className="flex flex-col"><span>Data Setting</span><span>DPW PC 02-22 V0-V9</span></div>,
            key: "set",
            width: "30%",
            className: "text-center p-0",
            render: (val, row, { register }) => (
                <div className="relative w-full h-full flex items-center justify-center">
                    <input
                        {...register(row.set)}
                        className="w-full text-center outline-none bg-transparent"
                    />
                    <span className="absolute right-0 bottom-0 text-[8px] pr-1 pointer-events-none mb-0 whitespace-nowrap text-gray-400">{row.p}</span>
                </div>
            )
        },
    ];

    // --- 9.3 Mapping Table Data ---
    const mappingData = [
        { v: "V0", p4: "(#00) ->", p4_val: "(Same #00)", p9_1: "(Same #00)", p9_2: "(Same #00)", p9_3: "(Same #00)", p4_new: "4", p9_new: "4" },
        { v: "V1", p4: "(#01) ->", p4_val: "(Same #01)", p9_1: "(Same #01)", p9_2: "(Same #01)", p9_3: "(Same #01)", p4_new: "12", p9_new: "12" },
        { v: "V2", p4: "(#02) ->", p4_val: "(Same #02)", p9_1: "(Same #02)", p9_2: "(Same #02)", p9_3: "(Same #02)", p4_new: "19", p9_new: "19" },
        { v: "V3", p4: "(#03) ->", p4_val: "(Same #03)", p9_1: "(Same #03)", p9_2: "(Same #03)", p9_3: "(Same #03)", p4_new: "27", p9_new: "27" },
        { v: "V4", p4: "(#04) ->", p4_val: "(Same #04)", p9_1: "(Same #04)", p9_2: "(Same #04)", p9_3: "(Same #04)", p4_new: "34", p9_new: "34", highlight: true },
        { v: "V5", p4: "(#05) ->", p4_val: "(Same #05)", p9_1: "(Same #05)", p9_2: "(Same #05)", p9_3: "(Same #05)", p4_new: "49", p9_new: "49", highlight: true },
        { v: "V6", p4: "(#06) ->", p4_val: "(Same #06)", p9_1: "(Same #06)", p9_2: "(Same #06)", p9_3: "(Same #06)", p4_new: "64", p9_new: "64", highlight: true, highlight2: true },
        { v: "V7", p4: "(#07) ->", p4_val: "(Same #07)", p9_1: "(Same #07)", p9_2: "(Same #07)", p9_3: "(Same #07)", p4_new: "79", p9_new: "79", highlight: true, highlight2: true },
        { v: "V8", p4: "(#08) ->", p4_val: "(Same #08)", p9_1: "(Same #08)", p9_2: "(Same #08)", p9_3: "(Same #08)", p4_new: "87", p9_new: "87", highlight: true, highlight2: true },
        { v: "V9", p4: "(#09) ->", p4_val: "(Same #09)", p9_1: "(Same #09)", p9_2: "(Same #09)", p9_3: "(Same #09)", p4_new: "94", p9_new: "94", highlight: true, highlight2: true },
    ];

    const mappingColumns = [
        { header: "V*", key: "v", width: "6%", className: "text-center bg-gray-300 font-bold" },
        { header: <div className="flex flex-col"><span>Page 4/14</span><span className="text-[6px]">DPW PC 02-22 V0-V9</span></div>, key: "p4", width: "10%", className: "text-center text-[8px]" },
        { header: <div className="flex flex-col"><span>Page 4/14</span><span className="text-[6px]">DPW PC 03-33 V0-V9</span></div>, key: "p4_val", width: "12%", className: "text-center text-[8px]", render: (val, row) => <div className={`${row.highlight2 ? 'bg-yellow-200' : ''} h-full w-full flex items-center justify-center`}>{val}</div> },
        { header: <div className="flex flex-col"><span>Page 9/14</span><span className="text-[6px]">DPW PC 12 V0-V9</span></div>, key: "p9_1", width: "12%", className: "text-center text-[8px]", render: (val, row) => <div className={`${row.highlight2 ? 'bg-yellow-200' : ''} h-full w-full flex items-center justify-center`}>{val}</div> },
        { header: <div className="flex flex-col"><span>Page 9/14</span><span className="text-[6px]">DPW PC 32 V0-V9</span></div>, key: "p9_2", width: "12%", className: "text-center text-[8px]", render: (val, row) => <div className={`${row.highlight2 ? 'bg-yellow-200' : ''} h-full w-full flex items-center justify-center`}>{val}</div> },
        { header: <div className="flex flex-col"><span>Page 9/14</span><span className="text-[6px]">DPW PC 13-33 V0-V9</span></div>, key: "p9_3", width: "12%", className: "text-center text-[8px]" }, // No highlight from V6-V9 in screenshot for this col? Wait, looking at screenshot closely... 
        // Screenshot: 
        // V6-V9: Column 3 (Page 4/14 PC 03-33), Column 4 (Page 9 PC 12), Column 5 (Page 9 PC 32) are YELLOW.
        // Column 6 (Page 9 PC 13-33) is NOT yellow.
        // V4-V9: Column 7 & 8 are YELLOW.

        { header: <div className="flex flex-col"><span>Page 4/14</span><span className="text-[6px]">DPW PC 01-21 V0-V9</span></div>, key: "p4_new", width: "12%", className: "text-center font-bold", render: (val, row) => <div className={`${row.highlight ? 'bg-yellow-200' : ''} h-full w-full flex items-center justify-center`}>{val}</div> },
        { header: <div className="flex flex-col"><span>Page 9/14</span><span className="text-[6px]">DPW PC 11-31 V0-V9</span></div>, key: "p9_new", width: "12%", className: "text-center font-bold", render: (val, row) => <div className={`${row.highlight ? 'bg-yellow-200' : ''} h-full w-full flex items-center justify-center`}>{val}</div> },
    ];


    return (
        <A4Paper content={content} currentPage={14}>
            <div className="flex flex-col text-[10px] h-full relative">
                <div className="flex justify-between items-end mb-1">
                    <SectionTitle className="w-max mb-0">9. DPW Adjustment</SectionTitle>
                    <div className="font-bold text-lg underline text-black">Do not place workpiece on the table!!!</div>
                </div>

                {/* 9.1 Dip Switch */}
                <div className="font-bold mb-1">
                    9.1 DPW-01 P.C. Board Dip-Switch Check <span className="font-normal">(Check Dip-Switch on DPW-01 PC Board (Backside of Process Tank))</span>
                </div>

                <div className="mb-2">
                    <FormQuickTable
                        columns={dipSwitchColumns}
                        data={dipSwitchData}
                        className="[&_thead]:bg-white h-20"
                    />
                </div>

                {/* 9.2 DPW Voltage Check */}
                <div className="font-bold mb-1 flex justify-between">
                    <span>9.2 DPW Voltage check</span>
                    <span className="mr-8">Submerge &nbsp;&nbsp;&nbsp; With out spark</span>
                </div>

                {/* Parameter Table */}
                <div className="mb-2">
                    <FormQuickTable columns={paramColumns} data={paramData} className="[&_thead]:bg-white [&_th]:text-[7px]" />
                </div>

                <div className="mb-2 pl-4 text-[10px] leading-tight">
                    <div className="flex"><span className="w-24">Direction : </span> <span>1. Wire Diameter</span> <span className="mx-4">:</span> <span>Ø 0.2 mm</span></div>
                    <div className="flex"><span className="w-24"></span> <span>2. Water State</span> <span className="mx-4">:</span> <span>Submerge with low-High pressure flushing (STD : 50000 ~ 52000 Ω.cm</span></div>
                    <div className="flex"><span className="w-24"></span> <span>3. Check Point</span> <span className="mx-4">:</span> <span>H20 (+) and H4 (GND)</span></div>
                    <div className="flex"><span className="w-24"></span> <span>4. Adjust Position</span> <span className="mx-4">:</span> <span>Manage - Parameter - Disch - Page4 - <b>DPW PC 02-22 V0~V9</b></span></div>
                </div>

                <div className="flex gap-4 mb-2 relative">
                    {/* Voltage Table */}
                    <div className="w-[50%]">
                        <FormQuickTable columns={voltageColumns} data={voltageData} className="[&_thead]:bg-white" />
                    </div>

                    {/* Arrow and Text */}
                    <div className="w-[30%] flex flex-col justify-end pb-4 font-bold border border-black p-2 shadow-lg mb-8 bg-white absolute right-0 bottom-[-50px] z-10">
                        <div className="text-center text-sm">"PC01-21" and "PC11-31"</div>
                        <div className="text-center text-sm">=&gt; Input these Setting value.</div>
                        <div className="flex justify-around text-xl mt-2">
                            <span>↓</span><span>↓</span>
                        </div>
                    </div>
                </div>

                {/* 9.3 Mapping Table */}
                <div className="font-bold mb-1">
                    9.3 Input same value of "DPW PC 02-22 V0~V9" to following table
                </div>
                <FormQuickTable columns={mappingColumns} data={mappingData} className="[&_thead]:bg-white" />

            </div>
        </A4Paper>
    );
}

export default Page14;