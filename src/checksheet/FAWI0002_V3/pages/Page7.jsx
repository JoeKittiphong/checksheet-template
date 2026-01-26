import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Import placeholder image - please update to the correct hose image asset
import hoseImage from '@/assets/FAWI0002_V3/image-6-3.JPG';

function Page7() {
    return (
        <A4Paper content={content} currentPage={7}>
            <div className="">
                <SectionTitle className="mb-0">Left Side of Machine (ด้านซ้ายเครื่องจักร)</SectionTitle>
                <FormItemCheck
                    name="p7_check_hose"
                    label={<span className="text-sm">6.3 ตรวจสอบสาย Hose ด้านหลัง Process Tank</span>}
                />

                <div className="flex justify-center my-4">
                    <img src={hoseImage} alt="Hose check" className="w-[450px]" />
                </div>

                <div className="mt-2">
                    <FormQuickTable
                        className="w-full"
                        headerRows={[
                            [
                                { header: 'Z Axis', rowSpan: 2, width: '120px' },
                                { header: 'Name of Part', rowSpan: 2 },
                                { header: 'OK', colSpan: 1, width: '100px' },
                                { header: 'NG', colSpan: 1, width: '100px' },
                                { header: 'Rework', colSpan: 1, width: '180px' },
                            ],
                            [
                                { header: <span className="text-[8px] leading-tight">(สายไม่เบียด,รั้งเข้า Column)</span> },
                                { header: <span className="text-[8px] leading-tight">(สายเบียด,รั้งเข้า Column)</span> },
                                { header: <span className="text-[8px] leading-tight">(เขียน Detail ว่าแก้ไขอย่างไร)</span> },
                            ]
                        ]}
                        columns={[
                            { key: 'zaxis', align: 'center' },
                            { key: 'name', rowGroup: true, align: 'center' },
                            { key: 'ok', type: 'checkbox' },
                            { key: 'ng', type: 'checkbox' },
                            { key: 'rework', type: 'input' },
                        ]}
                        data={[
                            { zaxis: '(Z-) สุด Stroke', name: 'Hose Behind Process Tank', ok: 'p7_zmin_ok', ng: 'p7_zmin_ng', rework: 'p7_zmin_re' },
                            { zaxis: '(Z) Center', name: 'Hose Behind Process Tank', ok: 'p7_zcenter_ok', ng: 'p7_zcenter_ng', rework: 'p7_zcenter_re' },
                            { zaxis: '(Z+) สุด Stroke', name: 'Hose Behind Process Tank', ok: 'p7_zmax_ok', ng: 'p7_zmax_ng', rework: 'p7_zmax_re' },
                        ]}
                    />

                    {/* Footer Notes */}
                    <div className="mt-6 text-xs space-y-1">
                        <div className="flex items-start gap-4">
                            <span className="font-bold min-w-[60px]">หมายเหตุ:</span>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span>- ทำเครื่องหมาย</span>
                                    <span className="text-xl font-bold leading-none">✓</span>
                                    <span>ลงในช่อง OK ถ้าหากตรวจสอบแล้วพบว่า Hose ไม่เบียด, รั้งเข้า Column</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>- ทำเครื่องหมาย</span>
                                    <span className="text-xl font-bold leading-none">✓</span>
                                    <span>ลงในช่อง NG ถ้าหากตรวจสอบแล้วพบว่า Hose เบียด, รั้งเข้า Column</span>
                                </div>
                                <p className="ml-2 italic text-gray-700">จากนั้นให้แจ้ง Leader ประจำ Lot เพื่อทำการแก้ไข พร้อมทั้งระบุ Detail การแก้ไข ลงในช่อง Rework</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end mt-4">
                        <FormCheckedBox name="p7_checked_by" label="Checked by :" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;