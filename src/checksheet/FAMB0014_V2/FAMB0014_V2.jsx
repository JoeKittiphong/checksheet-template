import React from "react";
import ChecksheetMaster from "@/components/ChecksheetMaster";
import { meta, apiEndpoint } from "./FAMB0014_V2-setting";

// Pages
import Cover from "./pages/Cover";
import Blankpage from "./pages/Blankpage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";

function FAMB0014V2() {
    const pages = [
        <Cover />,
        <Blankpage />,
        <Page1 />,
        <Page2 />,
        <Page3 />,
        <Page4 />,
        <Page5 />,
        <Page6 />,
    ];

    const pageLabels = [
        "Cover",
        "Blank",
        "Page 1",
        "Page 2",
        "Page 3",
        "Page 4",
        "Page 5",
        "Page 6",
    ];

    return (
        <ChecksheetMaster
            config={{ meta, apiEndpoint }}
            pages={pages}
            pageLabels={pageLabels}
        />
    );
}

export default FAMB0014V2;
