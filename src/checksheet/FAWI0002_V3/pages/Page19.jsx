import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images for section 18.4
import img18_41 from '@/assets/FAWI0002_V3/image-18-41.JPG';
import img18_42 from '@/assets/FAWI0002_V3/image-18-42.JPG';
import img18_43 from '@/assets/FAWI0002_V3/image-18-43.JPG';
import img18_44 from '@/assets/FAWI0002_V3/image-18-44.JPG';
import img18_45 from '@/assets/FAWI0002_V3/image-18-45.JPG';

function Page19() {
    const imgsize = 25
    return (
        <A4Paper content={content} currentPage={19}>
            <div className="flex flex-col text-[13px]">
                {/* 18.4 Position of Limit Switch Check */}
                <div className="flex flex-col">
                    <div className="ml-5 font-arial text-sm font-bold mb-2">18.4 Position of Limit Switch Check (ตรวจสอบตำแหน่งของ Limit Switch)</div>

                    <div className="ml-5 flex flex-col gap-4">
                        {/* Down Limit */}
                        <div className="flex flex-col gap-1">
                            <div className="font-bold underline">Down Limit</div>
                            <div className="flex items-center gap-4">
                                <img src={img18_41} alt="Down Limit" className={`h-${imgsize} object-contain`} />
                                <FormItemCheck name="p19_down_limit_ok" label="ตำแหน่งตรงตามภาพ OK" />
                                <div className="flex justify-end pr-10">
                                    <FormCheckedBox name="p19_limit_switch_checked_by" label="Checked by :" />
                                </div>
                            </div>

                        </div>

                        {/* Up Limit */}
                        <div className="flex flex-col gap-1">
                            <div className="font-bold underline">Up Limit</div>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <img src={img18_42} alt="Up Limit" className={`h-${imgsize} object-contain`} />
                                    <FormItemCheck name="p19_up_limit_ok" label="ตำแหน่งตรงตามภาพ OK" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={img18_43} alt="Up Limit Gap" className={`h-${imgsize} object-contain`} />
                                    <FormInputCheckSTD
                                        name="p19_up_limit_gap"
                                        label="Gap ="
                                        unit="mm"
                                        minStd={1.5}
                                        maxStd={2.0}
                                        inputWidth="w-16"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Middle Limit */}
                        <div className="flex flex-col gap-1">
                            <div className="font-bold underline">Middle Limit</div>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-4">
                                    <img src={img18_44} alt="Middle Limit" className="h-24 object-contain" />
                                    <FormItemCheck name="p19_mid_limit_ok" label="ตำแหน่งตรงตามภาพ OK" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={img18_45} alt="Middle Limit Gap" className="h-24 object-contain" />
                                    <FormInputCheckSTD
                                        name="p19_mid_limit_gap"
                                        label="Gap ="
                                        unit="mm"
                                        minStd={1.5}
                                        maxStd={2.0}
                                        inputWidth="w-16"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* 19. Drain Shutter Position check */}
                <div className="flex flex-col mt-4">
                    <SectionTitle className="text-sm font-bold">19. Drain Shutter Position check</SectionTitle>

                    <div className="ml-10 mt-2 flex flex-col gap-4">
                        {/* 19.1 AL Model G */}
                        <div className="flex flex-col gap-2">
                            <FormItemCheck name="p19_drain_19_1" label={<span className="font-bold">19.1 Drain Shutter Position check ( สำหรับ <span className="underline">AL Model G</span> )</span>} />

                            <div className="ml-8 flex flex-col gap-1">
                                <div className="flex items-center gap-10">
                                    <FormItemCheck name="p19_drain_close_g" label="Drain close (sub panel sw. & T82)" />
                                    <FormItemCheck name="p19_drain_open_g" label="Drain open (sub panel sw. & T83)" />
                                </div>
                                <FormItemCheck name="p19_speed_upper_g" label={<span>เปิด speed controller <span className="font-bold underline">ตัวบน ประมาณสองรอบครึ่ง</span> ทั้งฝั่งซ้ายและฝั่งขวา (Mark สีขาวหลังปรับ)</span>} />
                                <FormItemCheck name="p19_speed_lower_g" label={<span>เปิด speed controller <span className="font-bold underline">ตัวล่าง ประมาณสองรอบ</span> ทั้งฝั่งซ้ายและฝั่งขวา (Mark สีขาวหลังปรับ)</span>} />
                                <FormItemCheck name="p19_running_check_g" label="Running แล้วดูว่า Drain shutter ฝั่งซ้ายและฝั่งขวาทำงานปกติ" />
                                <FormItemCheck name="p19_power_off_drain_open_g" label="Power off is drain open" />
                            </div>
                        </div>

                        {/* 19.2 Q-Type Model */}
                        <div className="flex flex-col gap-2">
                            <FormItemCheck name="p19_drain_19_2" label={<span className="font-bold">19.2 Drain Shutter Position check ( สำหรับ <span className="underline">Q-Type Model</span> )</span>} />

                            <div className="ml-8 flex flex-col gap-1">
                                <div className="flex items-center gap-10">
                                    <FormItemCheck name="p19_drain_close_q" label="Drain close (sub panel sw. & T82)" />
                                    <FormItemCheck name="p19_drain_open_q" label="Drain open (sub panel sw. & T83)" />
                                </div>
                                <FormItemCheck name="p19_speed_upper_q" label={<span>เปิด speed controller ที่ <span className="font-bold underline">11AFC ประมาณสามรอบ</span> (Mark สีขาวหลังปรับ) [11AFC = ปิดลง]</span>} />
                                <FormItemCheck name="p19_speed_lower_q" label={<span>เปิด speed controller ที่ <span className="font-bold underline">10AFC ประมาณสองรอบ</span> (Mark สีขาวหลังปรับ) [10AFC = เปิดขึ้น]</span>} />
                                <FormItemCheck name="p19_running_check_q" label="Running แล้วดูว่า Drain shutter ฝั่งขวาตัวบนและตัวล่างทำงานปกติ" />
                                <FormItemCheck name="p19_power_off_drain_open_q" label="Power off is drain open" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page19;