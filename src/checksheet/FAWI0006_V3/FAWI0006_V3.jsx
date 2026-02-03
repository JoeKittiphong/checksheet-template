import React from "react";
import ChecksheetMaster from "@/components/ChecksheetMaster";
import { meta, apiEndpoint } from "./FAWI0006_V3-setting";

// Pages
import Cover from "./pages/Cover";
import Blankpage from "./pages/Blankpage";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Page9 from "./pages/Page9";
import Page10 from "./pages/Page10";
import Page11 from "./pages/Page11";
import Page12 from "./pages/Page12";
import Page13 from "./pages/Page13";
import Page14 from "./pages/Page14";
import Page15 from "./pages/Page15";
import Page16 from "./pages/Page16";

function FAWI0006V3() {
    const pages = [
        <Cover />,
        <Blankpage />,
        <Page1 />,
        <Page2 />,
        <Page3 />,
        <Page4 />,
        <Page5 />,
        <Page6 />,
        <Page7 />,
        <Page8 />,
        <Page9 />,
        <Page10 />,
        <Page11 />,
        <Page12 />,
        <Page13 />,
        <Page14 />,
        <Page15 />,
        <Page16 />
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
        "Page 7",
        "Page 8",
        "Page 9",
        "Page 10",
        "Page 11",
        "Page 12",
        "Page 13",
        "Page 14",
        "Page 15",
        "Page 16",
    ];

    return (
        <ChecksheetMaster
            config={{ meta, apiEndpoint }}
            pages={pages}
            pageLabels={pageLabels}
        />
    );
}

export default FAWI0006V3;
