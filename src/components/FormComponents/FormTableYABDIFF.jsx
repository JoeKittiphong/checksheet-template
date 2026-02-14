import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormTableYABDIFF (Refactored to use FormQuickTable)
 * 
 * Columns: A, B, DIFF
 * DIFF is auto-calculated: |A - B|
 */
const FormTableYABDIFF = ({
    name,
    control,
    rows = 7,
    standards = [],
    showStd = true,
    validateStd = true,
    labelA = "A=KB",
    labelB = "B",
    labelDiff = "DIFF",
    diffMode = "diff", // 'diff' | 'sum'
    axis = "y",
    showArrows = true,
    ...props
}) => {
    const { registerInput, handleKeyDown, focusCell } = useTableNavigation();
    const columnKeys = ['a', 'b'];

    // Custom KeyDown handler to replicate same navigation logic (A: Up, B: Down)
    // Assuming TableYABDIFF shares this behavior based on previous analysis
    const onKeyDown = (e, rowIndex, colKey) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (colKey === 'a') {
                // Move Up
                const success = focusCell(rowIndex - 1, 'a');
                if (!success) {
                    // Boundary reached (Top of A), move to Top of B
                    focusCell(0, 'b');
                }
            } else {
                // Move Down
                focusCell(rowIndex + 1, 'b');
            }
        } else {
            // Default behavior for other keys (Arrows)
            handleKeyDown(e, rowIndex, colKey, rows, columnKeys);
        }
    };

    // Generate data rows
    const data = Array.from({ length: rows }, (_, i) => ({ id: i + 1, index: i }));

    const columns = [
        {
            key: 'id',
            header: 'No.',
            width: '32px', // Approx 8 chars
            className: 'text-center'
        },
        ...(showStd ? [{
            key: 'std',
            header: 'STD.',
            width: '56px', // Approx 14 chars
            className: 'text-center text-[10px]',
            render: (_, row) => {
                const std = standards[row.index];
                if (!std) return '';
                const { min, max, arrow } = std;
                // Format for display: e.g. 5↑ - 0
                const minAbs = Math.abs(min);
                const maxAbs = Math.abs(max);
                if (arrow === '+' || arrow === 'up') return `${maxAbs}↑ - ${minAbs}`;
                if (arrow === '-' || arrow === 'down') return `${minAbs}↓ - ${maxAbs}`;
                return `${min} - ${max}`;
            }
        }] : []),
        {
            key: 'a',
            header: labelA,
            width: '56px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}.a`;
                const std = standards[row.index];
                return (
                    <Controller
                        name={fieldName}
                        control={control}
                        rules={{
                            required: true,
                            validate: (val) => {
                                if (!validateStd || !std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    arrow: std.arrow,
                                    validateStd: true,
                                    useAbs: true
                                }) || "NG";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    inputRef={registerInput(row.index, 'a')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'a')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    required
                                    axis={axis}
                                    showArrows={showArrows}
                                />
                            </div>
                        )}
                    />
                );
            }
        },
        {
            key: 'b',
            header: labelB,
            width: '56px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}.b`;
                const std = standards[row.index];
                return (
                    <Controller
                        name={fieldName}
                        control={control}
                        rules={{
                            required: true,
                            validate: (val) => {
                                if (!validateStd || !std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    arrow: std.arrow,
                                    validateStd: true,
                                    useAbs: true
                                }) || "NG";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    inputRef={registerInput(row.index, 'b')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'b')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    required
                                    axis={axis}
                                    showArrows={showArrows}
                                />
                            </div>
                        )}
                    />
                );
            }
        },
        {
            key: 'diff',
            header: labelDiff,
            width: '48px',
            className: 'text-center bg-gray-50',
            render: (_, row) => <DiffCell name={name} index={row.index} standards={standards} validateStd={validateStd} diffMode={diffMode} />
        }
    ];

    const complexHeaderRows = [
        [
            { header: 'No.', width: '32px' },
            ...(showStd ? [{ header: 'STD.', width: '56px' }] : []),
            { header: labelA, width: '56px' },
            { header: labelB, width: '56px' },
            { header: labelDiff, width: '48px' }
        ]
    ];

    return (
        <FormQuickTable
            columns={columns}
            data={data}
            headerRows={complexHeaderRows}
            className="w-auto"
        />
    );
};

// Extracted Component to use useWatch inside render prop context
const DiffCell = ({ name, index, standards, validateStd, diffMode }) => {
    const aVal = useWatch({ name: `${name}.${index}.a` });
    const bVal = useWatch({ name: `${name}.${index}.b` });
    const std = standards[index] || { min: 0, max: 0 };

    let diffDisplay = '';
    let isDiffError = false;

    if (aVal !== undefined && aVal !== '' && bVal !== undefined && bVal !== '') {
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            let result;
            if (diffMode === 'sum') {
                result = aNum + bNum; // Sum mode
            } else {
                result = Math.abs(aNum - bNum); // Diff mode (default)
            }

            diffDisplay = result.toFixed(2).replace(/\.?0+$/, '');

            // Validate Result
            // Logic for validating Sum vs Diff might differ, but assuming standard min/max check logic applies to the result
            const maxMag = Math.max(Math.abs(std.min), Math.abs(std.max));
            if (validateStd && Math.abs(result) > maxMag) {
                isDiffError = true;
            }
        }
    }

    return (
        <div className={`w-full h-full flex items-center justify-center ${isDiffError ? 'bg-red-200 text-red-600 font-bold' : ''}`}>
            {diffDisplay}
        </div>
    );
};

export default FormTableYABDIFF;
