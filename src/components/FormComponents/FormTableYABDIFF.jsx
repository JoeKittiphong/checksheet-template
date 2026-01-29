import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableYABDIFF from '@/components/PageComponent/TableYABDIFF';

const FormTableYABDIFF = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
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
                    const rowCount = rows || 1;
                    const filled = value.filter(item => item && (item.a !== '' && item.a !== null) && (item.b !== '' && item.b !== null));
                    if (filled.length < rowCount) return "Required";
                    return true;
                }
            }}
            render={({ field }) => (
                <TableYABDIFF
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

export default FormTableYABDIFF;
