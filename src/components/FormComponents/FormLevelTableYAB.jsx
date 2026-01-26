import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import LevelTableYAB from '@/components/PageComponent/LevelTableYAB';

const FormLevelTableYAB = ({ name, rows, labelA, labelB, defaultValue, ...props }) => {
    const { control } = useFormContext();

    // Generate default value if not provided
    const getDefaultValue = () => {
        if (defaultValue) return defaultValue;
        return Array(rows).fill({ a: '', b: '' });
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getDefaultValue()}
            render={({ field }) => (
                <LevelTableYAB
                    rows={rows}
                    data={field.value}
                    onChange={field.onChange}
                    labelA={labelA}
                    labelB={labelB}
                    {...props}
                />
            )}
        />
    );
};

export default FormLevelTableYAB;
