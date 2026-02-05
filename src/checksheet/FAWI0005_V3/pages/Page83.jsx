
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page83() {

    const columns = [
        { header: 'No.', key: 'no', width: '40px', className: "font-normal bg-gray-300" },
        { header: 'Address', key: 'address', width: '200px', rowGroup: true, className: "font-bold bg-white text-left pl-2" },
        { header: 'Name of Data', key: 'name', width: '300px', align: 'center', className: "font-normal bg-white" },
        { header: 'Value', key: 'value', type: 'input', className: "bg-white" },
    ];

    const data = [
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 1,
            address: "Manage-Parameter-Disch-Page4",
            name: `DPW PC03-23 V${i}`,
            value: `p83_v${i}`
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
            no: i + 11,
            address: "Manage-Parameter-Disch-Page8",
            name: `DPW PC03-23 V${i + 10}`,
            value: `p83_v${i + 10}`
        }))
    ];

    return (
        <A4Paper content={content} currentPage={83}>
            <SectionTitle>
                20.6 Re-Check Data of DPW PC03-23 [V0~V19] by input data from machine into E-Check Sheet
            </SectionTitle>

            <div className="p-4 space-y-4">
                <div className="font-bold mb-2">Temporary check for record input data</div>

                <div className="border border-black">
                    <FormQuickTable
                        columns={columns}
                        data={data}
                        headerClassName="bg-gray-300 font-normal"
                        bordered
                    />
                </div>

                <div className="flex justify-end mt-16 pr-8">
                    <FormCheckedBox
                        name="p83_checker"
                        label="Checked by :"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page83;