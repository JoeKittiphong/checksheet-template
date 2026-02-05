import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page104() {
    const columns = [
        { header: 'No.', key: 'no', width: '10%' },
        { header: 'Address', key: 'address', width: '30%', rowGroup: true },
        { header: 'Name of Data', key: 'name', width: '35%' },
        { header: 'Value', key: 'value', type: 'input', width: '25%' },
    ];

    const data = [
        // Rows 1-10: Manage-Parameter-Disch-Page4
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 1,
            address: "Manage-Parameter-Disch-Page4",
            name: `DPW PC02-22 V${i}`,
            value: `p104_v${i}`
        })),
        // Rows 11-20: Manage-Parameter-Disch-Page7
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 11,
            address: "Manage-Parameter-Disch-Page7",
            name: `DPW PC02-22 V${i + 10}`,
            value: `p104_v${i + 10}`
        }))
    ];

    return (
        <A4Paper content={content} currentPage={104}>
            <SectionTitle>22.7 Re-Check Data of DPW PC02-22 [V0~V19] by input data from machine into E-Check Sheet</SectionTitle>

            <div className="p-4 space-y-4">
                <FormQuickTable
                    columns={columns}
                    data={data}
                />

                <div className="flex justify-end mt-8">
                    <FormCheckedBox
                        name="p104_checked_by"
                        label="Input Date :"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page104;