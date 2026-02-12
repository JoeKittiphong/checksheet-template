import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import imag129 from "@/assets/FAWI0005_V3/page65_diagram.png";


function Page129() {

    // Placeholder for diagram
    const Placeholder = ({ label, className = "h-[200px] w-[120px]" }) => (
        <div className={`bg-gray-200 flex items-center justify-center text-gray-500 text-[8px] text-center border border-dashed border-gray-400 ${className}`}>
            {label}
        </div>
    );

    return (
        <A4Paper content={content} currentPage={129}>
            <div className="flex flex-col gap-2 px-4 font-sans text-xs">
                <SectionTitle>26.1 Size check (Thickness=80mm-4th)</SectionTitle>

                {/* Standard Size Table */}
                <div>
                    <div className="font-bold mb-1">Standard Size (mm)</div>
                    <div className="flex items-center gap-4">
                        <table className="border-collapse border border-black text-center text-xs">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-1 bg-gray-100">Point</th>
                                    <th className="border border-black px-4 py-1 bg-gray-100">X</th>
                                    <th className="border border-black px-4 py-1 bg-gray-100">Y</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-2 py-1">0.20mm</td>
                                    <td className="border border-black px-2 py-1">7.9980~8.0020</td>
                                    <td className="border border-black px-2 py-1">7.9980~8.0020</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="font-bold text-lg">
                            {'{Note :Change tolerance -2.0µm~+2.0µm}'}
                        </div>
                    </div>
                    <div className="mt-1 text-xs">Measure by using Micro Meter.</div>
                </div>

                {/* Adjustment Instructions */}
                <div className="mt-4">
                    <div className="font-bold text-sm mb-2">Adjust Size to STD following if you see over or under STD.</div>

                    <div className="italic mb-2">--- 4th Cut Size[Point (X) and (Y) (For 0.20mm Wire) ---</div>

                    <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-4">
                            {/* Large Case */}
                            <div>
                                <div className="font-bold mb-1">If Large (Big Data) size value</div>
                                <div className="pl-2 space-y-1">
                                    <p>"Disch2-Page3-[ GALPM FRQ BACK RIVISE (V0~V9)]=Original data - [20(Down)each]</p>
                                    <p>Input range of [GALPM FRQ BACK RIVISE (V0~V9)]=-50 ~ +50</p>
                                    <p className="italic">{'{Note ; Original data -20 (Down) --> may make to small size about 1.0 ~ 2.0 µm'}</p>
                                    <p>Re-test Cut after change setting data.</p>
                                </div>
                            </div>

                            {/* Small Case */}
                            <div className="mt-6">
                                <div className="font-bold mb-1">If Small size value</div>
                                <div className="pl-2 space-y-1">
                                    <p>"Disch2-Page3-[GALPM FRQ BACK RIVISE (V0~V9)]=Original data + [20(Up)each]</p>
                                    <p>Input range of [GALPM FRQ BACK RIVISE (V0~V9)]=-50 ~ +50</p>
                                    <p className="italic">{'{Note ; Original data +20 (Up) --> may make to big size about 1.0 ~ 2.0 µm'}</p>
                                    <p>Re-test Cut after change setting data.</p>
                                </div>
                            </div>
                        </div>

                        {/* Diagram Section */}
                        <div className="w-[150px] flex flex-col items-center justify-start pt-4 pr-8">
                            <img src={imag129} alt="" />
                            <div className="text-[10px] mt-1 text-center">Measurement point of Size</div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page129;