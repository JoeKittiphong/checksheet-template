import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0005_V2-setting";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image7_1 from "@/assets/FAMB0005_V2/image-7-1.PNG";
import image7_2 from "@/assets/FAMB0005_V2/image-7-2.PNG";

function Page4() {
    const { control } = useFormContext();

    // Configuration for Page 4 (Section 7)
    // Axes: X-Axis, Y-Axis
    const axesConfig = [
        { key: 'x', label: 'X-Axis' },
        { key: 'y', label: 'Y-Axis' }
    ];

    // Default values
    // page4.coilTubeData71.x.in/out
    // page4.coilTubeData71.y.in/out
    const defaultData = {
        x: { in: null, out: null },
        y: { in: null, out: null }
    };

    return (
        <A4Paper content={content} currentPage={4}>
            <div>
                <p className="text-sm font-bold mb-10">7. CHECK การประกอบสาย tube (in,out) เข้ากับ Hose connector ที่ linear coil แกน X และ Y
                    <br /><span className="text-xs font-normal">(ก่อนประกอบ Table เข้ากับ Bed และ ก่อนประกอบ Arm-X เข้ากับ Bed-U)</span>
                </p>

                {/* 7.1 */}
                <div className="mb-10">
                    <p className="text-sm mb-2">7.1 Check การ lock hose connecotor แกน X, Y</p>
                    <div className="flex">
                        <div className="mr-5 w-60 flex justify-center items-center overflow-hidden">
                            {/* Image 7-1 */}
                            <img src={image7_1} alt="7.1 Check lock hose connector" className="w-100" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page4.coilTubeData71"
                                axes={axesConfig}
                                defaultValue={defaultData}
                            />
                        </div>
                        <FormCheckedBox name="page4.checkedInfo71" />
                    </div>
                </div>

                {/* 7.2 */}
                <div>
                    <p className="text-sm mb-2">7.2 Check การดึงสาย tube ที่ต่อกับ Hose connector ของ Linear Coil แกน X,Y</p>
                    <div className="flex">
                        <div className="mr-5 w-60 flex justify-center items-center overflow-hidden">
                            {/* Image 7-2 */}
                            <img src={image7_2} alt="7.2 Check pull tube" className="w-100" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page4.coilTubeData72"
                                axes={axesConfig}
                                defaultValue={defaultData}
                            />
                        </div>
                        <FormCheckedBox name="page4.checkedInfo72" />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;