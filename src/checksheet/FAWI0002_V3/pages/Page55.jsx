import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import image54_41 from '@/assets/FAWI0002_V3/image-54-41.JPG';
import image54_42 from '@/assets/FAWI0002_V3/image-54-42.JPG';

function Page55() {
    return (
        <A4Paper content={content} currentPage={55}>
            <div className="flex flex-col text-[11px] h-full">

                {/* Top Check */}
                <div className="pl-6 flex flex-col gap-2 mt-4">
                    <div className="flex gap-2">
                        <FormItemCheck
                            name="p55_check_wire_center"
                            label="Check position wire center :"
                            className="font-bold min-w-[150px]"
                        />
                        <div className="flex flex-col gap-1">
                            <p>1. AWT II</p>
                            <p>2. Change signal #87338 = 1</p>
                            <p>3. Pipe Terminal was upper limit , Wire Run</p>
                            <p>4. Check Wire Electrode must center of Pipe</p>
                            <p>5. Change signal #87338 = 0</p>
                        </div>
                    </div>
                </div>

                {/* 54.4 Support Roller Rolling Check */}
                <SectionTitle className="mt-4">54.4 Support Roller Rolling Check (Without wire)</SectionTitle>
                <div className="pl-6 flex flex-col gap-2">
                    <FormItemCheck
                        name="p55_roller_smooth"
                        label={<span>Support Roller rolling smoothly. =={'>'} Change signal #87352 =1 and #87353 = 1</span>}
                    />
                    <p className="pl-8">After finish : Change signal #87352 = 0 and #87353 = 0</p>

                    <p className="mt-2 text-bold">- Change signal : MANAGE ➔ CHECK ➔ WIRING</p>

                    <div className="pl-2 flex flex-col gap-2">
                        <FormItemCheck name="p55_sig_0528h_01" label='0528H [#87334] = 01 ==> Support Roller "CLOSE"' />
                        <FormItemCheck name="p55_sig_0510h_01" label='0510H [#87352] = 01 ==> Support Roller Rolling "START"' />
                        <FormItemCheck name="p55_sig_0528h_00" label='0528H [#87334] = 00 ==> Supprot Roller Rolling "OPEN"' />
                        <FormItemCheck name="p55_sig_0510h_00" label='0510H [#87352] = 00 ==> Support Roller "STOP"' />
                    </div>

                    <div className="flex mt-2 gap-4">
                        <div className="w-2/3">
                            <FormItemCheck
                                name="p55_check_channel"
                                label={
                                    <div className="flex flex-col">
                                        <span>Checking the channel between</span>
                                        <span>Crutch Roller and Contact stand</span>
                                        <span>must have the opening and no touch</span>
                                    </div>
                                }
                            />
                        </div>
                        <div className="w-1/3">
                            <img src={image54_41} alt="Roller Channel Check" className="h-[120px] object-contain border border-gray-300 shadow-sm" />
                        </div>
                    </div>
                </div>

                {/* Air Retry Unit Check */}
                <div className="mt-6 flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Air Retry Unit Check</h3>
                    <div className="flex gap-2 items-end">
                        <p>กด Wire thread เพื่อตรวจสอบระบบลมของชุด Retry Unit โดยใช้กระดาษตรวจสอบ ที่ด้านหน้าของ Retry Unit <span className="underline">เมื่อกด Cut ในขณะที่ Retry Unit ตัดลวด ต้องไม่มีลมเป่าออกมาทางด้านหน้า</span> ดังภาพประกอบ</p>
                        <FormItemCheck name="p55_air_retry_check" label="" showCheckbox={true} className="!p-0 mb-1" />
                    </div>

                    <div className="flex justify-center mt-2">
                        <img src={image54_42} alt="Air Retry Unit Check OK/NG" className="max-w-full h-[200px] object-contain" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page55;