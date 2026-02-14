import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormEDMTableStraightness from "@/components/FormComponents/FormEDMTableStraightness";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

function Page9() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={9}>
            <div className="relative">
                <p className="text-sm font-bold">15. STRAIGHTNESS  ( SIDE )</p>
                <div className="flex items-start gap-5 ml-15 mt-2">
                    <FormEDMTableStraightness
                        name="page9.straightnessDataLeft"
                        title="Straight of X Axis"
                        rowCount={61}
                        strokeStep={20}
                        standard={3}
                        fontSize="text-[10px]"
                        width="300px"
                        colWidths={['w-6', 'w-8', 'w-6']}
                        rowHeight={12}
                        defaultValue={{}}
                    />
                    <FormEDMTableStraightness
                        name="page9.straightnessDataRight"
                        title="Straight of Y Axis"
                        rowCount={61}
                        strokeStep={20}
                        standard={3}
                        fontSize="text-[10px]"
                        width="300px"
                        colWidths={['w-6', 'w-8', 'w-6']}
                        rowHeight={12}
                        defaultValue={{}}
                    />
                </div>
                <div className="flex justify-between mt-5 ml-50 mr-30 absolute bottom-[-90px] right-[-100px]">
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
                    <FormCheckedBox name="page9.checkedInfo19"  className="w-50 h-23 ml-2"/>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page9;

