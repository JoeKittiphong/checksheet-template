import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableEnto from '@/components/PageComponent/TableEnto';

const FormTableEnto = ({ name, defaultValue, ...props }) => {
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
                    const { a = [], b = [] } = value;

                    // Check first 'count' items are filled
                    for (let i = 0; i < count; i++) {
                        if ((a[i] === '' || a[i] == null) || (b[i] === '' || b[i] == null)) {
                            return "Required";
                        }
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <TableEnto
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableEnto;
