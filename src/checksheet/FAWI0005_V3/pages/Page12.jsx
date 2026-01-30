import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import AudioOscilloscopeImg from '@/assets/FAWI0005_V3/12_Oscilloscope.png';

function Page12() {

    // Cutting Condition Table Data (Reference only)
    const cuttingData = [
        { c: "C0005 =", on: "0010", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "5.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
        { c: "C0006 =", on: "0014", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "6.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
        { c: "C0007 =", on: "0020", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "7.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
        { c: "C0008 =", on: "0024", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "8.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
        { c: "C0009 =", on: "0024", off: "020", ip: "8504", hrp: "000", mao: "000", sv: "+000.0", v: "9.0", sf: "0001", c_val: "0", pik: "000", ctrl: "0000", wk: "020", wt: "150", ws: "035", wp: "240", pc: "000000", sk: "000080", bsa: "400015" },
    ];

    const cuttingColumns = [
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

    return (
        <A4Paper content={content} currentPage={12}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="font-bold flex flex-col mb-2 text-[12px]">
                    <span>Do not place workpiece on the table!!! (Check nozzle up-down are Ø6)</span>
                </div>

                <div className="flex justify-between items-center bg-gray-200">
                    <p className="font-bold text-[11px] px-1">8.2 N-GALPM Voltage wave form check</p>
                </div>

                {/* 8.2.1 Setting check */}
                <div className="mt-2 pl-2">
                    <p className="font-bold">8.2.1 Setting check</p>

                    <p className="font-bold underline mt-1">AL400 Series</p>
                    <p className="pl-2">Manage-Parameters-Private-P1-[7] NGALPM IP ADJ (NOT USE 7) = 10</p>

                    <p className="font-bold underline mt-1">AL600 Series</p>
                    <p className="pl-2">Manage-Parameters-Private-P1-[7] NGALPM IP ADJ (NOT USE 7) = 11</p>

                    <div className="flex items-center gap-1 mt-1 font-bold">
                        <span>If you change the setting of "</span>
                        <span className="text-[14px]">↑</span>
                        <span>Control-Parameter-Secret-P1-[7] NGALPM IP ADJ (NOT USE 7)", restart the source.</span>
                    </div>
                </div>

                {/* 8.2.2 Specific resistance adjustment */}
                <div className="mt-4 pl-2">
                    <p className="font-bold">8.2.2 Specific resistance adjustment</p>

                    <div className="mt-1 font-bold">
                        <p>Measure the water resistivity using a water quality meter and adjust to STD(50000 ~ 52000 Ω.cm)!</p>
                        <div className="flex items-center gap-2 mt-1 pl-4">
                            <span>=</span>
                            <FormInputCheckSTD
                                name="p12_resistivity_val"
                                label=""
                                minStd={50000}
                                maxStd={52000}
                                placeholder="Value"
                                unit=""
                                style={{ width: "120px", textAlign: "center", borderBottom: "1px solid black" }}
                            />
                            <span>W.cm (STD : = 50000 ~ 52000 W.cm)</span>
                        </div>
                    </div>

                    <div className="mt-2 text-[9px] italic">
                        <p>If the resistivity exceeds the standard, lower the resistivity by filling the service tank with water.</p>
                        <p>After adding water to the service tank, wait at least 5 minutes before measuring the resistivity of the water.</p>
                        <p>Measure the parameter W1,W2 as shown below and save the wave form.</p>
                    </div>
                </div>

                {/* Cutting condition table */}
                <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold">Cutting condition for check</span>
                        <span>Use Program file : 08_NGALCHKA_P4.nc</span>
                    </div>
                    <FormQuickTable columns={cuttingColumns} data={cuttingData} headerClassName="font-bold border border-black" />
                </div>

                {/* Instructions */}
                <div className="mt-2 text-[9px]">
                    <p>How to adjust 1. Water quality check : 50000 ~ 52000 W.cm (using a handy-type water quality meter)</p>
                    <p className="pl-[66px] mt-1">2. Wire diameter : Ø0.2 mm, If W1 of C007 is outside the range of 50 to 80, reconfirm the condition of the equipment.</p>
                    <p className="pl-[66px] mt-1">3. Measurement point : Top guide (+), workstand (GND) (water bath, low-pressure jet)</p>
                    <p className="pl-[66px] mt-1">4. Position of each axis : X: Intermediate Y:120. of the X-axis (G959) Z:40. (G959)</p>
                    <p className="pl-[66px] mt-1">5. Adjusting position : Manage-Parameter-Discharge-11 (GALPM Machining V5-V9)</p>
                    <p className="pl-[165px] mt-1">: Manage-Parameter-Discharging-11 (NGALPM SIG CHG (V5 ~ V9)</p>
                </div>

                {/* Bottom Images */}
                <div className="mt-4 flex gap-8 font-bold">
                    <div className="flex flex-col w-[40%]">
                        <span>Use Oscilloscope=TDS2022(White)</span>
                        <img src={AudioOscilloscopeImg} alt="Oscilloscope" className="w-full mt-1 border border-black" />
                    </div>
                    <div className="flex flex-col w-[40%]">
                        <span>Voltage Probe=TPP0201 or P2220 (Black)</span>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page12;