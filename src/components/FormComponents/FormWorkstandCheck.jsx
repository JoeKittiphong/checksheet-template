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
