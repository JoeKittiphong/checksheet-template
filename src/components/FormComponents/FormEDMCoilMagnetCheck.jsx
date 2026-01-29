import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMCoilMagnetCheck from '@/components/PageComponent/EDMCoilMagnetCheck';

const FormEDMCoilMagnetCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    // Check if S/N fields are filled according to config
                    if (!props.config) return true;

                    for (const group of props.config) {
                        const axisData = value?.[group.axis] || [];
                        const specCount = group.specs?.length || 0;

                        for (let i = 0; i < specCount; i++) {
                            const item = axisData[i] || {};
                            if (!item.sn || item.sn.trim() === '') return "Required";
                        }
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMCoilMagnetCheck
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMCoilMagnetCheck;
