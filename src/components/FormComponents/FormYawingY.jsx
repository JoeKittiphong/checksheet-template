import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import YawingY from '@/components/PageComponent/YawingY';

const FormYawingY = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    // YawingY structure: points object etc.
                    // Basic check for now
                    return true;
                }
            }}
            render={({ field }) => (
                <YawingY
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormYawingY;
