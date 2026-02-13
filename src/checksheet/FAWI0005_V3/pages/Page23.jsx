import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import images
import imgDiagram from '@/assets/FAWI0005_V3/p23_machining_diagram.png';

function Page23() {
    const machiningData = [
        { c: "C0000 =", on: "0000", off: "015", ip: "2215", hrp: "000", mao: "000", sv: "+022.0", v: "5.0", sf: "0050", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "100", wp: "045", pc: "000000", sk: "000000", bsa: "100000" },
        { c: "C0001 =", on: "0001", off: "015", ip: "2215", hrp: "000", mao: "000", sv: "+022.0", v: "5.0", sf: "0050", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "100", wp: "045", pc: "000000", sk: "000000", bsa: "100000" },
        { c: "C0002 =", on: "0002", off: "015", ip: "2215", hrp: "000", mao: "000", sv: "+022.0", v: "5.0", sf: "0050", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "100", wp: "045", pc: "000000", sk: "000000", bsa: "100000" },
    ];

    const machiningColumns = [
        { header: "", key: "c", width: "8%", className: "text-center text-[7px]" },
        { header: "ON", key: "on", width: "4%", className: "text-center text-[7px]" },
        { header: "OFF", key: "off", width: "4%", className: "text-center text-[7px]" },
        { header: "IP", key: "ip", width: "5%", className: "text-center text-[7px]" },
        { header: "HRP", key: "hrp", width: "5%", className: "text-center text-[7px]" },
        { header: "MAO", key: "mao", width: "5%", className: "text-center text-[7px]" },
        { header: "SV", key: "sv", width: "6%", className: "text-center text-[7px]" },
        { header: "V", key: "v", width: "5%", className: "text-center text-[7px]" },
        { header: "SF", key: "sf", width: "5%", className: "text-center text-[7px]" },
        { header: "C", key: "c_val", width: "3%", className: "text-center text-[7px]" },
        { header: "PIK", key: "pik", width: "4%", className: "text-center text-[7px]" },
        { header: "CTRL", key: "ctrl", width: "6%", className: "text-center text-[7px]" },
        { header: "WK", key: "wk", width: "4%", className: "text-center text-[7px]" },
        { header: "WT", key: "wt", width: "4%", className: "text-center text-[7px]" },
        { header: "WS", key: "ws", width: "4%", className: "text-center text-[7px]" },
        { header: "WP", key: "wp", width: "4%", className: "text-center text-[7px]" },
        { header: "PC", key: "pc", width: "6%", className: "text-center text-[7px]" },
        { header: "SK", key: "sk", width: "6%", className: "text-center text-[7px]" },
        { header: "BSA", key: "bsa", width: "6%", className: "text-center text-[7px]" },
    ];

    const checkColumns = [
        { header: "Cond.", key: "cond", width: "10%", className: "text-center h-8 font-bold border-black", isLabel: true },
        { header: "ON", key: "on", width: "10%", className: "text-center h-8 font-bold border-black", isLabel: true },
        { header: "Standard F value", key: "std_f", width: "15%", className: "text-center h-8 font-bold border-black", isLabel: true },
        { header: "Allowable range", key: "range", width: "15%", className: "text-center h-8 font-bold border-black leading-tight", isLabel: true },
        { header: "Measured F value", key: "measured", width: "15%", type: "input", className: "p-0 border-black h-8", required: true },
        { header: "ON? Value", key: "on_val", width: "15%", type: "input", className: "p-0 border-black h-8", required: true },
        { header: "Allowable range", key: "allow", width: "20%", className: "text-center h-8 text-[8px] border-black whitespace-pre-line leading-tight py-1", isLabel: true },
    ];

    const on0Data = [{ cond: "C000", on: "0", std_f: "1.54", range: "1.51～1.57", measured: "p23_on0_f", on_val: "p23_on0_val", allow: "(13.1 new input value) ±3" }];
    const on1Data = [{ cond: "C001", on: "1", std_f: "1.81", range: "1.78～1.84", measured: "p23_on1_f", on_val: "p23_on1_val", allow: "(13.1 new input value) ±3" }];
    const on2Data = [{ cond: "C000", on: "2", std_f: "2.02", range: "1.99～2.05", measured: "p23_on2_f", on_val: "p23_on2_val", allow: "(13.1 new input value) ±3" }];

    return (
        <A4Paper content={content} currentPage={23}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex gap-12 text-[11px] font-bold">
                            <span>13.2 Machining speed check</span>
                            <span>Work:SKD-11 T=10mm</span>
                            <span>Wire: Tsubame Plus 0.20mm</span>
                        </div>
                        <div className="mt-4 text-[9px] font-bold">Management-Parameter-Disch-Page5-"Pulse Conversion ON00 - Pulse Conversion ON02"</div>
                    </div>
                </div>

                <div className="mt-2">
                    <FormQuickTable
                        columns={machiningColumns}
                        data={machiningData}
                        className="[&_thead]:bg-white"
                        showHead={true}
                    />
                </div>

                {/* ON0 Speed Check */}
                <div className="mt-8 relative">
                    <div className="font-bold mb-1">2-1.ON0 speed check</div>
                    <div className="text-[9px] mb-1">NC programming name: Use the 13_ON-TEST.NC</div>
                    <div className="text-[9px] mb-2 font-bold italic">Determine the value closest to the reference F value.</div>

                    <FormQuickTable
                        columns={checkColumns.map(c => c.key === 'on_val' ? { ...c, header: "ON0 Value" } : c)}
                        data={on0Data}
                        className="[&_thead]:bg-white border-black w-[90%]"
                        showHead={true}
                    />

                    {/* Diagram Positioning */}
                    <div className="absolute right-0 top-35 w-[180px]">
                        <img src={imgDiagram} alt="Machining orientation" className="w-full object-contain" />
                    </div>

                    <div className="mt-2 text-[9px] space-y-0.5 font-bold leading-tight w-[80%] pr-4">
                        <div>If it is faster than the reference value, the value of the Adjust PULSE CONVERT ON00 is set to -1.</div>
                        <div>When it is slower than the reference value, the value of the Adjust PULSE CONVERT ON00 is set to +1.</div>
                        <div className="pt-2 text-black">※ Choose a value closer to the standard value.</div>
                        <div className="pl-4">If the measured value at pulse conversion correction =-1 is 0.4 for reference 0.5,</div>
                        <div className="pl-6">if the measured value at = +1 becomes 0.6, select the smaller one (slower one).</div>
                        <div className="pl-2">Pulse conversion correction ±1 changes the F value by about 0.14</div>
                        <div className="pl-2">If it exceeds the allowable range, select the value closer to the reference value</div>
                    </div>
                </div>

                {/* ON1 Speed Check */}
                <div className="mt-8">
                    <div className="font-bold mb-1">2-2.ON1 speed check</div>
                    <FormQuickTable
                        columns={checkColumns.map(c => c.key === 'on_val' ? { ...c, header: "ON1 Value" } : c)}
                        data={on1Data}
                        className="[&_thead]:bg-white border-black w-[90%]"
                        showHead={true}
                    />
                    <div className="mt-2 text-[9px] space-y-0.5 font-bold leading-tight">
                        <div>If it is faster than the reference value, the value of the Adjust PULSE CONVERT ON01 is set to -1.</div>
                        <div>When it is slower than the reference value, the value of the Adjust PULSE CONVERT ON01 is set to +1.</div>
                    </div>
                </div>

                {/* ON2 Speed Check */}
                <div className="mt-8">
                    <div className="font-bold mb-1">2-3.ON2 speed check</div>
                    <FormQuickTable
                        columns={checkColumns.map(c => c.key === 'on_val' ? { ...c, header: "ON2 Value" } : c)}
                        data={on2Data}
                        className="[&_thead]:bg-white border-black w-[90%]"
                        showHead={true}
                    />
                    <div className="mt-2 text-[9px] space-y-0.5 font-bold leading-tight">
                        <div>If it is faster than the reference value, the value of the Adjust PULSE CONVERT ON02 is set to -1.</div>
                        <div>When it is slower than the reference value, the value of the Adjust PULSE CONVERT ON02 is set to +1.</div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-[-150px] right-20">
                    <FormCheckedBox
                        name="p23_checked_by"
                        label="Checked by :"
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page23;