import React from 'react';
import { useFormContext } from 'react-hook-form';
import TableRollingY from '@/components/PageComponent/TableRollingY';

const FormTableRollingY = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TableRollingY
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTableRollingY;
