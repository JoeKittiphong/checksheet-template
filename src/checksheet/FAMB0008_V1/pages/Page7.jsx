import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormCeramicCheckEDM from "@/components/FormComponents/FormCeramicCheckEDM";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormEDMLevelCeramic from "@/components/FormComponents/FormEDMLevelCeramic";
import { useFormContext } from "react-hook-form";

// Images
import image17 from "@/assets/FAMB0008_V1/FAMB0008-13.PNG"; // Fallback from image-19

function Page7() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={7}>
            <div>
                <p className="text-sm font-bold mb-5">16.  CERAMIC BASE CHECK</p>
                <div className="ml-10">
                    <FormCeramicCheckEDM
                        name="page7.ceramicData"
                        standard={{ min: -10, max: 10 }}
                        parallelStandard={5}
                        defaultValue={{
                            tl: '', tc: '', tr: '',
                            ml: '', mc: '', mr: '',
                            bl: '', br: ''
                        }}
                    />
                    <div className="flex justify-between ml-30 mr-10">
                        <div className="mt-5 space-y-2">
                            <FormChecknumber
                                name="page7.dialGaugeNo"
                                label="Dial gauge No."
                            />
                            <FormChecknumber
                                name="page7.ceramicBaseNo"
                                label="Ceramic base No."
                            />
                        </div>
                        <FormCheckedBox name="page7.checkedInfo16" />
                    </div>
                </div>
                <p className="text-sm font-bold mb-5 mt-10">17. LEVELING CERAMIC BASE CHECK</p>
                <div>
                    <div>
                        <div className="flex">
                            <img src={image17} alt="page7" className="w-80 mb-10 ml-5 mr-10" />
                            <FormEDMLevelCeramic
                                name="page7.levelCeramicData"
                                standardX={30}
                                standardY={30}
                                defaultValue={{
                                    x: {
                                        tl: '', tc: '', tr: '',
                                        ml: '', mr: '',
                                        bl: '', bc: '', br: ''
                                    },
                                    y: {
                                        tl: '', tc: '', tr: '',
                                        ml: '', mr: '',
                                        bl: '', bc: '', br: ''
                                    }
                                }}
                            />
                        </div>
                        <div className="mt-5 flex justify-between ml-30 mr-10">
                            <FormChecknumber
                                name="page7.levelingGuageNo"
                                label="Leveling gauge No."
                            />
                            <FormCheckedBox name="page7.checkedInfo17" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;

