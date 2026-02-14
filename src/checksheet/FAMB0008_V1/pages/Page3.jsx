import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormLevelTableXStdAct from "@/components/FormComponents/FormLevelTableXStdAct";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image5 from "@/assets/FAMB0008_V1/FAMB0008-5.PNG";
import image6 from "@/assets/FAMB0008_V1/FAMB0008-6.PNG";

function Page3() {
    const { control } = useFormContext();

    // Configuration for Item 6
    const item6Groups = [
        {
            label: "A",
            tolerance: 4,
            sd: ['0', '0', '0', '0', '0', '0', 'Ø', '0', '0', '0', '0', '0', '0']
        },
        {
            label: "B",
            tolerance: 4,
            sd: ['←20', '←15', '←10', '←5', '0', '0', '0', '0', '0', '5→', '10→', '15→', '20→']
        }
    ];

    return (
        <A4Paper content={content} currentPage={3}>
            <div>
                {/* Item 5 */}
                <div className="mt-5">
                    <p className="text-sm font-bold">5. Leveling check X-axis. (Data from MA) [เช็คค่าระดับน้ำแกน X จาก MA]</p>
                    <div className="flex flex-col justify-center items-center">
                        <img src={image5} alt="page3_1" className="w-[400px] mb-2" />

                        <div className="flex justify-between items-end">
                            <div className="w-[70%]">
                                <FormLevelTableXAB
                                    name="page3.item5Data"
                                    cols={13}
                                    labelA="A=Kb"
                                    labelB="B"
                                    control={control}
                                    defaultValue={{
                                        // Note: FormLevelTableXAB uses 'b' for labelA and 'a' for labelB internally in mapping
                                        b: { 6: '0' } // Column 7 (index 6) default 0
                                    }}
                                />
                            </div>
                            <div className="w-[28%] flex flex-col justify-end">
                                <FormChecknumber
                                    name="page3.levelGaugeNo5"
                                    label="Level gauge No."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 6 */}
                <div className="mt-10">
                    <p className="text-sm font-bold">6. Check leveling X-axis after assy Saddle on the Bed. [ตรวจสอบค่าระดับน้ำแกน X หลังจากประกอบ Saddle ขึ้นบน Bed]</p>
                    <div className="flex flex-col">
                        <div className="w-full flex justify-between h-full">
                            <img src={image6} alt="page3_2" className="w-[400px] mb-2 self-center" />
                            <div className="mt-4 p-2">
                                <FormChecknumber
                                    name="page3.levelGaugeNo6"
                                    label="Level gauge No."
                                    className="mb-4"
                                />
                                <div className="mt-4">
                                    <FormCheckedBox
                                        name="page3.checkedInfo"
                                        label="CHECKED BY / DATE"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="w-[85%]">
                                <FormLevelTableXStdAct
                                    name="page3.item6Data"
                                    groups={item6Groups}
                                    cols={13}
                                    control={control}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;

