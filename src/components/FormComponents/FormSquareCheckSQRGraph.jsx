import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SquareCheckSQRGraph from '@/components/PageComponent/SquareCheckSQRGraph';

const FormSquareCheckSQRGraph = ({ name, defaultValue, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || { resultY: '', points: { top: 0, mid1: 0, mid2: 0 } }}
            render={({ field }) => (
                <SquareCheckSQRGraph
                    data={field.value}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
};

export default FormSquareCheckSQRGraph;
