import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMCoilMagnetCheck from '@/components/PageComponent/EDMCoilMagnetCheck';

const FormEDMCoilMagnetCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            render={({ field }) => (
                <EDMCoilMagnetCheck
                    data={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMCoilMagnetCheck;
