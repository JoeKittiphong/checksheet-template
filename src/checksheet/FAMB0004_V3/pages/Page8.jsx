import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image14_1 from "@/assets/FAMB0004_V3/image-14-1.PNG";
import image14_2 from "@/assets/FAMB0004_V3/image-14-2.PNG";

function Page8() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={8}>
            <div>
                <p className="text-sm font-bold mb-10">14. Check การประกอบสาย tube (in,out) เข้ากับ Hose connector ที่ linear coil แกน X และ Y
                    (ก่อนประกอบ Saddle เข้ากับ Bed และ ก่อนประกอบ Quill base เข้ากับ Saddle)</p>
                <div className="mb-10">
                    <p className="text-xs mb-2">14.1 Check การ lock hose connecotor แกน X, Y</p>
                    <div className="flex">
                        <div className="mr-5">
                            <img src={image14_1} alt="page7" className="w-60" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page7.coilTubeData121"
                                defaultValue={{
                                    x: { in: false, out: false },
                                    ykc: { in: false, out: false },
                                    ykb: { in: false, out: false }
                                }}
                            />
                        </div>
                        <FormCheckedBox name="page7.checkedInfo121" />
                    </div>
                </div>
                <div>
                    <p className="text-xs mb-2">14.2 Check การดึงสาย tube ที ่ต่อกับ Hose connector ของ Linear Coil แกน X,Y</p>
                    <div className="flex">
                        <div className="mr-5">
                            <img src={image14_2} alt="page7" className="w-60" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page7.coilTubeData122"
                                defaultValue={{
                                    x: { in: false, out: false },
                                    ykc: { in: false, out: false },
                                    ykb: { in: false, out: false }
                                }}
                            />
                        </div>
                        <FormCheckedBox name="page7.checkedInfo122" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page8;
