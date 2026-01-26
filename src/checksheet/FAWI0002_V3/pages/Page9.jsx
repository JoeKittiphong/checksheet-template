import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';

// Import asset image for distance check
import distImage from '@/assets/FAWI0002_V3/image-8.JPG';

function Page9() {
    return (
        <A4Paper content={content} currentPage={9}>
            <div className="flex flex-col gap-6">
                {/* Section 7 */}
                <section>
                    <SectionTitle>7. Touch Limit Check (touch limit by G81)</SectionTitle>
                    <div className="ml-4 mt-2">
                        <div className="flex items-center gap-2 mb-4">
                            <FormChecknumber
                                name="p9_limit_l"
                                label="L ="
                                className="w-24 border-b border-black"
                            />
                            <span className="text-xs text-gray-600">(ดูจาก Check Sheet ของ Mc Check)</span>
                        </div>

                        <div className="flex items-start gap-4">
                            <FormQuickTable
                                className="w-[500px]"
                                columns={[
                                    { header: 'Axis', key: 'axis', rowGroup: true, align: 'center', width: '80px' },
                                    { header: 'L (mm)', key: 'l_val', align: 'center', width: '100px' },
                                    { header: 'STD (mm)', key: 'std_label', align: 'center', width: '120px' },
                                    { header: 'Measure (mm)', key: 'measure', type: 'input', align: 'center' },
                                ]}
                                data={[
                                    { axis: 'Z+', l_val: '-', std_label: '[+1.5] - [+2.5]', measure: 'p9_zplus_measure', measure_min: 1.5, measure_max: 2.5 },
                                    { axis: 'Z-', l_val: '5.1-7', std_label: '[-1.5] - [-2.5]', measure: 'p9_zminus_1_measure', measure_min: -2.5, measure_max: -1.5 },
                                    { axis: 'Z-', l_val: '4-5', std_label: '[-1.0] - [-2.0]', measure: 'p9_zminus_2_measure', measure_min: -2.0, measure_max: -1.0 },
                                    { axis: 'Z-', l_val: '3-3.9', std_label: '[-0.5] - [-1.5]', measure: 'p9_zminus_3_measure', measure_min: -1.5, measure_max: -0.5 },
                                ]}
                            />
                            <div className="flex flex-col justify-around h-[70px] mt-[25px] text-[10px] font-bold">
                                <div>=&gt; <span className="underline">ไม่ต้อง</span>บวก Stroke Expansion</div>
                                <div className="flex items-center gap-1">
                                    <div className="text-4xl font-light text-gray-400">{'}'}</div>
                                    <div className="underline">บวก</div> Stroke Expansion
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <FormCheckedBox name="p9_checked_by_sec7" label="Checked by / Date" />
                        </div>
                    </div>
                </section>

                {/* Section 8 */}
                <section>
                    <SectionTitle>8. Upper Guide Distance Check (Standard = 4 ~ 6 mm)</SectionTitle>
                    <div className="ml-4">
                        <p className="text-xs font-bold mb-4">Distance between Upper Guide and Work Stand Check.</p>

                        <div className="flex justify-center mb-6">
                            <img src={distImage} alt="Distance Check" className="w-[210px]" />
                        </div>

                        <FormItemCheck
                            name="p9_l4_l6_check"
                            label={<span className="text-sm">L4 สามารถลอดผ่านได้, L6 ห้ามลอดผ่าน (L5 สามารถลอดผ่านหรือลอดไม่ผ่านก็ได้)</span>}
                        />

                        <div className="mt-2 ml-4">
                            <p className="text-xs font-bold underline mb-3">- Record data Manage - Parameter - Axis</p>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInputCheckSTD
                                    name="p9_stroke_exp_plus"
                                    label="Page 3 : STROKE EXPANSION Z (+)"
                                    unit=""
                                    minStd={-1.0}
                                    maxStd={1.0}
                                    inputWidth="w-24"
                                />
                                <FormInputCheckSTD
                                    name="p9_stroke_exp_minus"
                                    label="Page 3 : STROKE EXPANSION Z (-)"
                                    unit=""
                                    minStd={-1.0}
                                    maxStd={1.0}
                                    inputWidth="w-24"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <span className="text-sm font-bold">STD Z+ and Z- = -1.0 ~ 1.0</span>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <FormCheckedBox name="p9_checked_by_sec8" label="Checked by :" />
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page9;