import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMTablePitchingY from '@/components/PageComponent/EDMTablePitchingY';

const FormEDMTablePitchingY = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
    const { control } = useFormContext();

    // Generate default value if not provided
    const getDefaultValue = () => {
        if (defaultValue) return defaultValue;
        return Array(rows).fill('');
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getDefaultValue()}
            rules={{
                validate: (value) => {
                    if (!Array.isArray(value)) return "Required";
                    const filled = value.filter(item => item !== undefined && item !== null && item !== '');
                    if (filled.length < rows) return false;
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMTablePitchingY
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

export default FormEDMTablePitchingY;
