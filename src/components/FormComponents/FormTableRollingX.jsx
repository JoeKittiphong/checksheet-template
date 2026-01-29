import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableRollingX from '@/components/PageComponent/TableRollingX';

const FormTableRollingX = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
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

                    const tRequired = props.showRowT !== false;

                    return (isFilled(b) && (!tRequired || isFilled(t))) || "Required";
                }
            }}
            render={({ field }) => (
                <TableRollingX
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

export default FormTableRollingX;
