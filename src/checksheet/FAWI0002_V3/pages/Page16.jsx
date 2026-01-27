import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';

function Page16() {
    return (
        <A4Paper content={content} currentPage={16}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4 px-2">
                    <SectionTitle>16. Voltage Check</SectionTitle>
                    <FormChecknumber
                        name="p16_meter_no"
                        label="DIGITAL METER NO."
                        className="w-72  border-b border-black text-center"
                    />
                </div>

                <FormQuickTable
                    className="w-full mt-2"
                    headerRows={[
                        [{ header: 'DISCHARGE CONTROLLER', colSpan: 7, className: 'bg-gray-300' }],
                        [
                            { header: 'No.', width: '35px' },
                            { header: 'Condition', width: '100px', colSpan: 2 },
                            { header: 'Measurement', width: '150px' },
                            { header: 'Unit', width: '120px' },
                            { header: 'Standard (V)', width: '160px' },
                            { header: 'Measured (V)', width: '100px' }
                        ]
                    ]}
                    columns={[
                        { key: 'no', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'condition', align: 'center', isLabel: true, rowGroup: true, weight: 'bold' },
                        { key: 'sub_condition', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'measurement', align: 'center', isLabel: true },
                        { key: 'unit', align: 'center', isLabel: true, rowGroup: true },
                        { key: 'std_val', align: 'center', isLabel: true },
                        { key: 'measured', type: 'input', align: 'center' }
                    ]}
                    data={[
                        { no: '1.', condition: 'Main\n\nBreaker On', sub_condition: '', measurement: 'X - Y', unit: '#ZN (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m1', measured_min: 195, measured_max: 215 },
                        { no: '2.', condition: 'Main\n\nBreaker On', sub_condition: '', measurement: 'Y - Z', unit: '#ZN (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m2', measured_min: 195, measured_max: 215 },
                        { no: '3.', condition: 'Main\n\nBreaker On', sub_condition: '', measurement: 'Z - X', unit: '#ZN (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m3', measured_min: 195, measured_max: 215 },
                        { no: '4.', condition: 'Main\n\nBreaker On', sub_condition: '', measurement: 'XUPS - Y', unit: '#YN (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m4', measured_min: 195, measured_max: 215 },
                        { no: '5.', condition: 'Main\n\nBreaker On', sub_condition: '', measurement: 'YUPS - X', unit: '#YN (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m5', measured_min: 195, measured_max: 215 },
                        { no: '6.', condition: 'Main\n\nBreaker On', sub_condition: 'RG1', measurement: '24VE - E', unit: 'CN2 - RG1(HD)', std_val: '24.15 - 24.20 (DC)', measured: 'p16_v_m6', measured_min: 24.15, measured_max: 24.20 },

                        { no: '7.', condition: 'Source On', sub_condition: '', measurement: 'X1 - Y1', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m7', measured_min: 195, measured_max: 215 },
                        { no: '8.', condition: 'Source On', measurement: 'X1F - Y1', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m8', measured_min: 195, measured_max: 215 },

                        { no: '9.', condition: 'Power On', sub_condition: '', measurement: 'X2 - Y2', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m9', measured_min: 195, measured_max: 215 },
                        { no: '10.', condition: 'Power On', sub_condition: '', measurement: 'Y2 - Z2', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m10', measured_min: 195, measured_max: 215 },
                        { no: '11.', condition: 'Power On', sub_condition: '', measurement: 'Z2 - X2', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m11', measured_min: 195, measured_max: 215 },
                        { no: '12.', condition: 'Power On', sub_condition: '', measurement: 'X2F - Y2', unit: 'TB1 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m12', measured_min: 195, measured_max: 215 },
                        { no: '13.', condition: 'Power On', sub_condition: '', measurement: '200L - 200N', unit: 'CP3 (HD)', std_val: '195 - 215 (AC)', measured: 'p16_v_m13', measured_min: 195, measured_max: 215 },
                        { no: '14.', condition: 'Power On', sub_condition: '', measurement: '0 - 2', unit: 'CP8 (HD)', std_val: '95 - 110 (AC)', measured: 'p16_v_m14', measured_min: 95, measured_max: 110 },

                        { no: '15.', condition: 'Power On', sub_condition: 'RG2', measurement: 'S5NU - SGNU', unit: 'SW.REG(SDP/D)', std_val: '3.25 - 3.35 (DC)', measured: 'p16_v_m15', measured_min: 3.25, measured_max: 3.35 },
                        { no: '16.', condition: 'Power On', sub_condition: 'RG4', measurement: 'S5NL - SGNL', unit: 'SW.REG(SDP/D)', std_val: '3.25 - 3.35 (DC)', measured: 'p16_v_m16', measured_min: 3.25, measured_max: 3.35 },
                        { no: '17.', condition: 'Power On', sub_condition: 'RG5', measurement: '24VMN - GMN', unit: 'SW.REG(MHP/D)', std_val: '24.05 - 24.15 (DC)', measured: 'p16_v_m17', measured_min: 24.05, measured_max: 24.15 },
                        { no: '18.', condition: 'Power On', sub_condition: 'RG1', measurement: 'P20S - P6S', unit: 'PHD', std_val: '7.50 - 7.60 (DC)', measured: 'p16_v_m18', measured_min: 7.50, measured_max: 7.60 },
                        { no: '19.', condition: 'CE ONLY', sub_condition: 'RG2', measurement: 'P50M - P6T', unit: 'PHD', std_val: '49.9 - 50.10 (DC)', measured: 'p16_v_m19', measured_min: 49.9, measured_max: 50.10 },
                    ]}
                />

                <div className="flex justify-end mt-4">
                    <FormCheckedBox name="p16_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page16;