import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Import asset image - verify the correct image name from assets
import cableImage from '@/assets/FAWI0002_V3/image-6-4.JPG';

function Page8() {
    return (
        <A4Paper content={content} currentPage={8}>
            <div className="">
                <SectionTitle className="mb-0">Z-Side Box L (ด้านซ้ายเครื่องจักร)</SectionTitle>
                <FormItemCheck
                    name="p8_check_cable"
                    label={<span className="text-sm">6.4 ตรวจสอบสาย Cable ภายใน Z Side Box-L</span>}
                />

                <div className="flex justify-center my-4">
                    <img src={cableImage} alt="Cable check" className="w-[350px]" />
                </div>

                <div className="mt-2">
                    <FormQuickTable
                        className="w-full"
                        headerRows={[
                            [
                                { header: 'OK', colSpan: 1, width: '150px' },
                                { header: 'NG', colSpan: 1, width: '150px' },
                                { header: 'Rework', colSpan: 1 },
                            ],
                            [
                                { header: <span className="text-[10px] leading-tight">(สายไม่เบียด,ไม่รั้ง,ไม่ฉีกขาด)</span> },
                                { header: <span className="text-[10px] leading-tight">(สายเบียด,รั้ง,ฉีกขาด)</span> },
                                { header: <span className="text-[10px] leading-tight">(เขียน Detail ว่าแก้ไขอย่างไร)</span> },
                            ]
                        ]}
                        columns={[
                            { key: 'ok', type: 'checkbox', align: 'center' },
                            { key: 'ng', type: 'checkbox', align: 'center' },
                            { key: 'rework', type: 'input' },
                        ]}
                        data={[
                            { ok: 'p8_cable_ok', ng: 'p8_cable_ng', rework: 'p8_cable_rework' },
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
                                    <span>ลงในช่อง OK ถ้าหากตรวจสอบแล้วพบว่า Cable ไม่เบียด,ไม่รั้ง,ไม่ฉีกขาด</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>- ทำเครื่องหมาย</span>
                                    <span className="text-xl font-bold leading-none">✓</span>
                                    <span>ลงในช่อง NG ถ้าหากตรวจสอบแล้วพบว่า Cable เบียด,รั้ง,ฉีกขาด</span>
                                </div>
                                <p className="ml-2 italic text-gray-700">จากนั้นให้แจ้ง Leader ประจำ Lot เพื่อทำการแก้ไข พร้อมทั้งระบุ Detail การแก้ไข ลงในช่อง Rework</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end mt-4">
                        <FormCheckedBox name="p8_checked_by" label="Checked by :" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;