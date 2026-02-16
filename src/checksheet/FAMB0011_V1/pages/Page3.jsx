import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB"; // Adapted for Pitching/Rolling
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB"; // For Item 6 (Horizontal)
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

// Images
import image5 from "@/assets/FAMB0011_V1/FAMB0011-5.PNG";
import image6 from "@/assets/FAMB0011_V1/FAMB0011-6.PNG";

function Page3() {
    const { control } = useFormContext();

    // Item 6: Parallel LM-Guide check
    // "Same table as Item 5 of FAMB0008_V1" -> FormLevelTableXAB
    // FAMB0008 Item 5 has:
    // labelA="A=Kb", labelB="B"
    // cols={13}
    // But FAMB0011 Item 6 image shows Points 1-9 (9 cols).
    // Labels are "A" and "B (KB)".
    // So cols=9, labelA="B (KB)", labelB="A" (Note: FormLevelTableXAB renders labelA at bottom row (index 0) and labelB at top row (index 1)?? 
    // Let's check FormLevelTableXAB implementation again.
    // In FAMB0008 Page 3: 
    // labelA="A=Kb", labelB="B"
    // defaultValue: b: { 6: '0' }
    // FormLevelTableXAB layout:
    // Row 0: ID 'b', Label labelA ("A=Kb" passed in prop... wait)
    // FormLevelTableXAB default props: labelA="B", labelB="A=Kb".
    // Implementation: 
    // tableRows.push({ id: 'b', label: labelA, index: 0 }, { id: 'a', label: labelB, index: 1 });
    // So Row Bottom is 'b' (labelA), Row Top is 'a' (labelB).
    // FAMB0008 Page 3 passes labelA="A=Kb", labelB="B".
    // So Bottom Row is "A=Kb", Top Row is "B".
    //
    // FAMB0011 Item 6 Image:
    // Top Row: A
    // Bottom Row: B (KB)
    // So Top Row ('a') label should be "A". -> labelB="A"
    // Bottom Row ('b') label should be "B (KB)". -> labelA="B (KB)"
    // 
    // Data check SD = 5 µm.
    // FAMB0008 Item 5 doesn't clearly show validation logic in snippet, but `FormLevelTableXAB` supports `standards` prop.
    // I should apply standards. But user didn't specify per-point standard, just "Data check SD = 5 µm".
    // Is it a MAX diff or range? Based on "SD = 5", usually means range 5 (+-2.5?) or Max 5?
    // In Page 2 Item 3 "SD = 5" was just text.
    // In Page 2 Item 4 "SD = 3" was Diff limit.
    // Here we have 2 rows. Probably parallelism check (A-B)? Or just A and B values individually?
    // "Parallel LM-Guide check" -> likely parallelism.
    // But FormLevelTableXAB doesn't compute diff automatically like FormTableYABDIFF.
    // FAMB0008 Item 5 has "Leveling check X-axis (Data from MA)".
    // If I use FormLevelTableXAB, I get 2 input rows.
    // I will just label it "Data check SD = 5 µm" as text below, same as image.

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="flex flex-col h-full">
                {/* Item 5 */}
                <div className="mb-5">
                    <p className="text-sm font-bold mb-2">5. Check data pithing and rolling Z axis (ตรวจสอบค่า pitching and rolling ของแกน Z)</p>
                    <div className="flex justify-center items-start">
                        <div className="mr-8">
                            <img src={image5} alt="page3_item5" className="w-[100px]" />
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-center font-bold mb-1">Pitching</p>
                                <FormLevelTableYAB
                                    name="page3.pitchingData"
                                    rows={5}
                                    labelA="A"
                                    showB={false}
                                    showC={false}
                                    defaultValue={[
                                        { a: '' }, { a: '' }, { a: '0' }, { a: '' }, { a: '' }
                                    ]}
                                />
                                <div className="mt-2">
                                    <FormChecknumber name="page3.pitchingNo" label="Level gauge no." inputWidth="w-32" />
                                </div>
                            </div>

                            <div>
                                <p className="text-center font-bold mb-1">Rolling</p>
                                <FormLevelTableYAB
                                    name="page3.rollingData"
                                    rows={5}
                                    labelA="B"
                                    showB={false} // FormLevelTableYAB now supports showB={false} which hides col 'b'. 
                                    // But here I want to Show Col B (labeled "B") and Hide Col A?
                                    // Or just use Col A and Label it "B"?
                                    // If I usage labelA="B", it works.
                                    showC={false}
                                    defaultValue={[
                                        { a: '' }, { a: '' }, { a: '0' }, { a: '' }, { a: '' }
                                    ]}
                                />
                                <div className="mt-2">
                                    <FormChecknumber name="page3.rollingNo" label="Level gauge no." inputWidth="w-32" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 6 */}
                <div className="mb-5">
                    <p className="text-sm font-bold mb-2">6. Parallel LM-Guide check (ตรวจสอบค่า parallel LM-Guide)</p>
                    <div className="flex flex-col items-center">
                        <img src={image6} alt="page3_item6" className="w-[300px] mb-4" />
                        <div className="w-full px-10">
                            <FormLevelTableXAB
                                name="page3.item6Data"
                                cols={9}
                                labelA="A" // Bottom Row
                                labelB="B (KB)"      // Top Row
                                control={control}
                                showArrows={false}
                                standards={Array(9).fill({ min: 0, max: 5, arrow: '' })}
                                validateStd={true}
                                defaultValue={{
                                    b: { 0: '0', 8: '0' } // B (KB) has 0 at 1 and 9 (indices 0 and 8)
                                }}
                            />
                            <p className="text-center mt-2 text-sm">Data check SD = 5 µm</p>
                        </div>
                    </div>
                </div>

                {/* Item 7 */}
                <div className="mb-5 relative">
                    <p className="text-sm font-bold mb-4">7. Part no. record (บันทึกเลขชิ้นงาน)</p>
                    <div className="px-10 space-y-4">
                        <FormChecknumber name="page3.coilKB" label="NUMBER COIL (KB)" inputWidth="w-60" />
                        <FormChecknumber name="page3.coilKC" label="NUMBER COIL (KC)" inputWidth="w-60" />

                        <div className="flex items-center gap-4">
                            <FormChecknumber name="page3.magnetL" label="NUMBER MAGNET (L)" inputWidth="w-60" hideBottomBorder={false} />
                            <div className="flex gap-4 items-center">
                                <FormItemCheck name="page3.magnetL_JM" label="JM" />
                                <FormItemCheck name="page3.magnetL_CM" label="CM" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <FormChecknumber name="page3.magnetR" label="NUMBER MAGNET (R)" inputWidth="w-60" hideBottomBorder={false} />
                            <div className="flex gap-4 items-center">
                                <FormItemCheck name="page3.magnetR_JM" label="JM" />
                                <FormItemCheck name="page3.magnetR_CM" label="CM" />
                            </div>
                        </div>

                        <FormChecknumber name="page3.linearScale" label="NUMBER LINEAR SCALE" inputWidth="w-60" />
                        <FormChecknumber name="page3.quill" label="NUMBER QUILL" inputWidth="w-60" />
                    </div>
                    {/* Footer Signature */}
                    <div className="mt-auto flex justify-end absolute bottom-0 right-0">
                        <div className="w-64">
                            <FormCheckedBox
                                name="page3.checkedInfo"
                                label="Check by/Date"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page3;