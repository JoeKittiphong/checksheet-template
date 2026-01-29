import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TablePitchXYZUV from '@/components/PageComponent/TablePitchXYZUV';

const FormTablePitchXYZUV = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || {}}
            rules={{
                validate: (value) => {
                    if (!Array.isArray(value)) return "Required";
                    const rows = props.rowCount || 16;
                    // value is [table1, table2, table3, table4]
                    // Check each table
                    const checkTable = (tableData) => {
                        if (!tableData) return false;
                        const checkColumn = (arr) => {
                            if (!arr || !Array.isArray(arr)) return false;
                            let count = 0;
                            for (let i = 0; i < rows; i++) {
                                if (arr[i] !== undefined && arr[i] !== null && arr[i] !== '') count++;
                            }
                            return count >= rows;
                        };
                        return checkColumn(tableData.a) && checkColumn(tableData.b);
                    };

                    // Validate all 4 tables
                    for (let i = 0; i < 4; i++) {
                        if (!checkTable(value[i])) return false;
                    }
                    return true;
                }
            }}
            render={({ field }) => (
                <TablePitchXYZUV
                    data={field.value || {}}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormTablePitchXYZUV;
