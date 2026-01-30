import React from 'react';
import A4Paper from "@/components/UIcomponent/A4Paper";
import { content } from "../FAWI0002_V3-setting";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import FormItemCheck from '@/components/FormComponents/FormItemCheck';
import { useFormContext, Controller } from 'react-hook-form';
import TristateCheckbox from '@/components/UIcomponent/TristateCheckbox';

// Assets
import image54_2 from '@/assets/FAWI0002_V3/image-54-2.JPG';

function Page53() {
    const { control } = useFormContext();

    return (
        <A4Paper content={content} currentPage={53}>
            <div className="flex flex-col text-[11px] h-full">
                <SectionTitle className="mt-0">54.2 Speed Controller Adjustment Check (MANAGE ➔ CHECK ➔ WIRING [Page 4])</SectionTitle>

                <div className="flex flex-col items-center my-4">
                    <img src={image54_2} alt="Speed Controller Adjustment" className="max-w-full h-auto object-contain" style={{ maxHeight: '250px' }} />
                </div>

                <div className="px-4">
                    <FormQuickTable
                        columns={[
                            {
                                header: 'No.',
                                key: 'no',
                                width: '60px',
                                align: 'center',
                                rowGroup: true,
                                render: (cellValue, row) => (
                                    <div className="flex items-center justify-center gap-2">
                                        <Controller
                                            name={row.checkName}
                                            control={control}
                                            defaultValue={null}
                                            rules={{ validate: (v) => (v !== null && v !== undefined && v !== '') || "Required" }}
                                            render={({ field, fieldState: { error } }) => (
                                                <TristateCheckbox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    error={!!error}
                                                    size="w-5 h-5"
                                                />
                                            )}
                                        />
                                        <span className="text-lg">
                                            {cellValue === '1' && '①'}
                                            {cellValue === '2' && '②'}
                                            {cellValue === '3' && '③'}
                                            {cellValue === '4' && '④'}
                                            {cellValue === '5' && '⑤'}
                                        </span>
                                    </div>
                                )
                            },
                            { header: 'Motion', key: 'motion', rowGroup: true, width: '180px' },
                            { header: 'Address', key: 'address', rowGroup: true, width: '150px' },
                            { header: 'Adjustment', key: 'adj', align: 'left', padding: 'pl-2' }
                        ]}
                        data={[
                            // 1
                            {
                                no: '1',
                                checkName: 'p53_no1_check',
                                motion: 'Support Roller CLOSE\nSpeed',
                                address: '0528H [#87334]\n(0:OPEN/1:CLOSE)',
                                adj: 'Speed Controller 3 round OPEN'
                            },
                            // 2
                            {
                                no: '2',
                                checkName: 'p53_no2_check',
                                motion: 'Anneal Cooling Air Flow',
                                address: '050EH [#87336]\n(0:OFF / 1:ON)',
                                adj: 'Speed Controller 3 round OPEN'
                            },
                            // 3
                            {
                                no: '3',
                                checkName: 'p53_no3_check',
                                motion: 'EL-Unit OPEN/CLOSE\nSpeed',
                                address: '0500H [#87329]\n(0:OPEN/1:CLOSE)',
                                adj: 'A) EL CLOSE : Speed Controller 1.5 round OPEN'
                            },
                            {
                                no: '3',
                                checkName: 'p53_no3_check',
                                motion: 'EL-Unit OPEN/CLOSE\nSpeed',
                                address: '0500H [#87329]\n(0:OPEN/1:CLOSE)',
                                adj: 'B) EL OPEN : Speed Controller 1.5 round OPEN'
                            },
                            // 4
                            {
                                no: '4',
                                checkName: 'p53_no4_check',
                                motion: 'Retry Nozzle GO/BACK\nSpeed',
                                address: '050CH [#87335]\n(0:BACK / 1:GO)',
                                adj: 'A) Nozzle GO : Speed Controller 2 round OPEN'
                            },
                            {
                                no: '4',
                                checkName: 'p53_no4_check',
                                motion: 'Retry Nozzle GO/BACK\nSpeed',
                                address: '050CH [#87335]\n(0:BACK / 1:GO)',
                                adj: 'B) Nozzle BACK : Speed Controller 1 OPEN'
                            },
                            // 5
                            {
                                no: '5',
                                checkName: 'p53_no5_check',
                                motion: 'Pipe Air',
                                address: '051AH [#87341]\n(0:OFF / 1:ON)',
                                adj: 'Wire Ø0.3 -----------> Full OPEN'
                            },
                            {
                                no: '5',
                                checkName: 'p53_no5_check',
                                motion: 'Pipe Air',
                                address: '051AH [#87341]\n(0:OFF / 1:ON)',
                                adj: 'Wire Ø0.25, 0.20 ----> 6 OPEN'
                            },
                            {
                                no: '5',
                                checkName: 'p53_no5_check',
                                motion: 'Pipe Air',
                                address: '051AH [#87341]\n(0:OFF / 1:ON)',
                                adj: 'Wire Ø0.15, 0.10 ----> 3 OPEN'
                            },
                        ]}
                    />

                    <div className="mt-6">
                        <FormItemCheck
                            name="p53_after_all_check"
                            label='After all, check the every address is inputed as "0"'
                            showCheckbox={true}
                        />
                    </div>
                </div>
            </div>
        </A4Paper>
    );
}

export default Page53;