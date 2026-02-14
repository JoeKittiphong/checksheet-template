import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import StartFinishTime from '@/components/UIcomponent/StartFinishTime';

const FormStartFinishTime = ({ name, minHours, validateStd, defaultValue = { startTime: '', finishTime: '' }, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
                validate: (value) => {
                    if (!value) return false;
                    return (value.startTime && value.finishTime) || "Required";
                }
            }}
            render={({ field, fieldState }) => (
                <StartFinishTime
                    {...field}
                    startTime={field.value?.startTime || ''}
                    finishTime={field.value?.finishTime || ''}
                    onStartChange={(val) => field.onChange({ ...field.value, startTime: val })}
                    onFinishChange={(val) => field.onChange({ ...field.value, finishTime: val })}
                    minHours={minHours}
                    validateStd={validateStd}
                    error={!!fieldState.error}
                    {...props}
                />
            )}
        />
    );
};

export default FormStartFinishTime;
