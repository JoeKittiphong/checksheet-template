import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableStraightness from '@/components/PageComponent/TableStraightness';

const FormTableStraightness = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
    const { control } = useFormContext();

    // Generate default value if not provided
    const getDefaultValue = () => {
        if (defaultValue) return defaultValue;
        return Array(rows).fill({ a: '', b: '' });
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getDefaultValue()}
            rules={{
                validate: (value) => {
                    if (!Array.isArray(value)) return "Required";
                    // Same check as EDMTableStraightness
                    const filled = value.filter(item =>
                        item &&
                        item.a !== undefined && item.a !== '' &&
                        item.b !== undefined && item.b !== ''
                    );
                    if (filled.length < rows) return false;
                    return true;
                }
            }}
            render={({ field }) => (
                <TableStraightness
                    rows={rows}
                    data={field.value}
                    onChange={field.onChange}
                    standards={standards}
                    showStd={showStd}
                    validateStd={validateStd}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableStraightness;
