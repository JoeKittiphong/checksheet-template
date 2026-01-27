import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page14() {
    return (
        <A4Paper content={content} currentPage={14}>
            <div className="flex flex-col gap-4">
                <FormQuickTable
                    className="w-full"
                    headerRows={[
                        [{ header: 'DISCHARGE CONTROLLER', colSpan: 6, className: 'bg-gray-300' }],
                        [
                            { header: 'No.', width: '40px' },
                            { header: 'Measurement(+)', width: '120px' },
                            { header: 'Measurement(-)', width: '130px' },
                            { header: 'Point', width: '200px' },
                            { header: 'Standard (Ω)', width: '150px' },
                            { header: 'Measured (Ω)', width: '100px' }
                        ]
                    ]}
                    columns={[
                        { key: 'no', align: 'center', isLabel: true },
                        { key: 'm_plus', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'm_minus', align: 'center', isLabel: true },
                        {
                            key: 'point',
                            align: 'center',
                            isLabel: true,
                            render: (val, row, { register }) => {
                                if (row.isCheckboxPoint) {
                                    return (
                                        <div className="flex items-center justify-center gap-2">
                                            <input type="checkbox" {...register(row.point_check)} className="w-4 h-4" />
                                            <span>{val}</span>
                                        </div>
                                    );
                                }
                                return <span className="whitespace-pre-wrap">{val}</span>;
                            }
                        },
                        { key: 'std_val', align: 'center', isLabel: true },
                        { key: 'measured', type: 'input', align: 'center' }
                    ]}
                    data={[
                        { no: '11.', m_plus: 'E', m_minus: 'SGN', point: 'IDSV-07', std_val: '∞', measured: 'p14_ins_m11' },
                        { no: '12.', m_plus: 'E', m_minus: 'P3 · P4', point: 'E - P-MOS', std_val: '∞', measured: 'p14_ins_m12' },
                        { no: '13.', m_plus: 'E', m_minus: 'P6M · H4', point: 'E - PHD', std_val: '∞', measured: 'p14_ins_m13' },

                        { no: '14.', m_plus: 'X1, X2, X3', m_minus: '0 - 2', point: '#YN,#ZN,#B01-CP8\n(HD)', std_val: '∞', measured: 'p14_ins_m14' },
                        { no: '15.', m_plus: 'X1, X2, X3', m_minus: 'P3 · P4', point: '#YN,#ZN,#B01-SDP-03', std_val: '∞', measured: 'p14_ins_m15' },
                        { no: '16.', m_plus: 'X1, X2, X3', m_minus: 'P6M · H4', point: 'PHD', std_val: '∞', measured: 'p14_ins_m16' },
                        { no: '17.', m_plus: 'X1, X2, X3', m_minus: 'P4L- - P3L-', point: '#YN, #ZN, #B01 -\nMHP-04', std_val: '∞', measured: 'p14_ins_m17' },

                        { no: '18.', m_plus: 'P6M', m_minus: 'H4', point: 'PHD', std_val: '∞', measured: 'p14_ins_m18' },
                        { no: '19.', m_plus: 'H4', m_minus: 'P6M', point: 'PHD', std_val: '∞', measured: 'p14_ins_m19' },

                        { no: '20.', m_plus: 'P3', m_minus: 'P4', point: 'SDP-03', std_val: '8 kΩ ~ 12 KΩ', measured: 'p14_ins_m20', suffix: 'kΩ', measured_min: 8, measured_max: 12 },
                        {
                            no: '21.', m_plus: 'P4', m_minus: 'P3', point: '1Ws ONLY',
                            isCheckboxPoint: true, point_check: 'p14_ins_m21_check',
                            std_val: '8 kΩ ~ 12 KΩ', measured: 'p14_ins_m21', suffix: 'kΩ', measured_min: 8, measured_max: 12
                        },
                        { no: '22.', m_plus: 'P3', m_minus: 'P4', point: 'SDP-03 (HPS)', std_val: '8 kΩ ~ 12 KΩ', measured: 'p14_ins_m22', suffix: 'kΩ', measured_min: 8, measured_max: 12 },
                        {
                            no: '23.', m_plus: 'P4', m_minus: 'P3', point: '33Ws ONLY',
                            isCheckboxPoint: true, point_check: 'p14_ins_m23_check',
                            std_val: '8 kΩ ~ 12 KΩ', measured: 'p14_ins_m23', suffix: 'kΩ', measured_min: 8, measured_max: 12
                        },
                    ]}
                />

                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p14_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page14;