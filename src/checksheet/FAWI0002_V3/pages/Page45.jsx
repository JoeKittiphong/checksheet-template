import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Import assets
import image50 from '@/assets/FAWI0002_V3/image-50.JPG';

function Page45() {
    return (
        <A4Paper content={content} currentPage={45}>
            <div className="flex flex-col gap-2 p-2 text-xs relative">
                {/* 50. Mesureing TD and TL using TaperFlexNeo */}
                <div className="flex flex-col gap-1">
                    <FormItemCheck
                        name="p45_50_group_check"
                        label={<SectionTitle className="!inline mt-0">50. Mesureing TD and TL using TaperFlexNeo.</SectionTitle>}
                    />
                </div>

                <div className="pl-6 flex flex-col gap-4">
                    {/* Header Image and Info */}
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col justify-center items-center mx-auto">
                            <span className="font-bold underline">Taper Flex NEO ItemCode : H49461A</span>
                            <span className="text-[10px] uppercase">Taper Jig Assy (60MM)[Taper Flex Neo]</span>
                            <img src={image50} alt="Taper Flex Neo" className="h-44 object-contain mt-2" />
                        </div>
                    </div>

                    {/* 50.1 Mechanical Settings */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm">50.1 Mechanical Settings</span>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1 flex-1">
                                <FormItemCheck name="p45_50_1_1" label='[1] Put the "TaperFlexNeo" on the table. (Position: About the center of the table in Y axis)' className="mt-0" />
                                <FormItemCheck name="p45_50_1_2" label='[2] Cariblate of the position of the "TaperFlexNeo" in parrarel to the Table and Y axis' className="mt-0" />
                                <FormItemCheck name="p45_50_1_3" label="[3] Measure the height between the table surface to top of the Lower pin. (Mesurement Point (a))" className="mt-0" />
                                <FormItemCheck name="p45_50_1_4" label="[4] Measure the height between the table surface to top of the Upper pin. (Mesurement Point (b))" className="mt-0" />
                                <FormItemCheck name="p45_50_1_5" label="[5] Set XY position (following above picture)" className="mt-0" />
                                <FormItemCheck name="p45_50_1_6" label='[6] Set Z axis (Z=Height of the "TaperFlexNeo" + About 5mm)' className="mt-0" />
                            </div>

                            <div className="flex flex-col gap-1 w-1/3">
                                <span className="font-bold text-center underline">Input the result of the mesurement</span>
                                <FormQuickTable
                                    header={[
                                        { header: 'Measurement Point (a)', colSpan: 2 },
                                        { header: 'Measurement Point (b)', colSpan: 2 }
                                    ]}
                                    columns={[
                                        { key: 'label', width: '200px', isLabel: true },
                                        { key: 'value', type: 'input', width: '100px' }
                                    ]}
                                    data={[
                                        { label: 'Measurement Point (a)', value: 'p45_50_m_point_a' },
                                        { label: 'Measurement Point (b)', value: 'p45_50_m_point_b' }
                                    ]}
                                    className="bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 50.2 NC program setting */}
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-1 flex-1">
                            <span className="font-bold text-sm">50.2 NC program (TFLXNEO_TDTL.nc) setting</span>
                            <span className="ml-4 font-bold underline italic">Input the following value to NC Program "H*****" Value</span>
                            <div className="ml-4 flex flex-col gap-1">
                                <FormQuickTable
                                    columns={[
                                        { key: 'param', width: '150px', isLabel: true },
                                        { key: 'value', width: '100px' },
                                        { key: 'note', width: '250px', align: 'left', isLabel: true }
                                    ]}
                                    data={[
                                        { param: 'H0003 (WK)', value: <div className="bg-gray-100 italic">020</div>, note: '(If 0.25mm Wire: 025)' },
                                        { param: 'H0008 (WT)', value: <div className="bg-gray-100 italic">120</div>, note: '(If 0.25mm Wire: 160)' },
                                        { param: 'H0002 (WS)', value: <div className="bg-gray-100 italic">050</div>, note: '' },
                                        { param: <span className="font-bold">H0009 (Edge Pos.)</span>, value: 'p45_50_h0009', type: 'input', note: <span className="font-bold underline italic">{"<=="} (Input "Measurement Point (a)")</span> },
                                        { param: <span className="font-bold">H0021 (Edge Height)</span>, value: 'p45_50_h0021', type: 'input', note: <span className="font-bold underline italic">{"<=="} (Input "Measurement Point (b)")</span> }
                                    ]}
                                    className="bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 50.3 and 50.4 */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm">50.3 Execute NC Program (TFLXNEO_TDTL.nc)</span>
                        <span className="font-bold text-sm">50.4 Read and Check the result (Do not move Z axis)</span>
                    </div>

                    {/* Bottom Table */}
                    <div className="flex flex-col mt-2 relative">
                        <div className="flex justify-end pr-32 mb-[-1px]">
                            <span className="font-bold text-sm">[Manage] - [Parameter] - [Flag] - Page 1</span>
                        </div>
                        <FormQuickTable
                            columns={[
                                { key: 'h0998', type: 'input', width: '150px' },
                                { key: 'h0999', type: 'input', width: '150px' },
                                { key: 'check', width: '80px', isLabel: true },
                                { key: 'limit', type: 'input', width: '180px' },
                                { key: 'lower', type: 'input', width: '180px' }
                            ]}
                            headerRows={[
                                [
                                    { header: 'H0998 Value' },
                                    { header: 'H0999 Value' },
                                    { header: 'Check Same Value' },
                                    { header: 'TABLE TO LIMIT' },
                                    { header: 'TABLE TO LOWER' }
                                ]
                            ]}
                            data={[
                                { h0998: 'p45_50_h0998', h0999: 'p45_50_h0999', check: '', limit: 'p45_50_limit', lower: 'p45_50_lower' }
                            ]}
                            className="bg-white"
                        />
                    </div>

                    {/* Signature */}
                    <div className="flex justify-end mt-4 pr-10 absolute bottom-42 right-[-45px]">
                        <FormCheckedBox name="p45_checked" label="Checked by :" className="w-1/3" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page45;