import React from 'react';
import { useFormContext } from 'react-hook-form';
import EDMLevelCeramic from '@/components/PageComponent/EDMLevelCeramic';

const FormEDMLevelCeramic = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <EDMLevelCeramic
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormEDMLevelCeramic;
