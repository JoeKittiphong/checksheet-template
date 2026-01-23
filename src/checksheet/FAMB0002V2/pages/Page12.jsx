import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import EDMTableStraightness from "@/components/PageComponent/EDMTableStraightness";
import { useFormContext, Controller } from "react-hook-form";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import Checknumber from "@/components/UIcomponent/Checknumber";

function Page12() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={12}>
            <div>
                <p className="text-sm font-bold">19. STRAIGHTNESS  ( SIDE )</p>
                <div className="flex gap-5 ml-15 mt-2">
                    <Controller
                        name="page12.straightnessDataLeft"
                        control={control}
                        defaultValue={{}}
                        render={({ field }) => (
                            <EDMTableStraightness
                                title="Straight of X Axis"
                                rowCount={31}
                                strokeStep={20}
                                data={field.value}
                                onChange={field.onChange}
                                standard={3}
                            />
                        )}
                    />

                    <Controller
                        name="page12.straightnessDataRight"
                        control={control}
                        defaultValue={{}}
                        render={({ field }) => (
                            <EDMTableStraightness
                                title="Straight of Y Axis"
                                rowCount={31}
                                strokeStep={20}
                                data={field.value}
                                onChange={field.onChange}
                                standard={3}
                            />
                        )}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30">
                    <div className="space-y-2">
                        <Controller
                            name="page12.dialGaugeNo"
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
                            name="page12.parallelBarNo"
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
                        name="page12.checkedInfo19"
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

export default Page12;
