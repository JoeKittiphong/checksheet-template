import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0004_V3-setting";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormLevelTableXAB from "@/components/FormComponents/FormLevelTableXAB";
import FormTableYABDIFF from "@/components/FormComponents/FormTableYABDIFF";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image7 from "@/assets/FAMB0004_V3/image-7.PNG";
import image8 from "@/assets/FAMB0004_V3/image-8.PNG";
import image8_1 from "@/assets/FAMB0004_V3/image-8-1.PNG";
import image8_2 from "@/assets/FAMB0004_V3/image-8-2.PNG";

function Page4() {
    const { control } = useFormContext();

    // Standards for Item 7
    const checkParallelBCStandards = Array(11).fill({ min: 0, max: 4, arrow: '' });

    return (
        <A4Paper content={content} currentPage={4}>
            <div>
                <div>
                    <div className="mt-5">
                        <p className="text-sm font-bold">7. CHECK ค่าความขนานและความตรงของแกน Y หลังจากที่ประกอบ Lm-guide แล้ว หน่วยวัดเป็น µm [ระหว่างราง B และ C]</p>
                        <div className="flex">
                            <img src={image7} alt="page4" className="w-70 m-2 ml-10" />
                            <div>
                                <p className="mb-2">(เว้นระยะห่างช่องละ 131 mm.)</p>
                                <FormTableYABDIFF
                                    name="page4.checkParallelBCData"
                                    control={control}
                                    rows={11}
                                    labelA="B"
                                    labelB="C"
                                    labelDiff="B+C"
                                    diffMode="sum"
                                    standards={checkParallelBCStandards}
                                    showStd={false}
                                    validateStd={true}
                                    showArrows={false}
                                    defaultValue={[
                                        { a: '0', b: '0' }, { a: '', b: '' }, { a: '', b: '' },
                                        { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                        { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                        { a: '', b: '' }, { a: '0', b: '' }
                                    ]}
                                />
                            </div>
                            <div className="h-70 flex flex-col justify-center ml-2 p-2">
                                <p className="text-sm mb-2">ค่าความตรงและความขนาน ไม่เกิน 4 µm</p>
                                <FormChecknumber
                                    name="page4.dialGaugeNoPar"
                                    label="Dial gauge No."
                                />
                                <FormChecknumber
                                    name="page4.parallelBarNo"
                                    label="Parallel bar No."
                                />
                                <div className="h-5"></div>
                                <FormCheckedBox
                                    name="page4.checkedInfo7"
                                    label="CHECKED BY / DATE"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm font-bold">8. LEVELING CHECK X AXIS (DATA FROM MA MACHINE) [การเช็คระดับน ้าแกน X, ข้อมูลจาก MA] หน่วยวัดเป็น µm</p>
                    <div className="flex justify-center">
                        <img src={image8} alt="page4" className="w-120 m-2 ml-10" />
                    </div>
                    <div className="m-5 ml-20">

                    </div>

                    <div className="mt-5 text-sm">
                        <div className="grid grid-cols-2">
                            {/* 10.1 */}
                            <div className="p-2">
                                <p className="mb-2">10.1 CHECK การล็อค Fitting (nipple) เข้ากับ Cooler block</p>
                                <div className="flex">
                                    <img src={image8_1} alt="10.1" className="w-40 h-auto object-contain mr-2" />
                                    <div className="flex flex-col justify-between">
                                        <p>เติมเครื่องหมาย / ลงในช่องว่างเมื่อตรวจสอบได้ว่าการล็อคได้ผลแล้วทำการ มาร์คสี</p>
                                        <div className="mt-2 text-center flex justify-center">
                                            <div className="w-10 h-8 flex items-center justify-center">
                                                <FormItemCheck
                                                    name="page4.fittingLockCheck"
                                                    label={null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 10.2 */}
                            <div className="p-2">
                                <p className="mb-2">10.2 ทดสอบ แรงดึงของ Tube ด้วยมือเปล่า</p>
                                <div className="flex">
                                    <img src={image8_2} alt="10.2" className="w-40 h-auto object-contain mr-2" />
                                    <div className="flex flex-col justify-between">
                                        <p>เติมเครื่องหมาย / ลงในช่องว่างเมื่อตรวจสอบแล้วว่าดึง tube ตามตำแหน่ง Hoseconnector แล้ว tube ไม่หลุด</p>
                                        <div className="mt-2 text-center flex justify-center">
                                            <div className="w-10 h-8 flex items-center justify-center">
                                                <FormItemCheck
                                                    name="page4.tubePullCheck"
                                                    label={null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page4;
