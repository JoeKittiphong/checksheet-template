import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page25() {
    return (
        <A4Paper content={content} currentPage={25}>
            <div className="flex flex-col gap-6 p-2">
                <SectionTitle>26. Sink Sensor & Parameter Check</SectionTitle>

                <div className="ml-5 flex flex-col gap-8">
                    {/* Item 1 */}
                    <FormItemCheck
                        name="p25_sensor_filling_check"
                        label={
                            <div className="text-sm">
                                <p>เมื่อเปิดน้ำขึ้น Tank ==&gt; Sensor No.1 "ON" ==&gt; Flushing Pump "OFF" ==&gt;</p>
                                <p>ยังมีน้ำ support อยู่ ==&gt; Sensor No.2 "ON" ==&gt; Drain Shutter (ด้านขวา) "OPEN" ==&gt;</p>
                                <p>Sensor No.2 "OFF" ==&gt; Drain Shutter(ด้านขวา) "CLOSE"</p>
                            </div>
                        }
                    />

                    {/* Item 2 */}
                    <FormItemCheck
                        name="p25_sensor_z_move_check"
                        label={
                            <div className="text-sm">
                                <p>ใช้ G959 move Z=150(เปิดน้ำขึ้น Tank) ==&gt; ใช้โปรแกรม move Z=50 ==&gt; Z move down ==&gt;</p>
                                <p>Sensor No.3 "ON" ==&gt; Z "STOP" ==&gt; Drain Shutter (ด้านซ้าย-ขวา) "OPEN" ==&gt;</p>
                                <p>Sensor No.3 "OFF" ==&gt; Drain Shutter(ด้านซ้าย) "CLOSE" ==&gt; Sensor No.2 "OFF" ==&gt;</p>
                                <p>Drain Shutter(ด้านขวา) "CLOSE" ==&gt; Z move down</p>
                            </div>
                        }
                    />

                    {/* Item 3 */}
                    <div className="flex flex-col gap-2">
                        <FormItemCheck
                            name="p25_param_check"
                            label={<span className="text-sm">Data Manage - Parameter - Check</span>}
                        />
                        <div className="ml-10 flex flex-col gap-2 text-sm">
                            <p>- 0442Hb [#87097] เปลี่ยนจาก 00 เป็น 01 เมื่อน้ำท่วมถึง Sensor No.2</p>
                            <p>- 0442Hc [#87098] เปลี่ยนจาก 00 เป็น 01 เมื่อน้ำท่วมถึง Sensor No.3</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <FormItemCheck
                        name="p25_water_level_sensor_check"
                        label={<span className="text-sm">ตรวจสอบว่าน้ำขึ้น-ลงตาม Sensor หรือไม่ โดยใช้โปรแกรม move แกน Z ขึ้น-ลง</span>}
                    />
                </div>

                {/* Signature */}
                <div className="mt-auto flex justify-end pr-10 mb-10">
                    <FormCheckedBox name="p25_checked_sig" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page25;