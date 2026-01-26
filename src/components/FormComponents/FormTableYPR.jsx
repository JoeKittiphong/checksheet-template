import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableYPR from '@/components/PageComponent/TableYPR';

const FormTableYPR = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TableYPR
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableYPR;
