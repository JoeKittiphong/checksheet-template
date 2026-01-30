import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import image55_1 from '@/assets/FAWI0002_V3/image-55-1.JPG';
import image55_2 from '@/assets/FAWI0002_V3/image-55-2.JPG';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page57() {
    return (
        <A4Paper content={content} currentPage={57}>
            <div className="flex flex-col text-[11px] h-full">

                {/* Brush Section */}
                <div className="flex gap-4">
                    <div className="w-1/3 p-2">
                        <SectionTitle className="mt-0 w-max px-2">Brush</SectionTitle>
                        <img src={image55_1} alt="Brush Check Diagram" className="max-w-full h-auto object-contain border border-gray-200" />
                    </div>
                    <div className="w-2/3 flex flex-col justify-center gap-2 mt-8">
                        <FormItemCheck name="p57_brush_contact_a" label="Contact  with Ceramic Roller A" showCheckbox={true} />
                        <FormItemCheck name="p57_brush_contact_b" label="Contact  with Ceramic Roller B" showCheckbox={true} />
                        <FormItemCheck name="p57_brush_screw" label="Confirm Check screw CS M3x6 + Spring D3 + Washer D3 = 2 Pcs" showCheckbox={true} />
                    </div>
                </div>

                {/* During AWT II */}
                <div className="flex gap-4 mt-2">
                    <div className="w-2/3">
                        <SectionTitle className="mt-0 w-max px-2">During AWT II</SectionTitle>
                        <div className="flex flex-col gap-2 mt-2">
                            {[
                                { id: 1, label: "Contact wire with WCK1(Upper) Pop up search works.", name: "p57_awt2_1" },
                                { id: 2, label: "Contact wire with WCK1(Lower) Pop up search works.", name: "p57_awt2_2" },
                                { id: 3, label: "Pipe stay at lower end.", name: "p57_awt2_3" },
                                { id: 4, label: "LED check (Pipe up-down cylinder)", name: "p57_awt2_4" }
                            ].map((item) => (
                                <div key={item.id} className="flex justify-between items-center pr-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs shrink-0">{item.id}</div>
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <FormItemCheck name={`${item.name}_yes`} label="Yes" showCheckbox={true} className="!p-0" />
                                        <FormItemCheck name={`${item.name}_no`} label="No" showCheckbox={true} className="!p-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/3 flex justify-center">
                        <img src={image55_2} alt="AWT II Diagram" className="max-w-full h-[180px] object-contain" />
                    </div>
                </div>

                {/* Running Section */}
                <div className="mt-2">
                    <SectionTitle className="mt-0 w-max px-2">Running</SectionTitle>
                    <div className="pl-4 flex flex-col gap-2 mt-2">

                        <div className="flex justify-between items-center pr-20">
                            <span>-AWT I,AWT II [In the Air with Z=50/100/150/200 max limit each 10 times AWT I,AWT II {'{'}100% is OK,if not is NG{'}'}]</span>
                            <div className="flex gap-4">
                                <FormItemCheck name="p57_run_air_ok" label="OK" showCheckbox={true} className="!p-0" />
                                <FormItemCheck name="p57_run_air_ng" label="NG" showCheckbox={true} className="!p-0" />
                            </div>
                        </div>

                        <div className="flex justify-between items-start pr-20">
                            <div className="flex flex-col">
                                <span>-AWT I,AWT II [In the Water 20 times]</span>
                                <div className="pl-6 text-[10px] mt-1 flex flex-col gap-1 relative">
                                    <div className="absolute left-3 top-[-2px] bottom-[-2px] w-2 border-l border-t border-b border-black rounded-l-md"></div>
                                    <div className="absolute right-[-140px] top-1/2 -translate-y-1/2">
                                        {'}'} 80% or more is OK,if not is NG
                                    </div>
                                    <p>Ø0.20/0.25/0.30 =={'>'}Z=100</p>
                                    <p>Ø0.15 =={'>'}Z=70</p>
                                    <p>Ø0.10 =={'>'}Z=10</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <FormItemCheck name="p57_run_water_ok" label="OK" showCheckbox={true} className="!p-0" />
                                <FormItemCheck name="p57_run_water_ng" label="NG" showCheckbox={true} className="!p-0" />
                            </div>
                        </div>

                        <div className="items-center pr-20 mt-2 flex justify-between">
                            <span>-AWT II, Fill On</span>
                            <FormItemCheck name="p57_run_fill_on_ok" label="OK" showCheckbox={true} className="!p-0" />
                        </div>

                        <div className="items-center pr-20 flex justify-between">
                            <span>-"Wire Romove Retry" change from "1" ➔"10"</span>
                            <FormItemCheck name="p57_run_retry_change_ok" label="OK" showCheckbox={true} className="!p-0" />
                        </div>
                        <p className="text-[10px] pl-2">[ Before check . [MANAGE] ➔ [PARAMETER] ➔ [MACHINE(1/4 page,left side)] ]</p>

                        <div className="flex justify-between items-start pr-20">
                            <div className="flex flex-col gap-1">
                                <p>-Input NC Program : &nbsp;&nbsp; C777;</p>
                                <p className="pl-[105px]">G29;</p>
                                <p className="pl-[105px]">G01X5.;</p>
                                <p className="pl-[105px]">M02;</p>
                            </div>
                            <FormItemCheck name="p57_run_nc_ok" label="OK" showCheckbox={true} className="!p-0" />
                        </div>

                        <div className="flex w-140 justify-between items-center pr-20 mt-1">
                            <span>-เมื่อโปรแกรม Run ไปแล้ว ให้ใช้คีมตัด ตัดลวดระหว่าง Upper Guide และ Lower Guide ให้ขาด</span>
                            <FormItemCheck name="p57_run_cut_wire_ok" label="OK" showCheckbox={true} className="!p-0" />
                        </div>

                        <div className="flex w-140 justify-between items-center pr-20">
                            <span>-ตรวจสอบว่าลวดมีการดึงกลับหรือไม่ หลังจากใช้คีมตัดตัดลวด</span>
                            <div className="flex gap-4">
                                <FormItemCheck name="p57_run_pull_back_ok" label="OK" showCheckbox={true} className="!p-0" />
                                <FormItemCheck name="p57_run_pull_back_ng" label="NG" showCheckbox={true} className="!p-0" />
                            </div>
                        </div>

                        <div className="flex w-140 justify-between items-center pr-20">
                            <span>-Retry motion (10 times)</span>
                            <div className="flex gap-4">
                                <FormItemCheck name="p57_run_retry_motion_ok" label="OK" showCheckbox={true} className="!p-0" />
                                <FormItemCheck name="p57_run_retry_motion_ng" label="NG" showCheckbox={true} className="!p-0" />
                            </div>
                        </div>

                        <div className="flex w-122 justify-between items-center pr-20">
                            <span>-After checked,Set "Wire Romove Retry" back to "1"</span>
                            <div className="flex items-center gap-1">
                                <FormItemCheck name="p57_run_set_back_ok" label="OK" showCheckbox={true} className="!p-0" />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end mt-4 mr-10 relative">
                        <div className="absolute bottom-0 right-0">
                            <FormCheckedBox name="p57_checked_by" label="Checked by :" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page57;