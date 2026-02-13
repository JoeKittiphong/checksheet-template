import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import images
import imgWaveforms from '@/assets/FAWI0005_V3/p24_waveforms.png';
import imgWorkpiece80mm from '@/assets/FAWI0005_V3/p24_workpiece_80mm.png';

function Page24() {
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

    const ncCodeLines = [
        "G92XY;",
        "C000;",
        "T84;",
        "G01Y-3.;",
        "X2.;",
        "Y-5.;",
        "X;",
        "T84;",
        "G01Y-30.;",
        "M00;"
    ];

    return (
        <A4Paper content={content} currentPage={24}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="flex flex-col mb-2">
                    <div className="text-[12px] font-bold mb-2">ON-TEST</div>
                    <FormQuickTable
                        columns={machiningColumns}
                        data={machiningData}
                        className="[&_thead]:bg-white"
                        showHead={true}
                    />
                </div>

                <div className="flex relative mt-4">
                    {/* NC Code Listing */}
                    <div className="w-[150px] space-y-2 text-[12px] font-bold ml-4">
                        <span className="block italic text-[14px] ml-[-10px] mb-[-5px]">;</span>
                        {ncCodeLines.map((line, idx) => (
                            <div key={idx} className="pl-4">{line}</div>
                        ))}
                    </div>

                    {/* Instructional Box */}
                    <div className="absolute left-[180px] top-6 border border-gray-300 p-4 w-[350px] rounded-sm bg-white shadow-sm">
                        <div className="text-red-500 font-bold leading-tight text-[11px] space-y-2">
                            <div>"For measurement, start measurement after the Y</div>
                            <div>coordinate system exceeds -10.0.</div>
                            <div className="pt-2">After changing the set value, change the processing conditions</div>
                            <div className="pl-6">(C000) once and then start measurement.</div>
                        </div>
                    </div>
                </div>

                {/* Reference Waveforms Section */}
                <div className="mt-12 w-full">
                    <div className="flex justify-center mb-1">
                        <span className="text-[12px] font-bold">[Reference current waveform]</span>
                    </div>

                    <div className="relative">
                        <img src={imgWaveforms} alt="Reference current waveforms" className="w-[90%] mx-auto object-contain" />

                        {/* Waveform labels */}
                        <div className="absolute top-2 w-full text-center text-red-500 font-bold text-[12px]">
                            Two currents in the upper pole-to-pole line
                        </div>

                        <div className="flex justify-around mt-2 w-[90%] mx-auto text-[14px] font-bold">
                            <span className="underline cursor-pointer">ON:0</span>
                            <span className="underline cursor-pointer">ON:1</span>
                            <span className="underline cursor-pointer">ON:2</span>
                        </div>
                    </div>
                </div>

                {/* Work Piece Replacement Section */}
                <div className="mt-8 pl-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold text-[13px]">
                        <span>★ Replace work piece to 80mm work after test processing is completed</span>
                    </div>

                    <div className="mt-4 flex items-start gap-8 ml-12">
                        <img src={imgWorkpiece80mm} alt="80mm workpiece diagram" className="h-[150px] object-contain border border-black" />
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-[0px] right-20">
                    <FormCheckedBox
                        name="p24_checked_by"
                        label="Checked by :"
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page24;