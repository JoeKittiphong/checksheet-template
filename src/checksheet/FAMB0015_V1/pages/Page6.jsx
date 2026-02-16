import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0015_V1-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image7_21 from "@/assets/FAMB0015_V1/FAMB0015-7-21.PNG";
import image7_22 from "@/assets/FAMB0015_V1/FAMB0015-7-22.PNG";
import image8 from "@/assets/FAMB0015_V1/FAMB0015-8.PNG";

function Page6() {
    return (
        <A4Paper content={content} currentPage={6}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px]">

                {/* 7.2 CHECK ทิศทางการประกอบ Bellows(Z) */}
                <div className="mb-2">
                    <h2 className="font-bold mb-2">7.2 CHECK ทิศทางการประกอบ Bellows(Z)</h2>

                    <div className="flex px-8 gap-10">
                        {/* OK Section */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start">
                                <FormItemCheck name="page6.item7_2.ok" label="OK" />
                            </div>
                            <img src={image7_21} alt="Bellows Direction OK" className="h-56 object-contain" />
                            <p className="mt-4 font-bold text-center">
                                รอยต่อของ Bellows(Z) อยู่ด้านหลัง <br /> ของ Head Ass'y
                            </p>
                        </div>

                        {/* NG Section */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start">
                                <FormItemCheck name="page6.item7_2.ng" label="NG" />
                            </div>
                            <img src={image7_22} alt="Bellows Direction NG" className="h-56 object-contain" />
                            <p className="mt-4 font-bold text-center">
                                รอยต่อของ Bellows(Z) อยู่ด้านหน้าหรือด้านข้าง <br /> ของ Head Ass'y
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="w-56 self-end pb-8 flex flex-col items-center ml-auto">
                            <div className="w-full">
                                <FormCheckedBox
                                    name="page6.item7_2.checkedInfo"
                                    label="CHECK BY/DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. CHECK POSITION OF LINEAR SCALE Z- AXIS */}
                <div className="flex-1 pt-4">
                    <h2 className="font-bold mb-4 uppercase">8. CHECK POSITION OF LINEAR SCALE Z- AXIS</h2>
                    <p className="text-[12px] mb-6">
                        * กำหนดให้ทิศทางการประกอบ Linear scale ต้องดัน Scale base และ Scale headไปยังทิศทางเดียวกันกับสายของ Linear scale
                    </p>

                    <div className="flex flex-col items-center mb-8">
                        <img src={image8} alt="Linear Scale Diagram" className="w-[85%] max-w-[700px] mb-8" />

                        <div className="w-full px-4">
                            <p className="mb-2 text-[12px]">
                                เมื่อทำการดัน Scale base และ Scale head ไปยังทิศทางเดียวกันกับสายไฟของ Linear scale แล้ว <span className="font-bold">✓</span> ลงใน <span className="inline-block w-4 h-4 border border-black align-middle"></span> ให้เรียบร้อย
                            </p>

                            <table className="w-full border-collapse border border-black">
                                <thead>
                                    <tr className="bg-gray-100 text-[11px]">
                                        <th className="border border-black p-1 w-24 text-center">Axis</th>
                                        <th className="border border-black p-1 w-16 text-center"></th>
                                        <th className="border border-black p-1 text-center">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="h-10">
                                        <td className="border border-black text-center font-bold">Z</td>
                                        <td className="border border-black">
                                            <div className="flex justify-center">
                                                <FormItemCheck name="page6.item8.check" label="" />
                                            </div>
                                        </td>
                                        <td className="border border-black px-4 text-center font-medium">
                                            ดัน Scale base และ Scale head ไปยังทิศทางเดียวกันกับสายไฟของ Linear scale แล้ว
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Final Signature */}
                    <div className="mt-auto flex justify-end pb-4 pr-4">
                        <div className="w-56">
                            <FormCheckedBox
                                name="page6.item8.checkedInfo"
                                label="CHECK BY/DATE"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page6;
