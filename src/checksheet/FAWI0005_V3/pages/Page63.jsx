
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import diagram from "@/assets/FAWI0005_V3/page63_diagram.png";
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

function Page63() {

    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0013", "014", "2215", "000", "252", "+035.0", "9.0", "0030", "0", "000", "0000", "020", "120", "080", "043", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0017", "014", "2215", "000", "746", "+022.0", "9.0", "0020", "0", "000", "0000", "020", "120", "114", "062", "200529", "000000", "254038"] },
        { label: "C0002 =", values: ["0002", "009", "2215", "000", "000", "+52.5", "5.0", "0030", "0", "000", "0000", "020", "150", "065", "237", "000000", "009808", "303015"] },
        { label: "C0003 =", values: ["0015", "020", "8508", "000", "000", "+17.0", "6.0", "0045", "0", "000", "0000", "020", "150", "085", "237", "000000", "007807", "402000"] },
    ];

    return (
        <A4Paper content={content} currentPage={63}>
            <div className="p-4 text-[10px] font-sans">
                {/* Header Section */}
                <h1 className="text-sm font-bold mb-2">19. Standard conditions (IG-S4) Cutting check [Thickness=80mm-4th]</h1>

                <div className="flex justify-between items-center mb-2 font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 W.cm</span>
                </div>

                <div className="mb-2 font-bold flex items-center gap-1">
                    Check that the upper and lower nozzles are <span className="text-lg">Ø4</span> !!! (ตรวจสอบ upper และ lower ใช้ nozzles <span className="text-lg">Ø4</span>)
                </div>

                <div className="mb-4">
                    (Wire: swallow + Φ 0.20 workpiece: SKD-11 thickness = 80 mm); used NC filename <span className="text-red-600 font-bold">19_AL_020IGS4_ST80_3RD_SQUA_01.NC</span>
                </div>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* Parameters H */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-2 mb-4 mt-4 font-bold">
                    <div>H0000 = <span className="ml-2">+000000.0100</span></div>
                    <div>H0001 = <span className="ml-2">+000000.1895</span></div>
                    <div>H0002 = <span className="ml-2">+000000.1245</span></div>
                    <div>H0003 = <span className="ml-2">+000000.1065</span></div>
                </div>

                {/* Additional Parameters */}
                <div className="mb-6 space-y-1 font-bold pl-32">
                    <p>Disch3-page8 -[301] KM4 SV OFST =0</p>
                    <p>Disch3-page8 -[302] KM4 BUCK SPEED =100</p>
                    <p>Disch3-page8 -[301] KM4 MX SPEED =300</p>
                    <p>Disch3-page8 -[301] KM4 SP OFST =0</p>
                </div>

                {/* Diagram and Info */}
                <div className="flex gap-8 items-start">
                    {/* Image */}
                    <div className="w-1/2">
                        <img src={diagram} alt="Cutting Diagram" className="w-45 h-auto" />
                    </div>

                    {/* Text Info */}
                    <div className="w-1/2 space-y-4 pt-4">
                        <p className="font-bold text-base">Micro Meter No.EDM502</p>
                        <p className="font-bold">
                            Dimension adjustable position--&gt; Disch3-page8-[301]KM4 SV OFST (+10 ~ -70)
                        </p>
                        <p className="font-bold flex justify-between items-center pr-10">
                            <span>Surface roughness adjustment poin GALPM V6</span>
                            <span className="text-xl">←</span>
                        </p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page63;