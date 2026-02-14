import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormStartFinishTime from "@/components/FormComponents/FormStartFinishTime";
import { useFormContext } from "react-hook-form";

// Images
import image8 from "@/assets/FAMB0006_V2/FAMB0005-8.PNG";
import image9 from "@/assets/FAMB0006_V2/FAMB0005-9.PNG";

function Page5() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="flex flex-col gap-10">
                {/* Section 8: Check Magnet Plate X */}
                <div>
                    <h2 className="text-sm font-bold mb-4">8. Check การประกอบ Magnet plate X</h2>
                    <div className="flex">
                        <div className="w-2/3 flex flex-col pl-10">
                            <img src={image8} alt="Magnet plate X Check" className="h-48 object-contain self-start" />
                            <div className="mt-4 text-xs space-y-2">
                                <p>1. Magnet plate จะต้องถูกประกอบอยู่ตามรูป มิฉะนั้นขั้วแม่เหล็กจะผิดทิศทาง ทำให้เวลาที่เครื่องทำงานที่ Machine check จะไม่สามารถทำงานได้</p>
                                <p>2. ให้สังเกตรู Mark ที่ Magnet plate เวลาประกอบ</p>
                            </div>
                        </div>
                        <div className="w-1/3 flex justify-end pr-5">
                            <FormCheckedBox name="page5.checkedInfoMagnetPlate" />
                        </div>
                    </div>
                </div>

                {/* Section 9: Check Distance Magnet Plate & Linear Coil */}
                <div className="flex flex-col items-center">
                    <h2 className="text-sm font-bold mb-4">9. การตรวจสอบระยะห่างระหว่าง Magnet Plate และ Linear Coil ของแกน X และ Y (STD. 0.6-0.8 mm)</h2>
                    <div className="w-1/2 flex justify-center">
                        <img src={image9} alt="Distance Check" className="h-40 object-contain" />
                    </div>
                    <div className="flex">
                        <div className="w-1/2 flex flex-col gap-4 justify-center pr-10">
                            <FormInputCheckSTD
                                name="page5.magnetGapX"
                                label="1. ระยะห่าง Magnet กับ Coil แกน X ="
                                unit="mm"
                                minStd={0.6}
                                maxStd={0.8}
                                validateStd={true}
                                inputWidth="w-20"
                            />
                            <FormInputCheckSTD
                                name="page5.magnetGapY"
                                label="2. ระยะห่าง Magnet กับ Coil แกน Y ="
                                unit="mm"
                                minStd={0.6}
                                maxStd={0.8}
                                validateStd={true}
                                inputWidth="w-20"
                            />
                        </div>
                        <div className="ml-15">
                            <FormCheckedBox name="page5.checkedInfoMagnetGap" />
                        </div>
                    </div>
                </div>

                {/* Section 10: Machine Running 2 Hrs */}
                <div>
                    <h2 className="text-sm font-bold mb-6">10. Machine running 2 Hrs. (Full stroke of XYZ)</h2>
                    <div className="flex justify-between items-center pl-10 pr-5">
                        <div className="w-3/4">
                            <FormStartFinishTime
                                name="page5.machineRunningTime"
                                minHours={2}
                                validateStd={true}
                            />
                        </div>
                        <div>
                            <FormCheckedBox name="page5.checkedInfoRunning" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;