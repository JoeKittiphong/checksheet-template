import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page118() {

    const dataA = [
        { label: "V0", vals: ["4", "4", "4", "3", "3", "3", "3", "3", "2"] },
        { label: "V1", vals: ["12", "11", "11", "10", "10", "9", "8", "8", "7"] },
        { label: "V2", vals: ["19", "18", "17", "16", "15", "14", "13", "12", "11"] },
        { label: "V3", vals: ["27", "26", "24", "23", "22", "20", "19", "18", "16"] },
        { label: "V4", vals: ["34", "32", "31", "29", "27", "26", "24", "22", "20"] },
        { label: "V5", vals: ["49", "47", "44", "42", "39", "37", "34", "32", "29"] },
        { label: "V6", vals: ["64", "61", "58", "54", "51", "48", "45", "42", "38"] },
        { label: "V7", vals: ["79", "75", "71", "67", "63", "59", "55", "51", "47"] },
        { label: "V8", vals: ["87", "83", "78", "74", "70", "65", "61", "57", "52"] },
        { label: "V9", vals: ["94", "89", "85", "80", "75", "71", "66", "61", "56"] },
    ];

    const dataB = [
        { label: "V10", vals: ["101", "96", "91", "86", "81", "76", "71", "66", "61"] },
        { label: "V11", vals: ["109", "104", "98", "93", "87", "82", "76", "71", "65"] },
        { label: "V12", vals: ["116", "110", "104", "99", "93", "87", "81", "75", "70"] },
        { label: "V13", vals: ["124", "118", "112", "105", "99", "93", "87", "81", "74"] },
        { label: "V14", vals: ["131", "124", "118", "111", "105", "98", "92", "85", "79"] },
        { label: "V15", vals: ["139", "132", "125", "118", "111", "104", "97", "90", "83"] },
        { label: "V16", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V17", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V18", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V19", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
    ];

    const xHeaders = ["X 1.00", "X 0.95", "X 0.90", "X 0.85", "X 0.80", "X 0.75", "X 0.70", "X 0.65", "X 0.60"];
    const checkTopKeys = ["p118_check_top_x100", "p118_check_top_x095", "p118_check_top_x090", "p118_check_top_x085", "p118_check_top_x080", "p118_check_top_x075", "p118_check_top_x070", "p118_check_top_x065", "p118_check_top_x060"];
    const checkBottomKeys = ["p118_check_bottom_x100", "p118_check_bottom_x095", "p118_check_bottom_x090", "p118_check_bottom_x085", "p118_check_bottom_x080", "p118_check_bottom_x075", "p118_check_bottom_x070", "p118_check_bottom_x065", "p118_check_bottom_x060"];

    return (
        <A4Paper content={content} currentPage={118}>
            <SectionTitle>24.9 Input setting value to Page 7/14 [DPW PC01-21 V10~V19] (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>
            <div className="text-[10px] font-sans text-center mb-2">
                Refer to [Table A = Decrease setting ] and [Table B = Increase setting]
            </div>

            <div className="text-[10px] font-sans mb-1 w-full text-left pl-8">
                Table A = Decrease setting <span className="ml-10">(Table B =&gt; Next page (Increase setting))</span>
            </div>

            <div className="w-full px-4">
                <table className="w-full border-collapse text-center text-[10px] font-sans">
                    <thead>
                        {/* Header Row 1: Empty sidebar, Check, and empty cells */}
                        <tr className="h-10">
                            <th className="w-[4%] border-none"></th>
                            <th className="border border-black bg-white w-14 font-bold">Check</th>
                            {checkTopKeys.map((keyName, i) => (
                                <th key={i} className="border border-black bg-white w-[8%] p-0 align-middle">
                                    <div className="flex justify-center items-center h-full">
                                        <FormItemCheck
                                            name={keyName}
                                            showCheckbox
                                            checkboxSize="w-5 h-5"
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                        {/* Header Row 2: Empty sidebar, V*, and X headers */}
                        <tr className="h-7">
                            <th className="border-none"></th>
                            <th className="border border-black bg-gray-300 font-bold">V*</th>
                            {xHeaders.map((h, i) => (
                                <th key={i} className="border border-black bg-white">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table A Data Rows */}
                        {dataA.map((row, idx) => (
                            <tr key={`a-${idx}`} className="h-6">
                                {/* Sidebar Label (Only on first row of this block) */}
                                {idx === 0 && (
                                    <td rowSpan={dataA.length} className="border border-black bg-gray-100 font-bold align-middle p-0">
                                        <div className="-rotate-90 whitespace-nowrap flex items-center justify-center" style={{ width: '1em', margin: '0 auto', height: 'auto' }}>
                                            Page 4/14 [DPW PC01-21 V0~V9]
                                        </div>
                                    </td>
                                )}
                                <td className="border border-black font-bold bg-gray-300">{row.label}</td>
                                {row.vals.map((val, vIdx) => (
                                    <td key={vIdx} className="border border-black bg-white">{val}</td>
                                ))}
                            </tr>
                        ))}

                        {/* Arrows Row */}
                        <tr className="h-7">
                            <td className="border-none"></td> {/* Sidebar gap */}
                            <td className="border-none"></td> {/* V column gap */}
                            {xHeaders.map((_, i) => (
                                <td key={i} className="border-none text-center font-bold text-base">↓</td>
                            ))}
                        </tr>

                        {/* Table B Data Rows */}
                        {dataB.map((row, idx) => (
                            <tr key={`b-${idx}`} className="h-7">
                                {/* Sidebar Label (Only on first row of this block) */}
                                {idx === 0 && (
                                    <td rowSpan={dataB.length} className="border border-black bg-gray-100 font-bold align-middle p-0">
                                        <div className="-rotate-90 whitespace-nowrap flex items-center justify-center" style={{ width: '1em', margin: '0 auto', height: 'auto' }}>
                                            Page 7/14 [DPW PC01-21 V10~V19]
                                        </div>
                                    </td>
                                )}
                                <td className="border border-black font-bold bg-gray-300">{row.label}</td>
                                {row.vals.map((val, vIdx) => (
                                    <td key={vIdx} className="border border-black bg-white">{val}</td>
                                ))}
                            </tr>
                        ))}

                        {/* Check Input Row */}
                        <tr className="h-10">
                            <td className="border-none"></td> {/* Sidebar gap */}
                            <td className="border border-black font-bold bg-white h-6">Check</td>
                            {checkBottomKeys.map((keyName, i) => (
                                <td key={i} className="border border-black bg-white p-0 align-middle">
                                    <div className="flex justify-center items-center h-full">
                                        <FormItemCheck
                                            name={keyName}
                                            showCheckbox
                                            checkboxSize="w-5 h-5"
                                        />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mt-8 pr-10">
                <FormCheckedBox
                    name="p118_checked_by"
                    label="Checked by :"
                />
            </div>

        </A4Paper>
    );
}

export default Page118;