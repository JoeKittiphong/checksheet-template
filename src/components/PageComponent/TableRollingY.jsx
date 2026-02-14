import React from 'react';
import PitchingTable from '../common/PitchingTable';

/**
 * TableRollingY Component
 * Wrapper around PitchingTable for Rolling Y data.
 */
const TableRollingY = ({
    name,
    control,
    standard = { min: -20, max: 20 },
    showColC = true,
}) => {
    // Config for PitchingTable
    const config = {
        // Data Keys become the Cols in Vertical Layout
        dataKeys: showColC
            ? [{ key: 'b', label: 'B' }, { key: 'c', label: 'C' }]
            : [{ key: 'b', label: 'B' }],

        // Dimensions become the Rows in Vertical Layout
        dimensions: [
            { label: 'Y+' },
            { label: '0', isRef: true },
            { label: 'Y-' }
        ],
        diffLabel: 'DIFF',
        dataLabel: 'DATA ROLLING - Y',
        calcDiffWithZero: !showColC // Enable zero-diff calc if C col is hidden
    };

    return (
        <PitchingTable
            name={name}
            control={control}
            axis="y"            // Vertical Layout
            arrowAxis="x"       // Left/Right Arrows
            config={config}
            standard={standard}
        />
    );
};

export default TableRollingY;
