import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0002v2-setting";
import EDMparallelY from "@/components/PageComponent/EDMparallelY";
import Checknumber from "@/components/UIcomponent/Checknumber";
import CheckedBox from "@/components/UIcomponent/CheckedBox";
import { useFormContext, Controller } from "react-hook-form";

// Images
import image5 from "@/assets/FAMB0002V2/image-5.png";
import image6 from "@/assets/FAMB0002V2/image-6.png";
import image6_1 from "@/assets/FAMB0002V2/image-6-1.png";
import image6_2 from "@/assets/FAMB0002V2/image-6-2.png";

function Page3() {
    const { control } = useFormContext();

    // Standards สำหรับ EDMparallelY
    const tableYABStandards = [
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
        { min: 0, max: 3 },
    ];

    return (
        <A4Paper content={content} currentPage={3}>
            <div>
                <div>
                    <p className="text-sm font-bold mb-5">5. CHECK ค่าความขนานและความตรงของแกน Y หลังจากที่ประกอบ Lm-guide แล้ว หน่วยวัดเป็น µm</p>
                </div>
                <div className="flex">
                    <img src={image5} alt="page3" className="w-60 h-full m-2" />
                    <div className="mr-10">
                        <p>(เว้นระยะห่างช่องละ 105 mm.)</p>
                        <Controller
                            name="page3.tableYABData"
                            control={control}
                            defaultValue={[
                                { a: '0', b: '0' }, { a: '', b: '' }, { a: '', b: '' },
                                { a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' },
                                { a: '', b: '' }, { a: '', b: '' }, { a: '0', b: '' }
                            ]}
                            render={({ field }) => (
                                <EDMparallelY
                                    rows={9}
                                    data={field.value}
                                    onChange={field.onChange}
                                    standards={tableYABStandards}
                                    showStd={false}
                                    validateStd={true}
                                />
                            )}
                        />
                        <div className="h-5 mb-5">
                            <p>ค่าความตรงและขนานไม่เกิน 3 µm</p>
                        </div>
                        <Controller
                            name="page3.dialGaugeNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="Dial gauge No."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="page3.parallelBarNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Checknumber
                                    label="Parallel bar No."
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="h-80 flex flex-col justify-end">
                        <Controller
                            name="page3.checkedInfo"
                            control={control}
                            defaultValue={{ name: '', date: '' }}
                            render={({ field }) => (
                                <CheckedBox
                                    name={field.value?.name ?? ''}
                                    date={field.value?.date ?? ''}
                                    onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                                    onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <p className="text-sm font-bold mb-5">6. CHECK การประกอบ Cooler block เข้ากับ Table</p>
                    <img src={image6} alt="page3" className="w-150 h-full m-2 ml-10" />
                </div>
                <div className="flex">
                    <div className="w-1/2 justify-center">
                        <p className="text-sm ml-2">6.1 CHECK กำรล็อค Fitting (nipple)  เข้ำกับ Cooler block </p>
                        <div className="flex">
                            <img src={image6_1} alt="page3" className="w-1/2 h-full m-2 ml-10" />
                            <p>เติมเครื่องหมาย ✔ ลงในช่องว่างเมื่อตรวจสอบได้ว่าการล็อคได้ผลแล้วทาการมาร์คสี </p>
                        </div>
                        <div className="flex justify-center my-2">
                            <Controller
                                name="page3.check61"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <input
                                        className="w-5 h-5"
                                        type="checkbox"
                                        checked={field.value ?? false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 justify-center">
                        <p className="text-sm ml-2">6.2. ทดสอบ แรงดึงของ Tube ด้วยมือเปล่า</p>
                        <div className="flex">
                            <img src={image6_2} alt="page3" className="w-30 h-full m-2 ml-10" />
                            <p className="flex-1 text-sm">เติมเครื่องหมาย ✔ ลงในช่องว่างเมื่อตรวจสอบ แล้วว่าดึง tube ตามตำแหน่ง Hose connector แล้ว tube ไม่หลุดออก</p>
                        </div>
                        <div className="flex justify-center my-2">
                            <Controller
                                name="page3.check62"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <input
                                        className="w-5 h-5"
                                        type="checkbox"
                                        checked={field.value ?? false}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page3;

