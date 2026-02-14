import React from 'react';
import { useFormContext } from 'react-hook-form';
import TablePitchingX from '@/components/PageComponent/TablePitchingX';

const FormTablePitchingX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TablePitchingX
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTablePitchingX;
