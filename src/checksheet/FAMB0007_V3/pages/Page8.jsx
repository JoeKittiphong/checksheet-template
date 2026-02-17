import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0007_V3-setting";
import FormChecknumber from '@/components/FormComponents/FormChecknumber';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormTableEntoSingleDir from '@/components/FormComponents/FormTableEntoSingleDir';
import imgSide from '@/assets/FAMB0007_V3/FAMB0007-19-1.PNG';
import imgFront from '@/assets/FAMB0007_V3/FAMB0007-19-2.PNG';

function Page8() {
    return (
        <A4Paper content={content} currentPage={8}>
            <div className="h-full relative flex flex-col">
                {/* 19. Ento Data Check (W Axis) */}
                <div className="">
                    <p className="font-bold mb-2">19. Ento data check (W Axis)</p>

                    <div className="flex gap-4">
                        {/* SIDE VIEW */}
                        <div className="flex-1">
                            <p className="font-bold mb-2 text-center">SIDE</p>
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-center">
                                    <FormTableEntoSingleDir
                                        name="p8_ento_side"
                                        topHeader="[X-Axis = 150 mm] [Y-Axis = 300-400 mm]"
                                        sections={[{ cols: ['W1', 'W2'] }]}
                                        rowCount={13} // 0 to 240, step 20 -> 13 rows
                                        standard={{ min: 0, max: 30 }}
                                        headerImage={imgSide}
                                        headerControl={{
                                            entoNo: "p8_ento_no_side",
                                            selection: "p8_ento_side_selection"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FRONT VIEW */}
                        <div className="flex-1">
                            <p className="font-bold mb-2 text-center">FRONT</p>
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-center">
                                    <FormTableEntoSingleDir
                                        name="p8_ento_front"
                                        topHeader="[X-Axis = 150 mm] [Y-Axis = 300-400 mm]"
                                        sections={[{ cols: ['W1', 'W2'] }]}
                                        rowCount={13} // 0 to 240
                                        standard={{ min: 0, max: 20 }}
                                        headerImage={imgFront}
                                        headerControl={{
                                            entoNo: "p8_ento_no_front",
                                            selection: "p8_ento_front_selection"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end mt-10'>
                        <FormCheckedBox label="Check By/Date" name="p8_check_by_date" />
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;