import React from 'react';
import PitchingTable from '../common/PitchingTable';

/**
 * TableRollingY Component
 * Wrapper around PitchingTable for Rolling Y data.
 * 
 * Logic:
 * - Layout: Vertical (like Pitching Y)
 * - Arrows: Left/Right (like Pitching X) -> determined by arrowAxis="x"
 * - Rows: Y+, Y0 (Ref), Y-
 * - Cols: B, C, DIFF
 */
const TableRollingY = ({
    data = { b: [], c: [] },
    onChange = () => { },
    standard = { min: -20, max: 20 },
    referenceRow = 1, // Default to middle row (index 1) as ref (Y0)
    showColC = true,
    showColDiff = true
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
        dataLabel: 'DATA ROLLING - Y'
    };

    return (
        <PitchingTable
            axis="y"            // Vertical Layout
            arrowAxis="x"       // Left/Right Arrows
            data={data}
            onChange={onChange}
            config={config}
            standard={standard}
        />
    );
};

export default TableRollingY;
