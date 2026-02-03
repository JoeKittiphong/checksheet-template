import React from 'react';
import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../FAWI0038_V2-setting";

function Cover() {
    return <CoverPage headerData={{ ...cover, model: meta.model }} />;
}

export default Cover;