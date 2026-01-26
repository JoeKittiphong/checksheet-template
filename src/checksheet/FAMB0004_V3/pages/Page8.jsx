import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image13 from "@/assets/FAMB0004_V3/image-13.png";

function Page8() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={8}>
            <div>
                <p className="text-sm font-bold mb-10">13. Check การประกอบ Magnet plate X </p>
                <div className="flex flex-col justify-center items-center">
                    <img src={image13} alt="page8" className="w-150 mb-5" />
                    <FormCheckedBox name="page8.checkedInfo13" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;
