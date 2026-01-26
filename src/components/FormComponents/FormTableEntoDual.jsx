import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableEntoDual from '@/components/PageComponent/TableEntoDual';

const FormTableEntoDual = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TableEntoDual
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableEntoDual;
