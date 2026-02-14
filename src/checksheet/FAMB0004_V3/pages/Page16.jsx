import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTablePitchXYZUV from "@/components/FormComponents/FormTablePitchXYZUV";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page16() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={16}>
            <div className="flex flex-col">
                <p className="text-sm font-bold">24. PITCH CHECK (X - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUV
                        name="page16.pitchXData"
                        rowCount={44}
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

                <div className="flex justify-start items-end gap-10 mt-2 ml-20">
                        <FormChecknumber
                            name="page16.pitchMasterNo"
                            label="PITCH MASTER NO."
                        />
                        <FormChecknumber
                            name="page16.dialGaugeNo"
                            label="DIAL GAUGE NO."
                        />
                    <div className="space-y-4">
                    </div>
                    {/* <FormCheckedBox name="page16.checkedInfo24" /> */}
                </div>
            </div>
        </A4Paper>
    );
}

export default Page16;
