import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableEnto from '@/components/PageComponent/TableEnto';

const FormTableEnto = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TableEnto
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableEnto;
