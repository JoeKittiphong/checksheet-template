import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CheckedBox from '@/components/UIcomponent/CheckedBox';

const FormCheckedBox = ({ name, label = "CHECKED BY / DATE", defaultValue = { name: '', date: '' }, className, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    if (!value.name || !value.date) return "Required";
                    return true;
                }
            }}
            render={({ field, fieldState: { error } }) => (
                <CheckedBox
                    {...field}
                    name={field.value?.name || ''}
                    date={field.value?.date || ''}
                    onNameChange={(val) => field.onChange({ ...field.value, name: val })}
                    onDateChange={(val) => field.onChange({ ...field.value, date: val })}
                    label={label}
                    className={className}
                    error={!!error}
                    {...props}
                />
            )}
        />
    );
};

export default FormCheckedBox;
