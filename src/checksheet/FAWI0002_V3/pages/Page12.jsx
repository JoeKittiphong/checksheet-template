import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Images
import img13_0 from '@/assets/FAWI0002_V3/image-13-0.JPG';

function Page12() {
    return (
        <A4Paper content={content} currentPage={12}>
            <div className="flex flex-col gap-4">
                <SectionTitle>13. PIKA Relay operation Check</SectionTitle>

                <div className="ml-4 relative min-h-[700px]">
                    {/* Front side Section - Positioning top center-ish */}
                    <div className="flex flex-col items-center">
                        <div className="p-1 border border-black  bg-white z-10">
                            <FormItemCheck
                                name="p12_front_side_check"
                                label={<div className="text-center font-bold">Front side<br />(AL400/600 common)</div>}
                            />
                        </div>
                        <img src={img13_0} alt="PIKA Relay Check" className="w-160 h-auto mt-[-20px]" />

                        {/* 
                          Since image-13-0.JPG likely contains the whole layout of diagrams, 
                          I will place the other 2 checkboxes at approximate locations 
                          to match the reference layout provided in the screenshot.
                        */}
                        <div className="absolute top-[58%] left-[68%] w-40 border border-black p-1 bg-white shadow-sm">
                            <FormItemCheck
                                name="p12_backside_al600_check"
                                label={<div className="text-center font-bold">Backseide<br />(AL600)</div>}
                            />
                        </div>

                        <div className="absolute top-[64%] left-[14%] w-40 border border-black p-1 bg-white shadow-sm">
                            <FormItemCheck
                                name="p12_backside_al400_check"
                                label={<div className="text-center font-bold">Backside<br />(AL400)</div>}
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute top-[30%] left-[8%] flex justify-end mt-auto pb-4">
                    <FormCheckedBox name="p12_checked_by" label="Checked by :" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page12;