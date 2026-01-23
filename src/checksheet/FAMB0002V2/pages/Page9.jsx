import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import InputCheckSTD from "@/components/UIcomponent/InputCheckSTD";
import { useFormContext, Controller } from "react-hook-form";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import StartFinishTime from "@/components/UIcomponent/StartFinishTime";

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
                            <Controller
                                name="page9.magnetCoilX"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputCheckSTD
                                        label="1.ระยะห่าง Magnet กับ Coil แกน X ="
                                        unit="mm"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        minStd={0.6}
                                        maxStd={0.8}
                                        validateStd={true}
                                        inputWidth="w-24"
                                    />
                                )}
                            />
                            <Controller
                                name="page9.magnetCoilYKC"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputCheckSTD
                                        label="2.ระยะห่าง Magnet กับ Coil แกน YL ="
                                        unit="mm"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        minStd={0.6}
                                        maxStd={0.8}
                                        validateStd={true}
                                        inputWidth="w-24"
                                    />
                                )}
                            />
                            <Controller
                                name="page9.magnetCoilYKB"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputCheckSTD
                                        label="3.ระยะห่าง Magnet กับ Coil แกน YR ="
                                        unit="mm"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        minStd={0.6}
                                        maxStd={0.8}
                                        validateStd={true}
                                        inputWidth="w-24"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-sm font-bold mb-5">15. Machine running 2 Hrs.(Full stroke of XYZ)</p>
                        <div className="ml-20">
                            <Controller
                                name="page9.runTime"
                                control={control}
                                defaultValue={{ start: '', finish: '' }}
                                render={({ field }) => (
                                    <StartFinishTime
                                        startTime={field.value?.start ?? ''}
                                        finishTime={field.value?.finish ?? ''}
                                        onStartChange={(val) => field.onChange({ ...field.value, start: val })}
                                        onFinishChange={(val) => field.onChange({ ...field.value, finish: val })}
                                        minHours={2}
                                        validateStd={true}
                                    />
                                )}
                            />
                            <div className="mt-10 ml-80">
                                <Controller
                                    name="page9.checkedInfo15"
                                    control={control}
                                    defaultValue={{ name: '', date: '' }}
                                    render={({ field }) => (
                                        <CheckedBox
                                            name={field.value?.name ?? ''}
                                            date={field.value?.date ?? ''}
                                            onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                            onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page9;
