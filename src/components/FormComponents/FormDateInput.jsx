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
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
                <DateInput
                    {...field}
                    label={label}
                    error={!!error}
                    {...props}
                />
            )}
        />
    );
};

export default FormDateInput;
