import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import EDMYawingX from "@/components/PageComponent/EDMYawingX";
import EDMYawingY from "@/components/PageComponent/EDMYawingY";
import { useFormContext, Controller } from "react-hook-form";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import InputCheckSTD from "@/components/UIcomponent/InputCheckSTD";

// Images
import image18_1 from "@/assets/FAMB0004_V3/image-18-1.png";
import image18_2 from "@/assets/FAMB0004_V3/image-18-2.png";

function Page11() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={11}>
            <div>
                <p className="text-sm font-bold mb-5">18. SQUARE XY/YAWING X,Y CHECK</p>
                <div>
                    <p className="text-xs mb-2">18.1  Check Yawing Y axis and check Square XY</p>
                    <div className="flex justify-center">
                        <Controller
                            name="page11.yawingData18_2"
                            control={control}
                            defaultValue={{
                                yPlus: '', yC: '', yMinus: '',
                                squareSideX: '', squareSideY: '',
                                squareNo: '', dialGaugeNo: ''
                            }}
                            render={({ field }) => (
                                <EDMYawingY
                                    data={field.value}
                                    onChange={(key, val) => field.onChange({ ...field.value, [key]: val })}
                                    stdPlus={3}
                                    stdC={3}
                                    stdMinus={3}
                                    stdYawing={3}
                                    stdSquare={3}
                                />
                            )}
                        />
                        <div className="flex flex-col items-center">
                            <div className="flex">
                                <img src={image18_1} alt="page11-1" className="w-10" />
                                <Controller
                                    name="page11.spacer18_1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <InputCheckSTD
                                            label="SPACER = "
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            unit="mm"
                                            minStd={0}
                                            maxStd={3}
                                            validateStd={false}
                                        />
                                    )}
                                />
                            </div>
                            <img src={image18_2} alt="page11-2" className="w-60" />
                            <Controller
                                name="page11.checkedInfo18"
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
            <div className="m-2">
                <p className="text-xs mb-2">18.2 Check Yawing X axis</p>
                <div className="flex justify-center">
                    <Controller
                        name="page11.yawingData18_1"
                        control={control}
                        defaultValue={{
                            xMinus: '', xC: '', xPlus: '',
                            squareSideX: '', squareSideY: '',
                            squareNo: '', dialGaugeNo: ''
                        }}
                        render={({ field }) => (
                            <EDMYawingX
                                data={field.value}
                                onChange={(key, val) => field.onChange({ ...field.value, [key]: val })}
                                stdMinus={3}
                                stdC={3}
                                stdPlus={3}
                                stdYawing={3}
                                stdSquare={3}
                            />
                        )}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page11;

