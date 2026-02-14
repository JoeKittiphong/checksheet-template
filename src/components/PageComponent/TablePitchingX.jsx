import React from 'react';
import PitchingTable from '@/components/common/PitchingTable';

/**
 * TablePitchingX Component
 * Refactored to use generic PitchingTable.
 */
function TablePitchingX({
    name,
    control,
    standard = { min: -20, max: 20 },
    referenceCol = 1 // X0
}) {
    const config = {
        dataKeys: [{ key: 'b', label: 'B' }, { key: 't', label: 'T' }],
        dimensions: [
            { label: 'X+' },
            { label: 'X0', isRef: true },
            { label: 'X-' }
        ],
        diffLabel: 'DIFF',
        dataLabel: 'DATA PITCHING - X',
        layout: 'horizontal'
    };

    return (
        <PitchingTable
            name={name}
            control={control}
            axis="x"
            config={config}
            standard={standard}
        />
    );
}

export default TablePitchingX;
