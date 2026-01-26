import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchingY from '@/components/PageComponent/TablePitchingY';

const FormTablePitchingY = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
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
            render={({ field }) => (
                <TablePitchingY
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

export default FormTablePitchingY;
