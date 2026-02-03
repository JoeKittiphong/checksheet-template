import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormDoubleCheckTable from "@/components/FormComponents/FormDoubleCheckTable";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import images for parts
import image1 from "@/assets/FAWI0038_V2/p1-image1.png";
import image2 from "@/assets/FAWI0038_V2/p1-image2.png";
import image3 from "@/assets/FAWI0038_V2/p1-image3.png";
import image4 from "@/assets/FAWI0038_V2/p1-image4.png";
import image5 from "@/assets/FAWI0038_V2/p1-image5.png";
import image6 from "@/assets/FAWI0038_V2/p1-image6.png";
import image7 from "@/assets/FAWI0038_V2/p1-image7.png";
import image8 from "@/assets/FAWI0038_V2/p1-image8.png";

// Double Check Parts Config
const doubleCheckParts = [
    {
        id: 1,
        partName: "LOCK BKT (X)",
        subParts: ["SCREW BLACK CS M8X20", "GT WASHER D8"],
        qty: [7, 7],
        torque: 250,
        modelLabel: "ALN400G  ALN600G",
        ngLabel: "SHORT PART",
        image: image1
    },
    {
        id: 2,
        partName: "LOCK CNT",
        subParts: ["SCREW BLACK CS", "M8x20+(GT D8)"],
        qty: 4,
        torque: 200,
        ngLabel: "SHORT PART",
        image: image2
    },
    {
        id: 3,
        partName: "CONT ARM LOCK",
        subParts: ["SCREW BLACK CS M8X20", "GT WASHER D8"],
        qty: [7, 7],
        torque: 250,
        modelLabel: "AL400G  AL600G",
        ngLabel: "SHORT PART",
        image: image3
    },
    {
        id: 4,
        partName: "CNT-LOCK L",
        subParts: ["SCREW BLACK CS", "M8x20+(GT D8)"],
        qty: 4,
        torque: 250,
        note: "(AL400G รูเยื้อง / AL600G รูตรง)",
        ngLabel: "SHORT PART",
        image: image4
    },
    {
        id: 5,
        partName: "LOCK BKT ( Y )",
        subParts: ["SCREW BLACK CS M12X35 + (GT D12)"],
        qty: 4,
        torque: 800,
        note: "(เริ่มจาก Bed 1=>2 และ Column 3=>4)",
        ngLabel: "SHORT PART",
        image: image6
    },
    {
        id: 6,
        partName: "LOCK BKT ( YF )",
        subParts: ["SCREW BLACK CS M8x45", "SCREW BLACK CS M8x30"],
        qty: [3, 2],
        torque: [250, 250],
        modelLabel: "เฉพาะ AL400G",
        note: "(เริ่มจาก Column 1=>2 และ Bed 3=>4=>5)",
        ngLabel: "SHORT PART",
        image: image7
    },
    {
        id: 7,
        partName: "LOCK BKT ( Y )  L , R",
        subParts: ["SCREW BLACK CS M8x20 +(GT D8)", "SCREW BLACK CS M8x20 +(GT D8)"],
        qty: [5, 5],
        torque: [250, 250],
        modelLabel: "เฉพาะ AL600G",
        note: "(เริ่มจาก Column 1=>2 และ Bed 3=>4=>5)",
        ngLabel: "SHORT PART",
        image: image8
    },
    {
        id: 8,
        partName: "LOCK BKT ( V )  L , R",
        subParts: ["SCREW BLACK CS M8x20+(GT D8)", "SCREW BLACK CS M8x20+(GT D8)"],
        qty: [4, 4],
        torque: [250, 250],
        ngLabel: "SHORT PART",
        image: image5
    }
];

function Page1() {
    return (
        <A4Paper content={content} currentPage={1}>
            <div className="p-2">
                {/* Double Check Table */}
                <FormDoubleCheckTable
                    title="1. Double Check Lock BKT"
                    rows={doubleCheckParts}
                    fieldPrefix="p01_dc"
                    apiEndpoint={apiEndpoint}
                />

                {/* Signature Section */}
                <div className="">


                    {/* Remark Section */}
                    <div className="text-[10px] flex justify-between p-2 bg-gray-50">
                        <div className="ml-2 flex flex-col gap-2">
                            <div className="font-bold mb-1">Remark :</div>
                            <div>Check 1 ==&gt; พนักงานประจำเครื่อง</div>
                            <div>Check 2 ==&gt; หัวหน้างาน Leader up</div>
                            <div>Check 3 ==&gt; Double Check INS</div>
                        </div>


                        <div className="flex gap-1">
                            <FormCheckedBox
                                name="p01_check1By"
                                label="Check 1 By"
                                showDate={false}
                            />

                            <FormCheckedBox
                                name="p01_check2By"
                                label="Check 2 By"
                                showDate={false}
                            />

                            <FormCheckedBox
                                name="p01_check3By"
                                label="Check 3 By"
                                showDate={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;