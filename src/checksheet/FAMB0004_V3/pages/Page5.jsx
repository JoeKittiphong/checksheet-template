import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormEDMTablePitchingX from "@/components/FormComponents/FormEDMTablePitchingX";
import FormEDMTableRollingX from "@/components/FormComponents/FormEDMTableRollingX";
import { useFormContext } from "react-hook-form";

// Images
import image9 from "@/assets/FAMB0004_V3/image-9.PNG";
import image10 from "@/assets/FAMB0004_V3/image-10.PNG";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

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
                <p className="text-sm font-bold">9. ตรวจสอบการ Support Leveling bolt ก่อนการ CHECK ACCURACY ของเครื่อง</p>
                <div>
                    <p className="text-sm ml-5 mb-5">เมื่อประกอบ Table , Saddle เข้ำกับ Bed แล้ว ให้เลื่อน Saddle ไปต ำแหน่ง Y+ แล้วต้อง <b>หมุน Leveling bolt Support(ตำแหน่งหมายเลข 4,5)</b> ลงมาชน Leveling block ให้ตึงมือ<b>(ห้ามใช้ ประแจ)</b></p>
                    <div className="flex">
                        <img src={image9} alt="page5" className="w-70 m-2 ml-10" />
                        <div>
                            <div className="flex mb-10 items-start mt-5">
                                <div className="w-10 h-8 flex items-center justify-center mr-2">
                                    <FormItemCheck
                                        name="page5.levelingBoltCheck"
                                        label={null}
                                    />
                                </div>
                                <p>หมุน Leveling bolt support ตำแหน่ง 4 และ 5<br />ลงมาชน Leveling block โดยไม่ได้ใช้ประแจ<br />เรียบร้อยแล้ว</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-sm font-bold">10. CHECK ค่า Pitching/Rolling แกน X (หลังจากประกอบ Saddle เข้ากับ Bed เรียบร้อยแล้ว) หน่วยวัดเป็น µm</p>
                <div>
                    <div className="flex flex-col items-center mb-5">
                        <p className="text-sm">(เว้นระยะห่างช่องละ 212 mm.)</p>
                        <img src={image10} alt="page5" className="w-70" />
                    </div>
                    <div className="flex">
                        <div className="mb-10">
                            <FormLevelTableXAB
                                name="page5.levelXData"
                                cols={13}
                                labelA="A=Kb"
                                labelB="B"
                                standards={LevelTableXABSTD}
                                validateStd={false}
                                showStd={false}
                                defaultValue={{ a: [], b: [] }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between h-20 ml-20 mr-10">
                        <FormChecknumber
                            name="page5.rollingGaugeNo"
                            label="Leveling guage No."
                        />
                        <FormCheckedBox name="page5.checkedInfo10" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;
