
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page47_diagram.png';

function Page47() {
    // Reference Tables Configuration
    const columns = [
        { header: "Point", key: "point", width: "25%", className: "text-center font-bold" },
        { header: "X- (4th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (4th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (4th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const dataRa = [
        { point: "0.20mm", x_minus: "0.3300~0.4300", y_minus: "No need", x_plus: "0.3300~0.4300" }
    ];

    const dataRz = [
        { point: "0.20mm", x_minus: "2.8000~3.4000", y_minus: "No need", x_plus: "2.8000~3.4000" }
    ];

    return (
        <A4Paper content={content} currentPage={47}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">18.1 Roughness check (For STD 80mm 4th 0.20mm Wire)</SectionTitle>

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

                            <p className="italic mb-2">--- 4th Cut Surface (For 0.20mm Wire) ---</p>

                            {/* Big Data Case */}
                            <div className="mb-4">
                                <p className="font-bold">If Rough (Big Data) surface value</p>
                                <p className="pl-2">"Disch-Page9-[[357] DPW PC12 V6] and Disch-Page9-[[358] DPW PC12 V7]</p>
                                <p className="pl-2">= Original data - [**] (V6 and V7 at same time)</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data - 2 --> may Original value -0.01mmRa fine surface}`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                                <p className="font-bold mt-1">Input range of [DPW PC32 V6]= [*First Setting - 10] ~ [*First Setting + 15]</p>
                                <p className="italic font-bold mt-1">* First Setting = Setting data for [DPW PC12 V6] before Test cut data on "No.15 Page" (9.3).</p>
                                <p className="pl-2">example--&gt; Setting data for [DPW PC12 V6] before Test cut data on "No.15 Page" (9.3) = 64</p>
                                <p className="pl-2">--&gt; Input range of "Disch-Page9-[[357] DPW PC12 V6] = [54 ~ 79]</p>
                            </div>

                            {/* Small Data Case */}
                            <div>
                                <p className="font-bold">If Fine (Small Data) surface value</p>
                                <p className="pl-2">"Disch-Page9-[[357] DPW PC12 V6] and Disch-Page9-[[358] DPW PC12 V7]</p>
                                <p className="pl-2">= Original data + [**] (V6 and V7 at same time)</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data + 2 --> may Original value +0.01mmRa rough surface}`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                                <p className="font-bold mt-1">Input range of [DPW PC12 V6]= [*First Setting - 10] ~ [*First Setting + 15]</p>
                                <p className="italic font-bold mt-1">* First Setting = Setting data for [DPW PC12 V6] before Test cut data on "No.15 Page" (9.3).</p>
                                <p className="pl-2">example--&gt; Setting data for [DPW PC12 V6] before Test cut data on "No.15 Page" (9.3) = 64</p>
                                <p className="pl-2">--&gt; Input range of "Disch-Page9-[[357] DPW PC12 V6] = [54 ~ 79]</p>
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
                    <FormCheckedBox name="p47_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page47;