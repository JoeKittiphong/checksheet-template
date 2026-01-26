import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormStartFinishTime from "@/components/FormComponents/FormStartFinishTime";
import { useFormContext } from "react-hook-form";

// Images
import image14 from "@/assets/FAMB0002V2/image-14.png";

function Page9() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={9}>
            <div>
                <div>
                    <p className="text-sm font-bold mb-10">14. การตรวจสอบระยะห่างระหว่าง Magnet Plate และ Linear Coil ของแกน X และ Y (STD. 0.6-0.8 µm)</p>
                    <div className="mt-5 flex flex-col justify-center items-center">
                        <img src={image14} alt="page9" className="w-100 mb-10" />
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
                        <p className="text-sm font-bold mb-5">15. Machine running 2 Hrs.(Full stroke of XYZ)</p>
                        <div className="ml-20">
                            <FormStartFinishTime
                                name="page9.runTime"
                                minHours={2}
                                validateStd={true}
                                defaultValue={{ start: '', finish: '' }}
                            />
                            <div className="mt-10 ml-80">
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
