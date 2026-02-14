import A4Paper from "@/components/UIcomponent/A4Paper";
import { content, checkpoint } from "../FAMB0005_V2-setting";
import ImagePointCheck from "@/components/PageComponent/ImagePointCheck";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image28 from "@/assets/FAMB0005_V2/image-24.PNG";

const defaultCheckPoints = [
    { id: 1, x: 3, y: 13, label: checkpoint.c1, checked: false, textPosition: "bottom" },
    { id: 2, x: 55, y: 6, label: checkpoint.c2, checked: false, textPosition: "right" },
    { id: 3, x: 12, y: 30, label: checkpoint.c3, checked: false, textPosition: "bottom" },
    { id: 4, x: 5, y: 40, label: checkpoint.c4, checked: false, textPosition: "bottom" },
    { id: 5, x: 2, y: 75, label: checkpoint.c5, checked: false, textPosition: "right" },
    // { id: 6, x: 74, y: 90, label: checkpoint.c6, checked: false, textPosition: "bottom" },
    { id: 7, x: 18, y: 88, label: checkpoint.c7, checked: false, textPosition: "bottom" },
    { id: 8, x: 80, y: 80, label: checkpoint.c8, checked: false, textPosition: "bottom" },
    { id: 9, x: 46, y: 90, label: checkpoint.c9, checked: false, textPosition: "bottom" },
    { id: 10, x: 82, y: 58, label: checkpoint.c10, checked: false, textPosition: "bottom" },
    { id: 11, x: 82, y: 38, label: checkpoint.c11, checked: false, textPosition: "right" },
    { id: 12, x: 78, y: 17, label: checkpoint.c12, checked: false, textPosition: "right" },
    { id: 13, x: 23, y: 6, label: checkpoint.c13, checked: false, textPosition: "right" },
];

function Page19() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={19}>
            <div className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase">29.  Double check body</p>

                <div className="flex items-center">
                    <ImagePointCheck
                        name="page19.checkPoints"
                        defaultValue={defaultCheckPoints}
                        backgroundImage={image28}
                        width="180mm"
                        height="180mm"
                    />
                </div>
                <div className="flex items-start gap-2 justify-end">
                    <FormInputCheckSTD
                        name="page19.totalPoint"
                        label="- ตรวจสอบ Table down"
                        unit="mm."
                        validateStd={false}
                    />
                    <FormCheckedBox
                        name="page19.checkedInfo29"
                        label="CHECKED BY / DATE"
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page19;