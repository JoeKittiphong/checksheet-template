
import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import SectionTitle from '@/components/UIcomponent/SectionTitle';

function Page32() {
    const listItems = [
        { label: <span>Manage-Parameter-Cutting-Page4-HECW WS CONTROL= <u>0 (OFF)</u></span> },
        { label: <span>Manage-Parameter-Secret-Page1-HECW = <u>1</u></span> },
        { label: <span>Manage-Parameter-Secret-Page2-MTRL CODE OUTPUT = <u>1 (ON)</u></span> },
        { label: <span>Manage-Parameter-Secret-Page2-THINKING CIRCUIT DEBUG = <u>000000101</u></span> },
    ];

    return (
        <A4Paper content={content} currentPage={32}>
            <div className="flex flex-col text-[12px] h-full relative p-4 space-y-2">

                <SectionTitle className="mt-0 w-max text-sm">16. HECW (High Speed Eco Cut W) Setting Check (SL-G--&gt; STD SL-Q--&gt;Option)</SectionTitle>
                <SectionTitle className="mt-0 w-max text-sm pl-4">16.1 Data Setting Check</SectionTitle>

                <div className="pl-6 flex flex-col gap-2 mt-2">
                    {listItems.map((item, idx) => (
                        <FormItemCheck
                            key={idx}
                            name={`p32_check_${idx + 1}`}
                            label={item.label}
                            showCheckbox={true}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <FormCheckedBox name="p32_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page32;