import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormEDMTablePitchingY from "@/components/FormComponents/FormEDMTablePitchingY";
import FormEDMTableRollingY from "@/components/FormComponents/FormEDMTableRollingY";
import { useFormContext } from "react-hook-form";

// Images
import image5 from "@/assets/FAMB0004_V3/image-5.PNG";
import image6 from "@/assets/FAMB0004_V3/image-6.PNG";

function Page3() {
    const { control } = useFormContext();

    // Standards สำหรับ Pitching Y
    const pitchingYStandards = [
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
    ];

    // Standards สำหรับ Rolling Y
    const rollingYStandards = [
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
    ];

    // Standards for Item 6
    const checkParallelStandards = Array(11).fill({ min: 0, max: 4, arrow: '' });

    return (
        <A4Paper content={content} currentPage={3}>
            <div>
                <div className="mt-5">
                    <p className="text-sm font-bold">5. CHECK ค่า Pitching/Rolling แกน Y หน่วยวัดเป็น mm [ระหว่างราง A,B และ B,C]</p>
                    <div className="flex">
                        <img src={image5} alt="page3" className="w-70 h-full m-2" />
                        <div>
                            <div className="flex">
                                <div className="m-5">
                                    <FormEDMTablePitchingY
                                        name="page3.pitchingYData"
                                        rows={5}
                                        standards={pitchingYStandards}
                                        showStd={true}
                                        validateStd={true}
                                        defaultValue={['', '', '', '', '']}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 328 mm.)</p>
                                </div>
                                <div className="m-5">
                                    <FormEDMTableRollingY
                                        name="page3.rollingYData"
                                        rows={5}
                                        standards={rollingYStandards}
                                        showStd={true}
                                        validateStd={true}
                                        defaultValue={['', '', '', '', '']}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 328 mm.)</p>
                                </div>
                            </div>
                            <p className="text-sm ml-5 mb-2">MAX = 25 µm</p>
                            <div className="flex">
                                <div className="mr-2">
                                    <FormChecknumber
                                        name="page3.pitchingGaugeNo"
                                        label="Level gauge No. (Pitching)"
                                    />
                                    <FormChecknumber
                                        name="page3.rollingGaugeNo"
                                        label="Level gauge No. (Rolling)"
                                    />
                                </div>
                                <FormCheckedBox
                                    name="page3.checkedInfo5"
                                    label="CHECKED BY / DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-sm font-bold">6. CHECK ค่าความขนานและความตรงของแกน Y หลังจากที่ประกอบ Lm-guide แล้ว หน่วยวัดเป็น µm [ระหว่างราง A และ B]</p>
                    <div className="flex">
                        <img src={image6} alt="page3" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 131 mm.)</p>
                            <FormTableYABDIFF
                                name="page3.checkParallelData"
                                control={control}
                                rows={11}
                                labelA="A=Kb"
                                labelB="B"
                                labelDiff="A+B"
                                diffMode="sum"
                                standards={checkParallelStandards}
                                showStd={false}
                                validateStd={true}
                                showArrows={false}
                                defaultValue={[
                                    { a: '0', b: '0' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '0', b: '' }
                                ]}
                            />
                        </div>
                        <div className="h-70 flex flex-col justify-center ml-2 p-2">
                            <p className="text-sm mb-2">ค่าความตรงและความขนาน ไม่เกิน 4 µm</p>
                            <FormChecknumber
                                name="page3.dialGaugeNo"
                                label="Dial gauge No."
                            />
                            <FormChecknumber
                                name="page3.parallelBarNo"
                                label="Parallel bar No."
                            />
                            <div className="h-5"></div>
                            <FormCheckedBox
                                name="page3.checkedInfo6"
                                label="CHECKED BY / DATE"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;
