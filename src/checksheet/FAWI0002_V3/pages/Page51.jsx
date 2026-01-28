import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import assets
import image53_2 from '@/assets/FAWI0002_V3/image-53-2.JPG';

function Page51() {
    return (
        <A4Paper content={content} currentPage={51}>
            <div className="flex flex-col text-xs relative h-full">
                <SectionTitle className="mt-0">53.2 Annealing Voltage Check</SectionTitle>

                <div className="pl-4 flex flex-col gap-4 relative">
                    <div className="flex flex-col gap-1">
                        <ul className="list-disc pl-10 flex flex-col gap-1 mt-1">
                            <li>
                                <span>Change signal : [ Manage =={">"} Check =={">"} S-TANK (Page 5) ]</span>
                                <p className="mt-1 font-bold underline italic text-blue-700">0762H [#87368] = 01 <span className="font-normal text-black text-[10px]"> : Anneal Relay ON (เปลี่ยน Signal ของ 0762H [#87368] = 01)</span></p>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-bold underline italic">** Change signal and check voltage follow data below.</p>
                        <p className="font-bold">(เปลี่ยน Signal และทำการตรวจสอบค่าแรงดันไฟฟ้า)</p>

                        <div className="pl-10 flex flex-col gap-1">
                            <span className="font-bold underline">MANAGE =={">"} CHECK =={">"} WIRING</span>
                            <div className="flex flex-col gap-0.5 text-gray-700 mt-1">
                                <p>052EH [#87365] = 00 : Voltage Select # 1 (Page 4)</p>
                                <p className="font-bold text-blue-700 underline italic">054CH [#87366] = 01 <span className="font-normal text-black">: Voltage Select # 2 (Page 5)</span></p>
                                <p className="font-bold text-blue-700 underline italic">054EH [#87367] = 01 <span className="font-normal text-black">: Voltage Select # 3 (Page 5)</span></p>
                            </div>
                        </div>

                        {/* Voltage Check 4 */}
                        <div className="mt-2 flex flex-col gap-2 border border-gray-100 p-2 rounded bg-gray-50/30">
                            <FormItemCheck
                                name="p51_check_v4_main"
                                label={<span className="font-bold">Check Voltage (4)</span>}
                            />
                            <div className="ml-10">
                                <FormInputCheckSTD
                                    name="p51_v4_val"
                                    label="[EL-LOW] - [EL-TOP] ="
                                    unit="Volt"
                                    minStd={24.2}
                                    maxStd={24.8}
                                    inputWidth="w-20"
                                />
                                <p className="mt-1 text-[10px] italic text-gray-500">(24.2 ~ 24.8 Volt) ............ (Refer figure 2)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 pl-10">
                            <span className="font-bold">- Change signal [ MANAGE =={">"} CHECK =={">"} S-TANK (Page 5) ]</span>
                            <p className="font-bold underline italic text-blue-700">0762H [#87368] = 00 <span className="font-normal text-black text-[10px]"> : Anneal Relay OFF (เปลี่ยน Signal ของ 0762H [#87368] = 00)</span></p>
                        </div>
                    </div>

                    {/* Diagrams Section */}
                    <div className="pt-4">
                        <p className="font-bold text-center mb-2 underline">Voltage Position Check (ตำแหน่งในการตรวจสอบค่าแรงดันไฟฟ้า)</p>
                        <div className="flex justify-center">
                            <img src={image53_2} alt="Voltage Position Check" className="h-[400px] object-contain" />
                        </div>
                    </div>

                    {/* Signature - Fixed at bottom */}
                    <div className="absolute bottom-0 left-30">
                        <FormCheckedBox name="p51_checked" label="Checked by :" className="w-1/3" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page51;