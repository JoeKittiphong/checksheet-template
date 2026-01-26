import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page6() {
    return (
        <A4Paper content={content} currentPage={6}>
            <div className="">
                <FormItemCheck
                    name="p6_check_z_max"
                    label={<span className="font-bold underline text-sm">ที่ตำแหน่ง (Z+) สุด Stroke</span>}
                />

                <div className="mt-2">
                    <FormQuickTable
                        className="w-full"
                        headerRows={[
                            [
                                { header: 'Position', rowSpan: 2, width: '120px' },
                                { header: 'Name of Part', rowSpan: 2 },
                                { header: 'OK', colSpan: 1, width: '80px' },
                                { header: 'NG', colSpan: 1, width: '80px' },
                                { header: 'Rework', colSpan: 1, width: '150px' },
                            ],
                            [
                                { header: <span className="text-[8px] leading-tight">(ไม่มีรอยฉีกขาด, ไม่เบียดรั้ง)<br />Upper Guide ไม่ชน Drain Cover</span> },
                                { header: <span className="text-[8px] leading-tight">(มีรอยฉีกขาด, เบียดรั้ง)<br />Upper Guide ชน Drain Cover</span> },
                                { header: <span className="text-[8px] leading-tight">(เขียน Detail ว่าแก้ไขอย่างไร)</span> },
                            ]
                        ]}
                        columns={[
                            { key: 'pos', rowGroup: true, align: 'center' },
                            { key: 'name', align: 'left' },
                            { key: 'ok', type: 'checkbox' },
                            { key: 'ng', type: 'checkbox' },
                            { key: 'rework', type: 'input' },
                        ]}
                        data={[
                            // Group 1: X-, Y-
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '1. Discharge Cable Upper', ok: 'p6_g1_i1_ok', ng: 'p6_g1_i1_ng', rework: 'p6_g1_i1_re' },
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '2. Discharge Cable Lower', ok: 'p6_g1_i2_ok', ng: 'p6_g1_i2_ng', rework: 'p6_g1_i2_re' },
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '3. Cable Lower Guide', ok: 'p6_g1_i3_ok', ng: 'p6_g1_i3_ng', rework: 'p6_g1_i3_re' },

                            // Group 2: X-, Y+
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '1. Discharge Cable Upper', ok: 'p6_g2_i1_ok', ng: 'p6_g2_i1_ng', rework: 'p6_g2_i1_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '2. Discharge Cable Lower', ok: 'p6_g2_i2_ok', ng: 'p6_g2_i2_ng', rework: 'p6_g2_i2_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '3. Cable Lower Guide', ok: 'p6_g2_i3_ok', ng: 'p6_g2_i3_ng', rework: 'p6_g2_i3_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '4. Upper Guide ชน Drain Cover-L', ok: 'p6_g2_i4_ok', ng: 'p6_g2_i4_ng', rework: 'p6_g2_i4_re' },

                            // Group 3: X+, Y+
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '1. Discharge Cable Upper', ok: 'p6_g3_i1_ok', ng: 'p6_g3_i1_ng', rework: 'p6_g3_i1_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '2. Discharge Cable Lower', ok: 'p6_g3_i2_ok', ng: 'p6_g3_i2_ng', rework: 'p6_g3_i2_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '3. Cable Lower Guide', ok: 'p6_g3_i3_ok', ng: 'p6_g3_i3_ng', rework: 'p6_g3_i3_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '4. Upper Guide ชน Drain Cover-R', ok: 'p6_g3_i4_ok', ng: 'p6_g3_i4_ng', rework: 'p6_g3_i4_re' },

                            // Group 4: X+, Y-
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '1. Discharge Cable Upper', ok: 'p6_g4_i1_ok', ng: 'p6_g4_i1_ng', rework: 'p6_g4_i1_re' },
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '2. Discharge Cable Lower', ok: 'p6_g4_i2_ok', ng: 'p6_g4_i2_ng', rework: 'p6_g4_i2_re' },
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '3. Cable Lower Guide', ok: 'p6_g4_i3_ok', ng: 'p6_g4_i3_ng', rework: 'p6_g4_i3_re' },
                        ]}
                    />

                    {/* Footer Notes */}
                    <div className="mt-4 text-xs space-y-1">
                        <div className="flex items-start gap-4">
                            <span className="font-bold min-w-[60px]">หมายเหตุ:</span>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span>- ทำเครื่องหมาย</span>
                                    <span className="text-xl font-bold leading-none">✓</span>
                                    <span>ลงในช่อง OK ถ้าหากตรวจสอบแล้วพบว่า Part สมบูรณ์ไม่เสียหาย</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>- ทำเครื่องหมาย</span>
                                    <span className="text-xl font-bold leading-none">✓</span>
                                    <span>ลงในช่อง NG ถ้าหากตรวจสอบแล้วพบว่า Part เสียหาย</span>
                                </div>
                                <p className="ml-2 italic text-gray-700">จากนั้นให้แจ้ง Leader ประจำ Lot เพื่อทำการแก้ไข พร้อมทั้งระบุ Detail การแก้ไข ลงในช่อง Rework</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end mt-4">
                        <FormCheckedBox name="p6_checked_by" label="Checked by :" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;