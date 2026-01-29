import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import WorkstandCheck from '@/components/PageComponent/WorkstandCheck';

const FormWorkstandCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    // Check if there is any data in any section
                    const hasData = ['a', 'b', 'c', 'd'].some(section =>
                        Array.isArray(value[section]) && value[section].some(v => v !== undefined && v !== null && v !== '')
                    );
                    return hasData || "Required";
                }
            }}
            render={({ field }) => (
                <WorkstandCheck
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormWorkstandCheck;
