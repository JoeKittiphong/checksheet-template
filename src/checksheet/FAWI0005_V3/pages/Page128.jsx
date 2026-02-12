
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';
import imag128 from "@/assets/FAWI0005_V3/page128.png";

function Page128() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0013", "014", "2215", "000", "252", "+35.0", "9.0", "0035", "0", "000", "0000", "020", "120", "080", "043", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "264", "+020.0", "9.0", "0025", "0", "000", "0000", "020", "120", "110", "063", "000009", "000000", "200013"] },
        { label: "C0002 =", values: ["0001", "011", "2215", "000", "000", "+079.0", "5.0", "0300", "0", "000", "0000", "020", "170", "114", "140", "000000", "000001", "300013"] },
        { label: "C0003 =", values: ["0001", "016", "2210", "000", "000", "+098.0", "2.0", "0300", "0", "000", "0000", "020", "170", "114", "240", "000000", "000000", "400013"] },
        { label: "C0004 =", values: ["0015", "014", "0515", "000", "000", "+250.0", "0.0", "0130", "0", "000", "0000", "020", "170", "114", "240", "000000", "000001", "500013"] },
    ];

    // Placeholder for diagram
    const Placeholder = ({ label, className = "h-[200px] w-[200px]" }) => (
        <div className={`bg-gray-200 flex items-center justify-center text-gray-500 text-[8px] text-center border border-dashed border-gray-400 ${className}`}>
            {label}
        </div>
    );

    return (
        <A4Paper content={content} currentPage={128}>
            <div className="p-4 text-xs font-sans">
                {/* Header Section */}
                <h1 className="text-lg font-bold mb-2">26. Frequency servo GALPM Cutting check [Thickness=80mm-4th]</h1>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 <span style={{ fontFamily: 'serif' }}>Ω</span>.cm</span>
                </div>

                <div className="mb-2 font-bold">
                    (WIRE: TSUBAME Plus Æ0.20 Work Piece: SKD - 11 t = 80 mm ); Use Program file <span className="text-red-600 font-bold">26_P20_T80_4C-HINDTEST-OF3.NC</span>
                </div>

                <div className="mb-2 font-bold underline">
                    Check that Nozzle D.6 at UPPER and Lower Guide D.6
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* H Values */}
                <div className="grid grid-cols-3 gap-4 mb-4 font-mono">
                    <div>H0000 = <span className="ml-4">+000000.0100 (approach);</span></div>
                    <div>H0001 = <span className="ml-4">+000000.2032 (1ST)</span></div>
                    <div>H0002 = <span className="ml-4">+000000.1332 (2ND)</span></div>
                    <div>H0003 = <span className="ml-4">+000000.1132 (3RD)</span></div>
                    <div>H0004 = <span className="ml-4">+000000.1022 (4TH)</span></div>
                </div>

                {/* Data Setting Check */}
                <h3 className="font-bold text-sm underline mb-2">Data Setting Check</h3>

                <div className="ml-4 space-y-1">
                    <p className="font-bold">Manage-Parameter-Disch2-Page3</p>
                    <div className="ml-4 space-y-1">
                        <div className="flex gap-4">
                            <span>GALPM FRQ BACK SIG (V0 ~ V9) = 1</span>
                            <span className="text-red-600">*Put 1 in all 10 items from V0 to 9</span>
                        </div>
                        <div className="flex gap-4">
                            <span>GALPM FRQ BACK SPEED (V0 ~ V9) = 300</span>
                            <span className="text-red-600">*Put 300 in all 10 items from V0 to 9</span>
                        </div>
                    </div>
                </div>

                <div className="ml-4 mt-3 space-y-1">
                    <p className="font-bold">Manage-Secret2-Page1</p>
                    <p className="ml-4">[037] MACH VEL/ACC LIMIT = 02</p>
                </div>

                {/* Diagram */}
                <div className="flex gap-8 items-start mt-4">
                    <div className="w-1/3">
                        <img src={imag128} alt="" />
                    </div>

                    <div className="w-2/3 space-y-2">
                        <p>Size Adjust Point --&gt; Dish2-Page3- GALPM FRQ BACK REV (V0 ~ V9)</p>
                        <p className="font-bold">Discharge2 : 3/12</p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page128;