import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormEDMparallelY (Refactored to use FormQuickTable)
 * 
 * Columns: A=KB, B, A+B (Calculated)
 * Navigation: Enter moves UP
 * Formatting: No arrows (Numeric only)
 */
const FormEDMparallelY = ({
    name,
    rows = 9,
    standards = [],
    showStd = false,
    validateStd = true,
    defaultValue,
    ...props
}) => {
    const { registerInput, handleKeyDown, focusCell } = useTableNavigation();
    const columnKeys = ['a', 'b'];

    // Data generation
    const data = Array.from({ length: rows }, (_, i) => ({ id: i + 1, index: i }));

    // Custom Navigation: Enter moves UP
    const onKeyDown = (e, rowIndex, colKey) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move Up
            const success = focusCell(rowIndex - 1, colKey);
            if (!success && colKey === 'a') {
                // If top of A, maybe move to top of B or bottom of B?
                // Original logic: "reached top of A -> firstB.focus()"
                focusCell(0, 'b');
            }
        } else {
            handleKeyDown(e, rowIndex, colKey, rows, columnKeys);
        }
    };

    const columns = [
        {
            key: 'id',
            header: 'No.',
            width: '32px',
            className: 'text-center'
        },
        ...(showStd ? [{
            key: 'std',
            header: 'STD',
            width: '48px',
            className: 'text-center text-[10px]',
            render: (_, row) => {
                const std = standards[row.index];
                if (!std) return '';
                const { min, max } = std;
                return min === max ? `${min}` : `${min}~${max}`;
            }
        }] : []),
        {
            key: 'a',
            header: 'A=KB',
            width: '64px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}.a`;
                const std = standards[row.index];
                return (
                    <Controller
                        name={fieldName}
                        control={props.control} // Use props.control if passed, or from context inside if needed (FormQuickTable has useFormContext)
                        rules={{
                            required: true,
                            validate: (val) => {
                                if (!validateStd || !std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    validateStd: true,
                                    useAbs: true
                                }) || "NG";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    showArrows={false} // No arrows for Parallel Y
                                    inputRef={registerInput(row.index, 'a')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'a')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                    required
                                />
                            </div>
                        )}
                    />
                );
            }
        },
        {
            key: 'b',
            header: 'B',
            width: '64px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}.b`;
                const std = standards[row.index];
                return (
                    <Controller
                        name={fieldName}
                        control={props.control}
                        rules={{
                            required: true,
                            validate: (val) => {
                                if (!validateStd || !std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    validateStd: true,
                                    useAbs: true
                                }) || "NG";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    showArrows={false} // No arrows
                                    inputRef={registerInput(row.index, 'b')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'b')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                    required
                                />
                            </div>
                        )}
                    />
                );
            }
        },
        {
            key: 'sum',
            header: 'A+B',
            width: '48px',
            className: 'text-center bg-gray-50',
            render: (_, row) => <SumCell name={name} index={row.index} standards={standards} validateStd={validateStd} />
        }
    ];

    const complexHeaderRows = [
        [
            { header: 'No.', rowSpan: 2, width: '32px' },
            ...(showStd ? [{ header: 'STD.', rowSpan: 2, width: '48px' }] : []),
            { header: 'A=KB', width: '64px' },
            { header: 'B', width: '64px' },
            { header: 'A+B', rowSpan: 2, width: '48px' }
        ],
        [
            { header: 'DATA' },
            { header: 'DATA' }
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

// Extracted Component for Sum Calculation
const SumCell = ({ name, index, standards, validateStd }) => {
    const aVal = useWatch({ name: `${name}.${index}.a` });
    const bVal = useWatch({ name: `${name}.${index}.b` });
    const std = standards[index] || { min: 0, max: 0 };

    let sumDisplay = '';
    let isSumError = false;

    if (aVal !== undefined && aVal !== '' && bVal !== undefined && bVal !== '') {
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            const sum = aNum + bNum; // Sum A + B
            sumDisplay = sum.toFixed(2).replace(/\.?0+$/, '');

            // Validate Sum (Max Check)
            // Assuming standards.max is the limit for A+B as well, per usual checksheet logic
            if (validateStd && Math.abs(sum) > Math.abs(std.max)) {
                isSumError = true;
            }
        }
    }

    return (
        <div className={`w-full h-full flex items-center justify-center ${isSumError ? 'bg-red-200 text-red-600 font-bold' : ''}`}>
            {sumDisplay}
        </div>
    );
};

export default FormEDMparallelY;
