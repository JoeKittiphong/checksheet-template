import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import image54_31 from '@/assets/FAWI0002_V3/image-54-31.JPG';
import image54_32 from '@/assets/FAWI0002_V3/image-54-32.JPG';

function Page54() {
    return (
        <A4Paper content={content} currentPage={54}>
            <div className="flex flex-col text-[11px] h-full">
                <SectionTitle className="mt-0">54.3 Check Electrical Connection between Pipe and Wire(With wire threading)</SectionTitle>

                <div className="pl-6 flex flex-col gap-4 mt-2">
                    {/* Step 1: Check Zakutsu */}
                    <div className="flex gap-2">
                        <FormItemCheck
                            name="p54_check_zakutsu"
                            label="Check Zakutsu  :"
                            className="font-bold min-w-[120px]"
                        />
                        <div className="flex flex-col gap-1">
                            <p>1. Pipe Terminal move down to lower limit.</p>
                            <p>2. Change signal #171526 = 1</p>
                            <p>3. Move Wire Electrode <span className="underline font-bold">touch</span> with Sensor Plate =={'>'} Check #87103 = 1</p>
                            <p>4. Move Wire Electrode <span className="underline font-bold">touch</span> with Terminal Cap KT =={'>'} Check #87103 = 1</p>
                            <p>5. Change signal #171526 = 0</p>
                        </div>
                    </div>

                    {/* Image 1 */}
                    <div className="flex justify-center my-2">
                        <img src={image54_31} alt="Standard Position Diagram" className="h-[220px] object-contain" />
                    </div>

                    {/* Step 2: Push button */}
                    <div>
                        <FormItemCheck
                            name="p54_push_button_guide"
                            label='Push button of air solenoid valve"Guide open" so that Adjustment Cover : Open'
                        />
                    </div>

                    {/* Step 3: Change signal */}
                    <div>
                        <FormItemCheck
                            name="p54_change_signal_0500h_01"
                            label={<span>Change signal : MANAGE ➔ CHECK ➔ WIRING ➔ <span className="underline font-bold">0500H [#87329] = 01</span> : EL Unit Close</span>}
                        />
                    </div>

                    {/* Step 4: No electrical connection */}
                    <div>
                        <FormItemCheck
                            name="p54_no_electrical_conn"
                            label="No electrical connection between [EL-LOW]-[Terminal Body]"
                        />
                    </div>

                    {/* Image 2 */}
                    <div className="flex justify-center my-2">
                        <img src={image54_32} alt="Multi-Meter Check Diagram" className="h-[290px] object-contain" />
                    </div>

                    {/* Step 5: Change signal final */}
                    <div>
                        <FormItemCheck
                            name="p54_change_signal_0500h_00"
                            label={<span>Change signal : MANAGE ➔ CHECK ➔ WIRING ➔ <span className="underline font-bold">0500H [#87329] = 00</span> : EL Unit Open</span>}
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page54;