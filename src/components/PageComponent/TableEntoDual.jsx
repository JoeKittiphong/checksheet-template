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
 * Structure: Two Sections (Left: A, B | Right: B, A) + Formula
 */
const TableEntoDual = ({
    name,
    control,
    rowCount = 21,
    stepSize = 20,
    maxValue = 15,
    maxDiff = 1,
    formula = "A+B",
    maxFormula = null,
    ...props
}) => {
    // Formula calculation logic remains, but data access changes in EntoTable 
    // Wait, EntoTable now handles data fetching via useWatch. 
    // But `onCalculateFormula` still needs to be passed.
    // However, `data` prop is no longer passed deeply from parent if we use useWatch inside EntoTable.
    // But calculateFormula hook here expects `allData`. 
    // EntoTable will pass the *watched* data to this callback.

    const calculateFormula = useCallback((rowIndex, allData) => {
        const leftA = parseFloat(allData?.left?.a?.[rowIndex]);
        const rightB = parseFloat(allData?.right?.b?.[rowIndex]); // Formula usually involves specific cols?
        // Wait, current formula usage in Page 16:
        // Item 1 (Ento Check): No formula visible/passed?
        // Actually Page 16 code:
        // Block 1: FormTableEntoDual ... (no formula prop, default A+B from default props? No, default props says formula="A+B")
        // But headers show A, B. 
        // Let's check Page 16 again. 
        // Block 2: formula="A-B" passed.

        // In "A+B" (Default): Left A + Right B? Or Left A + Left B?
        // Usually Ento Dual is about combining Left and Right measurements?
        // Let's assume the logic "left.a" and "right.b" is correct based on previous implementation.

        if (isNaN(leftA) || isNaN(rightB)) return '';

        const result = formula === "A+B" ? (leftA + rightB) : (leftA - rightB);
        return result.toFixed(3).replace(/\.?0+$/, '');
    }, [formula]);

    return (
        <EntoTable
            name={name}
            control={control}
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
