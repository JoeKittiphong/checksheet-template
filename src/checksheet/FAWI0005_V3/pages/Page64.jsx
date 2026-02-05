
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagramTop from '@/assets/FAWI0005_V3/page64_diagram_top.png';
import diagramSide from '@/assets/FAWI0005_V3/page64_diagram_side.png';

function Page64() {
    // Reference Tables Configuration
    const columns = [
        { header: "Point", key: "point", width: "25%", className: "text-center font-bold" },
        { header: "X- (4th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (4th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (4th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const dataRa = [
        { point: "0.20mm", x_minus: "0.430~0.630", y_minus: "No Need", x_plus: "0.430~0.630" }
    ];

    const dataRz = [
        { point: "0.20mm", x_minus: "3.70~4.50", y_minus: "No Need", x_plus: "3.70~4.50" }
    ];

    return (
        <A4Paper content={content} currentPage={64}>
            <div className="flex flex-col text-[10.5px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm underline">19.1 Roughness check IG-S4 (For 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[70%] flex flex-col gap-4">
                        {/* Tables Section */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="font-bold mb-1">Standard Roughness (Ra µm) <span className="font-normal pl-2">Have priority "Ra " value over "RzDIN".</span></p>
                                <FormQuickTable columns={columns} data={dataRa} />
                            </div>

                            <div>
                                <p className="font-bold mb-1">Standard Roughness (RzDIN µm)</p>
                                <FormQuickTable columns={columns} data={dataRz} />
                                <p className="mt-1">Roughness check = Styrus; 2µm , Cut-OFF; 300:1</p>
                            </div>
                        </div>

                        {/* Instructions Section */}
                        <div className="mt-2 space-y-4">
                            <p className="font-bold text-sm">Adjust rourhness to STD fallowing if you see over or under STD.</p>

                            {/* Rough Section */}
                            <div>
                                <p className="italic mb-2">---3rd Cut quality (For 0.20mm Wire)---</p>
                                <p className="font-bold">When the measurement surface roughness is larger than the reference value (rough)</p>
                                <div className="pl-4 space-y-1">
                                    <p>Electric-disch-Page11-[GALPM machining V6] = Original data-[**]</p>
                                    <p className="italic text-[10px]">{`{Note ; original data-5-> surface roughness equal to-0.01mmRa of measured values.}`}</p>
                                    <p>When the setting is changed, rework it.</p>
                                    <div className="flex items-center gap-2 font-bold pt-2">
                                        <span>Input-range [GALPM machining V6]= [15] ~ [-15]</span>
                                        <span>←</span>
                                    </div>
                                    <p>Ex.-&gt; Setting prior to machining [GALPM machining V6] = 99]</p>
                                    <div className="flex items-center gap-2">
                                        <span>--&gt; Max. input command is "Disch-Page11-[GALPM machining V6] = [84 ~ 114].</span>
                                        <span className="font-bold">←</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fine Section */}
                            <div>
                                <p className="font-bold">When the measurement surface roughness is smaller than the reference value (fine)</p>
                                <div className="pl-4 space-y-1">
                                    <p>Electric-Disch-Page11-[GALPM machining V6] = original data + [**]</p>
                                    <p className="italic text-[10px]">{`{Note ; original data + 5--> measured value + surface roughness equal to 0.01mmRa}`}</p>
                                    <p>When the setting is changed, rework it.</p>
                                    <div className="flex items-center gap-2 font-bold pt-2">
                                        <span>Input-range [GALPM machining V6]= [15] ~ [-15]</span>
                                        <span>←</span>
                                    </div>
                                    <p>Ex.-&gt; Setting prior to machining [GALPM machining V6] = 99]</p>
                                    <div className="flex items-center gap-2">
                                        <span>--&gt; Max. input command is "Disch-Page11-[GALPM machining V6] = [84 ~ 114].</span>
                                        <span className="font-bold">←</span>
                                    </div>
                                </div>
                            </div>

                            <div className="font-bold pt-2">
                                <p>When "Disch-Page11-[GALPM machining V6]" is changed, P67 is calculated.</p>
                                <p className="mt-1 font-normal">If the setting is changed, return to "[17] (STD thickness 80 mm - 4th cut adjustment)" and readjust.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[30%] space-y-8">
                        <div>
                            <img src={diagramTop} alt="Top Diagram" className="w-[80%] mx-auto object-contain" />
                        </div>
                        <div>
                            <img src={diagramSide} alt="Side Diagram" className="w-[60%] mx-auto object-contain" />
                            <p className="mt-2 text-[9px] text-center font-bold">Measurement point of roughness</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <FormCheckedBox name="p64_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page64;