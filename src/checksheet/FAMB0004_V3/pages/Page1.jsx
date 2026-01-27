import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image1 from "@/assets/FAMB0004_V3/image-1.PNG";
import image1_2 from "@/assets/FAMB0004_V3/image-1.PNG";

function Page1() {
    const { control } = useFormContext();

    // Standards สำหรับ TableYABDIFF
    const tableYABStandards = [
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
        { min: 0, max: 50, arrow: '+' },
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div>
                <div className="mb-5 w-full h-50%">
                    <p className="text-sm font-bold">1. LEVELING CHECK Y AXIS ( DATA FORM MACHINE ) [การเช็คระดับน้ำแกน Y, ข้อมูลจาก MA] หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image1} alt="page1" className="w-70 h-full m-2" />
                        <div>
                            <p className="text-sm text-center mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormLevelTableYAB
                                name="page1.levelYData"
                                rows={9}
                                labelA="A=Kb"
                                labelB="B"
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '0', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                            />
                        </div>
                        <div className="flex flex-col justify-end ml-4">
                            <FormCheckedBox
                                name="page1.checkedInfo"
                                label="CHECKED BY / DATE"
                            />
                            <div className="h-10"></div>
                            <FormChecknumber
                                name="page1.levelingGaugeNo"
                                label="Leveling guage No."
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">2. CHECK ค่าความตรงและความขนานแกน Y ( DATA FORM MACHINE ) หน่วยวัดเป็น µm</p>
                    <div className="flex w-full h-full">
                        <img src={image1_2} alt="page1" className="w-70 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormTableYABDIFF
                                name="page1.tableYABData"
                                rows={9}
                                standards={tableYABStandards}
                                showStd={false}
                                validateStd={false}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                            />
                            <FormChecknumber
                                name="page1.dialGaugeNo"
                                label="Dial guage No."
                                className="mb-4"
                            />
                            <FormChecknumber
                                name="page1.parallelBarNo"
                                label="parallel bar No."
                                className="mb-2"
                            />
                        </div>
                        <div className="flex flex-col justify-end m-5">
                            <FormCheckedBox
                                name="page1.checkedInfo2"
                                label="CHECKED BY / DATE"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;
