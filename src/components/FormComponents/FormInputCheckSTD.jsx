import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputCheckSTD from '@/components/UIcomponent/InputCheckSTD';

const FormInputCheckSTD = ({
    name,
    label,
    unit,
    minStd,
    maxStd,
    validateStd,
    inputWidth,
    defaultValue = "",
    showCheckbox = false,
    checkboxName,
    ...props
}) => {
    const { control, register } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <InputCheckSTD
                    {...field}
                    label={label}
                    unit={unit}
                    minStd={minStd}
                    maxStd={maxStd}
                    validateStd={validateStd}
                    inputWidth={inputWidth}
                    showCheckbox={showCheckbox}
                    checkboxName={checkboxName || `${name}_check`} // Pass name instead of register props
                    {...props}
                />
            )}
        />
    );
};

export default FormInputCheckSTD;
