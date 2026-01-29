import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TableXPR from '@/components/PageComponent/TableXPR';

const FormTableXPR = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!value) return "Required";
                    const { p = [], r = [] } = value;
                    const cols = props.cols || 3;
                    const ref = props.referenceCol !== undefined ? props.referenceCol : 1;

                    for (let i = 0; i < cols; i++) {
                        if (i === ref) continue;
                        if ((p[i] === '' || p[i] == null) || (r[i] === '' || r[i] == null)) return "Required";
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <TableXPR
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTableXPR;
