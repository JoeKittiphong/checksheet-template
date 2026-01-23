import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import TablePitchingX from "@/components/PageComponent/TablePitchingX";
import TableRollingX from "@/components/PageComponent/TableRollingX";
import TablePitchingY from "@/components/PageComponent/TablePitchingY";
import TableRollingY from "@/components/PageComponent/TableRollingY";
import { useFormContext, Controller } from "react-hook-form";
import Checknumber from "@/components/UIcomponent/Checknumber";
import CheckedBox from "@/components/UIcomponent/CheckedBox";

// Images
import image21_1 from "@/assets/FAMB0004_V3/image-21-1.png";
import image21_2 from "@/assets/FAMB0004_V3/image-21-2.png";
import image21_3 from "@/assets/FAMB0004_V3/image-21-3.png";
import image21_4 from "@/assets/FAMB0004_V3/image-21-4.png";

function Page14() {
    const { control } = useFormContext();

    const imgStyle = "w-50"
    const tableStyle = "flex justify-between items-center border-b p-1 w-150 ml-10 mb-5"

    return (
        <A4Paper content={content} currentPage={14}>
            <div>
                <p className="text-sm font-bold">21. PITCHING , ROLLING X , Y CHECK</p>
                <div className={tableStyle}>
                    <img src={image21_1} alt="page14" className={imgStyle} />
                    <p>MAX 30 μm</p>
                    <Controller
                        name="page14.pitchingXData"
                        control={control}
                        defaultValue={{ b: [], t: [] }}
                        render={({ field }) => (
                            <TablePitchingX
                                data={field.value}
                                onChange={field.onChange}
                                standard={{ min: -30, max: 30 }}
                                referenceCol={1}
                            />
                        )}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_2} alt="page14" className={imgStyle} />
                    <p>MAX 20 μm</p>
                    <Controller
                        name="page14.rollingXData"
                        control={control}
                        defaultValue={{ b: [], t: [] }}
                        render={({ field }) => (
                            <TableRollingX
                                data={field.value}
                                onChange={field.onChange}
                                standard={{ min: -20, max: 20 }}
                                referenceCol={1}
                                showRowT={false}
                                showRowDiff={false}
                            />
                        )}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_3} alt="page14" className={imgStyle} />
                    <p>MAX 30 μm</p>
                    <Controller
                        name="page14.pitchingYData"
                        control={control}
                        defaultValue={{ b: [], t: [] }}
                        render={({ field }) => (
                            <TablePitchingY
                                data={field.value}
                                onChange={field.onChange}
                                standard={{ min: -30, max: 30 }}
                                referenceCol={1}
                            />
                        )}
                    />
                </div>
                <div className={tableStyle}>
                    <img src={image21_4} alt="page14" className={imgStyle} />
                    <p>MAX 20 μm</p>
                    <Controller
                        name="page14.rollingYData"
                        control={control}
                        defaultValue={{ b: [], t: [] }}
                        render={({ field }) => (
                            <TableRollingY
                                data={field.value}
                                onChange={field.onChange}
                                standard={{ min: -20, max: 20 }}
                                referenceCol={1}
                                showColC={false}
                                showColDiff={false}
                            />
                        )}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30">
                    <div className="space-y-2">
                        <Controller
                            name="page14.dialGaugeNo"
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
                        <Controller
                            name="page14.parallelBarNo"
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
                    </div>
                    <Controller
                        name="page14.checkedInfo21"
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

export default Page14;

