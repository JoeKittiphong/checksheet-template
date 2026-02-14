import React from 'react';
import PitchingTable from '@/components/common/PitchingTable';

/**
 * TablePitchingY Component
 * Refactored to use generic PitchingTable.
 */
function TablePitchingY({
    name,
    control,
    standard = { min: -20, max: 20 },
}) {
    const config = {
        dataKeys: [{ key: 'b', label: 'B' }, { key: 'c', label: 'C' }],
        dimensions: [
            { label: 'Y+' },
            { label: '0', isRef: true },
            { label: 'Y-' }
        ],
        diffLabel: 'DIFF',
        dataLabel: 'DATA PITCHING - Y',
        layout: 'vertical'
    };

    return (
        <PitchingTable
            name={name}
            control={control}
            axis="y"
            config={config}
            standard={standard}
        />
    );
}

export default TablePitchingY;
