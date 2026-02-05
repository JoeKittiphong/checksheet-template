
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import diagram from "@/assets/FAWI0005_V3/page74_diagram.png";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

function Page74() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0012", "014", "2215", "000", "251", "34.1", "9.0", "0076", "0", "000", "0000", "020", "120", "080", "042", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0017", "0014", "2215", "000", "645", "+017.0", "9.0", "0070", "0", "000", "0000", "020", "120", "106", "058", "100539", "000000", "254114"] },
        { label: "C0002 =", values: ["0002", "009", "2215", "000", "000", "+060.0", "5.0", "0033", "0", "000", "0000", "020", "150", "085", "237", "000000", "078008", "303016"] },
        { label: "C0003 =", values: ["0015", "020", "8508", "000", "000", "+030.0", "6.0", "0070", "0", "000", "0000", "020", "150", "100", "237", "000000", "007807", "402010"] },
        { label: "C0904 =", values: ["0100", "000", "0001", "000", "035", "+260.0", "1.0", "0050", "0", "045", "0000", "020", "150", "100", "237", "000103", "000007", "502000"] },
    ];

    return (
        <A4Paper content={content} currentPage={74}>
            <div className="p-4 text-xs font-sans">
                {/* Header Section */}
                <h1 className="text-lg font-bold mb-2">20. Standard conditions (IG-S4) Cutting check [Thickness = 40mm-4th octagonal]</h1>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 <span style={{ fontFamily: 'serif' }}>Ω</span>.cm</span>
                </div>

                <div className="mb-2 font-bold">
                    Check that the upper and lower nozzles are <span className="text-xl">Ø4</span> !!! (ตรวจสอบ upper และ lower ใช้ nozzles <span className="text-xl">Ø4</span>)
                </div>

                <div className="mb-4">
                    (WIRE: TSUBAME Plus ⌀0.20 Work Piece: SKD - 11 t = 40 mm ); Use Program file <span className="text-red-600 font-bold">20_AL_020IGS4_ST40_4th_OGN_01.NC</span>
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* Red Parameters */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-black font-bold mt-4">
                    <div>H0000 = <span className="ml-4">+000000.0100</span></div>
                    <div>H0001 = <span className="ml-4">+000000.1920</span></div>
                    <div>H0002 = <span className="ml-4">+000000.1270</span></div>
                    <div>H0003 = <span className="ml-4">+000000.1070</span></div>
                    <div>H0004 = <span className="ml-4">+000000.1040</span></div>
                </div>

                {/* Diagram and Info */}
                <div className="flex gap-8 items-start py-8">
                    {/* Text Info Left */}
                    <div className="w-1/4">
                        <p className="font-bold mb-4">Micro Meter No.EDM502</p>
                        <img src={diagram} alt="Cutting Diagram" className="w-full h-auto" />
                    </div>

                    {/* Text Info Right */}
                    <div className="w-3/4 space-y-4 pt-8">
                        <p className="flex justify-between items-center">
                            <span>Dimension adjustable position--&gt; KM4 SV OFST (+10 ~ -70)</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span>Surface roughness adjustment point--&gt;   DPW PC03-23 V11 (For 4th Cut)</span>
                        </p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page74;