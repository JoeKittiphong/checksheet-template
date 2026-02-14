import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormTablePitchXYZUV from "@/components/FormComponents/FormTablePitchXYZUV";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page15() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={15}>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">26. PITCH CHECK (Z - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUV
                        name="page15.pitchZData"
                        rowCount={27}
                        stepSize={20}
                        showCalcCol={false}
                        tableLabels={['Z1', 'Z2', 'Z3', 'Z4']}
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
                            name="page15.pitchMasterNo"
                            label="PITCH MASTER NO."
                        />
                        <FormChecknumber
                            name="page15.dialGaugeNo"
                            label="DIAL GAUGE NO."
                        />
                    </div>
                    <FormCheckedBox name="page15.checkedInfo26" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page15;