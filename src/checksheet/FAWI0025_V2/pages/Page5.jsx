import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import CompactImageUpload from "@/components/FormComponents/CompactImageUpload";
import { content, apiEndpoint } from "../FAWI0025_V2-setting";

// Import images for parts
import image1 from "@/assets/FAWI0025_V2/p5-image1.png";
import image2 from "@/assets/FAWI0025_V2/p5-image2.png";
import image3 from "@/assets/FAWI0025_V2/p5-image3.png";
import image4 from "@/assets/FAWI0025_V2/p5-image4.png";
import image5 from "@/assets/FAWI0025_V2/p5-image5.png";
import image6 from "@/assets/FAWI0025_V2/p5-image6.PNG";
import image7 from "@/assets/FAWI0025_V2/p5-image7.png";
import image8 from "@/assets/FAWI0025_V2/p5-image8.png";

const Page5 = () => {
    const prefix = "p05_dc";
    const { control, setValue } = useFormContext();

    // Watch global form metadata
    const currentModel = useWatch({ control, name: 'model' }) || 'UNKNOWN';
    const watchMachineNo = useWatch({ control, name: 'machineNo' });
    const watchMachine_no = useWatch({ control, name: 'machine_no' });
    const currentMachineNo = watchMachineNo || watchMachine_no || 'UNKNOWN';

    const columns = [
        { key: 'id', header: 'No.', width: '30px', className: 'text-center align-top text-[10px]' },
        {
            key: 'partName',
            header: 'Part Name',
            width: '180px',
            align: 'left',
            className: 'align-top',
            render: (val, row, { register }) => (
                <div className="flex flex-col text-[10px] leading-tight">
                    <div className="font-bold whitespace-pre-wrap">{val}</div>
                    {row.internalCheckboxes && row.internalCheckboxes.map((cb, idx) => (
                        <label key={idx} className="flex items-center gap-1 cursor-pointer">
                            <input type="checkbox" {...register(`${prefix}_${row.id}_pn_cb${idx}`)} className="w-3.5 h-3.5" />
                            <span>{cb}</span>
                        </label>
                    ))}
                    {row.partNote && <div className="text-[8px] text-gray-500 whitespace-pre-wrap">{row.partNote}</div>}
                    <input type="hidden" {...register(`${prefix}_${row.id}_partName`)} value={val.replace(/\n/g, ' ')} />
                </div>
            )
        },
        {
            key: 'picture',
            header: 'Picture',
            width: '80px',
            className: 'align-top',
            render: (val) => val ? (
                <div className="flex justify-center py-0.5">
                    <img src={val} alt="part" className="max-h-14 object-contain rounded border border-gray-100" />
                </div>
            ) : <div className="h-10 bg-gray-50 flex items-center justify-center italic text-[8px] text-gray-400">No Image</div>
        },
        {
            key: 'check1',
            header: 'Check - 1',
            width: '180px',
            align: 'left',
            className: 'align-top',
            render: (val, row, { register }) => {
                const imageName = `${prefix}_${row.id}_c1_image`;
                return (
                    <div className="flex flex-col gap-0.5 text-[10px] leading-tight h-full justify-between">
                        <div>
                            {row.check1Items && row.check1Items.map((item, idx) => {
                                if (item.type === 'text') {
                                    return (
                                        <div key={idx} className="flex items-center gap-1">
                                            <span>{item.label}</span>
                                            <input
                                                type="text"
                                                {...register(`${prefix}_${row.id}_c1_txt${idx}`)}
                                                className="border-b border-black outline-none bg-transparent w-full"
                                            />
                                        </div>
                                    );
                                }
                                return (
                                    <label key={idx} className="flex items-center gap-1 cursor-pointer mb-0.5">
                                        <input type="checkbox" {...register(`${prefix}_${row.id}_c1_cb${idx}`)} className="w-3.5 h-3.5 shrink-0" />
                                        <span className="break-words">{item.label || item}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="mt-1 border-t border-gray-100 py-0.5">
                            <CompactImageUpload
                                name={imageName}
                                apiEndpoint={apiEndpoint}
                                label="UP"
                                viewLabel="IMG"
                                className="scale-[0.65] origin-left"
                                deferred={true}
                                uploadFolder="double_check"
                                extraData={{
                                    model: currentModel,
                                    machine_no: currentMachineNo,
                                    part_name: row.partName,
                                    step: 1
                                }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'check2',
            header: 'Check - 2',
            width: '80px',
            className: 'align-top',
            render: (val, row, { watch, setValue }) => {
                const okName = `${prefix}_${row.id}_c2_ok`;
                const ngName = `${prefix}_${row.id}_c2_ng`;
                const imageName = `${prefix}_${row.id}_c2_image`;
                const isOk = watch(okName);
                const isNg = watch(ngName);

                return (
                    <div className="flex flex-col h-full justify-between items-center text-[10px]">
                        <div className="flex flex-col gap-1 scale-90 origin-top">
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" checked={!!isOk} onChange={(e) => {
                                    setValue(okName, e.target.checked);
                                    if (e.target.checked) setValue(ngName, false);
                                }} className="w-3.5 h-3.5" />
                                <span className="font-bold">OK</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" checked={!!isNg} onChange={(e) => {
                                    setValue(ngName, e.target.checked);
                                    if (e.target.checked) setValue(okName, false);
                                }} className="w-3.5 h-3.5" />
                                <span className="font-bold">NG</span>
                            </label>
                        </div>
                        <div className="mt-1 flex justify-center border-t border-gray-100 py-0.5 w-full">
                            <CompactImageUpload
                                name={imageName}
                                apiEndpoint={apiEndpoint}
                                label="UP"
                                viewLabel="IMG"
                                className="scale-[0.65]"
                                deferred={true}
                                uploadFolder="double_check"
                                extraData={{
                                    model: currentModel,
                                    machine_no: currentMachineNo,
                                    part_name: row.partName,
                                    step: 2
                                }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'rework',
            header: 'Rework',
            width: '70px',
            className: 'align-top',
            render: (val, row, { register }) => {
                const imageName = `${prefix}_${row.id}_c3_image`;
                return (
                    <div className="flex flex-col items-center h-full justify-between text-[10px]">
                        <label className="flex items-center justify-center gap-1 cursor-pointer py-0.5">
                            <input type="checkbox" {...register(`${prefix}_${row.id}_rework`)} className="w-3.5 h-3.5" />
                            <span className="font-bold">OK</span>
                        </label>
                        <div className="mt-1 border-t border-gray-100 py-0.5 w-full">
                            <CompactImageUpload
                                name={imageName}
                                apiEndpoint={apiEndpoint}
                                label="UP"
                                viewLabel="IMG"
                                className="scale-[0.65]"
                                deferred={true}
                                uploadFolder="double_check"
                                extraData={{
                                    model: currentModel,
                                    machine_no: currentMachineNo,
                                    part_name: row.partName,
                                    step: 3
                                }}
                            />
                        </div>
                    </div>
                );
            }
        },
    ];

    const data = [
        {
            id: 19,
            partName: "Bobbin Shaft & Bobbin Lock\n(Wire Feed L)",
            picture: image1,
            check1Items: ["ใส่ Tube TE-12 (สีขาว) ยาว = 30 mm และเทปดำที่ bobbin shaft แล้ว"]
        },
        {
            id: 20,
            partName: "**เฉพาะ ALN600G**\nถอด Screw จาก Bed Cover-R1 1 Pc\nตำแหน่งที่อยู่ตรงกลางและห่อ Foam Sheet",
            picture: image2,
            check1Items: ["ห่อด้วย Foam Sheet"]
        },
        {
            id: 21,
            partName: "ตรวจสอบการประกอบ Bellows X",
            picture: image3,
            check1Items: ["Bellow ไม่ตกนอกราง และไม่มี Part, Screw ตกค้างใน"]
        },
        {
            id: 22,
            partName: "Around the Machine\n(โดยรอบเครื่องจักร)",
            picture: image4,
            check1Items: ["ห้ามมีเอกสาร Double check ใดๆ อยู่บนเครื่องจักร"]
        },
        {
            id: 23,
            partName: "Nozzle Base L / Float Nozzle S\n(Lower Guide)",
            picture: image5,
            check1Items: ["ไม่มีรอยขีดข่วน"]
        },
        {
            id: 24,
            partName: "Nozzle L (Lower Guide)\nD4:  USA (BRAZIL, MAXICO) & ERP (NETHERLANDS, ITALY, TURKEY)\nD6 : Other Country.",
            picture: image6,
            check1Items: [
                { type: 'text', label: 'ประเทศ' },
                "Nozzle D4",
                "Nozzle D6"
            ]
        },
        {
            id: 25,
            partName: "Discharge BKT L,R",
            picture: image7,
            check1Items: ["ตรวจสอบเครื่องต้องประกอบ Discharge BKT L,R"]
        },
        {
            id: 26,
            partName: "Magnet Y",
            picture: image8,
            check1Items: ["ตรวจสอบ Magnet Y ต้องไม่มีรอยขีดข่วน หรือบุบ"]
        },
    ];

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="p-1 flex flex-col h-full bg-white gap-2">
                <div className="flex-1 overflow-hidden px-1">
                    <FormQuickTable
                        columns={columns}
                        data={data}
                        className="w-full"
                    />
                </div>

                {/* Signature Section */}
                <div className="mt-4">


                    {/* Remark Section */}
                    <div className="mt-2 text-[10px] flex justify-between p-2 bg-gray-50">
                        <div className="ml-2 flex flex-col gap-2">
                            <div className="font-bold mb-1">Remark :</div>
                            <div>Check 1 ==&gt; พนักงานประจำเครื่อง</div>
                            <div>Check 2 ==&gt; หัวหน้างาน Leader up</div>
                            <div>Check 3 ==&gt; Double Check INS</div>
                        </div>


                        <div className="flex gap-1">
                            <FormCheckedBox
                                name="p05_check1By"
                                label="Check 1 By"
                                showDate={false}
                            />

                            <FormCheckedBox
                                name="p05_check2By"
                                label="Check 2 By"
                                showDate={false}
                            />

                            <FormCheckedBox
                                name="p05_check3By"
                                label="Check 3 By"
                                showDate={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </A4Paper>
    );
};

export default Page5;