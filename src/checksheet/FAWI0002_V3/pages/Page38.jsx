import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import RDI graph image
import rdiGraph from '@/assets/FAWI0002_V3/image-41.JPG';

function Page38() {
    return (
        <A4Paper content={content} currentPage={38}>
            <div className="flex flex-col gap-4">
                <SectionTitle>41. RDI Tension Check</SectionTitle>

                <div className="flex justify-center mt-2">
                    <img
                        src={rdiGraph}
                        alt="RDI Tension Check Graph"
                        className="w-[90%] border border-gray-300 shadow-sm"
                    />
                </div>

                <div className="ml-10 mt-4 flex flex-col gap-6">
                    <FormItemCheck
                        name="p38_41_1_dummy"
                        showCheckbox={false}
                        label={<span className="text-sm">1. WS30~130 (MAX):</span>}
                        input={{
                            name: "p38_ws_max_val",
                            suffix: "g(STD: 1450 ~ 1550g)",
                            width: "200px",
                            minStd: 1450,
                            maxStd: 1550
                        }}
                    />

                    <div className="mt-2 flex flex-col gap-1">
                        <p className="text-sm">
                            2. Save กราฟ RDI ลงในเครื่องจักร <span className="text-gray-600">[Drive(C:) &gt;&gt; Program files &gt;&gt; M4H &gt;&gt; Log]</span>
                        </p>
                        <p className="ml-5 text-sm text-red-600 italic">
                            โดยตั้งชื่อไฟล์ ดังนี้ &gt;&gt; "ALxxxG_Txxxx_TEN.png"
                        </p>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page38;