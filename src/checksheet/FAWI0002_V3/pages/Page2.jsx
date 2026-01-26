import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

import image4_1 from '@/assets/FAWI0002_V3/image-4-1.JPG';
import image4_12 from '@/assets/FAWI0002_V3/image-4-12.JPG';
import image4_2 from '@/assets/FAWI0002_V3/image-4-2.JPG';

import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page2() {
    return (
        <A4Paper content={content} currentPage={2}>
            <div>
                <SectionTitle>4. Lower Guide Check</SectionTitle>
                <div className='ml-4'>
                    <p>4.1 Parallel of Pulley Base Check</p>
                    <div className='ml-4'>
                        <FormInputCheckSTD
                            name="p2_pulley_parallel_1"
                            label="ตำแหน่งที ่ 1  : "
                            unit=" μm  (STD : 10 μm/20mm)"
                            minStd={0}
                            maxStd={10}
                        />
                        <FormInputCheckSTD
                            name="p2_pulley_parallel_2"
                            label="ตำแหน่งที ่ 2  : "
                            unit=" μm  (STD : 10 μm/20mm)"
                            minStd={0}
                            maxStd={10}
                        />
                    </div>
                    <div className='mb-5'>
                        <img src={image4_1} alt="page2" className="w-140 ml-10 mt-5" />
                        <div className='ml-4 mr-4 flex justify-between'>
                            <FormItemCheck
                                name="p2_pulley_check"
                                label="Pulley B No."
                                input={{
                                    name: "p2_pulley_no",
                                    width: "100px"
                                }}
                                showCheckbox={false}
                            />
                            <FormItemCheck
                                name="p2_dial_check"
                                label="Dial Gauge No."
                                input={{
                                    name: "p2_dial_no",
                                    width: "100px"
                                }}
                                showCheckbox={false}
                            />
                        </div>
                    </div>

                    <p>4.2 Lower Guide Level Check</p>
                    <div className='ml-5 flex gap-2 items-center'>
                        <p>- Gauge ring check</p>
                        <img src={image4_12} alt="page2" className="w-30 ml-10 mt-5" />
                        <div>
                            <FormInputCheckSTD
                                name="p2_lguide_y_before"
                                label="Y = "
                                unit="μm (Before Adjust)"
                                inputWidth="w-20"
                                validateStd={false}
                            />
                            <FormInputCheckSTD
                                name="p2_lguide_y_after"
                                label="Y = "
                                unit="μm (STD : Diff ≤ 2 μm)"
                                maxStd={2}
                                inputWidth="w-20"
                            />
                            <FormInputCheckSTD
                                name="p2_lguide_x"
                                label="X = "
                                unit="μm (STD : Diff ≤ 2 μm)"
                                maxStd={2}
                                inputWidth="w-20"
                            />
                        </div>
                    </div>

                    <div className="ml-5 mt-5">
                        <FormInputCheckSTD
                            name="p2_dist_height"
                            label="- Distance of height between Gauge Ring Zero and Work Stand Check"
                            unit="(STD = -5 ~ +5 μm)"
                            maxStd={5}
                            minStd={-5}
                            inputWidth="w-20"
                        />
                        <FormInputCheckSTD
                            name="p2_flushing_flow"
                            label="- Flushing => ON Water Flow Meter"
                            unit=" L/min (Water Pressure : WP = 55)"
                            maxStd={5}
                            minStd={4}
                            inputWidth="w-20"
                        />
                        <p className="text-sm ml-4">(about value : STD and HSP = 4.0 ~ 5.0 L/min)</p>

                        <div className="mt-2 space-y-1">
                            <FormInputCheckSTD
                                name="p2_flushing_prs_u"
                                label="Flushing PRS U ="
                                unit=" (STD = 1.0 ~ 1.3 MPa, or Water_Press_Up (87032) = 2000 ~ 2600)"
                                inputWidth="w-20"
                                validateStd={true}
                                minStd={1}
                                maxStd={1.3}
                                showCheckbox={true}
                                checkboxName="p2_flushing_prs_u_ok"
                            />
                            <FormInputCheckSTD
                                name="p2_flushing_prs_l"
                                label="Flushing PRS L ="
                                unit=" (STD = 1.0 ~ 1.3 MPa, or Water_Press_Up (87032) = 2000 ~ 2600)"
                                inputWidth="w-20"
                                validateStd={true}
                                minStd={1}
                                maxStd={1.3}
                                showCheckbox={true}
                                checkboxName="p2_flushing_prs_l_ok"
                            />
                        </div>

                        <p className="mt-4">- ตรวจสอบกำรล็อค Set Screw ภำยหลังจำกกำร Adjust Eccentricity Pin ดังนี้</p>
                        <div className='flex gap-8'>
                            <div>
                                <img src={image4_2} alt="page2" className='w-100 mt-2' />
                                <div className='flex gap-8 mt-2'>
                                    <div className="space-y-1">
                                        <FormItemCheck name="p2_lguide_lock_left" label="ล็อค Set Screw ให้แน่น" />
                                        <FormItemCheck name="p2_lguide_move_left" label="Eccentricity Pin ต้องขยับไม่ได้" />
                                        <FormItemCheck name="p2_lguide_mark_left" label="มาร์คสีที่ Eccentricity Pin" />
                                    </div>
                                    <div className="space-y-1">
                                        <FormItemCheck name="p2_lguide_lock_right" label="ล็อค Set Screw ให้แน่น" />
                                        <FormItemCheck name="p2_lguide_move_right" label="Eccentricity Pin ต้องขยับไม่ได้" />
                                        <FormItemCheck name="p2_lguide_mark_right" label="มาร์คสีที่ Eccentricity Pin" />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-10'>
                                <FormCheckedBox name="p2_checked_by" label="CHECKED BY / DATE" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;