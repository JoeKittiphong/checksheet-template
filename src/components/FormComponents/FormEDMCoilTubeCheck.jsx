import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMCoilTubeCheck from '@/components/PageComponent/EDMCoilTubeCheck';

const FormEDMCoilTubeCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            render={({ field }) => (
                <EDMCoilTubeCheck
                    data={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMCoilTubeCheck;
