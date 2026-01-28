import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";

import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';

function Page48() {
    return (
        <A4Paper content={content} currentPage={48}>
            <div className="flex flex-col text-[10px] relative h-full">
                {/* 52.3 AWT data offset Check */}
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs">52.3 AWT data offset Check ==&gt; MANAGE ==&gt; PARAMETER ==&gt; MACHINE</span>
                    <div className="pl-6 flex flex-col gap-1">
                        <FormItemCheck name="p48_52_3_1" label={<div className="flex w-full justify-between pr-48"><span>AWT 2 OFFSET U = 0</span> <span className="text-gray-500">(Page 1)</span></div>} />
                        <FormItemCheck name="p48_52_3_2" label={<div className="flex w-full justify-between pr-48"><span>AWT 2 OFFSET V = 0</span> <span className="text-gray-500">(Page 1)</span></div>} />
                    </div>
                </div>

                {/* 52.4 SECRET Parameters */}
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs">52.4 MANAGE ==&gt; PARAMETER ==&gt; IGUANODON ==&gt; SECRET</span>
                    <div className="pl-6 flex flex-col gap-1">
                        <FormItemCheck name="p48_52_4_1" label={<div className="flex w-full justify-between pr-48"><span>MACHINE FUNCTION ON = 01</span> <span className="text-gray-500">(Page 3)</span></div>} />
                        <FormItemCheck name="p48_52_4_2" label={<div className="flex w-full justify-between pr-48"><span>MACHINE FUNCTION 1 = 001001110</span> <span className="text-gray-500">(Page 3)</span></div>} />
                        <FormItemCheck name="p48_52_4_3" label={<div className="flex w-full justify-between pr-48"><span>MACHINE FUNCTION 9 = 001000041(G-Type), MACHINE FUNCTION 9 = 0(Q-Type)</span> <span className="text-gray-500">(Page 3)</span></div>} />
                    </div>
                </div>

                {/* 52.5 SETTING Parameters */}
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs">52.5 SETTING ==&gt; RUN DATA ==&gt; NEXT</span>
                    <div className="pl-6">
                        <FormItemCheck name="p48_52_5_table_check" label="Annealing & Heat Cutting Condition Table." className="font-bold mb-1" />

                        {/* Static Condition Table */}
                        <div className="overflow-x-auto mt-1">
                            <table className="w-full h-120 border-collapse border border-black text-center leading-tight">
                                <thead>
                                    <tr>
                                        <th rowSpan={2} className="border border-black bg-gray-200 w-8">NO.</th>
                                        <th rowSpan={2} className="border border-black bg-gray-200">DATA NAME</th>
                                        <th colSpan={5} className="border border-black bg-gray-200">BS Hard / BS Soft</th>
                                        <th colSpan={3} className="border border-black bg-gray-200">AP</th>
                                        <th colSpan={3} className="border border-black bg-gray-200">Tungsten</th>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <th className="border border-black w-8">0.1</th>
                                        <th className="border border-black w-8">0.15</th>
                                        <th className="border border-black w-8">0.2</th>
                                        <th className="border border-black w-8">0.25</th>
                                        <th className="border border-black w-8">0.3</th>
                                        <th className="border border-black w-8">0.05</th>
                                        <th className="border border-black w-8">0.07</th>
                                        <th className="border border-black w-8">0.1</th>
                                        <th className="border border-black w-8">0.05</th>
                                        <th className="border border-black w-8">0.07</th>
                                        <th className="border border-black w-8">0.1</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 1, name: 'ANNEALING', values: ['ON', 'ON', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'ON', 'OFF', 'OFF', 'OFF'] },
                                        { id: 2, name: 'ANNEALING TENSION', values: ['002', '002', '002', '002', '002', <span className="bg-blue-100 p-0.5 block w-full">020</span>, <span className="bg-blue-100 p-0.5 block w-full">020</span>, '020', '20', '040', '020'] },
                                        { id: 3, name: 'HEAT CUT TENSION', values: ['040', '060', '080', '140', '160', <span className="bg-blue-100 p-0.5 block w-full">020</span>, <span className="bg-blue-100 p-0.5 block w-full">020</span>, '030', '35', '040', '035'] },
                                        { id: 4, name: 'ANNEALING TIME', values: ['2.2', '1.0', '0.9', '0.6', '1.1', '2.5', '3.0', '3.0', '0.0', '0.0', '0.0'] },
                                        { id: 5, name: 'HEAT CUT TIME', values: ['0.1', '0.1', '0.1', '0.1', '0.1', '0.1', '0.1', '0.1', '0.1', '0.1', '0.1'] },
                                        { id: 6, name: 'ANNEALING V SELECT', values: ['04', '05', '06', '07', '07', '03', '04', '04', '04', '04', '04'] },
                                        { id: 7, name: 'HEAT CUT V SELECT', values: ['01', '02', '04', '05', '06', '01', '01', '02', '04', '04', '03'] },
                                        { id: 8, name: 'D8 (COOLING AIR ON)', values: ['01', '01', '01', '01', '01', '01', '01', '01', '01', '01', '01'] },
                                        { id: 9, name: 'D9 (POP UP CLEANING)', values: ['00', '10', '20', '20', '20', '00', '00', '00', '00', '00', '00'] },
                                        { id: 10, name: <span>D10 <span className="text-[7px] font-normal">(ANNEALING THRESHOLD)</span></span>, values: ['04', '04', '12', '15', '15', <span className="bg-blue-100 p-0.5 block w-full">04</span>, <span className="bg-blue-100 p-0.5 block w-full">04</span>, '00', '00', '00', '00'] },
                                        { id: 11, name: 'D11', values: ['00', '01', '00', '00', '00', '00', '00', '00', '00', '00', '00'] },
                                        { id: 12, name: 'D12', values: ['15', '15', '20', '15', '10', '00', '00', '00', '00', '00', '00'] },
                                        { id: 13, name: 'D13', values: ['0350', '0330', '0350', '0350', '0350', '00', '00', '00', '00', '00', '00'] },
                                        { id: 14, name: 'D14', values: ['0000', '0000', '0000', '0000', '0000', '00', '00', '00', '00', '00', '00'] },
                                        { id: 15, name: 'D15', values: ['0000', '0000', '0000', '0000', '0000', '00', '00', '00', '00', '00', '00'] },
                                    ].map((row) => (
                                        <tr key={row.id}>
                                            <td className="border border-black">{row.id}.</td>
                                            <td className="border border-black text-left pl-1 font-bold">{row.name}</td>
                                            {row.values.map((val, idx) => (
                                                <td key={idx} className="border border-black">{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page48;