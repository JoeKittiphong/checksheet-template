import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image3 from "@/assets/FAMB0004_V3/image-3.PNG";

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
        { min: 0, max: 0, arrow: '+' },
        { min: 0, max: 0, arrow: '+' },
        { min: -5, max: 0, arrow: '-' },
        { min: -5, max: 0, arrow: '-' },
    ];
    const checktableYABStandards = [
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 0, max: 0, arrow: '' },
        { min: 5, max: 5, arrow: '-' },
        { min: 15, max: 15, arrow: '-' },
        { min: 25, max: 25, arrow: '-' },
    ];

    return (
        <A4Paper content={content} currentPage={2}>
            <div>
                <div className="mb-5">
                    <p className="text-sm font-bold">3. CHECK ค่าความตรงและความขนานแกน Y ระหว่างราง B และ C ( DATA FORM MACHINE ) หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image3} alt="page1" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormTableYABDIFF
                                name="page2.tableYABData"
                                rows={11}
                                labelA="B"
                                labelB="C"
                                labelDiff="B+C"
                                diffMode="sum"
                                standards={tableYABStandards}
                                showStd={false}
                                showArrows={false}
                                validateStd={false}
                                defaultValue={[
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }
                                ]}
                            />
                        </div>
                        <div className="h-70 flex flex-col justify-center ml-2 p-2">
                            <FormChecknumber
                                name="page2.levelingGaugeNo"
                                label="Leveling guage No."
                            />
                            <FormChecknumber
                                name="page2.parallelNo"
                                label="Parallel bar No."
                            />
                            <div className="h-5"></div>
                            <FormCheckedBox
                                name="page2.checkedInfo"
                                label="CHECKED BY / DATE"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="text-sm font-bold">4. LEVELING CHECK Y AXIS ( ASSEMBLY DATA ) [การเช็คระดับน ้าแกน Y, ข้อมูลจาก AS]หน่วยวัดเป็น µm</p>
                    <div className="flex">
                        <img src={image3} alt="page1" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormLevelTableYAB
                                name="page2.checkTableYABData"
                                rows={11}
                                labelA="A=Kb"
                                labelB="B"
                                labelC="C"
                                showC={true}
                                showArrows={true}
                                standards={checktableYABStandards}
                                showStd={true}
                                validateStd={true}
                                defaultValue={[
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }
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
            </div>
        </A4Paper>
    );
}

export default Page2;
