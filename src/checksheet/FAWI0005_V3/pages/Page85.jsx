
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page47_diagram.png'; // Reusing diagram as requested "copy sample"

function Page85() {
    // Reference Tables Configuration
    const columns = [
        { header: "Point", key: "point", width: "25%", className: "text-center font-bold" },
        { header: "X- (4th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (4th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (4th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const dataRa = [
        { point: "0.20mm", x_minus: "0.270~0.360", y_minus: "No need", x_plus: "0.270~0.360" }
    ];

    const dataRz = [
        { point: "0.20mm", x_minus: "2.30~3.30", y_minus: "No need", x_plus: "2.30~3.30" }
    ];

    return (
        <A4Paper content={content} currentPage={85}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2 font-sans">

                <SectionTitle className="mt-0 w-max text-sm">21.1 Roughness check (For STD2 80mm 4th 0.20mm Wire)</SectionTitle>

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

                            <p className="italic mb-2">--- 4th Cut quality (For 0.20mm Wire) ---</p>

                            {/* Big Data Case */}
                            <div className="mb-4">
                                <p className="font-bold">When the measured surface roughness is larger than the reference value (rough)</p>
                                <p className="pl-2">Disch-Page7-[[274] DPW PC2-22 V13] = source data-[**]</p>
                                <p className="pl-2 mt-1">{`{Note ; original data-5-> surface roughness equal to-0.01mmRa of measured values.}`}</p>
                                <p className="pl-2">When the setting is changed, rework it.</p>
                                <p className="font-bold mt-1">Input range [DPW PC02-22 V13] = [*Initial value-20] ~ [*Initial value + 15]</p> <span className="float-right mr-4">&larr;</span>
                                <p className="pl-2">e.g.,--&gt; Pre-processing setting value [DPW PC02-22 V13] "No.16 Page" (9.5) = 124</p>
                                <p className="pl-2">--&gt; The input-range is "Disch-Page7-[[274] DPW PC02-22 V13] = [104 ~ 139].</p> <span className="float-right mr-4">&larr;</span>
                            </div>

                            {/* Small Data Case (Using text from image which repeats similar logic but for 'smaller') */}
                            {/* Wait, the image provided in text has specific text for 'smaller' case too, let me re-read user provided text block */}

                            <div>
                                <p className="font-bold">When the measured surface roughness is smaller than the reference value (fine)</p>
                                <p className="pl-2">"Disch-Page7-[[274] DPW PC02-22 V13" = Default + [**]</p>
                                <p className="pl-2 mt-1">{`{Note ; original data + 5--> measured value + surface roughness equal to 0.01mmRa}`}</p>
                                <p className="pl-2">When the setting is changed, rework it.</p>
                                <p className="font-bold mt-1">Input range [DPW PC02-22 V13] = [*Initial value-20] ~ [*Initial value + 15]</p> <span className="float-right mr-4">&larr;</span>
                                <p className="pl-2">e.g.,--&gt; Pre-processing setting value [DPW PC02-22 V13] "No.16 Page" (9.5) = 124</p>
                                <p className="pl-2">--&gt; The input-range is "Discharge-Page7-[[274] DPW PC02-22 V13] = [104 ~ 139].</p> <span className="float-right mr-4">&larr;</span>
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
            </div>
        </A4Paper>
    );
}

export default Page85;