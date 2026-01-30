import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";

function Page36() {
    return (
        <A4Paper content={content} currentPage={36}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Page 36</h2>
                {/* Add content components here */}
            </div>
        </A4Paper>
    );
}

export default Page36;