import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMTablePitchingX from '@/components/PageComponent/EDMTablePitchingX';

const FormEDMTablePitchingX = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
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
                    // Check if all items are filled? Or at least match 'rows' length?
                    // Usually for pitching/rolling tables, all cells should be filled.
                    // Filter empty strings.
                    const filled = value.filter(item => item !== undefined && item !== null && item !== '');
                    // Assuming row count matches expected rows.
                    if (filled.length < rows) return false;
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMTablePitchingX
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

export default FormEDMTablePitchingX;
