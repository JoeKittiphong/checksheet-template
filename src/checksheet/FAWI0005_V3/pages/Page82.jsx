
import React, { useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page82() {
    const { register, control, setValue, formState: { errors } } = useFormContext();

    // Watch inputs for calculation
    const p82_val_13 = useWatch({ control, name: "p82_val_13" });
    const p82_val_14 = useWatch({ control, name: "p82_val_14" });
    const p82_multiplier = useWatch({ control, name: "p82_multiplier" });

    // Calculation Logic: (14) / (13)
    useEffect(() => {
        const val13 = parseFloat(p82_val_13);
        const val14 = parseFloat(p82_val_14);

        if (!isNaN(val13) && !isNaN(val14) && val13 !== 0) {
            const result = val14 / val13;
            setValue("p82_multiplier", result.toFixed(4)); // Using 4 decimals for precision as it's a multiplier
        } else {
            setValue("p82_multiplier", "");
        }
    }, [p82_val_13, p82_val_14, setValue]);

    return (
        <A4Paper content={content} currentPage={82}>
            <SectionTitle>20.5 Re-Check setting data for D-PIKA-W Voltage. (PC03-23) (V0~V9) (For IG-S4-40 mm. 0.20mm Wire)</SectionTitle>

            <div className="p-4 text-[10px] font-sans">
                {/* 20.5.1 */}
                <div>
                    <div className="text-[10px] font-bold">
                        20.5.1 Check setting data for [DPW PC03-23 V11] before Test cut data on "No.14 Page" (9.3).
                    </div>
                    <div className="text-[10px] flex items-center gap-2 ml-4">
                        <span>[DPW PC03-23 V11] &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p82_val_13", { required: true })}
                            className={`border-b border-black text-center w-24 px-1 ${errors.p82_val_13 ? 'bg-red-200' : ''}`}
                        />
                        <span>] --&gt; (13)</span>
                    </div>
                </div>

                {/* 20.5.2 */}
                <div>
                    <div className="text-[10px] font-bold">
                        20.5.2 Check setting data for [DPW PC03-23 V11]
                    </div>
                    <div className="text-[10px] flex items-center gap-2 ml-4">
                        <span>Disch-Page4 [DPW PC03-23 V11] &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p82_val_14", { required: true })}
                            className={`border-b border-black text-center w-24 px-1 ${errors.p82_val_14 ? 'bg-red-200' : ''}`}
                        />
                        <span>] --&gt; (14)</span>
                    </div>
                </div>

                {/* 20.5.3 Calculation */}
                <div>
                    <div className="font-bold">
                        20.5.3 Complete the calculation as (13) below. (14)
                    </div>
                    <div className="flex items-center gap-2 ml-8 text-sm font-bold">
                        <span>(14) &#247; (13) =</span>
                        <input
                            type="text"
                            readOnly
                            {...register("p82_multiplier")}
                            className="border-b border-black text-center w-32 px-1 bg-gray-100"
                        />
                        <span>(V11)</span>
                    </div>
                </div>

                {/* 20.5.4 Table 1 */}
                <div>
                    <div className="font-bold mt-2">
                        20.5.4 Recalculate "Disch-Page4-[[151~160] DPW PC03-23 V0~V9]" using the magnification calculated in [20.6.3]
                    </div>
                    <TableCalculateSetting
                        multiplier={p82_multiplier}
                        registerPrefix="p82"
                        startIndex={0}
                        title={`"Disch-Page4-[[141~150]<br/>DPW PC03-23 V0~V9]"`}
                        rowConfig={[
                            { index: 0, label: "V0", isCalculated: true },
                            { index: 1, label: "V1", isCalculated: true },
                            { index: 2, label: "V2", isCalculated: true },
                            { index: 3, label: "V3", isCalculated: true },
                            { index: 4, label: "V4", isCalculated: true },
                            { index: 5, label: "V5", isCalculated: true },
                            { index: 6, label: "V6", isCalculated: true },
                            { index: 7, label: "V7", isCalculated: true },
                            { index: 8, label: "V8", isCalculated: true },
                            { index: 9, label: "V9", isCalculated: true },
                        ]}
                    />
                    <div className="text-xs mt-1 ml-4 italic">
                        Example: Calculating the new setting value: = 95. * 1234 [* = 0 to 4--&gt; 95 inputs] [* = 5 to 9--&gt; Input input]
                    </div>
                </div>

                {/* 20.5.3 (Table 2 - Section title repeats logic from image but likely typod in image as 20.5.3 again) */}
                <div>
                    <div className="font-bold">
                        20.5.3 Using data at [20.5.3]. Check and calculate for "Disch-Page8-[[281~290] DPW PC03-23 V10~V19]"
                    </div>
                    <TableCalculateSetting
                        multiplier={p82_multiplier}
                        registerPrefix="p82"
                        title={`"Disch-Page8-[[271~280]<br/>DPW PC03-23 V10~V19]"`}
                        rowConfig={[
                            { index: 10, label: "V10", presentSuffix: "(#020)", inputSuffix: "(#1020)", isCalculated: true },
                            { index: 11, label: "V11", presentSuffix: "(#021)", inputSuffix: "(#1021)", isCalculated: false },
                            { index: 12, label: "V12", presentSuffix: "(#022)", inputSuffix: "(#1022)", isCalculated: true },
                            { index: 13, label: "V13", presentSuffix: "(#023)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 14, label: "V14", presentSuffix: "(#024)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 15, label: "V15", presentSuffix: "(#025)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 16, label: "V16", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 17, label: "V17", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 18, label: "V18", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                            { index: 19, label: "V19", presentSuffix: "(#026)", inputSuffix: "(#026)", isCalculated: false },
                        ]}
                    />
                    <div className="font-bold text-xs">
                        NOTE : If the calculated set value (#1020 to #1022) exceeds the value of (#026), enter a value of-&gt; (#026).
                    </div>
                    <div className="text-xs ml-4">
                        V13~V19--&gt;Max. set value. Do not change the set value.
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page82;