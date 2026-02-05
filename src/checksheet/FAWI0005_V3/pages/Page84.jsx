
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import diagram from "@/assets/FAWI0005_V3/page46_diagram.png";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

function Page84() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0006", "014", "2215", "000", "240", "+040.0", "8.0", "0050", "0", "000", "0000", "020", "120", "080", "045", "000000", "000000", "100000"] },
        { label: "C0001 =", values: ["0008", "014", "2215", "000", "242", "+015.0", "8.0", "0050", "0", "000", "0000", "020", "120", "105", "055", "000000", "000000", "200014"] },
        { label: "C0002 =", values: ["0002", "011", "2215", "000", "000", "+056.0", "5.0", "1075", "0", "000", "0000", "020", "160", "105", "140", "000000", "000060", "300014"] },
        { label: "C0003 =", values: ["0001", "016", "2210", "000", "000", "+034.0", "2.0", "1100", "0", "000", "0000", "020", "160", "105", "240", "000000", "000060", "400014"] },
        { label: "C0004 =", values: ["0015", "020", "0515", "000", "000", "+004.0", "0.0", "1105", "0", "000", "0000", "020", "160", "105", "240", "000000", "000000", "500014"] },
    ];

    return (
        <A4Paper content={content} currentPage={84}>
            <div className="p-4 text-xs font-sans">
                {/* Header Section */}
                <h1 className="text-lg font-bold mb-2">21. Standard condition (STD2) Cutting check [Thickness=80mm-4th]</h1>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 <span style={{ fontFamily: 'serif' }}>Ω</span>.cm</span>
                </div>

                <div className="mb-2 font-bold">
                    Check that the upper and lower nozzles are <span className="text-xl">Ø6</span> !!! (ตรวจสอบ upper และ lower ใช้ nozzles <span className="text-xl">Ø6</span>)
                </div>

                <div className="mb-4">
                    (WIRE: TSUBAME Plus Æ0.20 Work Piece: SKD - 11 t = 80 mm ); Use Program file <span className="text-red-600 font-bold">21_AL_020STD2_ST80_4TH_SQUA_09.NC</span>
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* H Parameters */}
                <div className="flex gap-16 mb-8 mt-4 font-bold">
                    <div>
                        <div>H0000 = <span className="ml-4">+000000.0100</span></div>
                        <div>H0003 = <span className="ml-4">+000000.1150</span></div>
                    </div>
                    <div>
                        <div>H0001 = <span className="ml-4">+000000.2050</span></div>
                        <div>H0004 = <span className="ml-4">+000000.1040</span></div>
                    </div>
                    <div>
                        <div>H0002 = <span className="ml-4">+000000.1350</span></div>
                    </div>
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
                        <p>Dimension adjustments-&gt; MODIFYWORKING CR SV 21 (-35 to +55)</p>
                        <p>Surface roughness adjusting point--&gt; 0.20mm: 'DPW PC02-22 V13' (For 4th Cut)</p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page84;