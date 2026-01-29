import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableEntoDual from '@/components/PageComponent/TableEntoDual';

const FormTableEntoDual = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    const count = props.rowCount || 21;
                    const left = value.left || {};
                    const right = value.right || {};

                    // Check all 4 columns for 'count' rows
                    for (let i = 0; i < count; i++) {
                        if ((left.a?.[i] === '' || left.a?.[i] == null) ||
                            (left.b?.[i] === '' || left.b?.[i] == null) ||
                            (right.a?.[i] === '' || right.a?.[i] == null) ||
                            (right.b?.[i] === '' || right.b?.[i] == null)) {
                            return "Required";
                        }
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <TableEntoDual
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableEntoDual;
