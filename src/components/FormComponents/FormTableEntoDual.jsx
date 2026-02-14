import React from 'react';
import { useFormContext } from 'react-hook-form';
import TableEntoDual from '@/components/PageComponent/TableEntoDual';

const FormTableEntoDual = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TableEntoDual
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTableEntoDual;
