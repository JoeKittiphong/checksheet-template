import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import OscilloscopeImg from '@/assets/FAWI0005_V3/6_Oscilloscope.png';

function Page6() {

    // Data for 6.4 Table
    const data6_4 = [
        { normal: "NORMAL V0", data: "p6_normal_v0", arrow: "ALPM MACHINING V0" },
        { normal: "NORMAL V1", data: "p6_normal_v1", arrow: "ALPM MACHINING V1" },
        { normal: "NORMAL V2", data: "p6_normal_v2", arrow: "ALPM MACHINING V2" },
        { normal: "NORMAL V3", data: "p6_normal_v3", arrow: "ALPM MACHINING V3" },
        { normal: "NORMAL V4", data: "p6_normal_v4", arrow: "ALPM MACHINING V4" },
    ];

    const columns6_4 = [
        { header: "NORMAL V*", key: "normal", width: "40%", className: "text-center" },
        { header: "DATA", key: "data", width: "60%", className: "text-center", type: "input" },
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="font-bold flex flex-col text-[12px] mb-2">
                    <span>Do not place work piece !!! (ห้ามวาง Work Piece)</span>
                    <span>Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)</span>
                </div>

                <SectionTitle className="mt-0 w-max">6.ALPM Voltage Adjustment</SectionTitle>

                {/* 6.1 Resistivity */}
                <div className="mt-2 pl-4">
                    <div className="flex items-center flex-wrap">
                        <FormItemCheck
                            name="p6_resistivity_check"
                            label="6.1 RESITIVITY (Supply Tank) : "
                            showCheckbox={true}
                            style={{ margin: 0 }}
                        />
                        <div className="flex items-center gap-1 ml-1">
                            <FormItemCheck
                                name=""
                                showCheckbox={false}
                                input={{
                                    name: "p6_resistivity_val",
                                    width: "80px",
                                    className: "border-b border-black text-center"
                                }}
                            />
                            <span>x 10<sup className='text-[8px]'>4</sup>Ω.cm ( STD : 5.0 - 5.2 X 10<sup className='text-[8px]'>4</sup>Ω.cm )</span>
                        </div>
                    </div>
                </div>

                {/* 6.2 Change data */}
                <div className="mt-4 pl-4">
                    <FormItemCheck
                        name="p6_change_data_sv"
                        label="6.2 Change data Manage - Parameter - Disch - P3 - Individual machining SV compensation 7,8,15,16 --> +40"
                        showCheckbox={true}
                        className="font-bold"
                    />
                    <p className="pl-6 ml-2">(เปลี่ยนค่า SV7,8,15,16 เป็น +40)</p>
                </div>

                {/* 6.3 G959 */}
                <div className="mt-4 pl-4">
                    <FormItemCheck
                        name="p6_g959_check"
                        label="6.3 G959 : X:Center Position   Y:120   Z:40.0000"
                        showCheckbox={true}
                    />
                </div>

                {/* 6.4 Normal V0-V4 */}
                <div className="mt-4 pl-4">
                    <FormItemCheck
                        name="p6_normal_v_check"
                        label="6.4 The same setup as Manage - Parameter - Disch - P4 - Normal V0~V4 is inputted into"
                        showCheckbox={true}
                        className="font-bold"
                    />
                    <div className="pl-6 ml-2 font-bold">
                        <p>Manage - Parameter - Disch - P3 - ALPM Maching V0 ~ V4</p>
                        <p className="font-normal">(นำค่า Manage - Parameter - Disch - P4 - Normal V0~V4 ไปป้อนค่าใน Manage - Parameter</p>
                        <p className="font-normal">- Disch - P3 - ALPM Maching V0 ~ V4)</p>

                        <p className="mt-1">ค่า NORMAL V0 ~ V4 ก่อน CUTTING ALPM</p>
                    </div>

                    <div className="flex items-center mt-1 pl-6 ml-2">
                        <div className="w-[30%]">
                            <FormQuickTable columns={columns6_4} data={data6_4} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className='mt-9'>
                            <div className="ml-2 flex flex-col justify-around text-[10px] h-[120px]">
                            {data6_4.map((row, idx) => (
                                <span key={idx} className="h-5 flex items-center">---{'>'} {row.arrow}</span>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>

                {/* 6.5 Confirm data */}
                <div className="mt-4 pl-4">
                    <FormItemCheck
                        name="p6_confirm_data"
                        label="6.5 Confirm data Manage - Parameter - Disch - 6 - “ALPM SIG Factor ON” All --> 1.20"
                        showCheckbox={true}
                    />
                    <p className="pl-6 ml-2">(ตรวจสอบค่า ALPM SIG Factor ON ทั้งหมดต้องเป็น 1.20)</p>
                </div>

                {/* Bottom Section: Oscilloscope */}
                <div className="mt-6 font-bold flex gap-10">
                    <span>Use Oscilloscope=TDS2022(White)</span>
                    <span>Voltage Probe=TPP0201 or P2220 (Black)</span>
                </div>

                <div className="mt-2 w-[40%]">
                    <img src={OscilloscopeImg} alt="Oscilloscope" className="w-full border border-gray-300" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;