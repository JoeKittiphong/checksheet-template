import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchCheck from '@/components/PageComponent/TablePitchCheck';

const FormTablePitchCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TablePitchCheck
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTablePitchCheck;
