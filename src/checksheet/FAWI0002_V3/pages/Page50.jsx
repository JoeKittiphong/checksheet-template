import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

function Page50() {
    return (
        <A4Paper content={content} currentPage={50}>
            <div className="flex flex-col text-xs relative h-full">
                <SectionTitle className="mt-0">53. Annealing & Heat Cutting Voltage Check</SectionTitle>

                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold">53.1 Heat Cutting Voltage Check</span>
                        <ul className="list-disc pl-10 flex flex-col gap-1 mt-1">
                            <li>Cutting wire [AWT I] (ทำการตัดลวด)</li>
                            <li>
                                <span>Change signal : [ MANAGE =={">"} CHECK =={">"} S-TANK (Page 5) ]</span>
                                <p className="mt-1 font-bold underline italic text-blue-700">0764H [#87364] = 01 <span className="font-normal text-black text-[10px]">Heat Cut Relay ON (เปลี่ยน Signal ของ 0764H [#87364] = 01)</span></p>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-bold underline italic">** Change signal and check voltage follow data below.</p>
                        <p className="font-bold">(เปลี่ยน Signal ของ Relay และทำการตรวจสอบค่าแรงดันตามขั้นตอนต่อไปนี้)</p>

                        <div className="pl-10 flex flex-col gap-1">
                            <span className="font-bold underline">MANAGE =={">"} CHECK =={">"} WIRING (Page 4)</span>
                            <div className="flex flex-col gap-0.5 text-gray-700">
                                <p>052EH [#87365] = 00 : Voltage Select # 1</p>
                                <p>054CH [#87366] = 00 : Voltage Select # 2</p>
                                <p>054EH [#87367] = 00 : Voltage Select # 3</p>
                            </div>
                        </div>

                        {/* Voltage Check 1 */}
                        <div className="mt-2 flex flex-col gap-2 border border-gray-100 p-2 rounded bg-gray-50/30">
                            <FormItemCheck
                                name="p50_check_v1_main"
                                label={<span className="font-bold">Check Voltage (1)</span>}
                            />
                            <div className="ml-10">
                                <FormInputCheckSTD
                                    name="p50_v1_val"
                                    label="[EL-MID] - [EL-LOW] ="
                                    unit="Volt"
                                    minStd={5.4}
                                    maxStd={5.8}
                                    inputWidth="w-20"
                                />
                                <p className="mt-1 text-[10px] italic text-gray-500">(5.4 ~ 5.8 Volt).......... (Refer figure 1 of next page)</p>

                                <div className="mt-2 flex flex-col gap-1">
                                    <span className="font-bold text-red-600">=={">"} Change Signal [054EH [#87367] = 01]</span>
                                    <div className="pl-4 text-[10px] text-gray-600">
                                        <p>052EH [#87365] = 00 : Voltage Select # 1</p>
                                        <p>054CH [#87366] = 00 : Voltage Select # 2</p>
                                        <p className="font-bold text-blue-700 underline italic">054EH [#87367] = 01 <span className="font-normal text-black">: Voltage Select # 3</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Voltage Check 2 */}
                        <div className="mt-1 flex flex-col gap-2 border border-blue-50/50 p-2 rounded bg-blue-50/20">
                            <FormItemCheck
                                name="p50_check_v2_main"
                                label={<span className="font-bold">Check Voltage (2)</span>}
                            />
                            <div className="ml-10">
                                <FormInputCheckSTD
                                    name="p50_v2_val"
                                    label="[EL-MID] - [EL-LOW] ="
                                    unit="Volt"
                                    minStd={12.4}
                                    maxStd={12.8}
                                    inputWidth="w-20"
                                />
                                <p className="mt-1 text-[10px] italic text-gray-500">(12.4 ~ 12.8 Volt)........ (Refer figure 1 of next page)</p>

                                <div className="mt-2 flex flex-col gap-1">
                                    <span className="font-bold text-red-600">=={">"} Change Signal [054CH [#87366] = 01]</span>
                                    <div className="pl-4 text-[10px] text-gray-600">
                                        <p>052EH [#87365] = 00 : Voltage Select # 1</p>
                                        <p className="font-bold text-blue-700 underline italic">054CH [#87366] = 01 <span className="font-normal text-black">: Voltage Select # 2</span></p>
                                        <p className="font-bold text-blue-700 underline italic">054EH [#87367] = 01 <span className="font-normal text-black">: Voltage Select # 3</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Voltage Check 3 */}
                        <div className="mt-1 flex flex-col gap-2 border border-red-50/50 p-2 rounded bg-red-50/10">
                            <FormItemCheck
                                name="p50_check_v3_main"
                                label={<span className="font-bold">Check Voltage (3)</span>}
                            />
                            <div className="ml-10">
                                <FormInputCheckSTD
                                    name="p50_v3_val"
                                    label="[EL-MID] - [EL-LOW] ="
                                    unit="Volt"
                                    minStd={24.2}
                                    maxStd={24.8}
                                    inputWidth="w-20"
                                />
                                <p className="mt-1 text-[10px] italic text-gray-500">(24.2 ~ 24.8 Volt)........ (Refer figure 1 of next page)</p>
                            </div>
                        </div>
                    </div>

                    {/* Final Step */}
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex flex-col gap-1 pl-10">
                            <span className="font-bold">- Change signal [ MANAGE =={">"} CHECK =={">"} S-TANK (Page 5) ]</span>
                            <p className="font-bold underline italic text-blue-700">0764H [#87364] = 00 <span className="font-normal text-black text-[10px]"> : Heat Cut Relay OFF (เปลี่ยน Signal ของ 0764H [#87364] = 00)</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page50;