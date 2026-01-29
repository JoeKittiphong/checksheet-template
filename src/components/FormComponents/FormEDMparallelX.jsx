import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMparallelX from '@/components/PageComponent/EDMparallelX';

const FormEDMparallelX = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
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
                    const rowCount = rows || 5;
                    // Verify all rows are filled
                    const filled = value.filter(item => item && (item.a !== '' && item.a !== null) && (item.b !== '' && item.b !== null));
                    if (filled.length < rowCount) return "Required";
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMparallelX
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

export default FormEDMparallelX;
