import React from 'react';
import EntoTable from '../common/EntoTable';

/**
 * TableEnto Component
 * Wrapper around generic EntoTable.
 * Structure: Single Section (A, B, Diff)
 */
const TableEnto = ({
    data = { a: [], b: [] },
    onChange = () => { },
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
            data={data}
            onChange={onChange}
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
