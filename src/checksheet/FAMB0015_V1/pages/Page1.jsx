import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0015_V1-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber"; // Restore import
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";

// Images
import image1_diagram from "@/assets/FAMB0015_V1/FAMB0015-1.PNG"; // Tentative
import image1_diagram2 from "@/assets/FAMB0015_V1/FAMB0015-2.PNG"; // Tentative

function Page1() {
    const { register, watch, setValue, control } = useFormContext(); // Restore control
    const [model, setModel] = useState("AD35L");

    const ranges = {
        "AD35L": 260,
        "AD55L": 360
    };
    const maxVal = ranges[model];

    // Generate columns for Parallel Top z
    const positionColumns = [
        { header: "Position", key: "label", width: "80px", className: "bg-gray-100 font-bold" }
    ];

    for (let i = 0; i <= maxVal; i += 20) {
        positionColumns.push({
            header: i.toString(),
            key: `pos_${i}`,
            width: "35px",
            type: "input",
            className: "text-center"
        });
    }

    const parallelTopZData = [
        { label: "Check", type: "input", key: "row_check" },
        { label: "Rework 1", type: "input", key: "row_rework1" },
        { label: "Ento", type: "input", key: "row_ento" },
        { label: "Rework 2", type: "input", key: "row_rework2" },
    ].map(row => {
        const rowData = { label: row.label };
        for (let i = 0; i <= 360; i += 20) {
            rowData[`pos_${i}`] = `page1.parallelTopZ.${row.key}.pos_${i}`;
        }
        return rowData;
    });

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col h-full font-bold">

                {/* 1. LEVEL AND PARALLEL LM-GUIDE CHECK */}
                <div>
                    <h2 className="text-lg underline">1.LEVEL AND PARALLEL LM-GUIDE CHECK</h2>

                    <div className="flex justify-center relative">
                        {/* Diagram Placeholder */}
                        <img src={image1_diagram} alt="Diagram" className="h-32 object-contain" />
                        {/* Arrows A and B (A) (B) */}
                        <div className="absolute right-10 top-0 flex flex-col gap-2">
                            <div className="flex items-center gap-2 border p-1 rounded cursor-pointer hover:bg-gray-100" onClick={() => setModel("AD35L")}>
                                <div className={`w-4 h-4 border rounded-full ${model === "AD35L" ? "bg-black" : "bg-white"}`}></div>
                                <span>AD35L (260)</span>
                            </div>
                            <div className="flex items-center gap-2 border p-1 rounded cursor-pointer hover:bg-gray-100" onClick={() => setModel("AD55L")}>
                                <div className={`w-4 h-4 border rounded-full ${model === "AD55L" ? "bg-black" : "bg-white"}`}></div>
                                <span>AD55L (360)</span>
                            </div>
                        </div>
                    </div>

                    <p className="font-bold">Parallel Top z</p>
                    <div className="overflow-x-auto">
                        <FormQuickTable
                            columns={positionColumns}
                            data={parallelTopZData}
                            navigationMode="horizontal"
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="text-sm flex items-center gap-2">
                            <span>DIAL NO.</span>
                            <FormChecknumber
                                name="page1.dialNo"
                                label=""
                                inputClass="w-40 text-center"
                            />
                            <span>( Std Diff Max 5 µ )</span>
                        </div>
                    </div>

                    <div className="flex gap-8 mb-6">
                        {/* Level Check */}
                        <div className="flex-1">
                            <p className="font-bold">Level check</p>
                            <p className="text-xs">Before (Data before adjust)</p>
                            <FormLevelTableXAB
                                name="page1.level.before"
                                cols={5}
                                labelA="A"
                                labelB="B(KB)"
                                control={control}
                                showStd={false}
                                showArrows={true}
                            />

                            <p className="text-xs">After</p>
                            <FormLevelTableXAB
                                name="page1.level.after"
                                cols={5}
                                labelA="A"
                                labelB="B(KB)"
                                control={control}
                                showStd={true}
                                showArrows={true}
                                standards={[
                                    { min: 5, max: 5 },
                                    { min: 0, max: 0 },
                                    { min: 0, max: 0 },
                                    { min: 0, max: 0 },
                                    { min: 0, max: 5 }
                                ]}
                            />
                        </div>

                        {/* Parallel Check */}
                        <div className="flex-1">
                            <p className="mb-1 font-bold">Parallel check</p>
                            <FormLevelTableXAB
                                name="page1.parallel"
                                cols={5}
                                labelA="A"
                                labelB="B (KB)"
                                control={control}
                                showStd={false}
                                showArrows={false}
                            />
                            <p className="text-center text-xs mt-1">( Std Diff Max 5 µ )</p>
                        </div>

                        <div className="w-30">
                            <FormCheckedBox
                                name="page1.checkBy"
                                label="CHECK BY/DATE"
                                className="h-30"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. QUILL DEPTH CHECK */}
                <div className="flex-1">
                    <h2 className="text-lg underline">2.QUILL DEPTH CHECK</h2>

                    <div className="flex flex-col">
                        <div className='flex gap-2'>
                            {/* Diagram Placeholder */}
                            <img src={image1_diagram2} alt="Diagram" className="h-32 object-contain" />

                            {/* Part Record Inputs */}
                            <div className="w-2/3 text-xs space-y-2">
                                <p className="font-bold underline mb-1">PART RECORD</p>
                                {[
                                    "LM - GUIDE NO.",
                                    "NUMBER SUPER MYCRO CYLINDER",
                                    "NUMBER COIL (KB)",
                                    "NUMBER COIL (KC)",
                                    "NUMBER MAGNET (L)",
                                    "NUMBER LINEAR SCALE",
                                    "NUMBER QUILL"
                                ].map((label, idx) => (
                                    <div key={idx} className="flex items-center whitespace-nowrap">
                                        <span className="w-48">{label}</span>
                                        <FormChecknumber
                                            name={`page1.partRecord.${idx}`}
                                            label=""
                                            className="flex-1"
                                            inputClass="w-full text-center"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-xs flex items-center gap-2">
                                <FormCheckedBox
                                    name="page1.depth.checkBy"
                                    label="CHECK BY/DATE"
                                    className="h-30"
                                />
                            </div>
                        </div>

                        <div className="w-[100%] flex mt-2 gap-1">
                            <div>
                                {/* DATA CHECK Table */}
                                <p className="text-xs font-bold mb-1">DATA CHECK (A:B) &lt; (C:D) STD C/D = 0.05 mm. - 0.1 mm.</p>
                                <FormQuickTable
                                    columns={[
                                        { header: "POINT", key: "label", className: "bg-gray-100 w-30" },
                                        { header: "A", key: "a", type: "input", className: "w-15 text-center" },
                                        { header: "B (KB)", key: "b", type: "input", className: "w-15 text-center" },
                                        { header: "C", key: "c", type: "input", className: "w-15 text-center" },
                                        { header: "D (KB)", key: "d", type: "input", className: "w-15 text-center" },
                                    ]}
                                    data={[
                                        { label: "DATA CHECK", a: "page1.depth.data.a", b: "page1.depth.data.b", c: "page1.depth.data.c", d: "page1.depth.data.d" },
                                        { label: "ADJUST C/D (KB)", a: "page1.depth.adjust.a", b: "page1.depth.adjust.b", c: "page1.depth.adjust.c", d: "page1.depth.adjust.d" },
                                    ]}
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className='text-xs'>DEPTH VERNIER NO.</span>
                                <FormChecknumber
                                    name="page1.depth.vernierNo"
                                    label=""
                                    inputClass="w-24 text-center"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </A4Paper>
    );
}

export default Page1;
