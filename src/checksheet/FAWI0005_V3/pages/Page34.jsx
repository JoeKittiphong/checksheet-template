
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page34_diagram.png';

function Page34() {
    // Reference Tables Configuration
    const columns = [
        { header: "Point", key: "point", width: "25%", className: "text-center font-bold" },
        { header: "X- (3rd)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (3rd)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (3rd)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const dataRa = [
        { point: "0.20mm", x_minus: "0.530~0.630", y_minus: "No need", x_plus: "0.530~0.630" }
    ];

    const dataRz = [
        { point: "0.20mm", x_minus: "3.70~4.80", y_minus: "No need", x_plus: "3.70~4.80" }
    ];

    return (
        <A4Paper content={content} currentPage={34}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">17.1 Roughness check (For STD 80mm 3rd 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[65%] flex flex-col gap-4">
                        {/* Table 1: Ra */}
                        <div>
                            <p className="font-bold mb-1">Standard Roughness (Ra µm) <span className="font-normal pl-2">Have priority "Ra " value over "RzDIN".</span></p>
                            <FormQuickTable columns={columns} data={dataRa} />
                        </div>

                        {/* Table 2: RzDIN */}
                        <div>
                            <p className="font-bold mb-1">Standard Roughness (RzDIN µm)</p>
                            <FormQuickTable columns={columns} data={dataRz} />
                            <p className="mt-1">Roughness check = Styrus; 2µm , Cut-OFF; 300:1</p>
                        </div>

                        {/* Instructions */}
                        <div className="mt-2">
                            <p className="font-bold text-sm mb-2">Adjust rourhness to STD fallowing if you see over or under STD.</p>

                            <p className="italic mb-2">--- 3rd Cut Surface (For 0.20mm Wire) ---</p>

                            {/* Big Data Case */}
                            <div className="mb-4">
                                <p className="font-bold">If Rough (Big Data) surface value</p>
                                <p className="pl-2">"Disch-Page9-[[339] DPW PC32 V8] and Disch-Page9-[[340] DPW PC32 V9]</p>
                                <p className="pl-2">= Original data - [**] (V8 and V9 at same time)</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data - 2 --> may Original value -0.01µmRa fine surface}`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                                <p className="font-bold mt-1">Input range of [DPW PC32 V9]= [*First Setting - 10] ~ [*First Setting + 15]</p>
                                <p className="italic font-bold mt-1">* First Setting = Setting data for [DPW PC32 V9] before Test cut data on "No.15 Page" (9.3).</p>
                                <p className="pl-2">example--&gt; Setting data for [DPW PC32 V9] before Test cut data on "No.15 Page" (9.3) = 94</p>
                                <p className="pl-2">--&gt; Input range of "Disch-Page9-[[339] DPW PC32 V9] = [84 ~ 109]</p>
                            </div>

                            {/* Small Data Case */}
                            <div>
                                <p className="font-bold">If Fine (Small Data) surface value</p>
                                <p className="pl-2">"Disch-Page9-[[339] DPW PC32 V8] and Disch-Page9-[[340] DPW PC32 V9]</p>
                                <p className="pl-2">= Original data + [**] (V8 and V9 at same time)</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data + 2 --> may Original value +0.01µmRa rough surface}`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                                <p className="font-bold mt-1">Input range of [DPW PC32 V9]= [*First Setting - 10] ~ [*First Setting + 15]</p>
                                <p className="italic font-bold mt-1">* First Setting = Setting data for [DPW PC32 V9] before Test cut data on "No.15 Page" (9.3).</p>
                                <p className="pl-2">example--&gt; Setting data for [DPW PC32 V9] before Test cut data on "No.15 Page" (9.3) = 94</p>
                                <p className="pl-2">--&gt; Input range of "Disch-Page9-[[339] DPW PC32 V9] = [84 ~ 109]</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[35%]">
                        <img src={diagram} alt="Diagram" className="w-full object-contain" />
                        <div className="mt-8 text-[10px] text-right">
                            <p>Measurement point of roughness</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p34_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page34;