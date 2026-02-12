import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';
import diagramTop from "@/assets/FAWI0005_V3/page121_diagram_top.png";

function Page121() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0013", "014", "2215", "000", "252", "+35.0", "9.0", "0035", "0", "000", "0000", "020", "120", "080", "043", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "264", "+020.0", "9.0", "0025", "0", "000", "0000", "020", "120", "110", "063", "000009", "000000", "200000"] },
        { label: "C0002 =", values: ["0002", "011", "2215", "000", "000", "+079.0", "5.0", "0300", "0", "000", "0000", "020", "170", "114", "140", "000000", "000001", "300020"] },
        { label: "C0003 =", values: ["0001", "016", "2210", "000", "000", "+098.0", "2.0", "0300", "0", "000", "0000", "020", "170", "114", "240", "000000", "000001", "400020"] },
    ];

    return (
        <A4Paper content={content} currentPage={121}>
            <div className="flex flex-col gap-1 px-2 font-sans text-[10px]">
                <SectionTitle>25. Frequency servo TM Cutting check [Thickness=80mm-3rd]</SectionTitle>

                <div className="flex justify-between items-end mb-1 px-1">
                    <div>For 0.20mm Wire</div>
                    <div className="font-bold underline">Please adjust "Low Pressure Flushing = 1.5L/min"</div>
                </div>

                <div className="text-[9px] mb-1 px-1">
                    (WIRE: TSUBAME Plus AEO.20 Work Piece: SKD - 11 T = 80 mm ); Use Program file <span className="text-red-600">23_P20_T80_3C-HINDTEST-BOSF3</span>
                </div>

                <div className="mb-1 font-bold text-[10px] px-1">
                    Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)
                </div>

                {/* Condition Table */}
                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* H Codes */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-2 px-4 text-[10px] mt-2">
                    <div>H0001 = +000000.1964 (1ST)</div>
                    <div>H0002 = +000000.1264 (2ND)</div>
                    <div>H0003 = +000000.0100</div>
                </div>

                {/* Data Setting Check */}
                <div className="mb-2">
                    <div className="font-bold text-[11px] mb-1">Data Setting Check</div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] pl-4">
                        <div>
                            <p>Manage-Parameter-Disch2-Page1</p>
                            <p className="pl-4">TM FRQ BACK SIG (V0 ~ V9) = 3</p>
                        </div>
                        <div className="flex items-center">
                            *Put 3 in all 10 items from V0 to 9
                        </div>
                        <div>
                            <p>Manage-Parameter-Disch2-Page2</p>
                            <p className="pl-4">TM FRQ BACK SPEED (V0 ~ V9) = 300</p>
                        </div>
                        <div className="flex items-center">
                            *Put 300 in all 10 items from V0 to 9
                        </div>
                        <div>
                            <p>Manage-Secret2-Page1</p>
                            <p className="pl-4">[037] MACH VEL/ACC LIMIT = 02</p>
                        </div>
                    </div>
                </div>

                {/* Diagrams */}
                <div className="flex justify-around items-start mt-2">
                    <div className="flex flex-col items-center">
                        <div className="p-1 mb-1">
                            <img
                                src={diagramTop}
                                alt="3rd TOP Diagram"
                                className="w-[150px] object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentNode.innerHTML = '<div class="w-[150px] h-[100px] bg-gray-200 flex items-center justify-center text-red-500 font-bold border border-dashed border-red-500 text-[8px]">Image not found: page121_diagram_top.png</div>';
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-end h-full pt-10">
                        <div className="text-[9px]">
                            Discharge2 : 1/12
                        </div>
                        <div className="text-[9px]">
                            Size Adjust Point --&gt; Dish2-Page1-TM FRQ BACK REVICE (V0 ~ V9)
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page121;