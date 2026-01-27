import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images for section 18
import img18_1 from '@/assets/FAWI0002_V3/image-18-1.JPG';
import img18_2 from '@/assets/FAWI0002_V3/image-18-2.JPG';
import img18_3 from '@/assets/FAWI0002_V3/image-18-3.JPG';

function Page18() {
    const rdiRows = [
        { label: 'X', pos: 'Z = Max , YUV = Center', std: '(STD = 1.3 ~ - 1.3)', prefix: 'p18_rdi_x', maxStd: 1.3, minStd: -1.3 },
        { label: 'Y', pos: 'Z = Max , XUV = Center', std: '(STD = 1.6 ~ - 1.6)', prefix: 'p18_rdi_y', maxStd: 1.6, minStd: -1.6 },
        { label: 'Z', pos: 'XYUV = Center', std: '(STD = 2.3 ~ 0.0)', prefix: 'p18_rdi_z', maxStd: 2.3, minStd: 0.0 },
        { label: 'U(1)', pos: 'Z = Max , XYV = Center', std: '(STD = 0.9 ~ - 0.9)', prefix: 'p18_rdi_u1', maxStd: 0.9, minStd: -0.9 },
        { label: 'U(2)', pos: 'Z = Min , XYV = Center', std: '(STD = 0.9 ~ - 0.9)', prefix: 'p18_rdi_u2', maxStd: 0.9, minStd: -0.9 },
        { label: 'V', pos: 'Z = Max , XYU = Center', std: '(STD = 1.7 ~ - 1.7)', prefix: 'p18_rdi_v', maxStd: 1.7, minStd: -1.7 },
    ];

    return (
        <A4Paper content={content} currentPage={18}>
            <div className="flex flex-col text-[13px]">
                <SectionTitle className="text-sm font-bold">17. RDI Check (ต้องประกอบ Discharge Cable แล้ว)</SectionTitle>

                <div className="flex flex-col ml-5">

                    {rdiRows.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-[30px_140px_140px_170px_120px] gap-5 items-center font-arial h-8">
                            <div className="font-bold w-15 ">{row.label} :</div>
                            <div className="flex items-center">
                                <FormInputCheckSTD
                                    name={`${row.prefix}_max`}
                                    label="MAX ="
                                    maxStd={row.maxStd}
                                    minStd={row.minStd}
                                    inputWidth="w-[70px]"
                                    unit=""
                                />
                            </div>
                            <div className="flex items-center">
                                <FormInputCheckSTD
                                    name={`${row.prefix}_min`}
                                    label="MIN ="
                                    maxStd={row.maxStd}
                                    minStd={row.minStd}
                                    inputWidth="w-[70px]"
                                    unit=""
                                />
                            </div>
                            <div className="text-gray-500 text-[11px] text-center">
                                {row.pos.split(',').map((p, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span> , </span>}
                                        <span dangerouslySetInnerHTML={{ __html: p.replace(/=/g, '&#8801;') }} />
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="text-[11px] text-right pr-4 italic">
                                {row.std}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 17.1 Z-Axis overload check */}
                <div className="flex flex-col ml-8 mt-6 gap-2 font-arial">
                    <div className="text-[14px]">17.1 Z - Axis overload check</div>
                    <div className="ml-6 flex flex-col gap-2 italic">
                        <div className="text-[13px]">- Move Z สุด stroke แล้วรอเวลาประมาณ 30 วินาที ==&gt; Stop</div>
                        <div className="relative flex items-end gap-12 not-italic">
                            <div className="flex items-center">
                                <FormInputCheckSTD
                                    name="p18_z_overload_data"
                                    label="- Data ="
                                    maxStd={1.8}
                                    minStd={0}
                                    inputWidth="w-[100px]"
                                    unit="A"
                                />
                            </div>
                            <div className="text-[11px] italic text-gray-600 pb-1">(STD = 1.8 A (MAX))</div>
                            <div className="absolute top-[-70px] right-[50px] flex items-center">
                                <FormCheckedBox name="p18_z_overload_checked_by" label="Checked by :" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 18. Position of Slide Tank Check */}
                <div className="flex flex-col mt-4">
                    <SectionTitle className="text-sm font-bold">18. Position of Slide Tank Check (ระยะระหว่าง Slide tank กับ Workstand)</SectionTitle>
                    <div className=" mt-2 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="font-arial text-sm ml-5">18.1 Distance between Slide Tank and Work Stand</div>
                            <div className="text-sm ml-10 italic">ค่าทั้ง 2 ข้างต้องอยู่ใน Std 2 ข้างต่างกันละไม่เกิน 1 mm.</div>

                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <FormInputCheckSTD
                                        name="p18_slide_down_l"
                                        label="ระยะที่วัดได้จากด้าน L ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                    <FormInputCheckSTD
                                        name="p18_slide_down_r"
                                        label="ระยะที่วัดได้จากด้าน R ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <img src={img18_1} alt="Slide Tank Down" className="h-25 object-contain" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="font-arial text-sm ml-5">18.2 Distance between Slide Tank and Work Stand <span className="underline italic ml-2">ค่าทั้ง 2 ข้างต้องอยู่ใน Std 2 ข้างต่างกันละไม่เกิน 1 mm.</span></div>

                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <FormInputCheckSTD
                                        name="p18_slide_mid_l"
                                        label="ระยะที่วัดได้จากด้าน L ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                    <FormInputCheckSTD
                                        name="p18_slide_mid_r"
                                        label="ระยะที่วัดได้จากด้าน R ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <img src={img18_2} alt="Slide Tank Middle" className="h-25 object-contain" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="font-arial text-sm ml-5">18.3 Distance between Slide Tank and Work Stand <span className="underline italic ml-2">ค่าทั้ง 2 ข้างต้องอยู่ใน Std 2 ข้างต่างกันละไม่เกิน 1 mm.</span></div>

                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <FormInputCheckSTD
                                        name="p18_slide_up_l"
                                        label="ระยะที่วัดได้จากด้าน L ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                    <FormInputCheckSTD
                                        name="p18_slide_up_r"
                                        label="ระยะที่วัดได้จากด้าน R ="
                                        unit="mm"
                                        inputWidth="w-20"
                                    />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <img src={img18_3} alt="Slide Tank Up" className="h-40 object-contain" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <FormItemCheck name="p18_sound_check" label="ตรวจสอบความผิดปกติของเสียงในระหว่างการทดสอบ SLIDE TANK" className="font-bold text-[13px]" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page18;