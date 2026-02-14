import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormStartFinishTime from "@/components/FormComponents/FormStartFinishTime";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

// Images
import image9 from "@/assets/FAMB0008_V1/FAMB0008-9.PNG";
import image10 from "@/assets/FAMB0008_V1/FAMB0008-10.PNG";

function Page6() {
    const { control, setValue } = useFormContext();

    // Watch values for Item 9 calculation
    const valA = useWatch({ control, name: "page6.item9.a" });
    const valB = useWatch({ control, name: "page6.item9.b" });

    useEffect(() => {
        const a = parseFloat(valA);
        const b = parseFloat(valB);
        if (!isNaN(a) && !isNaN(b)) {
            const c = (a - b).toFixed(3); // 3 decimal places as per typical micron measurements, or fit to need. Let's maximize precision or match input.
            // Actually usually 2 or 3 decimals. Let's use 3 to be safe or just string if simple subtraction.
            // 0.6 - 0.8 range suggests 1-2 decimals might be enough but let's keep it clean.
            setValue("page6.item9.c", (Math.round((a - b) * 1000) / 1000).toString());
        }
    }, [valA, valB, setValue]);


    return (
        <A4Paper content={content} currentPage={6}>
            <div className="flex flex-col h-full">

                {/* Item 9 */}
                <div className="mb-5">
                    <p className="text-sm font-bold mb-2">9. Distance between linear motor XY and magnet plate XY. [ระยะห่างระหว่าง linear motor XY กับ magnet plate XY]</p>
                    <div className="flex flex-col items-center">
                        <img src={image9} alt="page6_9" className="w-[500px] max-w-2xl mb-4" />

                        <div className="w-full flex justify-around items-start">
                            <div className="w-1/2 p-2">
                                <p className="text-sm mb-2 font-bold">Formula A - B = C</p>
                                <p className="text-sm mb-2">ค่า A ให้นำมาเฉลี่ยก่อนการคำนวณในสูตรคำนวณ</p>
                                <ul className="text-sm list-disc ml-5 mb-4">
                                    <li>A = ระยะระหว่างผิวเหล็กของ Saddle/Arm X ที่ Linear Coil</li>
                                    <li>B = ความสูงของ Linear Coil</li>
                                    <li>C = ระยะระหว่าง Linear Coil กับ Magnet Plate (0.6 ~ 0.8 mm)</li>
                                </ul>
                            </div>
                            <div className="w-1/2 p-2 flex flex-col gap-2">
                                <FormInputCheckSTD
                                    name="page6.item9.a"
                                    label="A ="
                                    unit="mm"
                                    inputWidth="w-24"
                                />
                                <FormInputCheckSTD
                                    name="page6.item9.b"
                                    label="B ="
                                    unit="mm"
                                    inputWidth="w-24"
                                />
                                <FormInputCheckSTD
                                    name="page6.item9.c"
                                    label="C ="
                                    unit="mm"
                                    minStd={0.6}
                                    maxStd={0.8}
                                    validateStd={true}
                                    readOnly={true} // Auto-calculated
                                    inputWidth="w-24"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 10 */}
                <div className="mb-5">
                    <p className="text-sm font-bold mb-2">10. XY-axis check the gap between coil of linear motor and magnet is within 0.6 ~ 0.8 mm [ตรวจสอบระยะห่างระหว่าง coil ของ linear motor และ magnet แกน XY]</p>
                    <div className="flex flex-col items-center">
                        <img src={image10} alt="page6_10" className="w-[300px] max-w-md mb-4" />

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="flex flex-col items-center">
                                    <span className="font-bold mb-1">{num}</span>
                                    <FormInputCheckSTD
                                        name={`page6.item10.point${num}`}
                                        unit=""
                                        minStd={0.6}
                                        maxStd={0.8}
                                        validateStd={true}
                                        inputWidth="w-16"
                                        label={null}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm mt-2">Remark: Please move thickness gauge UP/DOWN</p>
                    </div>
                </div>

                {/* Item 11 */}
                <div className="mt-auto">
                    <p className="text-sm font-bold mb-2">11. Machine running 2 Hrs. (Full stroke of XYZ)</p>
                    <div className="flex justify-between items-end ml-10 mr-10">
                        <FormStartFinishTime
                            name="page6.runTime"
                            minHours={2}
                            validateStd={true}
                            defaultValue={{ start: '', finish: '' }}
                        />
                        <div className="mb-2">
                            <FormCheckedBox name="page6.checkedInfo11" label="Check by/Date" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;

