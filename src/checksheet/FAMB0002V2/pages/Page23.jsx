import A4Paper from "@/components/UIcomponent/A4Paper";
import { content, checkpoint } from "../FAMB0002v2-setting";
import ImagePointCheck from "@/components/PageComponent/ImagePointCheck";
import { useFormContext, Controller } from "react-hook-form";
import InputCheckSTD from "@/components/UIcomponent/InputCheckSTD";
import CheckedBox from "@/components/UIcomponent/CheckedBox";

// Images
import image28 from "@/assets/FAMB0002V2/image-28.png";

function Page23() {
    const { control } = useFormContext();

    const defaultCheckPoints = [
        { id: 1, x: 10, y: 26, label: checkpoint.c1, checked: false, textPosition: "top" },
        { id: 2, x: 2, y: 32, label: checkpoint.c2, checked: false, textPosition: "right" },
        { id: 3, x: 12, y: 44, label: checkpoint.c3, checked: false, textPosition: "bottom" },
        { id: 4, x: 5, y: 60, label: checkpoint.c4, checked: false, textPosition: "bottom" },
        { id: 5, x: 22, y: 87, label: checkpoint.c5, checked: false, textPosition: "left" },
        { id: 6, x: 44, y: 90, label: checkpoint.c6, checked: false, textPosition: "bottom" },
        { id: 7, x: 58, y: 78, label: checkpoint.c7, checked: false, textPosition: "bottom" },
        { id: 8, x: 74, y: 70, label: checkpoint.c8, checked: false, textPosition: "bottom" },
        { id: 9, x: 78, y: 60, label: checkpoint.c9, checked: false, textPosition: "bottom" },
        { id: 10, x: 75, y: 34, label: checkpoint.c10, checked: false, textPosition: "bottom" },
        { id: 11, x: 76, y: 14, label: checkpoint.c11, checked: false, textPosition: "right" },
        { id: 12, x: 44, y: 11, label: checkpoint.c12, checked: false, textPosition: "right" },
        { id: 13, x: 23, y: 9, label: checkpoint.c13, checked: false, textPosition: "right" },
    ];

    return (
        <A4Paper content={content} currentPage={23}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">29.  Double check body</p>

                <div className="flex items-center">
                    <Controller
                        name="page23.checkPoints"
                        control={control}
                        defaultValue={defaultCheckPoints}
                        render={({ field }) => (
                            <ImagePointCheck
                                backgroundImage={image28}
                                width="180mm"
                                height="180mm"
                                points={field.value}
                                onChange={(pointId, isChecked) => {
                                    const updatedPoints = field.value.map(point =>
                                        point.id === pointId ? { ...point, checked: isChecked } : point
                                    );
                                    field.onChange(updatedPoints);
                                }}
                            />
                        )}
                    />
                </div>
                <div className="flex items-start gap-2 justify-end">
                    <Controller
                        name="page23.totalPoint"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputCheckSTD
                                label="- ตรวจสอบ Table down"
                                unit="mm."
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                validateStd={false}
                            />
                        )}
                    />
                    <Controller
                        name="page23.checkedInfo29"
                        control={control}
                        defaultValue={{ name: '', date: '' }}
                        render={({ field }) => (
                            <CheckedBox
                                label="CHECKED BY / DATE"
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

export default Page23;
