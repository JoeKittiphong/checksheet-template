import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
// Assuming the user will place the image or has authorized copying existing ones. 
// Using page96_diagram.png as the target name.
import diagram from "@/assets/FAWI0005_V3/page96_diagram.png";

function Page96() {
    return (
        <A4Paper content={content} currentPage={96}>
            <SectionTitle>22.2 Dimension checking IG-S3 (For 0.20mm Wire)</SectionTitle>

            <div className="px-4 mt-4 font-sans text-xs">
                {/* Dimensional Reference Table */}
                <div className="mb-2">
                    <p className="font-bold mb-1">Dimensional reference (mm)</p>
                    <table className="w-full border-collapse border border-black text-center text-[10px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black p-1 w-[10%]">Point</th>
                                <th className="border border-black p-1 w-[15%]">a-e (4th)</th>
                                <th className="border border-black p-1 w-[15%]">b-f (4th)</th>
                                <th className="border border-black p-1 w-[15%]">c-g (4th)</th>
                                <th className="border border-black p-1 w-[15%]">d-h (4th)</th>
                                <th className="border border-black p-1 w-[10%]">Model</th>
                                <th className="border border-black p-1 w-[20%] text-left pl-2 bg-white border-none"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1: P-Type */}
                            <tr>
                                <td rowSpan={3} className="border border-black font-bold bg-white">Range</td>
                                <td colSpan={4} className="border border-black font-bold text-sm">[Max. No.]-[Min. No.] : 2.0um]</td>
                                <td className="border border-black font-bold">P-Type</td>
                                <td className="text-left pl-2 font-bold">{`{Note: Scope of 2.0um}`}</td>
                            </tr>
                            {/* Row 2: G-Type */}
                            <tr>
                                <td colSpan={4} className="border border-black font-bold text-sm">[Max. No.]-[Min. No.] : 2.5um]</td>
                                <td className="border border-black font-bold">G-Type</td>
                                <td className="text-left pl-2 font-bold">{`{Note: Scope of 2.5um}`}</td>
                            </tr>
                            {/* Row 3: Q-Type */}
                            <tr>
                                <td colSpan={4} className="border border-black font-bold text-sm">[Max. No.]-[Min. No.] : 3.0um]</td>
                                <td className="border border-black font-bold">Q-Type</td>
                                <td className="text-left pl-2 font-bold">{`{Note: Scope of 3.0um}`}</td>
                            </tr>
                            {/* Footer: Values */}
                            <tr>
                                <td className="border border-black text-[9px]">Dimension<br />reference (mm)</td>
                                <td className="border border-black font-bold">14.9980~15.0020</td>
                                <td className="border border-black font-bold">14.9980~15.0020</td>
                                <td className="border border-black font-bold">14.9980~15.0020</td>
                                <td className="border border-black font-bold">14.9980~15.0020</td>
                                <td className="border-none"></td>
                                <td className="text-left pl-2 font-bold text-[10px] whitespace-nowrap">{`{Note: Allowable dimension-2.0um~+2.0um}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-4">
                    Use a micrometers for measurement.
                </div>

                <div className="font-bold mb-2 text-[11px]">
                    Despite the roughness being within the standard, refer to ENG personnel if the allowable dimensions are not shown above.
                </div>
                <div className="font-bold mb-4 text-[11px]">
                    Or
                </div>
                <div className="font-bold mb-8 text-[11px]">
                    Return to "[21] (STD2 Thickness 80mm-4th cut Adjust.)" "SV21". Readjust it.
                </div>

                {/* Diagram Section */}
                <div className="flex justify-center mb-10">
                    <img src={diagram} alt="Dimensional Check Diagram" className="h-40 object-contain" />
                </div>

                {/* Backlash Check */}
                <div className="mt-8">
                    <div className="font-bold text-sm mb-4">22.2.1 Backlash check</div>

                    <div className="pl-4 space-y-4 text-xs">
                        <p>Calculate the maximum-minimum difference of dimensions--&gt; [maximum No.]-[minimum No.]</p>

                        <p className="font-bold">Below "0.0020mm" calculated--&gt; OK</p>

                        <p className="font-bold">Calculated more than "0.0020mm"--&gt; NG</p>

                        <p>Calculate the deviation according to the following formula. --&gt; [(a-e) Mid] - [(c-g) Mid]</p>

                        <p>The calculated value is "+ 0.002~-0.002 mm"--&gt; OK.</p>

                        <p>Calculated by "-0.002 mm or lower" or "+ 0.002 mm or higher"--&gt; NG</p>

                        <p className="font-bold italic text-sm mt-2">Check "Sliding Plate" and "Sliding Pipe" for the above NG.</p>

                        <p className="font-bold italic text-sm">If any abnormality is found, repair the machine.</p>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page96;