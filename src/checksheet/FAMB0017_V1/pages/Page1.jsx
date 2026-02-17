import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAMB0017_V1-setting";
import FormChecknumber from "@/components/FormComponents/FormChecknumber";
import FormCheckedBox from "@/components/FormComponents/FormCheckedBox";
import FormItemCheck from "@/components/FormComponents/FormItemCheck";
import FormSquareCheckSQRGraph from "@/components/FormComponents/FormSquareCheckSQRGraph";

// Images
import image3_1 from "@/assets/FAMB0017_V1/FAMB0017-3-1.PNG";
import image3_2 from "@/assets/FAMB0017_V1/FAMB0017-3-2.PNG";

function Page1() {
    const { control } = useFormContext();

    // --- Section 3: Calculations ---
    // X-Axis
    const xWatch = useWatch({
        control,
        name: [
            'page1.item3.x_data.2',
            'page1.item3.x_data.3',
            'page1.item3.x_data.4',
            'page1.item3.x_data.5',
            'page1.item3.x_data.6',
        ]
    });
    const xValues = [0, ...xWatch.map(v => (v === '' || v === undefined) ? NaN : parseFloat(v)), 0];
    const xValidValues = xValues.filter(v => !isNaN(v));
    const xMax = xValidValues.length > 0 ? Math.max(...xValidValues) : null;
    const xMin = xValidValues.length > 0 ? Math.min(...xValidValues) : null;
    const xDiff = (xMax !== null && xMin !== null) ? Math.abs(xMax - xMin) : null;

    // Y-Axis
    const yWatch = useWatch({
        control,
        name: [
            'page1.item3.y_data.2',
            'page1.item3.y_data.3',
            'page1.item3.y_data.4',
            'page1.item3.y_data.5',
        ]
    });
    const yValues = [0, ...yWatch.map(v => (v === '' || v === undefined) ? NaN : parseFloat(v)), 0];
    const yValidValues = yValues.filter(v => !isNaN(v));
    const yMax = yValidValues.length > 0 ? Math.max(...yValidValues) : null;
    const yMin = yValidValues.length > 0 ? Math.min(...yValidValues) : null;
    const yDiff = (yMax !== null && yMin !== null) ? Math.abs(yMax - yMin) : null;

    const formatNum = (num) => num !== null ? num.toFixed(2).replace(/\.?0+$/, '') : '';

    return (
        <A4Paper content={content} currentPage={1}>
            <div className="flex flex-col h-full font-sans p-6 text-[13px] leading-tight">

                {/* 1. Leveling Check */}
                <div className="mb-8">
                    <h2 className="font-bold mb-4">1. ตรวจสอบค่าระดับน้ำของแกน X (ค่า SD ≤ 10 μm)</h2>
                    <div className="flex items-start gap-12 ml-6">
                        <div className="space-y-6 flex-1 max-w-[500px]">
                            <div className="flex items-center gap-4">
                                <span className="w-12 font-bold">B = R</span>
                                <FormChecknumber name="page1.item1.b_r.1" label="" className="w-32 border-b-dotted" />
                                <div className="w-20 text-center text-lg border-b">0</div>
                                <FormChecknumber name="page1.item1.b_r.3" label="" className="w-32 border-b-dotted" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-12 font-bold">A = L</span>
                                <FormChecknumber name="page1.item1.a_l.1" label="" className="w-32 border-b-dotted" />
                                <FormChecknumber name="page1.item1.a_l.2" label="" className="w-32 border-b-dotted" />
                                <FormChecknumber name="page1.item1.a_l.3" label="" className="w-32 border-b-dotted" />
                            </div>
                        </div>
                        <div className="w-64 pt-4">
                            <FormChecknumber name="page1.item1.gauge_no" label="Leveling gauge no." className="w-full border-b-dotted" />
                        </div>
                    </div>
                </div>

                {/* 2. Square Check */}
                <div className="mb-10">
                    <h2 className="font-bold mb-4">2. ตรวจสอบค่า Square ของแกน X และแกน Y (ค่า SD ≤ 15 μm)</h2>
                    <div className="flex border-2 border-black ml-4 h-[250px]">
                        {/* Radio buttons and inputs on the left */}
                        <div className="w-1/2 border-r-2 border-black p-4 space-y-6">
                            <p className="font-bold underline mb-4">Square Side</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="w-6 font-bold">X =</span>
                                    <div className="flex gap-4">
                                        {['A', 'B', 'C', 'D'].map(side => (
                                            <FormItemCheck key={side} name={`page1.item2.side_x.${side}`} label={side} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-6 font-bold">Y =</span>
                                    <div className="flex gap-4">
                                        {['A', 'B', 'C', 'D'].map(side => (
                                            <FormItemCheck key={side} name={`page1.item2.side_y.${side}`} label={side} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <FormChecknumber name="page1.item2.square_no" label="Square no." className="w-32 border-b-dotted" />
                            </div>
                        </div>

                        {/* SquareCheckSQRGraph on the right */}
                        <div className="w-1/2 flex items-center justify-center p-2 relative">
                            <FormSquareCheckSQRGraph
                                name="page1.item2.sqr_data"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Shaft Straightness Check */}
                <div className="flex-1">
                    <h2 className="font-bold mb-4">3. ตรวจสอบค่า Shaft Straightness ของแกน X และแกน Y (ค่า SD ของ Max - Min ≤ 15 μm)</h2>

                    {/* X Axis */}
                    <div className="flex flex-col mb-8 ml-4">
                        <p className="w-full text-center italic text-gray-600 mb-2">แบ่งออกเป็น 7 ช่อง ให้เท่าๆ กัน</p>
                        <div className="flex items-start gap-4">
                            <span className="font-bold w-12 pt-20">แกน X</span>
                            <div className="flex-1 flex flex-col items-center">
                                <img src={image3_1} alt="X Axis Diagram" className="h-14 object-contain mb-2" />
                                <div className="w-[500px]">
                                    <table className="w-full border-collapse border border-black text-center">
                                        <tbody>
                                            <tr className="bg-gray-100">
                                                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                                    <td key={num} className="border border-black p-1 w-1/7">{num}</td>
                                                ))}
                                            </tr>
                                            <tr className="h-10">
                                                <td className="border border-black font-bold">0</td>
                                                {[2, 3, 4, 5, 6].map(num => (
                                                    <td key={num} className="border border-black p-0">
                                                        <FormChecknumber name={`page1.item3.x_data.${num}`} label="" className="w-full border-none text-center bg-transparent" />
                                                    </td>
                                                ))}
                                                <td className="border border-black font-bold">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="space-y-4 pt-16 min-w-[150px]">
                                <div className="flex items-center gap-2">
                                    <span className="w-20 text-right">Max =</span>
                                    <div className="w-16 border-b border-black text-center font-bold">{formatNum(xMax)}</div>
                                    <span>μm</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-20 text-right">Min =</span>
                                    <div className="w-16 border-b border-black text-center font-bold">{formatNum(xMin)}</div>
                                    <span>μm</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-20 text-right">Max - Min =</span>
                                    <div className="w-16 border-b border-black text-center font-bold">{formatNum(xDiff)}</div>
                                    <span>μm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Y Axis */}
                    <div className="flex items-start gap-4 ml-4">
                        <span className="font-bold w-12 pt-20">แกน Y</span>

                        <div className="flex items-center gap-4">
                            <img src={image3_2} alt="Y Axis Diagram" className="h-48 object-contain" />
                            <div className="flex flex-col items-center gap-4">
                                <table className="w-24 border-collapse border border-black text-center">
                                    <tbody>
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <tr key={num} className="h-8">
                                                <td className="border border-black bg-gray-100 font-bold w-10">{num}</td>
                                                <td className="border border-black p-0 min-w-[60px]">
                                                    {(num === 1 || num === 6) ? (
                                                        <span className="font-bold">0</span>
                                                    ) : (
                                                        <FormChecknumber name={`page1.item3.y_data.${num}`} label="" className="w-full border-none text-center bg-transparent" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="italic text-gray-600 self-center ml-2">แบ่งออกเป็น 6 ช่อง ให้เท่าๆ กัน</div>
                        </div>

                        <div className="flex-1 space-y-4 pt-20 ml-10">
                            <div className="flex items-center gap-2">
                                <span className="w-20 text-right">Max =</span>
                                <div className="w-16 border-b border-black text-center font-bold">{formatNum(yMax)}</div>
                                <span>μm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-20 text-right">Min =</span>
                                <div className="w-16 border-b border-black text-center font-bold">{formatNum(yMin)}</div>
                                <span>μm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-20 text-right">Max - Min =</span>
                                <div className="w-16 border-b border-black text-center font-bold">{formatNum(yDiff)}</div>
                                <span>μm</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10 self-end pb-4 ml-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[11px]">Dial gauge no.</span>
                                <FormChecknumber name="page1.item3.dial_gauge_no" label="" className="w-32 border-b-dotted" />
                            </div>
                            <FormCheckedBox name="page1.signed_info" label="Check By / Date" className="w-40 border border-black p-2" />
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page1;