import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

function Page4() {

    // Data for 4.2 Data Setting Table
    const data4_2 = [
        { label: "DSP CRNT ZERO", std: "40", hsp: "40" },
        { label: "DSP CRNT RATE", std: "2800", hsp: "2800" },
        { label: "DSP CRNT FILTER", std: "0006", hsp: "0006" },
        { label: "DSP CRNT BOARD", std: "0000", hsp: "0000" },
        { label: "AMMETER ENABLE", std: "0001", hsp: "0001" },
        { label: "AMMETER RANGE", std: "0000", hsp: "0001" },
    ];

    const columns4_2 = [
        { header: "Data Setting", key: "label", width: "40%", className: "pl-2 text-center" },
        { header: "STD", key: "std", width: "30%", className: "text-center" },
        { header: "HSP", key: "hsp", width: "30%", className: "text-center" }
    ];

    // Data for Measured (CRT Amp Meter)
    // This looks like a simple input table
    const data4_3 = [
        { measured: "p4_measured_crt_amp", setting: "p4_data_setting_val" }
    ];

    const columns4_3 = [
        {
            header: "Measured (CRT Amp Meter)",
            key: "measured",
            width: "50%",
            className: "text-center p-0",
            type: "input",
            suffix: " A"
        },
        {
            header: "Data Setting",
            key: "setting",
            width: "50%",
            className: "text-center p-0",
            type: "input"
        }
    ];

    // Example Table Data
    const dataExample = [
        { col: "CRT Current", v1: "0.7", v2: "0.8", v3: "0.9", v4: "1.0", v5: "1.1", v6: "1.2", v7: "1.3", v8: "1.4", v9: "1.5", v10: "1.6", v11: "1.7", v12: "1.8", v13: "1.9", v14: "2.0" },
        { col: "Input data", v1: "+12", v2: "+8", v3: "+4", v4: "0", v5: "-4", v6: "-8", v7: "-12", v8: "-16", v9: "-20", v10: "-24", v11: "-28", v12: "-32", v13: "-36", v14: "-40" }
    ];

    const columnsExample = [
        { header: "", key: "col", width: "16%", className: "text-center font-bold bg-gray-300" }, // Header column
        { header: "", key: "v1", width: "6%", className: "text-center" },
        { header: "", key: "v2", width: "6%", className: "text-center" },
        { header: "", key: "v3", width: "6%", className: "text-center" },
        { header: "", key: "v4", width: "6%", className: "text-center" },
        { header: "", key: "v5", width: "6%", className: "text-center" },
        { header: "", key: "v6", width: "6%", className: "text-center" },
        { header: "", key: "v7", width: "6%", className: "text-center" },
        { header: "", key: "v8", width: "6%", className: "text-center" },
        { header: "", key: "v9", width: "6%", className: "text-center" },
        { header: "", key: "v10", width: "6%", className: "text-center" },
        { header: "", key: "v11", width: "6%", className: "text-center" },
        { header: "", key: "v12", width: "6%", className: "text-center" },
        { header: "", key: "v13", width: "6%", className: "text-center" },
        { header: "", key: "v14", width: "6%", className: "text-center" },
    ];


    return (
        <A4Paper content={content} currentPage={4}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="font-bold flex flex-col text-[12px] mb-2">
                    <span>Do not place work piece !!! (ห้ามวาง Work Piece)</span>
                    <span>Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)</span>
                </div>

                <SectionTitle className="mt-0 w-max">4. CRT Amp Meter Zero Adjustment Check</SectionTitle>

                {/* 4.1 Change data setting */}
                <div className="mt-2 pl-4">
                    <p>4.1 Change data setting   :   Manage - Parameter - Cutting - page 1</p>
                    <div className="pl-12 flex flex-col gap-1 mt-1">
                        <FormItemCheck name="p4_std_check" label="STD ==> TC Current Rate = 10050" showCheckbox={true} />
                        <FormItemCheck name="p4_hsp_check" label="HSP ==> TC Current Rate = 10075" showCheckbox={true} />
                    </div>
                </div>

                {/* 4.2 Change data setting Table */}
                <div className="mt-2 pl-4 flex gap-4">
                    <div className="w-[50%]">
                        <p className="mb-1">4.2 Change data setting   :   Manage - Parameter - Secret2 - page 2</p>
                        <FormQuickTable columns={columns4_2} data={data4_2} headerClassName="bg-gray-300 font-bold" />
                    </div>

                    <div className="w-[45%] flex flex-col justify-center text-[10px] gap-2">
                        <p className="mb-2">Manage-Parameter-Cutting-Page1</p>
                        <div className="flex items-end">
                            <span className="w-28 font-bold">THINKING CIRCUIT  </span>
                            <div className="flex flex-col">
                                <span className="font-bold border-b border-black w-4 text-center">= 1</span>
                                <span className="font-bold border-b border-black w-4 text-center">= 0</span>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span>(With Thinking Circuit (DSF))</span>
                                <span>(Without Thinking Circuit (DSF))</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4.3 Zero adjustment check */}
                <div className="mt-4 pl-4">
                    <p className="mb-2">4.3 Zero adjustment check</p>
                    <div className="pl-4 grid grid-cols-[max-content_auto] gap-x-8 gap-y-1">
                        <div className="text-right">Direction :</div>
                        <div>1. Water State <span className="mx-8">:</span> Submerge with low pressure flushing (without spark)</div>

                        <div></div>
                        <div>2. Check Point <span className="mx-8">:</span> CRT Amp Meter</div>

                        <div></div>
                        <div>3. Adjust Position <span className="mx-6">:</span> Manage - Parameter - Secret2 - Page 2 - DSP CRNT ZERO</div>

                        <div></div>
                        <div>4. Program Cutting <span className="mx-5">:</span> Use program 04_CURRENT_CK20.NC</div>
                    </div>

                    <div className="mt-4 w-[50%] ml-8">
                        <FormQuickTable columns={columns4_3} data={data4_3} headerClassName="bg-gray-300 font-bold" />
                    </div>
                </div>

                {/* Example Section */}
                <div className="mt-4">
                    <p className="underline font-bold">Example : <span className="no-underline font-normal">ALN400G   (ถ้าค่า CRT Amp Meter ไม่นิ่ง ให้นำค่าสูงสุดมาใช้ในการแก้ไข)</span></p>
                    <p className="mt-1 ml-8">CRT Amp Meter = [1.4A-1.6A] =={'>'} DSP CRNT ZERO = 40 =={'>'} <span className="font-bold underline">-24</span> (data setting)</p>

                    <div className="mt-1 w-full">
                        <FormQuickTable columns={columnsExample} data={dataExample} headerClassName="bg-gray-300 font-bold" showHeader={false} />
                    </div>
                </div>

                {/* 4.4 & 4.5 Checkbox Input */}
                <div className="mt-6 flex flex-col gap-4 pl-4">
                    <FormItemCheck name="p4_data_setting_apply" label="4.4 นำค่า Data Setting มาใส่ใน Manage - Parameter - Secret2 - Page 2 - DSP CRNT ZERO" showCheckbox={true} />

                    <div>
                        <FormItemCheck name="p4_cutting_again" label="4.5 Cutting อีกครั้ง" showCheckbox={true} />
                        <div className="pl-12 flex flex-col gap-1 mt-1">
                            <p>- ถ้าค่า CRT Amp Meter ไม่เท่ากับ 0.0A =={'>'} ทำตามข้อที่ 4.3 อีกครั้ง</p>
                            <p>- ถ้าค่า CRT Amp Meter เท่ากับ 0.0A =={'>'} ข้ามไปตรวจสอบข้อที่ 5 ได้เลย</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <FormCheckedBox name="p4_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page4;