import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page15() {

    // --- 9.4 Parameter & Voltage Data ---
    // Same param data as Page 14 basically
    const paramData = [
        { c: "C0920 =", on: "0000", off: "000", ip: "0000", hrp: "000", mao: "000", sv: "+000.0", v: "0.0~9.0", sf: "0000", c_val: "0", pik: "040", ctrl: "0000", wk: "090/025", wt: "120", ws: "80", wp: "012", pc: "000102", sk: "000000", bsa: "000000" }
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
        { header: "PC", key: "pc", width: "5%", className: "text-center text-[10px] font-bold border-2 border-black" }, // PC is bold/boxed in screenshot? Just consistent with others usually.
        { header: "SK", key: "sk", width: "5%", className: "text-center text-[10px]" },
        { header: "BSA", key: "bsa", width: "5%", className: "text-center text-[10px]" },
    ];

    const voltageData = [
        { v: "V0(V10)", ref: "DC 150V", meas: "p15_v10_meas", meas_min: 149, meas_max: 151, set: "p15_v10_set", suffix: "(#10)" },
        { v: "V1(V11)", ref: "160V", meas: "p15_v11_meas", meas_min: 159, meas_max: 161, set: "p15_v11_set", suffix: "(#11)" },
        { v: "V2(V12)", ref: "170V", meas: "p15_v12_meas", meas_min: 169, meas_max: 171, set: "p15_v12_set", suffix: "(#12)" },
        { v: "V3(V13)", ref: "180V", meas: "p15_v13_meas", meas_min: 179, meas_max: 181, set: "p15_v13_set", suffix: "(#13)" },
        { v: "V4(V14)", ref: "190V", meas: "p15_v14_meas", meas_min: 189, meas_max: 191, set: "p15_v14_set", suffix: "(#14)" },
        { v: "V5(V15)", ref: "200V", meas: "p15_v15_meas", meas_min: 199, meas_max: 201, set: "p15_v15_set", suffix: "(#15)" },
        { v: "", ref: "", meas: "", set: "", suffix: "", type: "label", isSpacer: true }, // Spacer rows
        { v: "", ref: "", meas: "", set: "", suffix: "", type: "label", isSpacer: true },
    ];

    const voltageColumns = [
        { header: "V*", key: "v", width: "22%", className: "text-center bg-gray-300 font-bold", isLabel: true },
        { header: <div className="flex flex-col"><span>Reference</span><span>Voltage</span></div>, key: "ref", width: "23%", className: "text-center" },
        { header: <div className="flex flex-col"><span>Measured</span><span>Voltage (+1V)</span></div>, key: "meas", width: "28%", className: "text-center p-0", type: "input", suffix: " V" },
        {
            header: <div className="flex flex-col"><span>Data Setting</span><span>DPW PC 02-22 V10-V19</span></div>,
            key: "set",
            width: "27%",
            className: "text-center p-0",
            type: "input"
        },
    ];

    // --- 9.5 Input setting value table ---
    const mappingData = [
        { v: "V10", col2: "(#10) ->", col3: "(Same #10)", col4: "(Same #10)", col5: "(Same #10)", col6: "(Same #10)", col7: "101", col8: "101" },
        { v: "V11", col2: "(#11) ->", col3: "(Same #11)", col4: "(Same #11)", col5: "(Same #11)", col6: "(Same #11)", col7: "109", col8: "109", bg: { col2: 'bg-yellow-200' } },
        { v: "V12", col2: "(#12) ->", col3: "(Same #12)", col4: "(Same #12)", col5: "(Same #12)", col6: "(Same #12)", col7: "116", col8: "116", bg: { col3: 'bg-green-200', col6: 'bg-green-200' } },
        { v: "V13", col2: "(#13) ->", col3: "(Same #12)", col4: "(Same #13)", col5: "(Same #13)", col6: "(Same #12)", col7: "124", col8: "124", bg: { col3: 'bg-green-200', col6: 'bg-green-200' } },
        { v: "V14", col2: "(#14) ->", col3: "(Same #12)", col4: "(Same #14)", col5: "(Same #14)", col6: "(Same #12)", col7: "131", col8: "131", bg: { col3: 'bg-green-200', col6: 'bg-green-200' } },
        { v: "V15", col2: "(#15) ->", col3: "(Same #12)", col4: "(Same #15)", col5: "(Same #15)", col6: "(Same #12)", col7: "139", col8: "139", bg: { col2: 'bg-pink-300', col3: 'bg-green-200', col4: 'bg-pink-300', col5: 'bg-pink-300', col6: 'bg-green-200', col7: 'bg-cyan-200', col8: 'bg-cyan-200' } }, // Pink seems to be row V15 starting from Col2
        { v: "V16", col2: "(Same #15) ->", col3: "(Same #12)", col4: "(Same #15)", col5: "(Same #15)", col6: "(Same #12)", col7: "139", col8: "139", bg: { col2: 'bg-pink-300', col3: 'bg-green-200', col4: 'bg-pink-300', col5: 'bg-pink-300', col6: 'bg-green-200', col7: 'bg-cyan-200', col8: 'bg-cyan-200' } },
        { v: "V17", col2: "(Same #15) ->", col3: "(Same #12)", col4: "(Same #15)", col5: "(Same #15)", col6: "(Same #12)", col7: "139", col8: "139", bg: { col2: 'bg-pink-300', col3: 'bg-green-200', col4: 'bg-pink-300', col5: 'bg-pink-300', col6: 'bg-green-200', col7: 'bg-cyan-200', col8: 'bg-cyan-200' } },
        { v: "V18", col2: "(Same #15) ->", col3: "(Same #12)", col4: "(Same #15)", col5: "(Same #15)", col6: "(Same #12)", col7: "139", col8: "139", bg: { col2: 'bg-pink-300', col3: 'bg-green-200', col4: 'bg-pink-300', col5: 'bg-pink-300', col6: 'bg-green-200', col7: 'bg-cyan-200', col8: 'bg-cyan-200' } },
        { v: "V19", col2: "(Same #15) ->", col3: "(Same #12)", col4: "(Same #15)", col5: "(Same #15)", col6: "(Same #12)", col7: "139", col8: "139", bg: { col2: 'bg-pink-300', col3: 'bg-green-200', col4: 'bg-pink-300', col5: 'bg-pink-300', col6: 'bg-green-200', col7: 'bg-cyan-200', col8: 'bg-cyan-200' } },
    ];

    const renderCell = (key) => (val, row) => (
        <div className={`w-full h-full flex items-center justify-center ${row.bg?.[key] || ''}`}>
            {val}
        </div>
    );

    const mappingColumns = [
        { header: "V*", key: "v", width: "8%", className: "text-center bg-gray-300 font-bold" },
        { header: <div className="flex flex-col"><span>Page 7/14</span><span className="text-[6px]">DPW PC 02-22 V10-V19</span></div>, key: "col2", width: "13%", className: "text-center text-[8px]", render: renderCell('col2') },
        { header: <div className="flex flex-col"><span>Page 8/14</span><span className="text-[6px]">DPW PC 03-33 V10-V19</span></div>, key: "col3", width: "13%", className: "text-center text-[8px]", render: renderCell('col3') },
        { header: <div className="flex flex-col"><span>Page 10/14</span><span className="text-[6px]">DPW PC 12 V10-V19</span></div>, key: "col4", width: "13%", className: "text-center text-[8px]", render: renderCell('col4') },
        { header: <div className="flex flex-col"><span>Page 8/14</span><span className="text-[6px]">DPW PC 32 V10-V19</span></div>, key: "col5", width: "13%", className: "text-center text-[8px]", render: renderCell('col5') },
        { header: <div className="flex flex-col"><span>Page 8/14</span><span className="text-[6px]">DPW PC 13-33 V10-V19</span></div>, key: "col6", width: "13%", className: "text-center text-[8px]", render: renderCell('col6') },
        { header: <div className="flex flex-col"><span>Page 7/14</span><span className="text-[6px]">DPW PC 01-21 V10-V19</span></div>, key: "col7", width: "13%", className: "text-center text-[10px] font-bold", render: renderCell('col7') },
        { header: <div className="flex flex-col"><span>Page 8/14</span><span className="text-[6px]">DPW PC 11-31 V10-V19</span></div>, key: "col8", width: "13%", className: "text-center text-[10px] font-bold", render: renderCell('col8') },
    ];


    return (
        <A4Paper content={content} currentPage={15}>
            <div className="flex flex-col text-[10px] h-full relative">
                <div className="font-bold mb-1 flex justify-between">
                    <span>9.4 DPW Voltage check (V10 ~ V19)</span>
                    <span className="mr-8">Submerge &nbsp;&nbsp;&nbsp; With out spark</span>
                </div>

                {/* Parameter Table */}
                <div className="mb-2">
                    <FormQuickTable columns={paramColumns} data={paramData} className="[&_thead]:bg-white [&_th]:text-[7px]" />
                </div>

                <div className="mb-2 pl-4 text-[10px] leading-tight">
                    <div className="flex"><span className="w-24">Direction : </span> <span>1. Wire Diameter</span> <span className="mx-4">:</span> <span>Ø 0.2 mm</span></div>
                    <div className="flex"><span className="w-24"></span> <span>2. Water State</span> <span className="mx-4">:</span> <span>Submerge with low pressure flushing</span></div>
                    <div className="flex"><span className="w-24"></span> <span>3. Check Point</span> <span className="mx-4">:</span> <span>H20 (+) and H4 (GND)</span></div>
                    <div className="flex"><span className="w-24"></span> <span>4. Adjust Position</span> <span className="mx-4">:</span> <span>Manage - Parameter - Discharge - Page7 - <b>DPW PC 02-22 V10~V19</b></span></div>
                </div>

                <div className="flex gap-4 mb-2 relative">
                    {/* Voltage Table */}
                    <div className="w-[50%]">
                        <FormQuickTable columns={voltageColumns} data={voltageData} className="[&_thead]:bg-white" />
                    </div>

                    {/* Note Text */}
                    <div className="w-[50%] pt-20">
                        <div className="font-bold mb-2">Note</div>
                        <div className="font-bold mb-4">V6(V16),V7(V17),V8(V18),V9(V19)</div>
                        <div className="font-bold">= Input same setting value as V5(V15) value.</div>
                    </div>

                    {/* Arrow Box Overlay */}
                    <div className="w-[40%] flex flex-col justify-end pb-4 font-bold mb-2 absolute right-0 bottom-[-70px] z-10">
                        <div className="text-center text-sm">"PC01-21" and "PC11-31"</div>
                        <div className="text-center text-sm">=&gt; Input these Setting value.</div>
                        <div className="flex justify-center text-xl mt-2">
                            <span className='mr-15'>↓</span><span>↓</span>
                        </div>
                    </div>
                </div>

                {/* 9.5 Input setting value table */}
                <div className="font-bold mb-1 mt-4">
                    9.5 Input setting value of "DPW PC 02-22 V10~V19" to fallowing table
                </div>
                <FormQuickTable columns={mappingColumns} data={mappingData} className="[&_thead]:bg-white" />

                {/* Footer Checked By */}
                <div className="mt-5 flex justify-end pb-4 pr-8">
                    <FormCheckedBox name="p15_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page15;