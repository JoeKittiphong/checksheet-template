import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images for section 21
import imgCirculation from '@/assets/FAWI0002_V3/image-20-10.JPG';
import imgSending from '@/assets/FAWI0002_V3/image-20-11.JPG';
import imgSendingPType from '@/assets/FAWI0002_V3/image-20-12.JPG';
import imgBallValve from '@/assets/FAWI0002_V3/image-20-13.JPG';

function Page21() {
    return (
        <A4Paper content={content} currentPage={21}>
            <div className="flex flex-col text-[13px] p-4">
                <div className="mb-2">
                    <FormItemCheck name="p21_valve_position_check_title" label="Position Valve of Supply Tank check" className="font-bold" />
                </div>

                <table className="w-full border-collapse border border-black text-center font-arial">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-black p-2 w-[50px]">No.</th>
                            <th className="border border-black p-2">Position</th>
                            <th className="border border-black p-2 w-[220px]">Machine</th>
                            <th className="border border-black p-2 w-[220px]">Adjust</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1: Circulation Pump */}
                        <tr>
                            <td className="border border-black" rowSpan={1}>1</td>
                            <td className="border border-black">
                                <div className="flex flex-col items-center gap-2">
                                    <img src={imgCirculation} alt="Circulation Pump" className="h-40 object-contain border border-black" />
                                </div>
                            </td>
                            <td className="border border-black p-2 text-left">
                                <div className="flex flex-col gap-4 ml-4 font-bold">
                                    <FormItemCheck name="p21_circ_machine_g_ce" label="G,CE Type" />
                                    <FormItemCheck name="p21_circ_machine_p" label="P Type" />
                                    <FormItemCheck name="p21_circ_machine_q" label="Q Type" />
                                </div>
                            </td>
                            <td className="border border-black p-2 text-left">
                                <div className="flex flex-col gap-4 ml-4 font-bold">
                                    <FormItemCheck name="p21_circ_adjust_close_g_ce" label="Close" />
                                    <FormItemCheck name="p21_circ_adjust_close_p" label="Close" />
                                    <FormItemCheck name="p21_circ_adjust_close_q" label="Close" />
                                    <div className="text-[10px] text-red-600 italic">ตรวจสอบและมาร์คสีขาว</div>
                                </div>
                            </td>
                        </tr>

                        {/* Row 2 - Part 1: Sending Pump Standard */}
                        <tr>
                            <td className="border border-black" rowSpan={2}>2</td>
                            <td className="border border-black">
                                <div className="flex flex-col items-center">
                                    <img src={imgSending} alt="Sending Pump" className="h-40 object-contain border border-black" />
                                </div>
                            </td>
                            <td className="border border-black p-2 text-left">
                                <div className="flex flex-col gap-4 ml-4 font-bold">
                                    <FormItemCheck name="p21_send_machine_g_ce" label="G,CE Type" />
                                    <FormItemCheck name="p21_send_machine_q" label="Q Type" />
                                    <FormItemCheck name="p21_send_machine_g_high" label="G High Column" />
                                </div>
                            </td>
                            <td className="border border-black p-2 text-left">
                                <div className="flex flex-col gap-4 ml-4 font-bold">
                                    <FormItemCheck name="p21_send_adjust_270" label={<span>270<sup>o</sup></span>} />
                                    <FormItemCheck name="p21_send_adjust_180" label={<span>180<sup>o</sup></span>} />
                                    <FormItemCheck name="p21_send_adjust_720" label={<span>720<sup>o</sup></span>} />
                                    <div className="text-[10px] text-red-600 italic">ตรวจสอบและมาร์คสีขาว</div>
                                </div>
                            </td>
                        </tr>

                        {/* Row 2 - Part 2: Sending Pump P-Type */}
                        <tr>
                            <td className="border border-black">
                                <div className="flex flex-col items-center">
                                    <img src={imgSendingPType} alt="Sending Pump P-Type" className="h-40 object-contain border border-black" />
                                </div>
                            </td>
                            <td className="border border-black p-4 text-left">
                                <div className="flex items-center gap-2 ml-4 font-bold">
                                    <FormItemCheck name="p21_send_machine_p" label="P Type" />
                                </div>
                            </td>
                            <td className="border border-black p-4 text-left">
                                <div className="flex flex-col gap-4 ml-4 font-bold">
                                    <FormItemCheck name="p21_send_adjust_p_upper" label={<span>135<sup>o</sup> (Valve บน)</span>} />
                                    <FormItemCheck name="p21_send_adjust_p_lower" label={<span>135<sup>o</sup> (Valve ล่าง)</span>} />
                                    <div className="text-[10px] text-red-600 italic">ตรวจสอบและมาร์คสีขาว</div>
                                </div>
                            </td>
                        </tr>

                        {/* Row 3: Ball Valve side of Filter Box */}
                        <tr>
                            <td className="border border-black">3</td>
                            <td className="border border-black">
                                <div className="flex flex-col items-center gap-2">
                                    <img src={imgBallValve} alt="Ball Valve" className="h-32 object-contain border border-black" />
                                </div>
                            </td>
                            <td className="border border-black p-2 text-left">
                                <div className="flex items-center gap-2 ml-4 font-bold">
                                    <FormItemCheck name="p21_ball_machine_all" label="All Type" />
                                </div>
                            </td>
                            <td className="border border-black p-2">
                                <div className="flex flex-col gap-1 items-center font-bold">
                                    <span className="text-sm">Close</span>
                                    <span className="text-[11px]">(50 Hz ==&gt; Close)</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end mt-10">
                    <FormCheckedBox name="p21_signature" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page21;