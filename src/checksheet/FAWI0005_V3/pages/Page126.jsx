import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import topDiagram from "@/assets/FAWI0005_V3/page50_diagram_top.png";
import sideDiagram from "@/assets/FAWI0005_V3/page123_diagram.png";

import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

function Page126() {

    // IO Retry Table
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border-0 bg-white font-mono", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border-0 bg-white text-[10px]", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p126_io_retry_act", type: "input" }
    ];

    // Cutting Standards for Page 126 (3rd cut, 80mm)
    const cuttingStandards = {
        c0001: { v: "24~29", a: "8~12", speed: "0.85~1.10", time: "H071= 33:00~45:00" },
        c0002: { v: "42~49", a: "1.0~2.4", speed: "1.5~3.0", time: "H072= 14:00~19:00" },
        c0003: { v: "18~23", a: "-", speed: "3.0~5.0", time: "H073= 06:00~11:00" },
        totalTime: "H081= 58:00~1:09:00"
    };

    // Custom data rows (only C0001-C0003, no C904)
    const cuttingDataRows = [
        { id: "C0001", placeholderV: "H122", placeholderA: "H142", placeholderSpeed: "H102", timeLabel: "H071=", stdKey: "c0001" },
        { id: "C0002", placeholderV: "H123", placeholderA: "H143", placeholderSpeed: "H103", timeLabel: "H072=", stdKey: "c0002" },
        { id: "C0003", placeholderV: "H126", placeholderA: "", placeholderSpeed: "H106", timeLabel: "H073=", stdKey: "c0003", disabled: { current: true } },
        { id: "Wire broken", isFooter: true }
    ];

    const cuttingStdRows = [
        { v: cuttingStandards.c0001.v, a: cuttingStandards.c0001.a, speed: cuttingStandards.c0001.speed, time: cuttingStandards.c0001.time },
        { v: cuttingStandards.c0002.v, a: cuttingStandards.c0002.a, speed: cuttingStandards.c0002.speed, time: cuttingStandards.c0002.time },
        { v: cuttingStandards.c0003.v, a: cuttingStandards.c0003.a, speed: cuttingStandards.c0003.speed, time: cuttingStandards.c0003.time },
        { v: "", a: "", speed: "", time: cuttingStandards.totalTime, className: "text-[9px] bg-green-500 font-bold" }
    ];


    return (
        <A4Paper content={content} currentPage={126}>
            <SectionTitle>25.2 For 0.20mm Wire Cutting Data CUT-4</SectionTitle>

            <div className="text-xs font-bold px-4">Frequency servo TM Cutting check</div>
            <div className="text-xs px-4 ml-4">[Thickness=80mm-3rd]</div>

            <div className="flex justify-between items-start px-4 mt-1">
                <div className="text-xs space-y-1 w-1/2">
                    <p>Disch2-Page1 -[TM FRQ BACK RIVISE (V0~V9)]=</p>
                </div>

                <div className='flex flex-col items-end gap-2 w-100'>
                    <FinalEDWwireCheck prefix="p126_" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px]">Check point of →</span>
                        <img src={topDiagram} alt="Top Diagram" className="h-16" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 px-4">
                <div className="w-full">
                    <div className="flex items-end justify-between">
                        <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                        <div className="font-bold text-sm mr-55">Standard</div>
                    </div>
                    <EDWFinalRecordCutting
                        prefix="p126_"
                        standards={cuttingStandards}
                        dataRows={cuttingDataRows}
                        standardRows={cuttingStdRows}
                    />

                    <div className="flex items-center gap-2 text-xs mt-1">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-4 h-4" name="p126_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p126_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p126_wb_work" label="Work Piece" showCheckbox />
                        <div className="ml-auto text-[9px]">Before Cutting Check (LINK communication)</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 px-4 mt-2">
                <div className="w-1/2">
                    {/* Roughness Ra */}
                    <h3 className="font-bold text-xs underline">Roughness (Ra &mu;m) (Record measured data to fallowing)</h3>
                    <div className="mb-2">
                        <EDWFinalRoughnessCheck
                            prefix="p126_ra_"
                            variant="3rd"
                            standards={{ range: "1.3~2.4" }}
                        />
                    </div>

                    {/* Roughness Rz Din */}
                    <div>
                        <div className="flex items-center mb-1">
                            <h3 className="font-bold text-xs underline">Roughness (Rz Din &mu;m) (Record measured data to fallowing)</h3>
                            <span className="ml-2 text-[9px] font-bold">(Have priority "Ra " value over "RzDIN")</span>
                        </div>
                        <EDWFinalRoughnessCheck
                            prefix="p126_rz_"
                            variant="3rd"
                            standards={{ range: "9.0~15.0" }}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="mt-2">
                        <h3 className="font-bold text-xs underline">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p126_"
                            variant="3rd"
                            standards={{
                                x: "7.9980~8.0020",
                                y: "7.9980~8.0020",
                                range: "7.9980~8.0020"
                            }}
                        />
                    </div>
                </div>

                <div className="w-1/2 pl-4">
                    <div className="flex flex-col items-end mb-2 text-xs w-64 ml-auto">
                        <div className="mb-px text-right w-full">
                            <p>Check of Manage - Check - Motor I/O - Page7</p>
                        </div>
                        <div className="flex w-full">
                            <div className="ml-auto w-62">
                                <FormQuickTable
                                    columns={columnsIORetry}
                                    data={dataIORetry}
                                    headerClassName="bg-white"
                                    bordered
                                />
                            </div>
                        </div>

                        <div className="text-[12px] text-right mt-1 w-full">ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</div>
                    </div>

                    {/* Wire Lot No */}
                    <div className="w-48 ml-auto mb-4">
                        <FormItemCheck
                            name="p126_wire_lot_no"
                            label="Wire Lot No."
                            showCheckbox={false}
                            input={{ name: "p126_wire_lot_no", width: "100px" }}
                            labelClassName="text-xs font-bold"
                        />
                    </div>


                    <div className="flex justify-center mt-4">
                        <div className="relative">
                            <img src={sideDiagram} alt="Side Diagram" className="h-60" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page126;