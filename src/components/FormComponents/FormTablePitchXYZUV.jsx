import React from 'react';
import { useFormContext } from 'react-hook-form';
import TablePitchXYZUV from '@/components/PageComponent/TablePitchXYZUV';

const FormTablePitchXYZUV = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TablePitchXYZUV
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTablePitchXYZUV;
