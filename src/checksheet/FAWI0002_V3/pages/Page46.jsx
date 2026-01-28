
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page46() {
    return (
        <A4Paper content={content} currentPage={46}>
            <div className="flex flex-col text-xs relative h-full">
                {/* 51. U-Axis Power off Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle className="mt-0">51. U-Axis Power off Check</SectionTitle>

                    {/* 51.1 U- Axis */}
                    <div className="flex flex-col gap-2 pl-4 mt-2">
                        <span className="font-bold">51.1 Running Program U- AXIS and power off 3 times.</span>
                        <div className="flex items-start gap-8 ml-8">
                            <div className="flex flex-col gap-1 font-mono">
                                <span>U- : G00 U0.0</span>
                                <span className="pl-8">G00 U-3.0</span>
                                <span className="pl-8">G00 U0.0</span>
                            </div>
                            <FormQuickTable
                                columns={[
                                    { key: 'step', width: '50px', isLabel: true },
                                    { key: 'u_minus', type: 'input', width: '150px' }
                                ]}
                                headerRows={[
                                    [
                                        { header: '', colSpan: 1 },
                                        { header: 'U-', colSpan: 1 }
                                    ]
                                ]}
                                data={[
                                    { step: '[1]', u_minus: 'p46_51_1_u_minus_1' },
                                    { step: '[2]', u_minus: 'p46_51_1_u_minus_2' },
                                    { step: '[3]', u_minus: 'p46_51_1_u_minus_3' }
                                ]}
                                className="bg-white"
                            />
                        </div>
                    </div>

                    {/* 51.2 U+ Axis */}
                    <div className="flex flex-col gap-2 pl-4 mt-4">
                        <span className="font-bold">51.2 Running Program U+ AXIS and power off 3 times.</span>
                        <div className="flex items-start gap-8 ml-8">
                            <div className="flex flex-col gap-1 font-mono">
                                <span>U+ : G00 U0.0</span>
                                <span className="pl-8">G00 U+3.0</span>
                                <span className="pl-8">G00 U0.0</span>
                            </div>
                            <FormQuickTable
                                columns={[
                                    { key: 'step', width: '50px', isLabel: true },
                                    { key: 'u_plus', type: 'input', width: '150px' }
                                ]}
                                headerRows={[
                                    [
                                        { header: '', colSpan: 1 },
                                        { header: 'U+', colSpan: 1 }
                                    ]
                                ]}
                                data={[
                                    { step: '[1]', u_plus: 'p46_51_2_u_plus_1' },
                                    { step: '[2]', u_plus: 'p46_51_2_u_plus_2' },
                                    { step: '[3]', u_plus: 'p46_51_2_u_plus_3' }
                                ]}
                                className="bg-white"
                            />
                        </div>
                    </div>

                    {/* 51.3 Data Max checking */}
                    <div className="flex flex-col gap-4 pl-4 mt-8">
                        <div className="flex items-center gap-2">
                            <div className="font-bold">
                                <FormItemCheck name="p46_51_3_data_max" label="51.3 Data Max of U- and U+ =" input={{ name: "p46_51_3_data_max", width: "80px", type: "number" }} showCheckbox={false} className="!p-0" />
                            </div>
                            <span className="font-bold">mm</span>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                            <div className="flex flex-col gap-1">
                                <FormItemCheck
                                    name="p46_51_3_check_low"
                                    label={<span className="font-bold">If data max {"<"} 2.5 mm =={">"} Finish</span>}
                                />
                                <span className="ml-8 italic">U AXIS - AXIS RETURN BAND = 2.5</span>
                            </div>

                            <div className="flex flex-col gap-1 mt-2">
                                <FormItemCheck
                                    name="p46_51_3_check_high"
                                    label={<span className="font-bold">If data max {">"} 2.5 mm =={">"} Adjust data U-Axis</span>}
                                />
                                <div>
                                    <FormItemCheck name="p46_51_3_return_band_calc" input={{ name: "p46_51_3_return_band_calc", type: "number", width: "80px", suffix:"mm"}}  label={<p>U AXIS - AXIS RETURN BAND = <b>Data Max + 0.2</b> = </p>} showCheckbox={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Signature - Fixed at bottom */}
                <div className="mt-auto flex justify-end pr-10 pb-4">
                    <FormCheckedBox name="p46_checked" label="Checked by :" className="w-1/3" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page46;
