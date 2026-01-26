import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormEDWVersionCheck from "@/components/FormComponents/FormEDWVersionCheck";
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import { content } from "../FAWI0002_V3-setting";
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page1() {
    const { register } = useFormContext();

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col gap-2">
                <SectionTitle>1. Data Gain and Data Torque Check , Date /time</SectionTitle>
                <div className="ml-4">
                    <FormItemCheck
                        name="p1_dataGainCheck"
                        label="Data Gain and Data Torque Check   Date Version : "
                        input={{ name: "p1_dateVersion", width: "200px" }}
                    />
                    <FormItemCheck
                        name="p1_check2"
                        items={[
                            { label: "Date : " },
                            { input: { name: "p1_date", width: "100px" } },
                            { label: "   Time : " },
                            { input: { name: "p1_time", width: "80px" } },
                            { label: "   Checked by : " },
                            { input: { name: "p1_checkedBy", width: "150px" } }
                        ]}
                    />
                </div>

                <SectionTitle>2. Version Check</SectionTitle>
                <div className="ml-4">
                    <FormEDWVersionCheck prefix="p1_vcheck_" />
                </div>

                <SectionTitle>3. Setting Data Check </SectionTitle>
                <div className="ml-4">
                    <p className="text-sm">3.1 Motor Max Speed : (Manage - Parameter - Axis - Page 1, 2)</p>
                    <div className="ml-4">
                        <FormItemCheck
                            name="p1_SettingDataCheck_1"
                            label="STD Type (X,Y AXIS)  :  MOTOR MAX SPEED = 3000"
                            input={{ name: "p1_dateVersion_1", width: "150px" }}
                        />
                        <FormItemCheck
                            name="p1_SettingDataCheck_2"
                            label="CE Type  (X,Y AXIS)  :  MOTOR MAX SPEED = 2000"
                            input={{ name: "p1_dateVersion_2", width: "150px" }}
                        />
                    </div>

                    <p className="mt-2 text-sm text-black">3.2 Safety Function : (Manage - Parameter - Iguanodon - Secret 2 - Page 4)</p>
                    {/* Table 3.2: Safety Function */}
                    <div className="flex w-full justify-between">
                        <FormQuickTable
                            columns={[
                                { header: '', key: 'label', align: 'left', width: '40%' },
                                { header: 'STD SPEC', key: 'std', type: 'input', headerCheckbox: 'p1_sf_std_check' },
                                { header: 'CE SPEC', key: 'ce', type: 'input', headerCheckbox: 'p1_sf_ce_check' },
                            ]}
                            data={[
                                { label: 'MODE SWITCH KIND', std: 'p1_sf_std_mode', ce: 'p1_sf_ce_mode', defaultValue: '00' },
                                { label: 'CE STANDARD MACHINE', std: 'p1_sf_std_ce_std', ce: 'p1_sf_ce_ce_std', defaultValue: 'OFF' },
                                { label: 'CE SPEED LIMIT', std: 'p1_sf_std_speed', ce: 'p1_sf_ce_speed', defaultValue: '3000' },
                                { label: 'CE R AXIS SPEED LIMIT', std: 'p1_sf_std_r_speed', ce: 'p1_sf_ce_r_speed', defaultValue: '00' },
                                { label: 'SP SAFETY DEVICE', std: 'p1_sf_std_device', ce: 'p1_sf_ce_device', defaultValue: '101' },
                                { label: 'SP SAFETY FUNCTION 1', std: 'p1_sf_std_func1', ce: 'p1_sf_ce_func1', defaultValue: '001000000' },
                                { label: 'SP SAFETY FUNCTION 2', std: 'p1_sf_std_func2', ce: 'p1_sf_ce_func2', defaultValue: '0' },
                            ]}
                        />
                        <div className="mt-5 mr-10">
                            <FormCheckedBox name="p1_sf_checked_by" label="Checked by :" />
                        </div>
                    </div>

                    <p className="text-sm mt-4">3.3 Data TPCS </p>
                    {/* Table 3.3: Data TPCS */}
                    <FormQuickTable
                        columns={[
                            { header: 'PAGE', key: 'page', rowGroup: true, width: '35%' },
                            { header: 'CHECK POINT', key: 'point', align: 'left' },
                            { header: 'DATA', key: 'data', width: '15%' },
                            { header: 'CHECK', key: 'check', type: 'checkbox', width: '10%' },
                        ]}
                        data={[
                            { page: 'Manage - Parameter - Flag - Page1/4', point: 'THERMAL MULTIFIT', data: 'OFF', check: 'p1_tpcs_thermal' },
                            { page: 'Manage - Parameter - Iguanodon\n- Secret - Page3/4', point: 'STPC SYSTEM', data: 'ON', check: 'p1_tpcs_stpc_sys' },
                            { page: 'Manage - Parameter - Iguanodon\n- Secret - Page3/4', point: 'STPC ERROR LIMMT', data: '0.1', check: 'p1_tpcs_stpc_err' },
                        ]}
                    />

                    {/* Bottom Table: Machine Settings */}
                    <div className="mt-4">
                        <FormQuickTable
                            columns={[
                                { header: '', key: 'label', align: 'left', width: '70%' },
                                { header: 'AL400G & AL600G', key: 'val', type: 'input', headerCheckbox: 'p1_bottom_check' },
                            ]}
                            data={[
                                { label: 'SLIT AWT BACK (Mange - Parameter - Machine - Page1/12)', val: 'p1_slit_awt', defaultValue: '2.0' },
                                { label: 'V MAX (Mange - Parameter - Dish - Dish1/13)', val: 'p1_v_max', defaultValue: '90' },
                                { label: 'DPW V MAX (Mange - Parameter - Dish - Dish2/13)', val: 'p1_dpw_v_max', defaultValue: '190' },
                                { label: 'EXTENSION (Mange - Parameter - Operation 1/2)', val: 'p1_extension', defaultValue: 'NC' },
                                { label: 'POWER SUPPLY KIND (Mange - Parameter - Iguanodon - Secret - Dish1/4)', val: 'p1_power_kind', defaultValue: '5' },
                                { label: 'MACHINE FUNCTION 3 (Mange - Parameter - Iguanodon - Secret - Dish3/4)', val: 'p1_mach_func3', defaultValue: '111' },
                                { label: 'SFCC SPEED MAX (Mange - Parameter - Iguanodon - Secret - Dish3/4)', val: 'p1_sfcc_speed', defaultValue: '999' },
                            ]}
                        />
                    </div>

                </div>
            </div>
        </A4Paper>
    );
}

export default Page1;
