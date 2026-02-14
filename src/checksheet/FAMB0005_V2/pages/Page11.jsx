import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image22 from "@/assets/FAMB0005_V2/image-17.PNG";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";

function Page11() {
    const { control } = useFormContext();

    const parallelHeadSTD = 3

    return (
        <A4Paper content={content} currentPage={11}>
            <div className="flex flex-col gap-5">
                <p className="text-sm font-bold">22. PARALLEL OF HEAD CHECK</p>
                <div className="flex ml-20">
                    <img src={image22} alt="page11" className="w-40" />

                    <div className="flex gap-10 items-center">
                        <div className="space-y-4">
                            <FormInputCheckSTD
                                name="page11.parallelHead1"
                                label="X = "
                                unit="μm"
                                maxStd={parallelHeadSTD}
                                minStd={0}
                            />
                            <FormInputCheckSTD
                                name="page11.parallelHead2"
                                label="Y = "
                                unit="μm"
                                maxStd={parallelHeadSTD}
                                minStd={0}
                            />
                            <FormChecknumber
                                name="page11.dialgauge"
                                label="Dial gauge No. = "
                            />
                        </div>
                        <FormCheckedBox name="page11.checkedInfo22" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page11;