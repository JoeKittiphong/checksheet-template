import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page119() {
    const { register } = useFormContext();

    const dataA = [
        { label: "V0", vals: ["4", "4", "4", "5", "5", "5", "5", "5", "6"] },
        { label: "V1", vals: ["12", "13", "13", "14", "14", "15", "16", "16", "17"] },
        { label: "V2", vals: ["19", "20", "21", "22", "23", "24", "25", "26", "27"] },
        { label: "V3", vals: ["27", "28", "30", "31", "32", "34", "35", "36", "38"] },
        { label: "V4", vals: ["34", "36", "37", "39", "41", "43", "44", "46", "48"] },
        { label: "V5", vals: ["49", "51", "54", "56", "59", "61", "64", "66", "69"] },
        { label: "V6", vals: ["64", "67", "70", "74", "77", "80", "83", "86", "90"] },
        { label: "V7", vals: ["79", "83", "87", "91", "95", "99", "103", "107", "111"] },
        { label: "V8", vals: ["87", "91", "96", "100", "104", "109", "113", "117", "122"] },
        { label: "V9", vals: ["94", "99", "103", "108", "113", "118", "122", "127", "132"] },
    ];

    const dataB = [
        { label: "V10", vals: ["101", "106", "111", "116", "121", "126", "131", "136", "139"] },
        { label: "V11", vals: ["109", "114", "120", "125", "131", "136", "139", "139", "139"] },
        { label: "V12", vals: ["116", "122", "128", "139", "139", "139", "139", "139", "139"] },
        { label: "V13", vals: ["124", "130", "136", "139", "139", "139", "139", "139", "139"] },
        { label: "V14", vals: ["131", "138", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V15", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V16", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V17", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V18", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
        { label: "V19", vals: ["139", "139", "139", "139", "139", "139", "139", "139", "139"] },
    ];

    const xHeaders = ["X 1.00", "X 1.05", "X 1.10", "X 1.15", "X 1.20", "X 1.25", "X 1.30", "X 1.35", "X 1.40"];
    const checkTopKeys = ["p119_check_top_x100", "p119_check_top_x105", "p119_check_top_x110", "p119_check_top_x115", "p119_check_top_x120", "p119_check_top_x125", "p119_check_top_x130", "p119_check_top_x135", "p119_check_top_x140"];

    return (
        <A4Paper content={content} currentPage={119}>
            <SectionTitle>24.9 Input setting value to Page 7/14 [DPW PC01-21 V10~V19] (For ACR2 20mm 7th 0.20mm Wire)</SectionTitle>
            <div className="text-[10px] font-sans text-center mb-2">
                Refer to [Table A = Decrease setting ] and [Table B = Increase setting]
            </div>

            <div className="text-[10px] font-sans mb-1 w-full text-left pl-8">
                Table B = Increase setting <span className="ml-10">(Table A =&gt; Previous page (Decrease setting))</span>
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
                                        <input
                                            type="checkbox"
                                            {...register(keyName)}
                                            className="w-5 h-5 cursor-pointer"
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
                            {checkTopKeys.map((keyName, i) => (
                                <td key={i} className="border border-black bg-white p-0 align-middle">
                                    <div className="flex justify-center items-center h-full">
                                        <input
                                            type="checkbox"
                                            {...register(keyName, { required: true })}
                                            className="w-5 h-5 cursor-pointer"
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
                    name="p119_checked_by"
                    label="Checked by :"
                />
            </div>

        </A4Paper>
    );
}

export default Page119;