import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMCoilTubeCheck from '../PageComponent/EDMCoilTubeCheck';

const FormEDMCoilTubeCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    // Check if at least one value is set? Or all? User wants "Require all" usually.
                    // Structure: { x: { in: v, out: v }, ... }
                    // Simple check: iterate keys, ensure 'in' and 'out' are not null/undefined/false?
                    // But Tristate can be false (NG). It should not be null/""
                    if (!value) return "Required";
                    const axes = ['x', 'ykc', 'ykb'];
                    for (const axis of axes) {
                        if (value[axis]?.in === undefined || value[axis]?.in === null || value[axis]?.in === "") return false;
                        if (value[axis]?.out === undefined || value[axis]?.out === null || value[axis]?.out === "") return false;
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMCoilTubeCheck
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMCoilTubeCheck;
