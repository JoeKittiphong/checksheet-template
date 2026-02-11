import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';

function Page113() {

    // Table 24.4.A Column Definition
    const columnsA = [
        { header: "Roughness", key: "col0", width: "10%", className: "text-center bg-gray-300 font-bold" },
        { header: "Default", key: "col1", width: "10%", className: "text-center" },
        { header: "", key: "col2", width: "10%", className: "text-center" },
        { header: "-0.01μmRa", key: "col3", width: "10%", className: "text-center" },
        { header: "", key: "col4", width: "10%", className: "text-center" },
        { header: "-0.02μmRa", key: "col5", width: "10%", className: "text-center" },
        { header: "", key: "col6", width: "10%", className: "text-center" },
        { header: "-0.03μmRa", key: "col7", width: "10%", className: "text-center" },
        { header: "", key: "col8", width: "10%", className: "text-center" },
        { header: "-0.04μmRa", key: "col9", width: "10%", className: "text-center" },
    ];

    // Table 24.4.A Data
    const dataA = [
        { id: "header_v", col0: "V*", col1: "X 1.00", col2: "X 0.95", col3: "X 0.90", col4: "X 0.85", col5: "X 0.80", col6: "X 0.75", col7: "X 0.70", col8: "X 0.65", col9: "X 0.60" },
        { id: "v0", col0: "V0", col1: "4", col2: "4", col3: "4", col4: "3", col5: "3", col6: "3", col7: "3", col8: "3", col9: "2" },
        { id: "v1", col0: "V1", col1: "12", col2: "11", col3: "11", col4: "10", col5: "10", col6: "9", col7: "8", col8: "8", col9: "7" },
        { id: "v2", col0: "V2", col1: "19", col2: "18", col3: "17", col4: "16", col5: "15", col6: "14", col7: "13", col8: "12", col9: "11" },
        { id: "v3", col0: "V3", col1: "27", col2: "26", col3: "24", col4: "23", col5: "22", col6: "20", col7: "19", col8: "18", col9: "16" },
        { id: "v4", col0: "V4", col1: "34", col2: "32", col3: "31", col4: "29", col5: "27", col6: "26", col7: "24", col8: "22", col9: "20" },
        { id: "v5", col0: "V5", col1: "49", col2: "47", col3: "44", col4: "42", col5: "39", col6: "37", col7: "34", col8: "32", col9: "29" },
        { id: "v6", col0: "V6", col1: "64", col2: "61", col3: "58", col4: "54", col5: "51", col6: "48", col7: "45", col8: "42", col9: "38" },
        { id: "v7", col0: "V7", col1: "79", col2: "75", col3: "71", col4: "67", col5: "63", col6: "59", col7: "55", col8: "51", col9: "47" },
        { id: "v8", col0: "V8", col1: "87", col2: "83", col3: "78", col4: "74", col5: "70", col6: "65", col7: "61", col8: "57", col9: "52" },
        { id: "v9", col0: "V9", col1: "94", col2: "89", col3: "85", col4: "80", col5: "75", col6: "71", col7: "66", col8: "61", col9: "56" },
    ];

    // Table 24.4.B Column Definition
    const columnsB = [
        { header: "Roughness", key: "col0", width: "10%", className: "text-center bg-gray-300 font-bold" },
        { header: "Default", key: "col1", width: "10%", className: "text-center" },
        { header: "", key: "col2", width: "10%", className: "text-center" },
        { header: "+0.01μmRa", key: "col3", width: "10%", className: "text-center" },
        { header: "", key: "col4", width: "10%", className: "text-center" },
        { header: "+0.02μmRa", key: "col5", width: "10%", className: "text-center" },
        { header: "", key: "col6", width: "10%", className: "text-center" },
        { header: "+0.03μmRa", key: "col7", width: "10%", className: "text-center" },
        { header: "", key: "col8", width: "10%", className: "text-center" },
        { header: "+0.04μmRa", key: "col9", width: "10%", className: "text-center" },
    ];

    // Table 24.4.B Data
    const dataB = [
        { id: "header_v", col0: "V*", col1: "X 1.00", col2: "X 1.05", col3: "X 1.10", col4: "X 1.15", col5: "X 1.20", col6: "X 1.25", col7: "X 1.30", col8: "X 1.35", col9: "X 1.40" },
        { id: "v0", col0: "V0", col1: "4", col2: "4", col3: "4", col4: "5", col5: "5", col6: "5", col7: "5", col8: "5", col9: "6" },
        { id: "v1", col0: "V1", col1: "12", col2: "13", col3: "13", col4: "14", col5: "14", col6: "15", col7: "16", col8: "16", col9: "17" },
        { id: "v2", col0: "V2", col1: "19", col2: "20", col3: "21", col4: "22", col5: "23", col6: "24", col7: "25", col8: "26", col9: "27" },
        { id: "v3", col0: "V3", col1: "27", col2: "28", col3: "30", col4: "31", col5: "32", col6: "34", col7: "35", col8: "36", col9: "38" },
        { id: "v4", col0: "V4", col1: "34", col2: "36", col3: "37", col4: "39", col5: "41", col6: "43", col7: "44", col8: "46", col9: "48" },
        { id: "v5", col0: "V5", col1: "49", col2: "51", col3: "54", col4: "56", col5: "59", col6: "61", col7: "64", col8: "66", col9: "69" },
        { id: "v6", col0: "V6", col1: "64", col2: "67", col3: "70", col4: "74", col5: "77", col6: "80", col7: "83", col8: "86", col9: "90" },
        { id: "v7", col0: "V7", col1: "79", col2: "83", col3: "87", col4: "91", col5: "95", col6: "99", col7: "103", col8: "107", col9: "111" },
        { id: "v8", col0: "V8", col1: "87", col2: "91", col3: "96", col4: "100", col5: "104", col6: "109", col7: "113", col8: "117", col9: "122" },
        { id: "v9", col0: "V9", col1: "94", col2: "99", col3: "103", col4: "108", col5: "113", col6: "118", col7: "122", col8: "127", col9: "132" },
    ];

    return (
        <A4Paper content={content} currentPage={113}>
            <div className="p-4 text-[10px] font-sans">
                <div className="mb-4">
                    <SectionTitle>24.4.A Table of voltage setting (Roughness is over/ under STD)</SectionTitle>
                    <p className="italic mb-1 font-bold">Page 4/14 [DPW PC01-21 V0~V9]</p>
                    <FormQuickTable
                        columns={columnsA}
                        data={dataA}
                        className="border border-black"
                        headerClassName="bg-gray-100 font-bold"
                        cellClassName={(key) => (key === 'col0' ? "bg-gray-300 font-bold" : "")}
                    />
                </div>

                <div className="mb-4 mt-8">
                    <SectionTitle>24.4.B Table of voltage setting (Roughness is Under STD or No good surface)</SectionTitle>
                    <p className="italic mb-1 font-bold">Page 4/14 [DPW PC01-21 V0~V9]</p>
                    <FormQuickTable
                        columns={columnsB}
                        data={dataB}
                        className="border border-black"
                        headerClassName="bg-gray-100 font-bold"
                        cellClassName={(key) => (key === 'col0' ? "bg-gray-300 font-bold" : "")}
                    />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page113;