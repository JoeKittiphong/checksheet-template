import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import { useFormContext, Controller } from "react-hook-form";
import Checknumber from "@/components/UIcomponent/Checknumber";
import LevelTableXAB from "@/components/PageComponent/LevelTableXAB";

// Images
import image7 from "@/assets/FAMB0002V2/image-7.png";
import image8 from "@/assets/FAMB0002V2/image-8.png";

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
                                <div className="flex mb-10">
                                    <Controller
                                        name="page4.levelingBoltCheck"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <input
                                                className="w-10 h-10 m-2"
                                                type="checkbox"
                                                checked={field.value ?? false}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <p>หมุน Leveling bolt support ตำแหน่ง 4 และ 5ลงมาชน Leveling block โดยไม่ได้ใช้ประแจเรียบร้อยแล้ว</p>
                                </div>
                                <Controller
                                    name="page4.checkedInfo7"
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
                    <p className="text-sm font-bold mb-5">8. LEVELING CHECK X AXIS (DATA FROM MA MACHINE) [การเช็คระดับน ้าแกน X, ข้อมูลจาก MA] หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <div className="p-2 flex flex-col justify-between">
                            <Controller
                                name="page4.levelingGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="Leveling guage No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page4.checkedInfo8"
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
                        <img src={image8} alt="page4" className="w-80 m-2 ml-10" />
                    </div>
                    <div className="m-5 ml-20">
                        <Controller
                            name="page4.levelXData"
                            control={control}
                            defaultValue={{ a: [], b: [] }}
                            render={({ field }) => (
                                <LevelTableXAB
                                    cols={9}
                                    data={field.value}
                                    onChange={field.onChange}
                                    labelA="B"
                                    labelB="A=Kb"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;

