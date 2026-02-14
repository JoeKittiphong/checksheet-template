import React from 'react';
import { useFormContext } from 'react-hook-form';
import TableRollingX from '@/components/PageComponent/TableRollingX';

const FormTableRollingX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TableRollingX
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTableRollingX;
