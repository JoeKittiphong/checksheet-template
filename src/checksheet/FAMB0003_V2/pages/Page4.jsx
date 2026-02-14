import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image7 from "@/assets/FAMB0003_V2/image-7.png";
import image8 from "@/assets/FAMB0003_V2/image-8.png";

function Page4() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={4}>
            <div>
                <div>
                    <p className="text-sm font-bold">7. ตรวจสอบการ Support Leveling bolt ก่อนการ CHECK ACCURACY ของเครื่อง</p>
                    <div>
                        <p className="text-s ml-5 mb-5">เมื่อประกอบ Table , Saddle เข้ำกับ Bed แล้ว ให้เลื่อน Saddle ไปต ำแหน่ง Y+ แล้วต้อง <b>หมุน Leveling bolt Support(ตำแหน่งหมายเลข 4,5)</b> ลงมาชน Leveling block ให้ตึงมือ<b>(ห้ามใช้ ประแจ)</b></p>
                        <div className="flex">
                            <img src={image7} alt="page4" className="w-80 m-2 ml-10" />
                            <div>
                                <div className="flex mb-10 items-center">
                                    <FormItemCheck
                                        name="page4.levelingBoltCheck"
                                        label=""
                                        className="m-2 ml-0"
                                        checkboxSize="w-5 h-5"
                                    />
                                    <p className="ml-2">หมุน Leveling bolt support ตำแหน่ง 4 และ 5ลงมาชน Leveling block โดยไม่ได้ใช้ประแจเรียบร้อยแล้ว</p>
                                </div>
                                <FormCheckedBox name="page4.checkedInfo7" />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-bold mb-5">8. LEVELING CHECK X AXIS (DATA FROM MA MACHINE) [การเช็คระดับน ้าแกน X, ข้อมูลจาก MA] หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <div className="p-2 flex flex-col justify-between">
                            <FormChecknumber
                                name="page4.levelingGaugeNo"
                                label="Leveling guage No."
                            />
                            <FormCheckedBox name="page4.checkedInfo8" />
                        </div>
                        <img src={image8} alt="page4" className="w-80 m-2 ml-10" />
                    </div>
                    <div className="m-5 ml-20">
                        <FormLevelTableXAB
                            name="page4.levelXData"
                            cols={9}
                            labelA="A=Kb"
                            labelB="B"
                            defaultValue={{ a: [], b: [] }}
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;
