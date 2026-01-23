import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import InputCheckSTD from "@/components/UIcomponent/InputCheckSTD";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image22 from "@/assets/FAMB0002V2/image-22.png";

function Page15() {
    const { control } = useFormContext();

    const parallelHeadSTD = 3

    return (
        <A4Paper content={content} currentPage={15}>
            <div className="flex flex-col gap-5">
                <p className="text-sm font-bold">22. PARALLEL OF HEAD CHECK</p>
                <div className="flex ml-20">
                    <img src={image22} alt="page15" className="w-40" />

                    <div className="flex gap-10 items-center">
                        <div className="space-y-4">
                            <Controller
                                name="page15.parallelHead1"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputCheckSTD
                                        label="X = "
                                        unit="μm"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        maxStd={parallelHeadSTD}
                                        minStd={0}
                                    />
                                )}
                            />
                            <Controller
                                name="page15.parallelHead2"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputCheckSTD
                                        label="Y = "
                                        unit="μm"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        maxStd={parallelHeadSTD}
                                        minStd={0}
                                    />
                                )}
                            />
                        </div>

                        <Controller
                            name="page15.checkedInfo22"
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

export default Page15;
