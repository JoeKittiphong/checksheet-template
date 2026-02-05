import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page73() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();

    // Watch inputs
    const p73_val_11 = watch("p73_val_11");
    const p73_val_12 = watch("p73_val_12");
    const p73_val_multip = watch("p73_val_multip"); // Watch the multiplier

    // Calculation Logic
    useEffect(() => {
        const val11 = parseFloat(p73_val_11);
        const val12 = parseFloat(p73_val_12);

        // Calculate (12) / (11)
        if (!isNaN(val11) && !isNaN(val12) && val11 !== 0) {
            const result = val12 / val11;
            setValue("p73_val_multip", result.toFixed(2));
        } else {
            setValue("p73_val_multip", "");
        }

    }, [p73_val_11, p73_val_12, setValue]);

    return (
        <A4Paper content={content} currentPage={73}>
            <SectionTitle>19.5 Recheck GALPM power voltage setting. (GALPM machining) (V5~V9) (For IG-S4-80mm-3rd 0.20mm Wire)</SectionTitle>

            <div className="p-4 space-y-8">
                {/* 19.5.1 */}
                <div>
                    <div className="mb-2">
                        19.5.1 Write the value of the setting value before machining adjustment [GALPM machining V6] "No.12 Page" (8.3) in (11).
                    </div>
                    <div className="flex items-center gap-2 ml-4 font-mono">
                        <span>[NGAL machining V6] &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p73_val_11", { required: true })}
                            className={`border border-black text-center w-20 px-1 ${errors.p73_val_11 ? 'bg-red-200' : ''}`}
                        />
                        <span>] --&gt; (11)</span>
                    </div>
                </div>

                {/* 19.5.2 */}
                <div>
                    <div className="mb-2">
                        19.5.2 Set value determined after machining adjustment<br />
                        <span className="ml-8">Fill in the "Disch-Page11-[GALPM machining V6]" &gt;&gt; [ ... ] --&gt; (12)</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4 font-mono">
                        <span>"Disch-Page11-[GALPM machining V6]" &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p73_val_12", { required: true })}
                            className={`border border-black text-center w-20 px-1 ${errors.p73_val_12 ? 'bg-red-200' : ''}`}
                        />
                        <span>] --&gt; (12)</span>
                    </div>
                </div>

                {/* 19.5.3 */}
                <div>
                    <div className="mb-2">
                        19.5.3 Complete the calculation as (11) below.
                    </div>
                    <div className="flex items-center gap-4 ml-8">
                        <div className="flex items-center gap-2 font-mono">
                            <span>(12) ÷ (11) =</span>
                            <input
                                type="text"
                                readOnly
                                {...register("p73_val_multip")}
                                className="border border-black text-center w-24 px-1 bg-gray-100 font-bold"
                            />
                            <span>(V6)</span>
                        </div>
                    </div>
                </div>

                {/* 19.5.4 Table */}
                <div>
                    <div className="mb-2">
                        19.5.4 Recalculate "Disch-Page4-[[151~160] DPW PC03-23 V0~V9]" using the magnification calculated in [19.5.3].
                    </div>

                    <TableCalculateSetting
                        multiplier={p73_val_multip}
                        registerPrefix="p73"
                        title={`"Disch-Page11-<br/>[406~410]GALPM<br/>machining V5~V9"`}
                        enableScroll={false}
                        rowConfig={[
                            { index: 5, label: "V5", isCalculated: true },
                            { index: 6, label: "V6", isCalculated: false }, // Do not calculate
                            { index: 7, label: "V7", isCalculated: true },
                            { index: 8, label: "V8", isCalculated: true },
                            { index: 9, label: "V9", isCalculated: false }, // Do not calculate
                        ]}
                    />
                </div>

                <div className="text-xs">
                    <p>Example: Calculating the new setting value: = 95. * 1234 [* = 0 to 4--&gt; 95 inputs] [* = 5 to 9--&gt; Input input]</p>
                </div>

                <div className="flex justify-end mt-8 gap-4 text-sm px-4">
                    <div className="w-64">
                        <FormCheckedBox
                            name="p73_signature"
                            label="Input By / Date"
                        />
                    </div>
                </div>
            </div>

        </A4Paper>
    );
}

export default Page73;