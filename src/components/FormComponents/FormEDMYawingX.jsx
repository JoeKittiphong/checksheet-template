import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMYawingX from '@/components/PageComponent/EDMYawingX';

const FormEDMYawingX = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    // Required fields: squareNo, dialGaugeNo
                    if (!value.squareNo || !value.dialGaugeNo) return false;
                    // Check if points are filled (at least some?)
                    // The calculated values xMinus, xC, xPlus should be present if points are filled
                    if (!value.xMinus || !value.xC || !value.xPlus) return false;

                    return true;
                }
            }}
            render={({ field }) => (
                <EDMYawingX
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

export default FormEDMYawingX;
