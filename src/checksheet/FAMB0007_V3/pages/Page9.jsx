import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormTablePitchCheck from '@/components/FormComponents/FormTablePitchCheck';

function Page9() {
    return (
        <A4Paper content={content} currentPage={9}>
            <div className="h-full relative flex flex-col">
                {/* 20. Pitch Check */}
                <div className="">
                    <p className="font-bold mb-2">20. Pitch Check</p>

                    <div className="flex gap-2">
                        {/* X Axis */}
                        <div className="flex-1">
                            <FormTablePitchCheck
                                name="p9_pitch_x"
                                axisLabel="X Axis"
                                rowCount={21} // 400 down to 0
                                disableTopRows={5} // Disable 400, 380, 360, 340, 320 (5 rows)
                            />
                        </div>
                        {/* Y Axis */}
                        <div className="flex-1">
                            <FormTablePitchCheck
                                name="p9_pitch_y"
                                axisLabel="Y Axis"
                                rowCount={21} // 400 down to 0
                                disableTopRows={0} // No disable
                            />
                        </div>
                        {/* Z Axis */}
                        <div className="flex-1">
                            <FormTablePitchCheck
                                name="p9_pitch_z"
                                axisLabel="Z Axis"
                                rowCount={21}
                                disableTopRows={5}
                            />
                        </div>
                        {/* W Axis */}
                        <div className="flex-1">
                            <FormTablePitchCheck
                                name="p9_pitch_w"
                                axisLabel="W Axis"
                                rowCount={21}
                                disableTopRows={5}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-10">
                        <div className="flex gap-4 items-end">
                            <FormChecknumber label="Pitch Master No." name="p9_pitch_master_no" hideLabel inputClass="w-32 border-b border-black text-center" />
                            <FormChecknumber label="Dial guage No." name="p9_dial_guage_no" hideLabel inputClass="w-32 border-b border-black text-center" />
                        </div>
                        <FormCheckedBox label="Check By/Date" name="p9_check_by_date" />
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page9;