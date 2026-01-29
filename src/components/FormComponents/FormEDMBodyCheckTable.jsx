import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import EDMBodyCheckTable from '@/components/PageComponent/EDMBodyCheckTable';

const FormEDMBodyCheckTable = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || []}
            rules={{
                validate: (value) => {
                    if (!Array.isArray(value) || value.length === 0) return "Required";

                    // Check for signatures in all rows
                    // Assuming 'value' contains the rows with updated signature fields
                    // Note: defaultValue passed to Form might be just config rows, 
                    // but onChange updates them with actionBy/Date.
                    // Ideally, we validate the state in `value`.

                    for (const row of value) {
                        // Check Action By/Date
                        if (!row.actionBy || !row.actionDate) return "Signatures Required";
                        // Check Double By/Date
                        if (!row.doubleBy || !row.doubleDate) return "Signatures Required";
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <EDMBodyCheckTable
                    rows={field.value || []}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormEDMBodyCheckTable;
