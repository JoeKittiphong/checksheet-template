import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import diagram from "@/assets/FAWI0005_V3/page122_diagram.png";

function Page122() {
    return (
        <A4Paper content={content} currentPage={122}>
            <div className="flex flex-col gap-2 px-4 font-sans text-xs">
                <SectionTitle>25.1 Size check (Thickness=80mm-3rd)</SectionTitle>

                {/* Standard Size Table */}
                <div>
                    <div className="font-bold mb-1">Standard Size (mm)</div>
                    <div className="flex items-center gap-4">
                        <table className="border-collapse border border-black text-center text-xs">
                            <thead>
                                <tr>
                                    <th className="border border-black px-4 py-1 bg-gray-100">Point</th>
                                    <th className="border border-black px-4 py-1 bg-gray-100">X- (7th)</th>
                                    <th className="border border-black px-4 py-1 bg-gray-100">Y- (7th)</th>
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

                    <div className="italic mb-2">--- 3rd Cut Size[Point (X) and (Y) (For 0.20mm Wire) ---</div>

                    <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-4">
                            {/* Large Case */}
                            <div>
                                <div className="font-bold mb-1">If Large (Big Data) size value</div>
                                <div className="pl-2 space-y-1">
                                    <p>"Disch2-Page1-[TM FRQ BACK REVISE (V0~V9)]=Original data - [2(Down)each]</p>
                                    <p>Input range of [TM FRQ BACK REVISE (V0~V9)]=-5~+5</p>
                                    <p className="italic">{'{Note ; Original data -2 (Down) --> may make to small size about 1.5~2.0 µm'}</p>
                                    <p>Re-test Cut after change setting data.</p>
                                </div>
                            </div>

                            {/* Small Case - Exact transcription */}
                            <div className="mt-6">
                                <div className="font-bold mb-1">When the measured dimension value* Aisd jsumst aallll e1r0 titheamns ftrhoem sVta0 ntod 9a rind the same way.</div>
                                <div className="pl-2 space-y-1">
                                    <p>Discharge 2-Page1-[TM FRQ BACK REV (V0~V9)] = default + [2 (Up) increments]</p>
                                    <p>Input-range [TM frequency backcompensation V0 to 9] =-5 to +5</p>
                                    <p className="italic">{'{Note ; Default + 2 (larger by Up)--> 1.5~2.0 mm)'}</p>
                                    <p>When the setting is changed, rework it.</p>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-8 text-xs text-gray-600">
                                ※Compared to the conventional individual machining SV correction, TM frequency back compensation tends to be reversed.
                            </div>
                        </div>

                        {/* Diagram Section */}
                        <div className="w-[200px] flex flex-col items-center justify-start pt-4">
                            <div className="p-2">
                                <img
                                    src={diagram}
                                    alt="Measurement Point Diagram"
                                    className="w-[120px] object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.parentNode.innerHTML = '<div class="w-[120px] h-[200px] bg-gray-200 flex items-center justify-center text-red-500 font-bold border border-dashed border-red-500 text-[10px] p-2 text-center">Image not found: page122_diagram.png</div>';
                                    }}
                                />
                            </div>
                            <div className="text-[10px] mt-1 text-center">Measurement point of Size</div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page122;