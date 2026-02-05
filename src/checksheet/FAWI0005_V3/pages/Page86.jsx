
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page48_diagram.png'; // Reusing diagram from Page 48 as consistent with Size Check pattern

function Page86() {
    // Reference Table Configuration
    const columns = [
        { header: "Point", key: "point", width: "15%", className: "text-center font-bold" },
        { header: "X", key: "x_val", width: "30%", className: "text-center font-bold" },
        { header: "Y", key: "y_val", width: "30%", className: "text-center font-bold" },
        { header: "Machine", key: "machine", width: "25%", className: "text-center font-bold" },
    ];

    const dataSize = [
        { point: "0.20mm", x_val: "7.9985~8.0015", y_val: "7.9985~8.0015", machine: "P-Type", className: "font-bold" },
        { point: "0.20mm", x_val: "7.9980~8.0020", y_val: "7.9980~8.0020", machine: "G/Q-Type", className: "font-bold" }
    ];

    return (
        <A4Paper content={content} currentPage={86}>
            <div className="flex flex-col text-[11px] h-full relative p-4 space-y-2 font-sans">

                <SectionTitle className="mt-0 w-max text-sm">21.2 Size check (For STD2 80mm 4th 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[65%] flex flex-col gap-4">
                        {/* Table: Standard Size */}
                        <div>
                            <p className="font-bold mb-1">Standard Size (mm)</p>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <FormQuickTable columns={columns} data={dataSize} />
                                    </div>
                                </div>
                                <div className="flex flex-col text-xs font-bold pl-1">
                                    <span>{`{Note: Change-1.5um~+1.5um of tolerance}`}</span>
                                    <span>{`{Note: Change-2.0um~+2.0um of tolerance}`}</span>
                                </div>
                            </div>
                            <p className="mt-1">Measure by using Micro Meter.</p>
                        </div>

                        {/* Instructions */}
                        <div className="mt-2">
                            <p className="italic mb-2">--- 4th Cut dimensions [Point (X) and (Y)] (For 0.20mm Wire) ---</p>

                            {/* Large Size Case */}
                            <div className="mb-4">
                                <p className="font-bold text-sm">When the measured dimension value is larger than the standard</p>
                                <p className="pl-2 text-sm">"Disch-Page10-[MODIFYWORKING CR SV 21]" = Default + [5 (Up) increments]</p>
                                <p className="pl-2 text-sm">Input-range [SV21] =-35 ~ +55 of individual machining settings]</p>
                                <p className="pl-2 text-sm">{`{Note ; The smaller 10 (Up)--> 1.5~2.0 um is, the smaller the default.}`}</p>
                                <p className="pl-2 text-sm">When the setting is changed, rework it.</p>
                            </div>

                            {/* Small Size Case */}
                            <div className="mb-4">
                                <p className="font-bold text-sm">When the measured dimension value is smaller than the standard</p>
                                <p className="pl-2 text-sm">"Disch-Page10-[MODIFYWORKING CR SV 21]" = Default-[5 (Down) increments]</p>
                                <p className="pl-2 text-sm">Input-range [SV21] =-35 ~ +55 of individual machining settings]</p>
                                <p className="pl-2 text-sm">{`{Note:-10 (Down)--> 1.5~2.0 mm the default setting is greater.}`}</p>
                                <p className="pl-2 text-sm">When the setting is changed, rework it.</p>
                            </div>

                            {/* Speed/Time Case */}
                            <div>
                                <p className="font-bold text-sm">*If the machining speed or time of the 3rd cut is out of the allowable value</p>
                                <p className="pl-2 text-sm">Disch-Page10-[[MODIFYWORKING CR SV 29]"= Default + [5 (Up) each ].</p>
                                <p className="pl-2 text-sm">Input range [[MODIFYWORKING CR SV SV29] = -75 to <span className="text-red-500 font-bold">+20</span></p>
                                <p className="pl-2 text-sm">{`{Note: Default value + 10 (Up) --> 0.5 um less.}`}</p>
                                <div className="pl-8 mt-1 text-sm">
                                    <p>The machining speed of the 3rd cut is slowed down by about 0.5 mm/min.</p>
                                    <p>Machining time of the 3rd cut is increased by about 0.5 min.</p>
                                </div>
                                <p className="pl-2 mt-2 text-sm">If you change the setting, please re-machine.</p>
                            </div>

                        </div>
                    </div>

                    <div className="w-[35%] flex flex-col items-end">
                        <div className="p-2 w-28">
                            <img src={diagram} alt="Diagram" className="w-full object-contain" />
                        </div>
                        <div className="mt-4 text-[10px] text-right text-sm w-full">
                            <p>Measurement point of Size</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex justify-end">
                    <FormCheckedBox name="p86_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page86;