import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page36() {
    return (
        <A4Paper content={content} currentPage={36}>
            <div className="flex flex-col text-[12px] h-full p-2 leading-tight">
                <SectionTitle className="!text-lg font-bold border-b border-black mb-1">
                    17.3 Line Surface Check (For STD 80mm 3rd 0.20mm Wire)
                </SectionTitle>

                <p className="mb-2">
                    Check under White fluorescent light ( Distance between Work-Piece to Light (White Light) = Under 2.5m)
                </p>

                {/* Simple HTML Table */}
                <table className="w-[80%] border-collapse border border-black mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-1 text-center w-[25%] font-bold">Point</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">X- (3rd)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">Y- (3rd)</th>
                            <th className="border border-black p-1 text-center w-[25%] font-bold">X+ (3rd)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 text-center font-bold">0.20mm</td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p36_x_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p36_y_minus_check" label="Check" className="justify-center" />
                            </td>
                            <td className="border border-black p-1">
                                <FormItemCheck name="p36_x_plus_check" label="Check" className="justify-center" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="space-y-1 mb-4">
                    <p className="font-bold">Complete confirmation</p>
                    <p>Wire stripes deep under the naked eye, no roughness!!</p>
                    <p className="font-bold text-lg">NOTE : Unevenness or shallow lines are not important.。</p>
                    <p className="font-bold">※ There shall be no short streaks.</p>
                    <p className="font-bold">※ Mura and fusa are not important.</p>
                </div>

                <div className="space-y-3">
                    <div>
                        <p>1. Still deep wire line, rough face by eye check.</p>
                        <p className="italic">--- 3rd Cut Surface ---</p>
                        <p className="pl-4">"Disch-Page9-[[339] DPW PC32 V8] and Disch-Page9-[[340] DPW PC32 V9]</p>
                        <p className="pl-4">= Original data + [1] (V8 and V9 at same time)</p>
                        <p className="pl-4">Re-test Cut after change setting data.</p>
                    </div>

                    <div className="pt-2">
                        <p className="font-bold">Input range of [DPW PC32 V9] = [*First Setting - 10] ~ [*First Setting + 15]</p>
                        <p className="italic">* First Setting = Setting data for [DPW PC32 V9] before Test cut data on "No.15 Page" (9.3).</p>
                        <p className="pl-4">example--&gt; Setting data for [DPW PC32 V9] = 94</p>
                        <p className="pl-4">--&gt; Input range of "Disch-Page9-[[339] DPW PC32 V9] = [84 ~ 109]</p>
                    </div>

                    <p className="italic font-bold">OR</p>

                    <div>
                        <p>"Disch-Page3-[MODIFY WORKING CORE SV18]" = Original data + [5 (Up) ]</p>
                        <p>Input range of [MODIFY WORKING CORE SV18] = -60 ~ +10</p>
                        <p>{"{Note ; Original data + 5 (Up) --> may make to small size about 0.5~1.0 μm"}</p>
                        <p>Re-test Cut after change setting data.</p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page36;