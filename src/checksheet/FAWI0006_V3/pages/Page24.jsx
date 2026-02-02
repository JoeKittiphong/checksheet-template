import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0006_V3-setting";

function Page24() {
    return (
        <A4Paper content={content} currentPage={24}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Page 24</h2>
                {/* Add content components here */}
            </div>
        </A4Paper>
    );
}

export default Page24;