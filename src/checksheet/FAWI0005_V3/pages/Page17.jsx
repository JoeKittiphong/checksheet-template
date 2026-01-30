import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import InputCheckSTD from '@/components/UIcomponent/InputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Import images
import imgWorkpiece from '@/assets/FAWI0005_V3/p17_workpiece_layout.png';
import imgWaveform from '@/assets/FAWI0005_V3/p17_waveform_ip2215.png';

function Page17() {
    const { control } = useFormContext();

    const machiningData = [
        { c: "C001", on: "000", off: "018", ip: "2215", hrp: "000", mao: "370", sv: "+60.0", v: "8.0", sf: "0050", c_val: "0", pik: "000" }
    ];

    const machiningColumns = [
        { header: "", key: "c", width: "8%", className: "text-center text-[10px]" },
        { header: "ON", key: "on", width: "5%", className: "text-center text-[10px]" },
        { header: "OFF", key: "off", width: "5%", className: "text-center text-[10px]" },
        { header: "IP", key: "ip", width: "7%", className: "text-center text-[10px]" },
        { header: "HRP", key: "hrp", width: "7%", className: "text-center text-[10px]" },
        { header: "MAO", key: "mao", width: "7%", className: "text-center text-[10px]" },
        { header: "SV", key: "sv", width: "9%", className: "text-center text-[10px]" },
        { header: "V", key: "v", width: "7%", className: "text-center text-[10px]" },
        { header: "SF", key: "sf", width: "7%", className: "text-center text-[10px]" },
        { header: "C", key: "c_val", width: "7%", className: "text-center text-[10px]" },
        { header: "PIK", key: "pik", width: "7%", className: "text-center text-[10px]" },
    ];

    const sparkData = [
        { wk: "020", wt: "120", ws: "080", wp: "045" }
    ];

    const sparkColumns = [
        { header: "WK", key: "wk", width: "25%", className: "text-center text-[10px]" },
        { header: "WT", key: "wt", width: "25%", className: "text-center text-[10px]" },
        { header: "WS", key: "ws", width: "25%", className: "text-center text-[10px]" },
        { header: "WP", key: "wp", width: "25%", className: "text-center text-[10px]" },
    ];

    return (
        <A4Paper content={content} currentPage={17}>
            <div className="flex flex-col text-[10px] h-full relative">

                {/* Q Type Data Settings */}
                <div className="space-y-1 mb-3">
                    <FormItemCheck
                        name="p17_q_type_change"
                        label="In Q type spec Change data setting : Secret 2 - Page 3/4"
                    />
                    <div className="pl-10 font-bold -mt-1">
                        Q TYPE COND RESTRICTION = "0" --&gt; "1" (เปลี่ยน data Q TYPE COND RESTRICTION จาก 0 เป็น 1 )
                    </div>

                    <FormItemCheck
                        name="p17_off_source"
                        label="OFF SOURCE after change setting value. (ให้ปิดเครื่อง หลังจากที่เปลี่ยน data settng แล้ว)"
                    />

                    <FormItemCheck
                        name="p17_on_source"
                        label="ON SOURCE. (ให้เปิดเครื่องอีกครั้ง)"
                    />
                </div>

                <SectionTitle className="w-max mb-1">11. Check Discharge current wave form and voltage wave form.</SectionTitle>

                <div className="pl-4 space-y-2">
                    <div className="font-bold">11.1 Place workpieces (Thickness 40mm. and 10mm.) on work stand. Referpicture at below</div>

                    <div className="font-bold flex flex-col">
                        <div>11.2 Water temperature/room temperature examination (instrument: digital thermometer No.EDU501).</div>
                        <div className="flex items-center gap-4 mt-1">
                            <span>Water temperature =</span>
                            <Controller
                                name="p17_water_temp"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <InputCheckSTD {...field} unit="°C" inputWidth="w-16" validateStd={false} />
                                )}
                            />
                            <span>, Room (room temperature) =</span>
                            <Controller
                                name="p17_room_temp"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <InputCheckSTD {...field} unit="°C" inputWidth="w-16" validateStd={false} />
                                )}
                            />
                            <span>(reference: error = ±1 °C)</span>
                        </div>
                    </div>

                    <div className="flex justify-center p-2 border border-gray-100 w-fit mx-auto">
                        <img src={imgWorkpiece} alt="Workpiece Layout" className="h-32 object-contain" />
                    </div>

                    <div className="font-bold">11.3 Check Discharge current wave form and voltage wave form.</div>

                    <div className="grid grid-cols-2 text-[10px] leading-relaxed">
                        <div className="flex"><span>1. Check point of voltage</span><span className="mx-2">:</span><span>Guide block (+) and Work table (GND)</span></div>
                        <div className="flex"><span>4. Work piece Material</span><span className="mx-2">:</span><span>SKD - 11 ( 40 mm Thickness )</span></div>
                        <div className="flex"><span>2. Check point of current</span><span className="mx-2">:</span><span>Discharge cable (upper side)</span></div>
                        <div className="flex"><span>5. Wire Diameter</span><span className="mx-2">:</span><span>TSUBAME Plus 0.20mm</span></div>
                        <div className="flex"><span>3. Water resistivity</span><span className="mx-2">:</span><span>5.0 ~ 5.2 x 10⁴ Ω.cm (Checked by handy type Resistivity tester)</span></div>
                        <div className="flex"><span>6. Water flushing</span><span className="mx-2">:</span><span>Flushing (Without submerge)</span></div>
                    </div>

                    <FormItemCheck
                        name="p17_test_ip2215"
                        label="Test - with IP2215"
                        className="mt-1"
                    />

                    <div className="space-y-1">
                        <div className="text-[9px] flex">The machining condition parameter for check as follow. <p className='ml-20'>Flushing</p><p className='ml-20'>With spark</p></div>
                        <div className="text-[7px] font-bold text-center"></div>
                        <div className="flex ">
                            <FormQuickTable
                                columns={machiningColumns}
                                data={machiningData}
                                className="w-[50%] [&_thead]:bg-white [&_th]:text-[7px]"
                            />
                            <div className="w-[30%] flex flex-col">
                                <FormQuickTable
                                    columns={sparkColumns}
                                    data={sparkData}
                                    className="[&_thead]:bg-white [&_th]:text-[7px]"
                                    showHead={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-2">
                        <div className="font-bold underline text-sm mb-1">IP2215</div>
                        <div>
                            <img src={imgWaveform} alt="IP2215 Waveform" className="h-44 object-contain" />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page17;