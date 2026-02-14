import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormLevelTableYAB (Refactored to use FormQuickTable)
 * 
 * Wrapper for level check table using FormQuickTable.
 * Manages array of objects {a: '', b: ''}.
 */
const FormLevelTableYAB = ({
    name,
    control,
    labelA = "A",
    labelB = "B",
    labelC = "C",
    rows = 16,
    standards = [],
    showStd = false,
    showC = false,
    axis = "y",
    showArrows = true,
    ...props
}) => {
    const { registerInput, handleKeyDown, focusCell } = useTableNavigation();
    const columnKeys = showC ? ['a', 'b', 'c'] : ['a', 'b'];

    // Custom KeyDown handler to replicate specific navigation logic
    // Col A: Enter moves Up (direction -1). At top, moves to Col B, Row 0.
    // Col B: Enter moves Down (direction 1). (If C exists, at bottom B -> Top C)
    // Col C: Enter moves Down (direction 1).
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
            } else if (colKey === 'b') {
                // Move Down
                const success = focusCell(rowIndex + 1, 'b');
                if (!success && showC) {
                    // If C exists and Bottom of B, move to Top of C
                    focusCell(0, 'c');
                }
            } else if (colKey === 'c') {
                // Move Down
                focusCell(rowIndex + 1, 'c');
            }
        } else {
            // Default behavior for other keys (Arrows)
            handleKeyDown(e, rowIndex, colKey, rows, columnKeys);
        }
    };

    // Generate data rows based on count
    const data = Array.from({ length: rows }, (_, i) => ({ id: i + 1, index: i }));

    const columns = [
        {
            key: 'id',
            header: 'No.',
            width: '48px',
            className: 'text-center'
        },
        // STD Column (Optional)
        ...(showStd ? [{
            key: 'std',
            header: 'STD',
            width: '64px',
            className: 'text-center bg-gray-100',
            render: (_, row) => {
                const std = standards[row.index];
                if (!std) return '';
                const { min, max, arrow } = std;
                const arrowSymbol = arrow === '-' ? '↓' : arrow === '+' ? '↑' : '';
                return min === max ? `${min}${arrowSymbol}` : `${min}~${max}${arrowSymbol}`;
            }
        }] : []),
        {
            key: 'a',
            header: labelA,
            width: '96px',
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
                                if (!std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    arrow: std.arrow,
                                    validateStd: true,
                                    useAbs: true
                                }) || "Out of Spec";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    inputRef={registerInput(row.index, 'a')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'a')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                    required // Triggers browser visual validation styles if supported, but relying on bg-red-200 mainly
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
            width: '96px',
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
                                if (!std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    arrow: std.arrow,
                                    validateStd: true,
                                    useAbs: true
                                }) || "Out of Spec";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    inputRef={registerInput(row.index, 'b')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'b')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
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
        // Column C (Optional)
        ...(showC ? [{
            key: 'c',
            header: labelC,
            width: '96px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}.c`;
                const std = standards[row.index];
                return (
                    <Controller
                        name={fieldName}
                        control={control}
                        rules={{
                            required: true,
                            validate: (val) => {
                                if (!std) return true;
                                return validateValue(val, {
                                    min: std.min,
                                    max: std.max,
                                    arrow: std.arrow,
                                    validateStd: true,
                                    useAbs: true
                                }) || "Out of Spec";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    inputRef={registerInput(row.index, 'c')}
                                    onKeyDown={(e) => onKeyDown(e, row.index, 'c')}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                    required
                                    axis={axis}
                                    showArrows={showArrows}
                                />
                            </div>
                        )}
                    />
                );
            }
        }] : [])
    ];

    return (
        <FormQuickTable
            columns={columns}
            data={data}
            className="w-auto"
        />
    );
};

export default FormLevelTableYAB;
