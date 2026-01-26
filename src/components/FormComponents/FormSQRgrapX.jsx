import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SQRgrapX from '@/components/PageComponent/SQRgrapX';

const FormSQRgrapX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            render={({ field }) => (
                <SQRgrapX
                    data={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormSQRgrapX;
