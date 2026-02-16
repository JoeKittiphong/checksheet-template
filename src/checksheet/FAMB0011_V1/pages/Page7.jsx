import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

// Images
import image12_21 from "@/assets/FAMB0011_V1/FAMB0011-12-21.PNG";
import image12_22 from "@/assets/FAMB0011_V1/FAMB0011-12-22.PNG";

function Page7() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={7}>
            <div className="flex flex-col h-full">

                {/* Item 12.2 */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FormItemCheck name="page7.item12_2.check" label="" />
                        <span className="text-sm font-bold">12.2 Check ทิศทางการประกอบ Bellows(Z)</span>
                    </div>

                    <div className="flex justify-around">
                        {/* OK Case */}
                        <div className="flex flex-col items-center w-1/2">
                            <div className="mb-2">
                                <FormItemCheck name="page7.item12_2.ok" label="OK" />
                            </div>
                            <div className="mb-4">
                                <img src={image12_21} alt="page7_item12_21" className="h-[250px] object-contain" />
                            </div>
                            <p className="text-center text-sm">รอยต่อของ Bellows อยู่ "ด้านหลัง" ของ Head Ass</p>
                        </div>

                        {/* NG Case */}
                        <div className="flex flex-col items-center w-1/2">
                            <div className="mb-2">
                                <FormItemCheck name="page7.item12_2.ng" label="NG" />
                            </div>
                            <div className="mb-4">
                                <img src={image12_22} alt="page7_item12_22" className="h-[250px] object-contain" />
                            </div>
                            <div className="text-center text-sm">
                                <p>รอยต่อของ Bellows อยู่ "ด้านหน้าหรืออยู่</p>
                                <p>ด้านข้าง"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto flex justify-end">
                    <div className="w-64">
                        <FormCheckedBox
                            name="page7.checkedInfo"
                            label="Check by/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;