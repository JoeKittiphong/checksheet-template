import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Assets (Placeholder names - User to verify)
import topDiagram from "@/assets/FAWI0005_V3/page107_diagram_top.png";
import sideDiagram from "@/assets/FAWI0005_V3/page107_diagram_side.png";

// New Components
import FinalEDWwireCheck from '@/components/FormComponents/FinalEDWwireCheck';
import EDWFinalRecordCutting from '@/components/FormComponents/EDWFinalRecordCutting';
import EDWFinalRoughnessCheck from '@/components/FormComponents/EDWFinalRoughnessCheck';
import EDWFinalSizeRecord from '@/components/FormComponents/EDWFinalSizeRecord';

function Page107() {

    // IO Retry Table
    const columnsIORetry = [
        { header: "", key: "code", width: "25%", className: "border-0 bg-white font-mono", isLabel: true },
        { header: "", key: "desc", width: "25%", className: "border-0 bg-white text-[10px]", isLabel: true },
        { header: "STD", key: "std", width: "25%", className: "bg-white font-normal", isLabel: true },
        { header: "ACT", key: "act", width: "25%", className: "bg-gray-400 font-normal" }
    ];

    const dataIORetry = [
        { code: "#80061", desc: "IO Retry", std: "0", act: "p107_io_retry_act", type: "input" }
    ];

    // Cutting Standards for Page 107
    // TODO: Please verify these values from the image
    const cuttingStandards = {
        c0001: { v: "20~25", a: "9.0~12.0", speed: "2.4~2.9", time: "H071= 14:45~17:00" },
        c0002: { v: "50~58", a: "0.5~1.5", speed: "1.9~3.3", time: "H072= 14:00~17:30" },
        c0003: { v: "35~41", a: "0.4~0.8", speed: "4.0~6.0", time: "H073= 04:40~06:40" },
        c904: { v: "7~11", a: "0.2~0.6", speed: "4.0~7.2", time: "H074= 06:10~10:00" },
        totalTime: "H081= 42:00~51:10"
    };

    return (
        <A4Paper content={content} currentPage={107}>
            <SectionTitle>23.3 Cutting Data CUT-1 (ACR2-40mm-4th)</SectionTitle>
            <div className="flex justify-between items-start px-4 mt-2">
                <div className="text-xs space-y-1 w-1.5/3">
                    <p className="font-bold">Disch-Page3 -[MODIFY WORKING CORE SV19]=</p>
                    <p className="font-bold text-red-600">Do not change "MODIFY WORKING CORE SV18" this check !!!!!</p>
                </div>

                <div className='flex flex-col items-end gap-2'>
                    <div className="text-xs">
                        Before Cutting Check (LINK communication)
                    </div>
                    <div className="text-xs">
                        Check of Manage - Check - Motor I/O - Page7
                    </div>
                    <FormQuickTable
                        columns={columnsIORetry}
                        data={dataIORetry}
                        headerClass="bg-white"
                        bordered
                        className="w-64"
                    />
                </div>
            </div>

            <div className="flex gap-4 px-4 mt-4">
                <div className="w-full">
                    <div className="flex items-end justify-between">
                        <p className="font-bold text-sm">Record Cutting Data to fallowing.</p>
                        <div className="text-xs space-y-1 text-right flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <span>Flow Meter</span>
                                <FormItemCheck
                                    name="p107_flow_meter"
                                    input={{
                                        name: "p107_flow_meter_val",
                                        width: "60px",
                                        className: "text-center"
                                    }}
                                    showCheckbox={false}
                                />
                                <span>L/min STD = 5.5 ~ 7 L/min</span>
                            </div>
                            <p>Adjust "Low Pressure Flusing = 1.5L/min"</p>
                        </div>
                    </div>
                    {/* Using EDWFinalRecordCutting with variant="4th" */}
                    <EDWFinalRecordCutting
                        prefix="p107_"
                        variant="4th"
                        standards={cuttingStandards}
                    />

                    <div className="flex justify-end items-center gap-2 text-xs mt-2">
                        <FormItemCheck
                            name="p107_wire_lot_check"
                            label="Wire Lot No."
                            input={{
                                name: "p107_wire_lot_no",
                                width: "200px",
                                className: "text-center"
                            }}
                            showCheckbox={false}
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/2 pl-4 flex flex-col items-center">
                <FinalEDWwireCheck prefix="p107_" />
            </div>


            <div className="flex gap-4 px-4 mt-4">
                <div className="w-full">
                    {/* Roughness (Record measured data to fallowing) */}
                    <h3 className="font-bold text-sm mb-2">Roughness (Record measured data to fallowing)</h3>

                    <div className="flex gap-2 w-full">
                        <div className="w-1/3">
                            <h4 className="font-bold text-xs underline mb-1">Roughness (Rz Din μm)</h4>
                            <EDWFinalRoughnessCheck
                                prefix="p107_rz_"
                                variant="4th"
                                standards={{
                                    range: "Under 7.0",
                                    inputs: {
                                        Up: { x_plus: true },
                                        Mid: { x_plus: true },
                                        Low: { x_minus: true, x_plus: true }
                                    }
                                }}
                                showStandardRow={true}
                                className="w-full"
                            />
                        </div>
                        <div className="w-1/3">
                            <h4 className="font-bold text-xs underline mb-1">Roughness (Ra μm) (Record only)</h4>
                            <EDWFinalRoughnessCheck
                                prefix="p107_ra_"
                                variant="4th"
                                standards={{
                                    range: "None",
                                    inputs: {
                                        Up: { x_plus: true },
                                        Mid: { x_plus: true },
                                        Low: { x_minus: true, x_plus: true }
                                    }
                                }}
                                showStandardRow={true}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Size Record */}
                    <div className="mt-4 flex">
                        <div>
                            <h3 className="font-bold text-xs">Size (mm) (Record measured data to fallowing)</h3>
                            <EDWFinalSizeRecord
                                prefix="p107_"
                                variant="4th"
                                standards={{ x: "7.9980~8.0020", y: "7.9980~8.0020" }}
                            />
                        </div>
                        <div className="flex items-center">
                            <img src={topDiagram} alt="Measurement Point Top" className="h-48 object-contain" />
                            <img src={sideDiagram} alt="Measurement Point" className="h-48 object-contain" />
                        </div>
                    </div>
                </div>


            </div>
        </A4Paper>
    );
}

export default Page107;