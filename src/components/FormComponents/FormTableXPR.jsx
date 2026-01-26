import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableXPR from '@/components/PageComponent/TableXPR';

const FormTableXPR = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TableXPR
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableXPR;
