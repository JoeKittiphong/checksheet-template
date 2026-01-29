import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMLevelCeramic from '@/components/PageComponent/EDMLevelCeramic';

const FormEDMLevelCeramic = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                validate: (value) => {
                    // value structure: { x: {tl:..}, y: {tl:..} }
                    if (!value) return "Required";

                    const keys = ['tl', 'tc', 'tr', 'ml', 'mr', 'bl', 'bc', 'br'];

                    // Helper validation
                    const isAxisComplete = (axisData) => {
                        if (!axisData) return false;
                        for (const k of keys) {
                            if (!axisData[k] && axisData[k] !== 0) return false;
                        }
                        return true;
                    };

                    const validX = isAxisComplete(value.x);
                    const validY = isAxisComplete(value.y);

                    if (!validX || !validY) return false;

                    return true;
                }
            }}
            render={({ field }) => (
                <EDMLevelCeramic
                    dataX={field.value?.x || {}}
                    dataY={field.value?.y || {}}
                    onChangeX={(newX) => field.onChange({ ...field.value, x: newX })}
                    onChangeY={(newY) => field.onChange({ ...field.value, y: newY })}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMLevelCeramic;
