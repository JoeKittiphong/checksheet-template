import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import FormInputCheckSTD from "@/components/FormComponents/FormInputCheckStd";

// Images
import image10_2 from "@/assets/FAMB0011_V1/FAMB0011-10-2.PNG";
import image11 from "@/assets/FAMB0011_V1/FAMB0011-11.PNG";
import image12_1 from "@/assets/FAMB0011_V1/FAMB0011-12-1.PNG";

function Page6() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={6}>
            <div className="flex flex-col h-full">

                {/* Item 10.2 */}
                <div className="mb-6">
                    <p className="text-sm font-bold mb-2 ml-4">10.2 Check การดึงสาย Tube ที่ต่อกับ Hose connector ของ Linear Coil แกน Z ทั้งสองข้าง</p>
                    <div className="flex px-4 items-start">
                        {/* Image */}
                        <div className="mr-5">
                            <img src={image10_2} alt="page6_item10_2" className="w-[200px]" />
                        </div>

                        {/* Component */}
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page6.item10_2.pullCheck"
                                axes={[
                                    { key: 'zkb', label: 'Z axis (KB)' },
                                    { key: 'zpara', label: 'Z axis (KB)' }
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Item 11 */}
                <div className="mb-6">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <p className="text-sm font-bold mb-4">11. Cylinder Check (ตรวจสอบ Cylinder ก่อนการประกอบ)</p>

                            <div className="pl-4 mb-4">
                                <p className="text-sm mb-2">11.1 Check Cylinder before ass'y</p>
                                <div className="space-y-2 ml-4">
                                    <div className="flex items-start">
                                        <FormItemCheck name="page6.item11_1.shaft" label="" />
                                        <span className="ml-2 text-sm">Cylinder ไม่มีรอยบุบและความเสียหายที่ Shaft ก่อนการประกอบ</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FormItemCheck name="page6.item11_1.bkt" label="" />
                                        <span className="ml-2 text-sm">Cylinder BKT ไม่มีจุดเสียหาย ก่อนการประกอบ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pl-4">
                                <p className="text-sm mb-2">11.2 Setting STD of Cylinder</p>
                                <div className="ml-8 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm w-32">STD</span>
                                        <span className="text-sm">= 15 ± 0.5 mm.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm w-32">DATA CHECK =</span>
                                        <FormInputCheckSTD
                                            name="page6.item11_2.data15"
                                            label=""
                                            minStd={14.5}
                                            maxStd={15.5}
                                            inputWidth="w-40"
                                            showCheckbox={false}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-sm w-32">STD</span>
                                        <span className="text-sm">= 41 ± 0.5 mm.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm w-32">DATA CHECK =</span>
                                        <FormInputCheckSTD
                                            name="page6.item11_2.data41"
                                            label=""
                                            minStd={40.5}
                                            maxStd={41.5}
                                            inputWidth="w-40"
                                            showCheckbox={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[300px]">
                            <img src={image11} alt="page6_item11" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Item 12 */}
                <div className="flex-1">
                    <p className="text-sm font-bold mb-4">12. Bellows(Z) Check (ตรวจสอบ Bellows ก่อนการประกอบ)</p>
                    <div className="pl-4 flex items-start gap-2 mb-4">
                        <FormItemCheck name="page6.item12_1.check" label="" />
                        <span className="text-sm font-bold">12.1 Check Bellows(Z) spec (ตรวจสอบ Spec ของ Bellows)</span>
                    </div>

                    <div className="flex justify-between px-4">
                        <div className="flex-1 mr-4">
                            <img src={image12_1} alt="page6_item12" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-64">
                            <div className="mb-8">
                                <FormQuickTable
                                    headerRows={[
                                        [
                                            { header: "Specification", colSpan: 2, className: "bg-white text-center" }
                                        ]
                                    ]}
                                    columns={[
                                        { header: "", key: "label", width: "50%", className: "text-center" },
                                        { header: "", key: "value", width: "50%", className: "text-center" }
                                    ]}
                                    data={[
                                        { label: "Max", value: "600" },
                                        { label: "Min", value: "70" },
                                        { label: "จำนวนครีบ", value: "20" }
                                    ]}
                                    className="w-full"
                                />
                            </div>

                            <div className="w-full">
                                <FormCheckedBox
                                    name="page6.checkedInfo"
                                    label="Check by/Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page6;