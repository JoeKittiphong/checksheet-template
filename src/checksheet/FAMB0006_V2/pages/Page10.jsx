import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormTablePitchingX from "@/components/FormComponents/FormTablePitchingX";
import FormTableRollingX from "@/components/FormComponents/FormTableRollingX";
import FormTablePitchingY from "@/components/FormComponents/FormTablePitchingY";
import FormTableRollingY from "@/components/FormComponents/FormTableRollingY";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image21_1 from "@/assets/FAMB0006_V2/FAMB0005-16-1.PNG";
import image21_2 from "@/assets/FAMB0006_V2/FAMB0005-16-2.PNG";
import image21_3 from "@/assets/FAMB0006_V2/FAMB0005-16-3.PNG";
import image21_4 from "@/assets/FAMB0006_V2/FAMB0005-16-4.PNG";

function Page10() {
    const { control } = useFormContext();

    const imgStyle = "w-50"
    const tableStyle = "flex justify-between items-center border-b p-1 w-150 ml-10 mb-5"

    return (
        <A4Paper content={content} currentPage={10}>
            <div>
                <p className="text-sm font-bold">21. PITCHING , ROLLING X , Y CHECK</p>
                <div className={tableStyle}>
                    <img src={image21_1} alt="page10" className={imgStyle} />
                    <p>MAX 30 μm</p>
                    <FormTablePitchingX
                        name="page10.pitchingXData"
                        standard={{ min: -30, max: 30 }}
                        referenceCol={1}
                        defaultValue={{ b: [], t: [] }}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_2} alt="page10" className={imgStyle} />
                    <p>MAX 20 μm</p>
                    <FormTableRollingX
                        name="page10.rollingXData"
                        standard={{ min: -20, max: 20 }}
                        referenceCol={1}
                        showRowT={false}
                        showRowDiff={false}
                        defaultValue={{ b: [], t: [] }}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_3} alt="page10" className={imgStyle} />
                    <p>MAX 30 μm</p>
                    <FormTablePitchingY
                        name="page10.pitchingYData"
                        standard={{ min: -30, max: 30 }}
                        referenceCol={1}
                        defaultValue={{ b: [], t: [] }}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_4} alt="page10" className={imgStyle} />
                    <p>MAX 20 μm</p>
                    <FormTableRollingY
                        name="page10.rollingYData"
                        standard={{ min: -20, max: 20 }}
                        referenceCol={1}
                        showColC={false}
                        showColDiff={false}
                        defaultValue={{ b: [], t: [] }}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30">
                    <div className="space-y-2">
                        <FormChecknumber
                            name="page10.dialGaugeNo"
                            label="Dial gauge No."
                        />
                        <FormChecknumber
                            name="page10.parallelBarNo"
                            label="Parallel bar No."
                        />
                    </div>
                    <FormCheckedBox name="page10.checkedInfo21" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page10;