import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

import imgRegulator from '@/assets/FAWI0002_V3/image-33-1.JPG';
import imgTerminalCenter from '@/assets/FAWI0002_V3/image-33-2.JPG';
import imgAirControls from '@/assets/FAWI0002_V3/image-33-3.JPG';

function Page32() {
    return (
        <A4Paper content={content} currentPage={32}>
            <div>

                <SectionTitle>33. Reverse Regulator Check</SectionTitle>

                <div className="ml-5 flex flex-col gap-4">

                    {/* Air Pressure and Regulator Adjustment */}
                    <div className="flex flex-col gap-2">
                        <FormItemCheck
                            name="p32_adjust_main_air"
                            label={<span className="text-sm">Adjust main air pressure "0.5 MPa" at Supply Tank.</span>}
                        />
                        <FormItemCheck
                            name="p32_adjust_reverse_regulator"
                            label={
                                <div className="text-sm">
                                    <p>Adjust reverse regulator as ① and ② is satisfied. (STD About 0.4~0.45 Mpa)</p>
                                    <p>ปรับ reverse regulator แล้วทำให้ได้ตามข้อ ① และ ② (STD ประมาณ 0.4~0.45 Mpa)</p>
                                </div>
                            }
                        />
                    </div>

                    <div className="flex items-center gap-10 ml-10">
                        <img src={imgRegulator} alt="Reverse Regulator" className="h-44 object-contain rounded border border-gray-200" />
                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p32_regulator_input_check"
                                showCheckbox={false}
                                label={<span className="text-sm font-bold">ค่าที่ปรับได้</span>}
                                input={{
                                    name: "p32_regulator_val",
                                    width: "120px",
                                    suffix: "Mpa",
                                    minStd: "0.4",
                                    maxStd: "0.45"
                                }}
                            />
                            <p className="text-[11px] text-gray-500 ml-7">(STD 0.4~0.45 Mpa)</p>
                        </div>
                    </div>

                    {/* Check 1 */}
                    <div className="mt-4 flex flex-col gap-2">
                        <FormItemCheck
                            name="p32_check_1"
                            label={
                                <div className="text-sm">
                                    <p>Check ① : Pipe Terminal must keep its position, when pipe stays at the middle of the stroke.</p>
                                    <p>เลื่อน Pipe Terminal มาอยู่กึ่งกลาง , Pipe Terminal ต้องอยู่นิ่ง ไม่เลื่อนขึ้นหรือลง</p>
                                </div>
                            }
                        />
                        <div className="flex justify-center my-2">
                            <img src={imgTerminalCenter} alt="Terminal at Center" className="h-44 object-contain" />
                        </div>
                    </div>

                    {/* Check 2 */}
                    <div className="mt-2 flex flex-col gap-2">
                        <FormItemCheck
                            name="p32_check_2"
                            label={
                                <div className="text-sm">
                                    <p>Check ② : Pipe Terminal must keep the lower limit positin, when press "AIR" button with pipe air valve is full open.</p>
                                    <p>เปิด Air Valve ให้สุด แล้วเลื่อน Pipe Terminal ให้อยู่ในตำแหน่งต่ำสุด แล้วกดปุ่ม AIR ที่ Sub Panel ตรวจสอบ Pipe Terminal ต้องอยู่นิ่ง ไม่เลื่อนขึ้น</p>
                                </div>
                            }
                        />
                        <div className="flex justify-center items-end gap-2 mt-2 px-10">
                            <img src={imgAirControls} alt="Air Controls Diagram" className="w-full object-contain" />
                        </div>
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page32;