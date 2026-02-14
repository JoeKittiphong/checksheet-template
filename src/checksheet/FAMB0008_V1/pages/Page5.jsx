import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import { useFormContext } from "react-hook-form";

import FormEDMCoilTubeCheck from "@/components/FormComponents/FormEDMCoilTubeCheck";

// Images
import image8_1 from "@/assets/FAMB0008_V1/FAMB0008-8-1.PNG";
import image8_2 from "@/assets/FAMB0008_V1/FAMB0008-8-2.PNG";
import image9 from "@/assets/FAMB0008_V1/FAMB0008-9.PNG";
import image10 from "@/assets/FAMB0008_V1/FAMB0008-10.PNG";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";

function Page5() {
    const { control } = useFormContext();

    const LevelTableXABSTD = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 5, arrow: '-' },
        { min: 0, max: 5, arrow: '-' },
    ];

    // STD for Pitching (5 columns) - ลูกศรซ้าย/ขวา
    const PitchingSTD = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 5, arrow: '-' },
    ];

    // STD for Rolling (5 columns) - ลูกศรขึ้น/ลง
    const RollingSTD = [
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={5}>
            <div>
                <p className="text-sm font-bold mb-5">8. Check the fitment of tube (In, Out) to the hose connector at linear coil of X-axis and Y-axis before assy Saddle on the Bed and before assy Quill base on the Saddle. [ตรวจสอบการประกอบสาย Tube (In, Out) เข้ากับ Hose connector ที่ Linear Coil แกน X และแกน Y ก่อนประกอบ Saddle เข้ากับ Bed และก่อนประกอบ Quill base เข้ากับ Saddle]</p>

                <div className="mb-5">
                    <p className="text-sm mb-2">- ตรวจสอบการล็อค hose connector แกน X และแกน Y</p>
                    <div className="flex">
                        <div className="mr-5 flex items-center">
                            <img src={image8_1} alt="page5_8_1" className="w-50" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page5.coilTubeLockCheck"
                                axes={[
                                    { key: 'x', label: 'แกน X' },
                                    { key: 'ykc', label: 'แกน Y (KC)' },
                                    { key: 'ykb', label: 'แกน Y (KB)' }
                                ]}
                                defaultValue={{
                                    x: { in: false, out: false },
                                    ykc: { in: false, out: false },
                                    ykb: { in: false, out: false }
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-between w-40">
                            <p className="text-sm">เมื่อตรวจสอบได้ว่าการล็อคได้ผลเป็นไปตามรูปแล้ว ให้เติมคำว่า "OK" ลงในช่องว่าง</p>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="text-sm mb-2">- ตรวจสอบการดึงสาย Tube ที่ต่อเข้ากับ Hose connector ของ Linear Coil แกน X และแกน Y</p>
                    <div className="flex">
                        <div className="mr-5 flex items-center">
                            <img src={image8_2} alt="page5_8_2" className="w-50" />
                        </div>
                        <div className="mr-5">
                            <FormEDMCoilTubeCheck
                                name="page5.tubePullCheck"
                                axes={[
                                    { key: 'x', label: 'แกน X' },
                                    { key: 'ykc', label: 'แกน Y (KC)' },
                                    { key: 'ykb', label: 'แกน Y (KB)' }
                                ]}
                                defaultValue={{
                                    x: { in: false, out: false },
                                    ykc: { in: false, out: false },
                                    ykb: { in: false, out: false }
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-between w-40">
                            <p className="text-sm">เมื่อตรวจสอบได้ว่าการล็อคได้ผลเป็นไปตามรูปแล้ว ให้เติมคำว่า "OK" ลงในช่องว่าง</p>
                            <div className="mt-2">
                                <FormCheckedBox name="page5.checkedInfo8" label="Check by/Date" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page5;

