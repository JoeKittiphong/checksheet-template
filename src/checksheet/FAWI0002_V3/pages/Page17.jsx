import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page17() {
    return (
        <A4Paper content={content} currentPage={17}>
            <div className="flex flex-col gap-4">
                {/* MS Controller Voltage Table */}
                <FormQuickTable
                    className="w-full"
                    headerRows={[
                        [{ header: 'MS CONTROLLER', colSpan: 7, className: 'bg-gray-300' }],
                        [
                            { header: 'No.', width: '35px' },
                            { header: 'Condition', width: '100px', colSpan: 2 },
                            { header: 'Measurement', width: '180px' },
                            { header: 'Unit', width: '120px' },
                            { header: 'Standard (V)', width: '160px' },
                            { header: 'Measured (V)', width: '100px' }
                        ]
                    ]}
                    columns={[
                        { key: 'no', align: 'center', isLabel: true },
                        { key: 'condition', align: 'center', isLabel: true, rowGroup: true, weight: 'bold' },
                        { key: 'sub_condition', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'measurement', align: 'center', isLabel: true },
                        { key: 'unit', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'std_val', align: 'center', isLabel: true },
                        { key: 'measured', type: 'input', align: 'center' }
                    ]}
                    data={[
                        // Source On Section
                        { no: '1.', condition: 'Source On', sub_condition: '', measurement: 'X1 - Y1', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m1', measured_min: 195, measured_max: 215 },
                        { no: '2.', condition: 'Source On', sub_condition: 'RG1', measurement: '24V03A(3) - G03', unit: 'MTIO-01(PCB)', std_val: '24.08 - 24.12 (DC)', measured: 'p17_v_m2', measured_min: 24.08, measured_max: 24.12 },
                        { no: '3.', condition: 'Source On', sub_condition: 'RG2', measurement: 'D5V(1) - G03(2)', unit: 'GPDA-02(PCB)', std_val: '5.05 - 5.15 (DC)', measured: 'p17_v_m3', measured_min: 5.05, measured_max: 5.15 },
                        { no: '4.', condition: 'Source On', sub_condition: 'RG3', measurement: '+15V(1) - G02(3)', unit: 'GPDA-02(PCB)', std_val: '14.50 - 15.50 (DC)', measured: 'p17_v_m4', measured_min: 14.5, measured_max: 15.5 },
                        { no: '5.', condition: 'Source On', sub_condition: 'RG3', measurement: '-15V(2) - G02(4)', unit: 'GPDA-02(PCB)', std_val: '(-14.50) - (-15.50) (DC)', measured: 'p17_v_m5', measured_min: -15.5, measured_max: -14.5 },
                        { no: '6.', condition: 'Source On', sub_condition: 'RG4', measurement: '24VS - G02', unit: 'TB-2', std_val: '24.45 - 24.55 (DC)', measured: 'p17_v_m6', measured_min: 24.45, measured_max: 24.55 },
                        { no: '7.', condition: 'Source On', sub_condition: '', measurement: '24VP - G02', unit: 'TB-2', std_val: '0 (DC)', measured: 'p17_v_m7', measured_min: -0.1, measured_max: 0.1 },
                        { no: '9.', condition: 'Source On', sub_condition: 'TR1', measurement: '20T1(1) - 0T1', unit: 'WIO-04', std_val: '22.2 - 22.6 (AC)', measured: 'p17_v_m9', measured_min: 22.2, measured_max: 22.6 },
                        { no: '10.', condition: 'Source On', sub_condition: 'TR2', measurement: '20S(J) - 20D(K)', unit: 'CN-STD', std_val: '22.2 - 22.6 (AC)', measured: 'p17_v_m10', measured_min: 22.2, measured_max: 22.6 },

                        // Power On Section
                        { no: '11.', condition: 'Power On', measurement: 'X2 - Y2', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m11', measured_min: 195, measured_max: 215 },
                        { no: '12.', condition: 'Power On', measurement: 'Y2 - Z2', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m12', measured_min: 195, measured_max: 215 },
                        { no: '13.', condition: 'Power On', measurement: 'Z2 - X2', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m13', measured_min: 195, measured_max: 215 },
                        { no: '14.', condition: 'Power On', measurement: 'X2D - Y2D', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m14', measured_min: 195, measured_max: 215 },
                        { no: '15.', condition: 'Power On', measurement: 'Y2D - Z2D', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m15', measured_min: 195, measured_max: 215 },
                        { no: '16.', condition: 'Power On', measurement: 'Z2D - X2D', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m16', measured_min: 195, measured_max: 215 },
                        { no: '17.', condition: 'Power On', measurement: 'X2T - Y2T', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m17', measured_min: 195, measured_max: 215 },
                        { no: '18.', condition: 'Power On', measurement: 'Y2T - Z2T', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m18', measured_min: 195, measured_max: 215 },
                        { no: '19.', condition: 'Power On', measurement: 'Z2T - X2T', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m19', measured_min: 195, measured_max: 215 },
                        { no: '20.', condition: 'Power On', measurement: 'X2S - Y2 (SD)\n(WITHOUT USA)', unit: 'TB-1', std_val: '195 - 215 (AC)', measured: 'p17_v_m20', measured_min: 195, measured_max: 215 },
                        { no: '21.', condition: 'Power On', measurement: '0 - 2', unit: 'TB-1', std_val: '95 - 110 (AC)', measured: 'p17_v_m21', measured_min: 95, measured_max: 110 },
                        { no: '22.', condition: 'Power On', measurement: '24VP - G02', unit: 'TB-2', std_val: '24.4 - 24.6 (DC)', measured: 'p17_v_m22', measured_min: 24.4, measured_max: 24.6 },
                        { no: '23.', condition: 'Power On', measurement: 'X2I - Y2I', unit: 'E - CP8\n(UL,CE)', std_val: '195 - 215 (AC)', measured: 'p17_v_m23', measured_min: 195, measured_max: 215 },
                        { no: '24.', condition: 'Power On', measurement: 'Y2I - Z2I', unit: 'E - CP8\n(UL,CE)', std_val: '195 - 215 (AC)', measured: 'p17_v_m24', measured_min: 195, measured_max: 215 },
                        { no: '25.', condition: 'Power On', measurement: 'Z2I - X2I', unit: 'E - CP8\n(UL,CE)', std_val: '195 - 215 (AC)', measured: 'p17_v_m25', measured_min: 195, measured_max: 215 },
                    ]}
                />

                {/* Section 16.1 Switch Check */}
                <div className="mt-2">
                    <SectionTitle className="text-base mb-2">16.1 Remote control box , Mouse & Panel SW. Check</SectionTitle>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 ml-4">
                        <FormItemCheck name="p17_sw_c1" label="MFR Selects the jog operation speed" className="text-sm" />
                        <FormItemCheck name="p17_sw_c2" label="Check Mouse (เขย่าลูกศร,คลิกซ้าย,ขวา)" className="text-sm" />
                        <FormItemCheck name="p17_sw_c3" label="Jog mode X+ X- Y+ Y- Z+ Z- U+ U- V+ V-" className="text-sm" />
                        <FormItemCheck name="p17_sw_c4" label="ENT HALT ACK OFF ACK SWITCH CHECK FUNCTION ON CHECK" className="text-sm" />
                    </div>
                </div>

                {/* Signature Box */}
                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p17_checked_by" label="Checked by" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page17;