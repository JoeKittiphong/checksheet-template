import React, { useRef } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EntoTableSingleDir Component
 * Simplified EntoTable for single-direction (UP) checks without Diff column.
 */
const EntoTableSingleDir = ({
    name,
    control,
    sections = [], // Array of { label, key (optional), cols: ['z1', 'z2'] }
    rowCount = 16, // Default 0-300 step 20 = 16 rows
    stepSize = 20,
    topHeader = null,
    validation = {}, // Additional validation rules
    maxValue = 15, // Validation max value (default)
    required = true, // Default to required
    standard = null, // SD value for validation (number or object {min, max})
    headerImage = null, // URL for image
    headerControl = null, // { entoNo: 'fieldName', selection: 'fieldName' }
}) => {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();

    // Watch all values under this name to calculate diffs
    const watchedValues = useWatch({ control, name });

    // References for navigation
    const inputRefs = useRef([]);

    // Watch values (optional, for future validation dependencies)
    // const watchedData = useWatch({ control, name });

    // Row Labels (300 down to 0)
    // rowCount 16 -> 0 to 15. max index 15.
    // label = index * stepSize?
    // If we want 300 at top: 
    // row 0: label 300
    // row 15: label 0
    const rowLabels = Array.from({ length: rowCount }, (_, i) => (rowCount - 1 - i) * stepSize);

    // Validation
    const isInputInvalid = (val) => !validateValue(val, { maxValue, ...validation, validateStd: true });

    // Styles
    const tableStyle = { borderCollapse: 'collapse', fontSize: '10px', fontFamily: 'Arial, sans-serif' };
    const thStyle = { border: '1px solid black', padding: '1mm 2mm', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f0f0f0' };
    const tdStyle = { border: '1px solid black', padding: 0, textAlign: 'center', height: '5mm', minWidth: '8mm' };
    const inputStyle = { width: '100%', height: '100%', border: 'none', textAlign: 'center', fontSize: '11px', background: 'transparent', outline: 'none' };
    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };

    const handleKeyDown = (e, sectionIdx, colIdx, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Always move UP (visually) -> Decrement rowIndex
            const direction = -1; // -1 means index decreases (moving to top row)

            // Current column inputs
            const currentColumnInputs = inputRefs.current[sectionIdx]?.[colIdx] || [];

            moveFocus(e, rowIndex, currentColumnInputs, {
                direction,
                onBoundary: () => {
                    // Optional: Move to next column?
                    // If at top of col 1, move to bottom of col 2?
                    // Bottom row index is rowCount-1.

                    const nextColIdx = colIdx + 1;
                    if (inputRefs.current[sectionIdx]?.[nextColIdx]) {
                        // Focus bottom of next column
                        const nextInput = inputRefs.current[sectionIdx][nextColIdx][rowCount - 1]; // Bottom row
                        if (nextInput) nextInput.focus();
                    }
                }
            });
        }
    };

    return (
        <div className="inline-block flex flex-col items-center">
            {/* Optional Header Section */}
            {(headerImage || headerControl) && (
                <div className="flex w-full justify-center items-center mb-2 px-2">
                    {/* Left: Image */}
                    {headerImage && (
                        <div className="mr-4">
                            <img src={headerImage} alt="Diagram" style={{ height: '60px', objectFit: 'contain' }} />
                        </div>
                    )}

                    {/* Right: Controls */}
                    {headerControl && (
                        <div className="flex flex-col items-end">
                            {/* Ento No */}
                            <div className="flex items-end mb-4">
                                <span className="font-bold text-xs">Ento No.</span>
                                <Controller
                                    name={headerControl.entoNo}
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => {
                                        const isInvalid = !field.value && (isSubmitted || !!error);
                                        return (
                                            <input
                                                {...field}
                                                className={`border-b border-black text-center w-20 outline-none text-sm ${isInvalid ? 'bg-red-100' : ''}`}
                                                autoComplete="off"
                                            />
                                        );
                                    }}
                                />
                            </div>
                            <Controller
                                name={headerControl.selection}
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field, fieldState: { error } }) => {
                                    const isInvalid = !field.value && (isSubmitted || !!error);
                                    return (
                                        <div className={`flex gap-2 p-1 ${isInvalid ? 'bg-red-100' : ''}`}>
                                            {['A', 'B', 'C', 'D'].map(opt => (
                                                <div
                                                    key={opt}
                                                    onClick={() => field.onChange(opt)}
                                                    className={`border border-black w-6 h-6 flex items-center justify-center cursor-pointer text-sm select-none transition-colors
                                                         ${field.value === opt ? 'bg-gray-300 font-bold' : 'bg-white hover:bg-gray-100'}`}
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            )}

            <table style={tableStyle}>
                <thead>
                    {topHeader && (
                        <tr>
                            <th colSpan={1 + sections.reduce((acc, s) => acc + s.cols.length, 0)} style={{ ...thStyle, backgroundColor: 'white', padding: '4px' }}>
                                {topHeader}
                            </th>
                        </tr>
                    )}
                    <tr>
                        <th style={{ ...thStyle, width: '15mm' }}>mm</th>
                        {sections.map((section, idx) => (
                            <React.Fragment key={idx}>
                                {section.cols.map((colLabel, cIdx) => (
                                    <th key={cIdx} style={{ ...thStyle, width: '20mm' }}>{colLabel}</th>
                                ))}
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex}>
                            <td style={{ ...tdStyle, backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>{label}</td>

                            {sections.map((section, secIdx) => (
                                section.cols.map((colKey, colIdx) => {
                                    // Field Name: name.sectionKey.colKey.rowIndex OR name.colKey.rowIndex
                                    // If section.key defined, use it. Else flat.
                                    // For Z1/Z2, usually simple keys.
                                    // colKey is the label "Z1", "Z2".
                                    // We should use a separate 'key' for RHF if label includes spaces or special chars.
                                    // Assuming cols are simple keys like 'z1', 'z2'.

                                    const fieldName = section.key
                                        ? `${name}.${section.key}.${colKey}.${rowIndex}`
                                        : `${name}.${colKey}.${rowIndex}`;

                                    // Store ref setup
                                    if (!inputRefs.current[secIdx]) inputRefs.current[secIdx] = [];
                                    if (!inputRefs.current[secIdx][colIdx]) inputRefs.current[secIdx][colIdx] = [];

                                    return (
                                        <td key={`${secIdx}-${colIdx}`} style={tdStyle}>
                                            <Controller
                                                name={fieldName}
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: required }}
                                                render={({ field, fieldState: { error } }) => {
                                                    const val = field.value || '';
                                                    const customInvalid = isInputInvalid(val) && (isSubmitted || val);
                                                    const invalid = !!error || customInvalid;

                                                    return (
                                                        <input
                                                            ref={(e) => {
                                                                field.ref(e);
                                                                inputRefs.current[secIdx][colIdx][rowIndex] = e;
                                                            }}
                                                            type="text"
                                                            style={{
                                                                ...inputStyle,
                                                                ...(invalid ? invalidStyle : {})
                                                            }}
                                                            value={val}
                                                            onChange={(e) => field.onChange(cleanNumericInput(e.target.value))}
                                                            onBlur={field.onBlur}
                                                            onKeyDown={(e) => handleKeyDown(e, secIdx, colIdx, rowIndex)}
                                                        />
                                                    );
                                                }}
                                            />
                                        </td>
                                    );
                                })
                            ))}
                        </tr>
                    ))}
                </tbody>
                {/* Result Footer */}
                <tfoot>
                    <tr>
                        <td style={{ ...tdStyle, backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Diff</td>
                        {sections.map((section, secIdx) => (
                            section.cols.map((colKey, colIdx) => {
                                // Calculate Diff for this column
                                // Path: watchedValues[colKey] (object or array depending on RHF structure)
                                // Since we use names like `name.colKey.rowIndex`, `watchedValues` should be { colKey: { 0: val, 1: val... } }

                                let min = Infinity;
                                let max = -Infinity;
                                let hasData = false;

                                const colData = watchedValues?.[colKey];

                                if (colData) {
                                    // Iterate through 0 to rowCount-1
                                    for (let i = 0; i < rowCount; i++) {
                                        const valStr = colData[i];
                                        if (valStr !== undefined && valStr !== '' && valStr !== null) {
                                            const val = parseFloat(valStr);
                                            if (!isNaN(val)) {
                                                if (val < min) min = val;
                                                if (val > max) max = val;
                                                hasData = true;
                                            }
                                        }
                                    }
                                }

                                const diff = hasData ? (max - min).toFixed(3) : '-';
                                let isDiffInvalid = false;

                                if (standard !== null && hasData) {
                                    const diffVal = max - min;
                                    if (typeof standard === 'object') {
                                        const minStd = standard.min !== undefined ? standard.min : -Infinity;
                                        const maxStd = standard.max !== undefined ? standard.max : Infinity;
                                        if (diffVal < minStd || diffVal > maxStd) isDiffInvalid = true;
                                    } else {
                                        if (diffVal > standard) isDiffInvalid = true;
                                    }
                                }

                                return (
                                    <td key={`res-${secIdx}-${colIdx}`} style={{
                                        ...tdStyle,
                                        fontWeight: 'bold',
                                        backgroundColor: isDiffInvalid ? '#ffcccc' : '#e6f7ff',
                                        color: isDiffInvalid ? 'red' : 'black'
                                    }}>
                                        {diff}
                                    </td>
                                );
                            })
                        ))}
                    </tr>
                    {standard !== null && (
                        <tr>
                            <td style={{ ...tdStyle, backgroundColor: '#f0f0f0', fontSize: '9px' }}>Std: {typeof standard === 'object' ? `${standard.min} ~ ${standard.max}` : standard}</td>
                            <td colSpan={sections.reduce((acc, s) => acc + s.cols.length, 0)} style={{ ...tdStyle, border: 'none', textAlign: 'left', paddingLeft: '5px', fontSize: '10px' }}>
                                Max Diff: {typeof standard === 'object' ? `${standard.min} ~ ${standard.max}` : `≤ ${standard}`} µm
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
};

export default EntoTableSingleDir;
