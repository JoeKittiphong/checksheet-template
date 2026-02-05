
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import topDiagram from "@/assets/FAWI0005_V3/page50_diagram_top.png"; // Reusing diagrams from Page 50 as requested
import sideDiagram from "@/assets/FAWI0005_V3/page50_diagram_side.png";

// New Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

function Page90() {

    // IO Retry Table
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border-0 bg-white font-mono", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border-0 bg-white text-[10px]", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p90_io_retry_act", type: "input" }
    ];

    // Cutting Standards for Page 90
    const cuttingStandards = {
        c0001: { v: "26~34", a: "8.5~11.0", speed: "0.95~1.25", time: "H071= 37:00~42:00", color: "bg-green-500" }, // Green background in image
        c0002: { v: "49~57", a: "1.0~2.4", speed: "2.0~3.0", time: "H072= 12:00~16:00", color: "bg-green-500" },
        c0003: { v: "40~50", a: "0.8~2.5", speed: "4.0~8.0", time: "H073= 04:00~08:30", color: "bg-green-500" },
        c0904: { v: "2~8", a: "-", speed: "4.5~5.5", time: "H074= 06:00~08:00", color: "bg-green-500" },
        totalTime: "H081= 0:59:00~1:14:30"
    };

    return (
        <A4Paper content={content} currentPage={90}>
            <SectionTitle>21.4 For 0.20mm Wire Cutting Data CUT-3 (STD2-80mm-4th)</SectionTitle>
            <div className="flex justify-between items-start px-4 mt-2">
                <div className="text-xs space-y-1 w-1.5/3">
                    <p>Disch-Page5-[[163]PULSE CONVERT ON 02]=</p>
                    <p>Disch-Page5-[[193] MODIFY P.CONVERT TM(W) PC0_8]=</p>
                    <p>Disch-Page5-[[194] MODIFY P.CONVERT TM(W) PC9]=</p>
                    <br />
                    <div className="flex justify-between font-bold">
                        <span>Disch-Page10-[MODIFYWORKING CR SV 21] =</span>
                        <span>+10 (initial value)</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Disch-Page10-[MODIFYWORKING CR SV 29] =</span>
                        <span>【-20 (initial value)】</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Disch-Page10-[[274] DPW PC02-22]13]=</span>
                        <span className="italic">(For 4th Cutting)</span>
                    </div>
                </div>

                <div className='flex flex-col items-end gap-2'>
                    <FinalEDWwireCheck prefix="p90_" />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px]">Check point of Cutting Data</span>
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
                    {/* Using EDWFinalRecordCutting with variant="4th" to match structure (C0001-C904) */}
                    <EDWFinalRecordCutting
                        prefix="p90_"
                        variant="4th"
                        standards={cuttingStandards}
                    />

                    <div className="flex items-center gap-2 text-xs mt-1">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-4 h-4" name="p90_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p90_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p90_wb_work" label="Work Piece" showCheckbox />
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
                            prefix="p90_ra_"
                            variant="4th"
                            standards={{ range: "0.270~0.360" }}
                        />
                    </div>

                    {/* Roughness Rz */}
                    <div>
                        <div className="flex items-center mb-1">
                            <h3 className="font-bold text-xs underline">Roughness (Rz Din &mu;m) (Record measured data to fallowing)</h3>
                            <span className="ml-2 text-[9px] font-bold">(Have priority "Ra " value over "RzDIN")</span>
                        </div>
                        <EDWFinalRoughnessCheck
                            prefix="p90_rz_"
                            variant="4th"
                            standards={{ range: "2.30~3.30" }}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="mt-2 relative">
                        <h3 className="font-bold text-xs underline">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p90_"
                            variant="4th-dual-std"
                            standards={{
                                x_p: "7.9985~8.0015", y_p: "7.9985~8.0015",
                                x_gq: "7.9980~8.0020", y_gq: "7.9980~8.0020",
                                valid: "7.9980~8.0020" // Using wider range for validation or logic as needed
                            }}
                        />
                        <div className="absolute bottom-[1px] right-[-25px]">
                            <div className="flex gap-2 font-bold text-[10px] items-center mt-1">
                                <span>P-Type</span>
                            </div>
                            <div className="flex gap-2 font-bold text-[10px] items-center">
                                <span>G/Q-Type</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 pl-4">
                    <div className="flex flex-col items-end mb-2 text-xs w-64 ml-auto">
                        <div className="mb-px text-right w-full">
                            <p>Check of Manage - Check - Motor I/O - Page7</p>
                        </div>
                        <div className="flex w-full">
                            <div className="ml-auto w-52">
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

                    <div className="flex justify-center mt-8">
                        <div className="relative">
                            <img src={sideDiagram} alt="Side Diagram" className="h-60" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page90;