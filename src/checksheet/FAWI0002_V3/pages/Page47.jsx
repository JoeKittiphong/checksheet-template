import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page47() {
    return (
        <A4Paper content={content} currentPage={47}>
            <div className="flex flex-col text-xs relative h-full">
                {/* 52. FJ-AWT Check (Data Setting Check) */}
                <SectionTitle className="mt-0">52. FJ-AWT Check (Data Setting Check)</SectionTitle>

                <div className="pl-4 flex flex-col gap-6">
                    {/* 52.1 FLAG Parameters */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold underline mb-1">52.1 MANAGE =={">"} PARAMETER =={">"} FLAG</span>
                        <div className="flex flex-col gap-1 pl-4">
                            <FormItemCheck name="p47_52_1_1" label={<div className="flex w-full justify-between pr-40"><span>AWT REFERENCE = 1</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_1_2" label={<div className="flex w-full justify-between pr-40"><span>JET LESS = 2</span> <span className="text-gray-500">(Page 2)</span></div>} />
                        </div>
                    </div>

                    {/* 52.2 MACHINE Parameters */}
                    <div className="flex flex-col gap-1">
                        <span className="font-bold underline mb-1">52.2 MANAGE =={">"} PARAMETER =={">"} MACHINE</span>
                        <div className="flex flex-col gap-0.5 pl-4">
                            <FormItemCheck name="p47_52_2_1" label={<div className="flex w-full justify-between pr-40"><span>AWT TYPE = 36</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_2_2" label={<div className="flex w-full justify-between pr-40"><span>AWT2 FEED SPEED** = 200 (80)</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_2_3" label={<div className="flex w-full justify-between pr-40"><span>CONNECT TYPE = 02</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_2_4" label={<div className="flex w-full justify-between pr-40"><span>PIPE DOWN LIMIT POS = 080</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_2_5" label={<div className="flex w-full justify-between pr-40"><span>SLIT AWT BACK = 2</span> <span className="text-gray-500">(Page 1)</span></div>} />
                            <FormItemCheck name="p47_52_2_6" label={<div className="flex w-full justify-between pr-40"><span>TIP DISPOSAL UNIT TYPE = 06</span> <span className="text-gray-500">(Page 2)</span></div>} />
                            <FormItemCheck name="p47_52_2_7" label={<div className="flex w-full justify-between pr-40"><span>AQ TIP OF LENGTH = 75</span> <span className="text-gray-500">(Page 2)</span></div>} />
                            <FormItemCheck name="p47_52_2_8" label={<div className="flex w-full justify-between pr-40"><span>CUSTOMIZE FOR FAST AWT = 980003791</span> <span className="text-gray-500">(Page 2)</span></div>} />

                            {/* WIRE LENGTH Selection */}
                            <div className="flex items-start gap-2 mt-1">
                                <span className="pl-10">AQ-AWT2 WIRE LENGTH</span>
                                <div className="flex flex-col gap-1">
                                    <FormItemCheck name="p47_52_2_9_al400g" label={<div className="flex gap-4"><span>= 2300</span> <span className="text-gray-500">(Page 2) (เฉพาะ AL400G)</span></div>} />
                                    <FormItemCheck name="p47_52_2_9_al600g" label={<div className="flex gap-4"><span>= 2700</span> <span className="text-gray-500">(Page 2) (เฉพาะ AL600G)</span></div>} />
                                </div>
                            </div>

                            <FormItemCheck name="p47_52_2_10" label={<div className="flex w-full justify-between pr-40"><span>AWT FEED WAIT = 500</span> <span className="text-gray-500">(Page 3)</span></div>} className="mt-1" />
                            <FormItemCheck name="p47_52_2_11" label={<div className="flex w-full justify-between pr-40"><span>SLIT AWT BACK SPEED = 00300100</span> <span className="text-gray-500">(Page 3)</span></div>} />
                            <FormItemCheck name="p47_52_2_12" label={<div className="flex w-full justify-between pr-40"><span>AQ-AWT WIRE S-BEND = 0</span> <span className="text-gray-500">(Page 3)</span></div>} />
                            <FormItemCheck name="p47_52_2_13" label={<div className="flex w-full justify-between pr-40"><span>MANUAL WIRE FEED SPEED = 100</span> <span className="text-gray-500">(Page 3)</span></div>} />
                            <FormItemCheck name="p47_52_2_14" label={<div className="flex w-full justify-between pr-40"><span>POP UP RETRY = 20</span> <span className="text-gray-500">(Page 4)</span></div>} />
                            <FormItemCheck name="p47_52_2_15" label={<div className="flex w-full justify-between pr-40"><span>POP UP TIME = 100</span> <span className="text-gray-500">(Page 4)</span></div>} />
                            <FormItemCheck name="p47_52_2_16" label={<div className="flex w-full justify-between pr-40"><span>PIPE AIR TIME = 500</span> <span className="text-gray-500">(Page 4)</span></div>} />
                        </div>
                    </div>
                </div>

                {/* Remarks */}
                <div className="mt-8 flex flex-col gap-2 text-[10px]">
                    <p className="underline font-bold">Remark :</p>
                    <p>**ในกรณีใช้ลวด 0.10 (<span className="underline">ใช้ check HTP</span>) ให้ใช้ค่า Data ตามในวงเล็บ เมื่อ check เสร็จแล้ว <span className="underline font-bold">ให้เปลี่ยน data คืน</span></p>
                    <p>**ในกรณีใช้ลวด 0.10 (<span className="underline italic">เป็น spec ของเครื่อง</span>) ให้ใช้ค่า Data ตามในวงเล็บ เมื่อ check เสร็จแล้ว <span className="underline font-bold">ไม่ต้องเปลี่ยน data คืน</span></p>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page47;