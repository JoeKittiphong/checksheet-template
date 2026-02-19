/**
 * ComponentDefaults.js
 * Default properties and layout dimensions for form components.
 * Extracted from Test.jsx and component definitions.
 */

const ComponentDefaults = {
    // --- Page Templates ---
    A4Paper: {
        w: 36, h: 24,
        props: {
            content: {
                docNumber: 'FAWI0038',
                version: '2',
                dateOfIssue: '01/01/2026',
                approvalDate: '01/01/2026',
                issuedBy: 'Quality Assurance',
                title: 'MACHINE CHECK SHEET',
                model: 'MXL-250',
                group: 'A'
            },
            formNumber: 'QC-001'
        }
    },
    CoverPage: {
        w: 36, h: 24,
        props: {
            headerData: {
                model: 'MXL-250',
                machineNo: 'M-001'
            }
        }
    },
    A4blank: { w: 36, h: 24 },
    PureGrid: { w: 36, h: 24 },
    Spacer: { w: 36, h: 2 },
    SimpleText: { w: 18, h: 2, text: 'Custom Header', fontSize: 'h3', fontWeight: 'bold', textAlign: 'left' },
    StaticImage: { w: 12, h: 8, url: '', alt: 'Image description', objectFit: 'contain' },

    // --- Inputs & Basic Controls ---
    FormChecknumber: { w: 12, h: 4, label: 'Numeric Input Field', name: 'field_', minStd: 0, maxStd: 10, unit: 'mm' },
    FormInputCheckSTD: { w: 12, h: 4, label: 'Voltage Check (with Std)', name: 'field_', unit: 'V', minStd: 210, maxStd: 230, validateStd: true, showCheckbox: true },
    FormDateInput: { w: 12, h: 4, label: 'Date Selection', name: 'field_' },
    FormCheckedBox: { w: 12, h: 4, label: 'Signature Box', name: 'field_', defaultValue: { name: '', date: '' } },
    FormItemCheck: { w: 36, h: 2, name: 'field_', label: '1. Example Check Item Description' },
    FormStartFinishTime: { w: 18, h: 4, name: 'field_', label: 'Working Time', minHours: 1 },
    FormValidatedCell: { w: 6, h: 2, name: 'field_', min: 0, max: 100 },
    FormEDWVersionCheck: { w: 36, h: 8, name: 'version_check_', versions: { mc: '1.0', plc: '2.0' } },

    // --- Media & Specialized ---
    CompactImageUpload: { w: 12, h: 8, name: 'field_', label: 'Upload Photo' },
    ImageUploadBox: { w: 18, h: 8, name: 'field_', label: 'Image Upload' },
    ShapedCheckGroup: { w: 24, h: 8, name: 'field_', options: [{ label: 'Option 1', key: 'opt1' }, { label: 'Option 2', key: 'opt2' }] },
    EquationBox: { w: 24, h: 4, labelLeft: 'A', labelRight: 'B', labelResult: 'Total', operator: '+', nameLeft: 'a', nameRight: 'b', nameResult: 'res' },

    // --- Complex Tables ---
    FormQuickTable: {
        w: 36, h: 8,
        columns: [
            { header: "No.", key: "no", width: "50px" },
            { header: "Description", key: "desc", type: 'label' },
            { header: "Result", key: "res", type: 'input', width: "100px" }
        ],
        data: [{ no: "1", desc: "Item A", res: "a_res" }, { no: "2", desc: "Item B", res: "b_res" }]
    },
    FinalConditionTable: {
        w: 36, h: 10,
        headers: ["ON", "OFF", "IP", "SV", "V", "SF"],
        tableRows: [
            { label: "C0001 =", values: ["0008", "014", "2215", "+015.0", "8.0", "0050"] },
            { label: "C0002 =", values: ["0002", "011", "2215", "+056.0", "5.0", "1075"] }
        ]
    },
    FormTablePitchXYZUV: { w: 36, h: 12, name: 'pitch_', rowCount: 5, stepSize: 100, maxAB: 25, maxDiff: 2, tableLabels: ['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis'] },
    FormTablePitchXYZUVBigmodel: { w: 36, h: 16, name: 'pitch_big_', rowCount: 10, stepSize: 100, maxAB: 25, maxDiff: 2, tableLabels: ['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis'] },
    FormTablePitchCheck: { w: 36, h: 8, name: 'pc_', axisLabel: 'X1', rowCount: 5, stepSize: 20, maxAB: 15, maxDiff: 1 },
    FormDoubleCheckTable: { w: 36, h: 12, title: 'Torque Check Table', fieldPrefix: 'dc_', rows: [{ id: "1", partName: "Part A", qty: 4, torque: "100-110" }] },
    FormEDMBodyCheckTable: { w: 36, h: 12, name: 'body_', defaultValue: [{ no: 1, partName: "Sample Part", points: [{ check: "Sample Check", qty: 1, torque: "-" }] }] },
    FormStoneTableGrid: { w: 36, h: 16, name: 'stone_', maxName: 'stone_max', minName: 'stone_min', difName: 'stone_dif' },
    FormTableEnto: { w: 18, h: 16, name: 'ento_', axisLabel: 'Axis', rowCount: 10, stepSize: 20 },
    FormTableEntoDual: { w: 36, h: 16, name: 'ento_dual_', rowCount: 10, stepSize: 20 },
    FormTableEntoSingleDir: { w: 18, h: 12, name: 'ento_single_', axisLabel: 'X', direction: 'forward' },
    FormHorizontalTableSingleRow: { w: 36, h: 4, label: 'Metric', name: 'horiz_', columns: ['A', 'B', 'C'] },

    // --- Leveling & Geometric ---
    FormLevelTableXAB: { w: 36, h: 12, name: 'level_x_', cols: 5 },
    FormLevelTableYAB: { w: 24, h: 12, name: 'level_y_', rows: 5 },
    FormLevelTableWithDirections: { w: 36, h: 12, name: 'level_dir_', direction: 'pitching', rows: 5 },
    FormLevelTableXStdAct: { w: 36, h: 12, name: 'level_std_', groups: [{ label: 'Primary', sd: ['0', '50'], tolerance: 0.05 }] },

    // --- Geometric Charts ---
    FormSquareCheckGraph: { w: 24, h: 16, name: 'sq_graph_' },
    FormSquareCheckSQRGraph: { w: 24, h: 16, name: 'sqr_graph_' },
    FormSQRgrapX: { w: 24, h: 16, name: 'sqr_x_' },
    FormYawingUV: { w: 36, h: 12, name: 'yaw_uv_' },
    FormYawingY: { w: 18, h: 12, name: 'yaw_y_' },

    // --- Cutting & Record ---
    EDWFinalRecordCutting: { w: 36, h: 12, name: 'record_', standards: { c0001: { v: "0~10", a: "0~10", speed: "0~1", time: "0:00" } } },
    EDWFinalRoughnessCheck: { w: 36, h: 8, name: 'rough_', standards: { range: "1.3~2.4" } },
    EDWFinalSizeRecord: { w: 36, h: 8, name: 'size_', standards: { range: "0.0~1.0" } },
    FinalEDWwireCheck: { w: 36, h: 8, name: 'wire_', checks: ['Wire Tension', 'Feed Rate'] },

    // --- EDM Specific ---
    FormCeramicCheckEDM: { w: 36, h: 12, name: 'ceramic_edm_', standard: { min: -0.005, max: 0.005 } },
    FormCeramicCheckEDW: { w: 36, h: 12, name: 'ceramic_edw_', standard: { min: -0.01, max: 0.01 } },
    FormEDMLevelCeramic: { w: 18, h: 12, name: 'level_ceram_', standardX: 20, standardY: 20 },
    FormEDMCoilMagnetCheck: { w: 36, h: 8, name: 'coil_mag_' },
    FormEDMCoilTubeCheck: { w: 36, h: 8, name: 'coil_tube_' },

    // --- EDM Table Variations ---
    FormEDMTablePitchingX: { w: 36, h: 12, name: 'ep_x_' },
    FormEDMTablePitchingY: { w: 36, h: 12, name: 'ep_y_' },
    FormEDMTableRollingX: { w: 36, h: 12, name: 'er_x_' },
    FormEDMTableRollingY: { w: 36, h: 12, name: 'er_y_' },
    FormEDMTableStraightness: { w: 36, h: 12, name: 'estr_' },
    FormTableRollingX: { w: 36, h: 12, name: 'tr_x_' },
    FormTableRollingY: { w: 36, h: 12, name: 'tr_y_' },
    FormTablePitchingX: { w: 36, h: 12, name: 'tp_x_' },
    FormTablePitchingY: { w: 36, h: 12, name: 'tp_y_' },
    FormTableStraightness: { w: 36, h: 12, name: 'tstr_' },
    FormEDMYawingX: { w: 18, h: 12, name: 'ey_x_' },
    FormEDMYawingY: { w: 18, h: 12, name: 'ey_y_' },
    FormEDWYawingX: { w: 18, h: 12, name: 'wy_x_' },
    FormEDMparallelX: { w: 36, h: 12, name: 'ep_x_' },
    FormEDMparallelY: { w: 36, h: 12, name: 'ep_y_' },
    FormTableXPR: { w: 36, h: 8, name: 'xpr_', cols: 5 },
    FormTableYPR: { w: 36, h: 12, name: 'ypr_', rows: 5 },
    FormTableXABDIFF: { w: 36, h: 8, name: 'xab_', cols: 5 },
    FormTableYABDIFF: { w: 36, h: 12, name: 'yab_', rows: 5 },
    FormWorkstandCheck: { w: 36, h: 16, name: 'wsc_' },
    InputWithArrow: { w: 12, h: 4, name: 'arrow_in_', axis: 'x' },
    TableCalculateSetting: { w: 36, h: 12, name: 'calc_set_' },

    // --- Catch-all Default ---
    default: { w: 12, h: 4, label: 'New Element', name: 'field_' }
};

export default ComponentDefaults;
