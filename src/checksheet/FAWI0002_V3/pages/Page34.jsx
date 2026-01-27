import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

import imgSensor from '@/assets/FAWI0002_V3/image-36-1.JPG';
import imgRDI from '@/assets/FAWI0002_V3/image-36-2.JPG';

function Page34() {
    return (
        <A4Paper content={content} currentPage={34}>
            <div>

                <SectionTitle>36. Back Tension Adjustment</SectionTitle>

                {/* 36.1 Proximity Sensor Check */}
                <div className="ml-5 flex flex-col gap-2">
                    <FormItemCheck
                        name="p34_sensor_check_main"
                        label={<span className="font-bold text-sm">36.1 Proximity Sensor Check</span>}
                    />

                    <div className="relative w-max mx-auto mt-2">
                        <img src={imgSensor} alt="Sensor Check Callouts" className="h-50" />

                        {/* Callout 1 */}
                        <div className="absolute top-[67%] left-[24%]">
                            <FormItemCheck name="p34_step1_check" />
                        </div>

                        {/* Callout 2 */}
                        <div className="absolute top-[24%] left-[41%]">
                            <FormItemCheck name="p34_step2_check" />
                        </div>
                    </div>
                </div>

                {/* 36.2 RDI Check */}
                <div className="ml-5 flex flex-col gap-2 mt-4">
                    <FormItemCheck
                        name="p34_rdi_check_main"
                        label={
                            <div className="flex flex-col text-sm">
                                <span className="font-bold border-b border-black w-max">36.2 RDI Check</span>
                            </div>
                        }
                    />
                    <div className="flex justify-center mt-2">
                        <img src={imgRDI} alt="RDI Check Graph" className="h-55 object-contain" />
                    </div>
                </div>

                {/* 36.3 Back Tension Adjustment Table */}
                <div className="ml-5 flex flex-col gap-2 mt-4">
                    <FormItemCheck
                        name="p34_adjustment_table_check"
                        label={<span className="font-bold text-sm">36.3 Back Tension Adjustment (Machine 8/12)</span>}
                    />

                    <div className="mt-2">
                        <FormQuickTable
                            columns={[
                                { header: 'No.', key: 'no', width: '40px' },
                                { header: 'Setting Item', key: 'item', align: 'left' },
                                { header: 'Torque', key: 'torque', width: '80px' },
                                { header: 'Setting value\n(about value)', key: 'val', width: '120px' },
                                { header: 'WK\nSetting', key: 'wk', width: '80px' },
                                { header: 'Data Setting', key: 'data', type: 'input', width: '120px' },
                            ]}
                            data={[
                                { no: '1', item: '0.3kgfm Backtension', torque: '0.3kgf', val: '40 ~ 70', wk: '10', data: 'p34_backtension_1' },
                                { no: '2', item: '0.5kgfm Backtension', torque: '0.5kgf', val: '45 ~ 75', wk: '10', data: 'p34_backtension_2' },
                                { no: '3', item: '1.0kgfm Backtension', torque: '1kgf', val: '50 ~ 85', wk: '10', data: 'p34_backtension_3' },
                                { no: '4', item: '3.0kgfm Backtension', torque: '3.0kgf', val: '90 ~ 130', wk: '10', data: 'p34_backtension_4' },
                                {
                                    no: '5',
                                    item: (
                                        <div className="flex flex-col text-[11px]">
                                            <p>STANDARD THREAD BACKTEN</p>
                                            <p className="text-gray-500 italic">นำค่ามาจาก Machine-Page2/12</p>
                                        </div>
                                    ),
                                    torque: '2.5kgf', val: '80 ~ 120', wk: '20', data: 'p34_backtension_5'
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* Signature */}
                <div className="mt-auto flex justify-end p-2">
                    <FormCheckedBox name="p34_checked_sig" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page34;