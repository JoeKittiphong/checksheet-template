
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram from '@/assets/FAWI0005_V3/page65_diagram.png';

function Page65() {
    // Reference Table Configuration
    const columns = [
        { header: "Point", key: "point", width: "20%", className: "text-center font-bold" },
        { header: "X", key: "x_val", width: "40%", className: "text-center" },
        { header: "Y", key: "y_val", width: "40%", className: "text-center" },
    ];

    const dataSize = [
        { point: "0.20mm", x_val: "7.9970~8.0020", y_val: "7.9970~8.0040", className: "text-red-600 font-bold" }
    ];

    return (
        <A4Paper content={content} currentPage={65}>
            <div className="flex flex-col text-[10.5px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm underline">19.2 Dimension checking IG-S4 (For 0.20mm Wire)</SectionTitle>

                <div className="flex gap-4">
                    <div className="w-[65%] flex flex-col gap-4">
                        {/* Table: Standard Size */}
                        <div>
                            <p className="font-bold mb-1">Dimensional reference (mm)</p>
                            <div className="w-[60%]">
                                <FormQuickTable columns={columns} data={dataSize} />
                            </div>
                            <p className="mt-2 text-[11px]">Use a micrometer for measurement.</p>
                        </div>

                        {/* Instructions */}
                        <div className="mt-2 space-y-4">
                            <p className="italic mb-2">--- Dimension [Point (X) and (Y)] (For 0.20 mm Wire) ---</p>

                            {/* Large case */}
                            <div className="space-y-1">
                                <p className="font-bold">When the measured dimension value is larger than the standard</p>
                                <p className="pl-4">"Disch3-Page8-[301]KM4 SV OFST" = Default + [5 (Up) increments]</p>
                                <p className="pl-4 font-bold">Input-range [KM4 SV OFST] = -70 ~ +10 of individual machining settings</p>
                                <p className="pl-4 italic">{`{Note ; The smaller 10 (Up)--> 1.5~2.0 mm is, the smaller the default.}`}</p>
                                <p className="pl-4">When the setting is changed, rework it.</p>
                            </div>

                            {/* Small case */}
                            <div className="space-y-1">
                                <p className="font-bold">When the measured dimension value is smaller than the standard</p>
                                <p className="pl-4">"Disch3-Page8-[KM4 SV OFST]" = Default-[5 (Down) increments]</p>
                                <p className="pl-4 font-bold">Input-range [KM4 SV OFST] = -70 ~ +10 of individual machining settings</p>
                                <p className="pl-4 italic">{`{Note:-10 (Down)--> 1.5~2.0 mm the default setting is greater.}`}</p>
                                <p className="pl-4">When the setting is changed, rework it.</p>
                            </div>

                            {/* Technique section */}
                            <div className="pt-4 space-y-2">
                                <p className="font-bold underline text-sm">Adjustment Processing Technique</p>
                                <p className="font-bold">*When making this adjustment, it is recommended that the X dimension be 8.0000mm ±0.0010mm.</p>
                                <p>It is easier to proceed smoothly with machining adjustment in the subsequent process.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[35%] flex flex-col items-end">
                        <div className="w-full">
                            <img src={diagram} alt="Diagram" className="w-[60%] mx-auto object-contain" />
                        </div>
                        <div className="mt-4 text-[10px] text-right w-full font-bold">
                            <p>Measurement point of Size</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p65_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page65;