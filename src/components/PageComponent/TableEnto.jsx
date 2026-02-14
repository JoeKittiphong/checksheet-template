import React from 'react';
import EntoTable from '../common/EntoTable';

/**
 * TableEnto Component
 * Wrapper around generic EntoTable.
 * Structure: Single Section (A, B, Diff)
 */
const TableEnto = ({
    name,
    control,
    axisLabel = "Z1L",
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    ...props
}) => {
    const sections = [
        {
            key: null, // Single section mode (uses root data)
            label: axisLabel,
            cols: ['a', 'b'],
            headerCols: ['A', 'B']
        }
    ];

    return (
        <EntoTable
            name={name}
            control={control}
            sections={sections}
            rowCount={rowCount}
            stepSize={stepSize}
            maxValue={maxValue}
            maxDiff={maxDiff}
            {...props}
        />
    );
};

export default TableEnto;
