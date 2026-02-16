import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";

// Images
import image6_1 from "@/assets/FAMB0016_V2/FAMB0016-6-1.PNG";
import image6_2 from "@/assets/FAMB0016_V2/FAMB0016-6-2.PNG";

function Page4() {
    const { control } = useFormContext();

    const columns = [
        {
            header: "",
            key: "label",
            width: "80px",
            rowGroup: true,
            className: "text-center font-bold bg-gray-100 align-middle"
        },
        {
            header: "ระยะจาก Quill Support A\nกับ Linear Coil (mm)",
            key: "colA",
            width: "200px",
            render: (val, row) => (
                <div className="flex items-center gap-2 px-2">
                    <span className="w-4 text-right">{row.subIndex}.</span>
                    <FormChecknumber
                        name={row.colA_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
                        inputClass="border-b border-black"
                    />
                </div>
            )
        },
        {
            header: "ความหนาของ Spacer (mm)",
            key: "colB",
            width: "200px",
            render: (val, row) => (
                <div className="flex items-center gap-2 px-2">
                    <span className="w-4 text-right">{row.subIndex}.</span>
                    <FormChecknumber
                        name={row.colB_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
                        inputClass="border-b border-black"
                    />
                </div>
            )
        },
        {
            header: "ระยะห่างระหว่าง Magnet Plate\nกับ Linear coil (mm)",
            key: "colC",
            width: "200px",
            rowGroup: true,
            className: "align-middle",
            render: (val, row) => (
                <div className="flex justify-center items-center h-full gap-2 py-2">
                    <div className="w-7 h-7 border border-black rounded-full flex items-center justify-center font-bold text-sm bg-white">
                        {val}
                    </div>
                    <FormChecknumber
                        name={row.colC_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
                        inputClass="border-b border-black"
                    />
                </div>
            )
        }
    ];

    const data = [
        // KB Section
        { label: "KB", subIndex: 1, colA_name: "page4.kb.colA.1", colB_name: "page4.kb.colB.1", colC: "1", colC_name: "page4.kb.colC.1" },
        { label: "KB", subIndex: 2, colA_name: "page4.kb.colA.2", colB_name: "page4.kb.colB.2", colC: "1", colC_name: "page4.kb.colC.1" },
        { label: "KB", subIndex: 3, colA_name: "page4.kb.colA.3", colB_name: "page4.kb.colB.3", colC: "2", colC_name: "page4.kb.colC.2" },
        { label: "KB", subIndex: 4, colA_name: "page4.kb.colA.4", colB_name: "page4.kb.colB.4", colC: "2", colC_name: "page4.kb.colC.2" },
        // Parallel Section
        { label: "คู่ขนาน", subIndex: 1, colA_name: "page4.parallel.colA.1", colB_name: "page4.parallel.colB.1", colC: "1", colC_name: "page4.parallel.colC.1" },
        { label: "คู่ขนาน", subIndex: 2, colA_name: "page4.parallel.colA.2", colB_name: "page4.parallel.colB.2", colC: "1", colC_name: "page4.parallel.colC.1" },
        { label: "คู่ขนาน", subIndex: 3, colA_name: "page4.parallel.colA.3", colB_name: "page4.parallel.colB.3", colC: "2", colC_name: "page4.parallel.colC.2" },
        { label: "คู่ขนาน", subIndex: 4, colA_name: "page4.parallel.colA.4", colB_name: "page4.parallel.colB.4", colC: "2", colC_name: "page4.parallel.colC.2" },
    ];

    return (
        <A4Paper content={content} currentPage={4}>
            <div className="flex flex-col h-full font-sans text-[13px] p-2 leading-tight">

                {/* 6. Quill Support A Check */}
                <h2 className="font-bold mb-4 uppercase">6. Quill Support A Check ระยะห่างของ Linear Coil กับ Magnet Plate ของแกน Z</h2>

                <div className="flex flex-col flex-1">

                    {/* Diagrams Section */}
                    <div className="flex justify-center gap-10 mb-6">
                        <img src={image6_1} alt="Quill Support A diagram 1" className="h-[120px]" />
                        <img src={image6_2} alt="Quill Support A diagram 2" className="h-[120px]" />
                    </div>

                    {/* Middle Info & Formula Section */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Left Info Box */}
                        <div className="border border-dashed border-black p-3 rounded flex flex-col justify-between">
                            <div className="space-y-1">
                                <p>ระยะห่างระหว่าง Magnet Plate</p>
                                <p>กับ Linear coil ประมาณ 0.6 ~ 0.8 mm.</p>
                            </div>
                            <div className="mt-4">
                                <FormChecknumber
                                    name="page4.depthVernearNo"
                                    label="Depth Vernier No."
                                    inputWidth="w-48"
                                    inputClass="border-b border-black text-center"
                                    hideBottomBorder={true}
                                />
                            </div>
                        </div>

                        {/* Right Formula Box */}
                        <div className="border border-dashed border-black p-3 rounded">
                            <p className="font-bold mb-2">สูตร ( A - B ) + C = D</p>
                            <div className="grid grid-cols-[30px_1fr] gap-y-0.5 text-[12px]">
                                <span className="font-semibold">A</span> <span>= ขนาดของ Linear Coil</span>
                                <span className="font-semibold">B</span> <span>= ระยะจาก Spacer ถึง Magnet Plate</span>
                                <span className="font-semibold">C</span> <span>= ระยะห่าง Magnet Plate ถึง Linear coil ( 0.7 )</span>
                                <span className="font-semibold">D</span> <span>= ค่า Spacer</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="flex-1">
                        <FormQuickTable
                            columns={columns}
                            data={data}
                            className="border-black"
                        />
                    </div>

                    {/* Signature and Note Section */}
                    <div className="flex justify-end items-end mt-4">
                        <div>
                            <FormCheckedBox
                                name="page4.checkedInfo"
                                label="Checked By / Date"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </A4Paper>
    );
}

export default Page4;
