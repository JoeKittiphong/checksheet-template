import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormEDMYawingX from "@/components/FormComponents/FormEDMYawingX";
import FormEDMYawingY from "@/components/FormComponents/FormEDMYawingY";
import { useFormContext } from "react-hook-form";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

function Page7() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={7}>
            <div>
                <p className="text-sm font-bold mb-5">18. SQUARE XY/YAWING X,Y CHECK</p>
                <div>
                    <p className="text-xs mb-2">18.1  Check Yawing Y axis and check Square XY</p>
                    <div className="flex justify-start">
                        <FormEDMYawingY
                            name="page7.yawingData18_2"
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
                    <div className="ml-2">
                        <p className="underline font-bold">STD</p>
                        <p>Square MAX = 3 µm</p>
                        <p>Yawing MAX = 3 µm</p>                        
                        <FormCheckedBox name="page7.checkedInfo18_1" />
                    </div>
                    </div>
                </div>
            </div>
            <div className="m-2">
                <p className="text-xs mb-2">18.2 Check Yawing X axis</p>
                <div className="flex justify-start">
                    <FormEDMYawingX
                        name="page7.yawingData18_1"
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

export default Page7;