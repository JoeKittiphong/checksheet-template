
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page87() {
    return (
        <A4Paper content={content} currentPage={87}>
            <div className="flex flex-col text-[12px] h-full p-4 leading-tight font-sans relative">
                <SectionTitle className="!text-lg font-bold border-b border-black mb-1">
                    21.3 Line Surface Check (For STD2 80mm 4th 0.20mm Wire)
                </SectionTitle>

                <p className="mb-2">
                    Check under White fluorescent light ( Distance between Work-Piece to Light (White Light) = Under 2.5m)
                </p>

                {/* Simple HTML Table */}
                <table className="w-[60%] border-collapse border border-black mb-4 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-1 w-[25%] font-bold">Point</th>
                            <th className="border border-black p-1 w-[25%] font-bold">X- (4th)</th>
                            <th className="border border-black p-1 w-[25%] font-bold">Y- (4th)</th>
                            <th className="border border-black p-1 w-[25%] font-bold">X+ (4th)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 font-bold">0.20mm</td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p87_x_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p87_y_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p87_x_plus_check" label="Check" className="justify-center" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="space-y-1 mb-4">
                    <p className="font-bold">Check all surface</p>
                    <p>Wire stripes deep under the naked eye, no roughness!!</p>
                    <p className="font-bold text-lg">NOTE : Unevenness or shallow lines are not important.</p>
                    <p className="font-bold text-xl">※There shall be no short streaks.</p>
                    <p className="font-bold text-xl">※Mura and fusa are not important.</p>
                </div>

                <div className="space-y-3 mt-4">
                    <div>
                        <p>1. Deep streaks or graininess when viewed with the naked eye</p>
                        <p className="italic">--- 4th Cut Surface ---</p>
                        <p className="pl-4">"Disch-Page7-[[274] DPW PC02-22 V13] = default + [1]</p>
                        <p className="pl-4">When the setting is changed, rework it.</p>
                    </div>

                    <div className="pt-2">
                        <div className="flex justify-between w-[90%]">
                            <p className="font-bold">Input range [DPW PC02-22 V13] = [*Initial value-20] ~ [*Initial value + 15]</p>
                            <span>←</span>
                        </div>
                        <p className="italic font-bold">Initial setting = [DPW PC02-22V13] setting in No.15 (9.5).</p>
                        <p>e.g.,--&gt; Default setting [DPW PC02-22 V13] = 124:</p>
                        <div className="flex justify-between w-[90%]">
                            <p className="pl-4">--&gt; Input-range is "Disch-Page7-[[274] DPW PC02-22 V13] = [104 ~ 139].</p>
                            <span>←</span>
                        </div>
                    </div>

                    <p className="italic font-bold mt-4 mb-2 text-lg">Or</p>

                    <div className="space-y-2">
                        <p>"Electric Disch-Page10-[MODIFYWORKING CR SV 21]" = current setting + [5 (Up)]</p>
                        <p>Input-range [MODIFYWORKING CR SV 21] =-25 ~ +55</p>
                        <p>{`{Note ; Default + 5 (Up)--> Dimension becomes smaller as 0.5~1.0 mm.`}</p>
                        <p>When the setting is changed, rework it.</p>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex justify-end">
                    <FormCheckedBox name="p87_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page87;