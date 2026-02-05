
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagram1 from "@/assets/FAWI0005_V3/page76_diagram_1.png";
import diagram2 from "@/assets/FAWI0005_V3/page76_diagram_2.png";
import diagram3 from "@/assets/FAWI0005_V3/page76_diagram_3.png";

function Page76() {

    const columns = [
        { header: "Point", key: "point", width: "12%", rowGroup: true, className: "font-bold bg-white" },
        { header: "a-e (4th)", key: "ae", width: "14%" },
        { header: "b-f (4th)", key: "bf", width: "14%" },
        { header: "c-g (4th)", key: "cg", width: "14%" },
        { header: "d-h (4th)", key: "dh", width: "14%" },
        { header: "Machine", key: "machine", width: "12%", className: "font-bold" },
        // New Notes Column: No border, larger width for text
        { header: "", key: "notes", width: "20%", className: "border-0 bg-transparent", bodyClassName: "border-0 text-left bg-white px-2" },
    ];

    const data = [
        {
            point: "Range",
            ae: "[ Max No. ] - [ Min No. ] : 2.0um",
            ae_colSpan: 4,
            machine: "P-Type",
            notes: "{Note:Range of target 2.0um}",
            className: "h-10 font-bold"
        },
        {
            point: "Range",
            ae: "[ Max No. ] - [ Min No. ] : 2.5um",
            ae_colSpan: 4,
            machine: "G-Type",
            notes: "{Note:Range of target 2.5um}",
            className: "h-10 font-bold"
        },
        {
            point: "Range",
            ae: "[ Max No. ] - [ Min No. ] : 3.0um",
            ae_colSpan: 4,
            machine: "Q-Type",
            notes: "{Note:Range of target 3.0um}",
            className: "h-10 font-bold"
        },
        {
            point: "Size",
            ae: "14.9980~15.0020",
            bf: "14.9980~15.0020",
            cg: "14.9980~15.0020",
            dh: "14.9980~15.0020",
            machine: "", // Empty machine cell
            notes: "{Note:Size of tolerance -2.0um~+2.0um}",
            notes_className: "text-[10px]" // Use row-specific class for note styling if needed, but bodyClassName handles main style
        }
    ];

    return (
        <A4Paper content={content} currentPage={76}>
            <SectionTitle>20.2 Size check IG-S4 (For 0.20mm Wire)</SectionTitle>

            <div className="p-4 text-xs font-sans">
                <div className="font-bold">Standard Size (mm)</div>
                <FormQuickTable
                    columns={columns}
                    data={data}
                    className="text-center"
                />

                <div className="flex flex-col gap-1 mb-2 text-xs">
                    {/* Notes are now in the table */}
                </div>

                <div className="mb-2">
                    Measure by using Micro Meter.
                </div>

                <div className="mb-2">
                    --- Dimension [Point (X) and (Y)] (For 0.20 mm Wire) ---
                </div>

                <div className="mb-2 font-bold space-y-2">
                    <div>When the roughness is outside the allowable dimensions shown above even though the roughness is within the standard</div>
                    <div>Return to the [19] (IG-S4 Thickness 80mm-3rd cut Adjustment) after completion of the adjustment and perform the processing again.</div>
                </div>

                {/* Diagrams */}
                <div className="flex justify-around items-end mb-5">
                    <div className="flex flex-col items-center">
                        <img src={diagram1} alt="Top View" className="w-24 mb-2" />
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={diagram2} alt="Arrow View" className="w-32 mb-2" />
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={diagram3} alt="Side View" className="w-26 mb-2" />
                        <div className="text-[10px]">Measurement point of Size</div>
                    </div>
                </div>

                {/* Back lash Check */}
                <div>
                    <h3 className="text-lg font-bold mb-2">21.2.1 Back lash Check</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span>Culculate Range error fallowing formula --&gt;</span>
                            <span className="font-bold">[ Max No. ] - [ Min No. ]</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Culculate <span className="font-bold">Range</span> of Result is</span>
                            <span className="font-bold text-red-600">"Under 0.0020mm"</span>
                            <span>--&gt; OK</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Culculate <span className="font-bold">Range</span> of Result is</span>
                            <span className="font-bold text-red-600">"Over 0.0020 mm"</span>
                            <span>--&gt; NG</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <span>Culculate Size error fallowing formula --&gt;</span>
                            <span className="font-bold">[ (a-e) Mid ] - [ (c-g) Mid ]</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Culculate Result is</span>
                            <span className="font-bold">"+0.002~-0.002 mm"</span>
                            <span>--&gt; OK</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Culculate Result is</span>
                            <span className="font-bold">"Under -0.002 mm"</span>
                            <span>or</span>
                            <span className="font-bold">"Over +0.002 mm"</span>
                            <span>--&gt; NG</span>
                        </div>

                        <div className="font-bold italic mt-2">
                            Check "Slide Plate" and "Slide Pipe" if you find that is not IG-S4
                        </div>
                        <div className="font-bold italic">
                            Repair machine if you find abnormal thing.
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page76;