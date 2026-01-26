import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDWYawingX from '@/components/PageComponent/EDWYawingX';

const FormEDWYawingX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <EDWYawingX
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDWYawingX;
