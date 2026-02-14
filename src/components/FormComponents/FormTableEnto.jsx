import React from 'react';
import { useFormContext } from 'react-hook-form';
import TableEnto from '@/components/PageComponent/TableEnto';

const FormTableEnto = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TableEnto
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTableEnto;
