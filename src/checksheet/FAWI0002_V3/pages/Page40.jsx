import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import assets
import image45_4 from '@/assets/FAWI0002_V3/image-45-4.JPG';

function Page40() {
    return (
        <A4Paper content={content} currentPage={40}>
            <div className="flex flex-col gap-8 p-2">
                {/* 44. Slow Down Check */}
                <div className="flex flex-col gap-4">
                    <SectionTitle>44. Slow Down Check</SectionTitle>
                    <div className="pl-4 flex flex-col gap-2">
                        <FormItemCheck
                            name="p40_44_slow_down_check"
                            label={<span className="text-[14px]">Wire Stop : Tension Roller หมุน 180° <span className="underline">+</span> 20 mm</span>}
                        />
                        <div className="pl-8 text-[13px] flex flex-col gap-1">
                            <p>NG --&gt; Adjust parameter No.12 [1st deceleration]</p>
                            <p>OK --&gt; Finish</p>
                        </div>
                        <div className="flex justify-end mt-2">
                            <FormCheckedBox
                                name="p40_44_checked"
                                label="Checked by :"
                                className="w-1/2"
                            />
                        </div>
                    </div>
                </div>

                {/* 45. Wire Eject Check */}
                <div className="flex flex-col gap-4">
                    <SectionTitle>45. Wire Eject Check</SectionTitle>
                    <div className="pl-4 flex flex-col gap-3">
                        <FormItemCheck
                            name="p40_45_1_speed_check"
                            label={<span className="text-[14px]">45.1 Speed Check  WS:10 =&gt; 50 =&gt; 100 =&gt; 150 =&gt; 200 = (150)</span>}
                        />
                        <FormItemCheck
                            name="p40_45_2_fill_off"
                            label={<span className="text-[14px]">45.2 Fill off ,Drain open and open wire run. ( ตรวจสอบลวดในขณะไม่มีน้ำและเปิดwire run )</span>}
                        />
                        <FormItemCheck
                            name="p40_45_3_wire_center"
                            label={<span className="text-[14px]">45.3 Wire is center of the suction pipe. ( ลวดอยู่กึ่งกลางของ Pipe )</span>}
                        />
                        <FormItemCheck
                            name="p40_45_4_screw_check"
                            label={<span className="text-[14px]">45.4 Check screw after set pipe and mark color. ( เช็คสกรูทุกตัวหลังจาก Set Pipe และ Mark สี)</span>}
                        />

                        {/* Image section */}
                        <div className="flex justify-center my-4">
                            <img
                                src={image45_4}
                                alt="Wire Eject Check"
                                className="h-40"
                            />
                        </div>

                        <div className="flex justify-end mt-2">
                            <FormCheckedBox
                                name="p40_45_checked"
                                label="Checked by :"
                                className="w-1/2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page40;