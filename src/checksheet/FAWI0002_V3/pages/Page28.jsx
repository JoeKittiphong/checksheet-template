import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

import imgPulleyLeft from '@/assets/FAWI0002_V3/image-29-23.JPG';
import imgPulleyRight from '@/assets/FAWI0002_V3/image-29-24.JPG';

function Page28() {
    return (
        <A4Paper content={content} currentPage={28}>
            <div className="p-2">
                <h3 className="text-lg font-bold underline">ที่ Pulley B</h3>

                <div className="mt-4 flex flex-col gap-10">

                    {/* Left Side Section */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img src={imgPulleyLeft} alt="Pulley B Left" className="h-50" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <FormItemCheck
                                name="p28_pulley_left_ok"
                                label={<span className="text-sm font-bold">OK=&gt; <span className="font-normal">ไม่พบฟองอากาศ</span></span>}
                            />
                            <FormItemCheck
                                name="p28_pulley_left_ng"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>NG =&gt; <span className="font-normal">มีฟองอากาศออกมา</span></p>
                                        <p className="ml-8 font-normal">=&gt; แจ้ง Leader Up เพื่อติดต่อกลุ่มงานที่เกี่ยวข้องมาแก้ไข</p>
                                    </div>
                                }
                            />
                            <FormItemCheck
                                name="p28_pulley_left_fixed"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>แก้ไขแล้ว =&gt; <span className="font-normal">ตรวจสอบฟองอากาศอีกครั้ง</span></p>
                                        <p className="ml-16 font-normal">=&gt; OK ไม่พบฟองอากาศแล้ว</p>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* Right Side Section */}
                    <div className="flex items-center gap-6">
                        <div className="">
                            <img src={imgPulleyRight} alt="Pulley B Right" className="h-50" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <FormItemCheck
                                name="p28_pulley_right_ok"
                                label={<span className="text-sm font-bold">OK=&gt; <span className="font-normal">ไม่พบฟองอากาศ</span></span>}
                            />
                            <FormItemCheck
                                name="p28_pulley_right_ng"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>NG =&gt; <span className="font-normal">มีฟองอากาศออกมา</span></p>
                                        <p className="ml-8 font-normal">=&gt; แจ้ง Leader Up เพื่อติดต่อกลุ่มงานที่เกี่ยวข้องมาแก้ไข</p>
                                    </div>
                                }
                            />
                            <FormItemCheck
                                name="p28_pulley_right_fixed"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>แก้ไขแล้ว =&gt; <span className="font-normal">ตรวจสอบฟองอากาศอีกครั้ง</span></p>
                                        <p className="ml-16 font-normal">=&gt; OK ไม่พบฟองอากาศแล้ว</p>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                </div>

                {/* Signature */}
                <div className="mt-20 flex justify-end pr-10">
                    <FormCheckedBox name="p28_checked_sig" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page28;