import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import topDiagram from "@/assets/FAWI0005_V3/page37_top_diagram.png";
import sideDiagram from "@/assets/FAWI0005_V3/page37_side_diagram.png";

// New Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

function Page41() {

    // IO Retry Table
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border-0 bg-white font-mono", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border-0 bg-white text-[10px]", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p41_io_retry_act", type: "input" }
    ];

    // Cutting Standards for Page 41
    const cuttingStandards = {
        c0001: { v: "26~34", a: "10~13", speed: "0.95~1.25", time: "H071= 38:40~43:00" },
        c0002: { v: "47~55", a: "1.0~2.4", speed: "2.0~3.0", time: "H072= 12:00~15:00" },
        c0003: { v: "30~38", a: "-", speed: "4.5~5.5", time: "H073= 06:30~08:00" },
        totalTime: "H081= 57:20~1:09:20"
    };

    return (
        <A4Paper content={content} currentPage={41}>
            <SectionTitle>17.4 For 0.20mm Wire Machine Data-5 (STD-80mm-3rd)</SectionTitle>
            <div className="flex justify-between items-start px-4 mt-2">
                <div className="text-xs space-y-1 w-1.5/3">
                    <p>Disch-Page5-[[163]PULSE CONVERT ON 02]=</p>
                    <p>Disch-Page5-[[193] MODIFY P.CONVERT TM(W) PC0_8]=</p>
                    <p>Disch-Page5-[[194] MODIFY P.CONVERT TM(W) PC9]=</p>
                    <p>Disch-Page3 -[MODIFY WORKING CORE SV18]= -30 <span className="text-[10px]">(INITIAL VALUE)</span></p>
                    <p className="flex justify-between w-full"><span>Disch-Page9-[[339] DPW PC32 V8]=</span> <span className="italic pr-4">(For 3rd Cutting)</span></p>
                    <p className="flex justify-between w-full"><span>Disch-Page9-[[340] DPW PC32 V9]=</span> <span className="italic pr-4">(For 3rd Cutting)</span></p>
                    <p>Disch-Page12-[[476] DPW PC32 SIG BASIS]= 435</p>
                    <p>Disch-Page12-[[477] DPW PC32 SIG OFFSET]= 280</p>
                </div>

                <div className='flex flex-col items-end gap-2'>
                    <FinalEDWwireCheck prefix="p41_" />
                    <img src={topDiagram} alt="Top Diagram" className="h-16" />
                </div>
            </div>

            <div className="flex gap-4 px-4">
                <div className="w-full">
                    <div className="flex items-end justify-between">
                        <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px]">Check point of Cutting Data</span>
                        </div>
                    </div>
                    {/* Using EDWFinalRecordCutting */}
                    <EDWFinalRecordCutting prefix="p41_" standards={cuttingStandards} />

                    <div className="flex items-center gap-2 text-xs">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_work" label="Work Piece" showCheckbox />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 px-4 mt-4">
                <div className="w-1/2">
                    {/* Roughness Ra */}
                    <h3 className="font-bold text-xs">Roughness (Ra μm) (Record measured data to fallowing)</h3>

                    <EDWFinalRoughnessCheck
                        prefix="p41_ra_"
                        variant="3rd"
                        standards={{ range: "0.530~0.630" }}
                    />

                    {/* Roughness Rz */}
                    <div className="">
                        <h3 className="font-bold text-xs">Roughness (Rz Din μm) (Record measured data to fallowing)</h3>
                        <EDWFinalRoughnessCheck
                            prefix="p41_rz_"
                            variant="3rd"
                            standards={{ range: "3.70~4.80" }}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="">
                        <h3 className="font-bold text-xs">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p41_"
                            variant="3rd"
                            standards={{ x: "7.9970~8.0030", y: "7.9970~8.0030" }}
                        />
                    </div>
                </div>

                <div className="w-1/2 pl-4">
                    <div className="flex flex-col items-end mb-2 text-xs w-56 ml-auto">
                        <div className="mb-px text-right w-full">
                            <p>Before Cutting Check (LINK communication)</p>
                            <p>Check of Manage - Check - Motor I/O - Page7</p>
                        </div>
                        <FormQuickTable
                            columns={columnsIORetry}
                            data={dataIORetry}
                            headerClass="bg-white"
                            bordered
                        />
                    </div>

                    <div className="text-xs space-y-2">
                        <p>ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</p>
                        <FormItemCheck
                            name="p41_wire_lot1_check"
                            label="Wire Lot No."
                            input={{ name: "p41_wire_lot1", width: "120px" }}
                            showCheckbox={false}
                        />
                        <FormItemCheck
                            name="p41_wire_lot2_check"
                            label="Wire Lot No."
                            input={{ name: "p41_wire_lot2", width: "120px" }}
                            showCheckbox={false}
                        />
                    </div>

                    <div className="font-bold text-sm mb-2 mt-4">(Have priority "Ra " value over "RzDIN")</div>

                    <div className="flex justify-center">
                        <img src={sideDiagram} alt="Side Diagram" className="h-43 object-contain" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page41;