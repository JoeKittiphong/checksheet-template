import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import InputWithArrow from './InputWithArrow';
import { useTableNavigation } from '../../hooks/useTableNavigation';

/**
 * FormLevelTableWithDirections
 * 
 * Specialized table for Pitching/Rolling checks.
 * Columns: [Index, A, B, STD Diff]
 * 
 * @param {string} direction - 'pitching' or 'rolling'
 */
const FormLevelTableWithDirections = ({
    name,
    control,
    rows = 5,
    direction = 'pitching',
    labelA = "A",
    labelB = "B",
    labelStd = "STD Diff",
}) => {
    const { registerInput, handleKeyDown, focusCell } = useTableNavigation();
    const columnKeys = ['a', 'b'];

    const onKeyDown = (e, rowIndex, colKey) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (colKey === 'a') {
                const success = focusCell(rowIndex - 1, 'a');
                if (!success) focusCell(0, 'b');
            } else {
                focusCell(rowIndex + 1, 'b');
            }
        } else {
            handleKeyDown(e, rowIndex, colKey, rows, columnKeys);
        }
    };

    const data = Array.from({ length: rows }, (_, i) => ({ id: i + 1, index: i }));

    const columns = [
        {
            key: 'id',
            header: '',
            width: '40px',
            className: 'text-center font-bold bg-gray-50'
        },
        {
            key: 'a',
            header: labelA,
            width: '120px',
            render: (_, row) => (
                <DataCell
                    name={`${name}.${row.index}.a`}
                    control={control}
                    rowIndex={row.index}
                    colKey="a"
                    registerInput={registerInput}
                    onKeyDown={onKeyDown}
                    isReference={row.index === 2}
                    direction={direction}
                />
            )
        },
        {
            key: 'b',
            header: labelB,
            width: '120px',
            render: (_, row) => (
                <DataCell
                    name={`${name}.${row.index}.b`}
                    control={control}
                    rowIndex={row.index}
                    colKey="b"
                    registerInput={registerInput}
                    onKeyDown={onKeyDown}
                    isReference={row.index === 2}
                    direction={direction}
                />
            )
        },
        {
            key: 'std',
            header: labelStd,
            width: '100px',
            className: 'text-center bg-gray-50',
            render: (_, row) => (
                <DiffCell
                    name={name}
                    index={row.index}
                    isReference={row.index === 2}
                />
            )
        }
    ];

    return (
        <FormQuickTable
            columns={columns}
            data={data}
            className="w-auto border-black"
        />
    );
};

const DataCell = ({ name, control, rowIndex, colKey, registerInput, onKeyDown, isReference, direction }) => {
    const axis = direction === 'pitching' ? 'y' : 'x';

    return (
        <div className="relative w-full h-9 flex items-center justify-center">
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                    <div className={`w-full h-full p-0.5 flex items-center justify-center ${error ? 'bg-red-200' : ''}`}>
                        <InputWithArrow
                            {...field}
                            inputRef={registerInput(rowIndex, colKey)}
                            onKeyDown={(e) => onKeyDown(e, rowIndex, colKey)}
                            axis={axis}
                            showArrows={true}
                            className={`w-full text-center bg-transparent border-none outline-none z-10 
                                ${isReference ? 'font-bold' : ''} 
                                ${error ? 'text-red-700 font-bold' : ''}`}
                            placeholder={isReference ? "0" : ""}
                        />
                    </div>
                )}
            />
        </div>
    );
};

const DiffCell = ({ name, index, isReference }) => {
    const aVal = useWatch({ name: `${name}.${index}.a` });
    const bVal = useWatch({ name: `${name}.${index}.b` });

    if (isReference) {
        return <div className="flex justify-center items-center h-full font-bold">0</div>;
    }

    let diffDisplay = '';
    if (aVal !== undefined && aVal !== '' && bVal !== undefined && bVal !== '') {
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            const diff = Math.abs(aNum - bNum);
            diffDisplay = diff.toFixed(2).replace(/\.?0+$/, ''); // Clean zeros
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            {diffDisplay}
        </div>
    );
};

export default FormLevelTableWithDirections;
