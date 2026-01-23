import CoverPage from "@/pages/CoverPage";
import { cover, meta } from "../FAMB0002v2-setting";

function Cover() {
    return (
        <CoverPage headerData={{ ...cover, model: meta.model }} />
    );
}

export default Cover;