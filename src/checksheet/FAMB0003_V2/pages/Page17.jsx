import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import FormTablePitchXYZUV from "@/components/FormComponents/FormTablePitchXYZUV";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page17() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={17}>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">24. PITCH CHECK (X - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUV
                        name="page17.pitchXData"
                        rowCount={31}
                        stepSize={20}
                        showCalcCol={false}
                        tableLabels={['X1', 'X2', 'X3', 'X4']}
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
                            name="page17.pitchMasterNo"
                            label="PITCH MASTER NO."
                        />
                        <FormChecknumber
                            name="page17.dialGaugeNo"
                            label="DIAL GAUGE NO."
                        />
                    </div>
                    <FormCheckedBox name="page17.checkedInfo24" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page17;
