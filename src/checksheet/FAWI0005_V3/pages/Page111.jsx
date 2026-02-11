import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

// Assets (Placeholder names)
import diagram from "@/assets/FAWI0005_V3/page111_diagram.png";


function Page111() {

    // Table: Standard Size (mm)
    const columns = [
        { header: "Point", key: "point", width: "33%", className: "text-center" },
        { header: "X", key: "x", width: "33%", className: "text-center" },
        { header: "Y", key: "y", width: "33%", className: "text-center" },
    ];

    const data = [
        { id: "row1", point: "0.20mm", x: "7.9980~8.0020", y: "7.9980~8.0020" }
    ];

    return (
        <A4Paper content={content} currentPage={111}>
            <div className="p-4 text-xs font-sans">
                <SectionTitle>24.2 Size check (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>

                <div className="flex gap-8 mb-4">
                    <div className="w-2/3">
                        <div className="mb-4">
                            <h3 className="font-bold mb-1">Standard Size (mm)</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-[300px]">
                                    <FormQuickTable
                                        columns={columns}
                                        data={data}
                                        className="border border-black text-xs"
                                        headerClassName="bg-gray-100 font-bold"
                                        cellClassName={(key) => (key === 'x' || key === 'y' ? "text-red-600 font-bold" : "")}
                                    />
                                </div>
                                <span className="text-red-600 font-bold">{`{Note:Change tolerance -2.0um~+2.0um}`}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            Measure by using Micro Meter.
                        </div>

                        <div className="mb-4 space-y-4 font-bold text-sm">
                            <p>When it is below or above the reference surface roughness. Call your ENG staffs</p>
                            <p>Or</p>
                            <p>Re-adjust the [24] (T40mm-ACR2-4th cut adjustment)" and "SV19" if required. 1</p>
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col items-center pt-8">
                        <img src={diagram} alt="Side Diagram" className="w-[150px] mb-4" />
                        <div className="text-[10px] text-right w-full pr-8">
                            Measurement point of Size
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page111;