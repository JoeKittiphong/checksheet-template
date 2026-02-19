/**
 * ComponentDefaults.js
 * Default properties and layout dimensions for form components.
 * Extracted from Test.jsx and component definitions.
 */

const ComponentDefaults = {
    // --- Page Templates ---
    A4Paper: {
        w: 12, h: 12,
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
        w: 12, h: 12,
        props: {
            headerData: {
                model: 'MXL-250',
                machineNo: 'M-001'
            }
        }
    },
    A4blank: { w: 12, h: 12 },
    PureGrid: { w: 12, h: 12 },

    // --- Inputs & Basic Controls ---
    FormChecknumber: { w: 4, h: 2, label: 'Measure Value', name: 'field_', minStd: 0, maxStd: 10, unit: 'mm' },
    FormInputCheckSTD: { w: 4, h: 2, label: 'Voltage', name: 'field_', unit: 'V', minStd: 210, maxStd: 230, validateStd: true, showCheckbox: true },
    FormDateInput: { w: 4, h: 2, label: 'Check Date', name: 'field_' },
    FormCheckedBox: { w: 4, h: 2, label: 'CHECKED BY / DATE', name: 'field_', defaultValue: { name: '', date: '' } },
    FormItemCheck: { w: 12, h: 1, name: 'field_', label: '1. Description of check item' },
    FormStartFinishTime: { w: 6, h: 2, name: 'field_', label: 'Working Time', minHours: 1 },
    FormValidatedCell: { w: 2, h: 1, name: 'field_', min: 0, max: 100 },
    FormEDWVersionCheck: { w: 12, h: 4, name: 'version_check_', versions: { mc: '1.0', plc: '2.0' } },

    // --- Media & Specialized ---
    CompactImageUpload: { w: 4, h: 4, name: 'field_', label: 'Upload Photo' },
    ImageUploadBox: { w: 6, h: 4, name: 'field_', label: 'Image Upload' },
    ShapedCheckGroup: { w: 8, h: 4, name: 'field_', options: [{ label: 'Option 1', key: 'opt1' }, { label: 'Option 2', key: 'opt2' }] },
    EquationBox: { w: 8, h: 2, labelLeft: 'A', labelRight: 'B', labelResult: 'Total', operator: '+', nameLeft: 'a', nameRight: 'b', nameResult: 'res' },

    // --- Complex Tables ---
    FormQuickTable: {
        w: 12, h: 4,
        columns: [
            { header: "No.", key: "no", width: "50px" },
            { header: "Description", key: "desc", type: 'label' },
            { header: "Result", key: "res", type: 'input', width: "100px" }
        ],
        data: [{ no: "1", desc: "Item A", res: "a_res" }, { no: "2", desc: "Item B", res: "b_res" }]
    },
    FinalConditionTable: {
        w: 12, h: 6,
        name: 'final_cond_',
        rows: [
            { label: 'Sample Condition', name: 'c1', standard: 'OK' }
        ]
    },
    FormTablePitchXYZUV: { w: 12, h: 6, name: 'pitch_', rowCount: 5, stepSize: 100, maxAB: 25, maxDiff: 2, tableLabels: ['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis'] },
    FormTablePitchXYZUVBigmodel: { w: 12, h: 8, name: 'pitch_big_', rowCount: 10, stepSize: 100, maxAB: 25, maxDiff: 2, tableLabels: ['X Axis', 'Y Axis', 'Z Axis', 'U Axis', 'V Axis'] },
    FormTablePitchCheck: { w: 12, h: 4, name: 'pc_', axisLabel: 'X1', rowCount: 5, stepSize: 20, maxAB: 15, maxDiff: 1 },
    FormDoubleCheckTable: { w: 12, h: 6, title: 'Torque Check Table', fieldPrefix: 'dc_', rows: [{ id: "1", partName: "Part A", qty: 4, torque: "100-110" }] },
    FormEDMBodyCheckTable: { w: 12, h: 6, name: 'body_', defaultValue: [{ no: 1, partName: "Sample Part", points: [{ check: "Sample Check", qty: 1, torque: "-" }] }] },
    FormStoneTableGrid: { w: 12, h: 8, name: 'stone_', maxName: 'stone_max', minName: 'stone_min', difName: 'stone_dif' },
    FormTableEnto: { w: 6, h: 8, name: 'ento_', axisLabel: 'Axis', rowCount: 10, stepSize: 20 },
    FormTableEntoDual: { w: 12, h: 8, name: 'ento_dual_', rowCount: 10, stepSize: 20 },
    FormTableEntoSingleDir: { w: 6, h: 6, name: 'ento_single_', axisLabel: 'X', direction: 'forward' },
    FormHorizontalTableSingleRow: { w: 12, h: 2, label: 'Metric', name: 'horiz_', columns: ['A', 'B', 'C'] },

    // --- Leveling & Geometric ---
    FormLevelTableXAB: { w: 12, h: 6, name: 'level_x_', cols: 5 },
    FormLevelTableYAB: { w: 8, h: 6, name: 'level_y_', rows: 5 },
    FormLevelTableWithDirections: { w: 12, h: 6, name: 'level_dir_', direction: 'pitching', rows: 5 },
    FormLevelTableXStdAct: { w: 12, h: 6, name: 'level_std_', groups: [{ label: 'Primary', sd: ['0', '50'], tolerance: 0.05 }] },

    // --- Geometric Charts ---
    FormSquareCheckGraph: { w: 8, h: 8, name: 'sq_graph_' },
    FormSquareCheckSQRGraph: { w: 8, h: 8, name: 'sqr_graph_' },
    FormSQRgrapX: { w: 8, h: 8, name: 'sqr_x_' },
    FormYawingUV: { w: 12, h: 6, name: 'yaw_uv_' },
    FormYawingY: { w: 6, h: 6, name: 'yaw_y_' },

    // --- Cutting & Record ---
    EDWFinalRecordCutting: { w: 12, h: 6, name: 'record_', standards: { c0001: { v: "0~10", a: "0~10", speed: "0~1", time: "0:00" } } },
    EDWFinalRoughnessCheck: { w: 12, h: 4, name: 'rough_', standards: { range: "1.3~2.4" } },
    EDWFinalSizeRecord: { w: 12, h: 4, name: 'size_', standards: { range: "0.0~1.0" } },
    FinalEDWwireCheck: { w: 12, h: 4, name: 'wire_', checks: ['Wire Tension', 'Feed Rate'] },

    // --- EDM Specific ---
    FormCeramicCheckEDM: { w: 12, h: 6, name: 'ceramic_edm_', standard: { min: -0.005, max: 0.005 } },
    FormCeramicCheckEDW: { w: 12, h: 6, name: 'ceramic_edw_', standard: { min: -0.01, max: 0.01 } },
    FormEDMLevelCeramic: { w: 6, h: 6, name: 'level_ceram_', standardX: 20, standardY: 20 },
    FormEDMCoilMagnetCheck: { w: 12, h: 4, name: 'coil_mag_' },
    FormEDMCoilTubeCheck: { w: 12, h: 4, name: 'coil_tube_' },

    // --- EDM Table Variations ---
    FormEDMTablePitchingX: { w: 12, h: 6, name: 'ep_x_' },
    FormEDMTablePitchingY: { w: 12, h: 6, name: 'ep_y_' },
    FormEDMTableRollingX: { w: 12, h: 6, name: 'er_x_' },
    FormEDMTableRollingY: { w: 12, h: 6, name: 'er_y_' },
    FormEDMTableStraightness: { w: 12, h: 6, name: 'estr_' },
    FormTableRollingX: { w: 12, h: 6, name: 'tr_x_' },
    FormTableRollingY: { w: 12, h: 6, name: 'tr_y_' },
    FormTablePitchingX: { w: 12, h: 6, name: 'tp_x_' },
    FormTablePitchingY: { w: 12, h: 6, name: 'tp_y_' },
    FormTableStraightness: { w: 12, h: 6, name: 'tstr_' },
    FormEDMYawingX: { w: 6, h: 6, name: 'ey_x_' },
    FormEDMYawingY: { w: 6, h: 6, name: 'ey_y_' },
    FormEDWYawingX: { w: 6, h: 6, name: 'wy_x_' },
    FormEDMparallelX: { w: 12, h: 6, name: 'ep_x_' },
    FormEDMparallelY: { w: 12, h: 6, name: 'ep_y_' },
    FormTableXPR: { w: 12, h: 4, name: 'xpr_', cols: 5 },
    FormTableYPR: { w: 12, h: 6, name: 'ypr_', rows: 5 },
    FormTableXABDIFF: { w: 12, h: 4, name: 'xab_', cols: 5 },
    FormTableYABDIFF: { w: 12, h: 6, name: 'yab_', rows: 5 },
    FormWorkstandCheck: { w: 12, h: 8, name: 'wsc_' },
    InputWithArrow: { w: 4, h: 2, name: 'arrow_in_', axis: 'x' },
    TableCalculateSetting: { w: 12, h: 6, name: 'calc_set_' },

    // --- Catch-all Default ---
    default: { w: 4, h: 2, label: 'New Element', name: 'field_' }
};

export default ComponentDefaults;
