import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image1 from "@/assets/FAMB0011_V1/FAMB0011-1.PNG";

function Page1() {
    const { control } = useFormContext();

    // Standards for Data of AS (Item 2)
    // 1: 0-5 arrow down
    // 2-8: 0
    // 9: 0-5 arrow up
    // Note: 'arrow' prop in standard object usually maps to a visual arrow or sign.
    // Based on FAMB0008, arrow: '-' might be down/up depending on index or context, or just textual.
    // Let's assume standard object structure: { min, max, text?, arrow? }
    const item2Standards = [
        { min: 0, max: 5, arrow: '-' }, // 1
        { min: 0, max: 0 },             // 2
        { min: 0, max: 0 },             // 3
        { min: 0, max: 0 },             // 4
        { min: 0, max: 0 },             // 5
        { min: 0, max: 0 },             // 6
        { min: 0, max: 0 },             // 7
        { min: 0, max: 0 },             // 8
        { min: 0, max: 5, arrow: '+' }, // 9
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col h-full">
                {/* Item 1 */}
                <div className="mb-5 flex-1">
                    <p className="text-sm font-bold mb-2">1. Check data level Z axis from MA (ตรวจสอบค่าระดับน้ำแกน Z จาก MA)</p>
                    <div className="flex justify-center items-start">
                        <div className="mr-4">
                            <img src={image1} alt="page1_item1" className="w-[150px]" />
                        </div>
                        <div>
                            <FormLevelTableYAB
                                name="page1.item1Data"
                                rows={9}
                                labelA="A"
                                labelB="B"
                                showC={false}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }
                                ]}
                            />
                            <div className="mt-2">
                                <FormChecknumber
                                    name="page1.levelingNo1"
                                    label="Leveling no."
                                    inputWidth="w-40"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="mb-5 flex-1">
                    <p className="text-sm font-bold mb-2">2. Check data level Z axis at AS (ตรวจสอบค่าระดับน้ำแกน Z ที่ AS)</p>
                    <div className="flex justify-center items-start">
                        <div className="mr-4">
                            {/* Reusing image1 as it likely depicts the same Z axis rail, or specific crop if available. 
                                 The provided assets list has FAMB0011-1.PNG. Let's use it for both for now or check if there's another.
                                 Asset list: FAMB0011-1.PNG (5279 bytes) - seems small/single image.
                                 The user prompt image shows both items. Usually one image is cut or reused.
                                 I'll use image1 again as layout placeholder.
                             */}
                            <img src={image1} alt="page1_item2" className="w-[150px]" />
                        </div>
                        <div>
                            <FormLevelTableYAB
                                name="page1.item2Data"
                                rows={9}
                                standards={item2Standards}
                                labelA="A"
                                labelB="B"
                                showC={false}
                                showArrows={true}
                                showStd={true} // If showStd is true, it might render the standard column. 
                                // But here C is labeled "SD". 
                                // In FAMB0008, showStd={true} was used with showC={true}.
                                // If showStd renders the standards FROM the standards prop into a column, that's what we want.
                                // If showC is also true, maybe it renders an input column C?
                                // In FAMB0008 Page 1, it has A, B, C input columns.
                                // In FAMB0011 Item 2, we have Inputs A, B and a "Display" column SD.
                                // If I set showC={false} and showStd={true}, maybe it renders A, B, Std.
                                // Let's try showC={false} showStd={true} first, assuming SD is read-only standard.
                                validateStd={true}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }
                                ]}
                            />
                            <div className="mt-2 flex justify-end gap-2">
                                <FormChecknumber
                                    name="page1.levelingNo2"
                                    label="Leveling no."
                                    inputWidth="w-40"
                                />
                                {/* Footer Signature */}
                                <div className="mt-auto flex justify-end">
                                    <div className="w-64">
                                        <FormCheckedBox
                                            name="page1.checkedInfo"
                                            label="Check by/Date"
                                        />
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

export default Page1;