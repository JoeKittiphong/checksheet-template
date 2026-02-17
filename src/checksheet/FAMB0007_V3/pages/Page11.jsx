import React, { useEffect } from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import imgWManual from '@/assets/FAMB0007_V3/FAMB0007-22-3.PNG';
import imgDoubleCheck from '@/assets/FAMB0007_V3/FAMB0007-23.PNG';
import { useFormContext, useWatch } from 'react-hook-form';

function Page11() {
    const { setValue } = useFormContext();
    const isNA = useWatch({ name: 'p11_22_na' }) === 'N/A';

    // Automated N/A logic for Section 22
    useEffect(() => {
        if (isNA) {
            const fieldsToNA = [
                'p11_22_1_check',
                'p11_22_2_check',
                'p11_22_3_check'
            ];
            fieldsToNA.forEach(field => setValue(field, 'N/A'));

            const inputsToDash = [
                'p11_22_3_dist',
                'p11_22_3_force',
                'p11_22_3_fg_no'
            ];
            inputsToDash.forEach(field => setValue(field, '-'));
        }
    }, [isNA, setValue]);

    const torqueTableColumns = [
        { header: "No.", key: "no", width: "40px" },
        { header: "Part name", key: "partName", width: "180px", align: "left" },
        { header: "Point Check", key: "pointCheck", width: "180px", align: "left" },
        { header: "Q'ty", key: "qty", width: "50px" },
        { header: "Torque (Kgf.cm)", key: "torque", width: "100px" },
        { header: "CF (✓)", key: "cf", width: "60px", type: "checkbox" }
    ];

    const torqueTableData = [
        { no: "1", partName: "Stay Base A, B, C, D", pointCheck: "CS M10 x 25 (SCM)", qty: "16", torque: "450", cf: "p11_23_1_cf" },
        { no: "2", partName: "Stone Table", pointCheck: "CS M10 x 40 (SCM)", qty: "4", torque: "200", cf: "p11_23_2_cf" },
        { no: "3", partName: "Y motor mount", pointCheck: "CS M6 x 20 (SCM)", qty: "4", torque: "150", cf: "p11_23_3_cf" },
        { no: "4", partName: "AC motor", pointCheck: "CS M4 x 12 (SCM)", qty: "4", torque: "50", cf: "p11_23_4_cf" },
        {
            no: "5",
            partName: "LM-Guide Y",
            pointCheck: "CS M8 x 30 (SCM)",
            qty: "18",
            torque: "250",
            cf: "p11_23_5a_cf",
            rowGroup: true // For partName and no
        },
        {
            no: "5",
            partName: "LM-Guide Y",
            pointCheck: "Hex S. Flat M8 x 16 (SCM)",
            qty: "18",
            torque: "50",
            cf: "p11_23_5b_cf",
            rowGroup: true
        }
    ];

    // Additional configuration for row grouping
    const columnsWithGrouping = torqueTableColumns.map(col => {
        if (col.key === 'no' || col.key === 'partName') {
            return { ...col, rowGroup: true };
        }
        return col;
    });

    return (
        <A4Paper content={content} currentPage={11}>
            <div className="h-full relative flex flex-col text-sm">

                {/* 22. W axis manual */}
                <section className="mb-6">
                    <div className="flex gap-2 items-center mb-2">
                        <p className="font-bold text-base">22. Check point of option : W axis manual</p>
                        <div className="flex items-center gap-2">
                            <FormItemCheck name="p11_22_na" label="N/A" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <FormItemCheck
                            name="p11_22_1_check"
                            label="22.1 หมุน Handel ขึ้นจนสุด Stroke ไม่มีอาการฝืดหรือฟรีขณะหมุน"
                            readOnly={isNA}
                        />
                        <FormItemCheck
                            name="p11_22_2_check"
                            label="22.2 หมุน Handel ลงจนสุด Stroke ไม่มีอาการฝืดหรือฟรีขณะหมุน"
                            readOnly={isNA}
                        />
                        <div className="space-y-2">
                            <FormItemCheck
                                name="p11_22_3_check"
                                label="22.3 ตรวจสอบความตึงของลวดด้วย Force gauge"
                                readOnly={isNA}
                            />
                            <div className="pl-8 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span>ระยะดึงลวดสลิง =</span>
                                    <FormInputCheckSTD
                                        name="p11_22_3_dist"
                                        label=""
                                        unit="mm"
                                        minStd={5}
                                        maxStd={5}
                                        inputWidth="w-24"
                                        disabled={isNA}
                                    />
                                    <span>(SD = 5 mm)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>แรงดึงของลวดสลิง =</span>
                                    <FormInputCheckSTD
                                        name="p11_22_3_force"
                                        label=""
                                        unit="N"
                                        minStd={28}
                                        maxStd={30}
                                        inputWidth="w-24"
                                        disabled={isNA}
                                    />
                                    <span>(SD = 28-30 N)</span>
                                    <span className="ml-4">Force gauge no.</span>
                                    <FormChecknumber
                                        name="p11_22_3_fg_no"
                                        label=""
                                        hideLabel
                                        disabled={isNA}
                                        inputClass="w-40 border-b border-black text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <img src={imgWManual} alt="W Axis Manual Diagram" className="w-50" />
                        </div>
                    </div>
                </section>

                {/* 23. Double Check (Stand and Table) */}
                <section className="flex-1">
                    <p className="font-bold text-base mb-2">23. Double Check (Stand and Table)</p>

                    <div className="flex justify-center gap-8 mb-4">
                        <img src={imgDoubleCheck} alt="Double Check Diagrams" className="w-100" />
                    </div>

                    <FormQuickTable
                        columns={columnsWithGrouping}
                        data={torqueTableData}
                        className="w-full"
                    />

                    <div className="mt-6 flex justify-between items-end">
                        <div className="flex items-center gap-2">
                            <span>TorqueNo.</span>
                            <FormChecknumber
                                name="p11_23_torque_no"
                                label=""
                                hideLabel
                                inputClass="w-40 border-b border-black text-center"
                            />
                        </div>

                        <div className="flex gap-10">
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Operator)/Date" name="p11_23_check_by_date_op" />
                            </div>
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Leader up)/Date" name="p11_23_check_by_date_leader" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page11;