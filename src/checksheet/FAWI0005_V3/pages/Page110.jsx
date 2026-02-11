import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Assets (Placeholder names)
import diagramSide from "@/assets/FAWI0005_V3/page110_diagram_side.png";

function Page110() {

    // Table 1: Standard Roughness (Ra um)
    const raColumns = [
        { header: "Point", key: "point", width: "25%", className: "text-center" },
        { header: "X- (7th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (7th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (7th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const raData = [
        { id: "row1", point: "0.20mm", x_minus: "0.15~0.20", y_minus: "No need", x_plus: "0.15~0.20" }
    ];

    // Table 2: Standard Roughness (RzDIN um)
    const rzColumns = [
        { header: "Point", key: "point", width: "25%", className: "text-center" },
        { header: "X- (7th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (7th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (7th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const rzData = [
        { id: "row1", point: "0.20mm", x_minus: "~1.9", y_minus: "No need", x_plus: "~1.9" }
    ];

    return (
        <A4Paper content={content} currentPage={110}>
            <div className="p-4 text-xs font-sans">
                <SectionTitle>24.1 Roughness check (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4 mb-4">
                    <div className="w-2/3">
                        <div className="mb-4">
                            <h3 className="font-bold mb-1">Standard Roughness (Ra <span style={{ fontFamily: 'serif' }}>μ</span>m) <span className="font-normal">Have priority "Ra" value over "RzDIN".</span></h3>
                            <div className="w-[300px]">
                                <FormQuickTable
                                    columns={raColumns}
                                    data={raData}
                                    className="text-xs"
                                    headerClassName="bg-gray-100 font-bold"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold mb-1">Standard Roughness (RzDIN <span style={{ fontFamily: 'serif' }}>μ</span>m)</h3>
                            <div className="w-[300px]">
                                <FormQuickTable
                                    columns={rzColumns}
                                    data={rzData}
                                    className="text-xs"
                                    headerClassName="bg-gray-100 font-bold"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            Roughness check = Styrus; 2<span style={{ fontFamily: 'serif' }}>μ</span>m , Cut-OFF; 300:1
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold text-sm mb-4">Adjust rourhness to STD fallowing if you see over or under STD.</h3>

                            <p className="italic mb-2">--- 7th Cut Surface (For 0.20mm Wire) ---</p>

                            <div className="space-y-4">
                                <div>
                                    <p className="mb-1">If Rough (Big Data) surface value</p>
                                    <p className="mb-1">"Disch-Page4-[[131~140] DPW PC01-21 V0~V9] = Original data - [**]</p>
                                    <p className="mb-1">Input setting value =&gt;&gt; Refer to table [22.4.A]</p>
                                    <p>Re-test Cut after change setting data.</p>
                                </div>

                                <div className="mt-8">
                                    <p className="mb-1">If Fine (Small Data) surface value</p>
                                    <p className="mb-1">"Disch-Page4-[[131~140] DPW PC01-21 V0~V9] = Original data + [**]</p>
                                    <p className="mb-1">Input setting value =&gt;&gt; Refer to table [22.4.B]</p>
                                    <p>Re-test Cut after change setting data.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col items-center">
                        <img src={diagramSide} alt="Side Diagram" className="w-[300px] mb-4" />
                        <div className="text-[10px] text-right w-full pr-8">
                            Measurement point of roughness
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page110;