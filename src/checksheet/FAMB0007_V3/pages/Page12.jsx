import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import imgDoubleCheckXY from '@/assets/FAMB0007_V3/FAMB0007-24.PNG';

function Page12() {
    const torqueTableColumns = [
        { header: "No.", key: "no", width: "40px", rowGroup: true },
        { header: "Part name", key: "partName", width: "180px", align: "left", rowGroup: true },
        { header: "Point Check", key: "pointCheck", width: "200px", align: "left" },
        { header: "Q'ty", key: "qty", width: "50px" },
        { header: "Torque (Kgf.cm)", key: "torque", width: "100px" },
        { header: "CF (✓)", key: "cf", width: "60px", type: "checkbox" }
    ];

    const torqueTableData = [
        { no: "1", partName: "AC motor", pointCheck: "CS M5 x 12 (SCM)", qty: "4", torque: "100", cf: "p12_24_1_cf" },
        {
            no: "2",
            partName: "LM-Guide X",
            pointCheck: "CS M5 x 20 (SCM)",
            qty: "20",
            torque: "100",
            cf: "p12_24_2a_cf"
        },
        {
            no: "2",
            partName: "LM-Guide X",
            pointCheck: "HS. CTSK M5 x 12 (SCM)",
            qty: "18",
            torque: "50",
            cf: "p12_24_2b_cf"
        },
        { no: "3", partName: "X Axis Base", pointCheck: "CS M10 x 60 (SCM)", qty: "6", torque: "450", cf: "p12_24_3_cf" },
        {
            no: "4",
            partName: "Y Axis Slider",
            pointCheck: "CS M8 x 50 (SCM)",
            qty: "8",
            torque: "250",
            cf: "p12_24_4a_cf"
        },
        {
            no: "4",
            partName: "Y Axis Slider",
            pointCheck: "CS M8 x 85 (SCM)",
            qty: "8",
            torque: "250",
            cf: "p12_24_4b_cf"
        }
    ];

    return (
        <A4Paper content={content} currentPage={12}>
            <div className="h-full relative flex flex-col text-sm">

                {/* 24. Double Check (X Axis and Y Axis) */}
                <section className="flex-1">
                    <p className="font-bold text-base mb-2">24. Double Check (X Axis and Y Axis)</p>

                    <div className="flex justify-center mb-6 mt-4">
                        <img src={torqueTableData && imgDoubleCheckXY} alt="Double Check XY Axis Diagram" className="w-100" />
                    </div>

                    <FormQuickTable
                        columns={torqueTableColumns}
                        data={torqueTableData}
                        className="w-full"
                    />

                    <div className="mt-8 flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <span>TorqueNo.</span>
                            <FormChecknumber
                                name="p12_24_torque_no"
                                label=""
                                hideLabel
                                inputClass="w-40 border-b border-black text-center"
                            />
                        </div>

                        <div className="flex gap-10">
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Operator)/Date" name="p12_24_check_by_date_op" />
                            </div>
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Leader up)/Date" name="p12_24_check_by_date_leader" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page12;