import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import machineImage from "@/assets/FAWI0005_V3/page120_machine.png";

function Page120() {
    const { register } = useFormContext();

    // Common body style for tight cells
    const tightBodyClass = "!py-0 !px-1 text-[10px] leading-none h-5";

    // Table 1 Config (V0-V9)
    const columns1 = [
        {
            header: "V*",
            key: "label",
            width: "10%",
            className: "font-bold bg-gray-200 !py-0 !px-1 text-[10px]",
            bodyClassName: `font-bold bg-gray-200 ${tightBodyClass}`
        },
        {
            header: "Setting Value Page 4/14 \n DPW PC 01-21 V0-V9",
            key: "src_val",
            width: "35%",
            className: "bg-white !py-0 !px-1 text-[10px]",
            bodyClassName: tightBodyClass,
            type: "input"
        },
        {
            header: "Copy to \n PC11-31 V0-V9",
            key: "arrow",
            width: "20%",
            className: "bg-white font-bold !py-0 !px-1 text-[10px]",
            bodyClassName: `text-lg font-bold !py-0 !px-1 leading-none h-5`
        },
        {
            header: "Setting Value Page 9/14 \n DPW PC 11-31 V0-V9",
            key: "dest_val",
            width: "35%",
            className: "!py-0 !px-1 text-[10px]",
            bodyClassName: tightBodyClass,
            type: "input"
        }
    ];

    const data1 = Array.from({ length: 10 }, (_, i) => ({
        label: `V${i}`,
        src_val: `p120_v${i}_src`,
        arrow: "➝",
        dest_val: `p120_v${i}_dest`,
        className: "h-5" // Attempt to force row height
    }));

    // Table 2 Config (V10-V19)
    const columns2 = [
        {
            header: "V*",
            key: "label",
            width: "10%",
            className: "font-bold bg-gray-200 !py-0 !px-1 text-[10px]",
            bodyClassName: `font-bold bg-gray-200 ${tightBodyClass}`
        },
        {
            header: "Setting Value Page 7/14 \n DPW PC 01-21 V10-V19",
            key: "src_val",
            width: "35%",
            className: "bg-white !py-0 !px-1 text-[10px]",
            bodyClassName: tightBodyClass,
            type: "input"
        },
        {
            header: "Copy to \n PC11-31",
            key: "arrow",
            width: "20%",
            className: "bg-white font-bold !py-0 !px-1 text-[10px]",
            bodyClassName: `text-lg font-bold !py-0 !px-1 leading-none h-5`
        },
        {
            header: "Setting Value Page 8/14 \n DPW PC 11-31 V10-V19",
            key: "dest_val",
            width: "35%",
            className: "!py-0 !px-1 text-[10px]",
            bodyClassName: tightBodyClass,
            type: "input"
        }
    ];

    const data2 = Array.from({ length: 10 }, (_, i) => ({
        label: `V${i + 10}`,
        src_val: `p120_v${i + 10}_src`,
        arrow: "➝",
        dest_val: `p120_v${i + 10}_dest`,
        className: "h-5"
    }));

    return (
        <A4Paper content={content} currentPage={120}>
            <div className="flex flex-col gap-1 px-4 font-sans text-[10px]">

                {/* Section 24.10 */}
                <div>
                    <SectionTitle>24.10 Input data to [Disch-9/14 DPW PC11-31 V0-V9] (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>
                    <div className="pl-4 text-center font-bold text-[9px]">
                        (Same setting value of [Disch-4/14 DPW PC01-21 V0-V9])
                    </div>
                    <FormQuickTable
                        columns={columns1}
                        data={data1}
                        bordered
                        className="text-center w-full table-fixed !overflow-hidden"
                        headerClassName="!text-[10px] leading-tight !py-0"
                    />
                </div>

                {/* Section 24.11 */}
                <div className="mt-1">
                    <SectionTitle>24.11 Input data to [Disch-8/14 DPW PC11-31 V10-V19] (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>
                    <div className="pl-4 text-center font-bold text-[9px]">
                        (Same setting value of [Disch-7/14 DPW PC01-21 V10-V19])
                    </div>
                    <FormQuickTable
                        columns={columns2}
                        data={data2}
                        bordered
                        className="text-center w-full table-fixed !overflow-hidden"
                        headerClassName="!text-[10px] leading-tight !py-0"
                    />
                </div>

                {/* Section 24.12 */}
                <div className="mt-1">
                    <SectionTitle>24.12 After Input DPW Data to the machine, Done Running the Program " CHK_VSET08 " for data detector of DPW</SectionTitle>
                    <div className="pl-4 mb-2 font-bold text-center text-[9px]">
                        (ภายหลังจากใส่ Data ลงในเครื่อง ให้รันโปรแกรม " CHK_VSET08 " เพื่อตรวจจับความถูกต้องค่า Data ของ DPW)
                    </div>

                    <div className="flex justify-center items-start mt-1 gap-2">
                        <div className="p-1 bg-gray-50">
                            {/* Placeholder for machine image - reduced size */}
                            <img
                                src={machineImage}
                                alt="Machine Screen CHK_VSET08"
                                className="w-[320px] object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentNode.innerHTML = '<div class="w-[320px] h-[180px] bg-gray-200 flex items-center justify-center text-red-500 font-bold</div>';
                                }}
                            />
                        </div>

                        <div className="flex flex-col justify-between h-full pt-1">
                            <div className="text-[9px] space-y-1 mb-4">
                                <p><span className="underline">หมายเหตุ</span> : โปรแกรม CHK_VSET08 สามารถ</p>
                                <p className="pl-8">ใช้ได้กับทุกเครื่องที่เป็น AL400G/AL600G</p>
                            </div>

                            <div className="w-48 scale-90 origin-top-left">
                                <FormCheckedBox
                                    name="p120_checked_by"
                                    label="Checked by :"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page120;