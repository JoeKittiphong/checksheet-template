import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import image54_5 from '@/assets/FAWI0002_V3/image-54-5.JPG';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page56() {
    return (
        <A4Paper content={content} currentPage={56}>
            <div className="flex flex-col text-[11px] h-full">

                {/* 54.5 Position Check Between Wire & Support Roller */}
                <SectionTitle className="mt-0">54.5 Position Check Between Wire & Support Roller</SectionTitle>

                <div className="flex justify-center my-2">
                    <img src={image54_5} alt="Position Check Diagram" className="max-w-full h-[220px] object-contain" />
                </div>

                <div className="pl-4 flex flex-col gap-1">
                    <div className="flex gap-2">
                        <span className="font-bold underline text-xs">Fig = A</span>
                        <div className="flex flex-col gap-1 text-[11px]">
                            <p>Thread Wire and Wire Run "ON" (ร้อยลวด และเปิด Wire Run และ <span className="font-bold">กำหนดให้ปรับค่า WT120 WS30</span> )</p>
                            <p>ตรวจสอบระยะของลวดระหว่าง Free Roller กับ Crutch Roller ถ้าไม่อยู่ใน Center ให้ปรับ Support Roller Unit</p>
                            <p>ไปทางด้านขวาโดยคลาย Screw CS M4 x 12 ทั้ง 3 ตำแหน่ง เพื่อขยับให้ตำแหน่งของลวดอยู่ตรงกลางระหว่าง</p>
                            <div className="flex items-center gap-2">
                                <span>Free Roller กับ Crutch Roller <span className="font-bold text-xs underline">[Fig = A]</span></span>
                                <FormItemCheck name="p56_check_screw" label="ตรวจสอบการประกอบ Screw CS M 4 x 12 = 3 Pcs." showCheckbox={true} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-4 mt-2">
                    <span className="font-bold underline text-xs">Fig = B</span>
                    <span className="ml-2 font-bold text-xs">ตรวจสอบค่าโอห์มจะต้องไม่มีกระแสไฟเมื่อตรวจสอบตำแหน่งดังภาพ [Fig = B]</span>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 ml-8">
                        <FormItemCheck name="p56_ohm_a1" label="A - 1 (SUS Roller - Guide Pipe Upper)" showCheckbox={true} />
                        <FormItemCheck name="p56_ohm_12" label='1 - 2 (Pipe Guide "Upper" - Crutch Roller)' showCheckbox={true} />

                        <FormItemCheck name="p56_ohm_a2" label="A - 2 (SUS Roller - Crutch Roller)" showCheckbox={true} />
                        <FormItemCheck name="p56_ohm_23" label='2 - 3 (Pipe Guide "Lower" - Crutch Roller)' showCheckbox={true} />

                        <FormItemCheck name="p56_ohm_a3" label="A - 3 (SUS Roller - Guide Pipe Lower)" showCheckbox={true} />
                        <div className="flex items-center gap-2">
                            <span className="font-bold">STD = ∞Ω</span>
                        </div>
                    </div>
                </div>

                {/* 55. RETRY UNIT CHECK */}
                <div className="flex justify-between items-end mt-4 pr-4 relative">
                    <SectionTitle className="w-1/2">55. RETRY UNIT CHECK</SectionTitle>
                    <div className="absolute top-[-30px] right-10">
                        <FormCheckedBox name="p56_checked_by" label="Checked by :" />
                    </div>
                </div>

                <div className="pl-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <FormItemCheck name="p56_sensor_check" label="55.1 Sensor Check" showCheckbox={true} className="font-bold" />
                    </div>

                    <div className="pl-6 flex flex-col gap-2">
                        <p>- Change signal : [MANAGE ➔ CHECK ➔ WIRING]</p>
                        <p className="pl-8 underline font-bold">050CH [#87335] DISPOSAL ARM FWD = 0001 <span className="font-normal no-underline">: Retry Nozzle GO (M33)</span></p>
                        <div className="pl-8">
                            <FormItemCheck name="p56_check_led_on" label='Check signal of 0442H-6 [#87064] DISPOSAL ARM FWD = 0001 , LED = "ON"' showCheckbox={true} />
                        </div>

                        <p>- Change signal : [MANAGE ➔ CHECK ➔ WIRING]</p>
                        <p className="pl-8 underline font-bold">050CH [#87335] DISPOSAL ARM FWD = 0000 <span className="font-normal no-underline">: Retry Nozzle BACK (M43)</span></p>
                        <div className="pl-8">
                            <FormItemCheck name="p56_check_led_off" label='Check signal of 0442H-6 [#87064] DISPOSAL ARM FWD = 0000 , LED = "OFF"' showCheckbox={true} />
                        </div>

                        <p>- Change signal : [MANAGE ➔ CHECK ➔ WIRING]</p>
                        <p className="pl-8">- Move Terminal Body down.</p>
                        <p className="pl-8">- Change signal <span className="underline font-bold">0512 [#87400] = 0000</span> =={'>'} LED of LIMIT DOWN "OFF"</p>
                        <p className="pl-8">- Change signal <span className="underline font-bold">0512 [#87400] = 0001</span> =={'>'} LED of LIMIT DOWN "ON"</p>
                    </div>

                    <p className="mt-2 text-[10px] text-gray-600">Remark : If signal of DISPOSAL ARM FWD 0442H-6 [#87064] is not OK, please adjust sensor position.</p>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page56;