import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import SectionTitle from '@/components/UIcomponent/SectionTitle';

import imgLevelDiagram from '@/assets/FAWI0002_V3/image-30-1.JPG';
import imgValveMark from '@/assets/FAWI0002_V3/image-30-2.JPG';

function Page30() {
    return (
        <A4Paper content={content} currentPage={30}>
            <div>

                {/* 29.3 Aspirator check conclusion */}
                <div className="flex flex-col gap-2">
                    <SectionTitle>29.3 After adjust the Speed Control finish. (หลังจากที่ปรับ Speed Control เสร็จแล้ว)</SectionTitle>
                    <div className="ml-10 flex flex-col gap-2">
                        <FormItemCheck
                            name="p30_29_3_cleaning"
                            label={<span className="text-sm">Cleaning the Roller of Wire Eject. (ทำความสะอาดที่ Roller ของ Wire Eject)</span>}
                        />
                        <FormItemCheck
                            name="p30_29_3_lock"
                            label={<span className="text-sm">Lock Speed Control. (ล็อค Speed Control)</span>}
                        />
                    </div>
                    <div className="mt-4 flex justify-end pr-10">
                        <FormCheckedBox name="p30_29_3_sig" label="Checked by :" />
                    </div>
                </div>

                {/* 30. Water Level in Process Tank Check */}
                <div className="flex flex-col gap-4">
                    <SectionTitle>30. Water Level in Process Tank Check</SectionTitle>

                    <div className="ml-5 flex flex-col gap-6">
                        <p className="text-sm">- Confirm Valve of Supply Tank was open</p>

                        <div className="flex items-start gap-10">
                            <div className="flex-1 flex flex-col gap-4">
                                <p className="text-sm">- Water full Process Tank (เปิดน้ำขึ้นเต็ม Process Tank)</p>
                                <div className="ml-5 flex flex-col gap-3">
                                    <FormItemCheck
                                        name="p30_water_level_ok"
                                        label={<span className="text-sm">OK water level not decrease 3 minute (ระดับน้ำไม่ลดลง)</span>}
                                    />
                                    <FormItemCheck
                                        name="p30_water_level_ng"
                                        label={<span className="text-sm">NG water level was decrease (ระดับน้ำลดลง)</span>}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <FormItemCheck
                                            name="p30_water_level_repair"
                                            label={<span className="text-sm">Repair (Water leaked check)</span>}
                                        />
                                        <div className="ml-10 flex items-center gap-4">
                                            <div className="flex flex-col gap-1">
                                                <FormItemCheck
                                                    name="p30_water_level_mark_gate"
                                                    label={<span className="text-sm">Mark Gate Value</span>}
                                                />
                                                <p className="text-xs text-gray-600 ml-8">(มาร์คสีขาวที่วาล์ว)</p>
                                            </div>
                                            <img src={imgValveMark} alt="Valve Mark" className="h-28 rounded shadow-sm border border-gray-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <img src={imgLevelDiagram} alt="Level Diagram" className="h-32 object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end pr-10">
                        <FormCheckedBox name="p30_water_level_sig" label="Checked by :" />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page30;