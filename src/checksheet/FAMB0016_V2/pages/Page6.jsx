import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";

// Images
import image9 from "@/assets/FAMB0016_V2/FAMB0016-9.PNG";

function Page6() {
    const { control } = useFormContext();

    const columns = [
        {
            header: "ตำแหน่ง",
            key: "location",
            width: "120px",
            className: "text-center font-bold text-2xl align-middle h-32",
            render: (val) => val
        },
        {
            header: "ผลการตรวจสอบการล็อค\n(Check by Operator)",
            key: "operator",
            width: "250px",
            className: "align-middle",
            render: () => (
                <div className="flex justify-center gap-12">
                    <FormItemCheck name="page6.lockCheck.op_ok" label="OK" />
                    <FormItemCheck name="page6.lockCheck.op_ng" label="NG" />
                </div>
            )
        },
        {
            header: "Confirm ผลการตรวจสอบการล็อค\n(Approve by Leader Up)",
            key: "leader",
            width: "250px",
            className: "align-middle",
            render: () => (
                <div className="flex justify-center gap-12 py-4">
                    <FormItemCheck name="page6.lockCheck.leader_ok" label="OK" />
                    <FormItemCheck name="page6.lockCheck.leader_ng" label="NG" />
                </div>
            )
        }
    ];

    const data = [
        { location: "1 ~ 16" }
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div className="flex flex-col h-full font-bold text-[13px] leading-tight p-2">

                {/* 9. ตรวจสอบการล็อค Lm-guide block เข้ากับ Quill support B */}
                <div className="mb-4">
                    <h2 className="text-sm font-bold mb-4 uppercase">
                        9. ตรวจสอบการล็อค Lm-guide block เข้ากับ Quill support B
                    </h2>

                    <div className="flex justify-center mb-6">
                        <img src={image9} alt="LM-Guide Lock Diagram" className="w-[85%] max-w-[700px] object-contain" />
                    </div>

                    <div className="px-10">
                        <FormQuickTable
                            columns={columns}
                            data={data}
                            className="border-black"
                        />

                        <p className="mt-3 text-[12px] font-bold text-red-600">
                            หมายเหตุ : ถ้า Leader Up ยังไม่ Confirm ผลการตรวจสอบการล็อคสกรู ห้าม Body นำ Head Assy นี้ไปประกอบโดยเด็ดขาด
                        </p>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto flex justify-end p-4">
                    <div className="w-48">
                        <FormCheckedBox
                            name="page6.checkedInfo"
                            label="Check by / Date"
                        />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page6;