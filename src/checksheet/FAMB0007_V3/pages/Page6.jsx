import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormEDMTableStraightness from '@/components/FormComponents/FormEDMTableStraightness';

function Page6() {
    return (
        <A4Paper content={content} currentPage={6}>
            <div className="h-full relative flex flex-col">
                <div className="mb-4 flex-1 mt-4">
                    <p className="font-bold mb-2">17. Straightness (TOP)</p>
                    <div className="flex gap-4 mb-4">
                        {/* 17.1 X axis */}
                        <div className="flex-1">
                            <FormEDMTableStraightness title="Straight of X Axis" name="p7_str_x" rowCount={16} standard={5} />
                        </div>
                        {/* 17.2 Y axis */}
                        <div className="flex-1">
                            <FormEDMTableStraightness title="Straight of Y Axis" name="p7_str_y" rowCount={21} standard={5} />
                        </div>
                    </div>

                    <div className="flex justify-between items-end mt-4 text-xs font-bold">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-1">
                                <FormChecknumber label="Dial guage No." name="p7_dial_gauge_no" hideLabel inputClass="w-20 h-5 border-b border-black text-center" />
                            </div>
                            <div className="flex items-center gap-1">
                                <FormChecknumber label="Straight or parallel No." name="p7_straight_parallel_no" hideLabel inputClass="w-20 h-5 border-b border-black text-center" />
                            </div>
                        </div>

                        <FormCheckedBox
                            name="p7_checked_by"
                            label="Check By/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;