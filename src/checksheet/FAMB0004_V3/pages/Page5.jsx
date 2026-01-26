import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormEDMTablePitchingX from "@/components/FormComponents/FormEDMTablePitchingX";
import FormEDMTableRollingX from "@/components/FormComponents/FormEDMTableRollingX";
import { useFormContext } from "react-hook-form";

// Images
import image9 from "@/assets/FAMB0004_V3/image-9.png";
import image10 from "@/assets/FAMB0004_V3/image-10.png";

function Page5() {
    const { control } = useFormContext();

    const LevelTableXABSTD = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 5, arrow: '-' },
        { min: 0, max: 5, arrow: '-' },
    ];

    // STD for Pitching (5 columns) - ลูกศรซ้าย/ขวา
    const PitchingSTD = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 5, arrow: '-' },
    ];

    // STD for Rolling (5 columns) - ลูกศรขึ้น/ลง
    const RollingSTD = [
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={5}>
            <div>
                <p className="text-sm font-bold mb-5">9. CHECK LEVEL X การเช็คระดับน ้าแกน X (หลังจากที่ประกอบ Saddle ขึ้นบน Bed แล้ว) หน่วยวัดเป็น µm</p>
                <div className="flex w-full justify-center">
                    <div className="mr-10 mb-5 flex flex-col items-center">
                        <p className="text-sm ">(เว้นระยะห่างช่องละ 107 mm.)</p>
                        <img src={image9} alt="page5" className="w-70" />
                    </div>
                    <div className="mt-10 flex flex-col justify-between h-40">
                        <FormCheckedBox name="page5.checkedInfo9" />
                        <FormChecknumber
                            name="page5.levelingGaugeNo9"
                            label="Leveling guage No."
                        />
                    </div>
                </div>
                <div className="ml-20 mb-10">
                    <FormLevelTableXAB
                        name="page5.levelXData"
                        cols={9}
                        labelA="A=Kb"
                        labelB="B"
                        standards={LevelTableXABSTD}
                        defaultValue={{ a: [], b: [] }}
                    />
                </div>
                <p className="text-sm font-bold">10. CHECK ค่า Pitching/Rolling แกน X (หลังจากประกอบ Saddle เข้ากับ Bed เรียบร้อยแล้ว) หน่วยวัดเป็น µm</p>
                <div>
                    <div className="flex mb-5">
                        <div className="mr-10 flex flex-col items-center">
                            <p className="text-sm">(เว้นระยะห่างช่องละ 212 mm.)</p>
                            <img src={image10} alt="page5" className="w-70" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <FormEDMTablePitchingX
                                name="page5.pitchingXData"
                                cols={5}
                                standards={PitchingSTD}
                                defaultValue={[]}
                            />
                            <FormEDMTableRollingX
                                name="page5.rollingXData"
                                cols={5}
                                standards={RollingSTD}
                                defaultValue={[]}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-between h-20 ml-20 mr-10">
                            <FormChecknumber
                                name="page5.pitchingGaugeNo"
                                label="(Pitching) Leveling guage No."
                            />
                            <FormChecknumber
                                name="page5.rollingGaugeNo"
                                label="( Rolling ) Leveling guage No."
                            />
                        </div>
                        <FormCheckedBox name="page5.checkedInfo10" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;
