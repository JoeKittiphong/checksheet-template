import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB"; // For Item 3 (A, B)
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF"; // For Item 4 (A, B, Diff)
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image2 from "@/assets/FAMB0011_V1/FAMB0011-3.PNG";

function Page2() {
    const { control } = useFormContext();

    // Standards for Item 4 (A, B, Diff)
    // Image shows "SD = 3 µm". Usually this applies to the Diff or the values themselves.
    // In FAMB0008 Page 2 (similar structure), standards are applied to the Diff column or A/B.
    // Given "Diff" column exists, likely verifying Parallelism = difference between A and B.
    // Standard is 3 micron. So Diff should be <= 3.
    const item3Standards = Array(9).fill({ min: 0, max: 5, arrow: '' });
    const item4Standards = Array(9).fill({ min: 0, max: 3, arrow: '' });

    // Item 3 Standards
    // Image shows "SD = 5 µm". 
    // Table has A, B columns.
    // Usually "Check data parallel Z axis from MA" with A,B means comparing A and B.
    // But table doesn't have Diff column.
    // Maybe just recording? Or implicit Diff?
    // FAMB0008 Page 1 Item 1 (Leveling) has A, B and standard 5/10/15 etc.
    // Let's assume standard applies to A and B values or their difference?
    // "SD = 5 µm" is written separately.
    // I will use FormLevelTableYAB for Item 3.

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="flex flex-col h-full">
                {/* Item 3 */}
                <div className="mb-5 flex-1">
                    <p className="text-sm font-bold mb-2">3. Check data parallel Z axis from MA (ตรวจสอบค่า parallel แกน Z จาก MA)</p>
                    <div className="flex justify-center items-start">
                        <div className="mr-4">
                            <img src={image2} alt="page2_item3" className="w-[100px]" />
                        </div>
                        <div>
                            <FormLevelTableYAB
                                name="page2.item3Data"
                                rows={9}
                                labelA="A"
                                labelB="B"
                                showC={false}
                                showArrows={false}
                                standards={item3Standards}
                                showStd={false} // Tooltip or visual indicator usually handled by isValid
                                validateStd={true}
                                defaultValue={[
                                    { a: '0', b: '0' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }
                                ]}
                            />
                            <div className="mt-2 flex flex-col gap-2">
                                <FormChecknumber
                                    name="page2.dialGaugeNo3"
                                    label="Dial gauge no."
                                    inputWidth="w-40"
                                />
                                <FormChecknumber
                                    name="page2.parallelNo3"
                                    label="Parallel no."
                                    inputWidth="w-40"
                                />
                                <p className="text-sm font-bold text-red-500">SD = 5 µm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="flex-1">
                    <p className="text-sm font-bold mb-2">4. Check data parallel Z axis at AS (ตรวจสอบค่า parallel แกน Z ที่ AS)</p>
                    <div className="flex justify-center items-start">
                        <div className="mr-4">
                            {/* Reusing image2 as placeholder or if it contains both */}
                            <img src={image2} alt="page2_item4" className="w-[100px]" />
                        </div>
                        <div>
                            <FormTableYABDIFF
                                name="page2.item4Data"
                                rows={9}
                                labelA="A"
                                labelB="B"
                                labelDiff="Diff"
                                diffMode="diff" // auto calculate absolute diff |A-B|
                                standards={item4Standards}
                                showStd={false} // Tooltip or visual indicator usually handled by isValid
                                validateStd={true}
                                showArrows={false}
                                defaultValue={[
                                    { a: '0', b: '0', diff: '' }, { a: '', b: '', diff: '' }, { a: '', b: '', diff: '' },
                                    { a: '', b: '', diff: '' }, { a: '0', b: '', diff: '' }, { a: '', b: '', diff: '' },
                                    { a: '', b: '', diff: '' }, { a: '', b: '', diff: '' },
                                    { a: '0', b: '', diff: '' }
                                ]}
                            />
                            <div className="mt-2 flex flex-col gap-2">
                                <FormChecknumber
                                    name="page2.dialGaugeNo4"
                                    label="Dial gauge no."
                                    inputWidth="w-40"
                                />
                                <FormChecknumber
                                    name="page2.parallelNo4"
                                    label="Parallel no."
                                    inputWidth="w-40"
                                />
                                <p className="text-sm font-bold text-red-500">SD = 3 µm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-2 flex justify-end">
                    <div className="w-64">
                        <FormCheckedBox
                            name="page2.checkedInfo"
                            label="Check by/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;