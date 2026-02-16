import React from 'react';
import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0016_V2-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

// Images
import image7 from "@/assets/FAMB0016_V2/FAMB0016-7.PNG";

function Page5() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="flex flex-col h-full font-sans p-4 text-[13px] leading-tight">

                {/* 7. PARALLEL LM-GUIDE CHECK */}
                <h2 className="font-bold mb-4 uppercase">7. PARALLEL LM-GUIDE CHECK (เช็คค่าความขนานของ LM-GUIDE)</h2>

                <div className="flex flex-col items-center mb-8">
                    <img src={image7} alt="Parallel LM-Guide Diagram" className="w-[450px] mb-6" />

                    <div className="w-full px-4">
                        <div className="flex items-center gap-10 mb-2">
                            <p className="font-bold underline uppercase">Data Check</p>
                            <p className="font-bold">STD = 5 µm</p>
                        </div>

                        <FormLevelTableXAB
                            name="page5.parallelCheck"
                            cols={9}
                            labelA="B ( KB )"      // Bottom Row
                            labelB="A"            // Top Row
                            control={control}
                            showArrows={false}
                            standards={Array(9).fill({ min: 0, max: 5 })}
                            validateStd={true}
                            defaultValue={{
                                b: { 0: '0' } // B (KB) has 0 at point 1
                            }}
                            className="border-black shadow-sm"
                        />
                    </div>
                </div>

                {/* 8. PART RECORD */}
                <h2 className="font-bold mb-4 uppercase">8. PART RECORD</h2>

                <div className="px-8 space-y-3 flex-1">
                    <FormChecknumber
                        name="page5.partRecord.lmGuide"
                        label="NUMBER LM-GUIDE"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />
                    <FormChecknumber
                        name="page5.partRecord.cylinder"
                        label="NUMBER SUPER MYCRO CYLINDER"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />
                    <FormChecknumber
                        name="page5.partRecord.coilKB"
                        label="NUMBER COIL (KB)"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />
                    <FormChecknumber
                        name="page5.partRecord.coilKC"
                        label="NUMBER COIL (KC)"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />

                    <div className="flex items-center gap-6">
                        <FormChecknumber
                            name="page5.partRecord.magnet"
                            label="NUMBER MAGNET (L)"
                            inputWidth="w-72"
                            inputClass="border-b border-black text-center"
                            hideBottomBorder={true}
                        />
                        <div className="flex gap-4 items-center">
                            <FormItemCheck name="page5.partRecord.magnetJM" label="JM" />
                            <FormItemCheck name="page5.partRecord.magnetCM" label="CM" />
                        </div>
                    </div>

                    <FormChecknumber
                        name="page5.partRecord.linearScale"
                        label="NUMBER LINEAR SCALE"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />
                    <FormChecknumber
                        name="page5.partRecord.quill"
                        label="NUMBER QUILL"
                        inputWidth="w-72"
                        inputClass="border-b border-black text-center"
                        hideBottomBorder={true}
                    />
                </div>

                {/* Footer Signature Box */}
                <div className="flex justify-end mt-4">
                    <div>
                        <FormCheckedBox
                            name="page5.checkedInfo"
                            label="Checked By / Date"
                        />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page5;
