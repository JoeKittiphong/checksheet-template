import React, { useState, useRef, useEffect } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EntoTable Component
 * Generic component for TableEnto and TableEntoDual.
 * Refactored to use granular Controllers and Enable/Disable sections.
 */
const EntoTable = ({
    name,
    control,
    sections = [],
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    formula = null,
    onCalculateFormula = null,
    peakPoint = null, // Default: same as rowCount if null
    maxFormula = null // Validation for formula (A+B) column
}) => {
    const { formState: { isSubmitted }, setValue, getValues } = useFormContext();
    const { moveFocus } = useFocusNavigation();

    // Effective Peak Point
    const effectivePeak = peakPoint || rowCount;
    const topIndex = rowCount - effectivePeak;

    // References for navigation
    const inputRefs = useRef([]);

    // Enable/Disable State for each section
    // Initial state: all enabled
    const [enabledSections, setEnabledSections] = useState(
        sections.map(() => true)
    );

    // Watch values for calculation
    const watchedData = useWatch({
        control,
        name: name,
        defaultValue: {}
    });

    const getSectionData = (sectionKey) => {
        if (!sectionKey) return watchedData || { a: [], b: [] };
        return watchedData[sectionKey] || { a: [], b: [] };
    };

    const getValue = (sectionKey, colKey, rowIndex) => {
        const sectionData = getSectionData(sectionKey);
        return sectionData[colKey]?.[rowIndex] || '';
    };

    const getDiff = (sectionKey, cols, rowIndex) => {
        const val1 = parseFloat(getValue(sectionKey, cols[0], rowIndex));
        const val2 = parseFloat(getValue(sectionKey, cols[1], rowIndex));
        if (isNaN(val1) || isNaN(val2)) return '';
        return Math.abs(val1 - val2).toFixed(3).replace(/\.?0+$/, '');
    };

    // Validation
    const isInputInvalid = (val) => !validateValue(val, { maxValue, validateStd: true });
    const isDiffInvalid = (val) => !validateValue(val, { maxDiff, validateStd: true, useAbs: true });

    // Row Labels
    const rowLabels = Array.from({ length: rowCount }, (_, i) => (rowCount - 1 - i) * stepSize);

    // Handlers
    const toggleSection = (index) => {
        const newEnabled = [...enabledSections];
        newEnabled[index] = !newEnabled[index];
        setEnabledSections(newEnabled);

        // Optional: Clear errors or handle data clearing?
        // For now, just disabling validation.
    };

    const handleKeyDown = (e, sectionIdx, colIdx, rowIndex) => {
        if (!enabledSections[sectionIdx]) return; // Prevent navigation in disabled section

        if (e.key === 'Enter') {
            e.preventDefault();

            // Snake-like Navigation logic
            const isGoingUp = colIdx % 2 === 0;
            const direction = isGoingUp ? -1 : 1;
            const currentColumnInputs = inputRefs.current[sectionIdx]?.[colIdx] || [];

            moveFocus(e, rowIndex, currentColumnInputs, {
                direction,
                onBoundary: () => {
                    let nextSectionIdx = sectionIdx;
                    let nextColIdx = colIdx + 1;

                    // Move to next column in section
                    if (nextColIdx >= sections[sectionIdx].cols.length) {
                        // Attempt to jump to next section
                        nextSectionIdx++;
                        nextColIdx = 0;
                    }

                    // Check if next section exists and is enabled
                    // If disabled, skip it? (For Dual table, simpler to just stop or try find next enabled)
                    // For now, standard logic. If disabled input is focused (not possible via click/tab usually if disabled), it won't work well.
                    // But programmatic focus might work.

                    if (nextSectionIdx < sections.length) {
                        if (!enabledSections[nextSectionIdx]) {
                            // Skip disabled section?
                            // Implementing skip logic for granular navigation is complex. 
                            // Let's just focus if it's there, user simply won't be able to edit.
                            // But native 'disabled' input isn't focusable. 
                            // So focus will fail.
                            return;
                        }

                        const nextIsGoingUp = nextColIdx % 2 === 0;
                        const nextRowIndex = nextIsGoingUp ? rowCount - 1 : topIndex + 1;
                        const nextInput = inputRefs.current[nextSectionIdx]?.[nextColIdx]?.[nextRowIndex];
                        if (nextInput) nextInput.focus();
                    }
                }
            });
        }
    };

    // Styles
    const tableStyle = { borderCollapse: 'collapse', fontSize: '8px', fontFamily: 'Arial, sans-serif' };
    const thStyle = { border: '1px solid black', padding: '1mm 2mm', textAlign: 'center', fontWeight: 'normal', backgroundColor: 'white' };
    const thGrayStyle = { ...thStyle, backgroundColor: '#e0e0e0' };
    const tdStyle = { border: '1px solid black', padding: '1mm 2mm', textAlign: 'center', height: '4mm', minWidth: '6mm' };
    const inputStyle = { width: '100%', height: '100%', border: 'none', textAlign: 'center', fontSize: '10px', padding: 0, margin: 0, background: 'transparent', outline: 'none' };
    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };
    const grayBgStyle = { backgroundColor: '#f2f2f2' };
    const disabledStyle = { ...tdStyle, padding: 0, backgroundColor: '#e0e0e0' };

    return (
        <div className="inline-block">
            <table style={tableStyle}>
                <thead>
                    {sections.length > 1 && (
                        <tr>
                            <th style={{ ...thStyle, border: 'none' }}></th>
                            {sections.map((section, idx) => (
                                <th key={idx} colSpan={3 + (formula && idx === sections.length - 1 ? 1 : 0)} style={thGrayStyle}>
                                    <div className="flex items-center justify-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={enabledSections[idx]}
                                            onChange={() => toggleSection(idx)}
                                        />
                                        <span>{section.key === 'left' ? 'Left' : (section.key === 'right' ? 'Right' : '')}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    )}
                    <tr>
                        <th rowSpan={2} style={{ ...thStyle, width: '8mm' }}>mm</th>
                        {sections.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <th colSpan={3} style={thStyle}>
                                    {/* If single section, put checkbox here */}
                                    {sections.length === 1 ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={enabledSections[idx]}
                                                onChange={() => toggleSection(idx)}
                                            />
                                            <span>{section.label}</span>
                                        </div>
                                    ) : (
                                        section.label
                                    )}
                                </th>
                            </React.Fragment>
                        ))}
                        {formula && <th rowSpan={2} style={thStyle}>{formula}</th>}
                    </tr>
                    <tr>
                        {sections.map((section, secIdx) => (
                            <React.Fragment key={secIdx}>
                                {section.headerCols.map((label, cIdx) => (
                                    <th key={cIdx} style={{ ...thStyle, width: '8mm' }}>{label}</th>
                                ))}
                                <th style={{ ...thStyle, width: '8mm' }}></th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowLabels.map((label, rowIndex) => (
                        <tr key={rowIndex}>
                            <td style={tdStyle}>{label}</td>
                            {sections.map((section, secIdx) => {
                                const isSectionEnabled = enabledSections[secIdx];

                                // Inputs
                                const inputs = section.cols.map((colKey, colIdx) => {
                                    if (rowIndex < topIndex) return <td key={colIdx} style={disabledStyle}></td>;

                                    const isGoingUp = colIdx % 2 === 0;
                                    const isTopCellOfDownward = !isGoingUp && rowIndex === topIndex;
                                    if (isTopCellOfDownward) return <td key={colIdx} style={disabledStyle}></td>;

                                    const fieldName = section.key
                                        ? `${name}.${section.key}.${colKey}.${rowIndex}`
                                        : `${name}.${colKey}.${rowIndex}`;

                                    return (
                                        <td key={colIdx} style={{ ...tdStyle, padding: 0, ...grayBgStyle, ...(isSectionEnabled ? {} : { backgroundColor: '#e0e0e0' }) }}>
                                            <Controller
                                                name={fieldName}
                                                control={control}
                                                rules={{
                                                    required: isSectionEnabled
                                                }}
                                                render={({ field, fieldState: { error } }) => {
                                                    const val = field.value || '';
                                                    const invalid = isSectionEnabled && (isInputInvalid(val) && (isSubmitted || val));

                                                    // Store ref
                                                    if (!inputRefs.current[secIdx]) inputRefs.current[secIdx] = [];
                                                    if (!inputRefs.current[secIdx][colIdx]) inputRefs.current[secIdx][colIdx] = [];

                                                    return (
                                                        <input
                                                            ref={(e) => {
                                                                field.ref(e);
                                                                inputRefs.current[secIdx][colIdx][rowIndex] = e;
                                                            }}
                                                            type="text"
                                                            disabled={!isSectionEnabled}
                                                            style={{
                                                                ...inputStyle,
                                                                ...(error ? { border: '2px solid red', backgroundColor: '#fff0f0' } : {}),
                                                                ...(invalid ? { color: 'red' } : {}),
                                                                ...(!isSectionEnabled ? { cursor: 'not-allowed', backgroundColor: '#e0e0e0' } : {})
                                                            }}
                                                            value={val}
                                                            onChange={(e) => {
                                                                field.onChange(cleanNumericInput(e.target.value));
                                                            }}
                                                            onKeyDown={(e) => handleKeyDown(e, secIdx, colIdx, rowIndex)}
                                                            onBlur={field.onBlur}
                                                        />
                                                    );
                                                }}
                                            />
                                        </td>
                                    );
                                });

                                // Diff Column
                                const isOutOfScope = rowIndex < topIndex;
                                const isPeakRow = rowIndex === topIndex;
                                const diffVal = (isOutOfScope || isPeakRow) ? '' : getDiff(section.key, section.cols, rowIndex);
                                const diffInv = isSectionEnabled && (diffVal !== '' && isDiffInvalid(diffVal));

                                return (
                                    <React.Fragment key={secIdx}>
                                        {inputs}
                                        <td style={{ ...tdStyle, ...(diffInv ? invalidStyle : {}), ...(!isSectionEnabled ? { backgroundColor: '#e0e0e0' } : {}) }}>
                                            {isSectionEnabled ? diffVal : ''}
                                        </td>
                                    </React.Fragment>
                                );
                            })}

                            {/* Formula Column (Only if enabled?) 
                                Formula usually depends on both sections (Left+Right).
                                If one is disabled, should we calculate?
                                Assuming standard behavior: If disabled, treat as 0 or ignore?
                                Let's show formula but maybe not validate strictly if parts are disabled?
                                Or maybe clear formula if any part is disabled?
                                Let's assume if enabled, calculate.
                            */}
                            {formula && onCalculateFormula && (() => {
                                // If any section is disabled, what to do?
                                // Usually Ento requires both.
                                // If user disables one, he probably doesn't want formula?
                                const allEnabled = enabledSections.every(e => e);
                                if (!allEnabled) {
                                    return <td style={{ ...tdStyle, ...grayBgStyle, backgroundColor: '#e0e0e0' }}></td>;
                                }

                                const val = onCalculateFormula(rowIndex, watchedData);
                                const isInvalid = maxFormula !== null && validateValue(val, { maxValue: maxFormula, validateStd: true, useAbs: true }) === false;
                                return (
                                    <td style={{ ...tdStyle, ...grayBgStyle, ...(isInvalid ? invalidStyle : {}) }}>
                                        {val}
                                    </td>
                                );
                            })()}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntoTable;
