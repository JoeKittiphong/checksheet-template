import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0011_V1-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";

// Images
import image9 from "@/assets/FAMB0011_V1/FAMB0011-9.PNG";
import image10_1 from "@/assets/FAMB0011_V1/FAMB0011-10-1.PNG";

function Page5() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="flex flex-col h-full">

                {/* Item 9 */}
                <div className="mb-6">
                    <p className="text-sm font-bold mb-2">9. ตรวจสอบการล็อค Lm-guide block เข้ากับ Quill support B</p>

                    <div className="flex justify-center mb-4">
                        <img src={image9} alt="page5_item9" className="w-[400px]" />
                    </div>

                    <div className="w-full mb-2">
                        <table className="w-full border-collapse border border-black text-xs">
                            <thead>
                                <tr className="bg-gray-100 h-10">
                                    <th className="border border-black p-2 w-24">ตำแหน่ง</th>
                                    <th className="border border-black p-2">
                                        ผลการตรวจสอบการล็อค<br />(Check by operator)
                                    </th>
                                    <th className="border border-black p-2">
                                        Confirm ผลการตรวจสอบการล็อค<br />(Approve by leader up)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black p-4 text-center font-bold text-lg">1-16</td>
                                    <td className="border border-black p-2">
                                        <div className="flex justify-center gap-8">
                                            <FormItemCheck name="page5.item9.op_ok" label="OK" />
                                            <FormItemCheck name="page5.item9.op_ng" label="NG" />
                                        </div>
                                    </td>
                                    <td className="border border-black p-2">
                                        <div className="flex justify-center gap-8">
                                            <FormItemCheck name="page5.item9.leader_ok" label="OK" />
                                            <FormItemCheck name="page5.item9.leader_ng" label="NG" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs font-bold text-red-600">หมายเหตุ : ถ้า Leader up ยังไม่ confirm ผลการตรวจสอบการล็อคสกรู ห้าม Body นำ Head assy นี้ไปประกอบโดยเด็ดขาด</p>
                </div>

                {/* Item 10 */}
                <div className="mb-4 flex-1">
                    <p className="text-sm font-bold mb-2">10. Check การประกอบสาย tube (in,out) เข้ากับ Hose connector ที่ linear coil แกน Z</p>
                    <p className="text-sm font-bold mb-4 ml-4">(ก่อนประกอบ Linear coil เข้ากับ Quill support A ทั้งสองด้าน)</p>

                    <div className="mb-5">
                        <p className="text-sm mb-2 ml-4">10.1 Check การ lock hose connecotor แกน Z</p>
                        <div className="flex px-4">
                            <div className="mr-5 flex items-start">
                                <img src={image10_1} alt="page5_item10" className="w-[300px]" />
                            </div>
                            <div className="mr-5">
                                <FormEDMCoilTubeCheck
                                    name="page5.item10.lockCheck"
                                    axes={[
                                        { key: 'zkb', label: 'Z axis (KB)' },
                                        { key: 'zpara', label: 'Z axis (KB)' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto flex justify-end">
                    <div className="w-64">
                        <FormCheckedBox
                            name="page5.checkedInfo"
                            label="Check by/Date"
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;