
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page30() {
    const listItems = [
        "เลื่อนแกน Z = 0 แล้วเริ่ม Cutting (Submerge with high pressure)",
        "เปลี่ยน \"C-NO\" เป็น \"C555\" หน้าต่าง Condition จะเปลี่ยนเป็นสีเขียว",
        "เมื่อ Cutting ไปได้ 8mm บันทึกค่า data ที่ Address 89431H และ 89432H ลงในตาราง",
        {
            text: "Note : ค่า data ที่ 89432H จะต้องมีค่าอยู่ในช่วง 035~045",
            sub: [
                "ถ้าค่าที่ Address 89432H ≠ 040 ให้ทำตามข้อที่ 4.4",
                "ถ้าค่าที่ Address 89432H = 040 ให้บันทึกค่าในตาราง แล้วทำตามข้อที่ 7"
            ]
        },
        "นำค่า data ที่ Address 89432H มาคำนวนตามสูตรข้างล่าง",
        "(ความหนา work piece(40) X 100) ÷ ค่า data ที่ Address 89432H",
        "นำค่าที่คำนวนได้มาใส่ที่ Setting-Cutting-TC Thick Rate แล้วทำตามข้อ 5.1~5.3 อีกครั้ง"
    ];

    // ----- Table Configuration -----
    const columns = [
        { header: "", key: "label", width: "20%", isLabel: true, className: "text-left pl-2" },
        { header: "Setting-Check-[2000H]-Page2\n[89431H]", key: "check_2000h", width: "16%" },
        { header: "Setting-Check-[2000H]-Page2\n[89432H]", key: "check_89432h", width: "16%" },
        { header: "Setting-Cutting-Page1\nTC THICK RATE", key: "thick_rate", width: "16%" },
        { header: "VOLTAGE\n[V]", key: "voltage", width: "16%" },
        { header: "CURRENT\n[A]", key: "current", width: "16%" },
        { header: "SPEED\n[mm/min]", key: "speed", width: "16%" },
    ];

    const headerRows = [
        [
            { header: "", rowSpan: 2, className: "bg-white border-b-0" },
            { header: "Setting-Check-[2000H]-Page2", colSpan: 2, className: "bg-gray-300 font-bold" },
            { header: "Setting-Cutting-Page1", className: "bg-gray-300 font-bold" },
            { header: "VOLTAGE", className: "bg-gray-300 font-bold" },
            { header: "CURRENT", className: "bg-gray-300 font-bold" },
            { header: "SPEED", className: "bg-gray-300 font-bold" },
        ],
        [
            { header: "[89431H]", className: "bg-gray-300 font-bold" },
            { header: "[89432H]", className: "bg-gray-300 font-bold" },
            { header: "TC THICK RATE", className: "bg-gray-300 font-bold" },
            { header: "[V]", className: "bg-gray-300 font-bold" },
            { header: "[A]", className: "bg-gray-300 font-bold" },
            { header: "[mm/min]", className: "bg-gray-300 font-bold" },
        ]
    ];

    const createRows = (prefix) => [
        {
            label: "AL400G/600G",
            check_2000h: "---",
            check_89432h: "040",
            thick_rate: "000",
            voltage: "--",
            current: "> 9.0",
            speed: "> 2.6"
        },
        {
            label: "Data 1",
            check_2000h: `${prefix}_check_2000h_1`, type: "input",
            check_89432h: `${prefix}_check_89432h_1`, check_89432h_min: 40, check_89432h_max: 40,
            thick_rate: `${prefix}_thick_rate_1`, thick_rate_min: 0, thick_rate_max: 0,
            voltage: `${prefix}_voltage_1`,
            current: `${prefix}_current_1`, current_min: -9999, current_max: 9.0,
            speed: `${prefix}_speed_1`, speed_min: -9999, speed_max: 2.6
        },
        {
            label: "Data 2",
            check_2000h: `${prefix}_check_2000h_2`, type: "input",
            check_89432h: `${prefix}_check_89432h_2`, check_89432h_min: 40, check_89432h_max: 40,
            thick_rate: `${prefix}_thick_rate_2`, thick_rate_min: 0, thick_rate_max: 0,
            voltage: `${prefix}_voltage_2`,
            current: `${prefix}_current_2`, current_min: -9999, current_max: 9.0,
            speed: `${prefix}_speed_2`, speed_min: -9999, speed_max: 2.6
        },
    ];

    return (
        <A4Paper content={content} currentPage={30}>
            <div className="flex flex-col text-[12px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">15.3 Thinking Circuit Loading Check (Cutting)</SectionTitle>

                <div className="pl-2 flex flex-col gap-1">
                    {listItems.map((item, idx) => {
                        if (typeof item === 'string') {
                            return <FormItemCheck key={idx} name={`p30_list_check_${idx + 1}`} label={item} showCheckbox={idx !== 4 && idx !== 5} />;
                        } else {
                            return (
                                <div key={idx} className="ml-6">
                                    <p className="underline mb-1">{item.text}</p>
                                    {item.sub.map((subItem, sIdx) => (
                                        <p key={sIdx} className="ml-4">{subItem}</p>
                                    ))}
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Table 1: Thinking Circuit */}
                <div className="mt-4">
                    <FormItemCheck name="p30_thinking_check" label="THINKING CIRCUIT" showCheckbox={true} className="font-bold underline mb-1" />
                    <p className="font-bold mb-1 pl-6">- WK = 20 <span className="font-normal text-gray-600">ตารางบันทึกค่า Data</span></p>
                    <FormQuickTable
                        columns={columns}
                        data={createRows('p30_thinking')}
                        headerRows={headerRows}
                    />
                    <p className="mt-1 text-[11px]">Check Cutting speed when <span className="font-bold">"AUTO_IN_STATE (#89429)" becomes <span className="underline">"36"</span></span> (mean = Thickness:40mm, Status:Close)</p>
                </div>

                {/* Table 2: DSM Option */}
                <div className="mt-4">
                    <FormItemCheck name="p30_dsm_check" label="DSM OPTION" showCheckbox={true} className="font-bold underline mb-1" />
                    <p className="font-bold mb-1 pl-6">- WK = 20 <span className="font-normal text-gray-600">ตารางบันทึกค่า Data</span></p>
                    <FormQuickTable
                        columns={columns}
                        data={createRows('p30_dsm')}
                        headerRows={headerRows}
                    />
                    <p className="mt-1 text-[11px]">Check Cutting speed when <span className="font-bold">"AUTO_IN_STATE (#89429)" becomes <span className="underline">"36"</span></span> (mean = Thickness:40mm, Status:Close)</p>
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p30_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page30;