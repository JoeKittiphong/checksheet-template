import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

// Assets
import diag1 from "@/assets/FAWI0005_V3/p105_diag1.png";
import diag2 from "@/assets/FAWI0005_V3/p105_diag2.png";

const Page105 = () => {
    const { register } = useFormContext();

    const cCodes = [
        { code: "C0000", on: "0006", off: "014", ip: "2215", hrp: "000", mao: "240", sv: "+040.0", v: "8.0", sf: "0050", c: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "080", wp: "045", pc: "000000", sk: "000000", bsa: "100000" },
        { code: "C0001", on: "0008", off: "014", ip: "2215", hrp: "000", mao: "242", sv: "+015.0", v: "8.0", sf: "0050", c: "0", pik: "000", ctrl: "0000", wk: "020", wt: "120", ws: "105", wp: "055", pc: "000000", sk: "000000", bsa: "200014" },
        { code: "C0002", on: "0002", off: "011", ip: "2215", hrp: "000", mao: "000", sv: "+056.0", v: "5.0", sf: "1075", c: "0", pik: "000", ctrl: "0000", wk: "020", wt: "160", ws: "105", wp: "140", pc: "000000", sk: "000060", bsa: "300014" },
        { code: "C0003", on: "0001", off: "016", ip: "2210", hrp: "000", mao: "000", sv: "+034.0", v: "2.0", sf: "1100", c: "0", pik: "000", ctrl: "0000", wk: "020", wt: "160", ws: "105", wp: "240", pc: "000000", sk: "000060", bsa: "400014" },
        { code: "C0004", on: "0015", off: "020", ip: "0515", hrp: "000", mao: "000", sv: "+004.0", v: "0.0", sf: "1105", c: "0", pik: "000", ctrl: "0000", wk: "020", wt: "160", ws: "105", wp: "240", pc: "000000", sk: "000000", bsa: "500014" },
    ];

    const hCodes = [
        { code: "H0000", val: "+000000.0100" },
        { code: "H0001", val: "+000000.2050" },
        { code: "H0002", val: "+000000.1350" },
        { code: "H0003", val: "+000000.1150" },
        { code: "H0004", val: "+000000.1040" },
    ];

    return (
        <A4Paper content={content} currentPage={105}>
            <SectionTitle>23. Optomum accuracy conditions (ACR2) Cutting check [Thickness=40mm-4th]</SectionTitle>

            <div className="px-6 py-2 text-[10px] font-sans">
                {/* Header Info */}
                <div className="flex justify-between mb-2">
                    <span className="font-bold">For 0.20mm Wire</span>
                    <span className="font-bold italic">Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 Ω.cm</span>
                </div>
                <div className="mb-2 font-bold text-center border-b border-black pb-1">
                    Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)
                </div>
                <div className="mb-4 text-[9px] flex justify-between">
                    <span>(WIRE: TSUBAME Plus Ø0.20 Work Piece: SKD - 11 t = 40 mm );</span>
                    <span className="text-red-600 font-bold">Use Program file 23_AL_020ACR2_ST40_4TH_SQUA_10.NC</span>
                </div>

                {/* C-Codes Table */}
                <div className="mb-6 overflow-x-auto">
                    <table className="w-full border-collapse border border-black text-[8.5px] text-center">
                        <thead>
                            <tr className="bg-gray-100 italic">
                                <th className="border border-black p-0.5"></th>
                                {["ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"].map(h => (
                                    <th key={h} className="border border-black p-0.5 font-normal">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cCodes.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-0.5 font-bold italic">{row.code} =</td>
                                    {Object.values(row).slice(1).map((val, i) => (
                                        <td key={i} className="border border-black p-0.5">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* H-Codes Section */}
                <div className="mb-6 grid grid-cols-3 gap-y-2 text-[10px]">
                    {hCodes.map((h, i) => (
                        <div key={i} className="flex items-center">
                            <span className="italic mr-2">{h.code} =</span>
                            <span className="font-mono">{h.val}</span>
                        </div>
                    ))}
                </div>

                {/* Lower Section (Measurements and Diagrams) */}
                <div className="grid grid-cols-2 gap-4 border-t border-black pt-4">
                    {/* Left: Measurement Inputs */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span>STD Size = <span className="font-bold">9.998 ~ 10.002 mm (All Points)</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Wire Ø</span>
                            <input className="border-b border-black w-20 text-center outline-none" {...register('p105_wire_dia', { required: true })} />
                            <span>mm</span>
                        </div>
                        <div className="text-[9px] italic mb-1">
                            Adjust Point --&gt; MODIFY WORKING CORE <span className="font-bold underline">SV19</span> (-30 ~ +30)
                        </div>
                        <div className="flex items-center gap-2">
                            <span>SV19 = </span>
                            <input className="border-b border-black w-14 text-center outline-none" {...register('p105_sv19', { required: true })} />
                            <span className="ml-4">Micro Meter No.EDM502</span>
                        </div>

                        <div className="text-[9px] font-bold text-red-600 mt-2">
                            Do not change "MODIFY WORKING CORE SV18" this check !!!!! <br />
                            <span className="font-normal text-black text-[8px]">Because you have been changed already at previous adjustment [17].</span>
                        </div>

                        {/* Size Check Table */}
                        <div className="mt-4">
                            <table className="w-full border-collapse border border-black text-center text-[9px]">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black p-1">Level</th>
                                        <th className="border border-black p-1">X Direction</th>
                                        <th className="border border-black p-1">Y Direction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Up', 'Mid', 'Low'].map(level => (
                                        <tr key={level}>
                                            <td className="border border-black p-1">{level}</td>
                                            <td className="border border-black p-1">
                                                <input className="w-full text-center outline-none bg-transparent" placeholder="9.xxx" {...register(`p105_x_${level.toLowerCase()}`, { required: true })} />
                                            </td>
                                            <td className="border border-black p-1">
                                                <input className="w-full text-center outline-none bg-transparent" placeholder="9.xxx" {...register(`p105_y_${level.toLowerCase()}`, { required: true })} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 space-y-1">
                            <div>STD Roughness = <span className="font-bold">Under 7.0 µmRzDIN (All Points)</span></div>
                            <div className="flex items-center gap-3">
                                <FormRow label="X:" name="p105_rough_x" register={register} />
                                <FormRow label="Y:" name="p105_rough_y" register={register} />
                            </div>
                            <div className="text-[8px] text-gray-600">Over standard --&gt; Call ENG Staff</div>
                        </div>
                    </div>

                    {/* Right: Diagrams */}
                    <div className="flex flex-col items-center justify-start space-y-4">
                        <div className="flex gap-2">
                            <img src={diag1} alt="Direction Diagram" className="h-28 object-contain" />
                            <img src={diag2} alt="Level Diagram" className="h-28 object-contain" />
                        </div>
                        <div className="relative border border-gray-200 mt-2">
                            <div className="text-[8px] p-2 text-center text-gray-500 italic">Position Reference Diagram</div>
                            <div className="flex justify-center border border-black p-4 h-64 w-32 relative">
                                <span className="absolute top-8 right-4 text-[10px]">U</span>
                                <span className="absolute top-1/2 right-4 text-[10px] -translate-y-1/2">M</span>
                                <span className="absolute bottom-8 right-4 text-[10px]">L</span>
                                <div className="border-t border-dashed border-black w-full absolute top-1/4"></div>
                                <div className="border-l border-dashed border-black h-full absolute left-1/4"></div>
                                <span className="absolute left-1 bottom-1 text-[10px]">Y</span>
                                <span className="absolute left-1/4 -top-4 text-[10px]">Y</span>
                                <span className="absolute -left-4 top-1/4 text-[10px]">X</span>
                                <span className="absolute -right-4 top-1/4 text-[10px]">X</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
};

const FormRow = ({ label, name, register }) => (
    <div className="flex items-center gap-1">
        <span>{label}</span>
        <input className="border-b border-black w-14 text-center outline-none" {...register(name, { required: true })} />
        <span>µm</span>
    </div>
);

export default Page105;