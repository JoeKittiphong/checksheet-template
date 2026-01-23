import { useFormContext, Controller } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import LevelTableYAB from "@/components/PageComponent/LevelTableYAB";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import Checknumber from "@/components/UIcomponent/Checknumber";
import TableYABDIFF from "@/components/PageComponent/TableYABDIFF";

// Images
import image1 from "@/assets/FAMB0003_V2/image-1.png";
import image1_2 from "@/assets/FAMB0003_V2/image-1-2.png";

function Page1() {
    const { control } = useFormContext();

    // Standards สำหรับ TableYABDIFF
    const tableYABStandards = [
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div>
                <div className="mb-5 w-full h-50%">
                    <p className="text-sm font-bold">1. LEVELING CHECK Y AXIS ( DATA FORM MACHINE ) [การเช็คระดับน้ำแกน Y, ข้อมูลจาก MA] หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image1} alt="page1" className="w-70 h-full m-2" />
                        <div>
                            <p className="text-sm text-center mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <Controller
                                name="page1.levelYData"
                                control={control}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                                render={({ field }) => (
                                    <LevelTableYAB
                                        rows={9}
                                        data={field.value}
                                        onChange={field.onChange}
                                        labelA="A=Kb"
                                        labelB="B"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col justify-end ml-4">
                            <Controller
                                name="page1.checkedInfo"
                                control={control}
                                defaultValue={{ name: '', date: '' }}
                                render={({ field }) => (
                                    <CheckedBox
                                        name={field.value.name}
                                        date={field.value.date}
                                        onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                        onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                                        label="CHECKED BY / DATE"
                                    />
                                )}
                            />
                            <div className="h-10"></div>
                            <Controller
                                name="page1.levelingGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        label="Leveling guage No."
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">2. CHECK ค่าความตรงและความขนานแกน Y ( DATA FORM MACHINE ) หน่วยวัดเป็น µm</p>
                    <div className="flex w-full h-full">
                        <img src={image1_2} alt="page1" className="w-70 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <Controller
                                name="page1.tableYABData"
                                control={control}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                                render={({ field }) => (
                                    <TableYABDIFF
                                        rows={9}
                                        data={field.value}
                                        onChange={field.onChange}
                                        standards={tableYABStandards}
                                        showStd={false}
                                        validateStd={false}
                                    />
                                )}
                            />
                            <Controller
                                name="page1.dialGaugeNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        className="mb-4"
                                        label="Dial guage No."
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <Controller
                                name="page1.parallelBarNo"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Checknumber
                                        className="mb-2"
                                        label="parallel bar No."
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col justify-end m-5">
                            <Controller
                                name="page1.checkedInfo2" // Use distinct name if intended to be separate, or same if shared
                                control={control}
                                defaultValue={{ name: '', date: '' }}
                                render={({ field }) => (
                                    <CheckedBox
                                        name={field.value.name}
                                        date={field.value.date}
                                        onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                        onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                                        label="CHECKED BY / DATE"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;


