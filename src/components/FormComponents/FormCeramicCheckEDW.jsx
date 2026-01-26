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
