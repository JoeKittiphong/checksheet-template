import React from 'react';
import EDMTable from '../common/EDMTable';

/**
 * EDMTableRollingY Component
 * Wrapper around generic EDMTable.
 * Layout: Vertical (Axis Y)
 * Arrows: Left/Right (Axis X) - Unlike PitchingY which uses Up/Down
 * Navigation: Enter moves Up (handled by EDMTable axis logic)
 */
const EDMTableRollingY = ({
    data = [],
    onChange = () => { },
    standards = [],
    rows = 5,
    showStd = true,
    validateStd = true,
    label = 'Rolling'
}) => {
    return (
        <EDMTable
            axis="y"
            arrowAxis="x" // Override arrows to X (Left/Right)
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

export default EDMTableRollingY;
