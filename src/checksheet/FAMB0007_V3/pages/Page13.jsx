import React, { useEffect } from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import imgDoubleCheckZWa from '@/assets/FAMB0007_V3/FAMB0007-25-1.PNG';
import imgDoubleCheckZWb from '@/assets/FAMB0007_V3/FAMB0007-25-2.PNG';
import { useFormContext, useWatch } from 'react-hook-form';

function Page13() {
    const { setValue } = useFormContext();
    const isNA = useWatch({ name: 'p13_25_na' }) === 'N/A';

    // Automated N/A logic for Section 25
    useEffect(() => {
        if (isNA) {
            const fieldsToNA = Array.from({ length: 12 }, (_, i) => `p13_25_${i + 1}_cf`);
            fieldsToNA.forEach(field => setValue(field, 'N/A'));
            setValue('p13_25_torque_no', '-');
        }
    }, [isNA, setValue]);

    const torqueTableColumns = [
        { header: "No.", key: "no", width: "40px" },
        { header: "Part name", key: "partName", width: "180px", align: "left" },
        { header: "Point Check", key: "pointCheck", width: "200px", align: "left" },
        { header: "Q'ty", key: "qty", width: "50px" },
        { header: "Torque (Kgf.cm)", key: "torque", width: "100px" },
        { header: "CF (✓)", key: "cf", width: "60px", type: "checkbox" }
    ];

    const torqueTableData = [
        { no: "1", partName: "Hook (W)", pointCheck: "CS M10 x 25 (SCM)", qty: "1", torque: "450", cf: "p13_25_1_cf" },
        { no: "2", partName: "Motor Z", pointCheck: "CS M4 x 12 (SUS)", qty: "4", torque: "50", cf: "p13_25_2_cf" },
        { no: "3", partName: "Motor W", pointCheck: "CS M4 x 12 (SCM)", qty: "4", torque: "50", cf: "p13_25_3_cf" },
        { no: "4", partName: "W Axis motor mount", pointCheck: "CS M6 x 50 (SCM)", qty: "3", torque: "150", cf: "p13_25_4_cf" },
        { no: "5", partName: "Bearing Holder", pointCheck: "CS M4 x 10 (SUS)", qty: "3", torque: "50", cf: "p13_25_5_cf" },
        { no: "6", partName: "Ball Screw", pointCheck: "CS M4 x 12 (SUS)", qty: "4", torque: "50", cf: "p13_25_6_cf" },
        { no: "7", partName: "Nut Block (DC)", pointCheck: "CS M6 x 35 (SCM)", qty: "3", torque: "150", cf: "p13_25_7_cf" },
        { no: "8", partName: "P motor mount", pointCheck: "CS M6 x 40 (SCM)", qty: "2", torque: "150", cf: "p13_25_8_cf" },
        { no: "9", partName: "Bearing Holder", pointCheck: "CS M4 x 10 (SUS)", qty: "3", torque: "50", cf: "p13_25_9_cf" },
        { no: "10", partName: "Ball Screw", pointCheck: "CS M4 x12 (SCM)", qty: "4", torque: "50", cf: "p13_25_10_cf" },
        { no: "11", partName: "LM Guide", pointCheck: "CS M5 x 20 (SCM)", qty: "18", torque: "100", cf: "p13_25_11_cf" },
        { no: "12", partName: "Rail Presser", pointCheck: "CS M4 x 10 (SCM)", qty: "9", torque: "40", cf: "p13_25_12_cf" }
    ];

    return (
        <A4Paper content={content} currentPage={13}>
            <div className="h-full relative flex flex-col text-sm">

                {/* 25. Double check (Z Axis and W Axis (NC)) */}
                <section className="flex-1">
                    <div className="flex gap-2 items-center mb-2">
                        <p className="font-bold text-base">25. Double check (Z Axis and W Axis (NC))</p>
                        <FormItemCheck name="p13_25_na" label="N/A" />
                    </div>

                    <div className="flex justify-center gap-10 mb-6 mt-4">
                        <img src={imgDoubleCheckZWb} alt="Double Check W Axis Diagram" className="w-100" />
                    </div>

                    <FormQuickTable
                        columns={torqueTableColumns}
                        data={torqueTableData}
                        className="w-full"
                        disabled={isNA}
                    />

                    <div className="mt-8 flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <span>TorqueNo.</span>
                            <FormChecknumber
                                name="p13_25_torque_no"
                                label=""
                                hideLabel
                                disabled={isNA}
                                inputClass="w-40 border-b border-black text-center"
                            />
                        </div>

                        <div className="flex gap-10">
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Operator)/Date" name="p13_25_check_by_date_op" />
                            </div>
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Leader up)/Date" name="p13_25_check_by_date_leader" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page13;