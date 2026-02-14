import React from 'react';
import { useFormContext } from 'react-hook-form';
import EDMTableStraightness from '@/components/PageComponent/EDMTableStraightness';

const FormEDMTableStraightness = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <EDMTableStraightness
            name={name}
            control={control}
            {...props}
        />
    );
};

export default FormEDMTableStraightness;
