import React, { useEffect } from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import imgBlockA from '@/assets/FAMB0007_V3/FAMB0007-21-3.PNG';
import imgBlockB from '@/assets/FAMB0007_V3/FAMB0007-21-5.PNG';
import { useFormContext, useWatch } from 'react-hook-form';

function Page10() {
    const { setValue } = useFormContext();
    const isNA = useWatch({ name: 'p10_na' }) === 'N/A';

    // Automated N/A logic
    useEffect(() => {
        if (isNA) {
            const fieldsToNA = [
                'p10_21_1_check',
                'p10_21_2_check',
                'p10_21_3_check',
                'p10_21_4_check',
                'p10_21_5_check',
                'p10_21_6_check'
            ];
            fieldsToNA.forEach(field => setValue(field, 'N/A'));

            const inputsToDash = [
                'p10_21_1_val',
                'p10_21_4_val',
                'p10_21_6_front',
                'p10_21_6_side'
            ];
            inputsToDash.forEach(field => setValue(field, '-'));
        }
    }, [isNA, setValue]);
    return (
        <A4Paper content={content} currentPage={10}>
            <div className="h-full relative flex flex-col p-4 text-sm relative">
                {/* Header Section */}
                <div className="flex gap-2 items-center mb-4">
                    <p className="font-bold text-base">21. Check point of option : Middle guide</p>
                    <div className="flex items-center gap-2">
                        <FormItemCheck name="p10_na" label="N/A" />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* 21.1 */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <FormItemCheck
                            name="p10_21_1_check"
                            label="21.1 ระยะยืดสปริงของ Wire Rope A ="
                            readOnly={isNA}
                        />
                        <FormInputCheckSTD
                            name="p10_21_1_val"
                            label=""
                            unit="mm"
                            inputWidth="w-20"
                            disabled={isNA}
                            minStd={35}
                            maxStd={35}
                        />
                        <span>(SD = 35 mm)</span>
                    </div>

                    {/* 21.2 */}
                    <FormItemCheck
                        name="p10_21_2_check"
                        label="21.2 Move แกน Z ขึ้นไปด้านบน (+) จนสุด stroke หัวด้านบนของ Adjust bolt ต้องไม่ชนกับ Pulley"
                        readOnly={isNA}
                    />

                    {/* 21.3 */}
                    <div className="space-y-2">
                        <FormItemCheck
                            name="p10_21_3_check"
                            label="21.3 I-Mark ที่ adjust Bolt ทั้ง 2 ตัว ของ Belt Link Block A เมื่อปรับเสร็จแล้ว"
                            readOnly={isNA}
                        />
                        <div className="flex justify-center">
                            <img src={imgBlockA} alt="Belt Link Block A" className="w-100 object-contain" />
                        </div>
                    </div>

                    {/* 21.4 */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <FormItemCheck
                            name="p10_21_4_check"
                            label="21.4 ระยะยืดสปริงของ Wire Rope B ="
                            readOnly={isNA}
                        />
                        <FormInputCheckSTD
                            name="p10_21_4_val"
                            label=""
                            unit="mm"
                            inputWidth="w-20"
                            disabled={isNA}
                            minStd={35}
                            maxStd={35}
                        />
                        <span>(SD = 35 mm)</span>
                    </div>

                    {/* 21.5 */}
                    <div className="space-y-2">
                        <FormItemCheck
                            name="p10_21_5_check"
                            label="21.5 I-Mark ที่ adjust Bolt ทั้ง 2 ตัว ของ Belt Link Block B เมื่อปรับเสร็จแล้ว"
                            readOnly={isNA}
                        />
                        <div className="flex justify-center">
                            <img src={imgBlockB} alt="Belt Link Block B" className="w-100" />
                        </div>
                    </div>

                    {/* 21.6 */}
                    <div className="space-y-2">
                        <FormItemCheck
                            name="p10_21_6_check"
                            label="21.6 การเช็คความขนาน (Parallel) ของ Middle Guide [SD = ± 100 μm]"
                            readOnly={isNA}
                        />
                        <div className="pl-10 space-y-2">
                            <div className="flex items-center gap-2">
                                <span>ค่า Parallel ด้านหน้า (Front) =</span>
                                <FormInputCheckSTD
                                    name="p10_21_6_front"
                                    label=""
                                    unit="μm"
                                    minStd={-100}
                                    maxStd={100}
                                    inputWidth="w-32"
                                    disabled={isNA}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>ค่า Parallel ด้านข้าง (Side) =</span>
                                <FormInputCheckSTD
                                    name="p10_21_6_side"
                                    label=""
                                    unit="μm"
                                    minStd={-100}
                                    maxStd={100}
                                    inputWidth="w-32"
                                    disabled={isNA}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto pt-8 flex justify-end absolute bottom-[-70px] right-10">
                    <FormCheckedBox label="Check By/Date" name="p10_check_by_date" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page10;