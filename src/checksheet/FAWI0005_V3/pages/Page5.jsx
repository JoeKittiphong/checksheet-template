import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';


function Page5() {

    // --- 5.1 TM circuit voltage check Data ---

    // Parameter Table (Static)
    const paramTable5_1 = [
        { c: "C777", on: "100", off: "018", ip: "2015", hrp: "000", mao: "370", sv: "+60.0", v: "1.0", sf: "0050", c_val: "0", pik: "000" }
    ];
    const paramColumns5_1 = [
        { header: "", key: "c", width: "10%", className: "text-center" },
        { header: "ON", key: "on", width: "8%", className: "text-center" },
        { header: "OFF", key: "off", width: "8%", className: "text-center" },
        { header: "IP", key: "ip", width: "10%", className: "text-center" },
        { header: "HRP", key: "hrp", width: "8%", className: "text-center" },
        { header: "MAO", key: "mao", width: "8%", className: "text-center" },
        { header: "SV", key: "sv", width: "10%", className: "text-center" },
        { header: "V", key: "v", width: "8%", className: "text-center" },
        { header: "SF", key: "sf", width: "10%", className: "text-center" },
        { header: "C", key: "c_val", width: "5%", className: "text-center" },
        { header: "PIK", key: "pik", width: "8%", className: "text-center" },
    ];

    const paramTable5_1_Right = [
        { wk: "020", wt: "120", ws: "030", wp: "012", pc: "0000" }
    ];
    const paramColumns5_1_Right = [
        { header: "WK", key: "wk", width: "20%", className: "text-center" },
        { header: "WT", key: "wt", width: "20%", className: "text-center" },
        { header: "WS", key: "ws", width: "20%", className: "text-center" },
        { header: "WP", key: "wp", width: "20%", className: "text-center" },
        { header: "PC", key: "pc", width: "20%", className: "text-center" },
    ];

    // AL400G Table
    const dataAL400G = [
        { sig: "(Std:80+2)", v_l: "V0", volt_l: "DC 70 V", v_r: "V5", volt_r: "DC 170 V", measured_l: "p5_al400_v0_meas", setting_l: "p5_al400_v0_set", measured_r: "p5_al400_v5_meas", setting_r: "p5_al400_v5_set", measured_l_min: 69, measured_l_max: 71, measured_r_min: 169, measured_r_max: 171 },
        { sig: "---", v_l: "V1", volt_l: "80 V", v_r: "V6", volt_r: "195 V", measured_l: "p5_al400_v1_meas", setting_l: "p5_al400_v1_set", measured_r: "p5_al400_v6_meas", setting_r: "p5_al400_v6_set", measured_l_min: 79, measured_l_max: 81, measured_r_min: 194, measured_r_max: 196 },
        { sig: "---", v_l: "V2", volt_l: "95 V", v_r: "V7", volt_r: "230 V", measured_l: "p5_al400_v2_meas", setting_l: "p5_al400_v2_set", measured_r: "p5_al400_v7_meas", setting_r: "p5_al400_v7_set", measured_l_min: 94, measured_l_max: 96, measured_r_min: 229, measured_r_max: 231 },
        { sig: "---", v_l: "V3", volt_l: "115 V", v_r: "V8", volt_r: "245 V", measured_l: "p5_al400_v3_meas", setting_l: "p5_al400_v3_set", measured_r: "p5_al400_v8_meas", setting_r: "p5_al400_v8_set", measured_l_min: 114, measured_l_max: 116, measured_r_min: 244, measured_r_max: 246 },
        { sig: "---", v_l: "V4", volt_l: "140 V", v_r: "V9", volt_r: "290 V", measured_l: "p5_al400_v4_meas", setting_l: "p5_al400_v4_set", measured_r: "p5_al400_v9_meas", setting_r: "p5_al400_v9_set", measured_l_min: 139, measured_l_max: 141, measured_r_min: 289, measured_r_max: 291 },
    ];

    const columnsVoltageCheck = [
        { header: "Sig_Data", key: "sig", width: "10%", className: "text-center text-[9px]" },
        { header: "V *", key: "v_l", width: "5%", className: "text-center bg-gray-200" },
        { header: "Voltage STD / HSP", key: "volt_l", width: "12%", className: "text-center font-bold" },
        { header: "Measured Voltage (+1V)", key: "measured_l", width: "12%", className: "text-center p-0", type: "input", suffix: " V" },
        { header: "Data Setting", key: "setting_l", width: "11%", className: "text-center p-0", type: "input" },
        { header: "V *", key: "v_r", width: "5%", className: "text-center bg-gray-200" },
        { header: "Voltage STD / HSP", key: "volt_r", width: "12%", className: "text-center font-bold" },
        { header: "Measured Voltage (+1V)", key: "measured_r", width: "12%", className: "text-center p-0", type: "input", suffix: " V" },
        { header: "Data Setting", key: "setting_r", width: "11%", className: "text-center p-0", type: "input" },
    ];

    // AL600G Table (Similar structure, different values)
    const dataAL600G = [
        { sig: "(Std:80+2)", v_l: "V0", volt_l: "DC 70 V", v_r: "V5", volt_r: "DC 180 V", measured_l: "p5_al600_v0_meas", setting_l: "p5_al600_v0_set", measured_r: "p5_al600_v5_meas", setting_r: "p5_al600_v5_set", measured_l_min: 69, measured_l_max: 71, measured_r_min: 179, measured_r_max: 181 },
        { sig: "---", v_l: "V1", volt_l: "80 V", v_r: "V6", volt_r: "210 V", measured_l: "p5_al600_v1_meas", setting_l: "p5_al600_v1_set", measured_r: "p5_al600_v6_meas", setting_r: "p5_al600_v6_set", measured_l_min: 79, measured_l_max: 81, measured_r_min: 209, measured_r_max: 211 },
        { sig: "---", v_l: "V2", volt_l: "100 V", v_r: "V7", volt_r: "250 V", measured_l: "p5_al600_v2_meas", setting_l: "p5_al600_v2_set", measured_r: "p5_al600_v7_meas", setting_r: "p5_al600_v7_set", measured_l_min: 99, measured_l_max: 101, measured_r_min: 249, measured_r_max: 251 },
        { sig: "---", v_l: "V3", volt_l: "120 V", v_r: "V8", volt_r: "265 V", measured_l: "p5_al600_v3_meas", setting_l: "p5_al600_v3_set", measured_r: "p5_al600_v8_meas", setting_r: "p5_al600_v8_set", measured_l_min: 119, measured_l_max: 121, measured_r_min: 264, measured_r_max: 266 },
        { sig: "---", v_l: "V4", volt_l: "150 V", v_r: "V9", volt_r: "310 V", measured_l: "p5_al600_v4_meas", setting_l: "p5_al600_v4_set", measured_r: "p5_al600_v9_meas", setting_r: "p5_al600_v9_set", measured_l_min: 149, measured_l_max: 151, measured_r_min: 309, measured_r_max: 311 },
    ];

    // --- 5.2 Main voltage check Data ---
    const paramTable5_2 = [
        { c: "C777", on: "100", off: "018", ip: "2008", hrp: "000", mao: "370", sv: "+60.0", v: "9.0", sf: "0050", c_val: "0", pik: "000" }
    ];
    const paramTable5_2_Right = [
        { wk: "020", wt: "120", ws: "030", wp: "012", pc: "0*0000" }
    ];

    // Main Voltage Table
    const dataMainVoltage = [
        { pc_l: "000000", volt_l: "DC 80 V", def_l: "80", pc_r: "050000", volt_r: "DC 130 V", def_r: "130", meas_l: "p5_main_00_meas", set_l: "p5_main_00_set", meas_r: "p5_main_05_meas", set_r: "p5_main_05_set", meas_l_min: 79, meas_l_max: 81, meas_r_min: 129, meas_r_max: 131 },
        { pc_l: "010000", volt_l: "90 V", def_l: "90", pc_r: "060000", volt_r: "140 V", def_r: "140", meas_l: "p5_main_01_meas", set_l: "p5_main_01_set", meas_r: "p5_main_06_meas", set_r: "p5_main_06_set", meas_l_min: 89, meas_l_max: 91, meas_r_min: 139, meas_r_max: 141 },
        { pc_l: "020000", volt_l: "100 V", def_l: "100", pc_r: "070000", volt_r: "150 V", def_r: "150", meas_l: "p5_main_02_meas", set_l: "p5_main_02_set", meas_r: "p5_main_07_meas", set_r: "p5_main_07_set", meas_l_min: 99, meas_l_max: 101, meas_r_min: 149, meas_r_max: 151 },
        { pc_l: "030000", volt_l: "110 V", def_l: "110", pc_r: "080000", volt_r: "160 V", def_r: "160", meas_l: "p5_main_03_meas", set_l: "p5_main_03_set", meas_r: "p5_main_08_meas", set_r: "p5_main_08_set", meas_l_min: 109, meas_l_max: 111, meas_r_min: 159, meas_r_max: 161 },
        { pc_l: "040000", volt_l: "120 V", def_l: "120", pc_r: "090000", volt_r: "(160 V)", def_r: "(160)", meas_l: "p5_main_04_meas", set_l: "p5_main_04_set", meas_r: "p5_main_09_meas", set_r: "p5_main_09_set", meas_l_min: 119, meas_l_max: 121, meas_r_min: 159, meas_r_max: 161 },
    ];

    // Add gray background to PC columns in data
    // FormQuickTable supports row.className or column.className.
    // For specific cells, we can use column render or style.
    // I will use column className for gray background for PC key.

    const columnsMainVoltage = [
        { header: "PC*", key: "pc_l", width: "10%", className: "text-center bg-gray-400 font-bold" },
        { header: "Voltage STD / HSP", key: "volt_l", width: "10%", className: "text-center font-bold" },
        { header: "Measured Voltage (+1V)", key: "meas_l", width: "10%", className: "text-center p-0", type: "input", suffix: " V" },
        { header: "Data Setting", key: "set_l", width: "10%", className: "text-center p-0", type: "input" },
        { header: "Default (Ref)", key: "def_l", width: "10%", className: "text-center" },

        { header: "PC*", key: "pc_r", width: "10%", className: "text-center bg-gray-400 font-bold" },
        { header: "Voltage STD / HSP", key: "volt_r", width: "10%", className: "text-center font-bold" },
        { header: "Measured Voltage (+1V)", key: "meas_r", width: "10%", className: "text-center p-0", type: "input", suffix: " V" },
        { header: "Data Setting", key: "set_r", width: "10%", className: "text-center p-0", type: "input" },
        { header: "Default (Ref)", key: "def_r", width: "10%", className: "text-center" },
    ];

    return (
        <A4Paper content={content} currentPage={5}>
            <div className="flex flex-col text-[10px] h-full relative">

                <div className="flex justify-between items-end">
                    <SectionTitle className="mt-0 w-max">5. Discharge power supply voltage check</SectionTitle>
                    <div className="flex flex-col text-xs mb-1">
                        <FormItemCheck name="p5_digital_meter_no" label="Digital meter No." input={{ name: "p5_digital_meter_no_val", width: "100px", className: "border-b border-black text-center" }} showCheckbox={false} />
                        <FormItemCheck name="p5_oscilloscope_no" label="Oscilloscope No." input={{ name: "p5_oscilloscope_no_val", width: "100px", className: "border-b border-black text-center" }} showCheckbox={false} />
                    </div>
                </div>

                {/* 5.1 TM circuit voltage check */}
                <div className="mt-1">
                    <p className="font-bold mb-1">5.1 TM circuit voltage check</p>

                    <div className="flex justify-between items-end">
                        <span>Flushing</span>
                        <span>With out spark</span>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div className="w-[60%]">
                            <FormQuickTable columns={paramColumns5_1} data={paramTable5_1} headerClassName="font-bold" />
                        </div>
                        <div className="w-[35%]">
                            <FormQuickTable columns={paramColumns5_1_Right} data={paramTable5_1_Right} headerClassName="font-bold" />
                        </div>
                    </div>

                    <p>Adjust Position   :   Manage - Parameter - Discharge - Page 4/13 NORMAL V0~V9</p>
                    {/* AL400G / AL600G Selection & Table */}
                    <div className='mt-5'>
                        <div className="flex gap-4 mb-2">
                            <FormItemCheck
                                name="p5_al400_check"
                                label="AL400G (Same Value between STD and HSP)"
                                showCheckbox={true}
                                className="font-bold"
                            />
                            <FormItemCheck
                                name="p5_al600_check"
                                label="AL600G (Same Value between STD and HSP)"
                                showCheckbox={true}
                                className="font-bold"
                            />
                        </div>



                        {/* Logic to select table: default AL400G, but switch if AL600 is checked. */}
                        {(() => {
                            const isAL600 = useWatch({ name: 'p5_al600_check' });
                            const activeData = isAL600 ? dataAL600G : dataAL400G;

                            return (
                                <div className="mt-1">
                                    <div className="border border-black text-center font-bold bg-gray-100 text-[10px] py-0.5">Measuring Terminal (H20 - H4)</div>
                                    <FormQuickTable columns={columnsVoltageCheck} data={activeData} headerClassName="bg-gray-100 font-bold" />
                                </div>
                            );
                        })()}
                    </div>

                </div>
                {/* <div className='mt-5 w-full flex justify-end'>
                    <FormCheckedBox name="p5_51_checked_by" label="Checked by :" />
                </div> */}
                {/* 5.2 Main voltage check */}
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <SectionTitle>5.2 Main voltage check</SectionTitle>
                    </div>

                    <div className="flex justify-between items-end mt-1">
                        <span>Flushing</span>
                        <span>With out spark</span>
                    </div>

                    <div className="flex justify-between gap-4">
                        <div className="w-[60%]">
                            <FormQuickTable columns={paramColumns5_1} data={paramTable5_2} headerClassName="font-bold" />
                        </div>
                        <div className="w-[35%]">
                            <FormQuickTable columns={paramColumns5_1_Right} data={paramTable5_2_Right} headerClassName="font-bold" />
                        </div>
                    </div>

                    <p className="mt-1">Adjust Position   :   Manage - Parameter - Discharge - Page 2/13 P9AVR H0~H9</p>

                    <div className="mt-1">
                        <div className="border border-black text-center font-bold bg-gray-100 text-[10px] py-0.5">Measuring Terminal (P20 - P6)</div>
                        <FormQuickTable columns={columnsMainVoltage} data={dataMainVoltage} headerClassName="bg-gray-100 font-bold" />
                    </div>
                </div>

                <div className="w-full flex justify-end mt-4">
                    <FormCheckedBox name="p5_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page5;