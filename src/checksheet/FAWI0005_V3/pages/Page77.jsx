
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagramTop from "@/assets/FAWI0005_V3/page77_diagram_top.png";
import diagramSide from "@/assets/FAWI0005_V3/page77_diagram_side.png";

function Page77() {

    const columns = [
        { header: "Point", key: "point", width: "15%", className: "font-bold bg-white", isLabel: true },
        { header: "a (4th)", key: "a", width: "12%", type: "checkbox" },
        { header: "b (4th)", key: "b", width: "12%", type: "checkbox" },
        { header: "c (4th)", key: "c", width: "12%", type: "checkbox" },
        { header: "d (4th)", key: "d", width: "12%", type: "checkbox" },
        { header: "e (4th)", key: "e", width: "12%", type: "checkbox" },
        { header: "f (4th)", key: "f", width: "12%", type: "checkbox" },
        { header: "g (4th)", key: "g", width: "12%", type: "checkbox" },
    ];

    // Using checkboxes for the "Check" requirement
    const data = [
        {
            point: "0.20mm",
            a: "p77_check_a",
            b: "p77_check_b",
            c: "p77_check_c",
            d: "p77_check_d",
            e: "p77_check_e",
            f: "p77_check_f",
            g: "p77_check_g",
            className: "h-12"
        },
    ];

    return (
        <A4Paper content={content} currentPage={77}>
            <SectionTitle>20.3 IG-S4 checking streaks and unevenness</SectionTitle>

            <div className="p-4 text-xs font-sans">
                <div className="mb-2">
                    Check under White fluorescent light ( Distance between Work-Piece to Light = Under 2.5m)
                </div>

                <FormQuickTable
                    columns={columns}
                    data={data}
                    className="text-center mb-6"
                />

                <div className="flex gap-4">
                    <div className="w-3/4">
                        <div className="mb-4">
                            Check all surface
                        </div>
                        <div className="mb-8 font-bold">
                            No wire line, No <span className="text-red-600">Uneven</span> surface, No rough face by Eye Check !!
                        </div>

                        <div className="mb-2 italic">
                            --- 4th Cut Surface---
                        </div>
                        <div className="mb-4 pl-4">
                            "Disch-Page8-[DPW PC03-23 V11] = default + [1]
                        </div>
                        <div className="mb-6">
                            When the setting is changed, rework it.
                        </div>

                        {/* Max Input Command */}
                        <div className="pl-4 mb-8">
                            <div className="font-bold mb-1">Max. input command [DPW PC03-23 V11]= [10] ~ [-10]</div>
                            <div className="mb-1">e.g.-&gt; pre-processing setpoint [DPW PC03-23 V11] = 109]</div>
                            <div>--&gt; The max. input command is "Disch-Page8-[DPW PC03-23 V11] = [99 ~ 119].</div>
                        </div>

                        {/* 20.4 Section */}
                        <div className="mb-2 text-sm">
                            20.4 How to set DHF Servo SV Correction DPWL
                        </div>
                        <div className="pl-4 mb-2">
                            Use "0" as the initial value for Disch 3-Page 8 - [DHF SV OFFSET DPW].
                        </div>
                        <div className="pl-4 mb-2">
                            For the second and subsequent processes, enter the value of correction value H296
                        </div>
                        <div className="pl-8 mb-4">
                            in the NC program of the previous process.
                        </div>

                        <div className="pl-4 mb-2">
                            If the judgment is OK and
                        </div>
                        <div className="pl-4 mb-4 font-mono">
                            -800.0   (DHF SV OFFSET DPW)-"H296"   +800.0
                        </div>

                        <div className="pl-4 font-bold">
                            The test is passed when the following equation is true. Finish processing and move on to the next process.
                        </div>
                    </div>

                    {/* Diagrams */}
                    <div className="w-1/4 flex flex-col items-center">
                        <div className="mb-12">
                            <img src={diagramTop} alt="Top View" className="w-24 mb-2" />
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={diagramSide} alt="Side View" className="w-28 mb-2" />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page77;