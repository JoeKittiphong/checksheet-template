import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image12_21 from "@/assets/FAMB0016_V2/FAMB0016-12-21.PNG";
import image12_22 from "@/assets/FAMB0016_V2/FAMB0016-12-22.PNG";
import image13 from "@/assets/FAMB0016_V2/FAMB0016-13.PNG";

function Page9() {
    return (
        <A4Paper content={content} currentPage={9}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px] leading-tight">

                {/* 12.2 CHECK ทิศทางการประกอบ Bellows(Z) */}
                <div className="mb-8">
                    <h2 className="font-bold mb-4 uppercase text-[14px]">12.2 CHECK ทิศทางการประกอบ Bellows(Z)</h2>

                    <div className="flex px-10 gap-20">
                        {/* OK Section */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start">
                                <FormItemCheck name="page9.item12_2.ok" label="OK" />
                            </div>
                            <img src={image12_21} alt="Bellows Direction OK" className="h-44 object-contain" />
                            <p className="mt-4 font-bold text-center">
                                รอยต่อของ Bellows(Z) อยู่ด้านหลัง <br /> ของ Head Ass'y
                            </p>
                        </div>

                        {/* NG Section */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 self-start">
                                <FormItemCheck name="page9.item12_2.ng" label="NG" />
                            </div>
                            <img src={image12_22} alt="Bellows Direction NG" className="h-44 object-contain" />
                            <p className="mt-4 font-bold text-center">
                                รอยต่อของ Bellows(Z) อยู่ด้านหน้าหรือด้านข้าง <br /> ของ Head Ass'y
                            </p>
                        </div>

                        {/* Signature for 12.2 */}
                        <div className="w-56 self-end pb-8 flex flex-col items-center ml-auto">
                            <FormCheckedBox
                                name="page9.item12_2.checkedInfo"
                                label="Checked By / Date"
                                className="h-28"
                            />
                        </div>
                    </div>
                </div>

                {/* 13. CHECK POSITION OF LINEAR SCALE Z- AXIS */}
                <div className="flex-1 pt-4">
                    <h2 className="font-bold mb-2 uppercase text-[14px]">13. CHECK POSITION OF LINEAR SCALE Z- AXIS</h2>
                    <p className="text-[12px] mb-6">
                        * กำหนดให้ทิศทางการประกอบ Linear scale ต้องดัน Scale base และ Scale head ไปยังทิศทางเดียวกันกับสายของ Linear scale
                    </p>

                    <div className="flex flex-col items-center mb-8">
                        <img src={image13} alt="Linear Scale Position Diagram" className="w-[85%] max-w-[700px] mb-6" />

                        <div className="w-full px-6">
                            <p className="mb-4 text-[12px]">
                                เมื่อทำการดัน Scale base และ Scale head ไปยังทิศทางเดียวกันกับสายไฟของ Linear scale แล้วให้ <span className="font-bold inline-block border border-black px-1.5 mx-1">✓</span> ลงใน <span className="inline-block w-4 h-4 border border-black align-middle"></span> ให้เรียบร้อย
                            </p>

                            <table className="w-full border-collapse border border-black">
                                <thead>
                                    <tr className="bg-gray-100 h-10">
                                        <th className="border border-black p-1 w-24 text-center">Axis</th>
                                        <th className="border border-black p-1 text-center font-bold font-sans">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="h-12 text-[14px]">
                                        <td className="border border-black text-center font-bold">Z</td>
                                        <td className="border border-black px-4">
                                            <div className="flex items-center gap-4">
                                                <FormItemCheck name="page9.item13.check" label="" />
                                                <span className="font-medium">ดัน Scale base และ Scale head ไปยังทิศทางเดียวกันกับสายไฟของ Linear scale แล้ว</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Final Signature for 13 */}
                    <div className="mt-auto flex justify-end pb-4 pr-4">
                        <div>
                            <FormCheckedBox
                                name="page9.item13.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page9;