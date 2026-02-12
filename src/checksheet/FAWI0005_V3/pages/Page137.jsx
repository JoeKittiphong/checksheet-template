
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import { useFormContext } from 'react-hook-form';

// Placeholder images
import nozzleImg1 from "@/assets/FAWI0005_V3/page137_nozzle_1.png";
import nozzleImg2 from "@/assets/FAWI0005_V3/page137_nozzle_2.png";

import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

function Page137() {
    const { register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={137}>
            <div className="font-sans text-xs px-2">

                {/* Section 29 */}
                <SectionTitle>29. ECO System Check</SectionTitle>
                <div className="pl-4 mt-2 relative">
                    <FormItemCheck
                        name="p137_eco_program_yask_fuji"
                        label="Run Program ECO : CHECK_ECO_AL-SPW_V05_YASK_FUJI"
                    />
                    <div className="flex items-center">
                        <FormItemCheck
                            name="p137_eco_program_dsm_voo"
                            label="Run Program ECO : CHECK_ECO_AL-SPW_DSM_VOO"
                        />
                        <span className="text-red-500 ml-4 font-bold text-[10px]">(เฉพาะOption DSM) Ver.Program refer Eng. inform</span>
                    </div>

                    <FormItemCheck
                        name="p137_record_run_program"
                        label="Record ค่าผลการ Run Program ลงในช่องว่างด้านล่าง"
                    />

                    <div className="mt-1 mb-2 pl-8">
                        <FormInputCheckSTD
                            label="-H0005 ="
                            name="p137_h0005"
                            minStd={38}
                            maxStd={44}
                            unit="(STD = 38 ~ 44 L/Min)"
                            inputWidth="w-32"
                        />
                        <FormInputCheckSTD
                            label="-H0007 ="
                            name="p137_h0007"
                            minStd={37}
                            maxStd={43}
                            unit="(STD = 37 ~ 43 Hz)"
                            inputWidth="w-32"
                        />
                        <FormInputCheckSTD
                            label="-H0010 ="
                            name="p137_h0010"
                            validateStd={false}
                            unit=""
                            inputWidth="w-32"
                        />
                        <FormInputCheckSTD
                            label="-H0014 ="
                            name="p137_h0014"
                            minStd={32}
                            maxStd={38}
                            unit="(STD = 32 ~ 38 Hz)"
                            inputWidth="w-32"
                        />
                        <FormInputCheckSTD
                            label="-H0018 ="
                            name="p137_h0018"
                            minStd={52}
                            maxStd={58}
                            unit="(STD = 52 ~ 58 Hz)"
                            inputWidth="w-32"
                        />
                    </div>

                    <FormItemCheck
                        name="p137_check_spump_aa"
                        label="ตรวจสอบค่า SPUMP SETTING COEF ab (Manage-Parameter-Machine-P.11)"
                    />
                    <div className="flex items-start text-xs mb-1 pl-12 flex-col">
                        <FormInputCheckSTD
                            label="-SPUMP SETTING COEF aa ="
                            name="p137_spump_aa"
                            unit="(STD G-TYPE = 001184200)"
                            inputWidth="w-40"
                            validateStd={false}
                        />
                        <div className="pl-[350px] -mt-1">
                            <span className="text-[14px] block">(STD Q-TYPE = 001113600)</span>
                            <span className="text-[14px] block">(STD P-TYPE = 001454400)</span>
                        </div>
                    </div>

                    <FormItemCheck
                        name="p137_check_spump_ab"
                        label="ตรวจสอบค่า SPUMP SETTING COEF ab (Manage-Parameter-Machine-P.11)"
                    />
                    <div className="flex items-start text-xs mb-1 pl-12 flex-col">
                        <FormInputCheckSTD
                            label="-SPUMP SETTING COEF ab ="
                            name="p137_spump_ab"
                            unit="(STD G-TYPE = -004379000)"
                            inputWidth="w-40"
                            validateStd={false}
                        />
                        <div className="pl-[350px] -mt-1">
                            <span className="text-[14px] block">(STD Q-TYPE = -004482000)</span>
                            <span className="text-[14px] block">(STD P-TYPE = -003428000)</span>
                        </div>
                    </div>

                    <FormItemCheck
                        name="p137_save_nc_file"
                        label="Save ผลการรัน NC File ลงในเครื่องจักรด้วย [Edit-File-Disk]"
                    />

                    <FormItemCheck
                        name="p137_setting_gadget_eco"
                        label="Setting Gadget ECO ที่หน้าจอ CNT"
                    />

                    <div className="pl-8">
                        <div className="font-bold underline mb-1">กรณีมี UPS</div>
                        <FormInputCheckSTD label="-Power Recovery Setting =" name="p137_ups_power_recovery" unit="(STD = 03)" inputWidth="w-40" />
                        <FormInputCheckSTD label="-UPS ST HALT DELAY =" name="p137_ups_halt_delay" unit="(STD = 200) [Secret2-P.4]" inputWidth="w-40" />

                        <div className="font-bold underline mb-1 mt-2">กรณีไม่มี UPS</div>
                        <FormInputCheckSTD label="-Power Recovery Setting =" name="p137_no_ups_power_recovery" unit="(STD = 00)" inputWidth="w-40" />
                        <FormInputCheckSTD label="-UPS ST HALT DELAY =" name="p137_no_ups_halt_delay" unit="(STD = 00) [Secret2-P.4]" inputWidth="w-40" />
                    </div>

                    <div className="mt-4 flex justify-end pr-10 absolute bottom-0 right-[-40px]">
                        <FormCheckedBox
                            name="p137_eco_checked_by"
                            label="Checked by :"
                            labelClassName="font-bold text-sm mr-2"
                            inputClassName="w-40 border-b border-black"
                        />
                    </div>
                </div>

                {/* Section 30 */}
                <div className="mt-4">
                    <SectionTitle>30.After Ecc Checked, Please change the Upper Guide & Lower Guide Nozzle to D.4</SectionTitle>
                    <div className="pl-4 mt-1 mb-2">
                        <span className="text-xs">*** ตรวจสอบ Nozzle ตัวใหม่ต้องไม่มีรอยหรือความเสียหาย</span>
                    </div>

                    <div className="flex justify-around items-end">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center mb-1">
                                <FormItemCheck name="p137_upper_guide_check" label="" />
                                <span className="underline ml-1 font-bold">Upper Guide</span>
                            </div>
                            <div className="w-48 h-48 flex items-center justify-center bg-gray-50">
                                <img
                                    src={nozzleImg1}
                                    alt="Upper Guide Nozzle"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px] p-2 text-center">Image not found: page137_nozzle_1.png</span>'; }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center mb-1">
                                <FormItemCheck name="p137_upper_guide_check_2" label="" /> {/* Label in image says Upper Guide for both, assuming typo in image or intentional. Keeping as image. */}
                                <span className="underline ml-1 font-bold">Upper Guide</span>
                            </div>
                            <div className="w-48 h-48 flex items-center justify-center bg-gray-50">
                                <img
                                    src={nozzleImg2}
                                    alt="Lower Guide Nozzle"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px] p-2 text-center">Image not found: page137_nozzle_2.png</span>'; }}
                                />
                            </div>
                        </div>
                    <div className="mt-4 flex justify-end pr-10">
                        <FormCheckedBox
                            name="p137_nozzle_checked_by"
                            label="Checked by :"
                            labelClassName="font-bold text-sm mr-2"
                            inputClassName="w-40 border-b border-black"
                        />
                    </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page137;