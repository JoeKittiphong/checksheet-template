import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormTablePitchingX from "@/components/FormComponents/FormTablePitchingX";
import FormTableRollingX from "@/components/FormComponents/FormTableRollingX";
import FormTablePitchingY from "@/components/FormComponents/FormTablePitchingY";
import FormTableRollingY from "@/components/FormComponents/FormTableRollingY";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import { useFormContext } from "react-hook-form";

// Images
import image21_1 from "@/assets/FAMB0004_V3/image-21-1.png";
import image21_2 from "@/assets/FAMB0004_V3/image-21-2.png";
import image21_3 from "@/assets/FAMB0004_V3/image-21-3.png";
import image21_4 from "@/assets/FAMB0004_V3/image-21-4.png";
import image24 from "@/assets/FAMB0004_V3/image-24.PNG";

function Page11() {
    const { control } = useFormContext();

    const imgStyle = "w-40"
    const tableStyle = "flex justify-between items-center p-1 w-150 ml-10"

    return (
        <A4Paper content={content} currentPage={11}>
            <div>
                <p className="text-sm font-bold">17. PITCHING , ROLLING X , Y CHECK</p>
                <div className="flex flex-col xl:flex-row flex-wrap">
                    <div className={tableStyle}>
                        <div>
                            <p>1.pitching X axis</p>
                            <img src={image21_1} alt="Page11" className={imgStyle} />
                        </div>
                        <p>MAX 30 µm</p>
                        <FormTablePitchingX
                            name="Page11.pitchingXData"
                            standard={{ min: -30, max: 30 }}
                            referenceCol={1}
                            defaultValue={{ b: [], t: [] }}
                        />
                    </div>
                    <div className={tableStyle}>
                        <div>
                            <p>2.rolling X axis</p>
                            <img src={image21_2} alt="Page11" className={imgStyle} />
                        </div>
                        <p>MAX 20 µm</p>
                        <FormTableRollingX
                            name="Page11.rollingXData"
                            standard={{ min: -20, max: 20 }}
                            referenceCol={1}
                            showRowT={false}
                            showRowDiff={false}
                            defaultValue={{ b: [], t: [] }}
                        />
                    </div>
                    <div className={tableStyle}>
                        <div>
                            <p>3.pitching Y axis</p>
                            <img src={image21_3} alt="Page11" className={imgStyle} />
                        </div>
                        <p>MAX 30 µm</p>
                        <FormTablePitchingY
                            name="Page11.pitchingYData"
                            standard={{ min: -30, max: 30 }}
                            referenceCol={1}
                            defaultValue={{ b: [], t: [] }}
                        />
                    </div>
                    <div className={tableStyle}>
                        <div>
                            <p>4.rolling Y axis</p>
                            <img src={image21_4} alt="Page11" className={imgStyle} />
                        </div>
                        <p>MAX 20 µm</p>
                        <FormTableRollingY
                            name="Page11.rollingYData"
                            standard={{ min: -20, max: 20 }}
                            referenceCol={1}
                            showColC={false}
                            showColDiff={false}
                            defaultValue={{ b: [], t: [] }}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30">
                    <FormChecknumber
                        name="Page11.dialGaugeNo"
                        label="Level gauge No."
                    />
                    <FormChecknumber
                        name="Page11.parallelBarNo"
                        label="Level gauge No."
                    />
                </div>

                <div className="">
                    <p className="text-sm font-bold">18. PARALLEL OF HEAD</p>
                    <div className="flex w-full">
                        <div className="w-1/3 flex justify-center items-center">
                            <img src={image24} alt="Page11" className="w-60" />
                        </div>
                        <div className="w-1/3 flex flex-col justify-center pl-10">
                            <p className="text-sm mb-2">STD 3 µm</p>
                            <div className="flex items-center mb-2">
                                <span className="mr-2">X =</span>
                                <FormInputCheckSTD name="Page11.parallelHeadX" label={null} standard={{ min: 0, max: 3 }} />
                                <span className="ml-2">µm</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">Y =</span>
                                <FormInputCheckSTD name="Page11.parallelHeadY" label={null} standard={{ min: 0, max: 3 }} />
                                <span className="ml-2">µm</span>
                            </div>
                        </div>
                        <div className="w-1/3 flex flex-col items-end pr-10 justify-end">
                            <div className="mb-5 w-60">
                                <FormChecknumber name="Page11.dialNo24" label="DIAL GAUGE NO." />
                            </div>
                            <FormCheckedBox name="Page11.checkedInfo24" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page11;

