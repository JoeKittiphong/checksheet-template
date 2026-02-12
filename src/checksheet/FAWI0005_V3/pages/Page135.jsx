
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Placeholder Images
import hpImage101 from "@/assets/FAWI0005_V3/page135_hp_101.png";
import hpImage107 from "@/assets/FAWI0005_V3/page135_hp_107.png";
import htImage110 from "@/assets/FAWI0005_V3/page135_ht_110.png";
import htImage170 from "@/assets/FAWI0005_V3/page135_ht_170.png";

function Page135() {

    return (
        <A4Paper content={content} currentPage={135}>
            <div className="px-8 mt-4 font-sans text-xs">

                {/* 28.2 HP Waveform Check */}
                <div className="mb-6">
                    <h3 className="font-bold text-sm mb-2">28.2. HP Waveform Check</h3>

                    <div className="flex justify-end mb-1 space-x-4 text-[10px]">
                        <span>Flushing (Without submerge)</span>
                        <span>With spark</span>
                    </div>

                    {/* Parameter Table HP */}
                    <table className="w-full border-collapse border border-black text-center text-[10px] mb-2">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black w-14"></th>
                                <th className="border border-black">ON</th>
                                <th className="border border-black">OFF</th>
                                <th className="border border-black">IP</th>
                                <th className="border border-black">HRP</th>
                                <th className="border border-black">MAO</th>
                                <th className="border border-black">SV</th>
                                <th className="border border-black">V</th>
                                <th className="border border-black"></th>
                                <th className="border border-black">C</th>
                                <th className="border border-black">PIK</th>
                                <th className="border border-black">CTRL</th>
                                <th className="border border-black">WK</th>
                                <th className="border border-black">WT</th>
                                <th className="border border-black">WS</th>
                                <th className="border border-black">WP</th>
                                <th className="border border-black">PC</th>
                                <th className="border border-black">SK</th>
                                <th className="border border-black">BSA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black font-bold">C0001 =</td>
                                <td className="border border-black">0100</td>
                                <td className="border border-black">018</td>
                                <td className="border border-black">0015</td>
                                <td className="border border-black">10*</td>
                                <td className="border border-black">370</td>
                                <td className="border border-black">+060.0</td>
                                <td className="border border-black">1.0</td>
                                <td className="border border-black">0050</td>
                                <td className="border border-black">0</td>
                                <td className="border border-black">000</td>
                                <td className="border border-black">0000</td>
                                <td className="border border-black">010</td>
                                <td className="border border-black">040</td>
                                <td className="border border-black">080</td>
                                <td className="border border-black">045</td>
                                <td className="border border-black text-[8px]">000000</td>
                                <td className="border border-black text-[8px]">000000</td>
                                <td className="border border-black text-[8px]">000000</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mb-2">
                        <FormItemCheck
                            name="p135_hp_check"
                            label="Check the change of the waveform, when it is changed the condition fo HRP (101~107)"
                            showCheckbox={true}
                            checkboxSize="w-6 h-6"
                        />
                        <div className="ml-8 text-gray-600">(ตรวจสอบการเปลี่ยนแปลงของ waveform เมื่อเปลี่ยน condition HRP)</div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <div className="text-center">
                            <div className="font-bold mb-1">HP CHECK (HRP =&gt; 101)</div>
                            <div className="w-[250px] h-[180px] flex items-center justify-center bg-gray-50">
                                <img
                                    src={hpImage101}
                                    alt="HP Check 101"
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px]">Image not found: page135_hp_101.png</span>'; }}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold mb-1">HP CHECK (HRP =&gt; 107)</div>
                            <div className="w-[250px] h-[180px] flex items-center justify-center bg-gray-50">
                                <img
                                    src={hpImage107}
                                    alt="HP Check 107"
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px]">Image not found: page135_hp_107.png</span>'; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 28.3 HT Waveform Check */}
                <div>
                    <h3 className="font-bold text-sm mb-2">28.3. HT Waveform Check</h3>

                    <div className="flex justify-end mb-1 space-x-4 text-[10px]">
                        <span>Flushing (Without submerge)</span>
                        <span>With spark</span>
                    </div>

                    {/* Parameter Table HT */}
                    <table className="w-full border-collapse border border-black text-center text-[10px] mb-2">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-black w-14"></th>
                                <th className="border border-black">ON</th>
                                <th className="border border-black">OFF</th>
                                <th className="border border-black">IP</th>
                                <th className="border border-black">HRP</th>
                                <th className="border border-black">MAO</th>
                                <th className="border border-black">SV</th>
                                <th className="border border-black">V</th>
                                <th className="border border-black">SF</th>
                                <th className="border border-black">C</th>
                                <th className="border border-black">PIK</th>
                                <th className="border border-black">CTRL</th>
                                <th className="border border-black">WK</th>
                                <th className="border border-black">WT</th>
                                <th className="border border-black">WS</th>
                                <th className="border border-black">WP</th>
                                <th className="border border-black">PC</th>
                                <th className="border border-black">SK</th>
                                <th className="border border-black">BSA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black font-bold">C0001 =</td>
                                <td className="border border-black">0100</td>
                                <td className="border border-black">018</td>
                                <td className="border border-black">0015</td>
                                <td className="border border-black">1*0</td>
                                <td className="border border-black">370</td>
                                <td className="border border-black">+060.0</td>
                                <td className="border border-black">1.0</td>
                                <td className="border border-black">0050</td>
                                <td className="border border-black">0</td>
                                <td className="border border-black">000</td>
                                <td className="border border-black">0000</td>
                                <td className="border border-black">010</td>
                                <td className="border border-black">040</td>
                                <td className="border border-black">080</td>
                                <td className="border border-black">045</td>
                                <td className="border border-black text-[8px]">000000</td>
                                <td className="border border-black text-[8px]">000000</td>
                                <td className="border border-black text-[8px]">000000</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mb-2">
                        <FormItemCheck
                            name="p135_ht_check"
                            label="Check the change of the waveform, when it is changed the condition fo HRP (110~170)"
                            showCheckbox={true}
                            checkboxSize="w-6 h-6"
                        />
                        <div className="ml-8 text-gray-600">(ตรวจสอบการเปลี่ยนแปลงของ waveform เมื่อเปลี่ยน condition HRP)</div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <div className="text-center">
                            <div className="font-bold mb-1">HT CHECK (HRP =&gt; 110)</div>
                            <div className="w-[250px] h-[180px] flex items-center justify-center bg-gray-50">
                                <img
                                    src={htImage110}
                                    alt="HT Check 110"
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px]">Image not found: page135_ht_110.png</span>'; }}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold mb-1">HT CHECK (HRP =&gt; 170)</div>
                            <div className="w-[250px] h-[180px] flex items-center justify-center bg-gray-50">
                                <img
                                    src={htImage170}
                                    alt="HT Check 170"
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-[10px]">Image not found: page135_ht_170.png</span>'; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page135;