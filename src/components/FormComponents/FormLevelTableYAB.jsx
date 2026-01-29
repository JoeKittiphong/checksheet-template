import React, { useEffect } from 'react';
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
            rules={{
                validate: (value) => {
                    if (!Array.isArray(value)) return "Required";
                    const rowCount = props.rows || 16;

                    // Filter for completely filled rows (A and B present)
                    const filled = value.filter(item =>
                        item &&
                        (item.a !== '' && item.a !== null && item.a !== undefined) &&
                        (item.b !== '' && item.b !== null && item.b !== undefined)
                    );

                    if (filled.length < rowCount) return "Required";
                    return true;
                }
            }}
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
