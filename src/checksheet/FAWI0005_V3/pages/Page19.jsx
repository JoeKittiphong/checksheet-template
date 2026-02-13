import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page19() {
    const speedData = [
        { label: "Cutting Speed", std: "2.70~2.80", name: "p19_speed", name_min: 2.70, name_max: 2.80 },
        { label: "Voltage (LCD)", std: "20~24", name: "p19_voltage", name_min: 20, name_max: 24 },
        { label: "Current (LCD)", std: "9~12", name: "p19_current", name_min: 9, name_max: 12 },
        {
            label: "Pulse-conversion compensation TM (W) PC0_8",
            name: "p19_pulse_comp_manual",
            label_colSpan: 2
        }
    ];

    const speedColumns = [
        { header: "", key: "label", width: "28%", className: "pl-2 font-bold border-black", isLabel: true },
        { header: "Standard", key: "std", width: "35%", className: "text-center font-bold border-black", isLabel: true },
        {
            header: "Measured",
            key: "name",
            width: "30%",
            type: "input",
            className: "p-0 border-black",
            required: true
        },
    ];

    const inputDataRows = [
        {
            label: "Manege-Parameter-Page5\nMODIFY P.C. TM (W) PC 0_8",
            name: "p19_pc_modify"
        },
        {
            label: "Manege-Parameter-Page3\nMODIFY WORKING SV 5",
            name: "p19_sv_modify",
            suffix: "(Check input +30]"
        },
    ];

    const inputDataColumns = [
        {
            header: "",
            key: "label",
            width: "75%",
            className: "p-4 text-sm font-bold border-black align-top whitespace-pre-line leading-relaxed",
        },
        {
            header: "Input Data",
            key: "name",
            width: "25%",
            type: "input",
            className: "p-4 border-black text-center align-middle",
            required: true
        },
    ];

    return (
        <A4Paper content={content} currentPage={19}>
            <div className="flex flex-col text-[10px] h-full relative p-4">

                {/* Top Note Section */}
                <div className="mb-6 space-y-1 text-[11px] font-bold">
                    <div className="flex items-start">
                        <span className="underline mr-2 shrink-0">Note</span>
                        <span className="mr-2 shrink-0">:</span>
                        <span>ถ้าค่า Speed อยู่ในช่วง Standard ให้ข้ามไปบันทึกค่าที่ข้อ 12a.3 ได้เลย</span>
                    </div>
                    <div className="flex items-start pl-10">
                        <span className="mr-2 shrink-0">:</span>
                        <span>ถ้าค่า Speed ไม่ได้ตาม Standard ให้นำค่า Pulse offset มาใส่ที่ Pulse-conversion compensation TM (W) PC0_8</span>
                    </div>
                </div>

                {/* Section 12a.3 */}
                <div className="mt-4">
                    <SectionTitle className="mb-2 w-max">12a.3 Cutting อีกครั้ง, ถ้าค่า Measured ไม่อยู่ในช่วง Standard ให้กลับไปทำข้อ 12b.2 ใหม่อีกครั้ง</SectionTitle>

                    <div className="w-[65%] mx-auto mt-4">
                        <div className="flex border border-black border-b-0">
                            <div className="w-[30%] border-r border-black p-1 text-center font-bold"></div>
                            <div className="w-[70%] p-0">
                                <FormItemCheck
                                    name="p19_wire_020"
                                    label="Wire 0.20mm"
                                    className="justify-center h-full border-none"
                                />
                            </div>
                        </div>
                        <FormQuickTable
                            columns={speedColumns}
                            data={speedData}
                            className="[&_thead]:bg-white"
                            showHead={true}
                        />
                    </div>
                </div>

                {/* Input Data Section */}
                <div className="mt-20">
                    <FormQuickTable
                        columns={inputDataColumns}
                        data={inputDataRows}
                        showHead={false}
                    />
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-[-150px] right-10">
                    <FormCheckedBox
                        name="p19_checked_by"
                        label="Checked by :"
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page19;