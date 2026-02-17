import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTableNavigation } from '../../hooks/useTableNavigation';
import HorizontalTableSingleRow from '../PageComponent/HorizontalTableSingleRow';

/**
 * FormHorizontalTableSingleRow
 * 
 * react-hook-form wrapper for HorizontalTableSingleRow.
 */
const FormHorizontalTableSingleRow = ({ name, showArrows, validateStd, standards, ...props }) => {
    const { control } = useFormContext();
    const { registerInput, focusCell } = useTableNavigation();

    // Watch the entire array for diff calculation
    const values = useWatch({
        name,
        control,
        defaultValue: []
    });

    return (
        <HorizontalTableSingleRow
            name={name}
            control={control}
            registerInput={registerInput}
            focusCell={focusCell}
            values={values}
            showArrows={showArrows}
            validateStd={validateStd}
            standards={standards}
            {...props}
        />
    );
};

export default FormHorizontalTableSingleRow;
