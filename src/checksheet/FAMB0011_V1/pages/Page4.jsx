import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";

// Images
import image8 from "@/assets/FAMB0011_V1/FAMB0011-8.PNG";

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
                    <span className="w-4 text-right">{row.subIndex})</span>
                    <FormChecknumber
                        name={row.colA_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
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
                    <span className="w-4 text-right">{row.subIndex})</span>
                    <FormChecknumber
                        name={row.colB_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
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
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {val}
                    </div>
                    <FormChecknumber
                        name={row.colC_name}
                        label=""
                        inputWidth="w-full"
                        hideBottomBorder={true}
                        className="text-center"
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
            <div className="flex flex-col h-full">
                {/* Item 8 */}
                <div className="flex-1">
                    <p className="text-sm font-bold mb-2">8. Quill Support A Check ระยะห่างของ Linear Coil กับ Magnet Plate ของแกน Z</p>

                    {/* Image and Formula Section */}
                    <div className="flex justify-center mb-4">
                        <img src={image8} alt="page4_item8" className="w-[90%] max-w-[800px]" />
                    </div>

                    {/* Dashed Boxes Section */}
                    <div className="flex gap-4 mb-4 text-xs">
                        {/* Left Box */}
                        <div className="flex-1 border-2 border-dashed border-black p-4 flex flex-col justify-between">
                            <div>
                                <p className="mb-2">ระยะห่างระหว่าง Magnet Plate กับ Linear coil</p>
                                <p className="mb-4">ประมาณ 0.6 ~ 0.8 mm</p>
                            </div>
                            <FormChecknumber
                                name="page4.depthVernearNo"
                                label="Depth Vernear No."
                                inputWidth="w-full"
                                labelClassName="whitespace-nowrap mr-2"
                            />
                        </div>

                        {/* Right Box - Formula */}
                        <div className="flex-1 border-2 border-dashed border-black p-4">
                            <p className="font-bold mb-2">สูตร (A - B) + C = D</p>
                            <div className="space-y-1">
                                <div className="flex"><span className="w-8">A</span><span>- ขนาดของ Linear Coil</span></div>
                                <div className="flex"><span className="w-8">B</span><span>- ระยะจาก Spacer ถึง Magnet Plate</span></div>
                                <div className="flex"><span className="w-8">C</span><span>- ระยะห่าง Magnet Plate ถึง Linear coil (0.7)</span></div>
                                <div className="flex"><span className="w-8">D</span><span>- ค่า Spacer</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full">
                        <FormQuickTable
                            columns={columns}
                            data={data}
                        />
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-5 flex justify-end">
                    <div className="w-64">
                        <FormCheckedBox
                            name="page4.checkedInfo"
                            label="Check by/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;