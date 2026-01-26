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
