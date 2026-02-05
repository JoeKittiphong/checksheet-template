
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper"; 
import diagram from "@/assets/FAWI0005_V3/page46_diagram.png";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

function Page46() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0013", "014", "2215", "000", "252", "+035.0", "9.0", "0030", "0", "000", "0000", "020", "120", "114", "045", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "244", "+019.0", "9.0", "0020", "0", "000", "0000", "020", "120", "114", "063", "000009", "000000", "210000"] },
        { label: "C0002 =", values: ["0002", "009", "2215", "000", "000", "+049.0", "5.0", "1068", "0", "000", "0000", "020", "150", "114", "240", "000000", "000050", "300010"] },
        { label: "C0003 =", values: ["0017", "020", "0504", "000", "000", "+025.0", "6.5", "1100", "0", "000", "0000", "020", "150", "114", "240", "000000", "000050", "400010"] },
        { label: "C0904 =", values: ["0100", "000", "0001", "000", "000", "+019.5", "6.5", "7050", "0", "045", "0000", "020", "150", "114", "240", "000012", "000055", "500035"] },
    ];

    return (
        <A4Paper content={content} currentPage={46}>
            <div className="p-4 text-xs font-sans">
                {/* Header Section */}
                <h1 className="text-lg font-bold mb-2">18. Standard conditions (STD) Cutting check [Thickness=80mm-4th]</h1>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 <span style={{ fontFamily: 'serif' }}>Ω</span>.cm</span>
                </div>

                <div className="mb-2 font-bold">
                    Check that the upper and lower nozzles are <span className="text-xl">Ø6</span> !!! (ตรวจสอบ upper และ lower ใช้ nozzles <span className="text-xl">Ø6</span>)
                </div>

                <div className="mb-4">
                    (WIRE: TSUBAME Plus Æ0.20 Work Piece: SKD - 11 t = 80 mm ); Use Program file <span className="text-red-600 font-bold">18_AL_020STD_ST80_4TH_SQUA_10.NC</span>
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* Red Parameters */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-red-600 font-bold">
                    <div>H0000 = <span className="ml-4">+000000.0100</span></div>
                    <div>H0001 = <span className="ml-4">+000000.1915</span></div>
                    <div>H0002 = <span className="ml-4">+000000.1265</span></div>
                    <div>H0003 = <span className="ml-4">+000000.1095</span></div>
                    <div>H0004 = <span className="ml-4">+000000.1055</span></div>
                </div>

                {/* Diagram and Info */}
                <div className="flex gap-8 items-start">
                    {/* Image */}
                    <div className="w-1/3">
                        <img src={diagram} alt="Cutting Diagram" className="w-full h-auto border border-gray-300" />
                    </div>

                    {/* Text Info */}
                    <div className="w-2/3 space-y-4">
                        <p>Micrometer No.EDM502</p>
                        <p className="flex justify-between items-center w-3/4">
                            <span>Dimension adjustments-&gt; MODIFYWORKING CR SV 9 (-50 to +10)</span>
                            <span>←</span>
                        </p>
                        <p>Surface roughness adjusting point--&gt; 0.20mm: 'DPW PC12 V6' and 'DPW PC12 V7' (For 4th Cut)</p>
                        <p>Dimension adjustments--&gt; Individual machining parameters SV18 (-60 ~ +10)</p>
                        <p className="font-bold flex gap-1">
                            <span className="text-xl">※</span>
                            <span>SV correction 18 determined by STD80-3rd shall not be changed,<br />
                                and the dimensions shall be adjusted by SV compensation 9.</span>
                        </p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page46;