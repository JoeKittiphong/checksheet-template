
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page62() {
    return (
        <A4Paper content={content} currentPage={62}>
            <SectionTitle>19. IG-S3 Cutting check before</SectionTitle>

            <div className="p-6 space-y-6 text-sm">
                {/* Section 1 */}
                <div className="space-y-4">
                    <FormItemCheck
                        name="p62_section_1"
                        label={<span className="font-bold text-base underline">Processing and adjustment of IG-S4 t80 3rd cut</span>}
                        showCheckbox={true}
                    />
                    <div className="pl-8 space-y-4">
                        <div>
                            <p className="font-bold">→ In case of dimension NG</p>
                            <p className="ml-6">Change Disch 3-page8 -[301] KM4 SV OFST</p>
                            <p className="ml-6">Changing the value by 10 changes the dimension by 1.5~2.0um.</p>
                        </div>

                        <div>
                            <p className="font-bold">In case of surface roughness NG</p>
                            <p className="ml-6">Change Disch-Page11-[GALPM machining V6].</p>
                            <p className="ml-12">→If this is changed, return to STD-4th-t80</p>
                        </div>

                        <div>
                            <p className="font-bold">In case of surface quality NG</p>
                            <p className="ml-6">Change Disch3-Page8-[DHF SV OFST NGAL]</p>
                            <p className="ml-12">Changing the value by 50 changes the machining speed by 0.5 (for details, see P64 )</p>
                            <p className="ml-6 font-bold">Or</p>
                            <p className="ml-6">Change Disch-Page11-[GALPM machining V6]</p>
                            <p className="ml-12">→If this is changed, return to STD-4th-t80</p>
                            <p className="ml-6 font-bold">Or</p>
                            <p className="ml-6">change Disch3-page8 -[301] KM4 SV OFST</p>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-4">
                    <FormItemCheck
                        name="p62_section_2"
                        label={<span className="font-bold text-base underline">IG-S4 t40 4th cut processing adjustment</span>}
                        showCheckbox={true}
                    />
                    <div className="pl-8 space-y-4">
                        <div>
                            <p className="font-bold">— In case of dimension NG</p>
                            <p className="ml-6">Change Disch 3-page8 -[301] KM4 SV OFST</p>
                            <p className="ml-12">→ If this is changed, return to IG-S4-3rd-t80</p>
                        </div>

                        <div>
                            <p className="font-bold">In case of surface roughness NG</p>
                            <p className="ml-6">Change Disch-Page8-[ DPW PC03-23 V11]</p>
                        </div>

                        <div>
                            <p className="font-bold">In case of surface quality NG</p>
                            <p className="ml-6">Change Disch-Page8-[ DPW PC03-23 V11]</p>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-2">
                    <FormItemCheck
                        name="p62_section_3"
                        label={<span className="font-bold text-base underline">Processing and adjustment of IG-S4 t80 4th cut</span>}
                        showCheckbox={true}
                    />
                    <p className="pl-8">Only processing and judgment are performed for data collection, and no adjustment is made even in the case of NG.</p>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page62;