import React from 'react';
import ChecksheetMaster from "@/components/ChecksheetMaster";
import { meta, apiEndpoint } from "./ASSY_PROBLEM-setting";
import Page1 from "./pages/Page1";

function ASSY_PROBLEM() {
    const pages = [
        <Page1 apiEndpoint={apiEndpoint} />
    ];

    const pageLabels = [
        "Page 1"
    ];

    return (
        <ChecksheetMaster
            config={{ meta, apiEndpoint }}
            pages={pages}
            pageLabels={pageLabels}
        />
    );
}

export default ASSY_PROBLEM;
