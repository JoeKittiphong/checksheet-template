import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images
import imgCheckpoint from '@/assets/FAWI0005_V3/p25_checkpoint_diagram.png';

function Page25() {
    const machiningData = [
        { c: "C0000 =", on: "0015", off: "014", ip: "2215", hrp: "000", mao: "252", sv: "+030.0", v: "9.0", sf: "0050", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "105", wp: "040", pc: "000029", sk: "000000", bsa: "100000" },
        { c: "C0001 =", on: "0013", off: "013", ip: "2215", hrp: "000", mao: "245", sv: "+015.0", v: "9.0", sf: "0060", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "105", wp: "063", pc: "000029", sk: "000000", bsa: "20070" },
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

    const recordHeaderRows = [
        [
            { header: "", width: "10%", rowSpan: 2 },
            { header: "Voltage (LCD)", width: "22.5%", className: "text-center font-bold" },
            { header: "Current (LCD)", width: "22.5%", className: "text-center font-bold" },
            { header: "Cutting Speed", width: "22.5%", className: "text-center font-bold" },
            { header: "Cutting Time", width: "22.5%", className: "text-center font-bold" },
        ],
        [
            { header: "(V)", className: "text-center" },
            { header: "(A)", className: "text-center" },
            { header: "(mm/min)", className: "text-center" },
            { header: "(min)", className: "text-center" },
        ]
    ];

    const recordColumns = [
        { header: "", key: "label", width: "10%", className: "text-center font-bold bg-gray-100", isLabel: true },
        { header: "", key: "v", width: "22.5%", type: "input", className: "h-8 border-black text-center", required: true },
        { header: "", key: "a", width: "22.5%", type: "input", className: "h-8 border-black text-center", required: true },
        { header: "", key: "speed", width: "22.5%", type: "input", className: "h-8 border-black text-center", required: true },
        { header: "", key: "time", width: "22.5%", type: "input", className: "h-8 border-black text-center", required: true },
    ];

    const cut1Data = [{ label: "C0001", v: "p25_cut1_v", a: "p25_cut1_a", speed: "p25_cut1_speed", time: "p25_cut1_time" }];
    const cut2Data = [{ label: "C0001", v: "p25_cut2_v", a: "p25_cut2_a", speed: "p25_cut2_speed", time: "p25_cut2_time" }];

    const stdData = [{ label: "C0001", v: "24~30", a: "16.0~19.0", speed: "3.3~3.6", time: "12:00~13:00" }];

    return (
        <A4Paper content={content} currentPage={25}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="flex flex-col mb-2">
                    <div className="text-[12px] font-bold mb-1">14. HSP Cutting Check <span className="underline">(Only option HSP Spec)</span></div>
                    <div className="font-bold mb-1">For 0.20mm Wire Input "EPA = +4" to condition table before cutting.</div>
                    <div className="text-[13px] font-bold mb-1 text-center mt-2">
                        Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)
                    </div>
                    <div className="text-[9px] font-bold mb-2">
                        (WIRE: <span className="underline">TSUBAME Plus</span> Ø0.20 Work Piece: SKD - 11 (Hardening) t = 40 mm )
                        <span className="ml-4 text-red-500 font-normal">Use Program file 14_020HSP_ST40_SQUA_09.NC</span>
                    </div>

                    <FormQuickTable
                        columns={machiningColumns}
                        data={machiningData}
                        className="[&_thead]:bg-white mb-6"
                        showHead={true}
                    />
                </div>

                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-8">
                        {/* Cut 1 */}
                        <div>
                            <div className="font-bold mb-2">Record Cutting Data to fallwing table (Cut 1)</div>
                            <FormQuickTable
                                columns={recordColumns}
                                data={cut1Data}
                                headerRows={recordHeaderRows}
                                className="[&_thead]:bg-gray-400 [&_thead_th]:border-black"
                            />
                            <div className="flex gap-10 mt-2 ml-4">
                                <FormItemCheck
                                    name="p25_cut1_broken"
                                    label="Wire Broken"
                                    className="gap-2"
                                />
                                <FormItemCheck
                                    name="p25_cut1_nobroken"
                                    label="No Wire Broken"
                                    className="gap-2"
                                />
                                <span className="ml-10 font-bold text-gray-600 text-[11px]">&lt;= (H071)</span>
                            </div>
                        </div>

                        {/* Cut 2 */}
                        <div>
                            <div className="font-bold mb-2">Record Cutting Data to fallwing table (Cut 2)</div>
                            <FormQuickTable
                                columns={recordColumns}
                                data={cut2Data}
                                headerRows={recordHeaderRows}
                                className="[&_thead]:bg-gray-400 [&_thead_th]:border-black"
                            />
                            <div className="flex gap-10 mt-2 ml-4">
                                <FormItemCheck
                                    name="p25_cut2_broken"
                                    label="Wire Broken"
                                    className="gap-2"
                                />
                                <FormItemCheck
                                    name="p25_cut2_nobroken"
                                    label="No Wire Broken"
                                    className="gap-2"
                                />
                                <span className="ml-10 font-bold text-gray-600 text-[11px]">&lt;= (H071)</span>
                            </div>
                        </div>

                        {/* STD Table */}
                        <div className="mt-4">
                            <div className="font-bold mb-2 flex items-center gap-2">
                                STD Cutting Data <span className="text-[14px]">Ø 0.20mm (Pressure of Flushing is about 2.3~2.5MPa)</span>
                            </div>
                            <FormQuickTable
                                columns={recordColumns.map(col => ({ ...col, type: 'label' }))}
                                data={stdData}
                                headerRows={recordHeaderRows}
                                className="[&_thead]:bg-gray-400 [&_thead_th]:border-black"
                            />
                            <div className="mt-2 text-[12px] font-bold">
                                "Wire is not broken" can be permitted.
                                <span className="ml-10 text-[10px]">Check items reference to next page if wire is broken this check.</span>
                            </div>
                        </div>
                    </div>

                    {/* Diagram */}
                    <div className="flex w-[150px] relative pt-10">
                        <div className="">
                            Check point of <br /> Cutting Data
                        </div>
                        <img src={imgCheckpoint} alt="Check point diagram" className="w-20 object-contain" />
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-[-120px] right-10">
                    <FormCheckedBox
                        name="p25_checked_by"
                        label="Checked by :"
                    />
                </div>

                <div className="absolute bottom-[-40px] left-4 font-bold underline italic text-[11px]">
                    *Input "0" to EPA after finish this check.
                </div>

            </div>
        </A4Paper>
    );
}

export default Page25;