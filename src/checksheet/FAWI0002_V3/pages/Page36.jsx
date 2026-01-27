import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

import imgCW from '@/assets/FAWI0002_V3/image-39-1.JPG';
import imgCCW from '@/assets/FAWI0002_V3/image-39-2.JPG';
import imgSaveInstruction from '@/assets/FAWI0002_V3/image-39-3.JPG';

function Page36() {
    return (
        <A4Paper content={content} currentPage={36}>
            <div className="flex flex-col gap-2">
                <SectionTitle>39. Servo Driver Check</SectionTitle>

                <div className="ml-5">
                    <FormQuickTable
                        columns={[
                            { header: 'Parameter No.', key: 'no', width: '100px' },
                            { header: 'Parameter', key: 'name', align: 'left' },
                            { header: 'Setting Value', key: 'std', width: '110px' },
                            { header: 'Data Setting', key: 'data', type: 'input', width: '120px' },
                        ]}
                        data={[
                            { no: '000', name: 'Rotational direction setup', std: '1', data: 'p36_servo_000' },
                            { no: '001', name: 'Control mode setup', std: '1', data: 'p36_servo_001' },
                            { no: '002', name: 'Real-time auto-gain tuning setup', std: '0', data: 'p36_servo_002' },
                            { no: '004', name: 'Inetia ratio', std: '100', data: 'p36_servo_004' },
                            { no: '011', name: 'Output pulse counts per one moter revolution', std: '500', data: 'p36_servo_011' },
                            { no: '013', name: '1st torque limit', std: '300', data: 'p36_servo_013' },
                            { no: '101', name: '1st gain of velocity loop', std: '500', data: 'p36_servo_101' },
                            { no: '102', name: '1st time constant of velocity loop integration', std: '10000', data: 'p36_servo_102' },
                            { no: '103', name: '1st filter of speed detection', std: '4', data: 'p36_servo_103' },
                            { no: '104', name: '1st time constant of torque filter', std: '50', data: 'p36_servo_104' },
                            { no: '106', name: '2nd gain of velocity loop', std: '2000', data: 'p36_servo_106' },
                            { no: '107', name: '2nd time constant of velocity loop integration', std: '60', data: 'p36_servo_107' },
                            { no: '108', name: '2nd filter of speed detection', std: '4', data: 'p36_servo_108' },
                            { no: '109', name: '2nd time constant of torque filter', std: '50', data: 'p36_servo_109' },
                            { no: '114', name: '2nd gain setup', std: '1', data: 'p36_servo_114' },
                            { no: '120', name: 'Mode of velocity control switching', std: '2', data: 'p36_servo_120' },
                            { no: '201', name: '1st Notch frequency', std: '145', data: 'p36_servo_201' },
                            { no: '204', name: '2nd notch frequency', std: '5000', data: 'p36_servo_204' },
                            { no: '302', name: 'Input gain of speed comand', std: '222', data: 'p36_servo_302' },
                            { no: '303', name: 'Reversal of speed command input', std: '1', data: 'p36_servo_303' },
                            { no: '314', name: 'Sigmoid acceleration / deceleration time setup', std: '0', data: 'p36_servo_314' },
                            { no: '422', name: 'Speed reference offset', std: '0 \u00B1 150 ***', data: 'p36_servo_422' },
                            { no: '522', name: '2nd torque limit', std: '300', data: 'p36_servo_522' },
                            { no: '525', name: 'External input positive direction torque limit', std: '300', data: 'p36_servo_525' },
                            { no: '526', name: 'External input negative direction torque limit', std: '300', data: 'p36_servo_526' },
                        ]}
                    />

                    {/* adjustment section 39.1 */}
                    <div className="mt-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center pr-10 relative">
                            <SectionTitle>39.1 Adjust Parameter 422 "Speed reference offset"</SectionTitle>
                            <div className="absolute top-0 right-0">
                                <FormCheckedBox name="p36_adjust_sig" label="Checked by :" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <FormItemCheck name="p36_step1_check" label={<span className="text-xs">1. Manage - Parameter - Machine 3/12 : MANUAL WIRE FEED SPEED = 100 ==&gt; 000</span>} />

                            <FormItemCheck name="p36_step2_check" label={<span className="text-xs">2. Press "FEED" button on sub-panel</span>} />

                            <div className="flex gap-10 items-start ml-5">
                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs">3. If Feed Roller rolls CW</span>
                                        <img src={imgCW} alt="CW" className="h-4 border border-gray-300" />
                                        <span className="text-xs">,increase "PA 422" value.(เพิ่มค่าที่ PA422)</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs">If Feed Roller rolls CCW</span>
                                        <img src={imgCCW} alt="CCW" className="h-4 border border-gray-300" />
                                        <span className="text-xs">,decrease "PA 422" value.(ลดค่าที่ PA422)</span>
                                    </div>
                                    <FormItemCheck name="p36_step3_ok" label={<span className="text-xs">If Feed Roller rolls stops, ==&gt; OK</span>} />
                                </div>

                                {/* Save Instruction Image */}
                                <img src={imgSaveInstruction} alt="Save Instructions" className="w-[190px] absolute bottom-2 right-5 absolute bottom-10" />
                            </div>

                            <FormItemCheck name="p36_step4_check" label={<span className="text-xs">4. Manage - Parameter - Machine 3/12 : MANUAL WIRE FEED SPEED = 000 ==&gt; 100</span>} />

                            <FormItemCheck name="p36_step5_check" label={<span className="text-xs">5. Press "FEED" button on sub-panel for Recheck ( กดปุ่ม FEED ที่ sub-panel เพื่อทดสอบการ FEED ลวด )</span>} />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page36;