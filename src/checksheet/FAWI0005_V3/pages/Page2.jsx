import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page2() {
    // Data for Left Table (00-15)
    const dataLeft = [
        { label: "PULSE CONVERT ON00", val: "9", bold: true },
        { label: "PULSE CONVERT ON01", val: "15", bold: true },
        { label: "PULSE CONVERT ON02", val: "17", bold: true },
        { label: "PULSE CONVERT ON03", val: "28", bold: true },
        { label: "PULSE CONVERT ON04", val: "32", bold: true },
        { label: "PULSE CONVERT ON05", val: "37", bold: true },
        { label: "PULSE CONVERT ON06", val: "19" },
        { label: "PULSE CONVERT ON07", val: "22" },
        { label: "PULSE CONVERT ON08", val: "27" },
        { label: "PULSE CONVERT ON09", val: "29" },
        { label: "PULSE CONVERT ON10", val: "31" },
        { label: "PULSE CONVERT ON11", val: "34" },
        { label: "PULSE CONVERT ON12", val: "37" },
        { label: "PULSE CONVERT ON13", val: "42" },
        { label: "PULSE CONVERT ON14", val: "45" },
        { label: "PULSE CONVERT ON15", val: "50" },
    ];

    // Data for Right Table (16-31)
    const dataRight = [
        { label: "PULSE CONVERT ON16", val: "56" },
        { label: "PULSE CONVERT ON17", val: "62" },
        { label: "PULSE CONVERT ON18", val: "68" },
        { label: "PULSE CONVERT ON19", val: "71" },
        { label: "PULSE CONVERT ON20", val: "74" },
        { label: "PULSE CONVERT ON21", val: "77" },
        { label: "PULSE CONVERT ON22", val: "80" },
        { label: "PULSE CONVERT ON23", val: "83" },
        { label: "PULSE CONVERT ON24", val: "86" },
        { label: "PULSE CONVERT ON25", val: "89" },
        { label: "PULSE CONVERT ON26", val: "92" },
        { label: "PULSE CONVERT ON27", val: "95" },
        { label: "PULSE CONVERT ON28", val: "98" },
        { label: "PULSE CONVERT ON29", val: "102" },
        { label: "PULSE CONVERT ON30", val: "106" },
        { label: "PULSE CONVERT ON31", val: "109" },
    ];

    const columns = [
        { header: "DESCRIPTION", key: "label", width: "70%", className: "pl-2 text-left" },
        { header: "DATA SETTING", key: "val", width: "30%", className: "text-center", render: (val, row) => <span className={row.bold ? "font-bold" : ""}>{val}</span> }
    ];

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="flex flex-col text-[10px] h-full relative">

                <SectionTitle className="mt-0 w-max">3. Data Setting Check</SectionTitle>

                {/* 3.1 Data Setting Table */}
                <div className="mt-1">
                    <FormItemCheck name="p2_data_setting" label="3.1 Data Setting : Manage - Parameter - Disch - Page 5" showCheckbox={true} className="font-bold text-[11px] mb-1" />

                    <div className="flex justify-between px-2 gap-4">
                        <div className="w-[48%]">
                            <FormQuickTable columns={columns} data={dataLeft} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className="w-[48%]">
                            <FormQuickTable columns={columns} data={dataRight} headerClassName="bg-gray-300 font-bold" />
                        </div>
                    </div>
                </div>

                {/* 3.2 Data Setting Check */}
                <div className="mt-4">
                    <FormItemCheck name="p2_data_setting_check" label="3.2 Data Setting Check" showCheckbox={true} className="font-bold text-[11px] mb-2" />

                    <div className="pl-2 flex flex-col gap-1.5 leading-tight">
                        <p>Manage-Parameter-Disch-P1-WP MAX : STD Spec=<span className="underline">963</span>  HSP Spec=<span className="underline">975</span></p>
                        <p>Manage-Parameter-Machine-P4-WP CTRL 1 ORDER :  STD Spec=<span className="underline">00000000</span>  HSP Spec=<span className="underline">033760000</span></p>
                        <p>Manage-Parameter-Iguanodon-Secret-P2-EPA MAX :  STD Spec=<span className="underline underline-offset-2 font-bold">+2</span>  HSP Spec=<span className="underline underline-offset-2 font-bold">+5</span></p>

                        <div className="flex gap-16 mt-1">
                            <p>Manage-Parameter-Disch-P1-V MAX= <span className="underline">090</span></p>
                            <p>Manage-Parameter-Disch-P1-PIK MAX= <span className="underline">049</span></p>
                        </div>

                        <div className="flex gap-4 font-bold mt-1">
                            <p>Manage-Parameter-Disch-P2-SK MAX= <span className="underline">999999</span></p>
                            <p>Manage-Parameter-Disch-P2-GALPM V MAX= <span className="underline">90</span></p>
                        </div>

                        <div className="flex gap-8 mt-1">
                            <p>Manage-Parameter-Disch-P2-DPW V MAX= <span className="underline">190</span></p>
                            <p>Manage-Parameter-Disch-P5-MODIFY P.CONVERT SDP= <span className="underline">1</span></p>
                        </div>

                        <div className="flex gap-16 mt-1">
                            <p>Manage-Parameter-Disch-P1-IP MAX= <span className="underline font-bold">8915</span></p>
                            <p>Manage-Parameter-Iguanodon-Secret2-P3-P4 CUT=<span className="font-bold">1</span></p>
                        </div>

                        <p className="bg-yellow-300 w-max px-1 font-bold mt-1">Manage-Parameter-Disch-P2-PC MAX= <span className="underline">999999</span></p>

                        <div className="mt-1">
                            <p>Manage-Parameter-Disch-P5-MODIFY P.CONVERT TM(W) PC0_8 =        (Previous value : -3)</p>
                            <p>Manage-Parameter-Disch-P5-MODIFY P.CONVERT TM(W) PC9  = <span className="font-bold underline">-5</span>      (Previous value : -4)</p>
                        </div>

                        <p className="bg-yellow-300 w-max px-1 font-bold mt-1">Manage-Parameter-Disch-P5-BSA MAX= <span className="underline">999999</span></p>

                        <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1 w-[90%]">
                            <p>Manage-Parameter-Disch-P12- [464]DPW PC12 SIG BASIS=<span className="underline">435</span></p>
                            <p>[465]DPW PC12 SIG OFFSET=<span className="underline">435</span></p>

                            <p>Manage-Parameter-Disch-P12- [476]DPW PC32 SIG BASIS=<span className="underline">435</span></p>
                            <p>[477]DPW PC32 SIG OFFSET=<span className="underline">280</span></p>

                            <p>Manage-Parameter-Disch-P12- [458]DPW PC02 SIG BASIS=<span className="underline">380</span></p>
                            <p>[459]DPW PC02 SIG OFFSET=<span className="underline">380</span></p>

                            <p>Manage-Parameter-Disch-P12- [470]DPW PC22 SIG BASIS=<span className="underline">380</span></p>
                            <p>[471]DPW PC22 SIG OFFSET=<span className="underline">380</span></p>
                        </div>

                        <p className="font-bold mt-2">Manage-Parameter-Iguanodon-Secret-P1- [7]NGALPM IP ADJ (NOT USE 7) =<span className="underline">00</span></p>
                        <p className="flex items-start gap-1 mt-1 text-[9px]">
                            <span>↑</span>
                            <span>ถ้ามีการเปลี่ยนค่า setting ที่ NGALPM IP ADJ (NOT USE 7) ให้ปิดเครื่องแล้วเปิดใหม่อีกครั้ง (OFF Source =={'>'} ON Source)</span>
                        </p>

                    </div>
                </div>

                <div className="absolute bottom-4 right-4">
                    <FormCheckedBox name="p2_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;