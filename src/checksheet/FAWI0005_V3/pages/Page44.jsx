import React from 'react';
import { useFormContext } from "react-hook-form";
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import TableCalculateSetting from '@/components/FormComponents/TableCalculateSetting';

function Page44() {
    const { watch } = useFormContext();
    const p43_val_3 = watch("p43_val_3");

    return (
        <A4Paper content={content} currentPage={44}>
            <SectionTitle>17.11 Re-Check setting data for D-PIKA-W Voltage. (PC32) (V10~V19) (For STD 80mm 3rd 0.20mm Wire)</SectionTitle>

            <div className="p-4 space-y-4">
                <div>
                    <div className="mb-2">
                        17.11.1 Using data at [17.10.3]. Check and calculate for "Disch-Page8-[[301~310] DPW PC32 V10~V19]"
                    </div>
                </div>

                {/* Table */}
                <div>
                    <TableCalculateSetting
                        multiplier={p43_val_3}
                        registerPrefix="p44"
                        title={`"Disch-Page8-[[301~310]<br/>DPW PC32 V10~V19]"`}
                        rowConfig={[
                            { index: 10, label: "V10", presentSuffix: "(#320)", inputSuffix: "(#1320)", isCalculated: true },
                            { index: 11, label: "V11", presentSuffix: "(#321)", inputSuffix: "(#1321)", isCalculated: true },
                            { index: 12, label: "V12", presentSuffix: "(#322)", inputSuffix: "(#1322)", isCalculated: true },
                            { index: 13, label: "V13", presentSuffix: "(#323)", inputSuffix: "(#1323)", isCalculated: true },
                            { index: 14, label: "V14", presentSuffix: "(#324)", inputSuffix: "(#1324)", isCalculated: true },
                            { index: 15, label: "V15", presentSuffix: "(#325)", inputSuffix: "(#1325)", isCalculated: true },
                            { index: 16, label: "V16", presentSuffix: "(#326)", inputSuffix: "(#326)", isCalculated: false },
                            { index: 17, label: "V17", presentSuffix: "(#326)", inputSuffix: "(#326)", isCalculated: false },
                            { index: 18, label: "V18", presentSuffix: "(#326)", inputSuffix: "(#326)", isCalculated: false },
                            { index: 19, label: "V19", presentSuffix: "(#326)", inputSuffix: "(#326)", isCalculated: false },
                        ]}
                    />
                </div>

                <div className="text-xs font-bold mt-2">
                    <p>Caution : New Setting Value (#1320~#1325) is over than (#326) value --&gt; Input (#326) Value</p>
                </div>
                <div className="text-xs mt-1">
                    <p>V16~V19 --&gt; Do not change Setting Value because of being maximum setting value.</p>
                    <p>Example  :  Culculate New Setting Value = 95. * 1234    [ * = 0~4--&gt; Input 95]   [ * = 5~9--&gt; Input 96]</p>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page44;