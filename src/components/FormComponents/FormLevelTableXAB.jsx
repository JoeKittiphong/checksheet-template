import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import LevelTableXAB from '@/components/PageComponent/LevelTableXAB';

const FormLevelTableXAB = ({ name, rows, labelA, labelB, defaultValue, ...props }) => {
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
                <LevelTableXAB
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

export default FormLevelTableXAB;
