import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormLevelTableXAB (Refactored to use FormQuickTable)
 * 
 * Layout: Horizontal (Axis X)
 * Rows: Defined by labelA and labelB (usually B and A=Kb)
 * Columns: 1 to cols
 * Navigation: Enter moves RIGHT
 * Formatting: Arrows Left/Right (Axis X)
 */
const FormLevelTableXAB = ({
    name,
    cols = 9,
    labelA = "B",
    labelB = "A=Kb",
    defaultValue,
    rows, // "rows" prop in old component meant number of columns? standardizing to "cols"
    standards = [],
    showStd = false,
    validateStd = false,
    showArrows = true,
    ...props
}) => {
    const { registerInput, focusCell } = useTableNavigation();

    // Normalize column count
    const colCount = cols || rows || 16;

    // Prepare helper to render standard
    const renderStd = (colIndex) => {
        const std = standards[colIndex];
        // Ensure std is valid object
        if (!std) return <span>-</span>;

        const { min, max, arrow } = std;
        let arrowSymbol = '';
        if (arrow === '+') arrowSymbol = '→';
        if (arrow === '-') arrowSymbol = '←';

        let content = '';
        if (min === max && min !== undefined) { // Check undefined
            content = `${min} ${arrowSymbol}`;
        } else if (min !== undefined && max !== undefined) {
            content = `${min}~${max} ${arrowSymbol}`;
        }

        return <span>{content || "-"}</span>;
    };

    // Defines the ROWS of the table
    const tableRows = [];

    // 1. STD Row (Optional)
    if (showStd) {
        tableRows.push({ id: 'std', label: 'STD', isHeader: true });
    }

    // 2. Data Rows
    tableRows.push(
        { id: 'b', label: labelA, index: 0 },
        { id: 'a', label: labelB, index: 1 }
    );

    // Navigation: Enter moves RIGHT
    const onKeyDown = (e, rowId, colIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move Right
            const nextCol = colIndex + 1;
            if (nextCol < colCount) {
                focusCell(rowId, nextCol);
            } else {
                // End of row
                if (rowId === 'b') {
                    // Move to start of 'a'
                    focusCell('a', 0);
                }
            }
        }
    };

    // Build Columns for FormQuickTable
    const columns = [
        {
            key: 'label',
            header: '', // Empty corner
            width: '80px',
            className: 'text-center font-bold bg-gray-100',
            render: (_, row) => row.label
        }
    ];

    // Add numeric columns (1 to colCount)
    for (let i = 0; i < colCount; i++) {
        columns.push({
            key: i.toString(),
            header: (i + 1).toString(),
            width: '48px',
            render: (_, row) => {
                // Return STD content if this is STD row
                if (row.id === 'std') {
                    return <div className="text-xs text-center">{renderStd(i)}</div>;
                }

                // Normal Input
                const fieldName = `${name}.${row.id}.${i}`;

                return (
                    <Controller
                        name={fieldName}
                        control={props.control}
                        rules={{
                            required: true,
                            validate: (value) => {
                                if (!validateStd) return true;
                                const std = standards[i];
                                if (!std) return true;
                                return validateValue(value, { ...std, useAbs: true }) || "Out of range";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    axis="x"
                                    showArrows={showArrows}
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

    // Force STD row styling
    // Ensure tableRows[0] exists and is std
    if (showStd && tableRows.length > 0 && tableRows[0].id === 'std') {
        tableRows[0].className = "bg-yellow-50 font-medium";
    }

    return (
        <FormQuickTable
            columns={columns}
            data={tableRows}
            className="w-auto"
        />
    );
};

export default FormLevelTableXAB;
