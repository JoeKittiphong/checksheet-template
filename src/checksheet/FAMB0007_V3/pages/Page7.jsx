import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormTableEntoSingleDir from '@/components/FormComponents/FormTableEntoSingleDir';
import imgSide from '@/assets/FAMB0007_V3/FAMB0007-18-1.PNG';
import imgFront from '@/assets/FAMB0007_V3/FAMB0007-18-2.PNG';

function Page7() {
    return (
        <A4Paper content={content} currentPage={7}>
            <div className="h-full relative flex flex-col">
                {/* 18. Ento Data Check */}
                <div className="">
                    <p className="font-bold mb-2">18. Ento data check (Z Axis)</p>
                    <div className="flex gap-8">
                        {/* Side View */}
                        <div className="flex-1">
                            <p className="font-bold mb-2 text-center">SIDE</p>
                            <div className="flex flex-col items-center">
                                {/* Image Placeholder - User needs to add image */}
                                <div className="w-full flex justify-center">
                                    <FormTableEntoSingleDir
                                        name="p7_ento_side"
                                        topHeader="[X-Axis = 150 mm] [Y-Axis = 300-400 mm]"
                                        sections={[{ cols: ['Z1', 'Z2'] }]} // Using Z1, Z2 as requested in Item 18
                                        rowCount={16}
                                        standard={{ min: 0, max: 30 }}
                                        headerImage={imgSide}
                                        headerControl={{
                                            entoNo: "p7_ento_no_side",
                                            selection: "p7_ento_side_selection"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Front View */}
                        <div className="flex-1">
                            <p className="font-bold mb-2 text-center">FRONT</p>
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-center">
                                    <FormTableEntoSingleDir
                                        name="p7_ento_front"
                                        topHeader="[X-Axis = 150 mm] [Y-Axis = 300-400 mm]"
                                        sections={[{ cols: ['Z1', 'Z2'] }]}
                                        rowCount={16}
                                        standard={{ min: 0, max: 20 }}
                                        headerImage={imgFront}
                                        headerControl={{
                                            entoNo: "p7_ento_no_front",
                                            selection: "p7_ento_front_selection"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between mt-10 w-[88%] ml-10'>
                        <div className="mt-4 flex gap-2 items-center text-sm font-bold">
                            <FormChecknumber label="Thickness of Spacer (ความหนาของ Spacer) =" name="p7_spacer_thickness" hideLabel inputClass="w-32 border-b border-black text-center" />
                            <span>mm</span>
                        </div>
                        <FormCheckedBox label="Checked By / Date" name="p7_ento_side_selection" />
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;