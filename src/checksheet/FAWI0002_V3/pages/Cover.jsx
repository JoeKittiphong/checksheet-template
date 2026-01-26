import React from 'react';
import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../FAWI0002_V3-setting";

function Cover() {
    return <CoverPage headerData={{ ...cover, model: meta.model }} />;
}

export default Cover;