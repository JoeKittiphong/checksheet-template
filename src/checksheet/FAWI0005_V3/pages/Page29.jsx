
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page29() {
    const listItems = [
        "-ตั้งน้ำที่ Upper Guide โดยเปิด Low Pressure และ High Pressure ปรับตำแหน่ง Upper Guide ให้ได้ค่า Flow Meter = STD = 4.7 ~ 5.3 L/min (STD : WP = 57)",
        "-Clear แกน Z = 0",
        "-ที่ Manage - Parameter - Check - Chk I/O - Page 1 - [163800H] = \"000\"",
        "-รอ 2~3 วินาที ที่ Address 163800H ใส่ค่า data = \"200\"",
        "-บันทึกค่า data ที่ Address 163802H, 163803H, 163804H, 163806H, 163807H, 163808H ลงในตาราง",
        "-ปิด Low Pressure และ High Pressure ตรวจสอบค่า data ที่ Address 163802H และ 163806H ต้องมีค่าเท่ากับ 0~10",
        "-ที่ Address 163800H ใส่ค่า data = \"000\"",
    ];

    // ----- Table 1: Pressure Checks -----
    const columns1 = [
        {
            header: "Model", key: "model", width: "15%", isLabel: true,
            render: (val, row) => (
                <div className="flex items-center gap-1 pl-1">
                    {row.hasCheckbox && (
                        <FormItemCheck name={row.checkboxName} showCheckbox={true} className="mr-0" />
                    )}
                    <span>{val}</span>
                </div>
            )
        },
        { header: "Option", key: "option", width: "8%", isLabel: true, className: "text-[9px]" },
        { header: "Spec", key: "spec", width: "8%", isLabel: true, className: "text-[9px]" },

        // Lower Pressure
        { header: "LPRE AVR", key: "lpre_avr", width: "11%" },
        { header: "LPRE MIN", key: "lpre_min", width: "11%" },
        { header: "LPRE MAX", key: "lpre_max", width: "11%" },

        // Upper Pressure
        { header: "UPRE AVR", key: "upre_avr", width: "11%" },
        { header: "UPRE MIN", key: "upre_min", width: "11%" },
        { header: "UPRE MAX", key: "upre_max", width: "11%" },
    ];

    const headerRows1 = [
        [
            { header: "Model", rowSpan: 3, className: "align-middle" },
            { header: "Option", rowSpan: 3, className: "align-middle" },
            { header: "Spec", rowSpan: 3, className: "align-middle" },
            { header: "Manage - Parameter - Check - Chk I/O - Page 1", colSpan: 6, className: "bg-white" },
        ],
        [
            { header: "Lowwer Pressure", colSpan: 3, className: "bg-white" },
            { header: "Upper Pressure", colSpan: 3, className: "bg-white" },
        ],
        [
            // Lower
            { header: "LPRE AVR\n163802H", className: "whitespace-pre-wrap text-[9px]" },
            { header: "LPRE MIN\n163803H", className: "whitespace-pre-wrap text-[9px]" },
            { header: "LPRE MAX\n163804H", className: "whitespace-pre-wrap text-[9px]" },
            // Upper
            { header: "LPRE AVR\n163806H", className: "whitespace-pre-wrap text-[9px]" },
            { header: "LPRE MIN\n163807H", className: "whitespace-pre-wrap text-[9px]" },
            { header: "LPRE MAX\n163808H", className: "whitespace-pre-wrap text-[9px]" },
        ]
    ];

    const data1 = [
        {
            model: "AL400G/600G", hasCheckbox: true, checkboxName: "p29_chk_thinking1",
            option: "THINKING CIRCUIT", spec: "STD/HSP",
            lpre_avr: "2632~2792", lpre_min: "--", lpre_max: "<4040",
            upre_avr: "2632~2792", upre_min: "--", upre_max: "<4040"
        },
        {
            model: "AL400G/600G", hasCheckbox: true, checkboxName: "p29_chk_dsm1",
            option: "DSM", spec: "STD/HSP",
            lpre_avr: "2632~2792", lpre_min: "--", lpre_max: "<4040",
            upre_avr: "2632~2792", upre_min: "--", upre_max: "<4040"
        },
        {
            model: "Data Check", model_colSpan: 3, type: "input",
            lpre_avr: "p29_lpre_avr_val", lpre_avr_min: 2632, lpre_avr_max: 2792,
            lpre_min: "p29_lpre_min_val",
            lpre_max: "p29_lpre_max_val", lpre_max_min: 4040, lpre_max_max: 99999,
            upre_avr: "p29_upre_avr_val", upre_avr_min: 2632, upre_avr_max: 2792,
            upre_min: "p29_upre_min_val",
            upre_max: "p29_upre_max_val", upre_max_min: 4040, upre_max_max: 99999
        }
    ];

    // ----- Table 2: Filter/Flush Pressure -----
    const columns2 = [
        {
            header: "Model", key: "model", width: "15%", isLabel: true,
            render: (val, row) => (
                <div className="flex items-center gap-1 pl-1">
                    {row.hasCheckbox && (
                        <FormItemCheck name={row.checkboxName} showCheckbox={true} className="mr-0" />
                    )}
                    <span>{val}</span>
                </div>
            )
        },
        { header: "Option", key: "option", width: "8%", isLabel: true, className: "text-[9px]" },
        { header: "Spec", key: "spec", width: "8%", isLabel: true, className: "text-[9px]" },

        { header: "Filter Pressure", key: "filter_pres", width: "17%" },
        { header: "Flush Pressure", key: "flush_pres", width: "17%" },

        // Flow Meter
        { header: "Lowwer", key: "flow_lower", width: "17%" },
        { header: "Upper", key: "flow_upper", width: "18%" },
    ];

    const headerRows2 = [
        [
            { header: "Model", rowSpan: 2, className: "align-middle bg-gray-300" },
            { header: "Option", rowSpan: 2, className: "align-middle bg-gray-300" },
            { header: "Spec", rowSpan: 2, className: "align-middle bg-gray-300" },
            { header: "Filter Pressure\n[Mpa]", rowSpan: 2, className: "whitespace-pre-wrap bg-gray-300 align-middle" },
            { header: "Flush Pressure\n[Mpa]", rowSpan: 2, className: "whitespace-pre-wrap bg-gray-300 align-middle" },
            { header: "Flow Meter [L/min]", colSpan: 2, className: "bg-gray-300" },
        ],
        [
            { header: "Lowwer", className: "bg-gray-300" },
            { header: "Upper", className: "bg-gray-300" },
        ]
    ];

    const data2 = [
        {
            model: "AL400G/600G", hasCheckbox: true, checkboxName: "p29_chk_thinking2",
            option: "THINKING CIRCUIT", spec: "STD/HSP",
            filter_pres: "ไม่มี STD (ใช้บันทึกค่าที่อ่านได้)", flush_pres: "1.40 ~ 1.55",
            flow_lower: "4.5 ~ 5.5", flow_upper: "4.5 ~ 5.5"
        },
        {
            model: "AL400G/600G", hasCheckbox: true, checkboxName: "p29_chk_dsm2",
            option: "DSM", spec: "STD/HSP",
            filter_pres: "ไม่มี STD (ใช้บันทึกค่าที่อ่านได้)", flush_pres: "1.40 ~ 1.55",
            flow_lower: "4.5 ~ 5.5", flow_upper: "4.5 ~ 5.5"
        },
        {
            model: "Data Check", model_colSpan: 3, type: "input",
            filter_pres: "p29_filter_pres_val",
            flush_pres: "p29_flush_pres_val", flush_pres_min: 1.40, flush_pres_max: 1.55,
            flow_lower: "p29_flow_lower_val", flow_lower_min: 4.5, flow_lower_max: 5.5,
            flow_upper: "p29_flow_upper_val", flow_upper_min: 4.5, flow_upper_max: 5.5,
        }
    ];

    return (
        <A4Paper content={content} currentPage={29}>
            <div className="flex flex-col text-[12px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">15.2 Flushing Sensor Input Check</SectionTitle>

                <div className="pl-2 flex flex-col gap-1">
                    {listItems.map((item, idx) => (
                        <FormItemCheck
                            key={idx}
                            name={`p29_list_check_${idx + 1}`}
                            label={item}
                            showCheckbox={true}
                        />
                    ))}
                </div>

                <div className="mt-4">
                    <FormQuickTable
                        columns={columns1}
                        data={data1}
                        headerRows={headerRows1}
                    />
                </div>

                <div className="mt-4">
                    <FormQuickTable
                        columns={columns2}
                        data={data2}
                        headerRows={headerRows2}
                    />
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p29_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page29;