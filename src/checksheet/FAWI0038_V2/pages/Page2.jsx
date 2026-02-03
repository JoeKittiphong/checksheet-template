import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormDoubleCheckTable from "@/components/FormComponents/FormDoubleCheckTable";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { content, apiEndpoint } from "../FAWI0038_V2-setting";

// Import images for parts
import image1 from "@/assets/FAWI0038_V2/p2-image1.png";
import image2 from "@/assets/FAWI0038_V2/p2-image2.png";
import image3 from "@/assets/FAWI0038_V2/p2-image3.png";
import image4 from "@/assets/FAWI0038_V2/p2-image4.png";
import image5 from "@/assets/FAWI0038_V2/p2-image5.png";
import image6 from "@/assets/FAWI0038_V2/p2-image6.png";
import image7 from "@/assets/FAWI0038_V2/p2-image7.png";

// Double Check Parts Config for Page 2
const doubleCheckPartsPage2 = [
    {
        id: 9,
        partName: "LOCK BKT (Z)",
        subParts: ["SCREW BLACK CS M8x20+(GT D8)"],
        qty: 4,
        torque: 250,
        ngLabel: "SHORT PART",
        image: image1
    },
    {
        id: 10,
        partName: "LOCK BKT ( U )",
        subParts: [
            "SCREW BLACK CS M8x20 +(GT D8)",
            "SCREW BLACK CS M6x15+ SW + PW"
        ],
        qty: [2, 2],
        torque: [250, 150],
        ngLabel: "SHORT PART",
        image: image2
    },
    {
        id: 11,
        partName: "F - DOOR LOCK (Top-Bottom)",
        subParts: [
            "SCREW BLACK CS M6X12",
            "SPRING (D6) + Washer (D6)"
        ],
        qty: [4, 4],
        torque: [150, 150],
        ngLabel: "SHORT PART",
        image: image3
    },
    {
        id: 12,
        partName: "Panel-L Stay",
        subParts: [
            "SCREW BLACK CS M5X15",
            "SPRING (D5) + Washer (D5)"
        ],
        qty: [4, 4],
        torque: 60,
        modelLabel: "เฉพาะ AL400G",
        ngLabel: "SHORT PART",
        image: image4
    },
    {
        id: 13,
        partName: "Panel-L Stay",
        subParts: [
            "SCREW BLACK CS M5X12",
            "SPRING (D5) + Washer (D5)"
        ],
        qty: [4, 4],
        torque: 100,
        modelLabel: "เฉพาะ AL600G",
        ngLabel: "SHORT PART",
        image: image5
    },
    {
        id: 14,
        partName: "Door BKT LOCK(R,L)",
        subParts: [
            "SCREW BLACK CS M6x12",
            "SPRING (D6) + Washer (D6)"
        ],
        qty: [4, 4],
        torque: [150, 150],
        ngLabel: "SHORT PART",
        image: image6
    },
    {
        id: 15,
        partName: "Option Wire Feeder 20kg (2pcs)\n(ถ้าไม่มี Option ให้ N/A)",
        subParts: [
            "SCREW CS M6x12",
            "SPRING (D6) + Washer (D6)"
        ],
        qty: [4, 4],
        torque: [150, 150],
        ngLabel: "SHORT PART",
        image: image7
    }
];

function Page2() {
    return (
        <A4Paper content={content} currentPage={2}>
            <div className="p-2">
                {/* Double Check Table */}
                <FormDoubleCheckTable
                    title="1.1 Double Check Lock BKT"
                    rows={doubleCheckPartsPage2}
                    fieldPrefix="p02_dc"
                    apiEndpoint={apiEndpoint}
                />

                {/* Signature Section */}
                <div className="mt-4">
                    {/* Remark Section */}
                    <div className="mt-2 text-[10px] flex justify-between p-2 bg-gray-50">
                        <div className="ml-2 flex flex-col gap-2">
                            <div className="font-bold mb-1">Remark :</div>
                            <div>Check 1 ==&gt; พนักงานประจำเครื่อง</div>
                            <div>Check 2 ==&gt; หัวหน้างาน Leader up</div>
                            <div>Check 3 ==&gt; Double Check INS</div>
                        </div>

                        <div className="flex gap-1">
                            <FormCheckedBox
                                name="p02_check1By"
                                label="Check 1 By"
                                showDate={false}
                            />
                            <FormCheckedBox
                                name="p02_check2By"
                                label="Check 2 By"
                                showDate={false}
                            />
                            <FormCheckedBox
                                name="p02_check3By"
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

export default Page2;