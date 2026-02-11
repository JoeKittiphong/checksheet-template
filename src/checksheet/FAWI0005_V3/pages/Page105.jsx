import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Assets
import diag1 from "@/assets/FAWI0005_V3/p105_diag1.png";
import diag2 from "@/assets/FAWI0005_V3/p105_diag2.png";

const Page105 = () => {
    const { register } = useFormContext();

    // Table Headers
    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    // Table Data
    const tableRows = [
        { label: "C0000 =", values: ["0006", "014", "2215", "000", "240", "+040.0", "8.0", "0050", "0", "000", "0000", "020", "120", "080", "045", "000000", "000000", "100000"] },
        { label: "C0001 =", values: ["0008", "014", "2215", "000", "242", "+015.0", "8.0", "0050", "0", "000", "0000", "020", "120", "105", "055", "000000", "000000", "200014"] },
        { label: "C0002 =", values: ["0002", "011", "2215", "000", "000", "+056.0", "5.0", "1075", "0", "000", "0000", "020", "160", "105", "140", "000000", "000060", "300014"] },
        { label: "C0003 =", values: ["0001", "016", "2210", "000", "000", "+034.0", "2.0", "1100", "0", "000", "0000", "020", "160", "105", "240", "000000", "000060", "400014"] },
        { label: "C0004 =", values: ["0015", "020", "0515", "000", "000", "+004.0", "0.0", "1105", "0", "000", "0000", "020", "160", "105", "240", "000000", "000000", "500014"] },
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
                <div className="flex justify-between mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span className="italic">Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 &Omega;.cm</span>
                </div>
                <div className="mb-2 font-bold text-center border-b border-black pb-1 text-sm">
                    Check that the upper and lower nozzles are &Oslash;6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles &Oslash;6)
                </div>
                <div className="mb-4 text-[9px] flex justify-between">
                    <span>(WIRE: TSUBAME Plus &Oslash;0.20 Work Piece: SKD - 11 t = 40 mm );</span>
                    <span className="text-red-600 font-bold">Use Program file 23_AL_020ACR2_ST40_4TH_SQUA_10.NC</span>
                </div>

                {/* C-Codes Table */}
                <div className="mb-6 overflow-x-auto">
                    <FinalConditionTable headers={headers} tableRows={tableRows} />
                </div>

                {/* H-Codes Section */}
                <div className="mb-6 grid grid-cols-4 gap-y-2 text-[10px] px-10">
                    {hCodes.map((h, i) => (
                        <div key={i} className="flex items-center">
                            <span className="italic mr-2 font-bold">{h.code} =</span>
                            <span className="font-mono">{h.val}</span>
                        </div>
                    ))}
                </div>

                {/* Lower Section (Measurements and Diagrams) */}
                <div className="">
                    {/* Left: Measurement Inputs */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <span className="font-bold">STD Size = 9.998 ~ 10.002 mm (All Points)</span>

                            {/* Wire Check using FormItemCheck */}
                            <div className="flex items-center">
                                <FormItemCheck
                                    name="p105_wire_check"
                                    label="Wire &Oslash;"
                                    input={{
                                        name: "p105_wire_dia",
                                        width: "60px",
                                        suffix: "mm"
                                    }}
                                    showCheckbox={false}
                                />
                            </div>
                        </div>
                        <h2>Adjust Point --&gt; MODIFY WORKING CORE SV19 (-30 ~ +30)</h2>
                        <h2>Do not change "MODIFY WORKING CORE SV18" this check !!!!!</h2>
                        <h2>Because you have been changed already at previous adjustment [17].</h2>
                        <h2>STD Roughness = Under 7.0 mmRzDIN (All Points)</h2>
                        <h2>Over standard --&gt; Call ENG Staff</h2>
                    </div>

                    {/* Right: Diagrams */}
                    <div className="flex flex-col items-center justify-start space-y-6 pt-4">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <img src={diag1} alt="Direction Diagram" className="h-54 object-contain" />
                            </div>
                            <div className="flex flex-col items-center">
                                <img src={diag2} alt="Level Diagram" className="h-64 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
};

export default Page105;