import React from 'react';
import FormQuickTable from '../FormComponents/FormQuickTable';
import InputWithArrow from '../FormComponents/InputWithArrow';
import { Controller } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';

/**
 * HorizontalTableSingleRow UI Component
 * 
 * Renders a single row table with headers (points) and a label (axis).
 * Includes built-in Max-Min difference calculation.
 */
const HorizontalTableSingleRow = ({
    name,
    header,
    label,
    cols = 7,
    headerStart = 0,
    axis = "x",
    standard = 5,
    control,
    registerInput,
    focusCell,
    values = [],
    showArrows = false,
    validateStd = false,
    standards = []
}) => {
    // Calculate Max-Min Diff
    const getDiff = () => {
        const numericValues = (values || [])
            .filter(v => v !== "" && v !== undefined && v !== null)
            .map(v => parseFloat(v));

        if (numericValues.length < 2) return null;
        const max = Math.max(...numericValues);
        const min = Math.min(...numericValues);
        return (max - min);
    };

    const diff = getDiff();
    const isValidRange = diff === null || validateValue(diff, { maxDiff: standard });

    const columns = [
        {
            key: 'label',
            header: header,
            width: '80px',
            className: 'text-center font-bold bg-gray-100 border border-black',
            render: () => label
        }
    ];

    for (let i = 0; i < cols; i++) {
        columns.push({
            key: i.toString(),
            header: (i + headerStart).toString(),
            width: '60px',
            className: 'border border-black',
            render: () => (
                <Controller
                    name={`${name}.${i}`}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: true,
                        validate: (val) => {
                            if (!validateStd) return true;
                            // Try specific standard for this column, else fallback to global standard
                            const std = (standards && standards[i]) || { maxDiff: standard };
                            return validateValue(val, std) || "Range Error";
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className={`w-full h-full p-0.5 ${error ? 'bg-red-200' : ''}`}>
                            <InputWithArrow
                                {...field}
                                axis={axis}
                                showArrows={showArrows}
                                inputRef={registerInput(label, i)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (i + 1 < cols) focusCell(label, i + 1);
                                    }
                                }}
                                className={`w-full text-center outline-none bg-transparent ${error ? 'text-red-600' : ''}`}
                            />
                        </div>
                    )}
                />
            )
        });
    }

    return (
        <div className="flex flex-col items-center">
            <FormQuickTable
                columns={columns}
                data={[{ id: label }]}
                className="w-auto border-collapse"
                hideHeader={false}
            />
        </div>
    );
};

export default HorizontalTableSingleRow;
