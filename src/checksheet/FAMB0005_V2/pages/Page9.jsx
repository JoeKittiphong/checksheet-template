import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormEDMTableStraightness from "@/components/FormComponents/FormEDMTableStraightness";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

function Page9() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={9}>
            <div>
                <p className="text-sm font-bold">20. STRAIGHTNESS  ( TOP )</p>
                <div className="flex gap-5 ml-15 mt-2">
                    <FormEDMTableStraightness
                        name="page9.straightnessDataLeft"
                        title="Straight of X Axis"
                        rowCount={31}
                        strokeStep={20}
                        standard={3}
                        defaultValue={{}}
                    />
                    <FormEDMTableStraightness
                        name="page9.straightnessDataRight"
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
                            name="page9.dialGaugeNo"
                            label="Dial gauge No."
                        />
                        <FormChecknumber
                            name="page9.parallelBarNo"
                            label="Parallel bar No."
                        />
                    </div>
                    <FormCheckedBox name="page9.checkedInfo20" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page9;