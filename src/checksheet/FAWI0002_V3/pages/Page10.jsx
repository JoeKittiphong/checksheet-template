import React from 'react';
import { useFormContext } from 'react-hook-form';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import FormCheckedBox from '@/components/FormComponents/FormCheckedBox';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormChecknumber from '@/components/FormComponents/FormChecknumber';

// Images
import img9_0_1 from '@/assets/FAWI0002_V3/image-9-0-1.JPG';
import img9_0_2 from '@/assets/FAWI0002_V3/image-9-0-2.JPG';
import img9_0_3 from '@/assets/FAWI0002_V3/image-9-0-3.JPG';
import img9_1 from '@/assets/FAWI0002_V3/image-9-1.JPG';
import img9_2 from '@/assets/FAWI0002_V3/image-9-2.JPG';

function Page10() {
    const { register } = useFormContext();
    // Helper to render checkbox with a label in a single table cell
    const renderCheckLabel = (val, row, { register }) => {
        if (!val) return null;
        if (row.type === 'image' || row.type === 'footer') {
            return <img src={val} alt="Reference" className="h-14 w-auto mx-auto object-contain" />;
        }
        return (
            <div className="flex items-center gap-1 justify-center">
                <input
                    type="checkbox"
                    {...register(val)}
                    className="w-4 h-4 cursor-pointer"
                />
                <span className="text-[11px] font-bold">{row[`${val}_label`]}</span>
            </div>
        );
    };

    return (
        <A4Paper content={content} currentPage={10}>
            <div className="flex flex-col gap-4">
                {/* Section 9 */}
                <section>
                    <div className="flex justify-between items-start">
                        <SectionTitle>9. Wire Guide Check</SectionTitle>
                    </div>

                    <div className="flex flex-col ml-4">
                        <FormQuickTable
                            className="w-[600px]"
                            headerRows={[
                                [
                                    { header: 'Wire', rowSpan: 2, width: '150px' },
                                    { header: 'FJ-AWT TYPE', colSpan: 3, className: 'bg-gray-400 text-white' }
                                ],
                                [
                                    { header: <div className="text-[10px]">AWT Dies<br />(Sapphire)<br />2 pcs</div>, width: '150px' },
                                    { header: <div className="text-[10px]">Upper Guide<br />(AQ1-U(T))<br />1 pc</div>, width: '150px' },
                                    { header: <div className="text-[10px]">Lower Guide<br />(Diamond 87-3)<br />1 pc</div>, width: '150px' },
                                ]
                            ]}
                            columns={[
                                {
                                    key: 'wire', align: 'left',
                                    render: (v, r, ctx) => {
                                        if (r.type === 'footer_input') {
                                            return <input type="text" {...ctx.register(v)} className="w-[100px] border-b border-black outline-none text-center block mx-auto py-1" />;
                                        }
                                        return <span className={`whitespace-pre-wrap ${r.type === 'footer' ? 'font-bold' : ''}`}>{v}</span>;
                                    }
                                },
                                {
                                    key: 'awt', align: 'center', rowGroup: true,
                                    render: (v, r, ctx) => {
                                        if (r.type === 'input') return <input type="text" {...ctx.register(v)} className="w-full bg-transparent outline-none text-center" />;
                                        return renderCheckLabel(v, r, ctx);
                                    }
                                },
                                {
                                    key: 'upper', align: 'center', rowGroup: true,
                                    render: (v, r, ctx) => {
                                        if (r.type === 'input') return <input type="text" {...ctx.register(v)} className="w-full bg-transparent outline-none text-center" />;
                                        return renderCheckLabel(v, r, ctx);
                                    }
                                },
                                {
                                    key: 'lower', align: 'center', rowGroup: true,
                                    render: (v, r, ctx) => {
                                        if (r.type === 'input') return <input type="text" {...ctx.register(v)} className="w-full bg-transparent outline-none text-center" />;
                                        return renderCheckLabel(v, r, ctx);
                                    }
                                },
                            ]}
                            data={[
                                { wire: '0.05 mm', awt: 'p10_w005_awt', p10_w005_awt_label: '0.07', upper: 'p10_w005_up', p10_w005_up_label: '0.06', lower: 'p10_w005_lo', p10_w005_lo_label: '0.06' },
                                { wire: '0.07 mm', awt: 'p10_w007_awt', p10_w007_awt_label: '0.09', upper: 'p10_w007_up', p10_w007_up_label: '0.08', lower: 'p10_w007_lo', p10_w007_lo_label: '0.08' },
                                { wire: '0.10 mm', awt: 'p10_w010_awt', p10_w010_awt_label: '0.12', upper: 'p10_w010_up', p10_w010_up_label: '0.105', lower: 'p10_w010_lo', p10_w010_lo_label: '0.105' },
                                { wire: '0.15 mm', awt: 'p10_w015_awt', p10_w015_awt_label: '0.17', upper: 'p10_w015_up', p10_w015_up_label: '0.155', lower: 'p10_w015_lo', p10_w015_lo_label: '0.155' },
                                { wire: '0.20 mm', awt: 'p10_w020_awt', p10_w020_awt_label: '0.22', upper: 'p10_w020_up', p10_w020_up_label: '0.205', lower: 'p10_w020_lo', p10_w020_lo_label: '0.205' },
                                { wire: '0.25 mm', awt: 'p10_w025_awt', p10_w025_awt_label: '0.27', upper: 'p10_w025_up', p10_w025_up_label: '0.255', lower: 'p10_w025_lo', p10_w025_lo_label: '0.255' },
                                { wire: '0.30 mm', awt: 'p10_w030_awt', p10_w030_awt_label: '0.32', upper: 'p10_w030_up', p10_w030_up_label: '0.31', lower: 'p10_w030_lo', p10_w030_lo_label: '0.31' },
                                { wire: 'Record Lot No.(Wire Guide)', awt: 'p10_lot_wire_awt', upper: 'p10_lot_wire_up', lower: 'p10_lot_wire_lo', type: 'input' },
                                { wire: 'Record Lot No.(Case)', awt: 'p10_lot_case_awt', upper: 'p10_lot_case_up', lower: 'p10_lot_case_lo', type: 'input' },
                                // Footer part with rowSpan for images
                                { wire: 'Guide Jig Test Box No.', awt: img9_0_1, upper: img9_0_2, lower: img9_0_3, type: 'footer' },
                                { wire: 'p10_jig_test_box_no', awt: img9_0_1, upper: img9_0_2, lower: img9_0_3, type: 'footer_input' },
                            ]}
                        />
                    </div>
                </section>

                {/* Section 9.1 */}
                <section className="mt-2 border-t pt-4 border-gray-200 border-dashed">
                    <SectionTitle>9.1 Lower Guide (Guide G confirm)</SectionTitle>
                    <div className="ml-4 space-y-4">
                        <FormItemCheck
                            name="p10_91_check1"
                            label="ก่อนการประกอบ Lower Guide Diamond 87-3 ให้ตรวจเช็คด้านของ Guide G, โดยเช็คที่ ขอบของ Wire Guide ต้องเสมอ กับ Guide block L และหมายเลข Guide และ โลก Sodick ต้องอยู่ด้านบนเท่านั้น"
                        />

                        <FormItemCheck name="p10_91_check2" label="จดบันทึก สเปคและหมายเลขของ Guide G" />
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <img src={img9_1} alt="Guide G Confirmation" className="w-[520px]" />
                                <input
                                    name="p10_guide_g_spec"
                                    {...register('p10_guide_g_spec')}
                                    className="absolute top-[6%] left-[60.5%] w-[60px] border-b border-black outline-none text-[10px] text-center"
                                />
                                <input
                                    name="p10_guide_g_no"
                                    {...register('p10_guide_g_no')}
                                    className="absolute top-[16%] left-[63.5%] w-[50px] border-b border-black outline-none text-[10px] text-center"
                                />
                            </div>
                    <FormCheckedBox name="p10_checked_by" label="Checked by :" />
                        </div>
                    </div>
                </section>

                {/* Section 9.2 */}
                <section className="mt-2 border-t pt-4 border-gray-200 border-dashed">
                    <SectionTitle>9.2 Pipe Terminal O-Ring Check</SectionTitle>
                    <div className="flex items-center gap-8 ml-4">
                        <img src={img9_2} alt="O-Ring Check" className="w-[200px]" />
                        <div className="flex flex-col gap-2">
                            <FormItemCheck
                                name="p10_92_check"
                                label={<span className="text-sm">ในขณะที่ประกอบ Wire Guide (Sapphire)<br />ให้ตรวจสอบ <span className="underline font-bold">O-ring S15</span> ที่ชุด Terminal Cap KT</span>}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </A4Paper>
    );
}

export default Page10;