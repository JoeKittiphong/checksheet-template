import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchXYZUV from '@/components/PageComponent/TablePitchXYZUV';

const FormTablePitchXYZUV = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            render={({ field }) => (
                <TablePitchXYZUV
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTablePitchXYZUV;
