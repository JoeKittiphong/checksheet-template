import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Checknumber from '@/components/UIcomponent/Checknumber';

const FormChecknumber = ({ name, label, defaultValue = "", className, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ required: props.required ?? true }} // Default required unless props.required is false
            render={({ field, fieldState: { error } }) => (
                <Checknumber
                    {...field}
                    label={label}
                    className={className}
                    error={!!error} // Pass error state to child
                    {...props}
                />
            )}
        />
    );
};

export default FormChecknumber;
