
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page66() {
    return (
        <A4Paper content={content} currentPage={66}>
            <div className="flex flex-col text-[10.5px] h-full p-4 leading-tight font-sans space-y-4">
                <SectionTitle className="mt-0 w-max text-sm underline">
                    19.3 IG-S4 for checking streaks and unevenness
                </SectionTitle>

                <p className="mb-2">
                    Check under White fluorescent light ( Distance between Work-Piece to Light (White Light) = Under 2.5m)
                </p>

                {/* Table */}
                <table className="w-[50%] border-collapse border border-black">
                    <thead>
                        <tr className="bg-gray-50 h-8">
                            <th className="border border-black p-1 text-center w-[25%] font-bold">Point</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">a (3rd)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">b (4th)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">c (3rd)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="h-10">
                            <td className="border border-black p-1 text-center font-bold">0.20mm</td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p66_pt_a_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p66_pt_b_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p66_pt_c_check" label="Check" className="justify-center" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Complete check section */}
                <div className="space-y-4">
                    <p className="font-bold text-sm underline">Complete check</p>
                    <p>No ruggedness, no unevenness on the surface, and no roughness when viewed with the naked eye</p>

                    <div>
                        <p className="font-bold text-[11px]">1. When there is deep square roughness when viewed with the eye</p>
                        <p className="italic">--- 3rd Cut Surface---</p>
                        <p className="pl-4">Change the machining speed of 3rd cut within the reference value range</p>
                        <p className="pl-8">(reference value of 3rd cut speed: 3.5 to 5.5)</p>
                        <div className="pl-4 pt-2">
                            <p>Disch3-Page8 -[DHF SV OFSET NGAL] is changed from the value before machining</p>
                            <p className="pl-4">• Changing the -50 value from the pre-processing set value slows down the 0.5 mm/min speed</p>
                            <p className="pl-4">• Changing the value by +50 from the pre-processing value increases the speed by 0.5mm/min.</p>
                        </div>
                    </div>

                    <p className="font-bold text-center w-20">OR</p>

                    <div>
                        <p>"Disch-Page11-[GALPM machining V6] = default + [1]</p>
                        <p>When the setting is changed, rework it.</p>
                        <p className="font-bold pt-1">Entry area [GALPM machining V6] = [*default value +15] ~ [*default value -15]</p>
                        <p>If the setting is changed, return to "[17] (STD thickness 80 mm - 4th cut adjustment)" and readjust.</p>
                        <div className="flex justify-between items-center w-[80%] pt-1">
                            <p>e.g.-&gt; Default setting [For GALPM machining V6] = 99</p>
                            <span>←</span>
                        </div>
                        <div className="flex justify-between items-center w-[80%]">
                            <p>--&gt; Max. input command is "Disch-Page7-[GALPM machining V6] = [84 ~ 114].</p>
                            <span>←</span>
                        </div>
                    </div>

                    <p className="font-bold text-center w-20">OR</p>

                    <div className="space-y-1">
                        <div className="flex justify-between items-center w-[80%]">
                            <p>Disch3-page8 -[301] KM4 SV OFST = Default + [5 (Up) increments] <span className="inline-block border border-black w-4 h-4 ml-2"></span></p>
                        </div>
                        <p>Input range [KM4 SV OFST] = -70 ~ +10</p>
                        <p className="italic">{`{Note: Default + 10 (Up) --> 1.5~2.0 mm smaller.`}</p>
                        <p>If the setting is changed, re-machine the servo.</p>
                    </div>
                </div>

                {/* Section 19.4 */}
                <div className="space-y-4 pt-4 border-t border-gray-300">
                    <p className="font-bold text-sm underline">19.4 How to set DHF SV OFFSET NGAL</p>
                    <div className="space-y-4 pl-4">
                        <p>Use "0" as the initial value for Disch 3-Page 8 - [Disch 3 - page8 - DHF SV OFFSET NGAL].</p>
                        <div className="flex items-start gap-2">
                            <span>For the second and subsequent processes, enter the value of correction value H291 in the NC program of the previous process.</span>
                            <div className="flex flex-col text-lg leading-none pt-1">
                                <span>≦</span>
                                <span>≧</span>
                            </div>
                        </div>
                        <p>
                            If the judgment is OK and &nbsp;&nbsp;&nbsp; -50.0 &nbsp;&nbsp;&nbsp; (DHF SV OFSET NGAL)-“H491” &nbsp;&nbsp;&nbsp; +50.0
                        </p>
                        <p>
                            The test is passed when the following equation is true. Finish processing and move on to the next process.
                        </p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page66;