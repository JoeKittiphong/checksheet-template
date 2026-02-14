import { useFormContext } from "react-hook-form";
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormLevelTableYAB from "@/components/FormComponents/FormLevelTableYAB";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";

// Images
import image1 from "@/assets/FAMB0008_V1/FAMB0008-1.PNG";
import image1_2 from "@/assets/FAMB0008_V1/FAMB0008-1.PNG";

function Page1() {
    const { control } = useFormContext();

    // Standards for Data of AS
    const tableYABStandards = [
        { min: 5, max: 5, arrow: '-' },  // 1
        { min: 0, max: 0 },              // 2
        { min: 0, max: 0 },              // 3
        { min: 0, max: 0 },              // 4
        { min: 0, max: 0 },              // 5 (SD=0, A=0, B=0, C=0)
        { min: 5, max: 5, arrow: '-' },  // 6
        { min: 10, max: 10, arrow: '-' },// 7
        { min: 15, max: 15, arrow: '-' },// 8
        { min: 20, max: 20, arrow: '-' },// 9
    ];

    return (
        <A4Paper content={content} currentPage={1}>
            <div>
                <div className="mb-5 w-full h-50%">
                    <p className="text-sm font-bold">1. Leveling check Y-axis. (Data from MA) [เช็คค่าระดับน้ำแกน Y จาก MA]</p>
                    <div className="flex">
                        <img src={image1} alt="page1" className="w-70 h-full m-2" />
                        <div>
                            <p className="text-sm text-center mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormLevelTableYAB
                                name="page1.levelYData"
                                rows={9}
                                labelA="A=Kb"
                                labelB="B"
                                labelC="C"
                                showC={true}
                                defaultValue={[
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '0', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '', b: '', c: '' }
                                ]}
                            />
                        </div>
                        <div className="flex flex-col justify-between ml-4 h-full">
                            <div className="mb-4">
                                <FormCheckedBox
                                    name="page1.checkedInfo"
                                    label="CHECKED BY / DATE"
                                />
                                <div className="h-4"></div>
                                <FormChecknumber
                                    name="page1.levelingGaugeNo"
                                    label="Level gauge No."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold">2. Leveling check Y-axis. (Data of AS) [เช็คค่าระดับน้ำแกน Y ของ AS]</p>
                    <div className="flex w-full h-full">
                        <img src={image1_2} alt="page1" className="w-70 h-full m-2" />
                        <div className="">
                            <p className="mb-2">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormLevelTableYAB
                                name="page1.tableYABData"
                                rows={9}
                                standards={tableYABStandards}
                                labelA="A=Kb"
                                labelB="B"
                                labelC="C"
                                showC={true}
                                showStd={true}
                                validateStd={true}
                                defaultValue={[
                                    { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '0', b: '0', c: '0' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' },
                                    { a: '', b: '', c: '' }
                                ]}
                            />
                        </div>
                        <div className="flex flex-col justify-end m-5">
                            <FormCheckedBox
                                name="page1.checkedInfo2"
                                label="CHECKED BY / DATE"
                            />
                            <FormChecknumber
                                name="page1.dialGaugeNo"
                                label="Level guage No."
                                className="mb-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;

