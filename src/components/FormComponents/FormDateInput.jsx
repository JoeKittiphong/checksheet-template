import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DateInput from '@/components/UIcomponent/DateInput';

const FormDateInput = ({ name, label, defaultValue = "", ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <DateInput
                    {...field}
                    label={label}
                    {...props}
                />
            )}
        />
    );
};

export default FormDateInput;
