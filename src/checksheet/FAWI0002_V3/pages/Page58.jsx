import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page58() {
    return (
        <A4Paper content={content} currentPage={58}>
            <div className="flex flex-col text-[11px] h-full">
                <SectionTitle className="mt-0">56. ST Check</SectionTitle>

                <div className="pl-6 flex flex-col gap-6 mt-4">

                    {/* Data X-Axis */}
                    <div>
                        <span className="font-bold underline text-xs">Data X-Axis</span>
                        <div className="pl-6 flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <FormInputCheckSTD
                                    name="p58_x_err_minus"
                                    label="Error X- Side : H128 ="
                                    maxStd={0.0035}
                                    width="150px"
                                />
                                <span className="text-xs">(STD : Max ≤ 0.0035)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FormInputCheckSTD
                                    name="p58_x_err_plus"
                                    label="Error X+ Side : H228 ="
                                    maxStd={0.0035}
                                    width="150px"
                                />
                                <span className="text-xs">(STD : Max ≤ 0.0035)</span>
                            </div>

                            <FormItemCheck
                                name="p58_x_diff_max"
                                label="Dia. Diff Max : H132 ="
                                input={{ name: "p58_x_diff_max_val", width: "150px" }}
                                showCheckbox={false}
                            />
                            <FormItemCheck
                                name="p58_x_diff_min"
                                label="Dia. Diff Min : H133 ="
                                input={{ name: "p58_x_diff_min_val", width: "150px" }}
                                showCheckbox={false}
                            />
                            <FormItemCheck
                                name="p58_x_dia_error"
                                label="Dia. Error : H134 ="
                                input={{ name: "p58_x_dia_error_val", width: "150px" }}
                                showCheckbox={false}
                            />
                        </div>
                    </div>

                    {/* Data Y-Axis */}
                    <div>
                        <span className="font-bold underline text-xs">Data Y-Axis</span>
                        <div className="pl-6 flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <FormInputCheckSTD
                                    name="p58_y_err_minus"
                                    label="Error Y- Side : H128 ="
                                    maxStd={0.0035}
                                    width="150px"
                                />
                                <span className="text-xs">(STD : Max ≤ 0.0035)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FormInputCheckSTD
                                    name="p58_y_err_plus"
                                    label="Error Y+ Side : H228 ="
                                    maxStd={0.0035}
                                    width="150px"
                                />
                                <span className="text-xs">(STD : Max ≤ 0.0035)</span>
                            </div>

                            <FormItemCheck
                                name="p58_y_diff_max"
                                label="Dia. Diff Max : H132 ="
                                input={{ name: "p58_y_diff_max_val", width: "150px" }}
                                showCheckbox={false}
                            />
                            <FormItemCheck
                                name="p58_y_diff_min"
                                label="Dia. Diff Min : H133 ="
                                input={{ name: "p58_y_diff_min_val", width: "150px" }}
                                showCheckbox={false}
                            />
                            <FormItemCheck
                                name="p58_y_dia_error"
                                label="Dia. Error : H134 ="
                                input={{ name: "p58_y_dia_error_val", width: "150px" }}
                                showCheckbox={false}
                            />
                        </div>
                    </div>

                </div>

                <div className="flex justify-end mt-10 mr-10 relative">
                    <FormCheckedBox name="p58_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page58;