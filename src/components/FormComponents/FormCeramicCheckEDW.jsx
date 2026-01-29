import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CeramicCheckEDW from '@/components/PageComponent/CeramicCheckEDW';

const FormCeramicCheckEDW = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            rules={{
                validate: (value) => {
                    const keys = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'br'];
                    const filled = keys.filter(k => value && value[k] !== undefined && value[k] !== null && value[k] !== '');
                    return filled.length === keys.length || "Required";
                }
            }}
            render={({ field }) => (
                <CeramicCheckEDW
                    data={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormCeramicCheckEDW;
