import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page37() {
    const { register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={37}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-end items-center pr-10 gap-2">
                    <SectionTitle>40. Tension Check</SectionTitle>
                    <div className="flex-1"></div>
                    <FormItemCheck
                        name="p37_meter_no_check"
                        showCheckbox={false}
                        label={<span className="text-sm">Digital Tension Meter No.</span>}
                        input={{
                            name: "p37_meter_no",
                            width: "130px"
                        }}
                    />
                </div>

                <div className="ml-5 flex flex-col gap-3">
                    <p className="text-sm italic text-gray-600">(Digital Tension Meter data setting : Wire 0.2 mm =&gt; 3 , Wire 0.25 mm =&gt; 2)</p>

                    <FormItemCheck
                        name="p37_40_1_check"
                        label={
                            <div className="text-sm">
                                <p>40.1 Re-check connector must be connected (CN-DET, CN-ROLL, CN-MO)</p>
                                <p className="ml-5 text-gray-500">ตรวจสอบ Connector ต้องประกอบครบและถูกต้อง CN-DET, CN-ROLL, CN-MO</p>
                            </div>
                        }
                    />

                    <FormItemCheck
                        name="p37_40_2_check"
                        label={<span className="text-sm">40.2 Power Off, ถอดแปรงและลวดออกจาก Tension Detector</span>}
                    />

                    <FormItemCheck
                        name="p37_40_3_dummy"
                        showCheckbox={false}
                        label={<span className="text-sm">40.3 Vout - G02 Voltage Check (on CADC-02 PCB) =</span>}
                        input={{
                            name: "p37_vout_val",
                            suffix: "V",
                            width: "100px",
                            minStd: 0.059,
                            maxStd: 0.061
                        }}
                    />
                    <p className="ml-10 text-xs italic text-gray-500">(STD : 0.059 ~ 0.061 V ==&gt; Adjust at offset dial (OFS VR) on CADC-02 PCB)</p>

                    <FormItemCheck
                        name="p37_40_4_dummy"
                        showCheckbox={false}
                        label={<span className="text-sm">40.4 TENSENS - G02 Voltage Check (on CADC-02 PCB) =</span>}
                        input={{
                            name: "p37_tensens_val_1",
                            suffix: "V",
                            width: "100px",
                            minStd: 0.110,
                            maxStd: 0.130
                        }}
                    />
                    <p className="ml-10 text-xs italic text-gray-500">(STD : 0.110 ~ 0.130 V ==&gt; Adjust at gain dial (GAIN VR) on CADC-02 PCB)</p>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold">40.5 Input data WK = 20 or 25 , WT = 150 , WS = 70 , Wire Run ==&gt; ON</p>
                        <FormItemCheck
                            name="p37_40_5_dummy"
                            showCheckbox={false}
                            label={<span className="text-sm ml-5">Check WT =150 ==&gt; Wire Tension =</span>}
                            input={{
                                name: "p37_wire_tension_val",
                                suffix: "N",
                                width: "100px",
                                minStd: 14.40,
                                maxStd: 14.70
                            }}
                        />
                        <p className="ml-10 text-xs italic text-blue-600">(STD : 14.40 ~ 14.70 N ==&gt; Adjust at gain dial (GAIN VR) on CADC-02 PCB)</p>
                    </div>

                    <FormItemCheck
                        name="p37_40_6_check"
                        label={<span className="text-sm">40.6 Power Off , แยกลวดออกจาก Tension Detector (ลวดต้องไม่แตะกับ Tension Roller)</span>}
                    />

                    <FormItemCheck
                        name="p37_40_7_dummy"
                        showCheckbox={false}
                        label={<span className="text-sm">40.7 TENSENS - G02 Voltage Check (on CADC-02 PCB) =</span>}
                        input={{
                            name: "p37_tensens_val_2",
                            suffix: "V",
                            width: "100px",
                            minStd: 0.110,
                            maxStd: 0.130
                        }}
                    />
                    <p className="ml-10 text-xs italic text-gray-500">(STD : 0.110 ~ 0.130 V ==&gt; Adjust at offset dial (OFS VR) on CADC-02 PCB)</p>

                    <div className="mt-2 flex flex-col gap-2 border-l-4 border-gray-200 pl-4 py-1">
                        <p className="font-bold text-sm">*** 40.8 Input data WK = 20 or 25 , WS = 70 , Wire Run ==&gt; ON</p>
                        <div className="w-[500px] ml-5">
                            <FormQuickTable
                                columns={[
                                    { header: 'WT', key: 'wt', width: '100px', isLabel: true },
                                    { header: '50', key: 'wt50' },
                                    { header: '120', key: 'wt120' },
                                    { header: '150', key: 'wt150' },
                                ]}
                                data={[
                                    { wt: 'Wire Tension(N)', wt50: '4.7 ~ 5.3', wt120: '11.4 ~ 12.0', wt150: '14.3 ~ 14.9' },
                                    {
                                        wt: 'Data Check',
                                        wt50: 'p37_data_check_50',
                                        wt50_min: 4.7,
                                        wt50_max: 5.3,
                                        wt120: 'p37_data_check_120',
                                        wt120_min: 11.4,
                                        wt120_max: 12.0,
                                        wt150: 'p37_data_check_150',
                                        wt150_min: 14.3,
                                        wt150_max: 14.9,
                                        type: 'input'
                                    },
                                ]}
                            />
                        </div>
                        <p className="text-xs font-bold text-red-600 mt-1 ml-5">*** ห้ามปรับที่ GAIN VR กับ OFS VR</p>
                        <div className="ml-10 text-[11px] flex flex-col gap-1 text-gray-600 italic">
                            <p>- ถ้าค่า Tension ==&gt; OK. ให้ทำตามข้อ 40.9 ต่อไป</p>
                            <p>- ถ้าค่า Tension ==&gt; NG. ให้กลับไปทำตามข้อ 40.2 ใหม่ "ถ้ายังปรับไม่ได้ให้แจ้งหัวหน้างาน"</p>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-3">
                        <FormItemCheck
                            name="p37_40_9_check"
                            label={<span className="text-sm">40.9 Power Off , แยกลวดออกจาก Tension Detector (ลวดต้องไม่แตะกับ Tension Roller)</span>}
                        />
                        <FormItemCheck
                            name="p37_40_10_check"
                            label={<span className="text-sm">40.10 ประกอบแปรงที่ Tension Detector (แปรงต้องไม่แตะกับ Tension Roller)</span>}
                        />
                        <FormItemCheck
                            name="p37_40_11_dummy"
                            showCheckbox={false}
                            label={<span className="text-sm">40.11 TENSENS - G02 Voltage Check (on CADC-02 PCB) =</span>}
                            input={{
                                name: "p37_tensens_val_3",
                                suffix: "V",
                                width: "100px"
                            }}
                        />
                        <div className="ml-10 text-[11px] flex flex-col gap-1 text-gray-600 italic">
                            <p>- ถ้า Voltage = data ในข้อ 40.7 ==&gt; Finish</p>
                            <p>- ถ้า Voltage ≠ data ในข้อ 40.7 ==&gt; แปรงแตะกับ Tension Roller</p>
                            <p className="ml-32">==&gt; ประกอบแปรงที่ Tension Detector ใหม่</p>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page37;