import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import ImageUploadBox from '@/components/FormComponents/ImageUploadBox';
import TristateCheckbox from '@/components/UIcomponent/TristateCheckbox';
import { content } from "../ASSY_PROBLEM-setting";

function Page1({ apiEndpoint }) {
    const { register, setValue, control } = useFormContext();

    const problemDetailVal = useWatch({
        control,
        name: "problem_detail",
        defaultValue: ""
    });

    const DIV_FIELDS = ['div_semi', 'div_body', 'div_mc', 'div_insp', 'div_acc', 'div_other'];
    const FIX_FIELDS = ['fix_semi', 'fix_body', 'fix_mc', 'fix_insp', 'fix_acc', 'fix_other'];

    const handleExclusive = (name, isChecked, group) => {
        if (isChecked) {
            group.forEach(field => {
                if (field !== name) {
                    setValue(field, false);
                }
            });
        }
    };

    const CustomCheckbox = ({ field, label, group }) => (
        <label className="flex items-center gap-1 cursor-pointer">
            <input
                type="checkbox"
                {...register(field)}
                onChange={(e) => {
                    register(field).onChange(e);
                    handleExclusive(field, e.target.checked, group);
                }}
                className="appearance-none w-4 h-4 border border-black bg-transparent checked:bg-black checked:relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-[10px] checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 flex items-center justify-center transition-colors"
            />
            <span>{label}</span>
        </label>
    );

    return (
        <A4Paper className="!bg-yellow-200">
            {/* Header Section */}
            <div className=" bg-yellow-200">
                <h1 className="text-center font-bold text-xl mb-2 pb-2">ASS'Y PROBLEM FORM</h1>

                {/* Division Checkboxes */}
                <div className="flex mb-2 text-sm">
                    <span className="font-bold w-1/4">ASSEMBLY DIVISION :</span>
                    <div className="flex w-3/4 gap-4 flex-wrap">
                        {DIV_FIELDS.map((field, index) => {
                            const labels = ["Semi", "Body", "M/C Check", "Inspection", "Accuracy", "Other"];
                            return (
                                <CustomCheckbox key={field} field={field} label={labels[index]} group={DIV_FIELDS} />
                            );
                        })}
                    </div>
                </div>

                {/* Machine Info */}
                <div className="flex gap-4 mb-2 text-sm">
                    <FormItemCheck name="mc_model" label="MACHINE MODEL :" input={{ name: "mc_model_input", width: "100px" }} showCheckbox={false} />
                    <FormItemCheck name="mc_no" label="MACHINE NO. :" input={{ name: "mc_no_input", width: "100px" }} showCheckbox={false} />
                    <FormItemCheck name="date" label="DATE :" input={{ name: "date_input", type: "date", width: "120px" }} showCheckbox={false} />
                </div>

                {/* Problem Detail */}
                <div className="mb-2">
                    <p className="font-bold text-sm mb-1">PROBLEM DETAIL ( รายละเอียดปัญหางาน ) :</p>
                    <div className='flex gap-4 items-stretch'>
                        {/* Image Attachment Area */}
                        <div className="shrink-0 h-[150px]">
                            <ImageUploadBox
                                name="problem_image"
                                apiEndpoint={apiEndpoint}
                                uploadPath="/api/upload/assy"
                                label="แนบภาพปัญหาที่พบ"
                                deferred={true}
                                className="h-[150px] w-auto min-w-[250px] border-2 border-dashed border-gray-400"
                            />
                        </div>
                        <div className="flex-1 flex pb-1">
                            <textarea
                                {...register("problem_detail")}
                                className={`w-full h-full bg-transparent border ${problemDetailVal ? 'border-transparent' : 'border-gray-600'} outline-none p-2 resize-none`}
                                placeholder="รายละเอียดปัญหางาน..."
                            />
                        </div>
                    </div>
                </div>

                {/* Signatures & Time */}
                <div className="flex pt-2 mt-4 text-sm">
                    <div className="w-1/2 flex gap-2 pr-2">
                        <FormCheckedBox
                            name="record_sign"
                            label="Record by / Date"
                            className="w-1/2 h-30 !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                            secondaryField="code"
                        />
                        <FormCheckedBox
                            name="check_sign"
                            label="Checked by / Date"
                            className="w-1/2 h-30 !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                            secondaryField="code"
                        />
                    </div>
                    <div className="w-1/2 pl-2">
                        <p className="text-center font-bold mb-4">START TIME (เวลาที่แจ้งปัญหางาน)</p>
                        <div className="flex items-end justify-center">
                            <span className="font-bold mr-2">START :</span>
                            <input type="time" {...register("problem_start_time")} className="border-b border-black bg-transparent outline-none w-32 text-center" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Correction Section */}
            <div className=" p-2 bg-yellow-200 mb-2">
                {/* Checkboxes */}
                <div className="flex mb-2 text-sm">
                    <span className="font-bold w-1/3 shrink-0">กลุ่มงานที่แก้ไขปัญหา :</span>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 w-full">
                        {FIX_FIELDS.map((field, index) => {
                            const labels = ["Semi", "Body", "M/C Check", "Inspection", "Accuracy", "Other ( EL , SM , MA , CE , VENDER )"];
                            return (
                                <CustomCheckbox key={field} field={field} label={labels[index]} group={FIX_FIELDS} />
                            );
                        })}
                    </div>
                </div>

                <p className="font-bold text-sm mb-2 pt-1">METHOD FOR CORRECTION DETAIL ( รายละเอียดเกี่ยวกับวิธีการแก้ไขปัญหา ) :</p>

                {/* Table */}
                <table className="w-full border border-black border-collapse text-sm">
                    <thead>
                        <tr>
                            <th className="border border-black p-1 w-8">No.</th>
                            <th className="border border-black p-1">Repaired Position (ตำแหน่งที่แก้ไขปัญหา)</th>
                            <th className="border border-black p-1">Method (วิธีการแก้ไขปัญหา)</th>
                            <th className="border border-black p-1">Result of Repaired (ผลลัพธ์ของการแก้ไขปัญหา)</th>
                            <th className="border border-black p-1 w-12">Check</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4].map(row => (
                            <tr key={row}>
                                <td className="border border-black p-1 text-center h-10">{row}</td>
                                <td className="border border-black p-1"><input {...register(`repaired_position_${row}`)} className="w-full bg-transparent outline-none" /></td>
                                <td className="border border-black p-1"><input {...register(`repair_method_${row}`)} className="w-full bg-transparent outline-none" /></td>
                                <td className="border border-black p-1"><input {...register(`repair_result_${row}`)} className="w-full bg-transparent outline-none" /></td>
                                <td className="p-1 text-center flex justify-center items-center h-full">
                                    <Controller
                                        name={`check_result_${row}`}
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => (
                                            <TristateCheckbox
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="!border-black !bg-transparent"
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Section */}
            <div className="p-2 bg-yellow-200 text-sm">
                <div className="flex justify-between items-center mb-2 pb-1">
                    <p className="font-bold">CONFIRM AFTER CORRECTION (ยืนยันหลังจากแก้ไขปัญหางาน) :</p>
                    <span className="text-xs">* Remark : Check OK = ✓</span>
                </div>

                <div className="ml-4 mb-4 space-y-1">
                    <FormItemCheck name="confirm_resolved" label="Confirmed this problem was resolved. (ยืนยันปัญหานี้ได้ผ่านการแก้ไขเรียบร้อยแล้ว)" checkboxSize="w-5 h-5 !border-black !bg-transparent" />
                    <FormItemCheck name="confirm_tools" label="All screws and Tools remove from repair area. (นำสกรูและเครื่องมือทั้งหมดออกจากบริเวณที่แก้ไขปัญหา)" checkboxSize="w-5 h-5 !border-black !bg-transparent" />
                    <FormItemCheck name="confirm_clean" label="Cleaning Grease, Tap, Silicone, etc. in repair area. (ทำความสะอาด จารบี, เทปกาว, ซิลิโคน และอื่นๆ ในบริเวณที่แก้ไขปัญหา)" checkboxSize="w-5 h-5 !border-black !bg-transparent" />
                </div>

                <div className="flex">
                    <FormCheckedBox
                        name="sign_repaired"
                        label={<div className="text-center w-full">Repaired by / Date<br />(พนักงานที่แก้ไขปัญหา)</div>}
                        className="flex-1 h-32 !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                        secondaryField="code"
                    />
                    <FormCheckedBox
                        name="sign_checked"
                        label={<div className="text-center w-full">Checked by / Date<br />(Leader Up ของกลุ่มที่แก้ไขปัญหา)</div>}
                        className="flex-1 h-32 -ml-[1px] !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                        secondaryField="code"
                    />
                    <FormCheckedBox
                        name="sign_confirmed"
                        label={<div className="text-center w-full">Confirmed by / Date<br />(Leader Up ของกลุ่มที่แจ้งซ่อม)</div>}
                        className="flex-1 h-32 -ml-[1px] !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                        secondaryField="code"
                    />
                    <FormCheckedBox
                        name="sign_approved"
                        label={<div className="text-center w-full">Approved by / Date<br />(Sup. Up ของกลุ่มที่แจ้งซ่อม)</div>}
                        className="flex-1 h-32 -ml-[1px] !text-black !bg-transparent [&_div]:!bg-transparent [&_input]:!text-black"
                        secondaryField="code"
                    />
                    <div className="w-40 p-2 flex flex-col gap-4 justify-center">
                        <div className="font-bold text-center">REPAIR TIME</div>
                        <div className="flex justify-between items-center text-xs">
                            <span>START :</span>
                            <input
                                type="time"
                                {...register("repair_start_time")}
                                className="border-b border-black w-24 bg-transparent text-center outline-none"
                            />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span>FINISH :</span>
                            <input
                                type="time"
                                {...register("repair_finish_time")}
                                className="border-b border-black w-24 bg-transparent text-center outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;
