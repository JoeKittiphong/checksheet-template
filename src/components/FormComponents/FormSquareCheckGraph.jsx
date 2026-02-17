import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SquareCheckGraph from '@/components/PageComponent/SquareCheckGraph';

const FormSquareCheckGraph = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || { resultY: '', squareSideX: '', squareSideY: '', squareNo: '' }}
            render={({ field }) => (
                <SquareCheckGraph
                    data={field.value}
                    onChange={(key, val) => {
                        field.onChange({
                            ...field.value,
                            [key]: val
                        });
                    }}
                    {...props}
                />
            )}
        />
    );
};

export default FormSquareCheckGraph;
