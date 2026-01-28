import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormInputCheckSTD from '@/components/FormComponents/FormInputCheckSTD';

function Page49() {

    const tensionColumns = [
        { key: 'label', width: '100px', isLabel: true, className: "bg-gray-200 font-bold" },
        { key: 'v03', width: '45px' },
        { key: 'v05', width: '45px' },
        { key: 'v07', width: '45px' },
        { key: 'v10', width: '45px' },
        { key: 'v15', width: '45px' },
        { key: 'v20', width: '45px' },
        { key: 'v25', width: '45px' },
        { key: 'v30', width: '45px' },
        { key: 'v35', width: '45px' },
        { key: 'prep', width: '45px', header: 'Prep.' }
    ];

    const tensionHeader = [
        [
            { header: '', colSpan: 1 },
            { header: '0.03', colSpan: 1 },
            { header: '0.05', colSpan: 1 },
            { header: '0.07', colSpan: 1 },
            { header: '0.10', colSpan: 1 },
            { header: '0.15', colSpan: 1 },
            { header: '0.20', colSpan: 1 },
            { header: '0.25', colSpan: 1 },
            { header: '0.30', colSpan: 1 },
            { header: '0.35', colSpan: 1 },
            { header: 'Prep.', colSpan: 1 }
        ]
    ];

    const al400gData = [
        { label: 'BS HARD', v03: '000', v05: '000', v07: '000', v10: <b className="text-sm">099</b>, v15: <b className="text-sm">103</b>, v20: <b className="text-sm">104</b>, v25: <b className="text-sm">101</b>, v30: <b className="text-sm">106</b>, v35: '000', prep: '000' },
        { label: 'BS SOFT', v03: '000', v05: '000', v07: '000', v10: <b className="text-sm">099</b>, v15: <b className="text-sm">103</b>, v20: <b className="text-sm">104</b>, v25: <b className="text-sm">101</b>, v30: <b className="text-sm">106</b>, v35: '000', prep: '000' },
        { label: 'AP', v03: '000', v05: <b className="text-sm">098</b>, v07: <b className="text-sm">099</b>, v10: <b className="text-sm">104</b>, v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' },
        { label: 'Tungsten', v03: '000', v05: <b className="text-sm">099</b>, v07: <b className="text-sm">100</b>, v10: '000', v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' },
        { label: 'Molybden', v03: '000', v05: '000', v07: '000', v10: '000', v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' }
    ];

    const al600gData = [
        { label: 'BS HARD', v03: '000', v05: '000', v07: '000', v10: <b className="text-sm">104</b>, v15: <b className="text-sm">103</b>, v20: <b className="text-sm">100</b>, v25: <b className="text-sm">101</b>, v30: <b className="text-sm">106</b>, v35: '000', prep: '000' },
        { label: 'BS SOFT', v03: '000', v05: '000', v07: '000', v10: <b className="text-sm">104</b>, v15: <b className="text-sm">103</b>, v20: <b className="text-sm">100</b>, v25: <b className="text-sm">101</b>, v30: <b className="text-sm">106</b>, v35: '000', prep: '000' },
        { label: 'AP', v03: '000', v05: <b className="text-sm">098</b>, v07: <b className="text-sm">099</b>, v10: <b className="text-sm">103</b>, v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' },
        { label: 'Tungsten', v03: '000', v05: <b className="text-sm">102</b>, v07: <b className="text-sm">103</b>, v10: '000', v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' },
        { label: 'Molybden', v03: '000', v05: '000', v07: '000', v10: '000', v15: '000', v20: '000', v25: '000', v30: '000', v35: '000', prep: '000' }
    ];

    return (
        <A4Paper content={content} currentPage={49}>
            <div className="flex flex-col text-xs relative h-full">
                {/* 52.6 Setting Tension Servo (WD) */}
                <div className="flex flex-col gap-2 p-2">
                    <SectionTitle>52.6 Setting Tension Servo (WD) : <span className="font-normal underline">Manage - Parameter - Disch - Page 13/13</span></SectionTitle>

                    <div className="ml-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <FormItemCheck name="p49_52_6_al400g_check" label={<span className="font-bold underline">AL400G Standard (without option 0.05/0.07AWT)</span>} />
                            <FormQuickTable
                                columns={tensionColumns}
                                headerRows={tensionHeader}
                                data={al400gData}
                                className="bg-white border-black"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <FormItemCheck name="p49_52_6_al600g_check" label={<span className="font-bold underline">AL600G Standard (without option 0.05/0.07AWT)</span>} />
                            <FormQuickTable
                                columns={tensionColumns}
                                headerRows={tensionHeader}
                                data={al600gData}
                                className="bg-white border-black"
                            />
                        </div>
                    </div>
                </div>

                {/* 52.7 AWT Jet position Check */}
                <div className="flex flex-col gap-2 p-2 mt-4 ml-2">
                    <FormItemCheck
                        name="p49_52_7_check"
                        label={<span className="font-bold text-sm">52.7 AWT Jet position Check (AL400G Z=252mm, AL600G Z=352mm and AWT JET ON)</span>}
                    />
                    <div className="ml-10 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <FormInputCheckSTD
                                name="p49_52_7_offset_u"
                                label="AWT 2 OFFSET U ="
                                unit="mm (STD : AL400G : -1.3 ~ 1.3mm, AL600G : -1.8 ~ 1.8mm)"
                                minStd={-1.3}
                                maxStd={1.3}
                                inputWidth="w-20"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormInputCheckSTD
                                name="p49_52_7_offset_v"
                                label="AWT 2 OFFSET V ="
                                unit="mm (STD : AL400G : -1.3 ~ 1.3mm, AL600G : -1.8 ~ 1.8mm)"
                                minStd={-1.3}
                                maxStd={1.3}
                                inputWidth="w-20"
                            />
                        </div>
                        <span className="font-bold mt-1">Note : <span className="font-normal italic">If data over standard value ==&gt; FLOAT NOZZLE S was change.</span></span>
                    </div>
                </div>

                {/* Signature - Fixed at bottom */}
                <div className="mt-auto flex justify-end pr-10 pb-8">
                    <FormCheckedBox name="p49_checked" label="Checked by :" className="w-1/3" />
                </div>
            </div>
        </A4Paper>
    );
}

export default Page49;