
import React from 'react';
import { useFormContext } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page59() {
    const { watch } = useFormContext();
    const p58_val_3 = watch("p58_val_3"); // Value from Page 58 (18.5.3)

    return (
        <A4Paper content={content} currentPage={59}>
            <SectionTitle>18.6 Re-Check setting data for D-PIKA-W Voltage. (PC12) (V10~V19) (For STD 80mm 4th 0.20mm Wire)</SectionTitle>

            <div className="p-4 space-y-4">
                <div>
                    <div className="mb-2">
                        18.6.1 Using data at [18.5.3]. Check and calculate for "Disch-Page10-[[361~370] DPW PC12 V10~V19]"<br />
                    </div>
                </div>

                {/* Table */}
                <div>
                    <TableCalculateSetting
                        multiplier={p58_val_3}
                        registerPrefix="p59"
                        title={`"Disch-Page10-[[361~370]<br/>DPW PC12 V10~V19]"`}
                        rowConfig={[
                            { index: 10, label: "V10", presentSuffix: "(#120)", inputSuffix: "(#1120)", isCalculated: true },
                            { index: 11, label: "V11", presentSuffix: "(#121)", inputSuffix: "(#1121)", isCalculated: true },
                            { index: 12, label: "V12", presentSuffix: "(#122)", inputSuffix: "(#1122)", isCalculated: true },
                            { index: 13, label: "V13", presentSuffix: "(#123)", inputSuffix: "(#1123)", isCalculated: true },
                            { index: 14, label: "V14", presentSuffix: "(#124)", inputSuffix: "(#1124)", isCalculated: true },
                            { index: 15, label: "V15", presentSuffix: "(#125)", inputSuffix: "(#1125)", isCalculated: true },
                            { index: 16, label: "V16", presentSuffix: "(#126)", inputSuffix: "(#126)", isCalculated: false },
                            { index: 17, label: "V17", presentSuffix: "(#126)", inputSuffix: "(#126)", isCalculated: false },
                            { index: 18, label: "V18", presentSuffix: "(#126)", inputSuffix: "(#126)", isCalculated: false },
                            { index: 19, label: "V19", presentSuffix: "(#126)", inputSuffix: "(#126)", isCalculated: false },
                        ]}
                    />
                </div>

                <div className="text-xs font-bold mt-2">
                    <p>Caution : New Setting Value (#1120~#1125) is over than (#126) value --&gt; Input (#126) Value</p>
                </div>
                <div className="text-xs mt-1">
                    <p>V16~V19 --&gt; Do not change Setting Value because of being maximum setting value.</p>
                    <p>Example  :  Culculate New Setting Value = 95. * 1234    [ * = 0~4--&gt; Input 95]   [ * = 5~9--&gt; Input 96]</p>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page59;