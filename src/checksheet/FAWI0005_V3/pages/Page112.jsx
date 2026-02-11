import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page112() {

    // Table: Check (For ACR2 20mm 7th 0.20mm Wire)
    const columns = [
        { header: "Point", key: "point", width: "25%", className: "text-center" },
        { header: "X- (7th)", key: "x_minus", width: "25%", className: "text-center" },
        { header: "Y- (7th)", key: "y_minus", width: "25%", className: "text-center" },
        { header: "X+ (7th)", key: "x_plus", width: "25%", className: "text-center" },
    ];

    const data = [
        { id: "row1", point: "0.20mm", x_minus: "Check", y_minus: "Check", x_plus: "Check" }
    ];

    return (
        <A4Paper content={content} currentPage={112}>
            <div className="p-4 text-xs font-sans">
                <SectionTitle>24.3 Line Surface Check (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>

                <div className="mb-4 font-bold">
                    Check under White fluorescent light ( Distance between Work-Piece to Light (White Light) = Under 2.5m)
                </div>

                <div className="w-[350px] mb-8">
                    <FormQuickTable
                        columns={columns}
                        data={data}
                        className="text-sm"
                        headerClassName="bg-gray-100 font-bold"
                        cellClassName={(key) => (key !== 'point' ? "font-bold" : "")}
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="mb-2">Check all surface</p>
                        <p className="font-bold">No wire line, No <span className="text-red-600">Uneven</span> surface, No rough face by Eye Check !!</p>
                    </div>

                    <div className="mt-8">
                        <div className="flex gap-2">
                            <span>1.</span>
                            <div>
                                <p className="mb-2">Still wire line, not even surface, rough face by eye check.</p>
                                <p className="mb-2 font-bold">"Disch-Page4-[[131~140] DPW PC01-21 V0~V9] = Original data + [**]"</p>
                                <p className="mb-2">Input setting value =&gt;&gt; Refer to table [22.4.B]</p>
                                <p>Re-test Cut after change setting data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page112;