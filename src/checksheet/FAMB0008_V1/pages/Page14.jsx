import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormTablePitchXYZUVBigmodel from "@/components/FormComponents/FormTablePitchXYZUVBigmodel";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page14() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={14}>
            <div className="flex flex-col">
                <p className="text-sm font-bold">25. PITCH CHECK (Y - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUVBigmodel
                        name="Page14.pitchYData"
                        rowCount={31}
                        stepSize={20}
                        showCalcCol={false}
                        tableLabels={['Y1', 'Y1', 'Y2', 'Y2']}
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
                        name="Page14.pitchMasterNo"
                        label="PITCH MASTER NO."
                    />
                    <FormChecknumber
                        name="Page14.dialGaugeNo"
                        label="DIAL GAUGE NO."
                    />
                    <div className="space-y-4">
                    </div>
                    <FormCheckedBox name="Page14.checkedInfo25" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page14;

