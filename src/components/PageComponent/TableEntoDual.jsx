import React, { useCallback } from 'react';
import EntoTable from '../common/EntoTable';

const SECTIONS = [
    {
        key: 'left',
        label: 'Z1L',
        cols: ['a', 'b'],
        headerCols: ['A', ''] // Left: A then B
    },
    {
        key: 'right',
        label: 'Z1R',
        cols: ['b', 'a'],
        headerCols: ['B', ''] // Right: B then A
    }
];

/**
 * TableEntoDual Component
 * Wrapper around generic EntoTable.
 * Structure: Two Sections (Left: A, B, Diff | Right: B, A, Diff) + Formula
 */
const TableEntoDual = ({
    data = { left: { a: [], b: [] }, right: { a: [], b: [] } },
    onChange = () => { },
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    formula = "A+B",  // "A+B" or "A-B"
    maxFormula = null,
    ...props
}) => {
    const calculateFormula = useCallback((rowIndex, allData) => {
        const leftA = parseFloat(allData?.left?.a?.[rowIndex]);
        const rightB = parseFloat(allData?.right?.b?.[rowIndex]);

        if (isNaN(leftA) || isNaN(rightB)) return '';

        const result = formula === "A+B" ? (leftA + rightB) : (leftA - rightB);
        return result.toFixed(3).replace(/\.?0+$/, '');
    }, [formula]);

    return (
        <EntoTable
            data={data}
            onChange={onChange}
            sections={SECTIONS}
            rowCount={rowCount}
            stepSize={stepSize}
            maxValue={maxValue}
            maxDiff={maxDiff}
            formula={formula}
            onCalculateFormula={calculateFormula}
            maxFormula={maxFormula}
            {...props}
        />
    );
};

export default TableEntoDual;
