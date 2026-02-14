import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormEDMTableStraightness from "@/components/FormComponents/FormEDMTableStraightness";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

function Page8() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={8}>
            <div>
                <p className="text-sm font-bold">19. STRAIGHTNESS  ( SIDE )</p>
                <div className="flex gap-5 ml-15 mt-2">
                    <FormEDMTableStraightness
                        name="page8.straightnessDataLeft"
                        title="Straight of X Axis"
                        rowCount={31}
                        strokeStep={20}
                        standard={3}
                        defaultValue={{}}
                    />
                    <FormEDMTableStraightness
                        name="page8.straightnessDataRight"
                        title="Straight of Y Axis"
                        rowCount={31}
                        strokeStep={20}
                        standard={3}
                        defaultValue={{}}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30">
                    <div className="space-y-2">
                        <FormChecknumber
                            name="page8.dialGaugeNo"
                            label="Dial gauge No."
                        />
                        <FormChecknumber
                            name="page8.parallelBarNo"
                            label="Parallel bar No."
                        />
                    </div>
                    <FormCheckedBox name="page8.checkedInfo19" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;