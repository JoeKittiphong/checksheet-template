import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images
import imgFloatSensorPos from '@/assets/FAWI0002_V3/image-24.JPG';
import imgFloatCheck1 from '@/assets/FAWI0002_V3/image-25-1.JPG';
import imgFloatCheck2 from '@/assets/FAWI0002_V3/image-25-2.JPG';
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page24() {
    const models = [
        { model: "ALN400Q", zPos: "175" },
        { model: "ALN600Q", zPos: "225" },
        { model: "ALN/AL400G", zPos: "180" },
        { model: "ALN/AL600G", zPos: "235" },
        { model: "ALN600GH", zPos: "450" },
    ];

    return (
        <A4Paper content={content} currentPage={24}>
            <div className="">
                {/* 23. Process Tank Door Check ( Q-Type Only) */}
                <div className="flex flex-col h-[120px]">
                    <SectionTitle>23. Process Tank Door Check ( Q-Type Only)</SectionTitle>
                    <div className="ml-5 mt-1 flex flex-col gap-2">
                        <FormItemCheck
                            name="p24_door_shutter_check"
                            label={
                                <div className="flex flex-col text-xs">
                                    <p>Open process tank door, [TANK FILL] & [DRAIN CLOSE] on,</p>
                                    <p>Check Drain Shutter(Right side) is open, and tank fill is slow.</p>
                                </div>
                            }
                        />
                        <FormItemCheck
                            name="p24_door_close_fill_check"
                            label={
                                <div className="flex flex-col text-xs">
                                    <p>Close the door, then tank fill will as normal.</p>
                                    <p>Sending Pump & Circulation Pump on, valve SEND.S & SEND.C on.</p>
                                </div>
                            }
                        />
                        <div className="flex justify-end pr-10 relative bottom-25">
                            <FormCheckedBox name="p24_door_check_sig" label="Checked by :" />
                        </div>
                    </div>
                </div>

                {/* 24. Adjust Float Sensor Position. (ปรับระยะห่างของ Float Sensor) */}
                <div className="flex flex-col">
                    <SectionTitle>24. Adjust Float Sensor Position. (ปรับระยะห่างของ Float Sensor)</SectionTitle>

                    <div className="flex mt-1">
                        <div className="flex-1">
                            <img src={imgFloatSensorPos} alt="Float Sensor Position" className="h-50 object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2 p-2">
                            <p className="text-xs font-bold">Setting Upper guide position at G959 ==&gt; Z = 30</p>
                            <div className="flex items-center gap-2">
                                <FormItemCheck
                                    name="p24_float_hight_check"
                                    showCheckbox={false}
                                    input={{
                                        name: "p24_float_hight_val",
                                        minStd: 65,
                                        maxStd: 70,
                                        width: "50px",
                                        suffix: "mm"
                                    }}
                                    label="Adjust Hight (h) : 65~70 mm Hight (h) ="
                                />
                            </div>
                            <div className="mt-1 p-1 text-xs">
                                <p>ประกอบ Cable P4 ในตำแหน่งด้านบนของ Bracket</p>
                                <p>และตรวจสอบการประกอบ Screw CR TRUSS M4x8</p>
                            </div>
                            <div className="flex justify-end mt-2">
                                <FormCheckedBox name="p24_float_pos_sig" label="Checked by :" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 25. Float Sensor Check */}
                <div className="flex flex-col">
                    <SectionTitle>25. Float Sensor Check</SectionTitle>

                    {/* Step 1: Z Position Table */}
                    <div className="flex flex-col ml-5">
                        <FormItemCheck
                            name="p24_z_pos_move"
                            label={<span className="text-xs">พิมพ์ G959; และเลื่อนแกน Z ให้อยู่ในระยะตามตารางด้านล่าง</span>}
                            className="font-bold"
                        />
                        <div className="ml-8 mt-1">
                            <table className="border-collapse border border-black w-full max-w-xl text-center text-[10px]">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black p-1 font-normal">Model</th>
                                        {models.map(m => <th key={m.model} className="border border-black p-1 font-normal">{m.model}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-black p-1">Z Position</td>
                                        {models.map(m => <td key={m.model} className="border border-black p-1">{m.zPos}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Step 2: Fill Water */}
                    <div className="ml-5 mt-1">
                        <FormItemCheck name="p24_fill_water" label={<span className="text-xs">เติมน้ำเข้า Process Tank</span>} className="font-bold" />
                    </div>

                    {/* Step 3: Timer measurement */}
                    <div className="flex flex-col ml-5">
                        <FormItemCheck
                            name="p24_timer_check"
                            label={<span className="text-xs italic">จับเวลารวมการลดลง และเพิ่มขึ้นของน้ำ ระหว่าง Sensor <span className="underline font-bold">{"{No.2 -> No.1 -> No.2}"}</span></span>}
                            className="font-bold"
                        />
                        <div className="flex items-center gap-10 ml-8 mt-1">
                            <img src={imgFloatCheck1} alt="Timer Check" className="h-32 object-contain" />
                            <div className="flex flex-col gap-1">
                                <FormItemCheck
                                    name="p24_water_time_entry"
                                    showCheckbox={false}
                                    input={{
                                        name: "p24_water_time_val",
                                        width: "100px",
                                        suffix: "วินาที"
                                    }}
                                    label={<span className="text-xs">จับเวลาน้ำ =</span>}
                                />
                                <div className="text-[10px] text-gray-700 ml-4 italic">
                                    <p>(STD G-Type เวลาต้องไม่เกิน 180 วินาที)</p>
                                    <p>(STD Q-Type เวลาต้องไม่เกิน 150 วินาที)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Water Level Check */}
                    <div className="flex flex-col ml-5 mt-1">
                        <FormItemCheck
                            name="p24_level_line_check"
                            label={<span className="text-xs">ระดับน้ำต้องไม่ต่ำกว่าเส้นประสีฟ้า ดังภาพ</span>}
                            className="font-bold"
                        />
                        <div className="flex items-center gap-10 ml-8 mt-1">
                            <img src={imgFloatCheck2} alt="Level Line Check" className="h-32 object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page24;