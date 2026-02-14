import React from 'react';
import PitchingTable from '../common/PitchingTable';

/**
 * TableRollingX Component
 * Wrapper around PitchingTable for Rolling X data.
 */
const TableRollingX = ({
    name,
    control,
    standard = { min: -20, max: 20 },
    showRowT = true,
}) => {
    // Config for PitchingTable
    const config = {
        // Data Keys become the Rows in Horizontal Layout
        dataKeys: showRowT
            ? [{ key: 'b', label: 'B' }, { key: 't', label: 'T' }]
            : [{ key: 'b', label: 'B' }],

        // Dimensions become the Cols in Horizontal Layout
        dimensions: [
            { label: 'X+' },
            { label: 'X0', isRef: true },
            { label: 'X-' }
        ],
        diffLabel: 'DIFF',
        dataLabel: 'DATA ROLLING - X',
        calcDiffWithZero: !showRowT // Enable zero-diff calc if T row is hidden
    };

    return (
        <PitchingTable
            name={name}
            control={control}
            axis="x"            // Horizontal Layout
            arrowAxis="y"       // Up/Down Arrows
            config={config}
            standard={standard}
        />
    );
};

export default TableRollingX;
