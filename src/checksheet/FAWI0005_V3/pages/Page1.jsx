
import React, { useEffect } from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import EquationBox from '@/components/FormComponents/EquationBox';


function Page1() {
    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col text-[11px] h-full relative">

                {/* Header Section */}
                <div className="flex justify-between items-end">
                    <SectionTitle className="mt-0 w-max">1. Resistivity Check</SectionTitle>
                    <span className="text-xs font-bold">(For New_AL Machine with CMPH-31 + WIO-03(AC))</span>
                </div>

                {/* 1.1 Setting Check */}
                <div className="mt-2 pl-2">
                    <div className="flex justify-between items-center">
                        <FormItemCheck name="p1_setting_check" label="1.1  Setting Check" showCheckbox={true} className="font-bold" />
                        <span className="font-bold mr-4">・ ・ ・ Ref.Z21-0012</span>
                    </div>

                    <div className="flex justify-between pl-8 pr-4">
                        <div className="flex flex-col gap-1">
                            <p>Machine-P1-MAX RESISTIVITY1= 52000 <span className="ml-8 text-[10px] text-gray-600">After resistivity circuit change (AC)</span></p>
                            <p className="font-bold">Machine-P1-MIN RESISTIVITY1= 50000</p>
                            <p>Machine-P8-HI LIMIT RESISTIVITY1= 5000 <span className="ml-10 text-[10px] text-gray-600">Prior to resistivity change (DC)</span></p>
                            <p className="font-bold mt-1">Secret-P3-MACHINE FANCION 3 = 000111<br/><p>= 100111 (With CMPH-05, in a non-operating CMPH-05</p></p>
                            <p className="ml-24"></p>
                        </div>
                        <div className="bg-green-500 border border-black p-2 h-max text-xs font-bold leading-relaxed">
                            <p>Machine-P3-RESISTIVITY ADJUSTMENT= 1 (Initial value)</p>
                            <p>Machine-P4-RESISTIVITY OFFSET= +10</p>
                        </div>
                    </div>
                </div>

                {/* 2. Adjustment Water Resistivity */}
                <div className="mt-4">
                    <SectionTitle className="mt-0 w-max">2. Adjustment Water Resistivity</SectionTitle>

                    <div className="pl-4 flex flex-col gap-2 mt-2">
                        <p>2.1.1 Enter the resistivity of LCD as follows: =={'>'} (a)</p>
                        <p>2.1.2 Measure the resistivity value in the intermediate tank of the service tank and fill in the following. <p>=={'>'} (b) (using a portable water quality measuring instrument)</p> </p>

                        {/* Calculation 1: (a) - (b) */}
                        <div>
                            <p>2.1.3 Culculate      (a) - (b)   Value and record to below.=={'>'} (c)</p>
                            <EquationBox
                                labelLeft="(a)  LCD Value"
                                operator="-"
                                labelRight="(b)  Supply Tank Value"
                                labelResult="(c)  Result of culculate"
                                nameLeft="p1_cal1_a"
                                nameRight="p1_cal1_b"
                                nameResult="p1_cal1_c"
                                minStd={-1000}
                                maxStd={1000}
                                stdText="(STD -1000 ~ +1000)"
                            />
                            <p className="mt-1">Go to [2.1.4] , if Calculate Value is [Under-1001] or [Over+1001].</p>
                            <p className="ml-8">Go to [2.1.10] , if Calculate Value is STD (-1000 ~ +1000).</p>
                        </div>

                        {/* Calculation 2: (a) / (b) */}
                        <div>
                            <p>2.1.4 Culculate      (a) ÷ (b)   Value and record to below.=={'>'} (d)</p>
                            <EquationBox
                                labelLeft="(a)  LCD Value"
                                operator="÷"
                                labelRight="(b)  Supply Tank Value"
                                labelResult="(d)  Result of culculate"
                                nameLeft="p1_cal2_a"
                                nameRight="p1_cal2_b"
                                nameResult="p1_cal2_d"
                                minStd={0.60}
                                maxStd={1.40}
                                stdText="(STD 0.60 ~ 1.40)"
                            />
                            <p className="mt-1">Check Resistivity Senser or setting Value, if Culculate Value is [Under 0.599] or [Over 1.401].</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="font-bold">2.1.5  Input (d) Value to   "Manage-Parameter-Machine-P3-RESISTIVITY ADJUSTMENT"</p>
                            <p>2.1.6  Wait about 1 minutes after you change setting. ให้รอประมาณ 1 นาที หลังจากที่เปลี่ยนค่า setting</p>
                            <p>2.1.7  Record Resistivity on LCD to below.=={'>'} (u)</p>
                            <p>2.1.8  Measure and Record Resistivity at Supply tank to below. (Use handy type Resistivity tester) =={'>'} (v)</p>
                        </div>

                        {/* Calculation 3: (u) - (v) */}
                        <div>
                            <p className="underline">2.1.9  Calculate      (u) - (v)   Value and record to below.=={'>'} (w)</p>
                            <EquationBox
                                labelLeft="(u)  LCD Value"
                                operator="-"
                                labelRight="(v)  Supply Tank Value"
                                labelResult="(w)  Result of culculate"
                                nameLeft="p1_cal3_u"
                                nameRight="p1_cal3_v"
                                nameResult="p1_cal3_w"
                                minStd={-1000}
                                maxStd={1000}
                                stdText="(STD -1000 ~ +1000)"
                            />
                            <p className="mt-1">Go back to [2.1.4] and recheck , if Culculate Value is [Under -1001] or [Over +1001].    (STD -1000 ~ +1000)</p>
                            <p className="ml-4">ให้ทำข้อ 2.1.4 ใหม่ถ้าค่าไม่ได้ตาม STD</p>
                            <p className="text-center">Go to [2.1.10] , if Calculate Value is STD (-1000 ~ +1000). ถ้าค่าอยู่ใน STD ให้ทำข้อที่ 2.1.10</p>
                        </div>

                        {/* Final Data */}
                        <div className="mt-2">
                            <p>2.1.10 Record final data <span className="font-bold">"Manage-Parameter-Machine-P3-RESISTIVITY ADJUSTMENT"</span></p>
                            <div className="border border-black p-2 flex items-center mt-1">
                                <span className="w-2/3">"Manage-Parameter-Machine-P3-RESISTIVITY ADJUSTMENT"</span>
                                <span className="mx-2">=</span>
                                <div className="flex-1">
                                    <FormItemCheck
                                        name="p1_ignore_final"
                                        showCheckbox={false}
                                        input={{
                                            name: "p1_final_adjustment",
                                            width: "100%",
                                            className: "!text-center !w-full !border-0"
                                        }}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="absolute bottom-48 right-0">
                    <FormCheckedBox name="p1_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;