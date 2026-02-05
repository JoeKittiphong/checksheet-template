import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page49() {
    return (
        <A4Paper content={content} currentPage={49}>
            <div className="flex flex-col text-[12px] h-full p-2 leading-tight font-sans">
                <SectionTitle className="!text-lg font-bold border-b border-black mb-1">
                    18.3 Line Surface Check (For STD 80mm 4th 0.20mm Wire)
                </SectionTitle>

                <p className="mb-2">
                    Check under White fluorescent light ( Distance between Work-Piece to Light (White Light) = Under 2.5m)
                </p>

                {/* Simple HTML Table */}
                <table className="w-[60%] border-collapse border border-black mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-1 text-center w-[25%] font-bold">Point</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">X- (4th)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">Y- (4th)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">X+ (4th)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 text-center font-bold">0.20mm</td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p49_x_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p49_y_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p49_x_plus_check" label="Check" className="justify-center" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="space-y-1 mb-4">
                    <p className="font-bold">Check all surface</p>
                    <p>Wire stripes deep under the naked eye, no roughness!!</p>
                    <p className="font-bold text-lg">NOTE : Unevenness or shallow lines are not important.</p>
                    <p className="font-bold text-xl">※ There shall be no short streaks.</p>
                    <p className="font-bold text-xl">※ Mura and fusa are not important.</p>
                </div>

                <div className="space-y-3 mt-4">
                    <div>
                        <p>1. Still deep wire line, rough face by eye check.</p>
                        <p className="italic">--- 4th Cut Surface ---</p>
                        <p className="pl-4">"Disch-Page9-[[357] DPW PC12 V6] and Disch-Page9-[[358] DPW PC12 V7]</p>
                        <p className="pl-4">= Original data + [1] (V6 and V7 at same time)</p>
                        <p className="pl-4">Re-test Cut after change setting data.</p>
                    </div>

                    <div className="pt-2">
                        <p className="font-bold">Input range of [DPW PC12 V6]= [*First Setting - 10] ~ [*First Setting + 15]</p>
                        <p className="italic">example--&gt; Setting data for [DPW PC12 V6] = 64</p>
                        <p className="pl-4">--&gt; Input range of "Disch-Page9-[[357] DPW PC12 V6] = [54 ~ 79]</p>
                    </div>

                    <p className="italic font-bold mt-4 mb-2 text-lg">OR</p>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between w-[80%]">
                            <p>"Parameter Disch-Page3-[MODIFYWORKING CR SV 9]" = current setting + [5 (Up)]</p>
                            <span>←</span>
                        </div>
                        <div className="flex items-center justify-between w-[80%]">
                            <p>Input-range [MODIFYWORKING CR SV 9] =-30 ~ +30</p>
                            <span>←</span>
                        </div>
                        <div className="flex items-center justify-between w-[80%]">
                            <p>{"{Note ; Default + 5 (Up)--> Dimension becomes smaller as 0.5 mm."}</p>
                            <span>←</span>
                        </div>
                        <div className="flex items-center justify-between w-[80%]">
                            <p>When the setting is changed, rework it.</p>
                            <span>←</span>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page49;