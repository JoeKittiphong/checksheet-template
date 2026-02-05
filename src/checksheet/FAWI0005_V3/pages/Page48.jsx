
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page48_diagram.png';

function Page48() {
    // Reference Table Configuration
    const columns = [
        { header: "Point", key: "point", width: "20%", className: "text-center font-bold" },
        { header: "X", key: "x_val", width: "40%", className: "text-center" },
        { header: "Y", key: "y_val", width: "40%", className: "text-center" },
    ];

    const dataSize = [
        { point: "0.20mm", x_val: "7.9980~8.0020", y_val: "7.9980~8.0020", className: "text-red-600 font-bold" }
    ];

    return (
        <A4Paper content={content} currentPage={48}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">18.2 Size check (For STD 80mm 4th 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[65%] flex flex-col gap-4">
                        {/* Table: Standard Size */}
                        <div>
                            <p className="font-bold mb-1">Standard Size (mm)</p>
                            <div className="flex items-center gap-2">
                                <div className="w-[60%]">
                                    <FormQuickTable columns={columns} data={dataSize} />
                                </div>
                                <span className="text-red-600 font-bold">{`{Note:Change tolerance -2.0um~+2.0um}`}</span>
                            </div>
                            <p className="mt-1">Measure by using Micro Meter.</p>
                        </div>

                        {/* Instructions */}
                        <div className="mt-2">
                            <p className="italic mb-2">--- 4th Cut dimensions [Point (X) and (Y)] (For 0.20mm Wire) ---</p>

                            {/* Large Size Case */}
                            <div className="mb-4">
                                <p className="font-bold text-sm">When the measured dimension value is larger than the standard</p>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">"Electric Discharge-Page3-[MODIFYWORKING CR SV 9]" = default + [5 (Up) increments]</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">Input-range [MODIFYWORKING CR SV 9] = -50 ~ +10</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">{`{Note ; Default + 10 (Up)--> 1.0] Decreases by micrometers.`}</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">When the setting is changed, rework it.</p>
                                    <span>←</span>
                                </div>
                            </div>

                            {/* Small Size Case */}
                            <div>
                                <p className="font-bold text-sm">When the measured dimension value is smaller than the standard</p>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">"Discharge-Page3-[MODIFYWORKING CR SV 9]" = Default-[5 (Down) increments]</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">Input-range [MODIFYWORKING CR SV 9] = -50 ~ +10</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">{`{Note:-10 (Down)--> 1.0 is larger as the default setting is µm.`}</p>
                                    <span>←</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="pl-2">When the setting is changed, rework it.</p>
                                    <span>←</span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-center">
                                <p className="font-bold text-sm underline">Do not change MODIFYWORKING CR SV 18 determined by STD-80mm-3rd.</p>
                                <span>←</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-[35%] flex flex-col items-end">
                        <div className="border border-black p-2 w-28">
                            <img src={diagram} alt="Diagram" className="w-full object-contain" />
                        </div>
                        <div className="mt-4 text-[10px] text-right w-full">
                            <p>Measurement point of Size</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p48_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page48;