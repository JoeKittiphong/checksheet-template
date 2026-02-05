
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import diagram from "@/assets/FAWI0005_V3/page94_diagram.png";

function Page94() {
    // Table Headers
    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    // Table Data
    const tableRows = [
        { label: "C0000 =", values: ["0012", "014", "2215", "000", "251", "+035.0", "9.0", "0070", "0", "000", "0000", "020", "120", "080", "040", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "245", "+016.0", "9.0", "0065", "0", "000", "0000", "020", "120", "105", "054", "000009", "000000", "230040"] },
        { label: "C0002 =", values: ["0002", "008", "2215", "000", "000", "+050.0", "5.0", "1068", "0", "000", "0000", "020", "150", "105", "240", "000003", "000003", "300012"] },
        { label: "C0003 =", values: ["0015", "020", "8504", "000", "000", "+034.0", "6.7", "1050", "0", "000", "0000", "020", "150", "105", "240", "000000", "000000", "400037"] },
        { label: "C0904 =", values: ["0100", "000", "0001", "000", "000", "+012.9", "8.0", "7050", "0", "045", "0000", "020", "150", "105", "240", "000002", "000006", "500054"] },
    ];

    return (
        <A4Paper content={content} currentPage={94}>
            {/* Header / Title Section */}
            <div>
                <SectionTitle>22. Standard condition (STD2) Cutting check [Thickness=40mm-4th]</SectionTitle>

                <div className="flex justify-between text-xs px-2 mt-2 font-sans font-bold">
                    <span>For 0.20mm Wire</span>
                    <span>Adjust to "Low pressure jet = 1.5L/min".</span>
                    <span>Water Resist = STD : 50000 ~ 52000 &Omega;.cm</span>
                </div>

                <div className="mt-4 px-2 font-bold text-sm">
                    Check that the upper and lower nozzles are &Oslash;6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles &Oslash;6)
                </div>
                <div className="px-2 text-[10px] mt-1">
                    (Wire: swallow + &#8545; 0.20 workpiece: SKD-11 thickness = 40 mm); used NC filename <span className="text-red-500 font-bold">22_AL_020STD2_ST40_4TH_OGN15_10.NC</span>
                </div>
            </div>

            {/* Parameter Table */}
            <div className="mt-6 px-2 overflow-x-auto">
                <div className="min-w-full text-[9px]"> {/* Smaller font to fit many columns */}
                    <FinalConditionTable headers={headers} tableRows={tableRows} />
                </div>
            </div>

            {/* H Values */}
            <div className="mt-8 px-10 grid grid-cols-3 gap-8 text-[11px] font-mono">
                <div>
                    <p>H0000 = +000000.0100</p>
                    <p className="mt-2">H0003 = +000000.1100</p>
                </div>
                <div>
                    <p>H0001 = +000000.1900</p>
                    <p className="mt-2">H0004 = +000000.1070</p>
                </div>
                <div>
                    <p>H0002 = +000000.1250</p>
                </div>
            </div>

            {/* Footer Diagram and Notes */}
            <div className="mt-10 px-4 pb-4">
                <div className="flex gap-4 items-end">
                    {/* Diagram Section */}
                    <div className="flex flex-col items-start mr-8">
                        <span className="text-xs mb-1">Micro Meter No.EDM502</span>
                        <img src={diagram} alt="Diagram" className="h-40 object-contain" />
                    </div>

                    {/* Notes Section */}
                    <div className="text-[10px] font-sans ml-4 space-y-4 mb-4">
                        <div className="flex gap-2">
                            <span>Dimension adjustable position--&gt; MODIFY WORKING CORE SV21 (-25 ~ +55)</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>Surface roughness adjusting point--&gt; 0.20mm: DPW PC02-22 V8 (For 4th Cut)</span>
                            <span className="font-bold text-lg">&larr;</span>
                        </div>
                    </div>
                </div>

                {/* Checked By */}
                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p94_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page94;