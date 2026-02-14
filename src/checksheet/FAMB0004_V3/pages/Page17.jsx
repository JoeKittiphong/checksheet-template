import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTablePitchXYZUV from "@/components/FormComponents/FormTablePitchXYZUV";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

function Page17() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={17}>
            <div className="flex flex-col">
                <p className="text-sm font-bold">25. PITCH CHECK (Y - AXIS)</p>
                <div className="flex justify-center">
                    <FormTablePitchXYZUV
                        name="page17.pitchYData"
                        rowCount={44}
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

                <div className="flex justify-start items-end gap-10 mt-2 ml-20">
                        <FormChecknumber
                            name="page17.pitchMasterNo"
                            label="PITCH MASTER NO."
                        />
                        <FormChecknumber
                            name="page17.dialGaugeNo"
                            label="DIAL GAUGE NO."
                        />
                    <div className="space-y-4">
                    </div>
                    {/* <FormCheckedBox name="page17.checkedInfo25" /> */}
                </div>
            </div>
        </A4Paper>
    );
}

export default Page17;
