import React from 'react';
import { useFormContext } from 'react-hook-form';
import TablePitchXYZUVBigmodel from '@/components/PageComponent/TablePitchXYZUVBigmodel';

const FormTablePitchXYZUVBigmodel = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <TablePitchXYZUVBigmodel
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormTablePitchXYZUVBigmodel;
