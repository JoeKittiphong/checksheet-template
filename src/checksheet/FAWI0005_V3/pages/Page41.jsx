import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import mainImage from "@/assets/FAWI0005_V3/page37_main.png";
import topDiagram from "@/assets/FAWI0005_V3/page37_top_diagram.png";
import sideDiagram from "@/assets/FAWI0005_V3/page37_side_diagram.png";

function Page41() {

    // 1. Cutting Data Table
    const columnsRecord = [
        { header: "", key: "point", width: "15%", className: "text-center bg-gray-300 font-bold", isLabel: true },
        { header: "Voltage(LCD)\n(V)", key: "voltage", width: "20%", className: "text-center bg-gray-300" },
        { header: "Current(LCD)\n(A)", key: "current", width: "20%", className: "text-center bg-gray-300" },
        { header: "Cutting Speed\n(mm/min)", key: "speed", width: "20%", className: "text-center bg-gray-300" },
        { header: "Cutting Time", key: "time", width: "25%", className: "text-center bg-gray-300" },
    ];

    const dataRecord = [
        {
            point: "C0001", type: "input",
            voltage: "p41_c0001_volt", voltage_min: 26, voltage_max: 34,
            current: "p41_c0001_curr", current_min: 10, current_max: 13,
            speed: "p41_c0001_speed", speed_min: 0.95, speed_max: 1.25,
            time: "p41_c0001_time_label", label: "H071="
        },
        {
            point: "C0002", type: "input",
            voltage: "p41_c0002_volt", voltage_min: 47, voltage_max: 55,
            current: "p41_c0002_curr", current_min: 1.0, current_max: 2.4,
            speed: "p41_c0002_speed", speed_min: 2.0, speed_max: 3.0,
            time: "p41_c0002_time_label", label: "H072="
        },
        {
            point: "C0903", type: "input",
            voltage: "p41_c0903_volt", voltage_min: 30, voltage_max: 38,
            current: "p41_c0903_curr", current_disabled: true,
            speed: "p41_c0903_speed", speed_min: 4.5, speed_max: 5.5,
            time: "p41_c0903_time_label", label: "H073="
        }
    ];

    // Standard Table (Right Side)
    const columnsStandard = [
        { header: "Voltage(LCD)\n(V)", key: "voltage", width: "25%", className: "text-center bg-gray-400 font-bold" },
        { header: "Current(LCD)\n(A)", key: "current", width: "25%", className: "text-center bg-gray-400 font-bold" },
        { header: "Cutting Speed\n(mm/min)", key: "speed", width: "25%", className: "text-center bg-gray-400 font-bold" },
        { header: "Cutting Time", key: "time", width: "25%", className: "text-center bg-gray-400 font-bold" },
    ];

    const dataStandard = [
        { voltage: "26~34", current: "10~13", speed: "0.95~1.25", time: "H071= 38:40~43:00", className: "bg-green-100" },
        { voltage: "47~55", current: "1.0~2.4", speed: "2.0~3.0", time: "H072= 12:00~15:00" },
        { voltage: "30~38", current: "-", speed: "4.5~5.5", time: "H073= 06:30~08:00" },
        { voltage: "", current: "", speed: "", time: "H081= 57:20~1:09:20", className: "text-right pr-2" },
    ];

    // Roughness/Size Tables
    const columnsCheck = [
        { header: "Roughness", key: "row_label", width: "25%", className: "font-bold pl-2", isLabel: true },
        { header: "X- (3rd)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (3rd)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (3rd)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const dataRa = [
        { row_label: "Up", x_minus: "p41_ra_up_xm", type: "input", y_minus: "No need", x_plus: "No need" },
        { row_label: "Mid", x_minus: "p41_ra_mid_xm", type: "input", y_minus: "No need", x_plus: "No need" },
        { row_label: "Low", x_minus: "p41_ra_low_xm", type: "input", y_minus: "No need", x_plus: "" },
        {
            row_label: "STD(μm)",
            x_minus: "0.530~0.630",
            y_minus: "No need",
            x_plus: "0.530~0.630",
            className: "text-xs"
        },
    ];

    const dataRz = [
        { row_label: "Up", x_minus: "p41_rz_up_xm", type: "input", y_minus: "No need", x_plus: "No need" },
        { row_label: "Mid", x_minus: "p41_rz_mid_xm", type: "input", y_minus: "No need", x_plus: "No need" },
        { row_label: "Low", x_minus: "p41_rz_low_xm", type: "input", y_minus: "No need", x_plus: "" },
        {
            row_label: "STD(μm)",
            x_minus: "3.70~4.80",
            y_minus: "No need",
            x_plus: "3.70~4.80",
            className: "text-xs"
        },
    ];

    const columnsSize = [
        { header: "Size", key: "row_label", width: "33%", className: "font-bold pl-2 bg-gray-200", isLabel: true },
        { header: "X- (3rd)", key: "x_minus", width: "33%", className: "text-center bg-gray-200" },
        { header: "Y (3rd)", key: "y_val", width: "33%", className: "text-center bg-gray-200" },
    ];

    const dataSize = [
        { row_label: "Up", x_minus: "p41_size_up_xm", type: "input", y_val: "p41_size_up_y" },
        { row_label: "Mid", x_minus: "p41_size_mid_xm", type: "input", y_val: "p41_size_mid_y" },
        { row_label: "Low", x_minus: "p41_size_low_xm", type: "input", y_val: "p41_size_low_y" },
        {
            row_label: "STD(mm)",
            x_minus: "7.9970~8.0030",
            y_val: "7.9970~8.0030",
            className: "text-red-500 font-bold"
        },
    ];

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

                <div className="w-1.5/3 border border-black p-2 text-xs">
                    <div className="flex items-center gap-1">
                        <span className="font-bold w-10">Judge</span>
                        <FormItemCheck name="p41_judge_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_judge_ng" label="NG" showCheckbox />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-10">Line</span>
                        <FormItemCheck name="p41_line_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_line_ng" label="NG / XY-Size" showCheckbox />
                        <FormItemCheck name="p41_line_size_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_line_size_ng" label="NG" showCheckbox />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-10">Ra/Rz</span>
                        <FormItemCheck name="p41_rarz_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_rarz_ng" label="NG / Size" showCheckbox />
                        <FormItemCheck name="p41_rarz_size_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_rarz_size_ng" label="NG" showCheckbox />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-10">Barrel</span>
                        <FormItemCheck name="p41_barrel_ok" label="OK" showCheckbox />
                        <FormItemCheck name="p41_barrel_ng" label="NG" showCheckbox />
                    </div>
                    <div className="flex justify-between mt-2 gap-2">
                        <FormItemCheck
                            name="p41_date_check"
                            label="Date:"
                            input={{ name: "p41_date", width: "80px" }}
                            showCheckbox={false}
                        />
                        <FormItemCheck
                            name="p41_name_check"
                            label="Name:"
                            input={{ name: "p41_name", width: "80px" }}
                            showCheckbox={false}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 px-4 mt-4">
                <div className="w-1/2 mt-11">
                    <p className="font-bold text-sm mb-1">Record Cutting Data to fallowing.</p>
                    <FormQuickTable
                        columns={columnsRecord}
                        data={dataRecord}
                        headerClass="bg-gray-300"
                        bordered
                    />
                    <div className="flex items-center gap-4 mt-2 text-xs">
                        <FormItemCheck
                            name="p41_wb_check"
                            label="Wire Broken ="
                            input={{ name: "p41_wb_val", width: "30px" }}
                            showCheckbox={false}
                        />
                        <FormItemCheck
                            name="p41_time_check"
                            label="Time(s)"
                            input={{ name: "p41_time_val", width: "30px" }}
                            showCheckbox={false}
                        />
                        <FormItemCheck
                            name="p41_h081_check"
                            label="H081="
                            input={{ name: "p41_h081_val", width: "30px" }}
                            showCheckbox={false}
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                        <span>Wire Broken Point=</span>
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_upper" label="Upper Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_lower" label="Lower Guide" showCheckbox />
                        <FormItemCheck checkboxSize="w-3 h-3" name="p41_wb_work" label="Work Piece" showCheckbox />
                    </div>
                </div>

                <div className="w-1/2">
                    <div className="flex justify-between items-end mb-1">
                        <p className="font-bold text-sm">Standard</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px]">Check point of Cutting Data</span>
                            <img src={topDiagram} alt="Top Diagram" className="h-16" />
                        </div>
                    </div>
                    <FormQuickTable
                        columns={columnsStandard}
                        data={dataStandard}
                        headerClass="bg-gray-400"
                        bordered
                    />
                    {/* <div className="text-[10px] text-right mt-1">H081= 57:20~1:09:20</div> */}

                </div>
            </div>

            <div className="flex gap-4 px-4">
                <div className="w-1/2">
                    <p className="font-bold text-sm mb-1 mt-5">Roughness (Ra μm) (Record measured data to fallowing)</p>
                    <FormQuickTable
                        columns={columnsCheck}
                        data={dataRa}
                        headerClass="bg-white"
                        bordered
                    />
                    <p className="font-bold text-sm mb-1 mt-5">Roughness (Rz Din μm) (Record measured data to fallowing)</p>
                    <FormQuickTable
                        columns={columnsCheck}
                        data={dataRz}
                        headerClass="bg-white"
                        bordered
                    />
                    <p className="font-bold text-sm mb-1 mt-5">Size (Record measured data to fallowing)</p>
                    <FormQuickTable
                        columns={columnsSize}
                        data={dataSize}
                        headerClass="bg-white"
                        bordered
                    />
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

                    <div className="font-bold text-sm mb-2">(Have priority "Ra " value over "RzDIN")</div>

                    <div className="flex justify-center">
                        <img src={sideDiagram} alt="Side Diagram" className="h-48 object-contain" />
                    </div>
                </div>
            </div>


        </A4Paper>
    );
}

export default Page41;