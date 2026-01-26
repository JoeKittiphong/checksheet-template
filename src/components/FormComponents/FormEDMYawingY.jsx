import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMYawingY from '@/components/PageComponent/EDMYawingY';

const FormEDMYawingY = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <EDMYawingY
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMYawingY;
