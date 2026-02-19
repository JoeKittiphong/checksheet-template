/**
 * ComponentSchemas.js
 * Defines the editable properties for each component in the Form Builder.
 * Each schema contains an array of fields with types and labels.
 */

export const ComponentSchemas = {
    // --- Page Templates ---
    A4Paper: [
        { name: 'formNumber', label: 'Form Number (Bottom Right)', type: 'text' },
        { name: 'content.docNumber', label: 'Document No.', type: 'text' },
        { name: 'content.version', label: 'Version', type: 'text' },
        { name: 'content.title', label: 'Form Title', type: 'text' },
        { name: 'content.model', label: 'Machine Model', type: 'text' },
        { name: 'content.group', label: 'Group (e.g., GROUP A)', type: 'text' },
    ],
    CoverPage: [
        { name: 'headerData.model', label: 'Model Name', type: 'text' },
        { name: 'headerData.machineNo', label: 'Machine No.', type: 'text' },
    ],

    // --- Inputs & Basic Controls ---
    FormChecknumber: [
        { name: 'name', label: 'Field Name (RHF Key)', type: 'text' },
        { name: 'label', label: 'Display Label', type: 'text' },
        { name: 'minStd', label: 'Min Value Standard', type: 'number' },
        { name: 'maxStd', label: 'Max Value Standard', type: 'number' },
        { name: 'unit', label: 'Unit (e.g., mm, kg)', type: 'text' },
        { name: 'required', label: 'Required Field', type: 'boolean' },
    ],
    FormInputCheckSTD: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'unit', label: 'Unit', type: 'text' },
        { name: 'minStd', label: 'Min Std', type: 'number' },
        { name: 'maxStd', label: 'Max Std', type: 'number' },
        { name: 'validateStd', label: 'Validate Against Std', type: 'boolean' },
        { name: 'showCheckbox', label: 'Show OK Checkbox', type: 'boolean' },
    ],
    FormDateInput: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'label', label: 'Label', type: 'text' },
    ],
    FormCheckedBox: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'label', label: 'Label', type: 'text' },
    ],
    FormItemCheck: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'label', label: 'Check Description', type: 'text' },
    ],
    SimpleText: [
        { name: 'text', label: 'Content', type: 'text' },
        {
            name: 'fontSize',
            label: 'Font Size',
            type: 'select',
            options: [
                { label: 'Heading 1', value: 'h1' },
                { label: 'Heading 2', value: 'h2' },
                { label: 'Heading 3', value: 'h3' },
                { label: 'Heading 4', value: 'h4' },
                { label: 'Normal', value: 'p' },
                { label: 'Small', value: 'small' }
            ]
        },
        {
            name: 'textAlign',
            label: 'Alignment',
            type: 'select',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' }
            ]
        },
        { name: 'fontWeight', label: 'Bold', type: 'boolean', valueMap: { true: 'bold', false: 'normal' } },
    ],
    StaticImage: [
        { name: 'url', label: 'Image URL', type: 'image' },
        { name: 'alt', label: 'Alt Text', type: 'text' },
        {
            name: 'objectFit',
            label: 'Fit Mode',
            type: 'select',
            options: [
                { label: 'Contain', value: 'contain' },
                { label: 'Cover', value: 'cover' },
                { label: 'Fill', value: 'fill' }
            ]
        },
    ],

    // --- Complex Tables ---
    FormQuickTable: [
        { name: 'w', label: 'Grid Width', type: 'number', disabled: true },
        { name: 'h', label: 'Grid Height', type: 'number' },
    ],
    FinalConditionTable: [
        { name: 'headers', label: 'Columns (JSON Array)', type: 'text' },
    ],
    FormTablePitchXYZUV: [
        { name: 'name', label: 'Base Name', type: 'text' },
        { name: 'rowCount', label: 'Steps (Rows)', type: 'number' },
        { name: 'stepSize', label: 'Step Size (mm)', type: 'number' },
        { name: 'maxAB', label: 'Max A-B Tol.', type: 'number' },
        { name: 'maxDiff', label: 'Max Diff Tol.', type: 'number' },
    ],
    FormDoubleCheckTable: [
        { name: 'title', label: 'Table Title', type: 'text' },
        { name: 'fieldPrefix', label: 'Field Prefix', type: 'text' },
    ],
    FormLevelTableXAB: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'cols', label: 'Columns', type: 'number' },
    ],
    FormLevelTableYAB: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'rows', label: 'Rows', type: 'number' },
    ],

    // --- Specialized EDW Components ---
    EDWFinalRecordCutting: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'h', label: 'Grid Height', type: 'number' },
        { name: 'standards', label: 'Cutting Standards (JSON Object)', type: 'text' },
    ],
    EDWFinalRoughnessCheck: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'h', label: 'Grid Height', type: 'number' },
        { name: 'standards.range', label: 'Roughness Range', type: 'text' },
    ],
    EDWFinalSizeRecord: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'h', label: 'Grid Height', type: 'number' },
        { name: 'standards.range', label: 'Size Range', type: 'text' },
    ],

    // Default fallback
    default: [
        { name: 'name', label: 'Field Name', type: 'text' },
        { name: 'label', label: 'Label', type: 'text' },
    ]
};
