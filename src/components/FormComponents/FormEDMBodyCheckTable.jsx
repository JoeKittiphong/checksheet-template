import React from 'react';
import { useFormContext } from 'react-hook-form';
import EDMBodyCheckTable from '@/components/PageComponent/EDMBodyCheckTable';

const FormEDMBodyCheckTable = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <EDMBodyCheckTable
            name={name}
            control={control}
            defaultValue={defaultValue} // Pass defaultValue needed for initial render if applicable
            {...props}
        />
    );
};

export default FormEDMBodyCheckTable;
