
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page61() {
    return (
        <A4Paper content={content} currentPage={61}>
            <SectionTitle>19. IG-S3 Cutting check before</SectionTitle>

            <div className="p-8 space-y-6">
                <div className="text-center font-bold text-xl mb-8">
                    Change the vertical nozzle diameter to Φ4
                </div>

                <div className="space-y-6 pl-4">
                    <FormItemCheck
                        name="p61_check_1"
                        label="Upper guide nozzle: P.C. 3082998 NOZZLE G4 (86-2/90-1)[86-2 4.0]"
                        showCheckbox={true}
                    />
                    <FormItemCheck
                        name="p61_check_2"
                        label="Bottom Guide Nozzle: P.C. J44608C FLOAT NOZZLE E4 FJ HS[D4 FJ-AWT]"
                        showCheckbox={true}
                    />
                    <FormItemCheck
                        name="p61_check_3"
                        label="Adjusting the gap between the workpiece and upper nozzle to 0.2mm"
                        showCheckbox={true}
                    />
                    <FormItemCheck
                        name="p61_check_4"
                        label="Confirm that 136]DHF SV CHANGE is 1 (round head 2)."
                        showCheckbox={true}
                    />
                    <div>
                        <FormItemCheck
                            name="p61_check_5"
                            label={<span>Always use a micrometer with a <span className="font-bold">Φ3mm</span> stylus to measure dimensions</span>}
                            showCheckbox={true}
                        />
                        <div className="ml-8 mt-1 text-sm text-gray-700">
                            Be sure to check this page before proceeding with machining.
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page61;