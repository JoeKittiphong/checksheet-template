import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMYawingY from '@/components/PageComponent/EDMYawingY';

const FormEDMYawingY = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    if (!value.squareNo || !value.dialGaugeNo) return false;
                    if (!value.yPlus || !value.yC || !value.yMinus) return false;
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMYawingY
                    data={field.value || {}}
                    onChange={(key, val) => {
                        field.onChange({
                            ...(field.value || {}),
                            [key]: val
                        });
                    }}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMYawingY;
