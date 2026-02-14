import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormEDMTableStraightness from "@/components/FormComponents/FormEDMTableStraightness";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

function Page12() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={12}>
            <div className="relative">
                <p className="text-sm font-bold">19. STRAIGHTNESS  ( SIDE )</p>
                <div className="flex items-start gap-5 ml-15 mt-2">
                    <FormEDMTableStraightness
                        name="page12.straightnessDataLeft"
                        title="Straight of X Axis"
                        rowCount={44}
                        strokeStep={20}
                        standard={3}
                        defaultValue={{}}
                    />
                    <FormEDMTableStraightness
                        name="page12.straightnessDataRight"
                        title="Straight of Y Axis"
                        rowCount={34}
                        strokeStep={20}
                        standard={3}
                        defaultValue={{}}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30 absolute bottom-0 right-[-100px]">
                    <div className="space-y-2">
                        <FormChecknumber
                            name="page12.dialGaugeNo"
                            label="Dial gauge No."
                        />
                        <FormChecknumber
                            name="page12.parallelBarNo"
                            label="Parallel bar No."
                        />
                    </div>
                    <FormCheckedBox name="page12.checkedInfo19" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page12;
