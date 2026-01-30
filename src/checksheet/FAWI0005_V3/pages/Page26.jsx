import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page26() {
    return (
        <A4Paper content={content} currentPage={26}>
            <div className="flex flex-col text-[14px] h-full relative p-10 text-black">

                <div className="font-bold text-[18px] mb-10">
                    Check fallowing Items if you see Wire is broken during cutting.
                </div>

                <div className="space-y-12">
                    {/* Item 1 */}
                    <div className="space-y-4">
                        <FormItemCheck
                            name="p26_check1"
                            label="1. Check Pressure of Flushing during cutting. STD is 2.3~2.5 MPa."
                            className="font-bold gap-3"
                        />
                        <div className="pl-10 space-y-2 font-bold">
                            <div>Check setting fallowing (1) and (2) if it is not STD.</div>
                            <div className="pl-6">(1) Manege-Parameter-Machine-Page4-WP CTRL 1 ORDER : HSP Spec=<span className="underline">033760000</span></div>
                            <div className="pl-6">(2) Manege-Parameter-Disch-Page1-WP MAX : HSP Spec=<span className="underline">975</span></div>
                            <div className="pt-2">Call EL Staff to check setting of Inverter if you confirm setting value '(1) and (2) is no probllem.</div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <FormItemCheck
                        name="p26_check2"
                        label="2. Check Float Nozzles and Wire Guides, there are no dameged."
                        className="font-bold gap-3"
                    />

                    {/* Item 3 */}
                    <FormItemCheck
                        name="p26_check3"
                        label="3. Check Condutivity Pieces whether is their locked completely."
                        className="font-bold gap-3"
                    />

                    {/* Item 4 */}
                    <FormItemCheck
                        name="p26_check4"
                        label="4. Check Liquid Level in machine tank is in STD or not."
                        className="font-bold gap-3"
                    />

                    {/* Item 5 */}
                    <div className="space-y-4">
                        <FormItemCheck
                            name="p26_check5"
                            label="5. Recheck Cutting Spped refer to Page19~20 (for 0.20mm)"
                            className="font-bold gap-3"
                        />
                        <div className="pl-16 pt-8 font-bold italic">
                            Call Eng Staff if you can not solve poroblem in spite of all actions.
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page26;