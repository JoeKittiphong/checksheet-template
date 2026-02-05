import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page43() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();

    // Watch inputs
    const p43_v8_before = watch("p43_v8_before");
    const p43_v8_after = watch("p43_v8_after");
    const p43_val_3 = watch("p43_val_3"); // Watch the multiplier

    // Calculation Logic
    useEffect(() => {
        // Calculate (5)
        const valBefore = parseFloat(p43_v8_before);
        let val5 = 0;
        if (!isNaN(valBefore)) {
            val5 = valBefore + 4;
            setValue("p43_val_5", val5);
        } else {
            setValue("p43_val_5", "");
        }

        // Calculate (6)
        const valAfter = parseFloat(p43_v8_after);
        let val6 = 0;
        if (!isNaN(valAfter)) {
            val6 = valAfter + 4;
            setValue("p43_val_6", val6);
        } else {
            setValue("p43_val_6", "");
        }

        // Calculate (3) = (6) / (5)
        if (!isNaN(valBefore) && !isNaN(valAfter) && val5 !== 0) {
            const val3 = val6 / val5;
            setValue("p43_val_3", val3.toFixed(2));
        } else {
            setValue("p43_val_3", "");
        }

    }, [p43_v8_before, p43_v8_after, setValue]);

    return (
        <A4Paper content={content} currentPage={43}>
            <SectionTitle>17.10 Re-Check setting data for D-PIKA-W Voltage. (PC32) (V0~V9) (For STD 80mm 3rd 0.20mm Wire)</SectionTitle>

            <div className="p-4 space-y-8">
                {/* 17.10.1 */}
                <div>
                    <div className="mb-2">
                        17.10.1 Check setting data for [DPW PC32 V8] before Test cut data on "No.15 Page" (9.3).<br />
                        <span className="ml-8">Then culculate [DPW PC32 V8] + [ 4 ] Value.</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4 font-mono">
                        <span>[DPW PC32 V8] &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p43_v8_before", { required: true })}
                            className={`border border-black text-center w-20 px-1 ${errors.p43_v8_before ? 'bg-red-200' : ''}`}
                        />
                        <span>] + [ 4 ] = [</span>
                        <input
                            type="text"
                            readOnly
                            {...register("p43_val_5")}
                            className="border border-black text-center w-20 px-1 bg-gray-100"
                        />
                        <span>] --&gt; (5)</span>
                    </div>
                </div>

                {/* 17.10.2 */}
                <div>
                    <div className="mb-2">
                        17.10.2 Check present setting data "Disch-Page9-[[339] DPW PC32 V8]" after test data.<br />
                        <span className="ml-8">Then culculate "Disch-Page9-[[339] DPW PC32 V8]" + [ 4 ] Value.</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4 font-mono">
                        <span>"Disch-Page9-[[339] DPW PC32 V8]" &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p43_v8_after", { required: true })}
                            className={`border border-black text-center w-20 px-1 ${errors.p43_v8_after ? 'bg-red-200' : ''}`}
                        />
                        <span>] + [ 4 ] = [</span>
                        <input
                            type="text"
                            readOnly
                            {...register("p43_val_6")}
                            className="border border-black text-center w-20 px-1 bg-gray-100"
                        />
                        <span>] --&gt; --&gt; (6)</span>
                    </div>
                </div>

                {/* 17.10.3 */}
                <div>
                    <div className="mb-2">
                        17.10.3 Culculate of above (5)(6) data.
                    </div>
                    <div className="flex items-center gap-4 ml-8">
                        <div className="flex items-center gap-2 font-mono">
                            <div className="border border-black rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                            <span>(6) ÷ (5) =</span>
                            <input
                                type="text"
                                readOnly
                                {...register("p43_val_3")}
                                className="border border-black text-center w-24 px-1 bg-gray-100 font-bold"
                            />
                        </div>
                    </div>
                    <div className="ml-8 mt-2 text-sm text-gray-700">
                        Example : Culculate <span className="inline-block border border-gray-600 rounded-full w-5 h-5 text-center text-xs leading-4">3</span> Value = 1.07 * 23
                        <span className="ml-4">[ * = 0~4--&gt; <span className="inline-block border border-gray-600 rounded-full w-5 h-5 text-center text-xs leading-4">3</span> = 1.07]</span>
                        <span className="ml-4">[ * = 5~9--&gt; <span className="inline-block border border-gray-600 rounded-full w-5 h-5 text-center text-xs leading-4">3</span> = 1.08]</span>
                    </div>
                </div>

                {/* 17.10.4 Table */}
                <div>
                    <div className="mb-2">
                        17.10.4 Using data at [17.10.3]. Check and calculate for "Disch-Page9-[[331~340] DPW PC32 V0~V9]"<br />
                        <span className="text-xs">"Manage-Parameter-Disch-Page9-[[331~340] DPW PC32 V0~V9]"</span>
                    </div>

                    <TableCalculateSetting
                        multiplier={p43_val_3}
                        registerPrefix="p43"
                        title={`"Disch-Page9-[[331~340]<br/>DPW PC32 V0~V9]"`}
                        rowConfig={[
                            { index: 0, label: "V0", isCalculated: true },
                            { index: 1, label: "V1", isCalculated: true },
                            { index: 2, label: "V2", isCalculated: true },
                            { index: 3, label: "V3", isCalculated: true },
                            { index: 4, label: "V4", isCalculated: true },
                            { index: 5, label: "V5", isCalculated: true },
                            { index: 6, label: "V6", isCalculated: true },
                            { index: 7, label: "V7", isCalculated: true },
                            { index: 8, label: "V8", isCalculated: false },
                            { index: 9, label: "V9", isCalculated: false },
                        ]}
                    />
                </div>
                <div className="text-xs">
                    <p>V8,V9 --&gt; Do not change Setting Value because of having been adjusted.</p>
                    <p>Example  :  Culculate New Setting Value = 95. * 1234    [ * = 0~4&gt; Input 95]   [ * = 5~9&gt; Input 96]</p>
                </div>
            </div>

        </A4Paper>
    );
}

export default Page43;