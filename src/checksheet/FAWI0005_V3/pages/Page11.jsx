import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

function Page11() {

    // Table 1 Data
    const tableMachine = [
        { machine: "ALN400G", val: "10" },
        { machine: "ALN400Q", val: "10" },
        { machine: "ALN600G", val: "11" },
        { machine: "ALN600Q", val: "11" },
    ];

    const columnsMachine = [
        { header: "Machine", key: "machine", width: "40%", className: "text-center" },
        { header: "Manage-Parameter- Secret - Page1 [7] NGALPM IP ADJ (NOT USE 7)", key: "val", width: "60%", className: "text-center" },
    ];

    return (
        <A4Paper content={content} currentPage={11}>
            <div className="flex flex-col text-[10px] h-full relative">

                <SectionTitle className="mt-0 w-max">8. Change NGALPM and SIG Settings</SectionTitle>

                <p className="font-bold mt-1">8.1 Change NGALPM and SIG Settings and Checking the Base Group</p>
                <p className="mt-1">Write the threshold-voltage and MHP_03 serial number for MOSFET of MHP-04 bipolar circuitry</p>

                <div className="flex justify-around mt-2 font-bold">
                    <FormItemCheck name="p11_group_v" label="Group V :" input={{ name: "p11_group_v_val", width: "150px", className: "border-b border-black text-center" }} showCheckbox={false} />
                    <FormItemCheck name="p11_mhp03_serial" label="MHP_03 serial number :" input={{ name: "p11_mhp03_serial_val", width: "150px", className: "border-b border-black text-center" }} showCheckbox={false} />
                </div>

                {/* Machine Table */}
                <div className="mt-4 w-[80%] mx-auto">
                    <FormQuickTable columns={columnsMachine} data={tableMachine} headerClassName="font-bold border border-black" />
                </div>

                {/* Record Setting Value Box */}
                <div className="mt-4 w-[80%] mx-auto flex">
                    <div className="w-[60%] border border-black p-4 flex items-center justify-center text-center">
                        Manage-Parameter- Secret - Page1<br />
                        [7] NGALPM IP ADJ (NOT USE 7)
                    </div>
                    <div className="w-[40%] border border-black border-l-0 p-2 flex flex-col justify-end">
                        <FormItemCheck
                            name="p11_record_setting"
                            label=""
                            input={{ name: "p11_record_setting_val", width: "100%", className: "border-b border-black text-center" }}
                            showCheckbox={false}
                        />
                        <span className="text-[9px] text-gray-500 mt-1">Record setting value</span>
                    </div>
                </div>

                {/* 8.1.1 Changing Settings */}
                <div className="mt-6">
                    <p className="font-bold mb-2">8.1.1 Changing Settings</p>

                    <FormItemCheck
                        name="p11_working_al400q_check"
                        label="Working with AL400Q and AL600Q only"
                        showCheckbox={true}
                    />

                    <div className="pl-6 mt-1 flex flex-col gap-1">
                        <p>Change data setting : Secret 2 - Page 3/4</p>
                        <p>Q TYPE MACHINING CONDITION LIMIT = "1" --{'>'} "0"</p>
                        <p className="text-gray-600">(For adjust DPW in next section if W1 of C007 is outside) )</p>
                    </div>
                </div>

                {/* 8.1.2 Verify the Configuration */}
                <div className="mt-6">
                    <p className="font-bold mb-2">8.1.2 Verify the Configuration</p>

                    <FormItemCheck
                        name="p11_verify_config_check"
                        label="Check data setting : Bullet 2-Page 3/4"
                        showCheckbox={true}
                    />

                    <div className="pl-12 mt-2">
                        <p className="mb-1 text-[11px]">DiGiTAL PIKA V MIN =</p>

                        <div className="pl-4 flex flex-col gap-1">
                            <FormItemCheck name="p11_aln400g_check" label="ALN400G : 0" showCheckbox={true} />
                            <FormItemCheck name="p11_aln600g_check" label="ALN600G : 0" showCheckbox={true} />

                            <div className="h-2"></div>

                            <FormItemCheck name="p11_aln400q_check" label="ALN400Q : 30" showCheckbox={true} />
                            <FormItemCheck name="p11_aln600q_check" label="ALN600Q : 30" showCheckbox={true} />
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex flex-col gap-4 font-bold">
                    <FormItemCheck
                        name="p11_off_source_check"
                        label="OFF SOURCE after change setting value. (ให้ปิดเครื่อง หลังจากที่เปลี่ยน data settng แล้ว)"
                        showCheckbox={true}
                    />
                    <FormItemCheck
                        name="p11_on_source_check"
                        label="ON SOURCE. (ให้เปิดเครื่องอีกครั้ง)"
                        showCheckbox={true}
                    />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page11;