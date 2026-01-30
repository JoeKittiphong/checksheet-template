import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import V5Img from '@/assets/FAWI0005_V3/13_V5_V6_Waveform.png';
import W1Img from '@/assets/FAWI0005_V3/13_W1_W2_Measure.png';

function Page13() {

    // --- 8.3 Adjustment NGALPM Voltage Data ---
    // Split into Left (Main) and Right (Ref Default) tables for visual separation

    // Left Table Data
    const data8_3_Left = [
        { c: "C0005", v: "V5", ref: "105V", meas: "p13_c0005_meas", volt: "p13_c0005_volt", input: "p13_c0005_input" },
        { c: "C0006", v: "V6", ref: "195V", meas: "p13_c0006_meas", volt: "p13_c0006_volt", input: "p13_c0006_input" },
        { c: "C0007", v: "V7", ref: "290V", meas: "p13_c0007_meas", volt: "p13_c0007_volt", input: "p13_c0007_input" },
        { c: "C0008", v: "V8", ref: "385V", meas: "p13_c0008_meas", volt: "p13_c0008_volt", input: "p13_c0008_input", suffix_input: "(MAX180)" }, // Handle suffix in render if needed, or use prop
        { c: "", v: "V9", ref: "", meas: "", volt: "", input: "180", type: "label" }, // V9 Input is fixed 180 label
    ];

    const columns8_3_Left = [
        { header: "C No", key: "c", width: "10%", className: "text-center" },
        { header: "V", key: "v", width: "5%", className: "text-center" },
        { header: "Reference Voltage (Waveform)", key: "ref", width: "15%", className: "text-center text-red-500 font-bold" },
        { header: "Measured (Waveform) Voltage (+2V)", key: "meas", width: "20%", className: "text-center p-0", type: "input", suffix: " V" },
        { header: "Voltage (H20-H4) (Of Capacitor Electric)", key: "volt", width: "20%", className: "text-center p-0", type: "input", suffix: " V" },
        {
            header: <div className="flex flex-col"><span>Input</span><span>Data Setting</span></div>,
            key: "input",
            width: "25%",
            className: "text-center p-0",
            type: "input",
            render: (val, row, { register }) => {
                if (row.type === 'label') return <span>{val}</span>;
                // Custom render to include (MAX180) for V8 if row.suffix_input exists
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <input
                            {...register(row.input)}
                            className="w-full text-center outline-none bg-transparent"
                        />
                        {row.suffix_input && (
                            <span className="absolute right-0 bottom-0 text-[8px] pr-1 pointer-events-none mb-[-5px] whitespace-nowrap">{row.suffix_input}</span>
                        )}
                    </div>
                );
            }
        },
    ];

    // Right Table Data
    const data8_3_Right = [
        { def: "32" },
        { def: "67" },
        { def: "106" },
        { def: "142" },
        { def: "180 (fix)" },
    ];

    const columns8_3_Right = [
        { header: <div className="flex flex-col"><span>Data Setting</span><span>Default (Ref)</span></div>, key: "def", width: "100%", className: "text-center" },
    ];

    // --- Machining Condition Data ---
    const paramTableCut = [
        { c: "C0006 =", on: "0014", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "6.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
        { c: "C0007 =", on: "0020", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "7.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
    ];

    const paramColumnsCut = [
        { header: "", key: "c", width: "6%", className: "text-center text-[8px]" },
        { header: "ON", key: "on", width: "5%", className: "text-center text-[8px]" },
        { header: "OFF", key: "off", width: "5%", className: "text-center text-[8px]" },
        { header: "IP", key: "ip", width: "5%", className: "text-center text-[8px]" },
        { header: "HRP", key: "hrp", width: "5%", className: "text-center text-[8px]" },
        { header: "MAO", key: "mao", width: "5%", className: "text-center text-[8px]" },
        { header: "SV", key: "sv", width: "6%", className: "text-center text-[8px]" },
        { header: "V", key: "v", width: "5%", className: "text-center text-[8px]" },
        { header: "SF", key: "sf", width: "5%", className: "text-center text-[8px]" },
        { header: "C", key: "c_val", width: "4%", className: "text-center text-[8px]" },
        { header: "PIK", key: "pik", width: "5%", className: "text-center text-[8px]" },
        { header: "CTRL", key: "ctrl", width: "5%", className: "text-center text-[8px]" },
        { header: "WK", key: "wk", width: "5%", className: "text-center text-[8px]" },
        { header: "WT", key: "wt", width: "5%", className: "text-center text-[8px]" },
        { header: "WS", key: "ws", width: "5%", className: "text-center text-[8px]" },
        { header: "WP", key: "wp", width: "5%", className: "text-center text-[8px]" },
        { header: "PC", key: "pc", width: "6%", className: "text-center text-[8px]" },
        { header: "SK", key: "sk", width: "6%", className: "text-center text-[8px]" },
        { header: "BSA", key: "bsa", width: "6%", className: "text-center text-[8px]" },
    ];

    // --- W1 W2 Data ---
    const w1w2Data = [
        { c: "C0006", w1: "p13_c0006_w1", w2: "p13_c0006_w2" },
        { c: "C0007", w1: "p13_c0007_w1", w2: "p13_c0007_w2" },
    ];

    const w1w2Columns = [
        { header: "", key: "c", width: "30%", className: "text-center bg-gray-100" },
        { header: "W1", key: "w1", width: "35%", className: "text-center p-0", type: "input", suffix: " V", style: { backgroundColor: "yellow" } },
        { header: "W2", key: "w2", width: "35%", className: "text-center p-0", type: "input", suffix: " V", style: { backgroundColor: "yellow" } },
    ];

    // --- 8.4 SIG Value Data ---
    const sigData = [
        { c: "C0005", std: "42 V", pos: "NGALPM SIG CHG V5", name: "p13_sig_v5", ref: "0.950-1.200" },
        { c: "C0006", std: "78 V", pos: "NGALPM SIG CHG V6", name: "p13_sig_v6", ref: "0.950-1.200" },
        { c: "C0007", std: "117 V", pos: "NGALPM SIG CHG V7", name: "p13_sig_v7", ref: "0.950-1.200" },
        { c: "C0008", std: "155 V", pos: "NGALPM SIG CHG V8", name: "p13_sig_v8", ref: "0.950-1.200" },
        { c: "", std: "-", pos: "NGALPM SIG CHG V9", name: "p13_sig_v9", ref: "0.950-1.200", note: "(Enter same as V.8)" },
    ];

    const sigColumns = [
        { header: "", key: "c", width: "10%", className: "text-center" },
        { header: "Standard Voltage (LCD)", key: "std", width: "20%", className: "text-center" },
        { header: "Adjustment position [Manage-Parameter-Discharge-11]", key: "pos", width: "40%", className: "text-center" },
        {
            header: "Set Value",
            key: "name",
            width: "15%",
            className: "text-center p-0 bg-yellow-200",
            render: (val, row) => (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <FormInputCheckSTD
                        name={row.name}
                        minStd={0.950}
                        maxStd={1.200}
                        showLabel={false}
                        unit=""
                        inputWidth="w-full"
                    // Use style prop or classhack if inputClassName is not supported. 
                    // Component doesn't support inputClassName anymore.
                    // But inputWidth is supported. 
                    // We can rely on default border-b.
                    />
                    {row.note && <span className="text-[8px]">{row.note}</span>}
                </div>
            )
        },
        { header: "Setting Reference value (allowable)", key: "ref", width: "15%", className: "text-center" },
    ];

    return (
        <A4Paper content={content} currentPage={13}>
            <div className="flex flex-col text-[10px] h-full relative">

                <SectionTitle className="w-max">8.3 Adjustment NGALPM Voltage</SectionTitle>

                {/* 8.3 Split Tables */}
                <div className="flex gap-2">
                    {/* Left Main Table */}
                    <div className="w-[85%]">
                        <FormQuickTable
                            columns={columns8_3_Left}
                            data={data8_3_Left}
                            className="[&_thead]:bg-white" // Force white header via CSS variant to avoid prop error
                        />
                    </div>
                    {/* Right Reference Table */}
                    <div className="w-[15%]">
                        <FormQuickTable
                            columns={columns8_3_Right}
                            data={data8_3_Right}
                            className="[&_thead]:bg-white"
                        />
                    </div>
                </div>

                <p className="font-bold">Note: Do not enter a value greater than [180] for the max. setting in "GALPM machining V8 and V9".</p>

                {/* V5/V6 Image Area */}
                <div className="text-center w-full">
                    <img src={V5Img} alt="V5 V6 Waveform" className="w-full max-h-[100px] object-contain" />
                </div>

                <p className="text-[8px]">If the measured value of "V6" wave form is not 220V, please adjust it to 220V by changing the set value of GALPM machining V6.</p>
                <p className="text-[8px]">Measure the parameter W1,W2 as shown below and save the wave form.</p>

                {/* Machining Condition Table */}
                <div>
                    <div className="font-bold text-center">Machining condition use program : 08_NGALCHKA_P4CUT.nc</div>
                    <FormQuickTable
                        columns={paramColumnsCut}
                        data={paramTableCut}
                        className="[&_thead]:bg-white"
                    />
                </div>

                {/* W1 W2 Section */}
                <div className="flex">
                    <div className="w-1/2">
                        <img src={W1Img} alt="W1 W2 Measure" className="w-30 border border-black" />
                    </div>
                    <div className="w-1/2 pt-4">
                        <div className="w-[80%]">
                            <FormQuickTable
                                columns={w1w2Columns}
                                data={w1w2Data}
                                className="[&_thead]:bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* 8.4 SIG Value Section */}
                <div>
                    <div className="font-bold">
                        8.4 SIG Value adjustment <span className="font-normal">(Adjust the Voltage (LCD) follow to standard "V5-V8". V9= Input same value as V8.)</span>
                    </div>

                    <FormQuickTable
                        columns={sigColumns}
                        data={sigData}
                        className="[&_thead]:bg-white"
                    />

                    <div className="text-[7px]">
                        <p>Adjustment1 - If the machining speed is smaller than the reference value, set the value of GALPM SIG CHG(V5~V9) to 1.0 or more.</p>
                        <p className="pl-[58px]">- If the machining speed is greater than the reference value, set the value of GALPM SIG CHG(V5~V9) to less than 1.0.</p>
                    </div>

                    <div className="text-gray-700">
                        <p className="font-bold">When the setpoint reference is exceeded (Over 1.0301)</p>
                        <ul className="list-disc pl-6 text-[7px]">
                            <li>Reuse the water quality meter and check if the actual water quality is within 50000~52000 W cm.</li>
                            <li>Check that no workpiece is placed on the table and the axis is at the specified position.</li>
                            <li>Replace PRB-unit and IDSV-07 PCB after checking the above and confirming normal operation.</li>
                        </ul>
                        <p className="font-bold">When below the setpoint reference (Under 0.9299) --</p>
                        <ul className="list-disc pl-6 text-[7px]">
                            <li>Reuse the water quality meter and check if the actual water quality is within 50000~52000 W cm.</li>
                            <li>Check the settings again. "MANAGE-PARAMETER-MANUALLY-P1-[7] NGALPM IP ADJ (NOT USE 7) = 0"</li>
                            <li>Replace PRB-unit and IDSV-07 PCB after checking the above and confirming normal operation.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page13;