import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import CompactImageUpload from "@/components/FormComponents/CompactImageUpload";
import { content, apiEndpoint } from "../FAWI0026_V2-setting";

// Import images for parts
import image1 from "@/assets/FAWI0026_V2/p3-image1.png";
import image2 from "@/assets/FAWI0026_V2/p3-image2.png";
import image3 from "@/assets/FAWI0026_V2/p3-image3.png";
import image4 from "@/assets/FAWI0026_V2/p3-image4.png";
import image5 from "@/assets/FAWI0026_V2/p3-image5.png";
import image6 from "@/assets/FAWI0026_V2/p3-image6.png";
import image7 from "@/assets/FAWI0026_V2/p3-image7.png";
import image8 from "@/assets/FAWI0026_V2/p3-image8.png";
import image9 from "@/assets/FAWI0026_V2/p3-image9.png";

const Page3 = () => {
    const prefix = "p03_dc";
    const { control, setValue } = useFormContext();

    // Watch global form metadata for folder creation and filename generation
    const currentModel = useWatch({ control, name: 'model' }) || 'UNKNOWN';
    const watchMachineNo = useWatch({ control, name: 'machineNo' });
    const watchMachine_no = useWatch({ control, name: 'machine_no' });
    const currentMachineNo = watchMachineNo || watchMachine_no || 'UNKNOWN';

    const columns = [
        { key: 'id', header: 'No.', width: '30px', className: 'text-center align-top text-[10px]' },
        {
            key: 'partName',
            header: 'Part Name',
            width: '160px',
            align: 'left',
            className: 'align-top',
            render: (val, row, { register }) => (
                <div className="flex flex-col gap-0.5 text-[10px] leading-tight">
                    <div className="font-bold">{val}</div>
                    {row.internalCheckboxes && row.internalCheckboxes.map((cb, idx) => (
                        <label key={idx} className="flex items-center gap-1 cursor-pointer">
                            <input type="checkbox" {...register(`${prefix}_${row.id}_pn_cb${idx}`)} className="w-3.5 h-3.5" />
                            <span>{cb}</span>
                        </label>
                    ))}
                    {row.partNote && <div className="text-[8px] text-gray-500 whitespace-pre-wrap">{row.partNote}</div>}
                    {/* Hidden input to store partName for filename generation on server */}
                    <input type="hidden" {...register(`${prefix}_${row.id}_partName`)} value={val} />
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
                                        <div key={idx} className="flex items-center gap-1 mb-0.5">
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
                    <div className="flex flex-col gap-0.5 h-full justify-between items-center text-[10px]">
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
                    <div className="flex flex-col items-center gap-0.5 h-full justify-between text-[10px]">
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
                id: 1,
                partName: "Conductivity Piece",
                picture: image1,
                internalCheckboxes: ["(Upper Guide) = 1 pc", "(Lower Guide) = 1 pc"],
                check1Items: ["ประกอบครบ"]
            },
            {
                id: 2,
                partName: "Nozzle Base\nNozzle C\n(Upper Guide)",
                picture: image2,
                check1Items: ["ไม่มีรอยขีดข่วน"]
            },
            {
                id: 3,
                partName: "Nozzle C (Upper Guide)",
                picture: image3,
                partNote: "D4 : USA (BRAZIL, MAXICO) &\nERP (NETHERLANDS, ITALY, TURKEY)\n\nD6 : Other Country.",
                check1Items: [
                    { type: 'text', label: "ประเทศ" },
                    { type: 'checkbox', label: "Nozzle D4" },
                    { type: 'checkbox', label: "Nozzle D6" }
                ]
            },
            {
                id: 4,
                partName: "F Roller (Wire Feed R)",
                picture: image4,
                check1Items: ["ใส่กระดาษ\nและรัดยางแล้ว"]
            },
            {
                id: 5,
                partName: "Felt unit (Wire Feed R)",
                picture: image5,
                check1Items: [
                    "ตรวจสอบ Spring\nของ Felt unit ทั้ง 2 ตัว\nว่าสปริงตัวดีหรือไม่",
                    "Felt ทั้ง 2 ตำแหน่ง\nต้องไม่สกปรก,ดำ\n* ถ้าพบว่าสกปรกให้แจ้ง\nSemi-1 มาเปลี่ยนใหม่"
                ],
    
            },
            {
                id: 6,
                partName: "Splash Sheet",
                picture: image6,
                internalCheckboxes: ["ตรวจสอบการประกอบ"],
                check1Items: [
                    "ประกอบครบ",
                    "หมุนแล้วไม่หลุด\nหมุนแล้วไม่ฝืด"
                ]
            },
            {
                id: 7,
                partName: "Retry Unit",
                picture: image7,
                internalCheckboxes: ["ตรวจสอบการประกอบ"],
                check1Items: ["ตรวจสอบ\nMagnet กับ Catch plate\nจะต้องติดกันแนบสนิท"]
            },
            {
                id: 8,
                partName: "EL Front Cover",
                picture: image8,
                internalCheckboxes: ["ตรวจสอบการประกอบ"],
                check1Items: ["ติดเทปกาวสีดำ"]
            },
            {
                id: 9,
                partName: "Shock Watch\n(CXX-65 (DOUBLE CLIP))",
                picture: image9,
                check1Items: ["ติดที่ Bed ตำแหน่ง\nLock แกน X"]
            },
        ];

    return (
        <A4Paper content={content} currentPage={3}>
            <div className="p-1 flex flex-col h-full bg-white">
                <h2 className="text-[12px] font-bold mb-1">2. Complete Part Check</h2>

                <div className="flex-1 overflow-hidden">
                    <FormQuickTable
                        columns={columns}
                        data={data}
                        className="w-full"
                    />
                </div>


            </div>
        </A4Paper>
    );
};

export default Page3;