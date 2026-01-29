import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';

// Import images for section 20
import img20_1 from '@/assets/FAWI0002_V3/image-20-1.JPG';
import img20_2 from '@/assets/FAWI0002_V3/image-20-2.JPG';
import img20_3 from '@/assets/FAWI0002_V3/image-20-3.JPG';
import img20_4 from '@/assets/FAWI0002_V3/image-20-4.JPG';
import img20_5 from '@/assets/FAWI0002_V3/image-20-5.JPG';
import img20_6 from '@/assets/FAWI0002_V3/image-20-6.JPG';
import img20_7 from '@/assets/FAWI0002_V3/image-20-7.JPG';
import img20_8 from '@/assets/FAWI0002_V3/image-20-8.JPG';
import img20_9 from '@/assets/FAWI0002_V3/image-20-9.JPG';
import img20_10 from '@/assets/FAWI0002_V3/image-20-10.JPG';

function Page20() {
    return (
        <A4Paper content={content} currentPage={20}>
            <div>
                {/* 20. Supply Tank Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle className="text-sm font-bold">20. Supply Tank Check</SectionTitle>

                    <div className="flex justify-between items-start mr-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-10">
                                <div className="flex flex-col items-center gap-1">
                                    <FormItemCheck name="p20_flushing_pump_check" label="Flushing Pump" className="font-bold" />
                                    <img src={img20_1} alt="Flushing Pump" className="h-10 object-contain" />
                                    <FormChecknumber name="p20_flushing_pump_dir" label="ทิศของปั๊ม:" labelClass="text-[11px]" inputClass="w-16 text-sm" />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FormItemCheck name="p20_sending_pump_check" label="Sending Pump" className="font-bold" />
                                    <img src={img20_2} alt="Sending Pump" className="h-10 object-contain" />
                                    <FormChecknumber name="p20_sending_pump_dir" label="ทิศของปั๊ม:" labelClass="text-[11px]" inputClass="w-16 text-sm" />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <FormItemCheck name="p20_circulation_pump_check" label="Circulation Pump" className="font-bold" />
                                    <div className="h-10 flex items-center">
                                        <img src={img20_3} alt="Circulation Pump" className="h-10 object-contain" />
                                    </div>
                                    <FormChecknumber name="p20_circulation_pump_dir" label="ทิศของปั๊ม:" labelClass="text-[11px]" inputClass="w-16 text-sm" />
                                </div>
                            </div>
                            <div className="text-[11px] font-bold mt-1">
                                (เช็คการหมุนของปั๊ม โดยจะต้องหมุนตามทิศทางสติกเกอร์ที่ติดปั๊ม)
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <img src={img20_4} alt="Partition Check" className="h-24 object-contain border border-black shadow-sm" />
                            <FormItemCheck name="p20_partition_check" label={<span className="text-[11px] leading-tight text-center block">ตรวจสอบการประกอบ Partition<br />(ถ้าไม่มีให้แจ้ง SEMI)</span>} />
                        </div>
                    </div>
                </div>

                {/* Switch Pump Check Table/Box */}
                <div className="flex flex-col">
                    <FormItemCheck name="p20_switch_pump_check" label="ตรวจสอบการทำงานของ Switch Pump" className="font-bold" />
                    <div className="flex items-center gap-20 ml-5">
                        <div className="flex items-center gap-4 bg-gray-200 p-2 border border-black">
                            <FormItemCheck name="p20_switch_pump_1" label={<span className="text-sm">1.Off Switch<br />ที่ Supply Tank</span>} />
                            <img src={img20_5} alt="Off Switch" className="h-24 object-contain" />
                        </div>
                        <div className="flex items-center gap-4 bg-gray-200 p-2 border border-black">
                            <FormItemCheck name="p20_switch_pump_2" label={<span className="text-sm">2.ถ้าหาก Circulation<br />Pump หยุดทำงาน =&gt; OK</span>} />
                            <img src={img20_6} alt="Circulation Stop" className="h-24 object-contain" />
                        </div>
                    </div>
                </div>

                {/* Switch Deionizer Check Table/Box */}
                <div className="flex flex-col">
                    <FormItemCheck name="p20_switch_deionizer_check" label="ตรวจสอบการทำงานของ Switch Deionizer" className="font-bold" />
                    <div className="flex items-center gap-10 ml-5">
                        <div className="flex items-center gap-4 bg-gray-200 p-2 border border-black">
                            <FormItemCheck name="p20_switch_deionizer_1" label={<span className="text-sm">1.On Switch<br />Deionizer<br />ที่ Supply Tank</span>} />
                            <img src={img20_7} alt="On Switch" className="h-24 object-contain" />
                        </div>
                        <div className="flex items-center gap-4 bg-teal-50 p-2 border border-black">
                            <img src={img20_8} alt="Hose check" className="h-32 object-contain" />
                            <div className="bg-gray-200 p-2 border border-black">
                                <FormItemCheck name="p20_switch_deionizer_2" label={<span className="text-sm">2.ถ้าหากมีน้ำออก<br />มาจากสาย Hose ที่ลูกศรชี้ =&gt; OK</span>} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Various Property Checks */}
                <div className="flex flex-col ml-10">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <FormItemCheck name="p20_cooling_unit_sn_check" label="Cooling Unit serial number" />
                            <FormChecknumber name="p20_cooling_unit_sn" label="" inputClass="w-60 text-sm" />
                        </div>
                        <div className="text-[11px] ml-6">- Adjust temp control set point - 0 °C, Cooling CKD</div>
                    </div>

                    <div className="flex flex-col">
                        <FormItemCheck name="p20_inverter_check" label="Inverter Check (ตรวจสอบขณะเปิดน้ำขึ้น Process Tank)" />
                        <div className="text-[11px] ml-6 flex flex-col">
                            <span>- Submerge (T94) on inverter Freq. ~ 0 Hz <span className="italic text-gray-600">(Flushing Pump ไม่ทำงาน, Circulation และ Sending Pump ทำงาน)</span></span>
                            <span>(62.56 Hz Option High speed)</span>
                            <span>- เมื่อเปิดน้ำเลี้ยง Sending Pump จะทำงานตัวเดียว</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <FormItemCheck name="p20_water_resistivity_check" label="Water Resistivity Check" />
                        <div className="text-[11px] ml-6 flex flex-col font-arial">
                            <span>- Manage - Parameter - Machine - Page 1</span>
                            <span className="ml-4 font-bold">MAX Resistivity 1 (OHM) = 52000 and MIN Resistivity 1 (OHM) = 50000</span>
                            <span>- Manage - Parameter - Machine - Page 3 : Resistivity Adjustment = 1</span>
                            <span>- Manage - Parameter - Machine - Page 8 : Hi Limit Resistivity1 = 5000</span>
                            <span>- If LCD show data resistivity low =&gt; change Deionizer (ถ้าค่าResisที่หน้าจอต่ำให้เปลี่ยนเรซิน)</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <FormItemCheck name="p20_air_pressure_check" label="Air pressure set point check" />
                        <div className="text-[11px] ml-6 flex flex-col">
                            <span>- Air Pressure Regulator set = 0.5 MPa</span>
                            <span>- Air Pressure Switch set = 0.35 MPa</span>
                            <span>- Confirm that when set Air Pressure Regulator &le; 0.35MPa,</span>
                            <span>move Z up-down =&gt; HALT STOP</span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="relative flex items-center justify-between">
                            <div className="flex flex-col">
                                <FormItemCheck name="p20_filter_pressure_check" label="Filter Pressure on Supply Tank Check" />
                                <div className="text-[11px] ml-6 flex flex-col">
                                    <span>- ปิดวาล์วที่ด้านข้าง Filter Box (Close the Valve at Filter Box)</span>
                                    <span>Power on show LCD :</span>
                                    <div className="flex items-center">
                                        <span>Filter Pressure =</span>
                                        <FormInputCheckSTD name="p20_filter_pressure_value" maxStd={0.2} inputWidth="w-20" unit="Mpa" />
                                        <span className="font-bold">(STD &le; 0.2 Mpa)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-[10px] top-[-160px]">
                                <img src={img20_9} alt="Valve check" className="h-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page20;