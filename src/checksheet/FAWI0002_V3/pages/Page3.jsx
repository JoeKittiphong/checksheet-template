import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import image4_3 from '@/assets/FAWI0002_V3/image-4-3.jpg';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormValidatedCell from '@/components/FormComponents/FormValidatedCell';

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
                    <FormQuickTable
                        className="mb-6"
                        columns={[
                            { header: 'Parameter', key: 'label', align: 'left', width: '25%' },
                            { header: 'AL400G', key: 'al400g', type: 'input', headerCheckbox: 'p3_tc_al400g' },
                            { header: 'AL400P', key: 'al400p', type: 'input', headerCheckbox: 'p3_tc_al400p' },
                            { header: 'ALN400Q', key: 'aln400q', type: 'input', headerCheckbox: 'p3_tc_aln400q' },
                        ]}
                        data={[
                            { label: 'X+U STROKE LIMIT MIN', al400g: 'p3_sc_xumin_400g', al400g_min: 15, al400g_max: 20, al400p: 'p3_sc_xumin_400p', al400p_min: 10, al400p_max: 20, aln400q: 'p3_sc_xumin_n400q', aln400q_min: 0, aln400q_max: 0, defaultValue: '15' },
                            { label: 'X+U STROKE LIMIT MAX', al400g: 'p3_sc_xumax_400g', al400g_min: 990, al400g_max: 1000, al400p: 'p3_sc_xumax_400p', al400p_min: 525, al400p_max: 535, aln400q: 'p3_sc_xumax_n400q', aln400q_min: 990, aln400q_max: 1000, defaultValue: '1000' },
                            { label: 'Y+V STROKE LIMIT MIN', al400g: 'p3_sc_yvmin_400g', al400g_min: 0, al400g_max: 0, al400p: 'p3_sc_yvmin_400p', al400p_min: 0, al400p_max: 0, aln400q: 'p3_sc_yvmin_n400q', aln400q_min: 0, aln400q_max: 0, defaultValue: '0' },
                            { label: 'Y+V STROKE LIMIT MAX', al400g: 'p3_sc_yvmax_400g', al400g_min: 378, al400g_max: 478, al400p: 'p3_sc_yvmax_400p', al400p_min: 378, al400p_max: 478, aln400q: 'p3_sc_yvmax_n400q', aln400q_min: 378, aln400q_max: 478, defaultValue: '378' },
                            { label: 'Z AXIS STROKE', al400g: 'p3_sc_z_400g', al400g_min: 252, al400g_max: 352, al400p: 'p3_sc_z_400p', al400p_min: 252, al400p_max: 352, aln400q: 'p3_sc_z_n400q', aln400q_min: 252, aln400q_max: 352, defaultValue: '252.00007' },
                        ]}
                    />

                    {/* Table 5.2 - Axis Measurement with Shared Validation Component */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-black text-xs">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th rowSpan={2} className="border border-black px-2 py-1 w-16">Axis</th>
                                    <th colSpan={2} className="border border-black px-2 py-1 text-sm font-bold">AL400G</th>
                                    <th colSpan={2} className="border border-black px-2 py-1 text-sm font-bold">AL600G</th>
                                </tr>
                                <tr>
                                    <th className="border border-black px-2 py-1">STD (mm)</th>
                                    <th className="border border-black px-2 py-1">Measure (mm)</th>
                                    <th className="border border-black px-2 py-1">STD (mm)</th>
                                    <th className="border border-black px-2 py-1">Measure (mm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-100 font-bold">X</td>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">400 ~ 402</td>
                                    <FormValidatedCell name="p3_m_x_400g" min={400} max={402} />
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">600 ~ 602</td>
                                    <FormValidatedCell name="p3_m_x_600g" min={600} max={602} />
                                </tr>
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-100 font-bold">Y</td>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">300 ~ 302</td>
                                    <FormValidatedCell name="p3_m_y_400g" min={300} max={302} />
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">400 ~ 402</td>
                                    <FormValidatedCell name="p3_m_y_600g" min={400} max={402} />
                                </tr>
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-100 font-bold">Z</td>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">249 ~ 252</td>
                                    <FormValidatedCell name="p3_m_z_400g" min={249} max={252} />
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">349 ~ 352</td>
                                    <FormValidatedCell name="p3_m_z_600g" min={349} max={352} />
                                </tr>
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-100 font-bold">U</td>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">150 ~ 151</td>
                                    <FormValidatedCell name="p3_m_u_400g" min={150} max={151} />
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">150 ~ 151</td>
                                    <FormValidatedCell name="p3_m_u_600g" min={150} max={151} />
                                </tr>
                                <tr>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-100 font-bold">V</td>
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">150 ~ 151</td>
                                    <FormValidatedCell name="p3_m_v_400g" min={150} max={151} />
                                    <td className="border border-black px-2 py-1 text-center bg-gray-50">150 ~ 151</td>
                                    <FormValidatedCell name="p3_m_v_600g" min={150} max={151} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;