
import React from 'react';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

// Placeholder Image
import htpImage from "@/assets/FAWI0005_V3/page134_image.png";

function Page134() {

    // Measurement Table Setup
    const columnsMeas = [
        { header: "HRP", key: "hrp", width: "15%", className: "bg-gray-400 font-bold text-center", isLabel: true },
        { header: "Standard (V)", key: "std_show", width: "25%", className: "bg-white font-normal text-center", isLabel: true },
        { header: "Measured (±1V)", key: "measured", width: "30%", className: "" },
        { header: "Volume (P9V-01)", key: "vol", width: "30%", className: "bg-white font-normal text-center", isLabel: true },
    ];

    // Left Table Data (HRP 111, 211, 311)
    const dataMeasLeft = [
        { hrp: "111", std_show: "160", measured: "p134_hrp_111", p134_hrp_111_min: 159, p134_hrp_111_max: 161, vol: "VR1", type: "input" },
        { hrp: "211", std_show: "215", measured: "p134_hrp_211", p134_hrp_211_min: 214, p134_hrp_211_max: 216, vol: "VR2", type: "input" },
        { hrp: "311", std_show: "270", measured: "p134_hrp_311", p134_hrp_311_min: 269, p134_hrp_311_max: 271, vol: "VR3", type: "input" },
    ];

    // Right Table Data (HRP 411, 511, 611)
    const dataMeasRight = [
        { hrp: "411", std_show: "325", measured: "p134_hrp_411", p134_hrp_411_min: 324, p134_hrp_411_max: 326, vol: "VR4", type: "input" },
        { hrp: "511", std_show: "380", measured: "p134_hrp_511", p134_hrp_511_min: 379, p134_hrp_511_max: 381, vol: "VR5", type: "input" },
        { hrp: "611", std_show: "435", measured: "p134_hrp_611", p134_hrp_611_min: 434, p134_hrp_611_max: 436, vol: "VR6", type: "input" },
    ];

    return (
        <A4Paper content={content} currentPage={134}>
            <SectionTitle>28. HTP Check (Only HTP Unit Option)</SectionTitle>

            <div className="px-8 mt-2 text-xs font-sans">
                <h3 className="font-bold text-sm mb-2">28.1. HTP Voltage adjustment</h3>

                <div className="grid grid-cols-[120px_1fr] gap-y-1 mb-4 ml-4">
                    <div className="font-bold">Direction :</div>
                    <div>1.Wire Diameter        :      TSUBAME <span className="underline">Plus</span> - Wire &Oslash;0.10 mm</div>
                    <div></div>
                    <div>2.Water Resistivity    :      Water Resist =STD :  50000 ~ 52000  &Omega;.cm</div>
                    <div></div>
                    <div>3.Check Point          :      P30M(C25) - P6M(C25) on PMOS Unit</div>
                    <div></div>
                    <div>4.Adjust Position      :      VR1~6 on P9V-01 PCB.</div>
                </div>

                <div className="flex items-center gap-2 mb-4 font-bold p-1 w-max">
                    <FormItemCheck
                        name="p134_manage_check"
                        label="Manage - Parameter - Discharge - HRP Max ==> 677"
                        showCheckbox={true}
                        checkboxSize="w-6 h-6"
                    />
                    <span className="ml-4 font-normal">Flushing (Without submerge)     Without spark</span>
                </div>

                {/* Parameter Table (Static HTML) */}
                <table className="w-full border-collapse border border-black text-center text-[10px] mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black w-16"></th>
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
                            <td className="border border-black">*11</td>
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

                {/* Measurement Tables */}
                <div className="flex gap-1 mb-6">
                    <div className="w-1/2">
                        <FormQuickTable
                            columns={columnsMeas}
                            data={dataMeasLeft}
                            headerClassName="bg-gray-200 text-xs py-1"
                            bordered
                        />
                    </div>
                    <div className="w-1/2">
                        <FormQuickTable
                            columns={columnsMeas}
                            data={dataMeasRight}
                            headerClassName="bg-gray-200 text-xs py-1"
                            bordered
                        />
                    </div>
                </div>

                {/* Image Section */}
                <div>
                    <h4 className="font-bold text-sm mb-2">Check point of HTP Voltage</h4>
                    <div className="w-1/2 min-h-[300px] flex items-center justify-center">
                        <img
                            src={htpImage}
                            alt="HTP Check Point"
                            className="max-h-[400px] object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<span class="text-gray-400">Image not found: page134_image.png</span>';
                            }}
                        />
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page134;