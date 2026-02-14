import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import InputWithArrow from './InputWithArrow';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormLevelTableXStdAct
 * 
 * A specialized table for X-axis leveling checks with grouped "SD" and "ACT" rows.
 * Designed to match the visual style of checksheet Page 3 Item 6.
 * 
 * Layout per group:
 * [ Label ]  [ SD Row  (ReadOnly) ]
 *            [ ACT Row (Input)    ]
 * 
 * Features:
 * - Flexible column count
 * - Per-cell validation (ACT vs SD +/- tolerance)
 * - Keyboard navigation (Enter moves Right, Arrows move normally but skip SD rows)
 * - Support for Arrow symbols in SD values (e.g., "←20" = -20)
 * 
 * @param {string} name - Base RHF name (data will be stored as {name}.{groupIndex}.{colIndex})
 * @param {Array} groups - Config for each group: [{ label: "A", sd: ["0", "←20", ...], tolerance: 4 }]
 * @param {number} cols - Number of columns (default 13)
 */
const FormLevelTableXStdAct = ({
    name,
    groups = [],
    cols = 13,
    control,
    showArrows = true,
    ...props
}) => {
    const { registerInput, focusCell } = useTableNavigation();

    // Helper to parse SD string to number
    const parseSdValue = (sdStr) => {
        if (!sdStr) return null;
        if (sdStr === 'Ø') return 0;

        let multiplier = 1;
        let cleanStr = sdStr;

        if (sdStr.includes('←') || sdStr.includes('<')) {
            multiplier = -1; // Left/Negative
            cleanStr = sdStr.replace(/[←<]/g, '');
        } else if (sdStr.includes('→') || sdStr.includes('>')) {
            multiplier = 1; // Right/Positive
            cleanStr = sdStr.replace(/[→>]/g, '');
        }

        const val = parseFloat(cleanStr);
        return isNaN(val) ? null : val * multiplier;
    };

    // Helper to validate value
    const validateCell = (value, sdStr, tolerance) => {
        if (value === '' || value === null || value === undefined) return true;
        const sdVal = parseSdValue(sdStr);
        if (sdVal === null) return true; // No SD, skip validation

        const numVal = parseFloat(value);
        if (isNaN(numVal)) return true; // Not a number

        const min = sdVal - tolerance;
        const max = sdVal + tolerance;

        return numVal >= min && numVal <= max;
    };

    // Navigation Logic
    const handleKeyDown = (e, groupIndex, colIndex) => {
        const totalGroups = groups.length;

        if (e.key === 'Enter' || e.key === 'ArrowRight') {
            e.preventDefault();
            // Move Right
            if (colIndex < cols - 1) {
                focusCell(`${name}.${groupIndex}`, colIndex + 1);
            } else {
                // Formatting: Wrap to next group's first column? 
                // Or just stay at end? Let's stay at end to prevent jumps.
                // Or wrap to next group:
                if (groupIndex < totalGroups - 1) {
                    focusCell(`${name}.${groupIndex + 1}`, 0);
                }
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (colIndex > 0) {
                focusCell(`${name}.${groupIndex}`, colIndex - 1);
            } else {
                // Wrap to prev group end?
                if (groupIndex > 0) {
                    focusCell(`${name}.${groupIndex - 1}`, cols - 1);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (groupIndex < totalGroups - 1) {
                focusCell(`${name}.${groupIndex + 1}`, colIndex);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (groupIndex > 0) {
                focusCell(`${name}.${groupIndex - 1}`, colIndex);
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-0 border-collapse">
            {/* Header Row (Numbers 1..13) */}
            <div className="flex w-full">
                <div className="w-8 mr-1"></div> {/* Spacer for Label */}
                <div className="flex-1 flex border border-black bg-gray-200">
                    <div className="w-[60px] border-r border-black shrink-0"></div> {/* Spacer for SD/ACT label */}
                    {Array.from({ length: cols }).map((_, i) => (
                        <div key={i} className="flex-1 text-center text-xs font-bold border-r border-black last:border-r-0 py-1">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {groups.map((group, gIdx) => (
                <div key={gIdx} className="flex w-full mt-[-1px]"> {/* Neg margin to collapse borders */}
                    {/* Group Label (A, B) */}
                    <div className="w-8 border border-black bg-gray-50 flex items-center justify-center font-bold mr-1 text-sm">
                        {group.label}
                    </div>

                    {/* Data Area */}
                    <div className="flex-1 flex flex-col border border-black">
                        {/* SD Row */}
                        <div className="flex h-8 border-b border-black">
                            {/* SD Label */}
                            <div className="w-[60px] border-r border-black bg-gray-50 flex items-center justify-center text-xs font-bold shrink-0">
                                SD
                            </div>
                            {/* SD Cells */}
                            {Array.from({ length: cols }).map((_, cIdx) => (
                                <div key={cIdx} className="flex-1 border-r border-black last:border-r-0 flex items-center justify-center text-xs bg-white">
                                    {group.sd[cIdx] || ""}
                                </div>
                            ))}
                        </div>

                        {/* ACT Row */}
                        <div className="flex h-8">
                            {/* ACT Label */}
                            <div className="w-[60px] border-r border-black bg-white flex items-center justify-center text-xs font-bold shrink-0">
                                ACT
                            </div>
                            {/* ACT Inputs */}
                            {Array.from({ length: cols }).map((_, cIdx) => {
                                const fieldName = `${name}.${gIdx}.${cIdx}`;
                                const sdVal = group.sd ? group.sd[cIdx] : null;

                                return (
                                    <div key={cIdx} className="flex-1 border-r border-black last:border-r-0 relative">
                                        <Controller
                                            name={fieldName}
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field, fieldState: { error } }) => {
                                                // Identify validity
                                                const isValid = validateCell(field.value, sdVal, group.tolerance || 0);
                                                const hasError = error || !isValid;

                                                return (
                                                    <div className={`w-full h-full p-0.5 ${hasError ? 'bg-red-200' : ''}`}>
                                                        <InputWithArrow
                                                            {...field}
                                                            axis="x"
                                                            showArrows={showArrows}
                                                            inputRef={registerInput(`${name}.${gIdx}`, cIdx)}
                                                            onKeyDown={(e) => handleKeyDown(e, gIdx, cIdx)}
                                                            className={`w-full text-center text-xs ${hasError ? 'text-red-600 font-bold' : ''}`}
                                                            placeholder=""
                                                        />
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FormLevelTableXStdAct;
