import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image3 from "@/assets/FAMB0005_V2/image-3.PNG";
import image4 from "@/assets/FAMB0005_V2/image-4.PNG";

function Page2() {
    const { control } = useFormContext();

    // Section 3 Defaults
    // Row 1: A=0, B=0, C=0.
    // Row 7: A=0.
    const defaultY = {
        0: { a: '0', b: '0', c: '0' },
        6: { a: '0', b: '', c: '' }
    };

    // Section 4 Defaults
    // Row A=KB (id: 'b'), Col 5 (index 4) = '0'
    const defaultX = {
        b: { 4: '0' }
    };

    return (
        <A4Paper content={content} currentPage={2}>
            <div className="flex flex-col gap-10">
                {/* Section 3: Y AXIS CHECK (Lm-guide) */}
                <div>
                    <h2 className="text-sm font-bold">3. CHECK ค่าความขนานและความตรงของแกน Y หลังจากที่ประกอบ Lm-guide แล้ว <span className="underline">หน่วยวัดเป็น µm</span></h2>

                    <div className="flex justify-between items-start mt-2">
                        <div className="w-1/2 flex justify-center">
                            <img src={image3} alt="Check Y Axis" className="h-64 object-contain" />
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                            <p className="text-xs italic mb-1 self-start ml-5">(เว้นระยะห่างช่องละ 85 mm)</p>
                            <FormTableYABDIFF
                                name="page2.levelCheckYGuide"
                                rows={7}
                                labelA="A=KB"
                                labelB="B"
                                labelDiff="A+B"
                                diffMode="sum"
                                showStd={false}
                                showArrows={false}
                                defaultValue={defaultY} // Note: defaultValue structure for FormTableYABDIFF might expect array or object? 
                            // FormTableYABDIFF uses array of objects {a, b} usually. FormLevelTableYAB used object with keys.
                            // Let's check FormTableYABDIFF data prop expectations. 
                            // FormTableYABDIFF uses Controller with name `${name}.${index}.a`. 
                            // So defaultValue in useForm should be array: [{a,b}, {a,b}...] OR object with index keys {0:{a,b}, ...} if using nested path?
                            // RHF handles both if path is correct. 
                            // BUT FormTableYABDIFF generates data array from rows prop: data = Array.from...
                            // And fields are name.0.a, name.1.a
                            // So safe to pass array or object with numeric keys.
                            // Previous defaultY was object {0:..., 6:...}. This works for RHF.
                            />
                            <div className="mt-4 w-full pl-5 pr-5 space-y-2">
                                <FormChecknumber
                                    name="page2.dialGaugeNoYGuide"
                                    label="Dial guage No."
                                />
                                <FormChecknumber
                                    name="page2.parallelBarNoYGuide"
                                    label="Parallel bar No."
                                />
                            </div>
                        </div>
                        <div className="ml-2 mr-5 mt-20">
                            <FormCheckedBox name="page2.checkedInfoYGuide" />
                        </div>
                    </div>
                </div>

                {/* Section 4: X AXIS CHECK (MA) */}
                <div>
                    <h2 className="text-sm font-bold">4. LEVELING CHECK X AXIS (DATA FROM MA MACHINE)</h2>
                    <p className="text-xs mb-2">[การเช็คระดับน้ำแกน X, ข้อมูลจาก MA] <span className="underline">หน่วยวัดเป็น µm</span></p>

                    <div className="flex justify-between items-start">
                        <div className="w-1/2 flex flex-col items-center">
                            <img src={image4} alt="Leveling Check X MA" className="h-56 object-contain" />
                        </div>
                        <div className="w-1/2 flex flex-col items-end mr-10 relative">
                            <p className="text-xs italic mb-1 self-center mr-10">(เว้นระยะห่างช่องละ 101 mm)</p>
                            <div className="flex gap-4">
                                <FormLevelTableXAB
                                    name="page2.levelCheckXMA"
                                    cols={9}
                                    labelA="A=KB" /* Displays on top row (id: b) */
                                    labelB="B"    /* Displays on bottom row (id: a) */
                                    showStd={false}
                                    defaultValue={defaultX}
                                />
                            </div>

                            <div className="mt-4 w-full flex justify-between items-end">
                                <div className="flex-grow mr-4">
                                    <FormChecknumber
                                        name="page2.levelGaugeNoXMA"
                                        label="Level gauge No."
                                    />
                                </div>
                                <div className="mb-[-50px]">
                                    <FormCheckedBox name="page2.checkedInfoXMA" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;