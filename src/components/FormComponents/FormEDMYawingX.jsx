import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMYawingX from '@/components/PageComponent/EDMYawingX';

const FormEDMYawingX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <EDMYawingX
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMYawingX;
