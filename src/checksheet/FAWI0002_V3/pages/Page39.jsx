import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import assets
import image43 from '@/assets/FAWI0002_V3/image-43.JPG';

function Page39() {
    return (
        <A4Paper content={content} currentPage={39}>
            <div className="flex flex-col gap-4">
                {/* Section 42 */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>42. Wire Eject Speed Check</SectionTitle>
                    <div className="flex flex-col gap-1 ml-4">
                        <FormItemCheck
                            name="p39_42_1_check"
                            label={<span className="text-sm">Parameter No.10 1st acceleration time = 2.00, No.12 1st deceleration = 1.5</span>}
                        />
                        <div className="ml-7 text-sm">
                            and No.15 deceleration mode = S-2, Brushless Amplifier for Wire Eject motor.
                        </div>

                        <FormItemCheck
                            name="p39_42_2_check"
                            label={<span className="text-sm">Tension Roller check : Confirm that when Power On , zero adjustment is performed</span>}
                            className="mt-1"
                        />

                        <FormItemCheck
                            name="p39_42_3_check"
                            label={<span className="text-sm">Wire Eject Speed Check (Wire set)</span>}
                            className="mt-1"
                        />

                        <FormItemCheck
                            name="p39_42_4_check"
                            label={<span className="text-sm">Wire Run : set WK = 20 or 25, WT = 50, WS = 100,Check Servo Driver show 159 rpm</span>}
                            className="mt-1"
                        />
                        <div className="ml-7 text-sm">(Adjust at WS1 in WIO PCB)</div>

                        <FormItemCheck
                            name="p39_42_5_check"
                            label={<div className="text-sm">Change WS = 30 : Confirm that Servo Driver show 48 <span className="underline font-bold">+</span> 5 rpm</div>}
                            className="mt-1"
                        />

                        <FormItemCheck
                            name="p39_42_6_check"
                            label={<span className="text-sm">Change WT = 120,WS = 100 Check Servo Driver show 155~165 rpm</span>}
                            className="mt-1"
                        />

                        <FormItemCheck
                            name="p39_42_7_check"
                            label={<span className="text-sm">Screw lock at sheet metal cover of WIO board finish.</span>}
                            className="mt-1"
                        />

                        <FormItemCheck
                            name="p39_42_8_check"
                            label={<span className="text-sm">Confirm color mark "white" at screw lock sheet metal cover.</span>}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Section 43 */}
                <div className="flex flex-col gap-2 relative">
                    <SectionTitle>43. CN-7 Check (ตรวจสอบสาย CN-7 ภายในตู้ MS Controller)</SectionTitle>

                    <div className="flex justify-between items-start gap-2 mt-2 relative">
                        {/* Image Left */}
                        <div className="flex-1">
                            <img src={image43} alt="CN-7 Check" className="w-full object-contain max-h-[400px]" />
                        </div>

                        {/* Options Right */}
                        <div className="flex flex-col gap-4 w-[250px] absolute top-0 right-0">
                            {/* Option 1 */}
                            <div className='absolute top-3 right-43'>
                                <FormItemCheck
                                    name="p39_43_1_check"
                                />
                            </div>

                            {/* Option 2 */}
                            <div className='absolute top-55 right-44'>
                                <FormItemCheck
                                    name="p39_43_2_check"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-red-500 font-bold text-sm">
                            หมายเหตุ : ถ้าหากตรวจสอบตามข้อ 1,2 แล้วพบว่าไม่มีสาย CN-7 ให้แจ้ง EL เข้ามาดูปัญหา
                        </p>
                        <p className="text-red-500 font-bold text-sm">
                            พร้อม Record ปัญหาที่เกิดขึ้นลงในใบ <span className="underline">Ass'y Problem</span> และ <span className="underline">Problem Report</span> รอไว้เลย
                        </p>
                    </div>

                    <div className="flex justify-end mt-4 pr-10 absolute bottom-120 right-0">
                        <FormCheckedBox name="p39_checked_by" label="Checked by :" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page39;