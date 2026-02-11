import React from 'react';
import { useFormContext } from 'react-hook-form';
import { content } from "../FAWI0005_V3-setting";
import A4Paper from "@/components/UIcomponent/A4Paper";
import SectionTitle from '@/components/UIcomponent/SectionTitle';
import FormQuickTable from '@/components/FormComponents/FormQuickTable';
import diagramTop from "@/assets/FAWI0005_V3/page121_diagram_top.png";

function Page121() {
    const { register } = useFormContext();

    // Data definition based on image
    // Headers: Code, ON, OFF, IP, HRP, MAO, SV, V, SF, C, PIK, CTRL, WK, WT, WS, WP, PC, SK, BSA
    const headerLabels = ["ON", "OFF", "IP", "HRP", "MAO", "SV", "V", "SF", "C", "PIK", "CTRL", "WK", "WT", "WS", "WP", "PC", "SK", "BSA"];

    // Rows Data
    const rowData = [
        { code: "C0000", vals: ["0013", "014", "2215", "000", "252", "+35.0", "9.0", "0035", "0", "000", "0000", "020", "120", "080", "043", "000009", "000000", "100000"] },
        { code: "C0001", vals: ["0013", "014", "2215", "000", "264", "+020.0", "9.0", "0025", "0", "000", "0000", "020", "120", "110", "063", "000009", "000000", "200000"] },
        { code: "C0002", vals: ["0002", "011", "2215", "000", "000", "+079.0", "5.0", "0300", "0", "000", "0000", "020", "170", "114", "140", "000000", "000001", "300020"] },
        { code: "C0003", vals: ["0001", "016", "2210", "000", "000", "+098.0", "2.0", "0300", "0", "000", "0000", "020", "170", "114", "240", "000000", "000001", "400020"] },
        { code: "H0001", desc: "+000000.1964 (1ST)" }, // Special rows? Wait, image shows explicit values for C0000-C0003. H0001-H0003 might be simple text or same format?
        // Looking at image: H0001 = +000000.1964 (1ST) is listed BELOW the table as text, not inside the table.
        // Ah, the table ends at C0003? 
        // Image: "H0001 = ...", "H0002 = ...", "H0003 = ..." are listed as text lines after the table.
        // Wait, line "H0003 = +000000.0100" is aligned with "C0003"? No.
        // The text listing H0001.. is separate.
        // So table rows are only C0000, C0001, C0002, C0003.
    ];

    // Actually, check image carefully.
    // 25. Check frequency...
    // Table Headers...
    // Rows: C0000, C0001, C0002, C0003.
    // BELOW table:
    // H0001 = ...
    // H0002 = ...
    // H0003 = ...
    // Data Setting Check section...

    // I will implement Table for C0000-C0003.
    // And Text for H0001-H0003.

    // Table Columns Config
    const columns = [
        {
            header: "Code",
            key: "code",
            width: "8%",
            className: "font-bold bg-gray-200 !p-0 !py-0 text-[9px]",
            bodyClassName: "font-bold bg-gray-200 !p-0 !py-0 text-[9px] h-4 leading-none"
        },
        ...headerLabels.map((label, idx) => ({
            header: label,
            key: `v${idx}`,
            width: "4.8%", // Remaining 92% / 18 columns ~= 5.1%. Using 4.8% to be safe.
            className: "bg-white !p-0 !py-0 text-[8px]",
            bodyClassName: "!p-0 !py-0 text-[8px] h-4 leading-none",
            type: "input"
        }))
    ];

    const data = rowData.slice(0, 4).map((row, rIdx) => {
        const rowObj = { code: row.code, className: "h-4" };
        row.vals.forEach((val, cIdx) => {
            rowObj[`v${cIdx}`] = `p121_${row.code}_v${cIdx}`;
            rowObj[`v${cIdx}_defaultValue`] = val; // Assuming FormQuickTable handles defaultValue if customized?
            // FormQuickTable generic input uses `defaultValue={row.defaultValue ?? ''}` strictly.
            // It doesn't look for `row[key + '_defaultValue']`.
            // I need to customize FormQuickTable or just accept empty?
            // Actually `FormQuickTable` line 235: `defaultValue={row.defaultValue ?? ''}`.
            // This applies ONE default value for the whole row?? No, `row` is the row object.
            // It uses `row.defaultValue` which seems wrong for cell-specific defaults.
            // Wait, looking at FormQuickTable.jsx line 235:
            // `defaultValue={row.defaultValue ?? ''}`
            // Yes, it uses `row.defaultValue`. That is a BUG/Limitation in FormQuickTable if cells have different defaults.
            // It means I CANNOT set per-cell default value easily using generic `type: input`.
            // I should use `render` function for cells to set default value!
        });
        return rowObj;
    });

    // Custom render to handle default values
    // Actually, I can update columns to use `render`.
    const columnsWithRender = columns.map(col => {
        if (col.type === 'input') {
            return {
                ...col,
                type: undefined, // Disable generic input
                render: (val, row, { register }) => (
                    <input
                        type="text"
                        {...register(val)}
                        defaultValue={row[`${val}_default`]} // Pass default via custom prop in data
                        className="w-full h-full bg-transparent text-center outline-none"
                    />
                )
            };
        }
        return col;
    });

    // Remap data to include _default keys
    const dataWithDefaults = rowData.slice(0, 4).map((row, rIdx) => {
        const rowObj = { code: row.code, className: "h-4" };
        row.vals.forEach((val, cIdx) => {
            const fieldName = `p121_${row.code}_v${cIdx}`;
            rowObj[`v${cIdx}`] = fieldName;
            rowObj[`${fieldName}_default`] = val;
        });
        return rowObj;
    });

    return (
        <A4Paper content={content} currentPage={121}>
            <div className="flex flex-col gap-1 px-2 font-sans text-[10px]">
                <SectionTitle>25. Frequency servo TM Cutting check [Thickness=80mm-3rd]</SectionTitle>

                <div className="flex justify-between items-end mb-1 px-1">
                    <div>For 0.20mm Wire</div>
                    <div className="font-bold underline">Please adjust "Low Pressure Flushing = 1.5L/min"</div>
                </div>

                <div className="text-[9px] mb-1 px-1">
                    (WIRE: TSUBAME Plus AEO.20 Work Piece: SKD - 11 T = 80 mm ); Use Program file <span className="text-red-600">23_P20_T80_3C-HINDTEST-BOSF3</span>
                </div>

                <div className="mb-1 font-bold text-[10px] px-1">
                    Check that the upper and lower nozzles are Ø6 !!! (ตรวจสอบ upper และ lower ใช้ nozzles Ø6)
                </div>

                {/* Table */}
                <div className="mb-2">
                    <FormQuickTable
                        columns={columnsWithRender}
                        data={dataWithDefaults}
                        bordered
                        className="text-center w-full table-fixed !overflow-hidden"
                        headerClassName="!text-[8px] leading-tight !py-0 break-words"
                    />
                </div>

                {/* H Codes */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-2 px-4 text-[10px]">
                    <div>H0001 = +000000.1964 (1ST)</div>
                    <div>H0002 = +000000.1264 (2ND)</div>
                    <div>H0003 = +000000.0100</div>
                    <div>C0003 = 0001 016 2210 ... (Included in table)</div>
                </div>

                {/* Data Setting Check */}
                <div className="mb-2">
                    <div className="font-bold text-[11px] mb-1">Data Setting Check</div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] pl-4">
                        <div>
                            <p>Manage-Parameter-Disch2-Page1</p>
                            <p className="pl-4">TM FRQ BACK SIG (V0 ~ V9) = 3</p>
                        </div>
                        <div className="flex items-center">
                            *Put 3 in all 10 items from V0 to 9
                        </div>
                        <div>
                            <p>Manage-Parameter-Disch2-Page2</p>
                            <p className="pl-4">TM FRQ BACK SPEED (V0 ~ V9) = 300</p>
                        </div>
                        <div className="flex items-center">
                            *Put 300 in all 10 items from V0 to 9
                        </div>
                        <div>
                            <p>Manage-Secret2-Page1</p>
                            <p className="pl-4">[037] MACH VEL/ACC LIMIT = 02</p>
                        </div>
                    </div>
                </div>

                {/* Diagrams */}
                <div className="flex justify-around items-start mt-2">
                    <div className="flex flex-col items-center">
                        <div className="p-1 mb-1">
                            <img
                                src={diagramTop}
                                alt="3rd TOP Diagram"
                                className="w-[150px] object-contain"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.parentNode.innerHTML = '<div class="w-[150px] h-[100px] bg-gray-200 flex items-center justify-center text-red-500 font-bold border border-dashed border-red-500 text-[8px]">Image not found: page121_diagram_top.png</div>';
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-end h-full pt-10">
                        <div className="text-[9px]">
                            Discharge2 : 1/12
                        </div>
                        <div className="text-[9px]">
                            Size Adjust Point --&gt; Dish2-Page1-TM FRQ BACK REVICE (V0 ~ V9)
                        </div>
                    </div>
                </div>

            </div>
        </A4Paper>
    );
}

export default Page121;