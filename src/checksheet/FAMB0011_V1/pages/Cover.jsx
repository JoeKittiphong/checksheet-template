import React from 'react';
import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../FAMB0011_V1-setting";

function Cover() {
    return <CoverPage headerData={{ ...cover, model: meta.model }} />;
}

export default Cover;