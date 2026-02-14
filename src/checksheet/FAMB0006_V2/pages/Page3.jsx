import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormTableXABDIFF from "@/components/FormComponents/FormTableXABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image5 from "@/assets/FAMB0006_V2/FAMB0005-5.PNG";
import image6 from "@/assets/FAMB0006_V2/FAMB0005-6.PNG";

function Page3() {
    const { control } = useFormContext();

    // Section 5 Standards
    // Cols 1-2: 0-5 Left
    // Cols 3-7: 0
    // Cols 8-9: 0-5 Right
    // Index 0-8
    const standardsLevelX = [
        { min: -5, max: 0, arrow: '-' }, // 1
        { min: -5, max: 0, arrow: '-' }, // 2
        { min: 0, max: 0 },             // 3
        { min: 0, max: 0 },             // 4
        { min: 0, max: 0 },             // 5
        { min: 0, max: 0 },             // 6
        { min: 0, max: 0 },             // 7
        { min: 0, max: 5, arrow: '+' }, // 8
        { min: 0, max: 5, arrow: '+' }, // 9
    ];

    // Section 5 Default: A=KB (id: b) at col 5 (index 4) is 0
    // Note: In FormLevelTableXAB, labelA="A=Kb" maps to ID 'a', but visual order is B top, A bottom?
    // Let's re-verify FormLevelTableXAB visual order.
    // FormLevelTableXAB.jsx:
    // tableRows.push( { id: 'b', label: labelA, index: 0 }, { id: 'a', label: labelB, index: 1 } );
    // And columns loop: if row.id ...
    // So it renders row 'b' then row 'a'.
    // labelA defaults to "B", labelB defaults to "A=Kb".
    // So Top Row is "B", Bottom Row is "A=Kb".
    // Image 5 shows: Top Row "STD", Middle "A=KB", Bottom "B".
    // So I need labelA="A=KB", labelB="B".
    // This means row 'b' will be labeled "A=KB" (Top).
    // And row 'a' will be labeled "B" (Bottom).
    // Default value needed at "A=KB" (Top/Row 'b') Col 5.
    const defaultLevelX = {
        b: { 4: '0' }
    };

    // Section 6 Standards
    // All 0. Diff Max 5.
    const standardsStraightX = Array(9).fill({ min: 0, max: 5 });

    // Section 6 Default
    // A=KB (Top) -> Col 1 (0), Col 9 (0)
    // B (Bottom) -> Col 1 (0)
    // A+B -> Col 1 (0) (Auto calc)
    // In FormTableXABDIFF:
    // tableRows.push({id:'a', label:labelA...}, {id:'b', label:labelB...}, {id:'diff'...})
    // It renders A then B then Diff.
    // Image 6: A=KB, B, A+B.
    // So labelA="ค่าความตรง A \n A=KB", labelB="ค่าความตรง B \n B"?
    // labels are just strings.
    // We can use simplified labels A=KB, B.
    // Default values structure: { a: [], b: [] } or { a: {0:'0'}, ... }
    const defaultStraightX = {
        a: { 0: '0', 8: '0' },
        b: { 0: '0' }
    };

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="flex flex-col gap-8">
                {/* Section 5: CHECK LEVEL X (MA) */}
                <div>
                    <h2 className="text-sm font-bold">5. CHECK LEVEL X การเช็คระดับน้ำแกน X (หลังจากที่ประกอบ BED-U ขึ้นบน BED-L แล้ว) <span className="underline">หน่วยวัดเป็น µm</span></h2>

                    <div className="flex justify-between items-start mt-2">
                        <div className="w-5/12 flex flex-col items-center">
                            <img src={image5} alt="Leveling Check X MA" className="h-[200px] object-contain" />
                        </div>
                        <div className="w-7/12 flex flex-col items-end mr-5">
                            <p className="text-xs italic mb-1 self-center mr-10">(เว้นระยะห่างช่องละ 101 mm)</p>
                            <div className="flex gap-4">
                                <FormLevelTableXAB
                                    name="page3.levelCheckXBed"
                                    cols={9}
                                    labelA="A=KB" /* Top Row (id: b) */
                                    labelB="B"    /* Bottom Row (id: a) */
                                    validateStd={true}
                                    showStd={true}
                                    standards={standardsLevelX}
                                    defaultValue={defaultLevelX}
                                />
                            </div>

                            <div className="mt-4 w-full flex justify-between items-end pl-10">
                                <div className="flex-grow mr-4">
                                    <FormChecknumber
                                        name="page3.levelGaugeNoXBed"
                                        label="Level gauge No."
                                    />
                                </div>
                                <div className="mb-[-50px]">
                                    <FormCheckedBox name="page3.checkedInfoXBed" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 6: CHECK Straightness & Parallelism X */}
                <div>
                    <h2 className="mt-10 text-sm font-bold">6. CHECK ค่าความตรงและขนานของแกน X (หลังจากประกอบ BED-U เข้ากับ BED-L และใส่ Lm-guide X แล้ว)</h2>
                    <p className="text-sm font-bold underline mb-2">หน่วยวัดเป็น µm</p>

                    <div className="flex justify-between items-start">
                        <div className="w-5/12 flex flex-col items-center">
                            <img src={image6} alt="Straightness Check X" className="h-[200px] object-contain" />
                        </div>
                        <div className="w-7/12 flex flex-col items-end mr-5">
                            <p className="text-xs italic mb-1 self-center mr-10">(เว้นระยะห่างช่องละ 101 mm)</p>
                            <div className="flex gap-4">
                                <FormTableXABDIFF
                                    name="page3.straightnessX"
                                    cols={9}
                                    labelA="A=KB" /* A Row */
                                    labelB="B"    /* B Row */
                                    labelDiff="A+B" /* Diff Row */
                                    calcType="sum"
                                    showStd={true}
                                    validateStd={true}
                                    useArrow={false}
                                    standards={standardsStraightX}
                                    defaultValue={defaultStraightX} // Only diff max 5 check might be needed logic-wise, but stds are 0? 
                                // Image note: "ค่าความตรงและขนานไม่เกิน 5 um". 
                                // We can just rely on visual verification or set stds to {min:0, max:5} if input can be up to 5?
                                // Image table shows STD 0 0 0... but note says max 5.
                                // Let's keep STD 0 visible as per image table, but maybe validation is loose?
                                // Or user implies Target is 0, Tolerance is 5?
                                // Usually "0" in STD row means Target 0.
                                />
                            </div>
                            <p className="text-sm font-bold mt-2 self-start ml-20">หมายเหตุ : ค่าความตรงและขนานไม่เกิน 5 µm</p>

                            <div className="mt-4 w-full flex justify-between items-end pl-10 space-y-2 flex-col items-start">
                                <div className="w-full">
                                    <FormChecknumber
                                        name="page3.parallelBarNoX"
                                        label="Parallel bar No."
                                    />
                                </div>
                                <div className="w-full flex justify-between">
                                    <div className="flex-grow mr-4">
                                        <FormChecknumber
                                            name="page3.dialGaugeNoX"
                                            label="Dial gauge No."
                                        />
                                    </div>
                                    <div className="mb-[-50px]">
                                        <FormCheckedBox name="page3.checkedInfoX" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;