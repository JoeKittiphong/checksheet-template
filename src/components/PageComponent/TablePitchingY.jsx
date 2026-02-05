import React from 'react';
import PitchingTable from '@/components/common/PitchingTable';

/**
 * TablePitchingY Component
 * Refactored to use generic PitchingTable.
 */
function TablePitchingY({
    data,
    onChange,
    standard = { min: -20, max: 20 },
    referenceRow = 1 // Y0 (center)
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
            axis="y"
            data={data}
            onChange={onChange}
            config={config}
            standard={standard}
        />
    );
}

export default TablePitchingY;
