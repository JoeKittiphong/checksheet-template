import React from 'react';
import { useFormContext } from 'react-hook-form';
import EDMCoilMagnetCheck from '@/components/PageComponent/EDMCoilMagnetCheck';

const FormEDMCoilMagnetCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <EDMCoilMagnetCheck
            name={name}
            control={control}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default FormEDMCoilMagnetCheck;
