import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import topDiagram from "@/assets/FAWI0005_V3/page50_diagram_top.png";
import sideDiagram from "@/assets/FAWI0005_V3/page50_diagram_side.png";

// Reusable Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

function Page69() {
    const { register, control, formState: { errors } } = useFormContext();

    // Watch calculation inputs
    const calcVal1 = useWatch({ control, name: "p69_calc_val1" });
    const calcVal2 = useWatch({ control, name: "p69_calc_val2" });

    // Calculate result
    const calculateResult = () => {
        const v1 = parseFloat(calcVal1);
        const v2 = parseFloat(calcVal2);
        if (isNaN(v1) || isNaN(v2)) return "______";
        return (v1 - v2).toFixed(2);
    };

    // IO Retry Table
    const columnsIORetry = [
        { header: "STD", key: "std", width: "30%", className: "bg-white font-normal text-center h-8", isLabel: true },
        { header: "ACT", key: "act", width: "40%", className: "bg-gray-400 font-normal h-8" }
    ];

    const columnsIORetry67 = [
        { header: "", key: "code", width: "25%", className: "border bg-white font-mono text-center", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border bg-white text-[10px] text-center", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal text-center", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p69_io_retry_act", type: "input" }
    ];

    // Cutting Standards for Page 69
    const cuttingStandards = {
        c0001: { v: "26~34", a: "10.0~14.0", speed: "0.8~1.3", time: "H071= 36:30~46:30" },
        c0002: { v: "42~52", a: "1.3~3.3", speed: "2.4~3.4", time: "H072= 10:30~12:30", color: "text-red-500" },
        c0003: { v: "1150~1400", a: "0.2~1.3", speed: "3.5~5.5", time: "H073= 07:00~09:00", color: "text-red-500" },
        c904: { v: "-", a: "", speed: "", time: "" },
        totalTime: "H081= 54:00~1:08:00"
    };

    return (
        <A4Paper content={content} currentPage={69}>
            <SectionTitle>19.4 For 0.20mm Wire Machine data-3 (IG-S4-80mm-3rd)</SectionTitle>

            {/* Header Info & Diagram */}
            <div className="relative flex justify-between items-start px-4 mt-2">
                <div className="text-xs space-y-1 w-2/3">
                    <p>Disch-Page5-[[163] PULSE CONVERT ON 02] =</p>
                    <p>Disch-Page5-[[193] MODIFY P.C. TM (W) PC0_8] =</p>
                    <p>Disch-Page5-[[194] MODIFY P.C. TM (W) PC9] =</p>
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch-Page11-[GALPM machining V6] =</span>
                        <span className="italic">(For 3rd Cutting)</span>
                    </div>
                    <br />
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch 3-Page8-[DHF SV OFFSET NGAL] = <span className="pl-8">0 (initial value)</span></span>
                    </div>
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch 3-Page8-[KM4 SV OFST]=Disch-Page3-[MODIFYWORKING CR SV 18] =</span>
                        <span>(initial value)</span>
                    </div>
                </div>

                <div className='absolute top-[-20%] right-0 flex flex-col items-end gap-1'>
                    <FinalEDWwireCheck prefix="p69_" />
                    <div className="relative">
                        <img src={topDiagram} alt="Top Diagram" className="h-16" />
                        <span className="absolute -left-25 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">Check point of ➔</span>
                    </div>
                </div>
            </div>

            {/* Cutting Record Table */}
            <div className="flex gap-4 px-4 mt-4">
                <div className="w-full">
                    <div className="w-110 flex items-end justify-between">
                        <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                        <div className="font-bold text-sm">Standard</div>
                    </div>

                    <EDWFinalRecordCutting
                        prefix="p69_"
                        standards={cuttingStandards}
                    />

                    <div className="flex items-center gap-2 text-xs">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-4 h-4" name="p69_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p69_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p69_wb_work" label="Work Piece" showCheckbox />

                        <div className="ml-auto text-[10px]">Before Cutting Check (LINK communication)</div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex gap-4 px-4">
                <div className="w-1/2">
                    {/* Roughness Ra */}
                    <h3 className="font-bold text-xs">Roughness (Ra μm) (Record measured data to fallowing)</h3>
                    <EDWFinalRoughnessCheck
                        prefix="p69_ra_"
                        variant="3rd"
                        standards={{ range: "0.430~0.640" }}
                    />

                    {/* Roughness Rz */}
                    <div className="">
                        <h3 className="font-bold text-xs">Roughness (Rz Din μm) (Record measured data to fallowing)</h3>
                        <EDWFinalRoughnessCheck
                            prefix="p69_rz_"
                            variant="3rd"
                            standards={{ range: "3.70~4.50" }}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="">
                        <h3 className="font-bold text-xs">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p69_"
                            variant="3rd"
                            standards={{ x: "7.9970~8.0020", y: "7.9980~8.0040" }}
                        />
                    </div>
                </div>

                <div className="w-1/2 pl-4">
                    <div className="flex flex-col items-end mb-2 text-xs ml-auto">
                        <div className="mb-1 text-right w-full">
                            <p>Check of Manage - Check - Motor I/O - Page7</p>
                        </div>
                        <div className="w-68">
                            <FormQuickTable
                                columns={columnsIORetry67}
                                data={dataIORetry}
                                headerClass="bg-white"
                                bordered
                            />
                        </div>
                        <div className="text-xs">ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</div>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <div className="w-full flex justify-between items-start text-xs font-bold mb-2">
                            <span>(Have priority "Ra " value over "RzDIN")</span>
                        </div>
                        {/* Diagram area */}
                        <div className="relative w-full h-48">
                            <img src={sideDiagram} alt="Side Diagram" className="h-full object-contain mx-auto" />
                            <span className="absolute right-0 top-1/2 text-[8px]">Measurement point of roughness</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Calculation */}
            <div className="px-4 text-xs space-y-2">
                <div className="flex items-center gap-1">
                    <span>Calculation: (Disch 3 - page8 - DHF SV OFFSET NGAL) - (H291) = </span>
                    <input
                        {...register("p69_calc_val1", { required: true })}
                        className={`border-b border-black w-12 text-center outline-none ${errors.p69_calc_val1 ? 'bg-red-500' : ''}`}
                        placeholder="_____"
                        type="number" step="any"
                    />
                    <span> - </span>
                    <input
                        {...register("p69_calc_val2", { required: true })}
                        className={`border-b border-black w-12 text-center outline-none ${errors.p69_calc_val2 ? 'bg-red-500' : ''}`}
                        placeholder="_____"
                        type="number" step="any"
                    />
                    <span> = </span>
                    <span className="font-bold min-w-[30px] border-b border-black text-center">{calculateResult()}</span>
                </div>
                <p>If the judgment is OK and the calculation result is -50~+50, pass the test and proceed to the next process.</p>
                <p>If the judgment is OK and the calculation result exceeds -50 to +50: Enter the value of H291 and perform machining again.</p>
                <p>If the judgment is OK after processing data 3,</p>
                <p>the calculation result will pass even if it exceeds -50 to +50. Please proceed to the next process.</p>
            </div>
        </A4Paper>
    );
}

export default Page69;