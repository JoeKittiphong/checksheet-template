import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormTablePitchXYZUV from "@/components/FormComponents/FormTablePitchXYZUV";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page14() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={14}>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">25. PITCH CHECK (Y - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUV
                        name="page14.pitchYData"
                        rowCount={31}
                        stepSize={20}
                        showCalcCol={false}
                        tableLabels={['Y1', 'Y2', 'Y3', 'Y4']}
                        maxAB={15}
                        maxDiff={1}
                        defaultValue={[
                            { a: [], b: [] },
                            { a: [], b: [] },
                            { a: [], b: [] },
                            { a: [], b: [] }
                        ]}
                    />
                </div>

                <div className="flex justify-start items-end gap-10 mt-4 ml-20">
                    <div className="space-y-4">
                        <FormChecknumber
                            name="page14.pitchMasterNo"
                            label="PITCH MASTER NO."
                        />
                        <FormChecknumber
                            name="page14.dialGaugeNo"
                            label="DIAL GAUGE NO."
                        />
                    </div>
                    <FormCheckedBox name="page14.checkedInfo25" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page14;