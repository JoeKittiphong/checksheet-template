import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CeramicCheckEDM from '@/components/PageComponent/CeramicCheckEDM';

const FormCeramicCheckEDM = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            render={({ field }) => (
                <CeramicCheckEDM
                    data={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormCeramicCheckEDM;
