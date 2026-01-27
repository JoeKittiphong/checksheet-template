import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormEDMTablePitchingY from "@/components/FormComponents/FormEDMTablePitchingY";
import FormEDMTableRollingY from "@/components/FormComponents/FormEDMTableRollingY";
import { useFormContext } from "react-hook-form";

// Images
import image3 from "@/assets/FAMB0004_V3/image-3.PNG";
import image4 from "@/assets/FAMB0004_V3/image-4.PNG";

function Page2() {
    const { control } = useFormContext();

    // Standards สำหรับ TableYABDIFF
    const tableYABStandards = [
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: -5, max: 0, arrow: '-' },
        { min: -5, max: 0, arrow: '-' },
    ];

    // Standards สำหรับ EDMtablePitching
    const pitchingStandards = [
        { min: 0, max: 5, arrow: '+' },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 5, arrow: '-' },
    ];

    // Standards สำหรับ EDMtableRolling
    const rollingStandards = [
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
        { min: 0, max: 0 },
    ];

    return (
        <A4Paper content={content} currentPage={2}>
            <div>
                <div className="mb-5">
                    <p className="text-sm font-bold">3. LEVELING CHECK Y AXIS ( ASSEMBLY DATA ) [การเช็คระดับน ้าแกน Y, ข้อมูลจาก AS]หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image3} alt="page1" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormTableYABDIFF
                                name="page2.tableYABData"
                                rows={9}
                                standards={tableYABStandards}
                                showStd={true}
                                validateStd={true}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                            />
                        </div>
                        <div className="h-70 flex flex-col justify-center ml-2 p-2">
                            <FormChecknumber
                                name="page2.levelingGaugeNo"
                                label="Leveling guage No."
                            />
                            <div className="h-5"></div>
                            <FormCheckedBox
                                name="page2.checkedInfo"
                                label="CHECKED BY / DATE"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">4. CHECK ค่า Pitching/Rolling แกน Y หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image4} alt="page2" className="w-70 h-full m-2" />
                        <div>
                            <div className="flex">
                                <div className="m-5">
                                    <FormEDMTablePitchingY
                                        name="page2.pitchingData"
                                        rows={5}
                                        standards={pitchingStandards}
                                        showStd={true}
                                        validateStd={true}
                                        defaultValue={['', '', '', '', '']}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 205 mm.)</p>
                                </div>
                                <div className="m-5">
                                    <FormEDMTableRollingY
                                        name="page2.rollingData"
                                        rows={5}
                                        standards={rollingStandards}
                                        showStd={true}
                                        validateStd={true}
                                        defaultValue={['', '', '', '', '']}
                                    />
                                    <p className="text-sm">(เว้นระยะห่างช่องละ 205 mm.)</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mr-10">
                                    <FormChecknumber
                                        name="page2.levelingGaugeNo"
                                        label="Leveling guage No."
                                    />
                                    <FormChecknumber
                                        name="page2.levelingGaugeNo2"
                                        label="Leveling guage No."
                                    />
                                </div>
                                <FormCheckedBox
                                    name="page2.checkedInfo"
                                    label="CHECKED BY / DATE"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;
