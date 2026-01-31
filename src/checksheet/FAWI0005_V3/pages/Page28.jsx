
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page28() {
    const listItems = [
        "เปลี่ยน data setting ที่ Manage - Parameter - Action - Dot Sensitive จาก \"2\" เป็น \"3\"",
        "เปลี่ยน data setting ที่ Manage - Parameter - Check - Chk I/O - Page 1 - [163800H] จาก \"000\" เป็น \"200\"",
        "ใส่ Splash Sheet ที่ Upper Guide",
        "วาง Workpiece ด้านขวาของ Workstand",
        "ตั้งแรงดันน้ำ (High Pressure) ให้ Upper Guide เท่ากับ Lower Guide, Clear Z-Axis = 0 (WP = 55 : STD = 4.0 ~ 5.0 L/min , HSP = 4.0 ~ 5.0 L/min)",
        "ร้อยลวด, เลื่อน X-Axis ให้ลวดแตะกับ Workpiece แล้วตัดลวดออก, Clear X-Axis = 0 เลื่อน X-Axis เข้าไป 7.5mm (ที่ Workpiece ต้องไม่มีรอยการ Cutting)",
        "เปิดน้ำเต็ม Tank, Run program (15_DSF_SEN.NC)",
        "บันทึกค่า data setting ที่หาได้ ลงในตาราง",
    ];

    const bottomItems = [
        "เปลี่ยน data setting ที่ Manage - Parameter - Cutting - Page 2 ตามค่าที่หาได้",
        "เปลี่ยน data setting ที่ Manage - Parameter - Action - Dot Sensitive จาก \"3\" เป็น \"2\"",
        "เปลี่ยน data setting ที่ Manage - Parameter - Check - Chk I/O - Page 1 - [163800H] จาก \"200\" เป็น \"000\""
    ];

    const columns = [
        { header: "DESCRIPTION", key: "desc", width: "50%", className: "text-left pl-2 font-bold" },
        { header: "DATA", key: "val", type: "input", width: "50%", className: "text-center" },
    ];

    const rows = [
        { desc: "TC UOP PRES WP40", val: "p28_tc_uop_pres_wp40" },
        { desc: "TC UOP PRES WP50", val: "p28_tc_uop_pres_wp50" },
        { desc: "TC UOP PRES WP60", val: "p28_tc_uop_pres_wp60" },
        { desc: "TC LOP PRES WP40", val: "p28_tc_lop_pres_wp40" },
        { desc: "TC LOP PRES WP50", val: "p28_tc_lop_pres_wp50" },
        { desc: "TC LOP PRES WP60", val: "p28_tc_lop_pres_wp60" },
        { desc: "TC CLS PRES WP40", val: "p28_tc_cls_pres_wp40" },
        { desc: "TC CLS PRES WP50", val: "p28_tc_cls_pres_wp50" },
        { desc: "TC CLS PRES WP60", val: "p28_tc_cls_pres_wp60" },
    ];

    const dsmRows = [
        { desc: "TC UOP PRES WP40", val: "p28_dsm_uop_pres_wp40" },
        { desc: "TC UOP PRES WP50", val: "p28_dsm_uop_pres_wp50" },
        { desc: "TC UOP PRES WP60", val: "p28_dsm_uop_pres_wp60" },
        { desc: "TC LOP PRES WP40", val: "p28_dsm_lop_pres_wp40" },
        { desc: "TC LOP PRES WP50", val: "p28_dsm_lop_pres_wp50" },
        { desc: "TC LOP PRES WP60", val: "p28_dsm_lop_pres_wp60" },
        { desc: "TC CLS PRES WP40", val: "0", type: "text" },
        { desc: "TC CLS PRES WP50", val: "0", type: "text" },
        { desc: "TC CLS PRES WP60", val: "0", type: "text" },
    ];

    const headerThinking = [
        [
            { header: "THINKING CIRCUIT", colSpan: 2, className: "bg-gray-300 font-bold", headerCheckbox: "p28_thinking_circuit_check" }
        ],
        [
            { header: "DESCRIPTION", width: "50%", className: "text-center bg-gray-300 font-bold" },
            { header: "DATA", width: "50%", className: "text-center bg-gray-300 font-bold" }
        ]
    ];

    const headerDSM = [
        [
            { header: "DSM OPTION", colSpan: 2, className: "bg-gray-300 font-bold", headerCheckbox: "p28_dsm_option_check" }
        ],
        [
            { header: "DESCRIPTION", width: "50%", className: "text-center bg-gray-300 font-bold" },
            { header: "DATA", width: "50%", className: "text-center bg-gray-300 font-bold" }
        ]
    ];

    return (
        <A4Paper content={content} currentPage={28}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2">

                <div className="flex items-center gap-2">
                    <FormItemCheck name="p28_main_check" showCheckbox={true} />
                    <SectionTitle className="mt-0 w-max text-sm">15.1.2 Measurement program of TC-Pressure</SectionTitle>
                </div>

                <div className="pl-6 flex flex-col gap-1">
                    {listItems.map((item, idx) => (
                        <FormItemCheck
                            key={idx}
                            name={`p28_list_check_${idx + 1}`}
                            label={item}
                            showCheckbox={true}
                        />
                    ))}
                </div>

                <div className="flex justify-between gap-4 mt-4">
                    <div className="w-[45%]">
                        <FormQuickTable
                            columns={columns}
                            data={rows}
                            headerRows={headerThinking}
                        />
                    </div>

                    <div className="w-[45%] flex items-end gap-2 relative">
                        <div className="w-full">
                            <FormQuickTable
                                columns={columns}
                                data={dsmRows}
                                headerRows={headerDSM}
                            />
                        </div>
                        <div className="pb-4 text-xs ">
                            <div className="absolute bottom-0 right-0 h-16 w-3 inline-block align-middle mr-1"></div>
                            Input ค่า 0<br />ลงใน Machine
                        </div>
                    </div>
                </div>

                <div className="pl-6 flex flex-col gap-1 mt-4">
                    {bottomItems.map((item, idx) => (
                        <FormItemCheck
                            key={idx}
                            name={`p28_bottom_check_${idx + 1}`}
                            label={item}
                            showCheckbox={true}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p28_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page28;