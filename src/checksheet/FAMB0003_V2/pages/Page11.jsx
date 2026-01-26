import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import FormEDMYawingX from "@/components/FormComponents/FormEDMYawingX";
import FormEDMYawingY from "@/components/FormComponents/FormEDMYawingY";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import { useFormContext } from "react-hook-form";

// Images
import image18_1 from "@/assets/FAMB0003_V2/image-18-1.png";
import image18_2 from "@/assets/FAMB0003_V2/image-18-2.png";

function Page11() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={11}>
            <div>
                <p className="text-sm font-bold mb-5">18. SQUARE XY/YAWING X,Y CHECK</p>
                <div>
                    <p className="text-xs mb-2">18.1  Check Yawing Y axis and check Square XY</p>
                    <div className="flex justify-center">
                        <FormEDMYawingY
                            name="page11.yawingData18_2"
                            stdPlus={3}
                            stdC={3}
                            stdMinus={3}
                            stdYawing={3}
                            stdSquare={3}
                            defaultValue={{
                                yPlus: '', yC: '', yMinus: '',
                                squareSideX: '', squareSideY: '',
                                squareNo: '', dialGaugeNo: ''
                            }}
                        />
                        <div className="flex flex-col items-center">
                            <div className="flex">
                                <img src={image18_1} alt="page11-1" className="w-10" />
                                <FormInputCheckSTD
                                    name="page11.spacer18_1"
                                    label="SPACER = "
                                    unit="mm"
                                    minStd={0}
                                    maxStd={3}
                                    validateStd={false}
                                />
                            </div>
                            <img src={image18_2} alt="page11-2" className="w-60" />
                            <FormCheckedBox name="page11.checkedInfo18" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-2">
                <p className="text-xs mb-2">18.2 Check Yawing X axis</p>
                <div className="flex justify-center">
                    <FormEDMYawingX
                        name="page11.yawingData18_1"
                        stdMinus={3}
                        stdC={3}
                        stdPlus={3}
                        stdYawing={3}
                        stdSquare={3}
                        defaultValue={{
                            xMinus: '', xC: '', xPlus: '',
                            squareSideX: '', squareSideY: '',
                            squareNo: '', dialGaugeNo: ''
                        }}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page11;
