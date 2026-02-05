import React from 'react';
import EDMTable from '../common/EDMTable';

/**
 * EDMTableRollingX Component
 * Wrapper around generic EDMTable.
 * Layout: Horizontal (Axis X)
 * Arrows: Up/Down (Axis Y) - Unlike PitchingX which uses Left/Right
 */
const EDMTableRollingX = ({
    data = [],
    onChange = () => { },
    standards = [],
    cols = 5,
    showStd = true,
    validateStd = true,
    label = 'Rolling'
}) => {
    return (
        <EDMTable
            axis="x"
            arrowAxis="y" // Override arrows to Y (Up/Down)
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

export default EDMTableRollingX;
