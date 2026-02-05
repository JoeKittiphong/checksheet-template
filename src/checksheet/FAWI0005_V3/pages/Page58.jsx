
import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page58() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();

    // Watch inputs
    const p58_v6_before = watch("p58_v6_before");
    const p58_v6_after = watch("p58_v6_after");
    const p58_val_3 = watch("p58_val_3"); // Watch the multiplier

    // Calculation Logic
    useEffect(() => {
        // Calculate (5)
        const valBefore = parseFloat(p58_v6_before);
        let val5 = 0;
        if (!isNaN(valBefore)) {
            val5 = valBefore + 8;
            setValue("p58_val_5", val5);
        } else {
            setValue("p58_val_5", "");
        }

        // Calculate (6)
        const valAfter = parseFloat(p58_v6_after);
        let val6 = 0;
        if (!isNaN(valAfter)) {
            val6 = valAfter + 8;
            setValue("p58_val_6", val6);
        } else {
            setValue("p58_val_6", "");
        }

        // Calculate (3) = (6) / (5)
        if (!isNaN(valBefore) && !isNaN(valAfter) && val5 !== 0) {
            const val3 = val6 / val5;
            setValue("p58_val_3", val3.toFixed(2));
        } else {
            setValue("p58_val_3", "");
        }

    }, [p58_v6_before, p58_v6_after, setValue]);

    return (
        <A4Paper content={content} currentPage={58}>
            <SectionTitle>18.5 Re-Check setting data for D-PIKA-W Voltage. (PC12) (V0~V9) (For STD 80mm 4th 0.20mm Wire)</SectionTitle>

            <div className="p-4 space-y-8">
                {/* 18.5.1 */}
                <div>
                    <div className="mb-2">
                        18.5.1 Check setting data for [DPW PC12 V6] before Test cut data on "No.14 Page" (9.3).<br />
                        <div className="h-4"></div>
                        <span className="ml-8">[DPW PC12 V6] &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p58_v6_before", { required: true })}
                            className={`border-b border-black text-center w-20 px-1 mx-2 ${errors.p58_v6_before ? 'bg-red-200' : ''}`}
                        />
                        <span>]+[8]=[</span>
                        <input
                            type="text"
                            readOnly
                            {...register("p58_val_5")}
                            className="border-b border-black text-center w-20 px-1 mx-2 bg-gray-100"
                        />
                        <span>]--&gt;(5)</span>
                    </div>
                </div>

                {/* 18.5.2 */}
                <div>
                    <div className="mb-2">
                        18.5.2 Check present setting data "Disch-Page9-[[357] DPW PC12 V6]" after test data.<br />
                        <span className="ml-14">Then culculate "Disch-Page9-[[357] DPW PC12 V6]" + [ 8 ] Value.</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4 font-mono mt-4">
                        <span>"Disch-Page9-[[357] DPW PC12 V6]" &gt;&gt; [</span>
                        <input
                            type="number"
                            step="any"
                            {...register("p58_v6_after", { required: true })}
                            className={`border-b border-black text-center w-15 px-1 ${errors.p58_v6_after ? 'bg-red-200' : ''}`}
                        />
                        <span>]+[8]=[</span>
                        <input
                            type="text"
                            readOnly
                            {...register("p58_val_6")}
                            className="border-b border-black text-center w-15 px-1 bg-gray-100"
                        />
                        <span>]--&gt;(6)</span>
                    </div>
                </div>

                {/* 18.5.3 */}
                <div>
                    <div className="mb-2">
                        18.5.3 Culculate of above (5)(6) data.
                    </div>
                    <div className="flex items-center gap-4 ml-8">
                        <div className="flex items-center gap-2 font-mono">
                            <div className="border border-black rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                            <span>(6) ÷ (5) =</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Example : Culculate </span>
                            <div className="border border-black rounded-full w-6 h-6 flex items-center justify-center text-sm">3</div>
                            <span>Value = 1.07 * 23</span>
                            <span className="ml-2 mt-1 block text-sm">[ * = 0~4--&gt; <span className="inline-block border border-black rounded-full w-4 h-4 text-center text-[10px] leading-3">3</span> = 1.07]</span>
                            <span className="ml-2 mt-1 block text-sm">[ * = 5~9--&gt; <span className="inline-block border border-black rounded-full w-4 h-4 text-center text-[10px] leading-3">3</span> = 1.08]</span>
                        </div>
                    </div>
                    <div className="ml-32 -mt-6">
                        <input
                            type="text"
                            readOnly
                            {...register("p58_val_3")}
                            className="border border-black text-center w-24 px-1 bg-gray-100 font-bold"
                        />
                    </div>
                </div>

                {/* 18.5.4 Table */}
                <div>
                    <div className="mb-2">
                        18.5.4 Using data at [18.5.3]. Check and calculate for "Disch-Page9-[[351~360] DPW PC12 V0~V9]"<br />
                        <span className="text-xs">"Manage-Parameter-Disch-Page9-[[351~360] DPW PC12 V0~V9]"</span>
                    </div>

                    <TableCalculateSetting
                        multiplier={p58_val_3}
                        registerPrefix="p58"
                        title={`"Disch-Page9-[[351~360]<br/>DPW PC12 V0~V9]"`}
                        rowConfig={[
                            { index: 0, label: "V0", isCalculated: true },
                            { index: 1, label: "V1", isCalculated: true },
                            { index: 2, label: "V2", isCalculated: true },
                            { index: 3, label: "V3", isCalculated: true },
                            { index: 4, label: "V4", isCalculated: true },
                            { index: 5, label: "V5", isCalculated: true },
                            { index: 6, label: "V6", isCalculated: false },
                            { index: 7, label: "V7", isCalculated: false },
                            { index: 8, label: "V8", isCalculated: true },
                            { index: 9, label: "V9", isCalculated: true },
                        ]}
                    />
                </div>
                <div className="text-xs">
                    <p>V6,V7 --&gt; Do not change Setting Value because of having been adjusted.</p>
                    <p>Example  :  Culculate New Setting Value = 95. * 1234    [ * = 0~4--&gt; Input 95]   [ * = 5~9--&gt; Input 96]</p>
                </div>
            </div>

        </A4Paper>
    );
}

export default Page58;