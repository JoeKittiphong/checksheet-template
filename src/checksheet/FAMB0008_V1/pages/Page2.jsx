import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0008_V1-setting";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import { useFormContext } from "react-hook-form";

// Images
import image3 from "@/assets/FAMB0008_V1/FAMB0008-3.PNG";
import image4 from "@/assets/FAMB0008_V1/FAMB0008-4.PNG";

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
                    <p className="text-sm font-bold">3. Check straightness and parallel of Y-axis between A and B after LM-guide assy. [ตรวจสอบค่าความตรงและค่าความขนานของแกน Y ระหว่างราง A กับ B หลังประกอบ LM-guide]</p>
                    <div className="flex">
                        <img src={image3} alt="page2" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2 text-center text-sm">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormTableYABDIFF
                                name="page2.item3Data"
                                rows={9}
                                labelA="A=Kb"
                                labelB="B"
                                labelDiff="ค่าความตรง"
                                diffMode="diff"
                                standards={[
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                ]}
                                showStd={false}
                                validateStd={true}
                                defaultValue={[
                                    { a: '0', b: '0', diff: '0' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '0', b: '' }
                                ]}
                            />
                        </div>
                        <div className="flex flex-col justify-end ml-4 mb-2">
                            <FormChecknumber
                                name="page2.dialGaugeNo3"
                                label="Dial gauge No."
                                labelWidth="w-32"
                            />
                            <FormChecknumber
                                name="page2.parallelNo3"
                                label="Parallel bar No."
                                labelWidth="w-32"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="text-sm font-bold">4. Check straightness and parallel of Y-axis between B and C after LM-guide assy. [ตรวจสอบค่าความตรงและค่าความขนานของแกน Y ระหว่างราง B กับ C หลังประกอบ LM-guide]</p>
                    <div className="flex">
                        <img src={image4} alt="page2" className="w-60 h-full m-2" />
                        <div>
                            <p className="mb-2 text-center text-sm">(เว้นระยะห่างช่องละ 105 mm.)</p>
                            <FormTableYABDIFF
                                name="page2.item4Data"
                                rows={9}
                                labelA="B"
                                labelB="C"
                                labelDiff="ค่าความตรง"
                                diffMode="diff"
                                standards={[
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                    { min: 0, max: 3, arrow: '' },
                                ]}
                                showStd={false}
                                validateStd={true}
                                defaultValue={[
                                    { a: '0', b: '0', diff: '0' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                    { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }
                                ]}
                            />
                        </div>

                        <div className="ml-10 mb-2">
                            <FormCheckedBox
                                name="page2.checkedInfo"
                                label="CHECKED BY / DATE"
                            />
                            <div className="mt-10 flex flex-col justify-start">
                                <p>Y-LM guide No.</p>
                                <FormChecknumber
                                    name="page2.ylmGuideNoA"
                                    label="A"
                                    labelWidth="w-28"
                                />
                                <FormChecknumber
                                    name="page2.ylmGuideNoB"
                                    label="B"
                                    labelWidth="w-28"
                                    hideBottomBorder={false}
                                    inputWidth="w-40"
                                    className="text-right"
                                />
                                <FormChecknumber
                                    name="page2.ylmGuideNoC"
                                    label="C"
                                    labelWidth="w-28"
                                    hideBottomBorder={false}
                                    inputWidth="w-40"
                                    className="text-right"
                                />
                            </div>
                            <div className="mt-10 flex justify-between items-end">
                                <div>
                                    <FormChecknumber
                                        name="page2.dialGaugeNo4"
                                        label="Dial gauge No."
                                        labelWidth="w-24"
                                    />
                                    <FormChecknumber
                                        name="page2.parallelNo4"
                                        label="Parallel bar No."
                                        labelWidth="w-24"
                                    />
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-4 w-full">
                        <div className="mt-5 mb-5 px-4 font-bold">
                            <p>ค่าความตรงและค่าความขนานไม่เกิน 3 µm</p>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page2;

