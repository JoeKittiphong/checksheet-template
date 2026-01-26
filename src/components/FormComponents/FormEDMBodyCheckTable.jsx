import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMBodyCheckTable from '@/components/PageComponent/EDMBodyCheckTable';

const FormEDMBodyCheckTable = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            render={({ field }) => (
                <EDMBodyCheckTable
                    rows={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMBodyCheckTable;
