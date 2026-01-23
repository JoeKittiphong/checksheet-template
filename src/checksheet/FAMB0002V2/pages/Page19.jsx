import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import TablePitchXYZUV from "@/components/PageComponent/TablePitchXYZUV";
import { useFormContext, Controller } from "react-hook-form";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import Checknumber from "@/components/UIcomponent/Checknumber";

function Page19() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={19}>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">26. PITCH CHECK (Z - AXIS)</p>
                <div className="flex justify-center">
                    <Controller
                        name="page19.pitchZData"
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
                                rowCount={27}
                                stepSize={20}
                                showCalcCol={false}
                                tableLabels={['Z1', 'Z2', 'Z3', 'Z4']}
                                maxAB={15}
                                maxDiff={1}
                            />
                        )}
                    />
                </div>

                <div className="flex justify-start items-end gap-10 mt-4 ml-20">
                    <div className="space-y-4">
                        <Controller
                            name="page19.pitchMasterNo"
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
                            name="page19.dialGaugeNo"
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
                        name="page19.checkedInfo26"
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

export default Page19;
