import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page45() {

    const columns = [
        { header: 'No.', key: 'no', width: '40px' },
        { header: 'Address', key: 'address', width: '200px', rowGroup: true },
        { header: 'Name of Data', key: 'name', width: '300px', align: 'left' },
        { header: 'Value', key: 'value', type: 'input' },
    ];

    const data = [
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 1,
            address: "Manage-Parameter-Disch-Page9",
            name: `DPW PC32 V${i}`,
            value: `p45_v${i}`
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 11,
            address: "Manage-Parameter-Disch-Page8",
            name: `DPW PC32 V${i + 10}`,
            value: `p45_v${i + 10}`
        }))
    ];

    return (
        <A4Paper content={content} currentPage={45}>
            <SectionTitle>
                17.12 Re-Check Data of DPW PC32 [V0~V19] by input data from machine into E-Check Sheet
            </SectionTitle>

            <div className="p-4 space-y-4">
                <div className="font-bold mb-2">Temporary check for record input data</div>

                <FormQuickTable
                    columns={columns}
                    data={data}
                />

                <div className="flex justify-end mt-8">
                    <FormCheckedBox
                        name="p45_checker"
                        label="Input Date / Input by"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page45;