
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import diagram from '@/assets/FAWI0005_V3/page33_diagram.png';
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';

function Page33() {
    const headers = [
        "ON", "OFF", "IP", "HRP", "MAO", "SV",
        "V", "SF", "C", "PIK", "CTRL", "WK",
        "WT", "WS", "WP", "PC", "SK", "BSA"
    ];

    const tableRows = [
        { label: "C0000 =", values: ["0013", "014", "2215", "000", "252", "+035.0", "9.0", "0030", "0", "000", "0000", "020", "120", "114", "040", "000009", "000000", "100000"] },
        { label: "C0001 =", values: ["0013", "014", "2215", "000", "244", "+019.0", "9.0", "0020", "0", "000", "0000", "020", "120", "114", "063", "000009", "000000", "210000"] },
        { label: "C0002 =", values: ["0002", "009", "2215", "000", "000", "+049.0", "5.0", "1068", "0", "000", "0000", "020", "150", "114", "240", "000000", "000060", "300010"] },
        { label: "C0903 =", values: ["0100", "000", "0001", "000", "000", "+033.0", "8.5", "7050", "0", "045", "0000", "020", "150", "114", "240", "000032", "000064", "400040"] },
    ];

    const listItems = [
        { label: "PC32 V0 SIG RATE = 45" },
        { label: "PC32 V1 SIG RATE = 50" },
        { label: "PC32 V2 SIG RATE = 55" },
        { label: "PC32 V3 SIG RATE = 60" },
        { label: "PC32 V4 SIG RATE = 65" },
        { label: "PC32 V5 SIG RATE = 70" },
        { label: "PC32 V6 SIG RATE = 75" },
        { label: "PC32 V7 SIG RATE = 85" },
        { label: "PC32 V8 SIG RATE = 93" },
        { label: "PC32 V9 SIG RATE = 100" },
    ];

    const listItemsRight = [
        { label: "PC32 V10 SIG RATE = 100" },
        { label: "PC32 V11 SIG RATE = 100" },
        { label: "PC32 V12 SIG RATE = 95" },
        { label: "PC32 V13 SIG RATE = 90" },
        { label: "PC32 V14 SIG RATE = 80" },
        { label: "PC32 V15 SIG RATE = 80" },
        { label: "PC32 V16 SIG RATE = 80" },
        { label: "PC32 V17 SIG RATE = 80" },
        { label: "PC32 V18 SIG RATE = 80" },
        { label: "PC32 V19 SIG RATE = 80" },
    ];

    return (
        <A4Paper content={content} currentPage={33}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-1">

                <SectionTitle className="mt-0 w-max text-sm">17. Standard conditions (STD) Cutting check [Thickness=80mm-3rd, Wire 0.20mm.]</SectionTitle>

                <div className="flex justify-between font-bold px-2">
                    <span>For 0.20mm Wire</span>
                    <span>Please adjust "Low Pressure Flusing = 1.5L/min"</span>
                    <span>Water Resist =STD : 50000 ~ 52000 Ω.cm</span>
                </div>
                <span className="font-bold">(WIRE: TSUBAME Plus Æ0.20 Work Piece: SKD - 11  t = 80 mm ); Use Program file <span className="text-red-600 font-bold">17_AL_020STD_ST80_3RD_SQUA_09.NC</span></span>

                <FinalConditionTable headers={headers} tableRows={tableRows} />

                {/* Red Parameters */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-red-600 font-bold text-xs mt-4">
                    <div>H0000 = <span className="ml-4">+000000.0100</span></div>
                    <div>H0001 = <span className="ml-4">+000000.1895</span></div>
                    <div>H0002 = <span className="ml-4">+000000.1245</span></div>
                    <div>H0003 = <span className="ml-4">+000000.1075</span></div>
                </div>

                <div className="border border-black p-2 mt-2">
                    <p className="font-bold mb-2">**ตรวจสอบ Data ตามข้อมูลด้านล่าง [Dish3 - P.7/12]</p>
                    <div className="flex gap-4">
                        <div className="w-1/2 flex flex-col gap-1">
                            {listItems.map((item, idx) => (
                                <FormItemCheck
                                    key={idx}
                                    name={`p33_left_${idx}`}
                                    label={<span className="font-mono text-[10px]">{item.label}</span>}
                                    showCheckbox={true}
                                />
                            ))}
                        </div>
                        <div className="w-1/2 flex flex-col gap-1">
                            {listItemsRight.map((item, idx) => (
                                <FormItemCheck
                                    key={idx}
                                    name={`p33_right_${idx}`}
                                    label={<span className="font-mono text-[10px]">{item.label}</span>}
                                    showCheckbox={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex mt-2 gap-4">
                    <div className="w-1/2">
                        <img src={diagram} alt="3rd Cut Diagram" className="w-full h-auto object-contain max-h-[250px]" />
                    </div>
                    <p className="text-[10px] font-mono mt-40">
                        Size Adjust Point --&gt; MODIFY WORKING CORE SV18 (-70 ~ +10)<br />
                        Roughness Adjust Point --&gt; 0.20mm: 'DPW PC32 V8' and 'DPW PC32 V9' (For 3rd Cut)
                    </p>
                    <div className="w-1/2 flex justify-end items-end pb-8">
                        <FormCheckedBox name="p33_checked_by" label="Checked by :" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page33;