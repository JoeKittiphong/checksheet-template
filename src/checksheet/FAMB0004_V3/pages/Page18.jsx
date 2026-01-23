import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import TablePitchXYZUV from "@/components/PageComponent/TablePitchXYZUV";
import { useFormContext, Controller } from "react-hook-form";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import Checknumber from "@/components/UIcomponent/Checknumber";

function Page18() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={18}>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">25. PITCH CHECK (Y - AXIS)</p>
                <div className="flex justify-center">
                    <Controller
                        name="page18.pitchYData"
                        control={control}
                        defaultValue={[
                            { a: [], b: [] },
                            { a: [], b: [] },
                            { a: [], b: [] },
                            { a: [], b: [] }
                        ]}
                        render={({ field }) => (
                            <TablePitchXYZUV
                                data={field.value}
                                onChange={field.onChange}
                                rowCount={31}
                                stepSize={20}
                                showCalcCol={false}
                                tableLabels={['Y1', 'Y2', 'Y3', 'Y4']}
                                maxAB={15}
                                maxDiff={1}
                            />
                        )}
                    />
                </div>

                <div className="flex justify-start items-end gap-10 mt-4 ml-20">
                    <div className="space-y-4">
                        <Controller
                            name="page18.pitchMasterNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="PITCH MASTER NO."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="page18.dialGaugeNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="DIAL GAUGE NO."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="page18.checkedInfo25"
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

export default Page18;

