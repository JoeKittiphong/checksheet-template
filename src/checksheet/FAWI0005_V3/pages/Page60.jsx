
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page60() {
    const columns = [
        { header: 'No.', key: 'no', width: '10%' },
        { header: 'Address', key: 'address', width: '30%', rowGroup: true },
        { header: 'Name of Data', key: 'name', width: '35%' },
        { header: 'Value', key: 'value', type: 'input', width: '25%' },
    ];

    const data = [
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 1,
            address: "Manage-Parameter-Disch-Page9",
            name: `DPW PC12 V${i}`,
            value: `p60_v${i}`
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 11,
            address: "Manage-Parameter-Disch-Page10",
            name: `DPW PC12 V${i + 10}`,
            value: `p60_v${i + 10}`
        }))
    ];

    return (
        <A4Paper content={content} currentPage={60}>
            <SectionTitle>18.7 Re-Check Data of DPW PC12 [V0~V19] by input data from machine into E-Check Sheet</SectionTitle>

            <div className="p-4 space-y-4">
                <FormQuickTable
                    columns={columns}
                    data={data}
                />

                <div className="flex justify-end mt-8">
                    <FormCheckedBox
                        name="p60_checker"
                        label="Input Date / Input by"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page60;