import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import { useFormContext, Controller } from "react-hook-form";
import TableXABDIFF from "@/components/PageComponent/TableXABDIFF";
import LevelTableXAB from "@/components/PageComponent/LevelTableXAB";
import Checknumber from "@/components/UIcomponent/Checknumber";
import EDMTablePitchingX from "@/components/PageComponent/EDMTablePitchingX";
import EDMTableRollingX from "@/components/PageComponent/EDMTableRollingX";

// Images
import image9 from "@/assets/FAMB0002V2/image-9.png";
import image10 from "@/assets/FAMB0002V2/image-10.png";

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
                        <Controller
                            name="page5.checkedInfo9"
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
                        <Controller
                            name="page5.levelingGaugeNo9"
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
                    </div>
                </div>
                <div className="ml-20 mb-10">
                    <Controller
                        name="page5.levelXData"
                        control={control}
                        defaultValue={{ a: [], b: [] }}
                        render={({ field }) => (
                            <LevelTableXAB
                                cols={9}
                                data={field.value}
                                onChange={field.onChange}
                                labelA="A=Kb"
                                labelB="B"
                                standards={LevelTableXABSTD}
                            />
                        )}
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
                            <Controller
                                name="page5.pitchingXData"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <EDMTablePitchingX
                                        cols={5}
                                        data={field.value}
                                        onChange={field.onChange}
                                        standards={PitchingSTD}
                                    />
                                )}
                            />
                            <Controller
                                name="page5.rollingXData"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <EDMTableRollingX
                                        cols={5}
                                        data={field.value}
                                        onChange={field.onChange}
                                        standards={RollingSTD}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-between h-20 ml-20 mr-10">
                            <Controller
                                name="page5.pitchingGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="(Pitching) Leveling guage No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page5.rollingGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="( Rolling ) Leveling guage No."
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="page5.checkedInfo10"
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
        </A4Paper>
    );
}

export default Page5;

