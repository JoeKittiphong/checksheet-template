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

// Diagrams (Reusing Page 78 diagrams as requested/standard)
import diagramCheck from "@/assets/FAWI0005_V3/page78_icon_check.png";
import diagramSide from "@/assets/FAWI0005_V3/page78_diagram_side.png";
import diagramTop from "@/assets/FAWI0005_V3/page78_diagram_top.png";

function Page101() {
    const { register, control, formState: { errors } } = useFormContext();

    // Standards for Page 101
    const roughnessStdsRa = { d: "~0.300", f: "~0.300" };
    const roughnessStdsRz = { d: "2.30~2.60", f: "2.30~2.60" };
    const sizeStds = { ae: "14.9980~15.0020", bf: "14.9980~15.0020", cg: "14.9980~15.0020", dh: "14.9980~15.0020" };

    // Cutting Standards for Page 101 (Green Table)
    // C001, C002, C003, C904
    // Values derived from image
    const cuttingStandards = {
        c0001: { v: "21~26", a: "12.0~15.0", speed: "2.5~3.1", time: "H071= 18:30~21:00" },
        c0002: { v: "54~61", a: "1.3~2.3", speed: "3.5~4.8", time: "H072= 10:20~13:00" },
        c0003: { v: "42~56", a: "0.7~2.0", speed: "6.0~10.0", time: "H073= 04:30~07:40" },
        c904: { v: "13~23", a: "-", speed: "4.5~5.5", time: "H074= 08:30~11:00" },
        totalTime: "H081= 41:50~52:40"
    };

    // IO Retry Table Columns
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border bg-white font-mono text-center", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border bg-white text-[10px] text-center", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal text-center", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p101_io_retry_act", type: "input" }
    ];

    return (
        <A4Paper content={content} currentPage={101}>
            <SectionTitle>22.4 For 0.20mm Wire Machine Data CUT-4 (STD2-40mm-4th)</SectionTitle>

            {/* Header Info & Diagram */}
            <div className="relative flex justify-between items-start px-4 text-[10px] font-sans mt-2">
                <div className="space-y-2 w-2/3">
                    <p>Disch-Page5-[[163] PULSE CONVERT ON 02] =</p>
                    <p>Disch-Page5-[[193] MODIFY P. C. TM (W) PC0_8] =</p>
                    <p>Disch-Page5-[[194] MODIFY P. C. TM (W) PC9] =</p>
                    <p>Disch-Page10 -[MODIFYWORKING CR SV 21] =</p>
                    <div className="flex items-center gap-2">
                        <span>Disch-Page10-[MODIFYWORKING CR SV 29] = </span>
                        <input className="border-b border-black w-24 outline-none text-center" {...register("p101_sv29")} />
                    </div>
                    <div className="flex justify-between w-full pr-8">
                        <span>Disch-Page4-[DPW PC02-22 V8]=</span>
                        <span className="italic">(For 4th Cutting)</span>
                    </div>
                </div>

                <div className='absolute top-[-27%] right-[-1%] flex flex-col items-end gap-1'>
                    <FinalEDWwireCheck prefix="p101_" />
                    <div className="relative mt-1 mr-1 text-center">
                        <img src={diagramCheck} alt="" />
                    </div>
                </div>
            </div>

            {/* Record Cutting Data */}
            <div className="px-4 mb-4 mt-8">
                <div className="flex items-end justify-between w-full mb-1">
                    <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                    <div className="font-bold text-sm mr-55">Standard</div>
                </div>

                {/* Using reused component with passed standards */}
                <EDWFinalRecordCutting prefix="p101_" standards={cuttingStandards} />
                <div className="flex items-center gap-4 text-[10px]">
                    <div className="flex items-center gap-2 ml-auto">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-4 h-4" name="p101_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p101_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-4 h-4" name="p101_wb_work" label="Work Piece" showCheckbox />
                    </div>
                    <div className="ml-2 text-[9px]">Before Cutting Check (LINK communication)</div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex gap-4 px-4">
                <div className="w-3/5">
                    {/* Roughness Ra */}
                    <h3 className="font-bold text-xs underline mb-1">Roughness (Ra &mu;m) (Record measured data to fallowing)</h3>
                    <div className="">
                        <EDWFinalRoughnessCheck
                            prefix="p101_ra_"
                            variant="4th-7points"
                            standards={{ stds: roughnessStdsRa }}
                        />
                    </div>

                    {/* Roughness Rz */}
                    <div className="">
                        <div className="flex items-center mb-1">
                            <h3 className="font-bold text-xs underline">Roughness (Rz Din &mu;m) (Record measured data to fallowing)</h3>
                            <span className="ml-2 text-[9px] font-bold">(Have priority "Ra" value over "RzDIN")</span>
                        </div>
                        <EDWFinalRoughnessCheck
                            prefix="p101_rz_"
                            variant="4th-7points"
                            standards={{ stds: roughnessStdsRz }}
                        />
                    </div>

                    {/* Size Record */}
                    <div className="">
                        <h3 className="font-bold text-xs underline mb-1">Size (Record measured data to fallowing)</h3>
                        <EDWFinalSizeRecord
                            prefix="p101_"
                            variant="4th-pairs"
                            standards={sizeStds}
                        />
                    </div>

                    {/* Calculations */}
                    <div className="text-[9px] font-bold mt-2">
                        <div className="flex justify-between items-center ">
                            <div className="flex items-center gap-1">
                                <span>Maximum No.</span>
                                <input className="border-b border-black w-20 text-center outline-none" {...register("p101_max_no")} />
                            </div>
                            <div className="flex items-center gap-1">
                                <span>Minimum No.</span>
                                <input className="border-b border-black w-20 text-center outline-none" {...register("p101_min_no")} />
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>Culculate Range error fallowing formula --&gt; [ Max ] - [ Min ] = </span>
                            <input className="border-b border-black w-20 text-center outline-none" {...register("p101_range_error")} />
                        </div>

                        <div className="flex items-center gap-1">
                            <span>Culculate Size error fallowing formula --&gt; [ (a-e) Mid ] - [ (c-g) Mid ] = </span>
                            <input className="border-b border-black w-20 text-center outline-none" {...register("p101_size_error")} />
                        </div>
                    </div>
                </div>

                <div className="w-2/5 pl-2 flex flex-col items-center">

                    {/* Check Motor Table */}
                    <div className="w-full">
                        <div className="text-[9px] text-right mb-1">Check of Manage - Check - Motor I/O - Page7</div>
                        <FormQuickTable
                            columns={columnsIORetry}
                            data={dataIORetry}
                            className="text-center"
                            headerClassName="bg-white"
                            bordered
                        />
                        <div className="text-[9px] text-right mt-1">ถ้า data ไม่ได้ตาม std ให้แจ้งหัวหน้างาน</div>
                        <FormItemCheck
                            prefix="p101_"
                            name="p101_wire_lot_no"
                            label="Wire Lot No."
                            type="text"
                            className="w-full"
                            input={{
                                name: "p101_wire_lot_no",
                                width: "80px",
                                className: "border-b border-black text-center"
                            }}
                            showCheckbox={false}
                        />
                    </div>

                    {/* Top Diagram with Arrows */}
                    <div className="flex flex-col items-center relative">
                        {/* Main Hexagon Diagram reused */}
                        <img src={diagramSide} alt="Top Diagram" className="w-26 object-contain mt-10" />
                        <span>Measurement point of roughness</span>
                        <img src={diagramTop} alt="Top Diagram" className="w-46 object-contain mt-10" />
                    </div>

                    {/* Type Standards Bracket */}
                    <div className="w-full flex items-center mt-4">
                        <div className="text-4xl font-light">{'}'}</div>
                        <div className="flex flex-col justify-start text-xs font-bold ml-2">
                            <div>P-Type : 2.0um</div>
                            <div>G-Type : 2.5um</div>
                            <div>Q-Type : 3.0um</div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page101;