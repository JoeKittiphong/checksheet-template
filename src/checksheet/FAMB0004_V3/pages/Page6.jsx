import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import TableXABDIFF from "@/components/PageComponent/TableXABDIFF";
import { useFormContext, Controller } from "react-hook-form";
import Checknumber from "@/components/UIcomponent/Checknumber";
import CheckedBox from "@/components/UIcomponent/CheckedBox";

// Images
import image11 from "@/assets/FAMB0004_V3/image-11.png";

function Page6() {
    const { control } = useFormContext();

    // STD for Section 11 (9 columns)
    const StraightnessSTD = [
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div>
                <p className="text-sm font-bold">11. CHECK  ค่าความตรงและขนานของแกน  X (หลังจากประกอบ saddle เข้ากับ Bed และใส่ Lm-guide X แล้ว)
                    หน่วยวัดเป็น µm</p>
                <div className="w-full flex flex-col items-center mb-5">
                    <p className="text-sm">(เว้นระยะห่างช่องละ 107 mm.)</p>
                    <img src={image11} alt="page6" className="w-70" />
                </div>
                <div className="ml-20 mb-10">
                    <p className="text-sm">ค่าความตรงและขนานจาก M/A</p>
                    <Controller
                        name="page6.straightnessMAData"
                        control={control}
                        defaultValue={{ a: [], b: [] }}
                        render={({ field }) => (
                            <TableXABDIFF
                                cols={9}
                                data={field.value}
                                onChange={field.onChange}
                                standards={StraightnessSTD}
                                showStd={false}
                                validateStd={false}
                                useArrow={false}
                                labelA="B"
                                labelB="A=Kb"
                            />
                        )}
                    />
                </div>
                <div className="ml-20 mb-10">
                    <p className="text-sm">ASSEMBLY ค่าความตรงและขนานไม่เกิน   3  µm</p>
                    <Controller
                        name="page6.straightnessAssemblyData"
                        control={control}
                        defaultValue={{ a: [], b: [] }}
                        render={({ field }) => (
                            <TableXABDIFF
                                cols={9}
                                data={field.value}
                                onChange={field.onChange}
                                standards={StraightnessSTD}
                                showStd={false}
                                validateStd={true}
                                useArrow={false}
                                labelA="B"
                                labelB="A=Kb"
                            />
                        )}
                    />
                </div>
                <div className="flex w-full justify-center">
                    <div className="mr-10 flex flex-col items-center h-20 justify-between">
                        <Controller
                            name="page6.parallelBarNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="Parallel bar No."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="page6.dialGaugeNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="Dial gauge No."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="page6.checkedInfo11"
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
        </A4Paper>
    );
}

export default Page6;

