import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

import imgAcrylicNG from '@/assets/FAWI0002_V3/image-29-25.JPG';
import imgAcrylicGood from '@/assets/FAWI0002_V3/image-29-26.JPG';

function Page29() {
    return (
        <A4Paper content={content} currentPage={29}>
            <div className="p-2">
                <h3 className="text-lg font-bold underline">ที่ Acrylic Pipe</h3>

                <div className="mt-8 flex flex-col gap-12">

                    {/* NG Row */}
                    <div className="flex items-center gap-6">
                        <div className="">
                            <img src={imgAcrylicNG} alt="NG - Bubble in Acrylic Pipe" className="h-57" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <FormItemCheck
                                name="p29_acrylic_ng"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>NG =&gt; <span className="font-normal">มีฟองอากาศออกมา</span></p>
                                        <p className="ml-8 font-normal">=&gt; แจ้ง Leader Up เพื่อติดต่อกลุ่มงานที่เกี่ยวข้องมาแก้ไข</p>
                                    </div>
                                }
                            />
                            <FormItemCheck
                                name="p29_acrylic_fixed"
                                label={
                                    <div className="text-sm font-bold">
                                        <p>แก้ไขแล้ว =&gt; <span className="font-normal">ตรวจสอบฟองอากาศอีกครั้ง</span></p>
                                        <p className="ml-16 font-normal">=&gt; OK ไม่พบฟองอากาศแล้ว</p>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* Good Row */}
                    <div className="flex items-center gap-6">
                        <div className="">
                            <img src={imgAcrylicGood} alt="Good - No Bubble in Acrylic Pipe" className="h-50" />
                        </div>
                        <div className="flex flex-col">
                            <FormItemCheck
                                name="p29_acrylic_ok"
                                label={<span className="text-sm font-bold">OK=&gt; <span className="font-normal">ไม่พบฟองอากาศ</span></span>}
                            />
                        </div>
                    </div>

                </div>

                {/* Signature */}
                <div className="mt-24 flex justify-end pr-10">
                    <FormCheckedBox name="p29_checked_sig" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page29;