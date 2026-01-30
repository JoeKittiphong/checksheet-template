import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0005_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import InputCheckSTD from '@/components/UIcomponent/InputCheckSTD';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';

// Import images
import imgFig1 from '@/assets/FAWI0005_V3/p16_fig1.png';
import imgFig2 from '@/assets/FAWI0005_V3/p16_fig2.png';
import imgFig3 from '@/assets/FAWI0005_V3/p16_fig3.png';

function Page16() {
    const { control } = useFormContext();

    // Helper to create parameter table data
    const createParamData = (cVal, vVal) => [
        { c: `${cVal} =`, on: "0000", off: "000", ip: "0000", hrp: "000", mao: "000", sv: "+000.0", v: vVal, sf: "0000", c_val: "0", pik: "040", ctrl: "0000", wk: "090/025", wt: "120", ws: "80", wp: "012", pc: "000013", sk: "000000", bsa: "000000" }
    ];

    const paramColumns = [
        { header: "", key: "c", width: "8%", className: "text-center text-[10px]" },
        { header: "ON", key: "on", width: "4%", className: "text-center text-[10px]" },
        { header: "OFF", key: "off", width: "4%", className: "text-center text-[10px]" },
        { header: "IP", key: "ip", width: "4%", className: "text-center text-[10px]" },
        { header: "HRP", key: "hrp", width: "4%", className: "text-center text-[10px]" },
        { header: "MAO", key: "mao", width: "4%", className: "text-center text-[10px]" },
        { header: "SV", key: "sv", width: "5%", className: "text-center text-[10px]" },
        { header: "V", key: "v", width: "5%", className: "text-center text-[10px]" },
        { header: "SF", key: "sf", width: "4%", className: "text-center text-[10px]" },
        { header: "C", key: "c_val", width: "2%", className: "text-center text-[10px]" },
        { header: "PIK", key: "pik", width: "4%", className: "text-center text-[10px]" },
        { header: "CTRL", key: "ctrl", width: "4%", className: "text-center text-[10px]" },
        { header: "WK", key: "wk", width: "5%", className: "text-center text-[10px]" },
        { header: "WT", key: "wt", width: "4%", className: "text-center text-[10px]" },
        { header: "WS", key: "ws", width: "4%", className: "text-center text-[10px]" },
        { header: "WP", key: "wp", width: "4%", className: "text-center text-[10px]" },
        { header: "PC", key: "pc", width: "5%", className: "text-center text-[10px]" },
        { header: "SK", key: "sk", width: "5%", className: "text-center text-[10px]" },
        { header: "BSA", key: "bsa", width: "5%", className: "text-center text-[10px]" },
    ];

    // Common labels
    const submergeLabel = <div className="font-bold flex justify-center gap-10 bg-white"><span>Submerge</span><span>Without spark</span></div>;

    return (
        <A4Paper content={content} currentPage={16}>
            <div className="flex flex-col text-[10px] h-full relative">
                <div className="font-bold mb-1 flex justify-between items-end">
                    <SectionTitle className="w-max mb-0">10. DPW Waveform check</SectionTitle>
                    <div className="font-bold text-lg underline text-black">Do not place workpiece on the table!!!</div>
                </div>

                <div className="mb-2 pl-4 text-[10px] leading-tight">
                    <div className="flex"><span className="w-24">Direction : </span> <span>1. Water Resistivity</span> <span className="mx-4">:</span> <span>5.0 ~ 5.2 x 10⁴ Ω.cm (Checked by handy type Resistivity tester)</span></div>
                    <div className="flex"><span className="w-24"></span> <span>2. Wire Diameter</span> <span className="mx-4">:</span> <span>Ø 0.2 mm</span></div>
                    <div className="flex"><span className="w-24"></span> <span>3. Water State</span> <span className="mx-4">:</span> <span>Submerge with low pressure flushing</span></div>
                    <div className="flex"><span className="w-24"></span> <span>4. AXIS Position</span> <span className="mx-4">:</span> <span>X:Center Position Y:120. (G959) Z:40. (G959)</span></div>
                    <div className="flex"><span className="w-24"></span> <span>5. Check Point</span> <span className="mx-4">:</span> <span>Upper Guide (+) and Work stand (GND) (Low Pressure Jet)</span></div>
                </div>

                {/* Section 1: PC13 V9 */}
                <div className="mb-2">
                    {submergeLabel}
                    <FormQuickTable columns={paramColumns} data={createParamData("C0903", "9.0")} className="[&_thead]:bg-white [&_th]:text-[7px]" />
                    <div className="flex mt-1">
                        <div className="w-[40%] flex flex-col items-center">
                            <img src={imgFig1} alt="Fig.1 PC13 V9" className="h-32 object-contain" />
                            <div className="font-bold text-center">Fig.1 PC13 V9</div>
                        </div>
                        <div className="w-[60%] text-[10px] pl-2 flex flex-col justify-center">
                            <div className="underline mb-1">CheckPoint:</div>
                            <div className="mb-2">
                                <div>1. Peak voltage; upper : 125~145 V, lower : -125~-145 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured : upper</span>
                                    <Controller
                                        name="p16_fig1_peak_upper"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={125} maxStd={145} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                    <span className="ml-2">lower</span>
                                    <Controller
                                        name="p16_fig1_peak_lower"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={-145} maxStd={-125} unit="" inputWidth="w-16" useAbs={false} />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div>2. Amptitude of the component of high frequency : 20~35 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured :</span>
                                    <Controller
                                        name="p16_fig1_amp"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={20} maxStd={35} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1"><span>☆</span> <span>Save waveform</span></div>
                        </div>
                    </div>
                </div>

                {/* Section 2: PC22 V8 */}
                <div className="mb-2">
                    {submergeLabel}
                    <FormQuickTable columns={paramColumns} data={createParamData("C0904", "8.0")} className="[&_thead]:bg-white [&_th]:text-[7px]" />
                    <div className="flex mt-1">
                        <div className="w-[40%] flex flex-col items-center">
                            <img src={imgFig2} alt="Fig.2 PC22 V8" className="h-32 object-contain" />
                            <div className="font-bold text-center">Fig.2 PC22 V8</div>
                        </div>
                        <div className="w-[60%] text-[10px] pl-2 flex flex-col justify-center">
                            <div className="underline mb-1">CheckPoint:</div>
                            <div className="mb-2">
                                <div>1. Peak voltage; upper : 115~130 V, lower : -115~-130 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured : upper</span>
                                    <Controller
                                        name="p16_fig2_peak_upper"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={115} maxStd={130} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                    <span className="ml-2">lower</span>
                                    <Controller
                                        name="p16_fig2_peak_lower"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={-130} maxStd={-115} unit="" inputWidth="w-16" useAbs={false} />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div>2. Amptitude of the component of high frequency : 40~60 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured :</span>
                                    <Controller
                                        name="p16_fig2_amp"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={40} maxStd={60} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1"><span>☆</span> <span>Save waveform</span></div>
                        </div>
                    </div>
                </div>

                {/* Section 3: PC12 V2 */}
                <div className="mb-2">
                    {submergeLabel}
                    <FormQuickTable columns={paramColumns} data={createParamData("C0905", "2.0")} className="[&_thead]:bg-white [&_th]:text-[7px]" />
                    <div className="flex mt-1">
                        <div className="w-[40%] flex flex-col items-center">
                            <img src={imgFig3} alt="Fig.3 PC12 V2" className="h-32 object-contain" />
                            <div className="font-bold text-center">Fig.3 PC12 V2</div>
                        </div>
                        <div className="w-[60%] text-[10px] pl-2 flex flex-col justify-center">
                            <div className="underline mb-1">CheckPoint:</div>
                            <div className="mb-2">
                                <div>1. Peak voltage; upper : 32~47 V, lower : -32~-47 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured : upper</span>
                                    <Controller
                                        name="p16_fig3_peak_upper"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={32} maxStd={47} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                    <span className="ml-2">lower</span>
                                    <Controller
                                        name="p16_fig3_peak_lower"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={-47} maxStd={-32} unit="" inputWidth="w-16" useAbs={false} />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="mb-1">
                                <div>2. Amptitude of the component of high frequency : 5~15 V</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span>Measured :</span>
                                    <Controller
                                        name="p16_fig3_amp"
                                        control={control}
                                        rules={{ required: "Required" }}
                                        render={({ field }) => (
                                            <InputCheckSTD {...field} minStd={5} maxStd={15} unit="" inputWidth="w-16" />
                                        )}
                                    />
                                    <span>V</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1"><span>☆</span> <span>Save waveform</span></div>
                        </div>
                    </div>
                </div>


                {/* Footer Checked By */}
                <div className="mt-auto flex justify-end pb-4 pr-8">
                    <FormCheckedBox name="p16_checked_by" label="Checked by :" />
                </div>

            </div>
        </A4Paper>
    );
}

export default Page16;