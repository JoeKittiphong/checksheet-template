import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import image4_3 from '@/assets/FAWI0002_V3/image-4-3.jpg';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page3() {
    const { register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="">
                <SectionTitle>4.3 Distance Low guide check - หลังประกอบ Jig set lower guide</SectionTitle>
                <div className="mt-2 ml-4 mb-10">
                    <p className='text-sm'>ให้ทำการวัดระยะ ด้านซ้ายและขวา ดังภาพ จากนั้นใส่ระยะที่วัดได้ทั้งสองด้าน</p>
                    <div className="flex">
                        <img src={image4_3} alt="page3" className="w-96 mt-5" />

                        <div className="ml-5 mt-5">
                            <FormInputCheckSTD
                                name="p3_dist_right"
                                label="Right side ="
                                unit="mm"
                                minStd={7.9}
                                maxStd={8.1}
                                inputWidth="w-24"
                            />
                            <FormInputCheckSTD
                                name="p3_dist_left"
                                label="Left side ="
                                unit="mm"
                                minStd={7.9}
                                maxStd={8.1}
                                inputWidth="w-24"
                            />

                            <p className='text-xs'>(กำหนด STD ด้านละ 7.9 - 8.1 mm)</p>

                            <div className="pt-4 flex justify-end">
                                <FormCheckedBox name="p3_checked_by" label="Checked by :" />
                            </div>
                        </div>
                    </div>
                </div>

                <SectionTitle>5. Stroke Check (Manage - Parameter - Machine - Page 2)</SectionTitle>
                <div className="ml-4 mt-2">
                    {/* Table 5.1: Stroke Check */}
                    <FormQuickTable
                        className="mb-6"
                        columns={[
                            { header: 'Parameter', key: 'label', align: 'left', width: '25%' },
                            { header: 'AL400G', key: 'al400g', type: 'input', headerCheckbox: 'p3_tc_al400g' },
                            { header: 'AL400P', key: 'al400p', type: 'input', headerCheckbox: 'p3_tc_al400p' },
                            { header: 'ALN400Q', key: 'aln400q', type: 'input', headerCheckbox: 'p3_tc_aln400q' },
                        ]}
                        data={[
                            { label: 'X+U STROKE LIMIT MIN', al400g: 'p3_sc_xumin_400g', al400p: 'p3_sc_xumin_400p', aln400q: 'p3_sc_xumin_n400q', defaultValue: '15' },
                            { label: 'X+U STROKE LIMIT MAX', al400g: 'p3_sc_xumax_400g', al400p: 'p3_sc_xumax_400p', aln400q: 'p3_sc_xumax_n400q', defaultValue: '1000' },
                            { label: 'Y+V STROKE LIMIT MIN', al400g: 'p3_sc_yvmin_400g', al400p: 'p3_sc_yvmin_400p', aln400q: 'p3_sc_yvmin_n400q', defaultValue: '0' },
                            { label: 'Y+V STROKE LIMIT MAX', al400g: 'p3_sc_yvmax_400g', al400p: 'p3_sc_yvmax_400p', aln400q: 'p3_sc_yvmax_n400q', defaultValue: '378' },
                            { label: 'Z AXIS STROKE', al400g: 'p3_sc_z_400g', al400p: 'p3_sc_z_400p', aln400q: 'p3_sc_z_n400q', defaultValue: '252.00007' },
                        ]}
                    />

                    {/* Table 5.2: Axis Measurement (Using nestedHeaders support) */}
                    <FormQuickTable
                        headerRows={[
                            [
                                { header: 'Axis', rowSpan: 2, width: '64px' },
                                { header: 'AL400G', colSpan: 2 },
                            ],
                            [
                                { header: 'STD (mm)' },
                                { header: 'Measure (mm)' },
                            ]
                        ]}
                        columns={[
                            { key: 'axis', align: 'center' },
                            { key: 'std1', align: 'center' },
                            { key: 'val1', type: 'input' }
                        ]}
                        data={[
                            { axis: 'X', std1: '400 ~ 402', val1: 'p3_m_x_400g', val1_min: 400, val1_max: 402, std2: '600 ~ 602', val2: 'p3_m_x_600g', val2_min: 600, val2_max: 602 },
                            { axis: 'Y', std1: '300 ~ 302', val1: 'p3_m_y_400g', val1_min: 300, val1_max: 302, std2: '400 ~ 402', val2: 'p3_m_y_600g', val2_min: 400, val2_max: 402 },
                            { axis: 'Z', std1: '249 ~ 252', val1: 'p3_m_z_400g', val1_min: 249, val1_max: 252, std2: '349 ~ 352', val2: 'p3_m_z_600g', val2_min: 349, val2_max: 352 },
                            { axis: 'U', std1: '150 ~ 151', val1: 'p3_m_u_400g', val1_min: 150, val1_max: 151, std2: '150 ~ 151', val2: 'p3_m_u_600g', val2_min: 150, val2_max: 151 },
                            { axis: 'V', std1: '150 ~ 151', val1: 'p3_m_v_400g', val1_min: 150, val1_max: 151, std2: '150 ~ 151', val2: 'p3_m_v_600g', val2_min: 150, val2_max: 151 },
                        ]}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;