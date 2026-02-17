import React, { useEffect } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormEDMTableStraightness from '@/components/FormComponents/FormEDMTableStraightness';
import InputWithArrow from '@/components/FormComponents/InputWithArrow';

// Images
import image15 from "@/assets/FAMB0007_V3/FAMB0007-15.PNG";

const FormInputWithArrow = ({ name, control, ...props }) => (
    <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
            <InputWithArrow
                value={field.value}
                onChange={field.onChange}
                {...props}
            />
        )}
    />
);

function Page5() {
    const { control, setValue } = useFormContext();

    // Watch X and Y axis values
    const xValues = useWatch({
        control,
        name: ['p5_x_axis_3', 'p5_x_axis_2c', 'p5_x_axis_1']
    });

    const yValues = useWatch({
        control,
        name: ['p5_y_axis_3', 'p5_y_axis_2c', 'p5_y_axis_1']
    });

    // Calculate Max Diff X
    useEffect(() => {
        const validValues = xValues.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (validValues.length > 0) {
            const max = Math.max(...validValues);
            const min = Math.min(...validValues);
            const diff = (max - min); // removed toFixed to let FormChecknumber handle display or just string
            setValue('p5_max_diff_x', diff.toFixed(3)); // Keeping uniform precision
        } else {
            setValue('p5_max_diff_x', '');
        }
    }, [xValues, setValue]);

    // Calculate Max Diff Y
    useEffect(() => {
        const validValues = yValues.map(v => parseFloat(v)).filter(n => !isNaN(n));
        if (validValues.length > 0) {
            const max = Math.max(...validValues);
            const min = Math.min(...validValues);
            const diff = (max - min);
            setValue('p5_max_diff_y', diff.toFixed(3));
        } else {
            setValue('p5_max_diff_y', '');
        }
    }, [yValues, setValue]);

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="h-full relative flex flex-col">
                {/* 15. Stone Table Leveling Check */}
                <div className="mb-6">
                    <p className="font-bold mb-4">15. Stone Table Leveling Check (SD = 30 μm)</p>
                    <div className="flex gap-8 items-start">
                        {/* Diagram */}
                        <div>
                            <img src={image15} alt="Stone Table Diagram" className="w-[200px] h-auto" />
                        </div>

                        {/* Tables */}
                        <div className="flex gap-6">
                            {/* X-axis Table (Vertical) */}
                            <div className="flex flex-col items-center">
                                <p className="font-bold mb-1">X axis</p>
                                <div className="border border-black">
                                    {/* Row 3 */}
                                    <div className="flex border-b border-black">
                                        <div className="w-16 h-8 flex items-center justify-center border-r border-black font-bold text-center">3</div>
                                        <div className="w-24 h-8 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_x_axis_3" control={control} axis="x" className="w-full text-center" />
                                        </div>
                                    </div>
                                    {/* Row 2 = C */}
                                    <div className="flex border-b border-black">
                                        <div className="w-16 h-8 flex items-center justify-center border-r border-black font-bold text-center">2 = C</div>
                                        <div className="w-24 h-8 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_x_axis_2c" control={control} axis="x" className="w-full text-center" />
                                        </div>
                                    </div>
                                    {/* Row 1 */}
                                    <div className="flex">
                                        <div className="w-16 h-8 flex items-center justify-center border-r border-black font-bold text-center">1</div>
                                        <div className="w-24 h-8 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_x_axis_1" control={control} axis="x" className="w-full text-center" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm flex items-center gap-1">
                                    <FormChecknumber label="Max diff X =" name="p5_max_diff_x" hideLabel inputClass="w-16 h-6 text-center border-b border-black" />
                                    <span>μm</span>
                                </div>
                            </div>

                            {/* Y-axis Table (Horizontal) */}
                            <div className="flex flex-col items-center ml-2">
                                <p className="font-bold mb-1">Y axis</p>
                                <div className="border border-black flex">
                                    {/* Col 3 */}
                                    <div className="flex flex-col border-r border-black">
                                        <div className="w-15 h-8 flex items-center justify-center border-b border-black font-bold">3</div>
                                        <div className="w-15 h-10 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_y_axis_3" control={control} axis="y" className="w-full text-center" />
                                        </div>
                                    </div>
                                    {/* Col 2 = C */}
                                    <div className="flex flex-col border-r border-black">
                                        <div className="w-15 h-8 flex items-center justify-center border-b border-black font-bold">2 = C</div>
                                        <div className="w-15 h-10 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_y_axis_2c" control={control} axis="y" className="w-full text-center" />
                                        </div>
                                    </div>
                                    {/* Col 1 */}
                                    <div className="flex flex-col">
                                        <div className="w-15 h-8 flex items-center justify-center border-b border-black font-bold">1</div>
                                        <div className="w-15 h-10 flex items-center justify-center p-1">
                                            <FormInputWithArrow name="p5_y_axis_1" control={control} axis="y" className="w-full text-center" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm flex items-center gap-1 self-start">
                                    <FormChecknumber label="Max diff Y =" name="p5_max_diff_y" hideLabel inputClass="w-16 h-6 text-center border-b border-black" />
                                    <span>μm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 ml-64 pl-8">
                        <div className="flex items-center gap-2">
                            <FormChecknumber label="Level gauge No." name="p5_level_gauge_no" hideLabel inputClass="w-20 h-6 border-b border-black" />
                        </div>
                    </div>
                </div>

                {/* 16. Straightness (SIDE) */}
                <div className="mb-4 flex-1">
                    <p className="font-bold mb-2">16. Straightness (SIDE)</p>
                    <div className="flex gap-4 mb-4">
                        {/* 16.1 X axis */}
                        <div className="flex-1">
                            <FormEDMTableStraightness title="Straight of X Axis" name="p5_str_x" rowCount={16} standard={5} />
                        </div>
                        {/* 16.2 Y axis */}
                        <div className="flex-1">
                            <FormEDMTableStraightness title="Straight of Y Axis" name="p5_str_y" rowCount={21} standard={5} />
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-4 text-xs font-bold">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-1">
                                <FormChecknumber label="Dial guage No." name="p5_dial_gauge_no" hideLabel inputClass="w-20 h-5 border-b border-black" />
                            </div>
                            <div className="flex items-center gap-1">
                                <FormChecknumber label="Straight or parallel No." name="p5_straight_parallel_no" hideLabel inputClass="w-20 h-5 border-b border-black" />
                            </div>
                        </div>

                        <FormCheckedBox
                            name="p5_checked_by"
                            label="Check By/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;