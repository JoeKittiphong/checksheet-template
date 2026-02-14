import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTableXABDIFF from "@/components/FormComponents/FormTableXABDIFF";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image11 from "@/assets/FAMB0004_V3/image-11.PNG";
import image12 from "@/assets/FAMB0004_V3/image-12.PNG";

import FormEDMTablePitchingX from "@/components/FormComponents/FormEDMTablePitchingX";
import FormEDMTableRollingX from "@/components/FormComponents/FormEDMTableRollingX";

function Page6() {
    const { control } = useFormContext();

    // STD for Section 11 (13 columns) - -/left and +/right
    const Page6STD = [
        { min: 25, max: 25, arrow: '-' },
        { min: 15, max: 15, arrow: '-' },
        { min: 5, max: 5, arrow: '-' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 5, max: 5, arrow: '+' },
        { min: 15, max: 15, arrow: '+' },
        { min: 25, max: 25, arrow: '+' },
    ];

    // STD for Section 12 (7 columns)
    const Pitching12STD = [
        { min: 0, max: 0.5, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
    ];

    const Rolling12STD = [
        { min: 0, max: 0.5, arrow: '' },
        { min: 0, max: 0.5, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0.5, arrow: '' },
        { min: 0, max: 0.5, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div>
                <p className="text-sm font-bold">11. CHECK LEVEL X การเช็คระดับน ้าแกน X (หลังจากที่ประกอบ Saddle ขึ้นบน Bed แล้ว) หน่วยวัดเป็น µm</p>
                <div className="w-full flex flex-col items-center mb-5">
                    <p className="text-sm">(เว้นระยะห่างช่องละ 117 mm.)</p>
                    <img src={image11} alt="page6" className="w-70" />
                    <FormChecknumber
                        name="page6.levelGaugeNo"
                        label="Level guage No."
                    />
                </div>
                <div className="mb-10 w-full flex justify-center">
                    <FormLevelTableXAB
                        name="page6.straightnessMAData"
                        cols={13}
                        standards={Page6STD}
                        showStd={true}
                        validateStd={true}
                        labelA="A=KB"
                        labelB="B"
                        defaultValue={{ a: [], b: [] }}
                    />
                </div>

                <p className="text-sm font-bold">12. CHECK ค่า Pitching/Rolling แกน X (หลังจากประกอบ Saddle เข้ากับ Bed เรียบร้อยแล้ว) หน่วยวัดเป็น µm</p>
                <div className="flex justify-between mt-5">
                    <div className="w-1/2 flex flex-col items-center">
                        <img src={image12} alt="page6" className="w-80" />
                        <p className="text-sm mt-5">(เว้นระยะห่างช่องละ 234 mm.)</p>
                    </div>
                    <div className="w-1/2">
                        <div className="mb-5">
                            <FormEDMTablePitchingX
                                name="page6.pitchingXData"
                                cols={7}
                                standards={Pitching12STD}
                                showStd={true}
                                validateStd={true}
                                defaultValue={[]}
                            />
                            <p className="text-sm mt-2 text-center">Pitching MAX = 25 µm</p>
                        </div>
                        <div className="mb-5">
                            <FormEDMTableRollingX
                                name="page6.rollingXData"
                                cols={7}
                                standards={Rolling12STD}
                                showStd={true}
                                validateStd={true}
                                defaultValue={[]}
                            />
                            <p className="text-sm mt-2 text-center">Rolling max diff = 10 µm</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-between items-end mt-10">
                    <div className="flex flex-col w-1/2 ml-20">
                        <div className="mb-2 w-full">
                            <FormChecknumber
                                name="page6.levelGaugeNo1"
                                label="LEVEL GAUGE NO."
                            />
                        </div>
                        <div className="w-full">
                            <FormChecknumber
                                name="page6.levelGaugeNo2"
                                label="LEVEL GAUGE NO."
                            />
                        </div>
                    </div>
                    <FormCheckedBox name="page6.checkedInfo12" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;
