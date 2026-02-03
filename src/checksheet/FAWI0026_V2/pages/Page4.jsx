import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormQuickTable from "@/components/FormComponents/FormQuickTable";
import CompactImageUpload from "@/components/FormComponents/CompactImageUpload";
import { content, apiEndpoint } from "../FAWI0026_V2-setting";

// Import images for parts
import image1 from "@/assets/FAWI0026_V2/p4-image1.png";
import image2 from "@/assets/FAWI0026_V2/p4-image2.png";
import image3 from "@/assets/FAWI0026_V2/p4-image3.png";
import image4 from "@/assets/FAWI0026_V2/p4-image4.png";
import image5 from "@/assets/FAWI0026_V2/p4-image5.png";
import image6 from "@/assets/FAWI0026_V2/p4-image6.png";
import image7 from "@/assets/FAWI0026_V2/p4-image7.png";
import image8 from "@/assets/FAWI0026_V2/p4-image8.png";
import image9 from "@/assets/FAWI0026_V2/p4-image9.png";
import image10 from "@/assets/FAWI0026_V2/p4-image10.png";

const Page4 = () => {
    const prefix = "p04_dc";
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
            width: '160px',
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
                    <div className="flex flex-col text-[10px] leading-tight h-full justify-between">
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
                        <div className="mt-1 border-t border-gray-100">
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
                id: 10,
                partName: "Terminal Body\n(AWT Unit)",
                picture: image1,
                check1Items: ["รัดสาย belt แล้ว"]
            },
            {
                id: 11,
                partName: "Discharge Cable",
                picture: image2,
                internalCheckboxes: ["(Upper Guide)", "(Lower Guide)"],
                check1Items: ["ไม่มีรอยขีดข่วน\nสกรูที่ล็อคแน่น"]
            },
            {
                id: 12,
                partName: "Workstand\nCap Screw",
                picture: image3,
                check1Items: [
                    "1. ไม่มีรอยขีดข่วน,\nรอยด่าง, สนิม",
                    "2. อุด Cap ครบทุกจุด",
                    "3. Cap ทุกตัวต้องไม่สูง\nเกินผิวของ Workstand"
                ]
            },
            {
                id: 13,
                partName: "**เฉพาะ ALN600G**\nนำสกรูที่ถอดจาก Bed Cover-R1\n(CR M5x10 + Poly = 1 Pc.)\nแพ็คบน Work Stand",
                picture: image4,
                check1Items: [
                    "แพ็คใส่ถุงพลาสติกวางบน Work Stand"
                ]
            },
            {
                id: 14,
                partName: "Leveling Adjuster",
                picture: image5,
                check1Items: [
                    "ขันขึ้นจนสุดและล็อค\nMark สีขาว,เขียว\nทาจารบีที่ Leveling\nAdjuster ทั้ง 5 ตำแหน่ง",
                    "ตรวจสอบ Pad\nและสกรูโดยการใช้ Scale\nรูดหาก Scale รูดไม่ผ่าน"
                ]
            },
            {
                id: 15,
                partName: "ตรวจสอบการประกอบสกรูที่แปรง",
                picture: image6,
                check1Items: ["ตรวจสอบการ\nประกอบสกรูที่ชุดแปรง"]
            },
            {
                id: 16,
                partName: "Snail Guide (Wire Feed L)",
                picture: image7,
                check1Items: ["Snail Guide\nจะต้องไม่หลุดหลวม"]
            },
            {
                id: 17,
                partName: "Pulley Unit (Wire Feed L)",
                picture: image8,
                check1Items: ["เก็บยึดชุด\nPulley Unit แล้ว"]
            },
            {
                id: 18,
                partName: "**เครื่องที่ ไม่มี Wire Feeder 20 kg**\nBobbin Shaft & Bobbin Lock\n(Wire Feed L)",
                picture: image9,
                check1Items: ["ล็อค bobbin lock\nเพิ่มอีก 30 องศา\nหลังจากหมุนแตะแล้ว"]
            },
            {
                id: "18b",
                partName: "**เครื่องที่ มี Wire Feeder 20 kg**\nBobbin Shaft & Bobbin Lock\n(Wire Feed L)",
                picture: image10,
                check1Items: ["ล็อค bobbin lock\nเพิ่มอีก 60 องศา\nหลังจากหมุนแตะแล้ว"]
            },
        ];

    return (
        <A4Paper content={content} currentPage={4}>
            <div className="p-1 flex flex-col h-full bg-white">
                <div className="flex-1 overflow-hidden px-1">
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

export default Page4;