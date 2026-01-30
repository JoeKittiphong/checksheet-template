import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page27() {
    const columns = [
        { header: "DESCRIPTION", key: "desc", width: "12%", className: "text-left pl-1 font-bold border-black text-[6px]" },
        { header: "", key: "wo_400", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "wo_600", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "hs_400", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "hs_600", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "dsm_wo_400", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "dsm_wo_600", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "dsm_hs_400", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "", key: "dsm_hs_600", width: "8%", className: "text-center border-black text-[7px]" },
        { header: "Address", key: "address", width: "24%", className: "text-center font-bold border-black text-[8px] relative", isLabel: true },
    ];

    const headerRows = [
        [
            { header: "DESCRIPTION", rowSpan: 2, className: "text-center align-middle font-bold border-black text-[6px]" },
            { header: "W/O HIGH SPEED", colSpan: 2, className: "text-center font-bold border-black bg-gray-300 text-[6px]" },
            { header: "HIGH SPEED", colSpan: 2, className: "text-center font-bold border-black bg-gray-300 text-[6px]" },
            { header: "DSM (W/O HIGH SPEED)", colSpan: 2, className: "text-center font-bold border-black bg-gray-300 text-[6px]" },
            { header: "DSM (HIGH SPEED)", colSpan: 2, className: "text-center font-bold border-black bg-gray-300 text-[6px]" },
            { header: "Address", rowSpan: 2, className: "text-center align-middle font-bold border-black text-[6px]" }
        ],
        [
            { headerCheckbox: "p27_sel_wo_400", header: "AL400G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_wo_600", header: "AL600G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_hs_400", header: "AL400G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_hs_600", header: "AL600G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_dsm_wo_400", header: "AL400G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_dsm_wo_600", header: "AL600G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_dsm_hs_400", header: "AL400G", className: "text-[5px] border-black p-0" },
            { headerCheckbox: "p27_sel_dsm_hs_600", header: "AL600G", className: "text-[5px] border-black p-0" }
        ]
    ];

    const data = [
        { desc: "CONDSET FUNC", wo_400: "0000", wo_600: "0000", hs_400: "0000", hs_600: "0000", dsm_wo_400: "0000", dsm_wo_600: "0000", dsm_hs_400: "0000", dsm_hs_600: "0000", address: "MANAGE-PARAMETER-CUTTING P.1/6" },
        { desc: "THINKING-CIRCUIT", wo_400: "ON", wo_600: "ON", hs_400: "ON", hs_600: "ON", dsm_wo_400: "ON", dsm_wo_600: "ON", dsm_hs_400: "ON", dsm_hs_600: "ON" },
        { desc: "TC APPROACH TIME", wo_400: "0015", wo_600: "0015", hs_400: "0015", hs_600: "0015", dsm_wo_400: "0015", dsm_wo_600: "0015", dsm_hs_400: "0015", dsm_hs_600: "0015" },
        { desc: "TC WATER PRES RATE", wo_400: "0000", wo_600: "0000", hs_400: "0000", hs_600: "0000", dsm_wo_400: "0000", dsm_wo_600: "0000", dsm_hs_400: "0000", dsm_hs_600: "0000" },
        { desc: "TC THICK RATE", wo_400: "100", wo_600: "100", hs_400: "100", hs_600: "100", dsm_wo_400: "100", dsm_wo_600: "100", dsm_hs_400: "100", dsm_hs_600: "100" },
        { desc: "THICK LIMIT OFFSET", wo_400: "400", wo_600: "400", hs_400: "400", hs_600: "400", dsm_wo_400: "400", dsm_wo_600: "400", dsm_hs_400: "400", dsm_hs_600: "400" },
        { desc: "TC DB MAX ITEM", wo_400: "3221", wo_600: "3221", hs_400: "3221", hs_600: "3221", dsm_wo_400: "13221", dsm_wo_600: "13221", dsm_hs_400: "13221", dsm_hs_600: "13221" },

        { desc: "TC UOP PRES WP40", wo_400: "0206", wo_600: "0201", hs_400: "0341", hs_600: "0350", dsm_wo_400: "0341", dsm_wo_600: "0350", dsm_hs_400: "0206", dsm_hs_600: "0201", address: "MANAGE-PARAMETER-CUTTING P.2/6" },
        { desc: "TC UOP PRES WP50", wo_400: "0327", wo_600: "0318", hs_400: "0536", hs_600: "0550", dsm_wo_400: "0536", dsm_wo_600: "0550", dsm_hs_400: "0327", dsm_hs_600: "0318" },
        { desc: "TC UOP PRES WP60", wo_400: "0460", wo_600: "0461", hs_400: "0772", hs_600: "0788", dsm_wo_400: "0772", dsm_wo_600: "0788", dsm_hs_400: "0460", dsm_hs_600: "0431" },
        { desc: "TC LOP PRES WP40", wo_400: "0184", wo_600: "0177", hs_400: "0317", hs_600: "0341", dsm_wo_400: "0317", dsm_wo_600: "0341", dsm_hs_400: "0184", dsm_hs_600: "0177" },
        { desc: "TC LOP PRES WP50", wo_400: "0291", wo_600: "0282", hs_400: "0500", hs_600: "0535", dsm_wo_400: "0500", dsm_wo_600: "0535", dsm_hs_400: "0291", dsm_hs_600: "0282" },
        { desc: "TC LOP PRES WP60", wo_400: "0421", wo_600: "0411", hs_400: "0722", hs_600: "0770", dsm_wo_400: "0722", dsm_wo_600: "0770", dsm_hs_400: "0421", dsm_hs_600: "0411" },
        { desc: "TC CLS PRES WP40", wo_400: "0297", wo_600: "0295", hs_400: "0426", hs_600: "0436", dsm_wo_400: "0426", dsm_wo_600: "0436", dsm_hs_400: "0297", dsm_hs_600: "0295" },
        { desc: "TC CLS PRES WP50", wo_400: "0470", wo_600: "0469", hs_400: "0670", hs_600: "0686", dsm_wo_400: "0670", dsm_wo_600: "0686", dsm_hs_400: "0470", dsm_hs_600: "0469" },
        { desc: "TC CLS PRES WP60", wo_400: "0676", wo_600: "0684", hs_400: "0967", hs_600: "0984", dsm_wo_400: "0967", dsm_wo_600: "0984", dsm_hs_400: "0676", dsm_hs_600: "0684" },
        { desc: "TC RESET FUNC", wo_400: "0001", wo_600: "0001", hs_400: "0001", hs_600: "0001", dsm_wo_400: "0001", dsm_wo_600: "0001", dsm_hs_400: "0001", dsm_hs_600: "0001" },
        { desc: "TC WATER PRES AVR", wo_400: "0008", wo_600: "0008", hs_400: "0008", hs_600: "0008", dsm_wo_400: "0008", dsm_wo_600: "0008", dsm_hs_400: "0008", dsm_hs_600: "0008" },
        { desc: "TC EXPAND FUNC", wo_400: "0001", wo_600: "0001", hs_400: "0001", hs_600: "0001", dsm_wo_400: "0001", dsm_wo_600: "0001", dsm_hs_400: "0001", dsm_hs_600: "0001" },
        { desc: "TC2 SETTING", wo_400: "21111", wo_600: "21111", hs_400: "21111", hs_600: "21111", dsm_wo_400: "21111", dsm_wo_600: "21111", dsm_hs_400: "21111", dsm_hs_600: "21111" },
        { desc: "FTC FUNCTION", wo_400: "0002", wo_600: "0002", hs_400: "0002", hs_600: "0002", dsm_wo_400: "0002", dsm_wo_600: "0002", dsm_hs_400: "0002", dsm_hs_600: "0002" },
        { desc: "DETECYION RANGE(NML)", wo_400: "800", wo_600: "800", hs_400: "800", hs_600: "800", dsm_wo_400: "800", dsm_wo_600: "800", dsm_hs_400: "800", dsm_hs_600: "800" },
        { desc: "DETECTION RANGE(RVS)", wo_400: "200", wo_600: "200", hs_400: "200", hs_600: "200", dsm_wo_400: "200", dsm_wo_600: "200", dsm_hs_400: "200", dsm_hs_600: "200" },
        { desc: "CHANGE INTERVAL(NML)", wo_400: "50", wo_600: "50", hs_400: "50", hs_600: "50", dsm_wo_400: "50", dsm_wo_600: "50", dsm_hs_400: "50", dsm_hs_600: "50" },
        { desc: "CHENGE TIMES(NML)", wo_400: "16", wo_600: "16", hs_400: "16", hs_600: "16", dsm_wo_400: "16", dsm_wo_600: "16", dsm_hs_400: "16", dsm_hs_600: "16" },
        { desc: "CHANGE INTERVAL(RVS)", wo_400: "50", wo_600: "50", hs_400: "50", hs_600: "50", dsm_wo_400: "50", dsm_wo_600: "50", dsm_hs_400: "50", dsm_hs_600: "50" },
        { desc: "CHANGE TIMES(RVS)", wo_400: "16", wo_600: "16", hs_400: "16", hs_600: "16", dsm_wo_400: "16", dsm_wo_600: "16", dsm_hs_400: "16", dsm_hs_600: "16" },
        { desc: "DETECYTION STATE", wo_400: "200", wo_600: "200", hs_400: "200", hs_600: "200", dsm_wo_400: "200", dsm_wo_600: "200", dsm_hs_400: "200", dsm_hs_600: "200" },
    ];

    const rowSpans = data.map(() => ({}));
    rowSpans[0].address = 7;
    rowSpans[7].address = 21;
    for (let i = 1; i < 7; i++) rowSpans[i].address = 0;
    for (let i = 8; i < 28; i++) rowSpans[i].address = 0;

    return (
        <A4Paper content={content} currentPage={27}>
            <div className="flex flex-col text-[12px] h-full relative p-2">

                <div className="font-bold text-[14px] mb-2">15. DSF Cutting check (ALN-G--&gt; std, ALN-Q--&gt; option)</div>
                <div className="font-bold text-[13px] ml-4 mb-2">15.1. Data Setting Check</div>

                <div className="ml-8 space-y-1 mb-2">
                    <FormItemCheck
                        name="p27_check_15_1_1"
                        label="15.1.1 Data Setting : Settings: Manage-Parameter-Disch-Page1 ==> CTRL MAX = 9999"
                        className="font-bold gap-2"
                    />
                    <FormItemCheck
                        name="p27_check_15_1_2"
                        label="15.1.2 Data Setting : Manage-Parameter-Process-Page1, 2"
                        className="font-bold gap-2"
                    />
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse border border-black text-[6px] table-fixed">
                        <thead>
                            {headerRows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                    {row.map((cell, cIdx) => {
                                        let width = "";
                                        if (rIdx === 0) {
                                            if (cIdx === 0) width = "10%";
                                            else if (cIdx === 5) width = "5%";
                                            else width = "20%";
                                        }
                                        return (
                                            <th
                                                key={cIdx}
                                                rowSpan={cell.rowSpan || 1}
                                                colSpan={cell.colSpan || 1}
                                                style={width ? { width } : {}}
                                                className={`border border-black p-0.5 ${cell.className || ""}`}
                                            >
                                                <div className="flex flex-col items-center justify-center overflow-hidden break-words">
                                                    {cell.headerCheckbox && (
                                                        <FormItemCheck
                                                            name={cell.headerCheckbox}
                                                            label={cell.header}
                                                            className="text-[4px] flex-row-reverse"
                                                        />
                                                    )}
                                                    {!cell.headerCheckbox && cell.header}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {data.map((row, rIdx) => (
                                <tr key={rIdx}>
                                    <td style={{ width: "12%" }} className="border border-black pl-1 font-bold text-left py-0.5 overflow-hidden break-words text-[5px]">{row.desc}</td>
                                    <td style={{ width: "8%" }} className="border border-black text-center py-0.5 text-[6px]">{row.wo_400}</td>
                                    <td style={{ width: "8%" }} className="border border-black text-center py-0.5 text-[6px]">{row.wo_600}</td>
                                    <td style={{ width: "8%" }} className="border border-black text-center py-0.5 text-[6px]">{row.hs_400}</td>
                                    <td style={{ width: "8%" }} className="border border-black text-center py-0.5 text-[6px]">{row.hs_600}</td>
                                    <td className="border border-black text-center py-0.5">{row.dsm_wo_400}</td>
                                    <td className="border border-black text-center py-0.5">{row.dsm_wo_600}</td>
                                    <td className="border border-black text-center py-0.5">{row.dsm_hs_400}</td>
                                    <td className="border border-black text-center py-0.5">{row.dsm_hs_600}</td>

                                    {rowSpans[rIdx].address !== 0 && (
                                        <td
                                            rowSpan={rowSpans[rIdx].address}
                                            className="border border-black text-center font-bold p-1 bg-white relative overflow-hidden"
                                        >
                                            <div
                                                className="absolute inset-0 flex items-center justify-center p-2"
                                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                            >
                                                {row.address}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page27;