import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page15() {
    return (
        <A4Paper content={content} currentPage={15}>
            <div className="flex flex-col gap-4">
                <FormQuickTable
                    className="w-full"
                    headerRows={[
                        [{ header: 'MS CONTROLLER', colSpan: 6, className: 'bg-gray-300' }],
                        [
                            { header: 'No.', width: '40px' },
                            { header: 'Measurement(+)', width: '120px' },
                            { header: 'Measurement(-)', width: '140px' },
                            { header: 'Point', width: '180px' },
                            { header: 'Standard (Ω)', width: '150px' },
                            { header: 'Measured (Ω)', width: '100px' }
                        ]
                    ]}
                    columns={[
                        { key: 'no', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'm_plus', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'm_minus', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'point', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'std_val', align: 'center', isLabel: true },
                        { key: 'measured', type: 'input', align: 'center' }
                    ]}
                    data={[
                        { no: '1.', m_plus: 'E', m_minus: 'X1 • Y1', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m1' },
                        { no: '2.', m_plus: 'E', m_minus: 'X2 • Y2 • Z2', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m2' },
                        { no: '3.', m_plus: 'E', m_minus: 'X2D • Y2D • Z2D', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m3' },
                        { no: '4.', m_plus: 'E', m_minus: 'X2T • Y2T • Z2T', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m4' },
                        { no: '5.', m_plus: 'E', m_minus: 'X2S • Z2S (SD)\n(WITHOUT USA)', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m5' },
                        { no: '6.', m_plus: 'E', m_minus: '0 • 2', point: 'E - TB1', std_val: '∞', measured: 'p15_ins_m6' },

                        { no: '7.', m_plus: 'E', m_minus: 'X2I • Y2I • Z2I', point: 'E - CP8 (CE/USA)', std_val: '∞', measured: 'p15_ins_m7' },
                        { no: '8.', m_plus: 'E', m_minus: 'G02', point: 'E - TB2', std_val: '475 kΩ – 525 kΩ', measured: 'p15_ins_m8', suffix: 'kΩ', measured_min: 475, measured_max: 525 },

                        // Row 9 - Dual Standard
                        { no: '9.', m_plus: 'E', m_minus: 'G03', point: 'E - CN3-GPDA-02', std_val: '230 kΩ – 270 kΩ', measured: 'p15_ins_m9_1', suffix: 'kΩ', measured_min: 230, measured_max: 270 },
                        { no: '9.', m_plus: 'E', m_minus: 'G03', point: 'E - CN3-GPDA-02', std_val: '∞ (UL ONLY +CE)', measured: 'p15_ins_m9_2' },

                        // Row 10 - Dual Standard
                        { no: '10.', m_plus: 'E', m_minus: 'G03A', point: 'E - MTIO-01', std_val: '230 kΩ – 270 kΩ', measured: 'p15_ins_m10_1', suffix: 'kΩ', measured_min: 230, measured_max: 270 },
                        { no: '10.', m_plus: 'E', m_minus: 'G03A', point: 'E - MTIO-01', std_val: '∞ (UL ONLY +CE)', measured: 'p15_ins_m10_2' },

                        { no: '11.', m_plus: 'X1', m_minus: 'X2', point: 'TB-1', std_val: '∞', measured: 'p15_ins_m11' },

                        {
                            no: '12.',
                            m_plus: 'X1 • X2 • X2D •\nX2T',
                            m_minus: 'G02 • G03 • G03A',
                            point: 'TB1 - GPDA-02 - MTIO-01',
                            std_val: '∞',
                            measured: 'p15_ins_m12'
                        },
                        {
                            no: '13.',
                            m_plus: 'X1 • X2 • X2D •\nX2T',
                            m_minus: '0 • 2',
                            point: 'TB1',
                            std_val: '∞',
                            measured: 'p15_ins_m13'
                        },

                        // Row 14 - Dual Standard
                        { no: '14.', m_plus: 'G02', m_minus: 'G03', point: 'TB-2 - GPDA-02', std_val: '730 kΩ – 770 kΩ', measured: 'p15_ins_m14_1', suffix: 'kΩ', measured_min: 730, measured_max: 770 },
                        { no: '14.', m_plus: 'G02', m_minus: 'G03', point: 'TB-2 - GPDA-02', std_val: '∞ (UL,CE)', measured: 'p15_ins_m14_2' },

                        // Row 15 - Dual Standard
                        { no: '15.', m_plus: 'G02', m_minus: 'G03A', point: 'TB2 - MTIO-01', std_val: '730 kΩ – 770 kΩ', measured: 'p15_ins_m15_1', suffix: 'kΩ', measured_min: 730, measured_max: 770 },
                        { no: '15.', m_plus: 'G02', m_minus: 'G03A', point: 'TB2 - MTIO-01', std_val: '∞ (UL,CE)', measured: 'p15_ins_m15_2' },
                    ]}
                />

                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p15_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page15;