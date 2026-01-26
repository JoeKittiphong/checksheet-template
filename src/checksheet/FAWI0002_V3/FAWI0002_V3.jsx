import React from "react";
import ChecksheetMaster from "@/components/ChecksheetMaster";
import { meta, apiEndpoint } from "./FAWI0002_V3-setting";

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
import Page17 from "./pages/Page17";
import Page18 from "./pages/Page18";
import Page19 from "./pages/Page19";
import Page20 from "./pages/Page20";
import Page21 from "./pages/Page21";
import Page22 from "./pages/Page22";
import Page23 from "./pages/Page23";
import Page24 from "./pages/Page24";
import Page25 from "./pages/Page25";
import Page26 from "./pages/Page26";
import Page27 from "./pages/Page27";
import Page28 from "./pages/Page28";
import Page29 from "./pages/Page29";
import Page30 from "./pages/Page30";
import Page31 from "./pages/Page31";
import Page32 from "./pages/Page32";
import Page33 from "./pages/Page33";
import Page34 from "./pages/Page34";
import Page35 from "./pages/Page35";
import Page36 from "./pages/Page36";
import Page37 from "./pages/Page37";
import Page38 from "./pages/Page38";
import Page39 from "./pages/Page39";
import Page40 from "./pages/Page40";
import Page41 from "./pages/Page41";
import Page42 from "./pages/Page42";
import Page43 from "./pages/Page43";
import Page44 from "./pages/Page44";
import Page45 from "./pages/Page45";
import Page46 from "./pages/Page46";
import Page47 from "./pages/Page47";
import Page48 from "./pages/Page48";
import Page49 from "./pages/Page49";
import Page50 from "./pages/Page50";
import Page51 from "./pages/Page51";
import Page52 from "./pages/Page52";
import Page53 from "./pages/Page53";
import Page54 from "./pages/Page54";
import Page55 from "./pages/Page55";
import Page56 from "./pages/Page56";
import Page57 from "./pages/Page57";
import Page58 from "./pages/Page58";

function FAWI0002V3() {
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
        <Page16 />,
        <Page17 />,
        <Page18 />,
        <Page19 />,
        <Page20 />,
        <Page21 />,
        <Page22 />,
        <Page23 />,
        <Page24 />,
        <Page25 />,
        <Page26 />,
        <Page27 />,
        <Page28 />,
        <Page29 />,
        <Page30 />,
        <Page31 />,
        <Page32 />,
        <Page33 />,
        <Page34 />,
        <Page35 />,
        <Page36 />,
        <Page37 />,
        <Page38 />,
        <Page39 />,
        <Page40 />,
        <Page41 />,
        <Page42 />,
        <Page43 />,
        <Page44 />,
        <Page45 />,
        <Page46 />,
        <Page47 />,
        <Page48 />,
        <Page49 />,
        <Page50 />,
        <Page51 />,
        <Page52 />,
        <Page53 />,
        <Page54 />,
        <Page55 />,
        <Page56 />,
        <Page57 />,
        <Page58 />,
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
        "Page 17",
        "Page 18",
        "Page 19",
        "Page 20",
        "Page 21",
        "Page 22",
        "Page 23",
        "Page 24",
        "Page 25",
        "Page 26",
        "Page 27",
        "Page 28",
        "Page 29",
        "Page 30",
        "Page 31",
        "Page 32",
        "Page 33",
        "Page 34",
        "Page 35",
        "Page 36",
        "Page 37",
        "Page 38",
        "Page 39",
        "Page 40",
        "Page 41",
        "Page 42",
        "Page 43",
        "Page 44",
        "Page 45",
        "Page 46",
        "Page 47",
        "Page 48",
        "Page 49",
        "Page 50",
        "Page 51",
        "Page 52",
        "Page 53",
        "Page 54",
        "Page 55",
        "Page 56",
        "Page 57",
        "Page 58",
    ];

    return (
        <ChecksheetMaster
            config={{ meta, apiEndpoint }}
            pages={pages}
            pageLabels={pageLabels}
        />
    );
}

export default FAWI0002V3;
