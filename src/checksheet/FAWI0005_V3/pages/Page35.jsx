
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page35_diagram.png';

function Page35() {
    // Reference Table Configuration
    const columns = [
        { header: "Point", key: "point", width: "20%", className: "text-center font-bold" },
        { header: "X", key: "x_val", width: "40%", className: "text-center" },
        { header: "Y", key: "y_val", width: "40%", className: "text-center" },
    ];

    const dataSize = [
        { point: "0.20mm", x_val: "7.9970~8.0030", y_val: "7.9970~8.0030", className: "text-red-500" }
    ];

    return (
        <A4Paper content={content} currentPage={35}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">17.2 Size check (For STD 80mm 3rd 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[65%] flex flex-col gap-4">
                        {/* Table: Standard Size */}
                        <div>
                            <p className="font-bold mb-1">Standard Size (mm)</p>
                            <div className="flex items-center gap-2">
                                <div className="w-[60%]">
                                    <FormQuickTable columns={columns} data={dataSize} />
                                </div>
                                <span className="text-red-500 font-bold">{`{Note:Change tolerance -3.0um~+3.0um}`}</span>
                            </div>
                            <p className="mt-1">Measure by using Micro Meter.</p>
                        </div>

                        {/* Instructions */}
                        <div className="mt-2">
                            <p className="font-bold text-sm mb-2">Adjust Size to STD fallowing if you see over or under STD.</p>

                            <p className="italic mb-2">--- 3rd Cut Size [Point (X) and (Y)] (For 0.20mm Wire) ---</p>

                            {/* Large Size Case */}
                            <div className="mb-4">
                                <p className="font-bold">If Large (Big Data) size value</p>
                                <p className="pl-2">"Disch-Page3-[MODIFY WORKING CORE SV18]"= Original data + [5 (Up) each]</p>
                                <p className="pl-2">Input range of [MODIFY WORKING CORE SV18] = -70 ~ +10</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data + 10 (Up) --> may make to small size about 1.5~2.0 µm`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                            </div>

                            {/* Small Size Case */}
                            <div>
                                <p className="font-bold">If Small size value</p>
                                <p className="pl-2">"Disch-Page3-[MODIFY WORKING CORE SV18]"= Original data - [5 (Down) each]</p>
                                <p className="pl-2">Input range of [MODIFY WORKING CORE SV18] = -70 ~ +10</p>
                                <p className="pl-2 mt-1">{`{Note ; Original data - 10 (Down) --> may make to big size about 1.5~2.0 µm`}</p>
                                <p className="pl-2">Re-test Cut after change setting data.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[35%]">
                        <img src={diagram} alt="Diagram" className="w-20 object-contain" />
                        <div className="mt-8 text-[10px] text-right">
                            <p>Measurement point of Size</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p35_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page35;