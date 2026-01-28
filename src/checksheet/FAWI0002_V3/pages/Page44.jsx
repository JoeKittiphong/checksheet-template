import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page44() {
    const { register } = useFormContext();
    return (
        <A4Paper content={content} currentPage={44}>
            <div className="flex flex-col gap-2 p-2 relative">
                {/* 49. Wire Rotation Check (Continued) */}
                <div className="flex flex-col gap-2">
                    <FormItemCheck
                        name="p44_49_rot_check_group"
                        label={<SectionTitle className="!inline mt-0">Wire Rotation Check (ขั้นตอนการตรวจสอบการหมุนของลวด)</SectionTitle>}
                    />

                    <div className="pl-6 flex flex-col gap-2">
                        <FormItemCheck
                            name="p44_49_rot_1st_check"
                            label={<span className="text-sm font-bold">Wire Rotation 1st Check (Before Test Cutting)</span>}
                        />

                        <FormQuickTable
                            columns={[
                                { key: 'category', width: '100px', isLabel: true, rowGroup: true },
                                { key: 'std', width: '100px', isLabel: true },
                                { key: 'c1', type: 'input', width: '30px' },
                                { key: 'c2', type: 'input', width: '30px' },
                                { key: 'c3', type: 'input', width: '30px' },
                                { key: 'c4', type: 'input', width: '30px' },
                                { key: 'c5', type: 'input', width: '30px' },
                                { key: 'input', type: 'input', width: '60px' }
                            ]}
                            headerRows={[
                                [
                                    { header: 'Category', rowSpan: 2 },
                                    { header: 'STD', rowSpan: 2 },
                                    { header: 'Check', colSpan: 5 },
                                    { header: 'Input', rowSpan: 2 }
                                ],
                                [
                                    { header: '1st' },
                                    { header: '2nd' },
                                    { header: '3rd' },
                                    { header: '4th' },
                                    { header: '5th' }
                                ]
                            ]}
                            data={[
                                { category: 'Rotation Off', std: '±35°', c1: 'p44_49_rot_off_1', c2: 'p44_49_rot_off_2', c3: 'p44_49_rot_off_3', c4: 'p44_49_rot_off_4', c5: 'p44_49_rot_off_5', input: 'p44_49_rot_off_in' },

                                { category: 'CW Rotation', std: 'Min (W0.2) 265°', c1: 'p44_49_cw_min02_1', c2: 'p44_49_cw_min02_2', c3: 'p44_49_cw_min02_3', c4: 'p44_49_cw_min02_4', c5: 'p44_49_cw_min02_5', input: 'p44_49_cw_min02_in' },
                                { category: 'CW Rotation', std: 'Min (W0.25) 145°', c1: 'p44_49_cw_min025_1', c2: 'p44_49_cw_min025_2', c3: 'p44_49_cw_min025_3', c4: 'p44_49_cw_min025_4', c5: 'p44_49_cw_min025_5', input: 'p44_49_cw_min025_in' },
                                { category: 'CW Rotation', std: 'Max (W0.2) 355°', c1: 'p44_49_cw_max02_1', c2: 'p44_49_cw_max02_2', c3: 'p44_49_cw_max02_3', c4: 'p44_49_cw_max02_4', c5: 'p44_49_cw_max02_5', input: 'p44_49_cw_max02_in' },
                                { category: 'CW Rotation', std: 'Max (W0.25) 235°', c1: 'p44_49_cw_max025_1', c2: 'p44_49_cw_max025_2', c3: 'p44_49_cw_max025_3', c4: 'p44_49_cw_max025_4', c5: 'p44_49_cw_max025_5', input: 'p44_49_cw_max025_in' },

                                { category: 'CCW Rotation', std: 'Min (W0.2) 265°', c1: 'p44_49_ccw_min02_1', c2: 'p44_49_ccw_min02_2', c3: 'p44_49_ccw_min02_3', c4: 'p44_49_ccw_min02_4', c5: 'p44_49_ccw_min02_5', input: 'p44_49_ccw_min02_in' },
                                { category: 'CCW Rotation', std: 'Min (W0.25) 145°', c1: 'p44_49_ccw_min025_1', c2: 'p44_49_ccw_min025_2', c3: 'p44_49_ccw_min025_3', c4: 'p44_49_ccw_min025_4', c5: 'p44_49_ccw_min025_5', input: 'p44_49_ccw_min025_in' },
                                { category: 'CCW Rotation', std: 'Max (W0.2) 355°', c1: 'p44_49_ccw_max02_1', c2: 'p44_49_ccw_max02_2', c3: 'p44_49_ccw_max02_3', c4: 'p44_49_ccw_max02_4', c5: 'p44_49_ccw_max02_5', input: 'p44_49_ccw_max02_in' },
                                { category: 'CCW Rotation', std: 'Max (W0.25) 235°', c1: 'p44_49_ccw_max025_1', c2: 'p44_49_ccw_max025_2', c3: 'p44_49_ccw_max025_3', c4: 'p44_49_ccw_max025_4', c5: 'p44_49_ccw_max025_5', input: 'p44_49_ccw_max025_in' },

                                { category: 'CW/CCW Rotate Dif.', std: '≤45°', c1: 'p44_49_dif_1', c2: 'p44_49_dif_2', c3: 'p44_49_dif_3', c4: 'p44_49_dif_4', c5: 'p44_49_dif_5', input: 'p44_49_dif_in' }
                            ]}
                            className="mt-2 text-[11px]"
                        />

                        <div className="mt-2 flex justify-between items-start">
                            <div className="text-[10px] space-y-1">
                                <p className="font-bold">หมายเหตุ: วิธีการลง Data ในช่อง Input ดูได้จากตัวอย่างด้านล่าง</p>
                                <div className="ml-4">
                                    <p><span className="font-bold underline">Ex1:</span> Check Wire Rotation 3 ค่าแรก เท่ากับ <span className="font-bold">10°, 15°, 20°</span></p>
                                    <p className="ml-7">ในช่อง Input ต้องใส่ค่า <span className="font-bold">15°</span></p>

                                    <p className="mt-1"><span className="font-bold underline">Ex2:</span> Check Wire Rotation 3 ค่าแรก เท่ากับ <span className="font-bold">10°, 10°, 20°</span></p>
                                    <p className="ml-7">ในช่อง Input ต้องใส่ค่า <span className="font-bold">10°</span></p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center border border-black p-2 bg-white min-w-[150px]">
                                <span className="text-[12px] font-bold">Pulley B No.</span>
                                <input {...register('p44_pulley_b_no')} className="border-b border-black w-full text-center outline-none mt-2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Shim Ring */}
                <div className="mt-4">
                    <FormItemCheck
                        name="p44_shim_ring_check"
                        label={<span className="text-sm font-bold">Final Shim Ring</span>}
                    />
                    <div className="ml-6 mt-1 w-1/2">
                        <table className="w-full border-collapse border border-black text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black p-1 w-2/3">Spec Shim Ring</th>
                                    <th className="border border-black p-1 w-1/3">Q'ty (PC)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-1">
                                        <FormItemCheck name="p44_shim_002_check" label="0.02 mm" className="mt-0" />
                                    </td>
                                    <td className="border border-black p-1 text-center">
                                        <input {...register('p44_shim_002_qty')} className="w-full text-center outline-none" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">
                                        <FormItemCheck name="p44_shim_005_check" label="0.05 mm" className="mt-0" />
                                    </td>
                                    <td className="border border-black p-1 text-center">
                                        <input {...register('p44_shim_005_qty')} className="w-full text-center outline-none" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-black p-1">
                                        <FormItemCheck name="p44_shim_01_check" label="0.1 mm" className="mt-0" />
                                    </td>
                                    <td className="border border-black p-1 text-center">
                                        <input {...register('p44_shim_01_qty')} className="w-full text-center outline-none" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Signature - Fixed at bottom */}
                <div className="mt-8 flex justify-end pr-4">
                    <FormCheckedBox name="p44_checked" label="Checked by :" className="w-1/3" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page44;