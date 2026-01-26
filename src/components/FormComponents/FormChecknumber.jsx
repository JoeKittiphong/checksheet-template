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
            render={({ field }) => (
                <Checknumber
                    {...field}
                    label={label}
                    className={className}
                    {...props}
                />
            )}
        />
    );
};

export default FormChecknumber;
