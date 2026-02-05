import React from 'react';
import EDMTable from '../common/EDMTable';

/**
 * EDMTablePitchingX Component
 * Wrapper around generic EDMTable.
 * Layout: Horizontal (Axis X)
 * Arrows: Left/Right (Axis X)
 */
const EDMTablePitchingX = ({
    data = [],
    onChange = () => { },
    standards = [],
    cols = 5,
    showStd = true,
    validateStd = true,
    label = 'Pitching'
}) => {
    return (
        <EDMTable
            axis="x"
            arrowAxis="x"
            data={data}
            onChange={onChange}
            standards={standards}
            count={cols}
            showStd={showStd}
            validateStd={validateStd}
            label={label}
        />
    );
};

export default EDMTablePitchingX;
