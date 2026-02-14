import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormTableXABDIFF (Refactored to use FormQuickTable)
 * 
 * Layout: Horizontal (Axis X)
 * Rows: 
 *  1. STD (Optional)
 *  2. B (Input)
 *  3. A=Kb (Input)
 *  4. DIFF (Calculated |A - B|)
 * 
 * Columns: 1 to cols
 * Navigation: Enter moves RIGHT
 */
const FormTableXABDIFF = ({
    name,
    cols = 9,
    rows, // legacy prop
    standards = [],
    showStd = false,
    validateStd = false, // Validate Diff against STD? Or A/B against STD?
    useArrow = true,
    labelA = "A=Kb",
    labelB = "B",
    labelDiff = "A+B", // Default to A+B per user image request
    calcType = "sum", // 'diff' (|A-B|) or 'sum' (A+B) - default sum per image showing A+B
    defaultValue,
    ...props
}) => {
    const { control } = useFormContext();
    const { registerInput, focusCell } = useTableNavigation();

    const colCount = cols || rows || 9;

    // Watch values for Diff calculation
    // We assume data structure is { a: [..], b: [..] }
    // However, FormQuickTable usually works with array of row objects if using data binding?
    // But here we are using manual Controller rendering, so we can bind to whatever we want.
    // The previous implementation used name="page6.straightnessMAData" which implies the value is { a: [], b: [] }
    const formValue = useWatch({
        name: name,
        control,
        defaultValue: { a: [], b: [] }
    });

    const valA = formValue?.a || [];
    const valB = formValue?.b || [];

    const calculateDiff = (index) => {
        const a = parseFloat(valA[index]);
        const b = parseFloat(valB[index]);
        if (isNaN(a) || isNaN(b)) return "";

        if (calcType === 'sum') {
            // A+B logic
            return (a + b).toFixed(3).replace(/\.?0+$/, ""); // Using 3 decimals generally for um? Or integer? Usually um is integer or 1 decimal. Let's stick to simple formatting.
        }
        return Math.abs(a - b).toFixed(3).replace(/\.?0+$/, "");
    };

    // Helper to render standard
    const renderStd = (colIndex) => {
        const std = standards[colIndex];
        if (!std) return <span>-</span>;

        const { min, max, arrow } = std;
        let arrowSymbol = '';
        // If useArrow is false, maybe we don't show arrows in STD either?
        // But Page6 std has arrows '' (empty strings), so it won't show anyway.
        if (useArrow) {
            if (arrow === '+') arrowSymbol = '→';
            if (arrow === '-') arrowSymbol = '←';
        }

        let content = '';
        if (min === max && min !== undefined) {
            content = `${min} ${arrowSymbol}`;
        } else if (min !== undefined && max !== undefined) {
            content = `${min}~${max} ${arrowSymbol}`;
        }
        return <span>{content || "-"}</span>;
    };


    // Define Rows
    const tableRows = [];
    if (showStd) {
        tableRows.push({ id: 'std', label: 'STD', isHeader: true, className: "bg-yellow-50 font-medium" });
    }
    tableRows.push(
        { id: 'a', label: labelA, index: 1 }, // Row A  (Wait, image shows A=Kb on Top, B on Middle, A+B on Bottom)
        // Previous code had B then A. Step 468 image shows:
        // A=Kb
        // B
        // A+B
        // So I should swap order of rows if needed.
        // Actually earlier code FormLevelTableXAB has B then A.
        // Let's invoke rows based on `rows` prop order? Or just hardcode based on image.
        // Image: A=Kb (top), B (middle), A+B (bottom).
        // My previous code: B (top), A (bottom).
        // I should SWAP them to match image.
        { id: 'b', label: labelB, index: 0 },
        { id: 'diff', label: labelDiff, isReadOnly: true } // Row DIFF/SUM
    );
    // Wait, I put A then B in push above? No, objects inside push are:
    // { id: 'a' ... }, { id: 'b' ... }
    // So Table will render A then B.
    // Previous code had B then A.
    // I am changing it to A then B to match image.

    // Navigation
    const onKeyDown = (e, rowId, colIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move Right
            const nextCol = colIndex + 1;
            if (nextCol < colCount) {
                focusCell(rowId, nextCol);
            } else {
                // End of row logic
                // If A -> B (since A is now top)
                if (rowId === 'a') {
                    focusCell('b', 0); // Move to B
                }
                // If B -> Stop (Diff is readonly)
            }
        }
    };

    const columns = [
        {
            key: 'label',
            header: '',
            width: '80px',
            className: 'text-center font-bold bg-gray-100',
            render: (_, row) => row.label
        }
    ];

    for (let i = 0; i < colCount; i++) {
        columns.push({
            key: i.toString(),
            header: (i + 1).toString(),
            width: '48px',
            render: (_, row) => {
                // STD Row
                if (row.id === 'std') {
                    return <div className="text-xs text-center">{renderStd(i)}</div>;
                }

                // Diff Row
                if (row.id === 'diff') {
                    const diffVal = calculateDiff(i);
                    // Validate Diff
                    let diffError = false;
                    if (validateStd) {
                        const std = standards[i];
                        if (std) {
                            // Max Diff validation (usually max magnitude of range)
                            // or explicit diff check?
                            // Page 6 says "not exceed 3µm".
                            // If STD is { min:0, max:3 }, then val should be <= 3.
                            const maxDiff = Math.max(Math.abs(std.min || 0), Math.abs(std.max || 0));
                            if (diffVal !== "" && parseFloat(diffVal) > maxDiff) {
                                diffError = true; // For A+B check if > maxDiff
                            }
                        }
                    }
                    return (
                        <div className={`text-center w-full h-full p-1 ${diffError ? 'bg-red-200 text-red-600 font-bold' : ''}`}>
                            {diffVal}
                        </div>
                    );
                }

                // Input Rows (A or B)
                // path: name.a[i] or name.b[i]
                const fieldName = `${name}.${row.id}.${i}`;

                // Get default value for this specific cell
                const cellDefault = defaultValue?.[row.id]?.[i] || "";

                return (
                    <Controller
                        name={fieldName}
                        control={control}
                        defaultValue={cellDefault}
                        rules={{
                            required: true,
                            validate: (value) => {
                                if (!validateStd) return true;
                                const std = standards[i];
                                if (!std) return true;
                                // validateValue helper checks min/max
                                return validateValue(value, { ...std, useAbs: true }) || "Out of range";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    showArrows={useArrow} // Enable/Disable arrows
                                    axis="x"
                                    inputRef={registerInput(row.id, i)}
                                    onKeyDown={(e) => onKeyDown(e, row.id, i)}
                                    className={`${error ? 'text-red-600 font-medium' : ''} w-full text-center`}
                                    placeholder=""
                                />
                            </div>
                        )}
                    />
                );
            }
        });
    }

    return (
        <FormQuickTable
            columns={columns}
            data={tableRows}
            className="w-auto"
        />
    );
};

export default FormTableXABDIFF;
