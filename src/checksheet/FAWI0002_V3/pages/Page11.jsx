import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

// Images
import img10_11 from '@/assets/FAWI0002_V3/image-10-1.JPG';
import img10_1 from '@/assets/FAWI0002_V3/image-10-1-1.JPG';
import img10_2 from '@/assets/FAWI0002_V3/image-10-2.JPG';
import img11_0 from '@/assets/FAWI0002_V3/image-11-0.JPG';
import img11_1 from '@/assets/FAWI0002_V3/image-11-1.JPG';
import img11_2 from '@/assets/FAWI0002_V3/image-11-2.JPG';
import img12_0 from '@/assets/FAWI0002_V3/image-12-0.JPG';

function Page11() {
    return (
        <A4Paper content={content} currentPage={11}>
            <div className="flex flex-col gap-4 text-[11px]">
                {/* Section 10 */}
                <SectionTitle>10. Conductivity Piece Check</SectionTitle>
                <div className="grid grid-cols-2 ml-4">
                    <div className="flex flex-col items-center">
                        <FormItemCheck name="p11_cond_upper_check" label="Upper Guide" />
                        <img src={img10_1} alt="Upper Guide" className="h-20 w-auto" />
                    </div>
                    <div className="flex flex-col items-center">
                        <FormItemCheck name="p11_cond_lower_check" label="Lower Guide" />
                        <img src={img10_2} alt="Lower Guide" className="h-20 w-auto" />
                    </div>
                </div>
                <p className="text-center font-bold mt-2">กำหนดค่า Torque ที่ 15 kgf.cm และทำการ Lock screw</p>

                {/* Section 10.1 */}
                <SectionTitle>10.1 Upper , Lower Guide O-Ring Check</SectionTitle>
                <div className="flex items-start gap-4 ml-4">
                    <div className="">
                        <img src={img10_11} alt="img10_11" className="h-20 w-auto" />
                    </div>
                    <div className=" flex-1">
                        <FormItemCheck
                            name="p11_oring_upper_check"
                            label={<span><span className="font-bold">Upper guide</span><br />1.) Check O-ring S22 และ S39 ว่าไม่หลุดออกจากร่องของ Nozzle Base NS</span>}
                        />
                        <FormItemCheck
                            name="p11_oring_lower_check"
                            label={<span><span className="font-bold">Lower guide</span><br />2.) Check O-ring S32 ไม่หลุดออกจากร่องของ Nozzle Base L</span>}
                        />
                    </div>
                </div>

                {/* Section 11 */}
                <SectionTitle>11. Distance Acrylic Pipe Check <span className="text-[9px] font-normal">(ตรวจสอบระยะห่างระหว่าง Aspirator Nozzle B กับ Acrylic Pipe)</span></SectionTitle>
                <div className="flex items-center">
                    <img src={img11_0} alt="Distance Check" className="h-25 w-auto" />
                    <div className="flex-1">
                        <FormInputCheckSTD
                            name="p11_dist_acrylic_pipe"
                            label={<p>"- ตรวจสอบระยะห่างระหว่าง Aspirator Block กับ Acrylic Pipe ระยะ ="</p>}
                            unit=""
                            minStd={14}
                            maxStd={16}
                            inputWidth="w-10"
                        />
                        <span className="ml-2 font-bold">(STD = 14-16mm)</span>
                    </div>
                </div>

                {/* Section 11.1 */}
                <SectionTitle>11.1 Upper Guide Level Check</SectionTitle>
                <p className="font-bold">- Upper Guide Level check</p>
                <div className="flex items-start ml-4 mt-1">
                    <div className="flex">
                        <div className="space-y-2">
                            <FormInputCheckSTD
                                name="p11_level_x"
                                label="X ="
                                unit="µm (STD : Diff ≤ 10 µm/20mm)"
                                maxStd={10}
                                inputWidth="w-20"
                            />
                            <FormInputCheckSTD
                                name="p11_level_y"
                                label="Y ="
                                unit="µm (STD : Diff ≤ 10 µm/20mm)"
                                maxStd={10}
                                inputWidth="w-20"
                            />
                            <FormItemCheck
                                name="p11_set_screw_check"
                                label={<span className="text-[10px] leading-tight font-medium">ตรวจสอบ Set Screw ต้อง lock แน่น Double Set Screw (4 Pcs.) <br /> (การถอด Set scew จุดนี้ ต้องถอดตัวด้านนอกออกก่อน แล้วล็อคตัวด้านในให้แน่น <br />จากนั้นค่อยล็อคตัวด้านนอกให้แน่นอีกครั้ง)</span>}
                            />
                        </div>
                        <div className="flex gap-2">
                            <img src={img11_1} alt="Level Axis" className="h-30 w-auto" />
                            <img src={img11_2} alt="Set Screw" className="h-24 w-auto" />
                        </div>
                    </div>
                </div>

                {/* Section 12 */}
                <FormItemCheck
                    name="p11_discharge_cable_check"
                    label={<span className="font-bold text-sm">12. Ass'y Discharge Cable</span>}
                />
                <div className='flex gap-23 items-center'>
                    <div className="flex flex-col ml-10">
                        <img src={img12_0} alt="Cable Check" className="w-60" />
                        <div className="flex-1 italic text-gray-700">
                            <span className="underline font-bold text-black text-[10px]">ตรวจสอบรอยขีดข่วน</span> และต้องประกอบสายไฟ<br />
                            ให้ครบทุกเส้น (***ถ้าพบรอยขีดข่วนให้แจ้งหัวหน้าทันที)
                        </div>
                    </div>

                    <FormCheckedBox name="p11_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page11;