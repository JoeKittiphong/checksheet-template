import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchingX from '@/components/PageComponent/TablePitchingX';

const FormTablePitchingX = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
    const { control } = useFormContext();

    // Generate default value if not provided
    const getDefaultValue = () => {
        if (defaultValue) return defaultValue;
        return { b: [], t: [] };
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getDefaultValue()}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    const { b = [], t = [] } = value;
                    const isFilled = (arr) => (arr?.[0] !== '' && arr?.[0] != null && arr?.[0] !== undefined) &&
                        (arr?.[2] !== '' && arr?.[2] != null && arr?.[2] !== undefined);
                    // Pitching always has B and T rows
                    return (isFilled(b) && isFilled(t)) || "Required";
                }
            }}
            render={({ field }) => (
                <TablePitchingX
                    rows={rows} // Note: TablePitchingX ignores rows prop, uses fixed cols=3
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

export default FormTablePitchingX;
