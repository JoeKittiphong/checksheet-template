import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormStartFinishTime from "@/components/FormComponents/FormStartFinishTime";
import { useFormContext } from "react-hook-form";

// Images
import image15 from "@/assets/FAMB0004_V3/image-15.PNG";
import image16 from "@/assets/FAMB0004_V3/image-16.PNG";

function Page9() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={9}>
            <div>
                <div className="">
                    <p className="text-sm font-bold">15. Check การประกอบ Magnet plate X</p>
                    <div className="flex flex-col justify-center items-center">
                        <img src={image15} alt="page9" className="w-90" />
                        <div className="w-full pl-20 pr-20 mb-5">
                            <p className="text-sm">1. Magnet plate จะต้องถูกประกอบอยู่ตามรูป มิฉะนั้นขั้วแม่เหล็กจะผิดทิศทาง ทำให้เวลาที่เครื่องทำงานที่ Machine check จะไม่สามารถทำงานได้</p>
                            <p className="text-sm">2. ให้สังเกต Mark ที่ Magnet plate เวลาประกอบ</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">16. การตรวจสอบระยะห่างระหว่าง Magnet Plate และ Linear Coil ของแกน X และ Y (STD. 0.6-0.8 µm)</p>
                    <div className="mt-5 flex flex-col justify-center items-center">
                        <img src={image16} alt="page9" className="w-60 mb-5" />
                        <div className="flex flex-col space-y-5">
                            <FormInputCheckSTD
                                name="page9.magnetCoilX"
                                label="1.ระยะห่าง Magnet กับ Coil แกน X ="
                                unit="mm"
                                minStd={0.6}
                                maxStd={0.8}
                                validateStd={true}
                                inputWidth="w-24"
                            />
                            <FormInputCheckSTD
                                name="page9.magnetCoilYKC"
                                label="2.ระยะห่าง Magnet กับ Coil แกน YL ="
                                unit="mm"
                                minStd={0.6}
                                maxStd={0.8}
                                validateStd={true}
                                inputWidth="w-24"
                            />
                            <FormInputCheckSTD
                                name="page9.magnetCoilYKB"
                                label="3.ระยะห่าง Magnet กับ Coil แกน YR ="
                                unit="mm"
                                minStd={0.6}
                                maxStd={0.8}
                                validateStd={true}
                                inputWidth="w-24"
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-sm font-bold mb-5">17. Machine running 2 Hrs.(Full stroke of XYZ)</p>
                        <div className="ml-20">
                            <FormStartFinishTime
                                name="page9.runTime"
                                minHours={2}
                                validateStd={true}
                                defaultValue={{ start: '', finish: '' }}
                            />
                            <div className="mt-5 ml-110">
                                <FormCheckedBox name="page9.checkedInfo15" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page9;
