import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0003_V2-setting";
import FormTableXABDIFF from "@/components/FormComponents/FormTableXABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image11 from "@/assets/FAMB0003_V2/image-11.png";

function Page6() {
    const { control } = useFormContext();

    // STD for Section 11 (9 columns)
    const StraightnessSTD = [
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
        { min: 0, max: 3, arrow: '' },
    ];

    return (
        <A4Paper content={content} currentPage={6}>
            <div>
                <p className="text-sm font-bold">11. CHECK  ค่าความตรงและขนานของแกน  X (หลังจากประกอบ saddle เข้ากับ Bed และใส่ Lm-guide X แล้ว)
                    หน่วยวัดเป็น µm</p>
                <div className="w-full flex flex-col items-center mb-5">
                    <p className="text-sm">(เว้นระยะห่างช่องละ 107 mm.)</p>
                    <img src={image11} alt="page6" className="w-70" />
                </div>
                <div className="ml-20 mb-10">
                    <p className="text-sm">ค่าความตรงและขนานจาก M/A</p>
                    <FormTableXABDIFF
                        name="page6.straightnessMAData"
                        cols={9}
                        standards={StraightnessSTD}
                        showStd={false}
                        validateStd={false}
                        useArrow={false}
                        labelA="A=Kb"
                        labelB="B"
                        labelDiff="A+B"
                        calcType="sum"
                        defaultValue={{
                            a: ["0", "", "", "", "", "", "", "", "0"],
                            b: ["0", "", "", "", "", "", "", "", ""]
                        }}
                    />
                </div>
                <div className="ml-20 mb-10">
                    <p className="text-sm">ASSEMBLY ค่าความตรงและขนานไม่เกิน   3  µm</p>
                    <FormTableXABDIFF
                        name="page6.straightnessAssemblyData"
                        cols={9}
                        standards={StraightnessSTD}
                        showStd={false}
                        validateStd={true}
                        useArrow={false}
                        labelA="A=Kb"
                        labelB="B"
                        labelDiff="A+B"
                        calcType="sum"
                        defaultValue={{
                            a: ["0", "", "", "", "", "", "", "", "0"],
                            b: ["0", "", "", "", "", "", "", "", ""]
                        }}
                    />
                </div>
                <div className="flex w-full justify-center">
                    <div className="mr-10 flex flex-col items-center h-20 justify-between">
                        <FormChecknumber
                            name="page6.parallelBarNo"
                            label="Parallel bar No."
                        />
                        <FormChecknumber
                            name="page6.dialGaugeNo"
                            label="Dial gauge No."
                        />
                    </div>
                    <FormCheckedBox name="page6.checkedInfo11" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page6;
