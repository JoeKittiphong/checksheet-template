import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Conductivity check images
import upperOk from "@/assets/FAWI0005_V3/page127_upper_ok.png";
import upperNg from "@/assets/FAWI0005_V3/page127_upper_ng.png";
import slideUpper from "@/assets/FAWI0005_V3/page127_slide_upper.png";
import slideLower from "@/assets/FAWI0005_V3/page127_slide_lower.png";
import jigUpper from "@/assets/FAWI0005_V3/page127_jig_upper.png";
import lwrenchUpper from "@/assets/FAWI0005_V3/page127_lwrench_upper.png";
import jigLower from "@/assets/FAWI0005_V3/page127_jig_lower.png";
import lwrenchLower from "@/assets/FAWI0005_V3/page127_lwrench_lower.png";

function Page127() {

    // Helper for image with error fallback
    const Img = ({ src, alt, className = "" }) => (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.innerHTML = `<div class="bg-gray-200 flex items-center justify-center text-red-500 font-bold border border-dashed border-red-500 text-[8px] p-2 ${className}">${alt}</div>`;
            }}
        />
    );

    return (
        <A4Paper content={content} currentPage={127}>
            <div className="px-4 py-2 font-sans text-[10px]">
                <SectionTitle>26. Conductivity replace Before cut Frequency servo GALPM Cutting check [Thickness=80mm-4th]</SectionTitle>

                {/* Conductivity Parts Check Before change */}
                <div className="mt-2">
                    <FormItemCheck
                        name="p127_conductivity_check"
                        label="Conductivity Parts Check Before change [ก่อนเปลี่ยน ตรวจสอบ Conduct ตัวใหม่]"
                        showCheckbox
                        checkboxSize="w-4 h-4"
                        labelClassName="text-xs font-bold underline"
                    />
                </div>

                {/* Upper Guide & Lower Guide OK/NG with photos */}
                <div className="mt-2 flex gap-4">
                    {/* Left: Checkboxes */}
                    <div className="w-1/3 space-y-3">
                        <div>
                            <p className="font-bold underline text-xs mb-1">Upper Guide</p>
                            <div className="flex items-center gap-4">
                                <FormItemCheck name="p127_upper_ok" label="OK" showCheckbox checkboxSize="w-4 h-4" labelClassName="text-xs" />
                                <FormItemCheck name="p127_upper_ng" label="NG" showCheckbox checkboxSize="w-4 h-4" labelClassName="text-xs" />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold underline text-xs mb-1">Lower Guide</p>
                            <div className="flex items-center gap-4">
                                <FormItemCheck name="p127_lower_ok" label="OK" showCheckbox checkboxSize="w-4 h-4" labelClassName="text-xs" />
                                <FormItemCheck name="p127_lower_ng" label="NG" showCheckbox checkboxSize="w-4 h-4" labelClassName="text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* Right: OK / NG photos */}
                    <div className="w-2/3 flex gap-4">
                        <div className="text-center">
                            <Img src={upperOk} alt="Upper Guide OK" className="h-[80px] object-contain" />
                            <p className="font-bold mt-1">OK</p>
                        </div>
                        <div className="text-center">
                            <Img src={upperNg} alt="Upper Guide NG" className="h-[80px] object-contain" />
                            <p className="font-bold mt-1">NG</p>
                        </div>
                    </div>
                </div>

                {/* Check slide blocks */}
                <div className="mt-3">
                    <FormItemCheck
                        name="p127_slide_block_check"
                        label="Check the slide blocks U and Slide Block L after test Cut [หลังตัดงามตรวจสอบ Slide Block U และ Slide Block L]"
                        showCheckbox
                        checkboxSize="w-4 h-4"
                        labelClassName="text-xs font-bold underline"
                    />

                    <div className="flex gap-8 mt-2 justify-center">
                        <div className="text-center">
                            <p className="font-bold text-xs mb-1">Slide block (upper guide)</p>
                            <Img src={slideUpper} alt="Slide block upper" className="h-[100px] object-contain" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-xs mb-1">Slide block (lower guide)</p>
                            <Img src={slideLower} alt="Slide block lower" className="h-[100px] object-contain" />
                        </div>
                    </div>
                </div>

                {/* Upper Guide - Jig & L-Wrench */}
                <div className="mt-3">
                    <FormItemCheck
                        name="p127_upper_guide_section"
                        label="Upper Guide"
                        showCheckbox
                        checkboxSize="w-4 h-4"
                        labelClassName="text-xs font-bold underline"
                    />

                    <div className="flex gap-4 mt-2">
                        {/* Left: Jig */}
                        <div className="w-1/2">
                            <FormItemCheck
                                name="p127_upper_jig"
                                label="ใช้ jig ในการประกอบ Conductivity piece"
                                showCheckbox
                                checkboxSize="w-4 h-4"
                                labelClassName="text-[10px]"
                            />
                            <p className="text-[10px] ml-6 mt-1">ให้อยู่ที่ตรงกลาง ที่ Upper Guide จะมีช่องว่างด้านละ 5 mm.</p>
                            <div className="mt-2 flex justify-center">
                                <Img src={jigUpper} alt="Jig Upper Guide" className="h-[100px] object-contain" />
                            </div>
                        </div>

                        {/* Right: L-Wrench */}
                        <div className="w-1/2">
                            <FormItemCheck
                                name="p127_upper_lwrench"
                                label="ใช้ L-Wrench กดเพื่อทดสอบความแน่น"
                                showCheckbox
                                checkboxSize="w-4 h-4"
                                labelClassName="text-[10px]"
                            />
                            <p className="text-[10px] ml-6 mt-1">หลัง การถอด Conductivity piece</p>
                            <div className="mt-2 flex justify-center">
                                <Img src={lwrenchUpper} alt="L-Wrench Upper Guide" className="h-[100px] object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lower Guide - Jig & L-Wrench */}
                <div className="mt-3">
                    <FormItemCheck
                        name="p127_lower_guide_section"
                        label="Lower Guide"
                        showCheckbox
                        checkboxSize="w-4 h-4"
                        labelClassName="text-xs font-bold underline"
                    />

                    <div className="flex gap-4 mt-2">
                        {/* Left: Jig */}
                        <div className="w-1/2">
                            <FormItemCheck
                                name="p127_lower_jig"
                                label="ใช้ jig ในการประกอบ Conductivity piece"
                                showCheckbox
                                checkboxSize="w-4 h-4"
                                labelClassName="text-[10px]"
                            />
                            <p className="text-[10px] ml-6 mt-1">ให้อยู่ที่ตรงกลาง ที่ Lower Guide จะมีช่องว่างด้านละ 5 mm.</p>
                            <div className="mt-2 flex justify-center">
                                <Img src={jigLower} alt="Jig Lower Guide" className="h-[100px] object-contain" />
                            </div>
                        </div>

                        {/* Right: L-Wrench */}
                        <div className="w-1/2">
                            <FormItemCheck
                                name="p127_lower_lwrench"
                                label="ใช้ L-Wrench กดเพื่อทดสอบความแน่น"
                                showCheckbox
                                checkboxSize="w-4 h-4"
                                labelClassName="text-[10px]"
                            />
                            <p className="text-[10px] ml-6 mt-1">หลัง การถอด Conductivity piece</p>
                            <div className="mt-2 flex justify-center">
                                <Img src={lwrenchLower} alt="L-Wrench Lower Guide" className="h-[100px] object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Date / Changed by */}
                <div className="mt-4 pt-2 w-full flex justify-end">
                    <FormCheckedBox name="p127_checked" label="Change Date / Changed by" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page127;