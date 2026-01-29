import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchCheck from '@/components/PageComponent/TablePitchCheck';

const FormTablePitchCheck = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    // Value comes in as { a: [...], b: [...] }
                    if (!value) return "Required";
                    const rows = props.rowCount || 16; // default from component
                    // Check if a and b have data for all rows
                    // Actually, data might be sparse if not filled sequentially.
                    // But we want to ensure all cells are filled?
                    // Let's iterate 0 to rows-1
                    const checkColumn = (arr) => {
                        if (!arr || !Array.isArray(arr)) return false;
                        // Check count of non-empty values
                        let count = 0;
                        for (let i = 0; i < rows; i++) {
                            if (arr[i] !== undefined && arr[i] !== null && arr[i] !== '') count++;
                        }
                        return count >= rows;
                    };

                    if (!checkColumn(value.a) || !checkColumn(value.b)) return false;
                    return true;
                }
            }}
            render={({ field }) => (
                <TablePitchCheck
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTablePitchCheck;
