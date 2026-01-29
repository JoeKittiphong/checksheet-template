import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import YawingUV from '@/components/PageComponent/YawingUV';

const FormYawingUV = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    return true;
                }
            }}
            render={({ field }) => (
                <YawingUV
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormYawingUV;
