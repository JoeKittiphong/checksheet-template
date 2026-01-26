import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckSTD";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image22 from "@/assets/FAMB0004_V3/image-22.png";

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
                            <FormInputCheckSTD
                                name="page15.parallelHead1"
                                label="X = "
                                unit="μm"
                                maxStd={parallelHeadSTD}
                                minStd={0}
                            />
                            <FormInputCheckSTD
                                name="page15.parallelHead2"
                                label="Y = "
                                unit="μm"
                                maxStd={parallelHeadSTD}
                                minStd={0}
                            />
                        </div>
                        <FormCheckedBox name="page15.checkedInfo22" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page15;
