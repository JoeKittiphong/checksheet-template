import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
// Images
import image13 from "@/assets/FAMB0004_V3/image-13.PNG";

import FormTableXABDIFF from "@/components/FormComponents/FormTableXABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

function Page7() {
    const { control } = useFormContext();

    const Page7STD = [
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
        { min: 0, max: 8, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={7}>
            <div>
                <p className="text-sm font-bold">13. CHECK ค่าความตรงและขนานของแกน X (หลังจากประกอบ saddle เข้ากับ Bed และใส่ Lm-guide X แล้ว)</p>
                <p className="text-sm font-bold mb-10">หน่วยวัดเป็น µm</p>
                <div className="w-full flex flex-col items-center mb-5">
                    <div className="w-full flex justify-end">
                        <p className="text-sm text-right">(เว้นระยะห่างช่องละ 117 mm.)</p>
                    </div>
                    <img src={image13} alt="page7" className="w-80" />
                </div>

                <div className="mb-10">
                    <p className="text-sm mb-2">ค่าความตรงและขนานจาก M/A</p>
                    <FormTableXABDIFF
                        name="page7.straightnessMAData"
                        cols={13}
                        standards={[]}
                        showStd={false}
                        validateStd={false}
                        labelA="A=KB"
                        labelB="B"
                        labelDiff="A+B"
                        diffMode="sum"
                        defaultValue={{ a: [], b: [] }}
                    />
                </div>

                <div className="mb-5">
                    <p className="text-sm mb-2">ASSEMBLY ค่าความตรงและขนานไม่เกิน 8 µm</p>
                    <FormTableXABDIFF
                        name="page7.straightnessAssemblyData"
                        cols={13}
                        standards={Page7STD}
                        showStd={false}
                        validateStd={true}
                        labelA="A=KB"
                        labelB="B"
                        labelDiff="A+B"
                        diffMode="sum"
                        defaultValue={{ a: [], b: [] }}
                    />
                    <div className="ml-25 flex w-120 mt-1">
                        <div className="">0</div>
                        <div className="ml-10">3</div>
                        <div className="ml-15">5</div>
                        <div className="ml-22">6</div>
                        <div className="ml-21">8</div>
                        <div className="ml-21">6</div>
                        <div className="ml-15">5</div>
                        <div className="ml-10">3</div>
                        <div className="ml-10">0</div>
                    </div>
                </div>

                <div className="flex w-full justify-between items-end mt-10">
                    <div className="flex flex-col w-1/2 ml-20">
                        <div className="flex mb-2 w-full justify-between">
                            <FormChecknumber
                                name="page7.dialGaugeNo"
                                label="DIAL GAUGE NO."
                            />
                        </div>
                        <div className="flex w-full justify-between">
                            <FormChecknumber
                                name="page7.lmGuideNo"
                                label="LM-GUIDE NO."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 ml-20">
                        <p>LM-GUIDE No.</p>
                        <div className="flex mb-2 w-full justify-between">
                            <FormChecknumber
                                name="page7.checkA"
                                label="A"
                            />
                        </div>
                        <div className="flex w-full justify-between">
                            <FormChecknumber
                                name="page7.checkB"
                                label="B"
                            />
                        </div>
                    </div>
                    <FormCheckedBox name="page7.checkedInfo13" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page7;
