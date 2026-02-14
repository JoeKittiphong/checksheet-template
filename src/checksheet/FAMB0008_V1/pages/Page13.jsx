import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormTablePitchXYZUVBigmodel from "@/components/FormComponents/FormTablePitchXYZUVBigmodel";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page13() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={13}>
            <div className="flex flex-col">
                <p className="text-sm font-bold">24. PITCH CHECK (X - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUVBigmodel
                        name="Page13.pitchXData"
                        rowCount={31}
                        stepSize={20}
                        showCalcCol={false}
                        tableLabels={['X1', 'X1', 'X2', 'X2']}
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

                <div className="flex justify-center items-end gap-1 mt-2">
                    <FormChecknumber
                        name="Page13.pitchMasterNo"
                        label="PITCH MASTER NO."
                    />
                    <FormChecknumber
                        name="Page13.dialGaugeNo"
                        label="DIAL GAUGE NO."
                    />
                    <div className="space-y-4">
                    </div>
                    <FormCheckedBox name="Page13.checkedInfo24" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page13;

