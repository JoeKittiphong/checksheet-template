
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Reusable Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

// Diagrams (using Page 78 diagrams for now)
import diagramSide from "@/assets/FAWI0005_V3/page78_diagram_side.png";
import diagramTop from "@/assets/FAWI0005_V3/page78_diagram_top.png";
import iconCheck from "@/assets/FAWI0005_V3/page78_icon_check.png";

function Page79() {
    const { register, control, formState: { errors } } = useFormContext();

    // Standards
    // Standards
    const roughnessStdsRa = {
        stds: { d: "~0.330", f: "~0.330" },
        inputs: {
            Up: { d: true },
            Mid: { d: true },
            Low: { d: true, f: true }
        }
    };
    const roughnessStdsRz = {
        stds: { d: "~2.60", f: "~2.60" },
        inputs: {
            Up: { d: true },
            Mid: { d: true },
            Low: { d: true, f: true }
        }
    };
    const sizeStds = { ae: "14.9980~15.0020", bf: "14.9980~15.0020", cg: "14.9980~15.0020", dh: "14.9980~15.0020" };

    // Cutting Standards for Page 79 (Copied from 78, may need update)
    const cuttingStandards = {
        c0001: { v: "21~26", a: "15.0~18.0", speed: "2.4~3.3", time: "H071= 19:30~22:30" },
        c0002: { v: "53~61", a: "1.3~2.3", speed: "2.8~3.8", time: "H072= 11:20~15:30" },
        c0003: { v: "750~1050", a: "0.7~2.0", speed: "5.5~7.0", time: "H073= 06:00~09:00" },
        c904: { v: "2000~3200", a: "-", speed: "4.5~5.5", time: "H074= 09:00~10:00" },
        totalTime: "H081= 45:50~57:00"
    };

    // Placeholders for Page 79
    const cuttingPlaceholders = {
        c0003: { a: "" },
        c904: { v: "H127", speed: "H107" }
    };

    // IO Retry Table Columns
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border bg-white font-mono text-center", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border bg-white text-[10px] text-center", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal text-center", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p79_io_retry_act", type: "input" }
    ];

    return (
        <A4Paper content={content} currentPage={79}>
            <SectionTitle>20.4 For 0.20mm Wire Machine Data CUT-2 (IG-S4-40mm-4th)</SectionTitle>

            {/* Header Info & Diagram */}
            <div className="relative flex justify-between items-start px-4 text-[9px] font-sans">
                <div className="space-y-1 w-2/3">
                    <p>Disch-Page5-[[163] PULSE CONVERT ON 02] =</p>
                    <p>Disch-Page5-[[193] MODIFY P.C. TM (W) PC0_8] =</p>
                    <p>Disch-Page5-[[194] MODIFY P.C. TM (W) PC9] =</p>
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch-Page11-[GALPM machining V6] =</span>
                        <span className="italic">(For 3rd Cutting)</span>
                    </div>
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch-Page8-[DPW PC03-23 V11] =</span>
                        <span className="italic">(For 4th Cutting)</span>
                    </div>
                    <br />
                    <p>Disch 3-Page8-[DHF SV OFFSET NGAL] =</p>
                    <div className="flex items-center gap-1">
                        <span>Disch 3-Page8-[DHF SV OFFSET DPW] = </span>
                        <input className="border-b border-black w-24 outline-none text-center" {...register("p79_dhf_offset")} />
                    </div>
                    <p>Disch 3-Page8-[KM4 SV OFST] =</p>
                </div>

                <div className='absolute top-[-18%] right-[-1%] flex flex-col items-end gap-1'>
                    <FinalEDWwireCheck prefix="p79_" />
                    <div className="relative mt-2 text-center">
                        <img src={iconCheck} alt="Check Icon" className="w-22 mx-auto" />
                    </div>
                </div>
            </div>

            <div className="px-4 mb-4">
                <div className="flex items-end justify-between w-full mb-1">
                    <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                    <div className="font-bold text-sm mr-55">Standard</div>
                </div>

                <EDWFinalRecordCutting prefix="p79_" standards={cuttingStandards} />

                <div className="flex items-center gap-4 text-[10px] mt-1">
                    <div className="flex items-center gap-2 ml-auto">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-4 h-4" name="p79_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p79_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p79_wb_work" label="Work Piece" showCheckbox />
                    </div>
                    <div className="ml-2 text-[9px]">Before Cutting Check (LINK communication)</div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex gap-4 px-4">
                <div className="w-3/5">
                    {/* Roughness Ra */}
                    <h3 className="font-bold text-xs underline mb-1">Roughness (Ra &mu;m) (Record measured data to fallowing)</h3>
                    <div className="mb-2">
                        <EDWFinalRoughnessCheck
                            prefix="p79_ra_"
                            variant="4th-7points"
                            standards={roughnessStdsRa}
                        />
                    </div>

                    {/* Roughness Rz */}
                    <div className="mb-2">
                        <div className="flex items-center mb-1">
                            <h3 className="font-bold text-xs underline">Roughness (Rz Din &mu;m) (Record measured data to fallowing)</h3>
                            <span className="ml-2 text-[9px] font-bold">(Have priority "Ra" value over "RzDIN")</span>
                        </div>
                        <EDWFinalRoughnessCheck
                            prefix="p79_rz_"
                            variant="4th-7points"
                            standards={roughnessStdsRz}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="mb-2">
                        <h3 className="font-bold text-xs underline mb-1">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p79_"
                            variant="4th-pairs"
                            standards={sizeStds}
                        />
                    </div>

                    {/* Calculations */}
                    <div className="text-[9px] font-bold">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                <span>Maximum No.</span>
                                <input className="border-b border-black w-24 text-center outline-none" {...register("p79_max_no")} />
                            </div>
                            <div className="flex items-center gap-1">
                                <span>Minimum No.</span>
                                <input className="border-b border-black w-24 text-center outline-none" {...register("p79_min_no")} />
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>Culculate Range error fallowing formula --&gt; [ Max ] - [ Min ] = </span>
                            <input className="border-b border-black w-20 text-center outline-none" {...register("p79_range_error")} />
                        </div>

                        <div className="flex items-center gap-1">
                            <span>Culculate Size error fallowing formula --&gt; [ (a-e) Mid ] - [ (c-g) Mid ] = </span>
                            <input className="border-b border-black w-20 text-center outline-none" {...register("p79_size_error")} />
                        </div>
                    </div>
                </div>

                <div className="w-2/5 pl-2 flex flex-col items-center">

                    {/* Check Motor Table */}
                    <div className="w-full mb-4">
                        <div className="text-[9px] text-right mb-1">Check of Manage - Check - Motor I/O - Page?</div>
                        <FormQuickTable
                            columns={columnsIORetry}
                            data={dataIORetry}
                            className="text-center"
                            headerClassName="bg-white"
                            bordered
                        />
                        <div className="text-[9px] text-right mt-1">ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</div>
                    </div>

                    {/* Top Diagram with Arrows */}
                    <div className="mb-4">
                        <div className="flex justify-end">
                            <img src={diagramSide} alt="Side Diagram" className="h-20 object-contain" />
                        </div>
                        <img src={diagramTop} alt="Top Diagram" className="w-62 object-contain" />
                    </div>

                    {/* Type Standards Box */}
                    <div className="border-r border-l border-black mt-8 p-2 font-bold text-xs w-30">
                        <div>P-Type : 2.0um</div>
                        <div>G-Type : 2.5um</div>
                        <div>Q-Type : 3.0um</div>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="px-4 text-[10px] space-y-1">
                <p>If the judgment is OK and the calculation result is &plusmn;800, the test is passed. Proceed to the next process.</p>
                <p>If the judgment is OK and the calculation result is not &plusmn;800, enter the value of H296 and process again.</p>
                <p>If the judgment is OK after processing data 3,</p>
                <p>the above calculation result will pass even if it exceeds -800~+800. Proceed to the next process.</p>
            </div>
        </A4Paper>
    );
}

export default Page79;