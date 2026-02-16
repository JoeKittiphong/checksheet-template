import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0014_V2-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

// Images
import image4 from "@/assets/FAMB0014_V2/FAMB0015-4.PNG";

function Page3() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="flex flex-col h-full font-bold text-[13px] leading-tight p-2">

                {/* 4. ตรวจสอบการล็อค LM-GUIDE BLOCK เข้ากับ QUILL SUPPORT B */}
                <div className="mb-8">
                    <h2 className="text-sm font-bold mb-4">
                        4. ตรวจสอบการล็อค LM-GUIDE BLOCK เข้ากับ QUILL SUPPORT B
                    </h2>

                    <div className="flex justify-center mb-6">
                        <img src={image4} alt="Diagram 4" className="w-[85%] max-w-[700px] object-contain" />
                    </div>

                    <div className="px-10">
                        <table className="w-full border-collapse border border-black">
                            <thead>
                                <tr className="bg-gray-100 h-12">
                                    <th className="border border-black p-2 w-32 text-center align-middle">ตำแหน่ง</th>
                                    <th className="border border-black p-2 text-center">
                                        ผลการตรวจสอบการล็อค<br />(Check by Operator)
                                    </th>
                                    <th className="border border-black p-2 text-center">
                                        Confirm ผลการตรวจสอบการล็อค<br />(Approve by Leader Up)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-24">
                                    <td className="border border-black text-center font-bold text-2xl">1 - 16</td>
                                    <td className="border border-black p-4">
                                        <div className="flex justify-center gap-12">
                                            <FormItemCheck name="page3.item4.op_ok" label="OK" />
                                            <FormItemCheck name="page3.item4.op_ng" label="NG" />
                                        </div>
                                    </td>
                                    <td className="border border-black p-4">
                                        <div className="flex justify-center gap-12">
                                            <FormItemCheck name="page3.item4.leader_ok" label="OK" />
                                            <FormItemCheck name="page3.item4.leader_ng" label="NG" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-3 text-[12px] font-bold text-red-600">
                            หมายเหตุ : ถ้า Leader Up ยังไม่ Confirm ผลการตรวจสอบการล็อคสกรู ห้าม Body นำ Head Assy นี้ไปประกอบโดยเด็ดขาด
                        </p>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto flex justify-end p-4">
                    <div className="w-35 border border-black">
                        <FormCheckedBox
                            name="page3.checkBy"
                            label="CHECK BY/DATE"
                            className="h-30"
                        />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page3;