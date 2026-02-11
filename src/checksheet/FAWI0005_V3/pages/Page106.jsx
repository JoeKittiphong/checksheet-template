import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle'; // Assuming SectionTitle is used for consistency
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Assets
import diag1 from "@/assets/FAWI0005_V3/page106_diagram.png"; // Placeholder
import diag2 from "@/assets/FAWI0005_V3/page106_diagram2.png"; // Placeholder

const Page106 = () => {
    const { register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={106}>
            <SectionTitle>23. Optomum accuracy conditions (ACR2) Cutting check [Thickness=40mm-4th] (Continued)</SectionTitle>

            <div className="px-6 py-2 text-[10px] font-sans">

                {/* 23.1 Roughness Check */}
                <div className="mb-6">
                    <h3 className="font-bold text-sm underline mb-2">23.1 Roughness check (For ACR2 40mm 4th 0.20mm Wire)</h3>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="mb-1">Standard Roughness (RzDIN &mu;m)</div>
                            <table className="w-full border-collapse border border-black text-center text-[10px]">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black p-1 w-1/4">Point</th>
                                        <th className="border border-black p-1 w-1/4">X- (4th)</th>
                                        <th className="border border-black p-1 w-1/4">Y- (4th)</th>
                                        <th className="border border-black p-1 w-1/4">X+ (4th)</th>
                                    </tr>
                                    <tr>
                                        <td className="border border-black p-1 font-bold">Up / Mid / Low</td>
                                        <td className="border border-black p-1 font-bold">Under 7.0</td>
                                        <td className="border border-black p-1 font-bold">No Need</td>
                                        <td className="border border-black p-1 font-bold">Under 7.0</td>
                                    </tr>
                                </thead>
                            </table>
                            <div className="mt-2 text-[9px]">
                                Roughness check = Styrus; 2&mu;m , Cut-OFF; 300:1
                            </div>
                            <div className="mt-2 text-sm font-bold">
                                Call ENG Staff If you see Roughness is over 7.0&mu;m RzDIN.
                            </div>
                        </div>

                        {/* Diagram Placeholder 1 */}
                        <div className="w-1/3 flex items-center justify-center min-h-[150px]">
                            <img src={diag1} alt="Roughness Diagram" className="max-h-full max-w-full object-contain" />
                        </div>
                    </div>
                </div>

                {/* 23.2 Size Check */}
                <div className="mb-6">
                    <h3 className="font-bold text-sm underline mb-2">23.2 Size check (For ACR2 40mm 4th 0.20mm Wire)</h3>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="mb-1">Standard Size (mm)</div>
                            <table className="w-3/4 border-collapse border border-black text-center text-[10px]">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black p-1 w-1/3">Point</th>
                                        <th className="border border-black p-1 w-1/3">X</th>
                                        <th className="border border-black p-1 w-1/3">Y</th>
                                    </tr>
                                    <tr>
                                        <td className="border border-black p-1 font-bold">Up / Mid / Low</td>
                                        <td className="border border-black p-1 font-bold text-red-600">7.9980~8.0020</td>
                                        <td className="border border-black p-1 font-bold text-red-600">7.9980~8.0020</td>
                                    </tr>
                                </thead>
                            </table>
                            <div className="mt-1 text-red-600 font-bold text-[10px] ml-1">
                                &#123;Note:Change tolerance -2.0um~+2.0um&#125;
                            </div>
                            <div className="mt-2 text-[9px]">
                                Measure by using Micro Meter.
                            </div>

                            {/* Logic Instructions */}
                            <div className="mt-4 text-[10px] space-y-2">
                                <div className="font-bold text-xs">Size is over(or under) standard. (ขนาดของชิ้นงานใหญ่หรือเล็กกว่า STD)</div>
                                <div className="pl-2">
                                    <p>a. When Maximum size = 8.004mm (เมื่อขนาดใหญ่สุด = 8.004mm)</p>
                                    <p className="pl-4">Change <span className="font-bold">[SV19]</span> setting ([Original value] + 30 ) and cut once more time.</p>
                                    <p className="pl-4">(ให้เพิ่มค่า setting <span className="font-bold">SV19</span> อีก 30 แต้ม และตัดงานอีกครั้ง)</p>
                                </div>
                                <div className="pl-2">
                                    <p>b. When Maximum size = 8.003mm (เมื่อขนาดใหญ่สุด = 8.003mm)</p>
                                    <p className="pl-4">Change <span className="font-bold">[SV19]</span> setting ([Original value] + 20 ) and cut once more time.</p>
                                    <p className="pl-4">(ให้เพิ่มค่า setting <span className="font-bold">SV19</span> อีก 20 แต้ม และตัดงานอีกครั้ง)</p>
                                </div>
                                <div className="pl-2">
                                    <p>c. When Minimum size = 7.997mm (เมื่อขนาดใหญ่สุด = 7.997mm)</p>
                                    <p className="pl-4">Change <span className="font-bold">[SV19]</span> setting ([Original value] - 20 ) and cut once more time.</p>
                                    <p className="pl-4">(ให้ลดค่า setting <span className="font-bold">SV19</span> ลง 20 แต้ม และตัดงานอีกครั้ง)</p>
                                </div>
                                <div className="pl-2">
                                    <p>d. When Minimum size = 7.996mm (เมื่อขนาดใหญ่สุด = 7.996mm)</p>
                                    <p className="pl-4">Change <span className="font-bold">[SV19]</span> setting ([Original value] - 30 ) and cut once more time.</p>
                                    <p className="pl-4">(ให้ลดค่า setting <span className="font-bold">SV19</span> ลง 30 แต้ม และตัดงานอีกครั้ง)</p>
                                </div>
                            </div>

                            <div className="mt-4 text-xs font-bold">
                                Do not change "MODIFY WORKING CORE SV18" this check !!!!!
                            </div>
                            <div className="text-[10px]">
                                This is because the value has already been determined in the previous adjustment.
                            </div>

                        </div>

                        {/* Diagram Placeholder 2 */}
                        <div className="w-1/4 flex items-center justify-center mt-20">
                            <img src={diag2} alt="Size Check Diagram" className="max-h-[300px] object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
};

export default Page106;