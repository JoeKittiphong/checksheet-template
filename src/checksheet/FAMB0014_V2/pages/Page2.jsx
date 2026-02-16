import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0014_V2-setting";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image3_1 from "@/assets/FAMB0014_V2/FAMB0015-3-1.PNG";
import image3_2 from "@/assets/FAMB0014_V2/FAMB0015-3-2.PNG";

function Page2() {
    const { control } = useFormContext();

    const columns = [
        {
            header: "",
            key: "group",
            width: "60px",
            rowGroup: true,
            className: "bg-gray-100 font-bold text-center border border-black align-middle"
        },
        {
            header: "ระยะจาก Quill Support A\nกับ Linear Coil (mm.)",
            key: "dist1",
            width: "220px",
            className: "border border-black",
            render: (name, row) => (
                <div className="flex items-center gap-1 px-2 py-1">
                    <span className="text-xs font-bold">{row.subIdx})</span>
                    <FormChecknumber
                        name={name}
                        label=""
                        inputClass="w-full text-center border-b border-black bg-transparent"
                        hideBottomBorder={true}
                    />
                </div>
            )
        },
        {
            header: "ความหนาของ Spacer (mm.)",
            key: "spacer",
            width: "220px",
            className: "border border-black",
            render: (name, row) => (
                <div className="flex items-center gap-1 px-2 py-1">
                    <span className="text-xs font-bold">{row.subIdx})</span>
                    <FormChecknumber
                        name={name}
                        label=""
                        inputClass="w-full text-center border-b border-black bg-transparent"
                        hideBottomBorder={true}
                    />
                </div>
            )
        },
        {
            header: "ระยะห่างระหว่าง Magnet Plate กับ\nLinear Coil (mm.)",
            key: "gap",
            width: "220px",
            rowGroup: true,
            className: "border border-black align-middle",
            render: (name, row) => (
                <div className="flex items-center gap-2 justify-center px-4 py-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                        {row.circleIdx}
                    </div>
                    <FormChecknumber
                        name={name}
                        label=""
                        inputClass="w-full text-center border-b border-black bg-transparent"
                        hideBottomBorder={true}
                    />
                </div>
            )
        },
    ];

    const generateData = () => {
        const groups = [
            { label: "KB", key: "kb" },
            { label: "คู่ขนาน", key: "parallel" }
        ];
        const data = [];

        groups.forEach(group => {
            for (let i = 1; i <= 4; i++) {
                // Circle index logic: 1 for rows 1-2, 2 for rows 3-4
                const circleIdx = i <= 2 ? 1 : 2;
                data.push({
                    group: group.label,
                    subIdx: i,
                    dist1: `page2.quillSupport.${group.key}.dist1.${i}`,
                    spacer: `page2.quillSupport.${group.key}.spacer.${i}`,
                    // Gap name: uses circleIdx to share name across 2 rows for grouping
                    gap: `page2.quillSupport.${group.key}.gap.${circleIdx}`,
                    circleIdx: circleIdx
                });
            }
        });
        return data;
    };

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="flex flex-col h-full font-bold text-[13px] leading-tight p-2">

                {/* 3. QUILL SUPPORT A CHECK */}
                <h2 className="text-sm font-bold mb-4">
                    3. QUILL SUPPORT A CHECK ระยะห่างของ LINEAR COIL กับ MAGNET PLATE ของแกน Z
                </h2>

                <div className="ml-16 mb-4 font-bold text-xs">ของแกน Z</div>

                {/* Diagrams section */}
                <div className="flex justify-center gap-20 mb-6">
                    <img src={image3_1} alt="Diagram 1" className="h-40 object-contain" />
                    <img src={image3_2} alt="Diagram 2" className="h-40 object-contain" />
                </div>

                {/* Dashed Boxes Layout */}
                <div className="flex gap-4 mb-6 px-4">
                    {/* Left Box */}
                    <div className="flex-1 border-2 border-dashed border-black p-4 flex flex-col justify-between h-32 text-xs">
                        <div className="space-y-1">
                            <p>ระยะห่างระหว่าง Magnet Plate กับ Linear coil</p>
                            <p>ประมาณ 0.6 ~ 0.8 mm</p>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="shrink-0">Depth Vernear No.</span>
                            <FormChecknumber
                                name="page2.depthVernierNo"
                                label=""
                                inputClass="w-full text-center border-b border-black"
                                hideBottomBorder={true}
                            />
                        </div>
                    </div>

                    {/* Right Box - Formula */}
                    <div className="flex-1 border-2 border-dashed border-black p-4 h-32 text-xs">
                        <p className="font-bold mb-2">สูตร (A - B) + C = D</p>
                        <div className="space-y-1">
                            <div className="flex"><span className="w-8 shrink-0">A</span><span>- ขนาดของ Linear Coil</span></div>
                            <div className="flex"><span className="w-8 shrink-0">B</span><span>- ระยะจาก Spacer ถึง Magnet Plate</span></div>
                            <div className="flex"><span className="w-8 shrink-0">C</span><span>- ระยะห่าง Magnet Plate ถึง Linear coil (0.7)</span></div>
                            <div className="flex"><span className="w-8 shrink-0">D</span><span>- ค่า Spacer</span></div>
                        </div>
                    </div>
                </div>

                {/* Main Table Area */}
                <div className="px-4">
                    <FormQuickTable
                        columns={columns}
                        data={generateData()}
                        className="w-full border-collapse"
                    />
                </div>

                {/* Footer Signature */}
                <div className="mt-auto flex justify-end p-4">
                    <div className="w-35 border border-black">
                        <FormCheckedBox
                            name="page2.checkBy"
                            label="Check by/Date"
                            className="h-30"
                        />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page2;