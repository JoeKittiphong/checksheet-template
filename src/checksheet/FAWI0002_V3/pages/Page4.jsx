import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page4() {
    return (
        <A4Paper content={content} currentPage={4}>
            <div className="">
                <SectionTitle>6. Run Program Full Stroke for Re-Check Cable and Hose</SectionTitle>
                <p className='text-sm mb-4'>(รันโปรแกรม Full Stroke เพื่อตรวจสอบสาย Cable และ Hose)</p>

                <div className="space-y-6">
                    {/* Upper side */}
                    <div className="ml-4">
                        <FormItemCheck name="p4_check_upper_1" label="6.1 Run Program Full Stroke Check" />
                        <div className="space-y-2 ml-4">
                            <FormItemCheck name="p4_check_upper_1_1" label="6.1.1 Full_Stroke_Check_AL400G สำหรับเครื่องจักร AL400G" />
                            <FormItemCheck name="p4_check_upper_1_2" label="6.1.2 Full_Stroke_Check_AL600G สำหรับเครื่องจักร AL600G" />
                        </div>
                    </div>

                    {/* Lower side */}
                    <div className="ml-4">
                        <SectionTitle className="mb-2 underline">In Front of Machine Side (ด้านหน้าเครื่องจักร)</SectionTitle>
                        <FormItemCheck name="p4_check_lower_1" label="6.2 ตรวจสอบสำย Discharge Cable & Cable of Lower Guide ภำยใน Process Tank" />
                        <div className="space-y-2 ml-4">
                            <FormItemCheck className="underline" name="p4_check_lower_2" label="ที่ตำแหน่ง (Z-) สุด Stroke" />
                        </div>
                    </div>
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
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '1. Discharge Cable Upper', ok: 'p4_g1_i1_ok', ng: 'p4_g1_i1_ng', rework: 'p4_g1_i1_re' },
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '2. Discharge Cable Lower', ok: 'p4_g1_i2_ok', ng: 'p4_g1_i2_ng', rework: 'p4_g1_i2_re' },
                            { pos: 'X-สุด, Y-สุด,\nU-สุด, V-สุด', name: '3. Cable Lower Guide', ok: 'p4_g1_i3_ok', ng: 'p4_g1_i3_ng', rework: 'p4_g1_i3_re' },

                            // Group 2: X-, Y+
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '1. Discharge Cable Upper', ok: 'p4_g2_i1_ok', ng: 'p4_g2_i1_ng', rework: 'p4_g2_i1_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '2. Discharge Cable Lower', ok: 'p4_g2_i2_ok', ng: 'p4_g2_i2_ng', rework: 'p4_g2_i2_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '3. Cable Lower Guide', ok: 'p4_g2_i3_ok', ng: 'p4_g2_i3_ng', rework: 'p4_g2_i3_re' },
                            { pos: 'X-สุด, Y+สุด,\nU-สุด, V+สุด', name: '4. Upper Guide ชน Drain Cover-L', ok: 'p4_g2_i4_ok', ng: 'p4_g2_i4_ng', rework: 'p4_g2_i4_re' },

                            // Group 3: X+, Y+
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '1. Discharge Cable Upper', ok: 'p4_g3_i1_ok', ng: 'p4_g3_i1_ng', rework: 'p4_g3_i1_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '2. Discharge Cable Lower', ok: 'p4_g3_i2_ok', ng: 'p4_g3_i2_ng', rework: 'p4_g3_i2_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '3. Cable Lower Guide', ok: 'p4_g3_i3_ok', ng: 'p4_g3_i3_ng', rework: 'p4_g3_i3_re' },
                            { pos: 'X+สุด, Y+สุด,\nU+สุด, V+สุด', name: '4. Upper Guide ชน Drain Cover-R', ok: 'p4_g3_i4_ok', ng: 'p4_g3_i4_ng', rework: 'p4_g3_i4_re' },

                            // Group 4: X+, Y-
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '1. Discharge Cable Upper', ok: 'p4_g4_i1_ok', ng: 'p4_g4_i1_ng', rework: 'p4_g4_i1_re' },
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '2. Discharge Cable Lower', ok: 'p4_g4_i2_ok', ng: 'p4_g4_i2_ng', rework: 'p4_g4_i2_re' },
                            { pos: 'X+สุด, Y-สุด,\nU+สุด, V-สุด', name: '3. Cable Lower Guide', ok: 'p4_g4_i3_ok', ng: 'p4_g4_i3_ng', rework: 'p4_g4_i3_re' },
                        ]}
                    />

                    <div className="flex flex-col items-end mt-4">
                        <FormCheckedBox name="p4_checked_by" label="Checked by :" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;