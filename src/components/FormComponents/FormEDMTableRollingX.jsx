import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { validateValue } from '../../utils/validationUtils';
import { useTableNavigation } from '../../hooks/useTableNavigation';

const FormEDMTableRollingX = ({
    name,
    cols = 5,
    rows,
    standards = [],
    showStd = false,
    validateStd = false,
    label = "Rolling",
    defaultValue,
    ...props
}) => {
    const { registerInput, focusCell } = useTableNavigation();

    const count = cols || rows || 5;

    const renderStd = (colIndex) => {
        const std = standards[colIndex];
        if (!std) return "";
        // Rolling X uses Up/Down arrows usually? 
        // Based on existing code `arrowAxis="y"` in RollingX component.
        const { min, max, arrow } = std;
        let arrowSymbol = '';
        if (arrow === '+') arrowSymbol = '↑'; // or similar if formatting needed
        // Actually formatStandard might handle this if we passed axis.
        // For now manual string constr matches what we saw in other files.
        /*
            Existing RollingSTD in Page5.jsx has arrows '' (empty).
            If arrows were used: + is usually Up, - is Down for Y axis.
            Let's rely on standard printing.
        */

        if (min === max) {
            return `${min}`;
        }
        return `${min}~${max}`;
    };

    const tableRows = [];
    if (showStd) {
        tableRows.push({ id: 'std', label: 'STD', isHeader: true });
    }
    tableRows.push({ id: 'data', label: label });

    const onKeyDown = (e, rowId, colIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Move Right
            const nextCol = colIndex + 1;
            if (nextCol < count) {
                focusCell(rowId, nextCol);
            }
        }
    };

    const columns = [
        {
            key: 'label',
            header: '',
            width: '80px',
            className: 'text-center font-bold bg-gray-100',
            render: (_, row) => row.label
        }
    ];

    for (let i = 0; i < count; i++) {
        columns.push({
            key: i.toString(),
            header: (i + 1).toString(),
            width: '60px',
            render: (_, row) => {
                if (row.id === 'std') {
                    return <div className="text-xs text-center">{renderStd(i)}</div>;
                }

                const fieldName = `${name}.${i}`;

                return (
                    <Controller
                        name={fieldName}
                        control={props.control}
                        rules={{
                            required: true,
                            validate: (value) => {
                                if (!validateStd) return true;
                                const std = standards[i];
                                if (!std) return true;
                                return validateValue(value, { ...std, useAbs: true }) || "Out of range";
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                                <InputWithArrow
                                    {...field}
                                    axis="y" // Rolling X uses Up/Down (Y axis arrows)
                                    inputRef={registerInput(row.id, i)}
                                    onKeyDown={(e) => onKeyDown(e, row.id, i)}
                                    className={`${error ? 'text-red-600 font-medium' : ''}`}
                                    placeholder=""
                                />
                            </div>
                        )}
                    />
                );
            }
        });
    }

    return (
        <FormQuickTable
            columns={columns}
            data={tableRows}
            className="w-auto"
        />
    );
};

export default FormEDMTableRollingX;
