import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page103() {
    const { control } = useFormContext();

    // Watch calculated values from Page 102 (p102_calc_v*)
    // These values become the "Magnification" (rowMultipliers) for Page 103 tables
    const v0 = useWatch({ control, name: 'p102_calc_v0' });
    const v1 = useWatch({ control, name: 'p102_calc_v1' });
    const v2 = useWatch({ control, name: 'p102_calc_v2' });
    const v3 = useWatch({ control, name: 'p102_calc_v3' });
    const v4 = useWatch({ control, name: 'p102_calc_v4' });
    const v5 = useWatch({ control, name: 'p102_calc_v5' });
    const v6 = useWatch({ control, name: 'p102_calc_v6' });
    const v7 = useWatch({ control, name: 'p102_calc_v7' });
    // V8 is skipped in Table 1
    const v9 = useWatch({ control, name: 'p102_calc_v9' });

    const v10 = useWatch({ control, name: 'p102_calc_v10' });
    const v11 = useWatch({ control, name: 'p102_calc_v11' });
    const v12 = useWatch({ control, name: 'p102_calc_v12' });
    // V13 is skipped in Table 2
    const v14 = useWatch({ control, name: 'p102_calc_v14' });
    const v15 = useWatch({ control, name: 'p102_calc_v15' });
    // V16-V19 are fixed/skipped

    // Create multipliers map: { rowIndex: value }
    // Note: Table 1 indices are 0-9. Table 2 indices are 10-19.
    const multipliers = {
        0: v0, 1: v1, 2: v2, 3: v3, 4: v4,
        5: v5, 6: v6, 7: v7, 9: v9,
        10: v10, 11: v11, 12: v12,
        14: v14, 15: v15
    };

    return (
        <A4Paper content={content} currentPage={103}>
            <SectionTitle>22.6 Recheck D-PIKA-W voltage setting. (PC02-22) (V0~V9) (For STD2-40mm-4th 0.20mm Wire)</SectionTitle>

            <div className="px-8 mt-4 font-sans text-xs space-y-8">

                {/* 22.6.1 Table (V0-V9) */}
                <div>
                    <div className="mb-2">
                        22.6.1 Recalculate "Disch-Page4-[[141~150] DPW PC02-22 V0~V9]" using the magnification calculated in [22.5.5].
                    </div>
                    <TableCalculateSetting
                        rowMultipliers={multipliers}
                        registerPrefix="p103_t1"
                        title={`"Disch-Page4-[[141~150]<br/>DPW PC02-22 V0~V9]"`}
                        headers={[
                            "V*",
                            "At present<br/>Set value",
                            "Magnification",
                            "Calculation result<br/>New setting value",
                            "Input<br/>Set value"
                        ]}
                        rowConfig={[
                            { index: 0, label: "V0", isCalculated: true },
                            { index: 1, label: "V1", isCalculated: true },
                            { index: 2, label: "V2", isCalculated: true },
                            { index: 3, label: "V3", isCalculated: true },
                            { index: 4, label: "V4", isCalculated: true },
                            { index: 5, label: "V5", isCalculated: true },
                            { index: 6, label: "V6", isCalculated: true },
                            { index: 7, label: "V7", isCalculated: true },
                            { index: 8, label: "V8", isCalculated: false }, // V8 Not Calculated
                            { index: 9, label: "V9", isCalculated: true },
                        ]}
                    />
                    <div className="mt-1 text-[10px]">
                        V8--&gt; Do not change the setpoint as it has been adjusted.
                        <br />
                        Example: Calculating the new setting value: = 95. * 1234 [* = 0 to 4--&gt; 95 inputs] [* = 5 to 9--&gt; Input input]
                    </div>
                </div>

                {/* 22.6.2 Table (V10-V19) */}
                <div>
                    <div className="mb-2">
                        22.6.2 Using data at [22.5.5]. Check and calculate for "Disch-Page7-[[271~280] DPW PC02-22 V10~V19]"
                    </div>
                    <TableCalculateSetting
                        rowMultipliers={multipliers}
                        registerPrefix="p103_t2"
                        title={`"Disch-Page7-[[271~280]<br/>DPW PC02-22 V10~V19]"`}
                        headers={[
                            "V*",
                            "At present<br/>Set value",
                            "Magnification",
                            "Calculation result<br/>New setting value",
                            "Input<br/>Set value"
                        ]}
                        rowConfig={[
                            { index: 10, label: "V10", presentSuffix: "(#020)", inputSuffix: "(#1020)", isCalculated: true },
                            { index: 11, label: "V11", presentSuffix: "(#021)", inputSuffix: "(#1021)", isCalculated: true },
                            { index: 12, label: "V12", presentSuffix: "(#022)", inputSuffix: "(#1022)", isCalculated: true },
                            { index: 13, label: "V13", presentSuffix: "(#023)", inputSuffix: "(#1023)", isCalculated: false }, // V13 Not Calculated
                            { index: 14, label: "V14", presentSuffix: "(#024)", inputSuffix: "(#1024)", isCalculated: true },
                            { index: 15, label: "V15", presentSuffix: "(#025)", inputSuffix: "(#1025)", isCalculated: true },
                            { index: 16, label: "V16", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false }, // V16-V19 Not Calculated
                            { index: 17, label: "V17", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 18, label: "V18", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 19, label: "V19", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                        ]}
                    />
                    <div className="mt-1 text-[10px]">
                        <p className="font-bold">NOTE : If the calculated set value (#1020 to #1025) exceeds the value of (#026), enter a value of-&gt; (#026).</p>
                        <p>V16~V19--&gt;Max. set value. Do not change the set value.</p>
                        <p>Example: Calculating the new setpoint = 95. * 1234 [* = 0 to 4--&gt; Input 95] [* = 5 to 9--&gt; Input 96]</p>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page103;