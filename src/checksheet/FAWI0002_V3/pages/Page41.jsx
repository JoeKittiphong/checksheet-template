import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

// Import assets
import image45_51 from '@/assets/FAWI0002_V3/image-45-51.JPG';
import image45_52 from '@/assets/FAWI0002_V3/image-45-52.JPG';
import image47 from '@/assets/FAWI0002_V3/image-47.JPG';

function Page41() {
    return (
        <A4Paper content={content} currentPage={41}>
            <div>
                {/* 45.5 Wire Size Check */}
                <div className="flex flex-col mb-5">
                    <FormItemCheck
                        name="p41_45_5_group_check"
                        label={<span className="text-sm font-bold">45.5 ตรวจสอบขนาดของลวดที่ผ่านออกมา (No Cutting)</span>}
                    />

                    <div className="flex gap-4 items-start pl-6">
                        <div className="flex-1">
                            <FormQuickTable
                                columns={[
                                    { header: 'Ø Wire (mm)', key: 'wire', width: '100px', isLabel: true },
                                    { header: 'WT', key: 'wt', width: '60px', isLabel: true },
                                    { header: 'WS', key: 'ws', width: '60px', isLabel: true },
                                    { header: 'STD (mm)', key: 'std', width: '120px', isLabel: true },
                                    { header: 'Measure (mm)', key: 'measure', type: 'input', width: '100px' }
                                ]}
                                data={[
                                    { wire: '0.20', wt: '120', ws: '100', std: '0.1450 ~ 0.1550', measure: 'p41_45_5_m1', measure_min: 0.1450, measure_max: 0.1550 },
                                    { wire: '0.25', wt: '160', ws: '100', std: '0.1900 ~ 0.2000', measure: 'p41_45_5_m2', measure_min: 0.1900, measure_max: 0.2000 }
                                ]}
                            />
                        </div>
                        <img src={image45_51} alt="Wire Section" className="h-20 object-contain" />
                    </div>

                    <div className="pl-6 flex gap-4 items-start mt-2 relative">
                        <img src={image45_52} alt="Corrective Action" className="h-40 object-contain" />
                        <div className="flex-1 text-[11px]">
                            <p className="font-bold underline">Corrective Action (การแก้ไข)</p>
                            <p className="mt-1 font-bold">{'>>'} Ø 0.20  (STD = 0.145 ~ 0.155 mm)</p>
                            <p className="ml-4">If Ø (mm) {'<'} 0.145 mm {'=>'} หมุนตำแหน่ง A ทวนเข็มนาฬิกา</p>
                            <p className="ml-4">Or Ø (mm) {'>'} 0.155 mm {'=>'} หมุนตำแหน่ง A ตามเข็มนาฬิกา</p>

                            <p className="mt-2 font-bold">{'>>'} Ø 0.25  (STD = 0.190 ~ 0.200 mm)</p>
                            <p className="ml-4">If Ø (mm) {'<'} 0.190 mm {'=>'} หมุนตำแหน่ง A ทวนเข็มนาฬิกา</p>
                            <p className="ml-4">Or Ø (mm) {'>'} 0.200 mm {'=>'} หมุนตำแหน่ง A ตามเข็มนาฬิกา</p>

                            <div className="mt-2 text-[10px] italic text-gray-700">
                                <p><span className="font-bold">Note : </span>ถ้าหมุนตำแหน่ง A 1/4 รอบ {'=>'} ขนาดของลวดจะเพิ่ม/ลด ประมาณ 3 µm</p>
                                <p className="ml-10">: หลังจากปรับขนาดของลวดได้แล้วให้ล็อค Hex. Nut ด้วย</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-1 px-4 absolute bottom-10 right-[-20px]">
                            <FormCheckedBox name="p41_45_5_checked" label="Checked by :" className="w-1/3" />
                        </div>
                    </div>

                </div>

                {/* 46. Alignment Check */}
                <div className="flex flex-col mb-5">
                    <SectionTitle>46. Alignment Check <span className="text-xs font-normal normal-case">(Use AVC Unit : Condition no. C777 Upper - Lower Guide = 60mm)</span></SectionTitle>
                    <div className="pl-6 text-[12px]">
                        <p>- Wire 0.2  WT = 120 (1200g) or Wire 0.25  WT = 150 (1500g),  WS = 50</p>
                        <p>  G01 X -100. OR G01 Y100</p>

                        <div className="flex gap-10 mt-2 items-end relative">
                            <FormQuickTable
                                columns={[
                                    { header: 'Axis', key: 'axis', width: '80px', isLabel: true },
                                    { header: 'STD (mm)', key: 'std', width: '120px', isLabel: true },
                                    { header: 'Measure (mm)', key: 'measure', type: 'input', width: '100px' }
                                ]}
                                data={[
                                    { axis: 'U', std: '73.0 ~ 77.0', measure: 'p41_46_u_val', measure_min: 73.0, measure_max: 77.0 },
                                    { axis: 'V', std: '73.0 ~ 77.0', measure: 'p41_46_v_val', measure_min: 73.0, measure_max: 77.0 }
                                ]}
                            />
                            <div className="flex-1 flex justify-end absolute bottom-0 right-0">
                                <FormCheckedBox name="p41_46_checked" label="Checked by :" className="w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 47. Lower Guide Distance Check */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>47. Lower Guide Distance Check</SectionTitle>
                    <div className="pl-6 text-[12px]">
                        <p>Distance between Lower Guide and Work Stand Check. (วัดระยะห่าง Lower Guide โดยอ้างอิงจากเส้นลวด)</p>

                        <div className="flex gap-6 mt-2 items-start">
                            <img src={image47} alt="Lower Guide Distance" className="h-32 object-contain border border-gray-200" />
                            <div className="flex-1">
                                <FormQuickTable
                                    columns={[
                                        { header: 'Axis', key: 'axis', width: '80px', isLabel: true },
                                        { header: 'Standard (mm)', key: 'std', width: '120px', isLabel: true },
                                        { header: 'Measure (mm)', key: 'measure', type: 'input', width: '100px' }
                                    ]}
                                    data={[
                                        { axis: 'X+', std: '9 ~ 11', measure: 'p41_47_x_plus', measure_min: 9, measure_max: 11 },
                                        { axis: 'X-', std: '9 ~ 11', measure: 'p41_47_x_minus', measure_min: 9, measure_max: 11 },
                                        { axis: 'Y+', std: '19 ~ 21', measure: 'p41_47_y_plus', measure_min: 19, measure_max: 21 },
                                        { axis: 'Y-', std: '9 ~ 11', measure: 'p41_47_y_minus', measure_min: 9, measure_max: 11 }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-x-10">
                            <div className="flex flex-col gap-1 px-4">
                                <p className="text-[11px] font-bold mb-1">- Record data Manage - Parameter - Axis</p>
                                <FormInputCheckSTD
                                    name="p41_47_se_x_plus"
                                    label="Page 1 : STROKE EXPANSION X (+) ="
                                    inputWidth="w-20"
                                />
                                <FormInputCheckSTD
                                    name="p41_47_se_y_plus"
                                    label="Page 2 : STROKE EXPANSION Y (+) ="
                                    inputWidth="w-20"
                                />
                            </div>
                            <div className="flex flex-col gap-1 pt-6 px-4">
                                <FormInputCheckSTD
                                    name="p41_47_se_x_minus"
                                    label=": STROKE EXPANSION X (-) ="
                                    inputWidth="w-20"
                                />
                                <FormInputCheckSTD
                                    name="p41_47_se_y_minus"
                                    label=": STROKE EXPANSION Y (-) ="
                                    inputWidth="w-20"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-2">
                            <FormCheckedBox name="p41_47_checked" label="Checked by :" className="w-1/3" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page41;