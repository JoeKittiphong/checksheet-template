import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page4() {
    return (
        <A4Paper content={content} currentPage={4}>
            <div className="">
                <SectionTitle>6. Run Program Full Stroke for Re-Check Cable and Hose</SectionTitle>
                <p className='text-sm mb-4'>(รันโปรแกรม Full Stroke เพื่อตรวจสอบสาย Cable และ Hose)</p>

                <div className="space-y-6">
                    {/* Upper side */}
                    <div className="ml-4">
                        <FormItemCheck name="p4_check_upper_1" label="6.1 Run Program Full Stroke Check" />
                        <div className="space-y-2 ml-4">
                            <FormItemCheck name="p4_check_upper_1" label="6.1.1 Full_Stroke_Check_AL400G สำหรับเครื่องจักร AL400G" />
                            <FormItemCheck name="p4_check_upper_2" label="6.1.2 Full_Stroke_Check_AL600G สำหรับเครื่องจักร AL600G" />
                        </div>
                    </div>

                    {/* Lower side */}
                    <div className="ml-4">
                        <SectionTitle className="mb-2 underline">In Front of Machine Side (ด้านหน้าเครื่องจักร)</SectionTitle>
                        <FormItemCheck name="p4_check_lower_1" label="6.2 ตรวจสอบสำย Discharge Cable & Cable of Lower Guide ภำยใน Process Tank" />
                        <div className="space-y-2 ml-4">
                            <FormItemCheck name="p4_check_lower_2" label="ที่ตำแหน่ง (Z-) สุด Stroke" />
                        </div>
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;