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
                    onChange={(key, val) => {
                        field.onChange({
                            ...(field.value || {}),
                            [key]: val
                        });
                    }}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMYawingY;
