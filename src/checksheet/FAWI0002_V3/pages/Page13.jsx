import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';

function Page13() {
    return (
        <A4Paper content={content} currentPage={13}>
            <div className="flex flex-col gap-4">
                {/* Section 14 */}
                <section>
                    <div className="flex items-center gap-4 mb-2">
                        <SectionTitle>14. Optical Power Check</SectionTitle>
                        <FormChecknumber
                            name="p13_optical_meter_no"
                            label="OPTICAL POWER METER NO."
                            className="w-48 border-b border-black text-center"
                        />
                    </div>

                    <FormQuickTable
                        className="w-full"
                        headerRows={[
                            [
                                { header: 'Point A', colSpan: 2, width: '150px' },
                                { header: 'Determination A', width: '100px' },
                                { header: 'Point B', colSpan: 2, width: '150px' },
                                { header: 'Determination B', width: '100px' },
                                { header: 'Standard(dBm)', width: '120px' }
                            ]
                        ]}
                        columns={[
                            { key: 'pa1', align: 'center', isLabel: true },
                            { key: 'pa2', align: 'center', isLabel: true },
                            { key: 'det_a', type: 'input', align: 'center' },
                            { key: 'pb1', align: 'center', isLabel: true },
                            { key: 'pb2', align: 'center', isLabel: true },
                            { key: 'det_b', type: 'input', align: 'center' },
                            { key: 'std', align: 'center', isLabel: true }
                        ]}
                        data={[
                            {
                                pa1: 'POF2', pa2: 'IDSV-07', det_a: 'p13_op_det_a1',
                                pb1: 'POF2', pb2: 'MTIO-01', det_b: 'p13_op_det_b1',
                                std: '- 1.0 ~ - 10.0',
                                det_a_min: -1, det_a_max: 10,
                                det_b_min: -1, det_b_max: 10
                            },
                            {
                                pa1: 'POF-02(DPW)', pa2: 'DPW-01', det_a: 'p13_op_det_a2',
                                pb1: 'POF10', pb2: 'MTIO-01', det_b: 'p13_op_det_b2',
                                std: '- 1.0 ~ - 10.0',
                                det_a_min: -1, det_a_max: 10,
                                det_b_min: -1, det_b_max: 10
                            }
                        ]}
                    />
                    <div className="flex justify-end mt-2">
                        <FormCheckedBox name="p13_op_checked_by" label="Checked by :" />
                    </div>
                </section>

                {/* Section 15 */}
                <section className="mt-2">
                    <div className="flex items-center gap-4 mb-1">
                        <FormItemCheck name="p13_insulation_main_check" label={<span className="font-bold text-base">15. Insulation Check</span>} />
                        <FormChecknumber
                            name="p13_analog_meter_no"
                            label="ANALOG METER NO."
                            className="w-48 border-b border-black text-center"
                        />
                    </div>
                    <div className="ml-8 mb-2 space-y-1 text-xs">
                        <p>Every cable must be connected (Machine and Controller) ต้องต่อสายไฟทุกเส้นให้ครบถ้วน</p>
                        <p>Use Analog Tester ×10k(Range), Adjust 0Ω before check. Standard over 2MΩ , Main Breaker OFF</p>
                    </div>

                    <FormQuickTable
                        className="w-full"
                        headerRows={[
                            [{ header: 'DISCHARGE CONTROLLER', colSpan: 6, className: 'bg-gray-300' }],
                            [
                                { header: 'No.', width: '40px' },
                                { header: 'Measurement(+)', width: '120px' },
                                { header: 'Measurement(-)', width: '150px' },
                                { header: 'Point', width: '100px' },
                                { header: 'Standard (Ω)', width: '180px' },
                                { header: 'Measured (Ω)', width: '100px' }
                            ]
                        ]}
                        columns={[
                            { header: 'No.', key: 'no', align: 'center', isLabel: true, rowGroup: true },
                            { header: 'Measurement(+)', key: 'm_plus', align: 'center', isLabel: true, rowGroup: true },
                            { header: 'Measurement(-)', key: 'm_minus', align: 'center', isLabel: true, rowGroup: true },
                            { header: 'Point', key: 'point', align: 'center', isLabel: true, rowGroup: true },
                            { header: 'Standard (Ω)', key: 'std_val', align: 'center', isLabel: true },
                            { header: 'Measured (Ω)', key: 'measured', type: 'input', align: 'center' }
                        ]}
                        data={[
                            { no: '1.', m_plus: 'E', m_minus: 'X · Y · Z', point: 'E - #ZN', std_val: '∞', measured: 'p13_ins_m1_1' },
                            { no: '1.', m_plus: 'E', m_minus: 'X · Y · Z', point: 'E - #ZN', std_val: '2000 kΩ – 3000 kΩ(UPS)\n(DL9127-1000JHLSL1)', measured: 'p13_ins_m1_2', suffix: 'kΩ', measured_min: 2000, measured_max: 3000 },
                            { no: '2.', m_plus: 'E', m_minus: 'XUPS · YUPS', point: 'E - #YN', std_val: '∞', measured: 'p13_ins_m2_1' },
                            { no: '2.', m_plus: 'E', m_minus: 'XUPS · YUPS', point: 'E - #YN', std_val: '500 kΩ – 700 kΩ(UPS)\n(DL9127-1000JHLSL1)', measured: 'p13_ins_m2_2', suffix: 'kΩ', measured_min: 500, measured_max: 700 },
                            { no: '3.', m_plus: 'E', m_minus: 'X1 · Y1', point: 'E - #YN', std_val: '∞', measured: 'p13_ins_m3' },
                            { no: '4.', m_plus: 'E', m_minus: 'X1F', point: 'E - TB1', std_val: '∞', measured: 'p13_ins_m4' },
                            { no: '5.', m_plus: 'E', m_minus: 'X2 · Y2 · Z2', point: 'E - #ZN', std_val: '∞', measured: 'p13_ins_m5' },
                            { no: '6.', m_plus: 'E', m_minus: 'X2F', point: 'E - TB1', std_val: '∞', measured: 'p13_ins_m6' },
                            { no: '7.', m_plus: 'E', m_minus: '200L · 200N', point: 'E - CP3', std_val: '∞', measured: 'p13_ins_m7_1' },
                            { no: '7.', m_plus: 'E', m_minus: '200L · 200N', point: 'E - CP3', std_val: '500 kΩ – 700 kΩ(UPS)\n(DL9127-1000JHLSL1)', measured: 'p13_ins_m7_2', suffix: 'kΩ', measured_min: 500, measured_max: 700 },
                            { no: '8.', m_plus: 'E', m_minus: '0 · 2', point: 'E - CP8', std_val: '∞', measured: 'p13_ins_m8' },
                            { no: '9.', m_plus: 'E', m_minus: 'X3 · Y3 · Z3', point: 'E - #B01', std_val: '∞', measured: 'p13_ins_m9' },
                            { no: '10.', m_plus: 'E', m_minus: 'XTA · Y3 · ZTA', point: 'E - TMV', std_val: '∞', measured: 'p13_ins_m10' },
                        ]}
                    />
                </section>

                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p13_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page13;