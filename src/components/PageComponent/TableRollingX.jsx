import React from 'react';
import PitchingTable from '../common/PitchingTable';

/**
 * TableRollingX Component
 * Wrapper around PitchingTable for Rolling X data.
 * 
 * Logic:
 * - Layout: Horizontal (like Pitching X)
 * - Arrows: Up/Down (like Pitching Y) -> determined by arrowAxis="y"
 * - Rows: B, T
 * - Cols: X+, X0 (Ref), X-
 */
const TableRollingX = ({
    data = { b: [], t: [] },
    onChange = () => { },
    standard = { min: -20, max: 20 },
    referenceCol = 1, // Default to middle column (index 1) as ref
    showRowT = true,
    showRowDiff = true
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
            { label: 'X0', isRef: true }, // Assuming forced Ref at X0 for now or mapped from referenceCol
            { label: 'X-' }
        ],
        diffLabel: 'DIFF',
        dataLabel: 'DATA ROLLING - X'
    };

    // Note: The original generic PitchingTable assumes isRef is defined in dimensions.
    // If referenceCol is dynamic, we might need to map it. 
    // For this template, X0 is usually fixed as ref.
    // Let's assume standard 3-column [X+, X0, X-] for now.

    return (
        <PitchingTable
            axis="x"            // Horizontal Layout
            arrowAxis="y"       // Up/Down Arrows
            data={data}
            onChange={onChange}
            config={config}
            standard={standard}
        />
    );
};

export default TableRollingX;
