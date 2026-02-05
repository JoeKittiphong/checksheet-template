import React from 'react';
import EDMTable from '../common/EDMTable';

/**
 * EDMTablePitchingY Component
 * Wrapper around generic EDMTable.
 * Layout: Vertical (Axis Y)
 * Arrows: Up/Down (Axis Y)
 * Navigation: Enter moves Up (handled by EDMTable axis logic)
 */
const EDMTablePitchingY = ({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 5,
    showStd = true,
    validateStd = true,
    label = 'Pitching'
}) => {
    return (
        <EDMTable
            axis="y"
            arrowAxis="y"
            data={data}
            onChange={onChange}
            standards={standards}
            count={rows}
            showStd={showStd}
            validateStd={validateStd}
            label={label}
        />
    );
};

export default EDMTablePitchingY;
