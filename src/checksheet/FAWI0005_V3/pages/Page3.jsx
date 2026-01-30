import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page3() {

    // --- 3.3 Data Setting: Manage - Parameter - Disch - Page 6 ---
    const data3_3_Left = [
        { label: "P. CONVERT _ON4 (MA) 00", val: "10" },
        { label: "P. CONVERT _ON4 (MA) 01", val: "15" },
        { label: "P. CONVERT _ON4 (MA) 02", val: "25" },
        { label: "P. CONVERT _ON4 (MA) 03", val: "31" },
        { label: "P. CONVERT _ON4 (MA) 04", val: "37" },
        { label: "P. CONVERT _ON4 (MA) 05", val: "42" },
        { label: "P. CONVERT _ON4 (MA) 06", val: "47" },
        { label: "P. CONVERT _ON4 (MA) 07", val: "54" },
        { label: "P. CONVERT _ON4 (MA) 08", val: "60" },
        { label: "P. CONVERT _ON4 (MA) 09", val: "67" },
    ];
    const data3_3_Right = [
        { label: "P. CONVERT ON5_ (MA) 00", val: "8" },
        { label: "P. CONVERT ON5_ (MA) 01", val: "10" },
        { label: "P. CONVERT ON5_ (MA) 02", val: "20" },
        { label: "P. CONVERT ON5_ (MA) 03", val: "26" },
        { label: "P. CONVERT ON5_ (MA) 04", val: "31" },
        { label: "P. CONVERT ON5_ (MA) 05", val: "36" },
        { label: "P. CONVERT ON5_ (MA) 06", val: "43" },
        { label: "P. CONVERT ON5_ (MA) 07", val: "50" },
        { label: "P. CONVERT ON5_ (MA) 08", val: "57" },
        { label: "P. CONVERT ON5_ (MA) 09", val: "64" },
    ];

    // --- 3.4 Data Setting: Manage - Parameter - Disch - Page 3 ---
    const data3_4_Left = [
        { label: "MODIFY WORKING CORE SV1", val: "00" },
        { label: "MODIFY WORKING CORE SV2", val: "00" },
        { label: "MODIFY WORKING CORE SV3", val: "00" },
        { label: "MODIFY WORKING CORE SV4", val: "00" },
        { label: "MODIFY WORKING CORE SV5", val: "+30" },
        { label: "MODIFY WORKING CORE SV6", val: "+30" },
        { label: "MODIFY WORKING CORE SV7", val: "+40" },
        { label: "MODIFY WORKING CORE SV8", val: "+40" },
        { label: "MODIFY WORKING CORE SV9", val: "+20" },
        { label: "MODIFY WORKING CORE SV10", val: "00" },
    ];
    const data3_4_Right = [
        { label: "MODIFY WORKING CORE SV11", val: "00" },
        { label: "MODIFY WORKING CORE SV12", val: "00" },
        { label: "MODIFY WORKING CORE SV13", val: "00" },
        { label: "MODIFY WORKING CORE SV14", val: "00" },
        { label: "MODIFY WORKING CORE SV15", val: "+40" },
        { label: "MODIFY WORKING CORE SV16", val: "+40" },
        { label: "MODIFY WORKING CORE SV17", val: "00" },
        { label: "MODIFY WORKING CORE SV18", val: "-30" },
        { label: "MODIFY WORKING CORE SV19", val: "00" },
        { label: "MODIFY WORKING CORE SV20", val: "00" },
    ];

    // --- 3.5 Data Setting: Manage - Parameter - Disch - Page 10 ---
    const data3_5_Left = [
        { label: "MODIFY WORKING CR SV21", val: "+10" },
        { label: "MODIFY WORKING CR SV22", val: "00" },
        { label: "MODIFY WORKING CR SV23", val: "00" },
        { label: "MODIFY WORKING CR SV24", val: "00" },
    ];
    const data3_5_Right = [
        { label: "MODIFY WORKING CR SV25", val: "00" },
        { label: "MODIFY WORKING CR SV26", val: "00" },
        { label: "MODIFY WORKING CR SV27", val: "00" },
        { label: "MODIFY WORKING CORE SV29", val: "-20" },
    ];

    // --- 3.6 Data Setting: Manage - Parameter - Disch - Page 7 ---
    const data3_6_Left = [
        { label: "NGALPM ST DECISION V5-7", val1: "110", val2: "110" },
        { label: "NGALPM ST DECISION V8-9", val1: "110", val2: "110" },
        { label: "NEW HF ST DECISION V0-4", val1: "130", val2: "130" },
        { label: "NEW HF ST DECISION V5-9", val1: "210", val2: "210" },
    ];
    const data3_6_Right = [
        { label: "ALPM ST DECISION V0-2", val1: "130", val2: "130" },
        { label: "ALPM ST DECISION V3-4", val1: "130", val2: "130" },
        { label: "GALPM ST DECISION V0-2", val1: "30", val2: "30" },
        { label: "GALPM ST DECISION V3-4", val1: "110", val2: "110" },
    ];

    // Standard Columns
    const columnsStandard = [
        { header: "DESCRIPTION", key: "label", width: "70%", className: "pl-2 text-left" },
        { header: "DATA SETTING", key: "val", width: "30%", className: "text-center" }
    ];

    // 3-Column Columns for Section 3.6
    const columns3 = [
        { header: "DESCRIPTION", key: "label", width: "60%", className: "pl-2 text-left" },
        { header: "DATA AL400G", key: "val1", width: "20%", className: "text-center", headerClassName: "text-[9px]" },
        { header: "DATA AL600G", key: "val2", width: "20%", className: "text-center", headerClassName: "text-[9px]" }
    ];

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="flex flex-col text-[10px] h-full relative">

                {/* 3.3 Data Setting */}
                <div >
                    <FormItemCheck name="p3_data_setting_33" label="3.3 Data Setting : Manage - Parameter - Disch - Page 6" showCheckbox={true} className="font-bold text-[11px] mb-1" />
                    <div className="flex justify-between px-2 gap-4">
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_3_Left} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_3_Right} headerClassName="bg-gray-300 font-bold" />
                        </div>
                    </div>
                </div>

                {/* 3.4 Data Setting */}
                <div>
                    <FormItemCheck name="p3_data_setting_34" label="3.4 Data Setting : Manage - Parameter - Disch - Page 3" showCheckbox={true} className="font-bold text-[11px] mb-1" />
                    <div className="flex justify-between px-2 gap-4">
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_4_Left} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_4_Right} headerClassName="bg-gray-300 font-bold" />
                        </div>
                    </div>
                </div>

                {/* 3.5 Data Setting */}
                <div>
                    <FormItemCheck name="p3_data_setting_35" label="3.5 Data Setting : Manage - Parameter - Disch - Page 10" showCheckbox={true} className="font-bold text-[11px] mb-1" />
                    <div className="flex justify-between px-2 gap-4">
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_5_Left} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className="w-[48%]">
                            <FormQuickTable columns={columnsStandard} data={data3_5_Right} headerClassName="bg-gray-300 font-bold" />
                        </div>
                    </div>
                </div>

                {/* 3.6 Data Setting */}
                <div>
                    <FormItemCheck name="p3_data_setting_36" label="3.6 Data Setting : Manage - Parameter - Disch - Page 7" showCheckbox={true} className="font-bold text-[11px] mb-1" />
                    <div className="flex justify-between px-2 gap-4">
                        <div className="w-[48%]">
                            <FormQuickTable columns={columns3} data={data3_6_Left} headerClassName="bg-gray-300 font-bold" />
                        </div>
                        <div className="w-[48%]">
                            <FormQuickTable columns={columns3} data={data3_6_Right} headerClassName="bg-gray-300 font-bold" />
                        </div>
                    </div>
                </div>

                {/* 3.7 Confirm Data Setting */}
                <div>
                    <FormItemCheck name="p3_confirm_data_setting" label="3.7 Confirm Data Setting : Manage - Parameter - Secret2 - Page 4" showCheckbox={true} className="font-bold text-[11px] mb-1" />
                    <div className="pl-6 mt-1">
                        <span className="bg-yellow-300 font-bold px-1 py-1 inline-block border border-black/10">Secret2-P4-IDSV VERSION = <span className="underline font-extrabold">1</span> (IDSV-04:0, IDSV-05:1, IDSV-07:1)</span>
                    </div>
                </div>

                {/* <div className="absolute bottom-4 right-4">
                    <FormCheckedBox name="p3_checked_by" label="Checked by :" />
                </div> */}
            </div>
        </A4Paper>
    );
}

export default Page3;