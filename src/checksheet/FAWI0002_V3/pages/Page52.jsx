import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import assets
import image54_1 from '@/assets/FAWI0002_V3/image-54-1.JPG';

function Page52() {
    return (
        <A4Paper content={content} currentPage={52}>
            <div className="flex flex-col text-[11px] relative h-full">
                <SectionTitle className="mt-0">54. AWT UNIT CHECK</SectionTitle>

                <div className="pl-4 flex flex-col gap-2">
                    <span className="font-bold text-sm">54.1 Air Tube Connection Check</span>

                    {/* Part 1: 051AH */}
                    <div className="flex flex-col gap-1 pl-4">
                        <div className="flex items-center gap-2">
                            <span>- Change signal : [MANAGE =={">"} CHECK =={">"} WIRING (Page 4)]</span>
                        </div>
                        <div className="pl-8 flex flex-col gap-1">
                            <span className="font-bold underline italic text-blue-700">051AH [#87341] TENSION ON = 01 <span className="font-normal text-black italic text-[10px]">................................ (Refer figure 3)</span></span>
                            <FormItemCheck name="p52_check_air_pipe" label="Check air from [Pipe]" />
                            <p className="text-[10px] text-gray-600">(เปลี่ยน Signal 051AH [#87341] = 01 แล้วตรวจสอบว่ามีลมออกมาจาก Pipe และ Pipe Guide หรือไม่)</p>
                            <FormItemCheck name="p52_after_check_051ah" label={<span>After check : <span className="font-bold underline italic text-blue-700">Change 051AH [#87341] = 00</span></span>} />
                        </div>
                    </div>

                    {/* Part 2: 050EH */}
                    <div className="flex flex-col gap-1 pl-4 mt-2">
                        <div className="flex items-center gap-2">
                            <span>- Change signal : [MANAGE =={">"} CHECK =={">"} WIRING (Page 4)]</span>
                        </div>
                        <div className="pl-8 flex flex-col gap-1">
                            <span className="font-bold underline italic text-blue-700">050EH [#87336] DISPOSAL ARM HAND = 01 <span className="font-normal text-black italic text-[10px]">.............. (Refer figure 4)</span></span>
                            <FormItemCheck name="p52_check_speed_retry" label="Check Speed Controller at Retry Unit ==> 4 round OPEN" />
                            <FormItemCheck name="p52_check_air_retry" label="Check air from [Anneal Cooling Air] & [Retry Nozzle]" />
                            <p className="text-[10px] text-gray-600">(เปลี่ยน Signal 050EH [#87336] = 01 แล้วตรวจสอบว่ามีลมออกมาจาก Cooling Air และ Retry Nozzle หรือไม่)</p>
                            <FormItemCheck name="p52_after_check_050eh" label={<span>After check : <span className="font-bold underline italic text-blue-700">Change 050EH [#87336] = 00</span></span>} />
                        </div>
                    </div>

                    {/* Diagram and Overlay Checkboxes */}
                    <div className="relative mt-4 self-center pr-2">
                        <img src={image54_1} alt="Air Check Diagrams" className="h-[550px] object-contain" />

                        {/* 0504H Section positioning (based on image reference) */}
                        <div className="absolute bottom-[215px] left-[40px] flex flex-col gap-3">
                            <FormItemCheck name="p52_check_air_popup"/>
                            <FormItemCheck name="p52_after_check_0504h" />
                        </div>

                        {/* Interactive Checkboxes on image */}
                        {/* Pipe Up/Down Adjustment cover */}
                        <div className="absolute bottom-[190px] right-[170px]">
                            <FormItemCheck name="p52_adj_cover_close" label="" showCheckbox={true} className="!p-0" />
                        </div>
                        <div className="absolute bottom-[190px] right-[-10px]">
                            <FormItemCheck name="p52_adj_cover_open" label="" showCheckbox={true} className="!p-0" />
                        </div>

                        {/* Slide Block L */}
                        <div className="absolute bottom-[55px] right-[170px]">
                            <FormItemCheck name="p52_slide_block_close" label="" showCheckbox={true} className="!p-0" />
                        </div>
                        <div className="absolute bottom-[55px] right-[-10px]">
                            <FormItemCheck name="p52_slide_block_open" label="" showCheckbox={true} className="!p-0" />
                        </div>

                        {/* Bottom Note Checkbox */}
                        <div className="absolute bottom-[33px] right-[300px]">
                            <FormItemCheck name="p52_bottom_note_check" label="" showCheckbox={true} className="!p-0" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page52;