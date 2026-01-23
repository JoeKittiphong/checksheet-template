import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import TableYABDIFF from "@/components/PageComponent/TableYABDIFF";
import Checknumber from "@/components/UIcomponent/Checknumber";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import EDMTablePitchingY from "@/components/PageComponent/EDMTablePitchingY";
import EDMTableRollingY from "@/components/PageComponent/EDMTableRollingY";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image3 from "@/assets/FAMB0004_V3/image-3.png";
import image4 from "@/assets/FAMB0004_V3/image-4.png";

function Page2() {
    const { control } = useFormContext();

    // Standards สำหรับ TableYABDIFF
    const tableYABStandards = [
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: -5, max: 0, arrow: '-' },
        { min: -5, max: 0, arrow: '-' },
    ];

    // Standards สำหรับ EDMtablePitching
    const pitchingStandards = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 5, arrow: '-' },
    ];

    // Standards สำหรับ EDMtableRolling
    const rollingStandards = [
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
    ];

    return (
        <A4Paper content={content} currentPage={2}>
            <div>
                <div className="mb-5">
                    <p className="text-sm font-bold">3. LEVELING CHECK Y AXIS ( ASSEMBLY DATA ) [การเช็คระดับน ้าแกน Y, ข้อมูลจาก AS]หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image3} alt="page1" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <Controller
                                name="page2.tableYABData"
                                control={control}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                                render={({ field }) => (
                                    <TableYABDIFF
                                        rows={9}
                                        data={field.value}
                                        onChange={field.onChange}
                                        standards={tableYABStandards}
                                        showStd={true}
                                        validateStd={true}
                                    />
                                )}
                            />
                        </div>
                        <div className="h-70 flex flex-col justify-center ml-2 p-2">
                            <Controller
                                name="page2.levelingGaugeNo"
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
                            <div className="h-5"></div>
                            <Controller
                                name="page2.checkedInfo"
                                control={control}
                                defaultValue={{ name: '', date: '' }}
                                render={({ field }) => (
                                    <CheckedBox
                                        name={field.value?.name ?? ''}
                                        date={field.value?.date ?? ''}
                                        onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                        onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                                        label="CHECKED BY / DATE"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">4. CHECK ค่า Pitching/Rolling แกน Y หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image4} alt="page2" className="w-70 h-full m-2" />
                        <div>
                            <div className="flex">
                                <div className="m-5">
                                    <Controller
                                        name="page2.pitchingData"
                                        control={control}
                                        defaultValue={['', '', '', '', '']}
                                        render={({ field }) => (
                                            <EDMTablePitchingY
                                                rows={5}
                                                data={field.value}
                                                onChange={field.onChange}
                                                standards={pitchingStandards}
                                                showStd={true}
                                                validateStd={true}
                                            />
                                        )}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 205 mm.)</p>
                                </div>
                                <div className="m-5">
                                    <Controller
                                        name="page2.rollingData"
                                        control={control}
                                        defaultValue={['', '', '', '', '']}
                                        render={({ field }) => (
                                            <EDMTableRollingY
                                                rows={5}
                                                data={field.value}
                                                onChange={field.onChange}
                                                standards={rollingStandards}
                                                showStd={true}
                                                validateStd={true}
                                            />
                                        )}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 205 mm.)</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mr-10">
                                    <Controller
                                        name="page2.levelingGaugeNo"
                                        control={control}
                                        render={({ field }) => (
                                            <Checknumber
                                                label="Leveling guage No."
                                                value={field.value ?? ''}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="page2.levelingGaugeNo2"
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
                                <Controller
                                    name="page2.checkedInfo"
                                    control={control}
                                    render={({ field }) => (
                                        <CheckedBox
                                            name={field.value?.name ?? ''}
                                            date={field.value?.date ?? ''}
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
            </div>
        </A4Paper>
    );
}

export default Page2;

