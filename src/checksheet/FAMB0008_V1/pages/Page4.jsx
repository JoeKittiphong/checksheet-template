import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormLevelTableXStdAct from "@/components/FormComponents/FormLevelTableXStdAct";
import { useFormContext } from "react-hook-form";

// Images
import image7 from "@/assets/FAMB0008_V1/FAMB0008-7.PNG";

function Page4() {
    const { control } = useFormContext();

    // Configuration for Item 7
    const item7Groups = [
        {
            label: "A",
            tolerance: 0,
            sd: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
        },
        {
            label: "B",
            tolerance: 0,
            sd: ['0', '1', '2', '3', '4', '5', '6', '5', '4', '3', '2', '1', '0']
        }
    ];

    return (
        <A4Paper content={content} currentPage={4}>
            <div>
                <div className="mt-5">
                    <p className="text-sm font-bold">7. Check straightness and parallel of X-axis after assy Saddle on the Bed and put LM-guide X finish.</p>
                    <p className="text-sm font-bold mb-2">[ตรวจสอบค่าความตรงและค่าความขนานของแกน X หลังจากประกอบ Saddle ขึ้นบน Bed และใส่ LM-guide แล้ว]</p>

                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center w-[90%] mb-4">
                            <img src={image7} alt="page4_7" className="w-[400px] h-auto object-contain" />
                        </div>

                        <div className="w-full px-5">
                            {/* Inputs Row 1 */}
                            <div className="flex justify-between mb-2">
                                <div className="flex items-end gap-2 w-1/2">
                                    <FormChecknumber
                                        name="page4.parallelBarNo"
                                        label={"Parallel bar No."}
                                        control={control}
                                        className="w-full"
                                        hideLabel={true}
                                    />
                                </div>
                                <div className="flex items-end gap-2 w-1/2 pl-4">
                                    <FormChecknumber
                                        name="page4.dialGaugeNoPar"
                                        label={"Dial gauge No."}
                                        control={control}
                                        className="w-full"
                                        hideLabel={true}
                                    />
                                </div>
                            </div>

                            {/* Inputs Row 2 & 3 */}
                            <div className="flex flex-col gap-2 mb-4 ml-20">
                                <div className="flex flex-col items-start gap-2 w-1/2">
                                    <span className="text-sm whitespace-nowrap">X-LM guide Nc</span>
                                    <FormChecknumber
                                        name="page4.xlmGuideNoA"
                                        label={"A"}
                                        control={control}
                                        className="w-full"
                                        hideLabel={true}
                                    />
                                    <FormChecknumber
                                        name="page4.xlmGuideNoB"
                                        label={"B"}
                                        control={control}
                                        className="w-full"
                                        hideLabel={true}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="mb-4">
                                <FormLevelTableXStdAct
                                    name="page4.item7Data"
                                    groups={item7Groups}
                                    cols={13}
                                    control={control}
                                    showArrows={false}
                                />
                            </div>

                            {/* Footer Checkbox */}
                            <div className="flex justify-end mt-4">
                                <div className="w-40">
                                    <FormCheckedBox
                                        name="page4.checkedInfo7"
                                        label="Check by/Date"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;

