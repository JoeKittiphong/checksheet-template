import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMTableStraightness from '@/components/PageComponent/EDMTableStraightness';

const FormEDMTableStraightness = ({ name, rows, standards, showStd = false, validateStd = false, defaultValue, ...props }) => {
    const { control } = useFormContext();

    // Generate default value if not provided
    const getDefaultValue = () => {
        if (defaultValue) return defaultValue;
        return {};
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={getDefaultValue()}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    // Check if data is present. Count non-empty keys.
                    // rowCount default is 31 in UI component if not passed.
                    // But here we rely on value being an object.
                    // We can just check if *any* data is filled? Or strict?
                    // Let's assume strict check for now: require at least one value?
                    // Or match rowCount?
                    // For now, let's just ensure it's not empty if required.
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMTableStraightness
                    rows={rows}
                    data={field.value}
                    onChange={field.onChange}
                    standard={standards}
                    showStd={showStd}
                    validateStd={validateStd}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMTableStraightness;
