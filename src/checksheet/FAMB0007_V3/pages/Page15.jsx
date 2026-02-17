import React, { useEffect, useMemo } from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import ImagePointCheck from "@/components/PageComponent/ImagePointCheck";
import { useFormContext, useWatch } from "react-hook-form";

// Images
import imgMachineTop from '@/assets/FAMB0007_V3/FAMB0007-27-1.PNG';
import imgMachineBottom from '@/assets/FAMB0007_V3/FAMB0007-27-2.PNG';

function Page15() {
    const { setValue, control, register, formState: { errors } } = useFormContext();
    const isNA = useWatch({ name: 'p15_27_na', control }) === 'N/A';

    // Register fields with validation
    useEffect(() => {
        const validationRule = {
            validate: (val) => {
                if (isNA) return true;
                if (!val || !Array.isArray(val) || val.length === 0) return "Required";
                const allChecked = val.every(p => p.checked !== null && p.checked !== undefined && p.checked !== '');
                return allChecked || "All points must be checked";
            }
        };
        register('p15_27_points_top', validationRule);
        register('p15_27_points_bottom', validationRule);
    }, [register, isNA]);

    const pointsTop = useMemo(() => [
        { id: 1, x: 20, y: 8, label: "Stand\n- ด้านข้างซ้ายไม่มีรอยขีดข่วน", checked: null, textPosition: "right" },
        { id: 2, x: 10, y: 30, label: "Stone Table\n- ไม่มีรอยขีดข่วนหรือแตกร้าว\n- บริเวณรอบ ๆ Bush ต้องไม่มีรอยแตก\nหรือเสี่ยงที่จะถอนออก", checked: null, textPosition: "right" },
        { id: 3, x: 8, y: 65, label: "Stand Base 4 ตัว\n- สกรูล็อในนทุกตัว\n- มาร์คสีสกรูทุกตัว\n- หันด้านเจาะรูออกทางด้านนอก\nของเครื่องจักร", checked: null, textPosition: "right" },
        { id: 4, x: 55, y: 5, label: "Ball screw Z axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 5, x: 65, y: 25, label: "LM Guide Z axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว\n- ทาน้ำมันสนบริเวณรอบ ๆ เรียบร้อย", checked: null, textPosition: "right" },
        { id: 6, x: 73, y: 45, label: "Motor Y axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 7, x: 73, y: 67, label: "Y axis Slider\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 8, x: 73, y: 85, label: "Ball screw Y axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
    ], []);

    const pointsBottom = useMemo(() => [
        { id: 9, x: 30, y: 10, label: "Motor W axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 10, x: 18, y: 35, label: "LM Guide W axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว\n- ทาน้ำมันสนบริเวณรอบ ๆ\n เรียบร้อย", checked: null, textPosition: "right" },
        { id: 11, x: 10, y: 55, label: "Motor X axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 12, x: 7, y: 83, label: "LM Guide X axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว\n- ทาน้ำมันสนบริเวณรอบ ๆ\n เรียบร้อย", checked: null, textPosition: "right" },
        { id: 13, x: 60, y: 25, label: "Motor Z axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 14, x: 70, y: 50, label: "Ball screw X axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว", checked: null, textPosition: "right" },
        { id: 15, x: 70, y: 75, label: "LM Guide Y axis\n- สกรูล็อคแน่นทุกตัว\n- มาร์คสีสกรูทุกตัว\n- ทาน้ำมันสนบริเวณรอบ ๆ\n เรียบร้อย", checked: null, textPosition: "right" },
    ], []);

    // Automated N/A logic for Section 27
    useEffect(() => {
        if (isNA) {
            const syncNA = (points) => points.map(p => ({ ...p, checked: 'N/A' }));
            setValue('p15_27_points_top', syncNA(pointsTop));
            setValue('p15_27_points_bottom', syncNA(pointsBottom));
        }
    }, [isNA, setValue, pointsTop, pointsBottom]);

    return (
        <A4Paper content={content} currentPage={15}>
            <div className="h-full relative flex flex-col text-[13px]">

                {/* 27. Double check machine (W axis (NC)) */}
                <section className="flex-1 flex flex-col pt-2">
                    <div className="flex gap-2 items-center mb-1">
                        <p className="font-bold text-base">27. Double check machine (W axis (NC))</p>
                        <FormItemCheck name="p15_27_na" label="N/A" />
                    </div>

                    <div className="flex-1 flex flex-col justify-around">
                        {/* Top Diagram */}
                        <div className="flex justify-center items-center">
                            <ImagePointCheck
                                name="p15_27_points_top"
                                defaultValue={pointsTop}
                                backgroundImage={imgMachineTop}
                                width="185mm"
                                height="90mm"
                                disabled={isNA}
                            />
                        </div>

                        {/* Bottom Diagram */}
                        <div className="flex justify-center items-center">
                            <ImagePointCheck
                                name="p15_27_points_bottom"
                                defaultValue={pointsBottom}
                                backgroundImage={imgMachineBottom}
                                width="185mm"
                                height="90mm"
                                disabled={isNA}
                            />
                        </div>
                    </div>

                    {/* Footer - Signature Boxes */}
                    <div className="mt-8 flex justify-end">
                        <div className="flex gap-10">
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Operator)/Date" name="p15_27_check_by_date_op" />
                            </div>
                            <div className="flex flex-col items-center">
                                <FormCheckedBox label="(Leader up)/Date" name="p15_27_check_by_date_leader" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page15;