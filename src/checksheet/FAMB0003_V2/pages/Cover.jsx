import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../FAMB0003_V2-setting";

function Cover() {
    return (
        <CoverPage headerData={{ ...cover, model: meta.model }} />
    );
}

export default Cover;
