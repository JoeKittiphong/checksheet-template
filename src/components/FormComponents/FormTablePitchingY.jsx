import React from 'react';
import { useFormContext } from 'react-hook-form';
import TablePitchingY from '@/components/PageComponent/TablePitchingY';

const FormTablePitchingY = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TablePitchingY
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTablePitchingY;
