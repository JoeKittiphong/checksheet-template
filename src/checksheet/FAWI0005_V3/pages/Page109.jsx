import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

// Assets (Placeholder names - User to verify)
import diagram1 from "@/assets/FAWI0005_V3/page109_diagram_1.png";
import diagram2 from "@/assets/FAWI0005_V3/page109_diagram_2.png";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page109() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0011", "014", "2215", "000", "242", "+040.0", "9.0", "0070", "0", "000", "0000", "020", "120", "080", "045", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "255", "+018.0", "9.0", "0080", "0", "000", "0000", "020", "120", "100", "055", "000009", "000000", "200025"] },
        { label: "C0002 =", values: ["0002", "011", "2215", "000", "000", "+061.0", "5.0", "1075", "0", "000", "0000", "020", "160", "100", "140", "000000", "000060", "300025"] },
        { label: "C0003 =", values: ["0001", "016", "2210", "000", "000", "+041.0", "2.0", "1100", "0", "000", "0000", "020", "160", "100", "240", "000000", "000060", "400025"] },
        { label: "C0004 =", values: ["0015", "020", "0515", "000", "000", "+006.0", "0.0", "1105", "0", "000", "0000", "020", "160", "100", "240", "000000", "000060", "500025"] },
        { label: "C0905 =", values: ["0100", "000", "0001", "000", "000", "+030.3", "7.8", "9090", "0", "045", "0000", "020", "160", "100", "240", "000002", "000068", "600025"] },
        { label: "C0906 =", values: ["0100", "000", "0001", "000", "029", "+000.0", "6.5", "3060", "0", "045", "0000", "020", "160", "100", "240", "000001", "000000", "700025"] },
        { label: "C0907 =", values: ["0100", "000", "0001", "000", "029", "+000.0", "4.5", "3050", "0", "045", "0000", "020", "160", "100", "240", "000001", "000000", "800025"] },
    ];

    return (
        <A4Paper content={content} currentPage={109}>
            <div className="p-4 text-xs font-sans">
                {/* Header Section */}
                <SectionTitle>24. Accuracy conditions (ACR2) Cutting check [Thickness=20mm-7th] ALN400Q and ALN600Q : No Test</SectionTitle>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 <span style={{ fontFamily: 'serif' }}>Ω</span>.cm</span>
                </div>

                <div className="mb-4 mt-4 text-[10px]">
                    (WIRE: TSUBAME Plus Æ0.20 Work Piece: SKD - 11 (Hardening) t = 20 mm ); Use Program file <span className="text-red-600 font-bold">22_AL_020ACR2_ST20_7TH_SQUA_09.NC</span>
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* Red Parameters */}
                <div className="grid grid-cols-3 gap-1 mb-2 text-red-600 font-bold mt-2 text-[10px]">
                    <div>H0000 = <span className="ml-4">+000000.0100</span></div>
                    <div>H0001 = <span className="ml-4">+000000.2110</span></div>
                    <div>H0002 = <span className="ml-4">+000000.1410</span></div>
                    <div>H0003 = <span className="ml-4">+000000.1210</span></div>
                    <div>H0004 = <span className="ml-4">+000000.1100</span></div>
                    <div>H0005 = <span className="ml-4">+000000.1070</span></div>
                    <div>H0006 = <span className="ml-4">+000000.1060</span></div>
                    <div>H0007 = <span className="ml-4">+000000.1050</span></div>
                </div>

                {/* Diagram and Info */}
                <div className="flex gap-4 items-start w-full">
                    <div className="w-1/3 flex flex-col items-center">
                        <img src={diagram1} alt="Cutting Diagram 1" className="h-[150px] object-contain mb-4" />
                        <img src={diagram2} alt="Cutting Diagram 2" className="h-[250px] object-contain" />
                    </div>

                    <div className="w-1/2 ">
                        {/* Diagram 1 pointer text */}
                        <div className="relative h-[150px] flex items-center mb-8">
                            <span className="font-bold">Place Work piece this position.</span>
                        </div>

                        <div className="space-y-4 font-bold text-sm">
                            <p>Do not change "MODIFY WORKING CORE SV18 and SV19" this check !!</p>
                            <p>Because you have been changed already at previous adjustment [21] and [23].</p>

                            <div className="grid grid-cols-2 gap-2 text-xs font-normal mt-4">
                                <div>
                                    <p>Size Adjust Point --&gt;None</p>
                                    <p className="mt-2">Roughness Adjust Point --&gt;</p>
                                </div>
                                <div className="space-y-1">
                                    <p>DPW PC01-21 V4 (For 7th Cut)</p>
                                    <p>DPW PC01-21 V5 (For 7th Cut)</p>
                                    <p>DPW PC01-21 V6 (For 6th Cut)</p>
                                    <p>DPW PC01-21 V7 (For 6th Cut)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page109;