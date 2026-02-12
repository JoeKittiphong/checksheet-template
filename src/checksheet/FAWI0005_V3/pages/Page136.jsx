
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FinalConditionTable from '@/components/FormComponents/FinalConditionTable';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

// Placeholder Images
import roughnessDiagram from "@/assets/FAWI0005_V3/page136_diagram_roughness.png";
import sizeDiagram from "@/assets/FAWI0005_V3/page136_diagram_size.png";

function Page136() {

    // 1. Parameter Table Data (C0000 - C0904)
    const conditionHeaders = ["ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"];
    const conditionRows = [
        { label: "C0000 =", values: ["0000", "016", "2211", "407", "790", "+045.0", "4.0", "0045", "0", "000", "0000", "010", "030", "080", "025", "000000", "000000", "000000"] },
        { label: "C0001 =", values: ["0003", "011", "2211", "407", "360", "+030.0", "4.0", "0035", "0", "000", "0000", "010", "030", "098", "045", "000000", "000000", "250040"] },
        { label: "C0002 =", values: ["0002", "014", "2211", "000", "000", "+030.0", "2.0", "1037", "0", "000", "0000", "010", "040", "098", "240", "000003", "000003", "300025"] },
        { label: "C0003 =", values: ["0014", "020", "8504", "000", "000", "+035.0", "6.5", "1040", "0", "000", "0000", "010", "040", "098", "240", "000000", "000000", "400065"] },
        { label: "C0904 =", values: ["0100", "000", "0001", "000", "000", "+046.9", "0.0", "7060", "0", "045", "0000", "010", "040", "098", "240", "000102", "000005", "500085"] },
    ];

    // 2. Cutting Standards
    const cuttingStandards = {
        c001: { v: "40~46", a: "2.0~3.0", speed: "2.5~2.9", time: "H071= 15:00~16:30" },
        c002: { v: "45~50", a: "-", speed: "5.5~7.5", time: "H072= 04:00~06:00" },
        c003: { v: "64~68", a: "-", speed: "11.0~14.0", time: "H073= 02:00~04:00" },
        c904: { v: "-", a: "-", speed: "5.0~7.0", time: "H074= 05:00~07:00" },
        totalTime: "H081= 26:00~33:30"
    };

    const cuttingDataRows = [
        { id: "C001", timeLabel: "H071=", stdKey: "c001" },
        { id: "C002", timeLabel: "H072=", stdKey: "c002" },
        { id: "C003", timeLabel: "H073=", stdKey: "c003" },
        { id: "C904", timeLabel: "H074=", stdKey: "c904" },
        { id: "", isFooter: true, timeLabel: "H081=" }
    ];

    const cuttingStdRows = [
        { v: cuttingStandards.c001.v, a: cuttingStandards.c001.a, speed: cuttingStandards.c001.speed, time: cuttingStandards.c001.time },
        { v: cuttingStandards.c002.v, a: cuttingStandards.c002.a, speed: cuttingStandards.c002.speed, time: cuttingStandards.c002.time },
        { v: cuttingStandards.c003.v, a: cuttingStandards.c003.a, speed: cuttingStandards.c003.speed, time: cuttingStandards.c003.time },
        { v: cuttingStandards.c904.v, a: cuttingStandards.c904.a, speed: cuttingStandards.c904.speed, time: cuttingStandards.c904.time },
        { v: "", a: "", speed: "", time: cuttingStandards.totalTime, className: "text-[9px] bg-green-500 font-bold" }
    ];


    return (
        <A4Paper content={content} currentPage={136}>
            <SectionTitle>28.4  HTP Cutting Check</SectionTitle>

            <div className="px-8 mt-2 font-sans text-[10px] relative">
                <div className="font-bold mb-1">Please adjust "Low Pressure Flusing = 1.5L/min" <span className="font-normal ml-4">Water Resisit =STD : 50000 ~ 52000 &Omega;.cm</span></div>
                <div className="mb-1 text-[9px]">(WIRE: TSUBAME Plus &Oslash;0.10 Work Piece: SKD - 11 T=10mm); Use Program file <span className="text-red-500">27_AL_010HTP_ST10_4TH_SQUA_091.NC</span></div>
                <div className="font-bold text-sm mb-2">Check that the upper and lower nozzles are &Oslash;6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles &Oslash;6)</div>

                {/* Parameter Table */}
                <div className="mb-4">
                    <FinalConditionTable headers={conditionHeaders} tableRows={conditionRows} />

                    {/* H Values */}
                    <div className="grid grid-cols-3 gap-x-8 gap-y-1 mt-2 text-[10px] w-3/4">
                        <div>H0000 = <span className="ml-2">+000000.0100</span></div>
                        <div>H0001 = <span className="ml-2">+000000.1190</span></div>
                        <div>H0002 = <span className="ml-2">+000000.0720</span></div>
                        <div>H0003 = <span className="ml-2">+000000.0610</span></div>
                        <div>H0004 = <span className="ml-2">+000000.0580</span></div>
                    </div>
                </div>

                {/* Cutting Data */}
                <div className="flex gap-4">
                    <div className="w-full">
                        <div className="flex items-end justify-between">
                            <h3 className="font-bold text-sm">Cutting Data</h3>
                            <h3 className="font-bold text-sm mr-60">Standard</h3>
                        </div>
                        <EDWFinalRecordCutting
                            prefix="p136_"
                            standards={cuttingStandards}
                            dataRows={cuttingDataRows}
                            standardRows={cuttingStdRows}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    {/* Left Column: Roughness */}
                    <div className="w-full">
                        <h3 className="font-bold text-sm">Roughness (Record measured data to fallowing)</h3>
                        <div className="text-right text-[9px]">STD Roughness = Under 6.0 &mu;mRzDIN (All Points)</div>

                        <div className="flex gap-2 w-full">
                            <div className="w-full">
                                <h4 className="font-bold text-xs underline">Roughness (Rz Din &mu;m)</h4>
                                <EDWFinalRoughnessCheck
                                    prefix="p136_rz_"
                                    variant="4th"
                                    headerSuffix=""
                                    className="[&_tbody_tr:nth-child(1)]:hidden [&_tbody_tr:nth-child(3)]:hidden"
                                    standards={{
                                        range: "Under 3.0",
                                        inputs: {
                                            Mid: { x_minus: true, x_plus: true }
                                        }
                                    }}
                                />
                                <div className="text-[9px] mt-1">Call ENG Staff if you see Over 6.0umRzDIN.</div>
                            </div>
                            <div className="w-1/2">
                                <h4 className="font-bold text-xs underline mb-1">Roughness (Ra &mu;m) (Record only)</h4>
                                <EDWFinalRoughnessCheck
                                    prefix="p136_ra_"
                                    variant="4th"
                                    headerSuffix=""
                                    className="[&_tbody_tr:nth-child(1)]:hidden [&_tbody_tr:nth-child(3)]:hidden"
                                    standards={{
                                        range: "None",
                                        inputs: {
                                            Mid: { x_minus: true, x_plus: true }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Size Section */}
                        <div>
                            <h3 className="font-bold text-sm mb-1">Size (mm) (Record measured data to fallowing)</h3>
                            <div className="flex gap-4">
                                <div className="w-2/3">
                                    <div className="[&_tbody_tr:nth-child(1)]:hidden [&_tbody_tr:nth-child(3)]:hidden w-full">
                                        <EDWFinalSizeRecord
                                            prefix="p136_"
                                            variant="4th"
                                            headerSuffix=""
                                            standards={{
                                                x_minus: "9.9970~10.0030", // Variant 4th uses x_minus/y key
                                                y: "9.9970~10.0030"
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="w-full text-[10px] flex justify-start items-center">
                                    <p>STD Size = -3um~+3um (All Points)</p>
                                </div>
                            </div>
                            <div className="text-xs mt-1">Confirm result of Water-5 cutting If you see over standard.</div>
                        </div>
                    </div>
                </div>
                {/* Right Column: Diagrams */}
                <div className="w-1/2 flex flex-col items-center absolute bottom-2 right-0">
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center absolute bottom-12 right-10">
                            <img
                                src={roughnessDiagram}
                                alt="Roughness Diagram"
                                className="h-44 object-contain"
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML += '<span class="text-gray-400 text-[10px] border p-1 block">Image not found: page136_diagram_roughness.png</span>'; }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center absolute bottom-[-6px] right-40">
                        <img
                            src={sizeDiagram}
                            alt="Size Diagram"
                            className="h-40 object-contain"
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML += '<span class="text-gray-400 text-[10px] border p-1 block">Image not found: page136_diagram_size.png</span>'; }}
                        />
                    </div>
                </div>

                <div className="flex justify-start">
                    <FormCheckedBox
                        name="p136_checked_by"
                        label="Checked by :"
                        labelClassName="font-bold text-sm mr-2"
                        inputClassName="w-40 border-b border-black"
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page136;