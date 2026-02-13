import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page22() {
    const data = [
        { label: "PULSE CONVERTED ON00 :", formula: "=  6  -", name: "p22_on00" },
        { label: "PULSE CONVERTED ON01 :", formula: "= 12  -", name: "p22_on01" },
        { label: "PULSE CONVERTED ON02 :", formula: "= 14  -", name: "p22_on02" },
        { label: "PULSE CONVERTED ON03 :", formula: "= 25  -", name: "p22_on03" },
        { label: "PULSE CONVERTED ON04 :", formula: "= 29  -", name: "p22_on04" },
        { label: "PULSE CONVERTED ON05 :", formula: "= 34  -", name: "p22_on05" },
    ];

    const columns = [
        { header: "", key: "label", width: "45%", className: "text-left pl-4 font-bold border-black h-12 text-sm", isLabel: true },
        { header: "", key: "formula", width: "15%", className: "text-center font-bold border-black h-12 text-sm", isLabel: true },
        { header: "", key: "name", width: "40%", type: "input", className: "border-black h-12 text-center", required: true },
    ];

    const headerRows = [
        [
            {
                header: "New Input value\nManage-Parameter-Disch-Page5",
                colSpan: 2,
                width: "60%",
                className: "text-center leading-tight py-2 italic text-[11px]"
            },
            {
                header: "Manage-Parameter-Disch-Page5-(193)\n[MODIFY P.C. TM (W) PC0_8]",
                width: "40%",
                className: "text-center leading-tight py-2 font-bold text-[11px]"
            }
        ]
    ];

    return (
        <A4Paper content={content} currentPage={22}>
            <div className="flex flex-col text-[12px] h-full relative">

                <div className="font-bold text-[14px] mb-2 text-black">13. 2nd Cut Speed adjust (Same 0.20mm/0.25mm)</div>
                <div className="font-bold text-[13px] ml-4 mb-2 text-black">13.1 Change ON Pulse Setting (for 2nd Cutting) (Same 0.20mm/0.25mm)</div>

                <div className="ml-4 font-bold space-y-2 mt-4 text-black">
                    <div>Manage-Parameter-Disch-Page5-"PULSE CONVERT ON00 ~ PULSE CONVERSION ON05"</div>
                    <div className="pt-4 px-2">Calculate and input to</div>
                    <div className="px-2">Manage-Parameter-Disch-Page5-"PULSE CONVERT ON00 ~ PULSE CONVERSION ON05" following formula.</div>
                </div>

                <div className="mt-6 ml-8 space-y-1 font-bold italic text-[11px] text-black">
                    <div>[PULSE CONVERSION ON00] = <span className="underline ml-2"> 6 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                    <div>[PULSE CONVERSION ON01] = <span className="underline ml-1"> 12 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                    <div>[PULSE CONVERSION ON02] = <span className="underline ml-1"> 14 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                    <div>[PULSE CONVERSION ON03] = <span className="underline ml-1"> 25 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                    <div>[PULSE CONVERSION ON04] = <span className="underline ml-1"> 29 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                    <div>[PULSE CONVERSION ON05] = <span className="underline ml-1"> 34 </span> - [MODIFY P.C. TM (W) PC0_8]</div>
                </div>

                <div className="mt-8 ml-4">
                    <div className="flex items-start gap-2">
                        <span className="underline font-bold text-black">Example</span>
                        <div className="font-bold text-[11px] text-black">
                            Pulse-conversion compensation TM (W) PC0_8 = <span className="underline">-4</span>
                            <div className="mt-2 space-y-1 italic text-gray-700">
                                <div>Calculate New [PULSE CONVERSION ON00] = [ 6 ] - [-4] = [10] Input value = 10</div>
                                <div>Calculate New [PULSE CONVERSION ON01] = [12] - [-4] = [16] Input value = 16</div>
                                <div>Calculate New [PULSE CONVERSION ON02] = [14] - [-4] = [18] Input value = 18</div>
                                <div>Calculate New [PULSE CONVERSION ON03] = [25] - [-4] = [29] Input value = 29</div>
                                <div>Calculate New [PULSE CONVERSION ON04] = [29] - [-4] = [33] Input value = 33</div>
                                <div>Calculate New [PULSE CONVERSION ON05] = [34] - [-4] = [38] Input value = 38</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <FormQuickTable
                        columns={columns}
                        data={data}
                        headerRows={headerRows}
                        className="w-full border-2 border-black [&_thead]:bg-white"
                    />
                </div>

                {/* Footer Signature */}
                <div className="absolute bottom-[-150px] right-20">
                    <FormCheckedBox
                        name="p22_checked_by"
                        label="Checked by :"
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page22;