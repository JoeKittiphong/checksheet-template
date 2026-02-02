import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0006_V3-setting";

function Page9() {
    return (
        <A4Paper content={content} currentPage={9}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Page 9</h2>
                {/* Add content components here */}
            </div>
        </A4Paper>
    );
}

export default Page9;