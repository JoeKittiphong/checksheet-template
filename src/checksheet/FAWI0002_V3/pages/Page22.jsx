import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormDateInput from '@/components/FormComponents/FormDateInput';

// Import images for section 22
import imgFloatPos from '@/assets/FAWI0002_V3/image-20-14.JPG';
import imgAlarm from '@/assets/FAWI0002_V3/image-20-15.JPG';

function Page22() {
    return (
        <A4Paper content={content} currentPage={22}>
            <div className="flex flex-col text-[13px] p-4 gap-2">
                {/* Float on Supply Tank Check */}
                <div className="flex flex-col gap-2">
                    <FormItemCheck name="p22_float_check_main" label="Float on Supply Tank Check ตรวจสอบการทำงานของ Float ที่ Supply Tank" className="font-bold" />

                    <div className="ml-6 flex flex-col gap-2">
                        <div className="italic text-[12px]">-Check Data on machine : ตรวจสอบค่า Data ของ Machine (ต้องทำก่อนการ Check Float)</div>

                        <FormQuickTable
                            className="w-[650px] font-arial"
                            headerRows={[
                                [
                                    { header: 'Data', width: '320px' },
                                    { header: 'Value', width: '100px' },
                                    { header: 'Address' }
                                ]
                            ]}
                            columns={[
                                {
                                    key: 'data', align: 'left',
                                    render: (v, r) => <FormItemCheck name={r.name} label={v} />
                                },
                                { key: 'value', align: 'center' },
                                { key: 'address', align: 'center', rowGroup: true }
                            ]}
                            data={[
                                { name: 'p22_data_clean_tank_low', data: 'CLEAN TANK LOW LEVEL', value: '0', address: 'Manage-Parameter-Flag-P.2/4' },
                                { name: 'p22_data_spump_low', data: 'S.PUMP LQD LOW LEVEL', value: '3', address: 'Manage-Parameter-Flag-P.2/4' },
                                { name: 'p22_data_cpump_low', data: 'C.PUMP LQD LOW LEVEL', value: '3', address: 'Manage-Parameter-Flag-P.2/4' },
                                { name: 'p22_time_clean_tank_low', data: 'CLN TNK LOW LEVEL TIME', value: '0', address: 'Manage-Parameter-Machine-P.9/12' },
                                { name: 'p22_time_spump_low', data: 'S.PUMP LQD L-LVL TIME', value: '3', address: 'Manage-Parameter-Machine-P.9/12' },
                                { name: 'p22_time_cpump_low', data: 'C.PUMP LQD L-LVL TIME', value: '3', address: 'Manage-Parameter-Machine-P.9/12' }
                            ]}
                        />

                        <div className="italic text-[12px] mt-2">-Check Float : ตรวจสอบการทำงานของ Float ทั้ง 2 ตำแหน่งตามตำแหน่งที่ลูกศรสีแดงชี้</div>

                        <div className="flex justify-center gap-10 mt-1">
                            <img src={imgFloatPos} alt="Float Positions" className="h-60" />

                        </div>

                        <FormItemCheck name="p22_float_op_ok" label="ใช้มือกด Float ลงค้างไว้ 3 วินาที จนกว่าหน้าจอ CNT Show Alarm แสดงว่า Float ทำงาน OK" className="font-bold" />
                        <div className="mt-2 flex justify-center">
                            <img src={imgAlarm} alt="Alarm Screen" className="h-30" />
                        </div>
                    </div>
                </div>

                {/* 21. Filter Box Check */}
                <div className="flex flex-col mt-4 relative">
                    <div className="font-bold text-sm">21. Filter Box Check (ตรวจสอบน้ำรั่ว)</div>
                    <div className="ml-10 mt-1 flex flex-col gap-2">
                        <div className="flex gap-2 underline-offset-4 decoration-1 font-arial"><p className="underline font-bold">ครั้งที่ 1 </p>ตรวจสอบน้ำรั่วที่ด้านบนของ Filter</div>

                        <div className="flex items-center gap-2 mt-1">
                            <p>Date :</p>
                            <FormDateInput
                                name="p22_filter_leak_date"
                                label="Date :"
                                className="w-30 border-b border-black outline-none text-center font-arial"
                            />
                        </div>

                        <div className="flex items-center gap-10 font-bold font-arial">
                            <FormItemCheck name="p22_leak_status_ok" label="OK ไม่มีน้ำรั่ว" />
                            <FormItemCheck name="p22_leak_status_ng" label="NG มีน้ำรั่ว" />
                        </div>
                        <FormItemCheck name="p22_leak_repair" label="Repair แก้ไขน้ำรั่วแล้ว" className="font-bold font-arial" />
                    </div>
                    <div className="flex justify-end mt-4 absolute bottom-0 right-0 ">
                        <FormCheckedBox name="p22_final_checked_by" label="Checked by :" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page22;