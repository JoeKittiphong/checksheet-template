import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import StoneTableGrid from '../PageComponent/StoneTableGrid';
import { useTableNavigation } from '../../hooks/useTableNavigation';

const FormStoneTableGrid = ({ name, maxName, minName, difName, dialGaugeNoName, ...props }) => {
    const { control } = useFormContext();
    const { registerInput, focusCell } = useTableNavigation();

    return (
        <StoneTableGrid
            name={name}
            control={control}
            maxName={maxName}
            minName={minName}
            difName={difName}
            dialGaugeNoName={dialGaugeNoName}
            registerInput={registerInput}
            focusCell={focusCell}
            {...props}
        />
    );
};

export default FormStoneTableGrid;
