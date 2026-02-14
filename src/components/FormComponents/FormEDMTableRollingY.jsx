import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormEDMTableRollingY (Refactored to use FormQuickTable)
 * 
 * Layout: Vertical (Axis Y) - but checks Rolling
 * Arrows: Left/Right (Axis X) - specific requirement
 * Navigation: Enter moves Up
 */
const FormEDMTableRollingY = ({
    name,
    rows = 5,
    standards = [],
    showStd = true,
    validateStd = true,
    defaultValue,
    ...props
}) => {
    const { control } = useFormContext();
    const { registerInput, focusCell } = useTableNavigation();

    // Data generation
    const data = Array.from({ length: rows }, (_, i) => ({ id: i + 1, index: i }));

    // Custom Navigation: Enter moves UP
    const onKeyDown = (e, rowIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move Up
            focusCell(rowIndex - 1, 'val');
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
                const { min, max, arrow } = std;
                // Rolling usually doesn't have direction in STD text, but check logic
                return min === max ? `${min}` : `${min}~${max}`;
            }
        }] : []),
        {
            key: 'val',
            header: 'Rolling', // Matches original Label
            width: '64px',
            render: (_, row) => {
                const fieldName = `${name}.${row.index}`;
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
                                    axis="x" // Left/Right arrows for Rolling
                                    inputRef={registerInput(row.index, 'val')}
                                    onKeyDown={(e) => onKeyDown(e, row.index)}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                    required
                                />
                            </div>
                        )}
                    />
                );
            }
        }
    ];

    return (
        <FormQuickTable
            columns={columns}
            data={data}
            className="w-auto"
        />
    );
};

export default FormEDMTableRollingY;
