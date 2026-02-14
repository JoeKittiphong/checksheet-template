import React from "react";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content, checkpoint } from "../FAMB0008_V1-setting";
import ImagePointCheck from "@/components/PageComponent/ImagePointCheck";
import { useFormContext, Controller } from "react-hook-form";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image28 from "@/assets/FAMB0008_V1/FAMB0008-25.PNG"; // Fallback from image-31

function Page19() {
    const { control, getValues, setValue } = useFormContext();

    const defaultCheckPoints = React.useMemo(() => [
        { id: 1, x: 5, y: 11, label: checkpoint.c1, checked: null, textPosition: "bottom" },
        { id: 2, x: 3, y: 30, label: checkpoint.c2, checked: null, textPosition: "right" },
        { id: 3, x: 8, y: 37, label: checkpoint.c3, checked: null, textPosition: "bottom" },
        { id: 4, x: 2, y: 50, label: checkpoint.c4, checked: null, textPosition: "bottom" },
        { id: 5, x: 3, y: 80, label: checkpoint.c5, checked: null, textPosition: "right" },
        { id: 6, x: 32, y: 93, label: checkpoint.c6, checked: null, textPosition: "bottom" },
        { id: 7, x: 45, y: 78, label: checkpoint.c7, checked: null, textPosition: "bottom" },
        { id: 8, x: 65, y: 75, label: checkpoint.c8, checked: null, textPosition: "bottom" },
        { id: 9, x: 80, y: 60, label: checkpoint.c9, checked: null, textPosition: "bottom" },
        { id: 10, x: 78, y: 34, label: checkpoint.c10, checked: null, textPosition: "bottom" },
        { id: 11, x: 75, y: 12, label: checkpoint.c11, checked: null, textPosition: "right" },
        { id: 12, x: 44, y: 15, label: checkpoint.c12, checked: null, textPosition: "right" },
        { id: 13, x: 23, y: 8, label: checkpoint.c13, checked: null, textPosition: "right" },
    ], []);

    React.useEffect(() => {
        const currentPoints = getValues("Page19.checkPoints");
        if (!currentPoints || currentPoints.length === 0) {
            setValue("Page19.checkPoints", defaultCheckPoints);
        } else {
            // Update coordinates/labels while keeping checked status
            const updatedPoints = defaultCheckPoints.map(defPoint => {
                const existingPoint = currentPoints.find(p => p.id === defPoint.id);
                return existingPoint ? { ...defPoint, checked: existingPoint.checked } : defPoint;
            });

            // Only update if there are changes to avoid infinite loop
            const isDifferent = JSON.stringify(updatedPoints) !== JSON.stringify(currentPoints);
            if (isDifferent) {
                setValue("Page19.checkPoints", updatedPoints);
            }
        }
    }, [defaultCheckPoints, setValue, getValues]);

    return (
        <A4Paper content={content} currentPage={19}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">29.  Double check body</p>

                <div className="flex items-center">
                    <Controller
                        name="Page19.checkPoints"
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
                    <FormInputCheckSTD
                        name="Page19.totalPoint"
                        label="- ��Ǩ�ͺ Table down"
                        unit="mm."
                        validateStd={false}
                    />
                    <FormCheckedBox
                        name="Page19.checkedInfo29"
                        label="CHECKED BY / DATE"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page19;

