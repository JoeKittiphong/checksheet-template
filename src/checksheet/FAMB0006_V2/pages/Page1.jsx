import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0006_V2-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image1 from "@/assets/FAMB0006_V2/FAMB0005-1.PNG";
import image2 from "@/assets/FAMB0006_V2/FAMB0005-2.PNG";

function Page1() {
    const { control } = useFormContext();

    // Configuration for Section 2 Standards (All 0)
    const standardsAS = Array(7).fill({ min: 0, max: 0, arrow: '' });

    // Initial value for Section 1 (Row 4, Col A is 0)
    // Note: Row index 3 corresponds to Row 4 in 1-based index
    const defaultMA = {
        3: { a: '0', b: '' }
    };

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col gap-8">
                {/* Section 1: MACHINE DATA */}
                <div>
                    <h2 className="text-sm font-bold">1. LEVELING CHECK Y AXIS ( DATA FORM MACHINE )</h2>
                    <p className="text-xs mb-2">[การเช็คระดับน้ำแกน Y, ข้อมูลจาก MA] <span className="underline">หน่วยวัดเป็น µm</span></p>

                    <div className="flex justify-between items-start">
                        <div className="w-1/2 flex justify-center">
                            <img src={image1} alt="Leveling Check MA" className="h-64 object-contain" />
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                            <p className="text-xs italic mb-1 self-start ml-10">(เว้นระยะห่างช่องละ 85 mm)</p>
                            <FormLevelTableYAB
                                name="page1.levelCheckMA"
                                rows={7}
                                labelA="A=KB"
                                labelB="B"
                                showStd={false}
                                defaultValue={defaultMA}
                            />
                            <div className="mt-4 w-full pl-10 pr-10">
                                <FormChecknumber
                                    name="page1.levelGaugeNoMA"
                                    label="Level guage No."
                                />
                            </div>
                        </div>
                        <div className="mr-5 mt-10">
                            <FormCheckedBox name="page1.checkedInfoMA" />
                        </div>
                    </div>
                </div>

                {/* Section 2: ASSEMBLY DATA */}
                <div>
                    <h2 className="text-sm font-bold">2. LEVELING CHECK Y AXIS ( ASSEMBLY DATA )</h2>
                    <p className="text-xs mb-2">[การเช็คระดับน้ำแกน Y, ข้อมูลจาก AS] <span className="underline">หน่วยวัดเป็น µm</span></p>

                    <div className="flex justify-between items-start">
                        <div className="w-1/2 flex justify-center">
                            <img src={image2} alt="Leveling Check AS" className="h-64 object-contain" />
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                            <p className="text-xs italic mb-1 self-start ml-10">(เว้นระยะห่างช่องละ 85 mm)</p>
                            <FormLevelTableYAB
                                name="page1.levelCheckAS"
                                rows={7}
                                labelA="A=KB"
                                labelB="B"
                                showStd={true}
                                standards={standardsAS}
                                defaultValue={{}}
                            />
                            <div className="ml-2 mt-4 w-full pl-10 pr-10">
                                <FormChecknumber
                                    name="page1.levelGaugeNoAS"
                                    label="Level guage No."
                                />
                            </div>
                        </div>
                        <div className="ml-2 mr-5 mt-10">
                            <FormCheckedBox name="page1.checkedInfoAS" />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;