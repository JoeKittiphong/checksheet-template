import React, { useMemo, useState, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import TablePitchCheck from './TablePitchCheck';

/**
 * TablePitchXYZUVBigmodel Component
 * 
 * Customized version of TablePitchXYZUV for "Big Model" machines.
 * Handles Pitch Check where a single axis (e.g., X1) is split into 2 measurements due to length.
 * 
 * Layout:
 * - Table 0: X1 (Low Range)
 * - Table 1: X1 (High Range)
 * - Table 2: X2 (Low Range)
 * - Table 3: X2 (High Range)
 */
function TablePitchXYZUVBigmodel({
    name,
    control,
    rowCount = 45, // Example default for split range
    stepSize = 20,
    maxAB = 15,
    maxDiff = 1,
    showCalcCol = true,
    tableLabels = ['X1', 'X1(cont)', 'X2', 'X2(cont)']
}) {
    // Enabled state for 4 tables
    const [enabledTables, setEnabledTables] = useState([true, true, true, true]);
    const tableRefs = useRef([]);

    // Watch all data for real-time calculation
    const watchedData = useWatch({
        control,
        name: name,
        defaultValue: [
            { a: [], b: [] },
            { a: [], b: [] },
            { a: [], b: [] },
            { a: [], b: [] }
        ]
    });

    const toggleTable = (index) => {
        const newEnabled = [...enabledTables];
        newEnabled[index] = !newEnabled[index];
        setEnabledTables(newEnabled);
    };

    // Helper: Calculate Max Value for a single table
    const getTableMax = (tableData) => {
        if (!tableData?.a) return -1;
        const nums = tableData.a.slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        return nums.length > 0 ? Math.max(...nums) : -1;
    };

    // Helper: Calculate Backlash for a single table
    const getTableBacklash = (tableData) => {
        if (!tableData?.a || !tableData?.b) return -1;
        const diffs = [];
        for (let i = 0; i < rowCount; i++) {
            const a = parseFloat(tableData.a?.[i]);
            const b = parseFloat(tableData.b?.[i]);
            if (!isNaN(a) && !isNaN(b)) {
                diffs.push(Math.abs(a - b));
            }
        }
        return diffs.length > 0 ? Math.max(...diffs) : -1;
    };

    // Calculate Global Max from all ENABLED tables
    const globalMax = useMemo(() => {
        let max = -1;
        for (let i = 0; i < 4; i++) {
            if (enabledTables[i]) {
                const table = watchedData?.[i] || {};
                const tMax = getTableMax(table);
                if (tMax > max) max = tMax;
            }
        }
        return max === -1 ? '' : max.toFixed(3).replace(/\.?0+$/, '');
    }, [watchedData, rowCount, enabledTables]);

    // Calculate Global Backlash from all ENABLED tables
    const globalBacklash = useMemo(() => {
        let max = -1;
        for (let i = 0; i < 4; i++) {
            if (enabledTables[i]) {
                const table = watchedData?.[i] || {};
                const tMax = getTableBacklash(table);
                if (tMax > max) max = tMax;
            }
        }
        return max === -1 ? '' : max.toFixed(3).replace(/\.?0+$/, '');
    }, [watchedData, rowCount, enabledTables]);

    // Validation Checkers
    const isGlobalMaxInvalid = () => !validateValue(globalMax, { maxValue: maxAB, validateStd: true });
    const isGlobalBacklashInvalid = () => !validateValue(globalBacklash, { maxValue: maxDiff, validateStd: true });

    const invalidStyle = { backgroundColor: '#ffcccc', color: 'red' };

    // Helper to determine minVal for each table
    const getMinVal = (idx) => {
        // Table 0 & 2 are Low Range -> Start at 0
        // Table 1 & 3 are High Range -> Start after Table 0 & 2
        if (idx === 0 || idx === 2) return 0;
        if (idx === 1 || idx === 3) return rowCount * stepSize;
        return 0;
    };

    // Helper to get linked value for continuity (Table 1 needs data from Table 0)
    const getLinkedVal = (idx) => {
        if (idx === 1) return watchedData[0]?.a?.[1]; // Table 1 (High) uses Table 0 (Low) 860 value
        if (idx === 3) return watchedData[2]?.a?.[1]; // Table 3 (High) uses Table 2 (Low) 860 value
        return null;
    };

    // Handle focus jump from Top of Low Table to Bottom of High Table
    const handleReachTop = (idx) => {
        if (idx === 0) { // Top of Table 0 -> Jump to Bottom of Table 1 (Col A)
            if (tableRefs.current[1]) tableRefs.current[1].focusIndex(rowCount - 1, 'a');
        } else if (idx === 2) { // Top of Table 2 -> Jump to Bottom of Table 3 (Col A)
            if (tableRefs.current[3]) tableRefs.current[3].focusIndex(rowCount - 1, 'a');
        }
    };

    // Handle focus jump from Bottom of High Table (B) to Top of Low Table (B)
    const handleReachBottomB = (idx) => {
        if (idx === 1) { // Bottom of Table 1 (B) -> Jump to Top of Table 0 (B)
            // Note: Bottom of Table 1 B is disabled, so handleKeyDown usually filters it?
            // Wait, if disabled, user can't be there.
            // But user types B from Top (1760) down to 880.
            // 880 (Bottom) is disabled. So cursor is at 900 (rowCount - 2).
            // User presses Enter at 900.
            // MoveFocus tries to go to 880.
            // If 880 is disabled, MoveFocus logic (in useFocusNavigation) usually skips?
            // Actually, TablePitchCheck handleKeyDown just blindly moves focus.
            // If input is disabled, it can't be focused?
            // We need to jump manually from rowCount-2 if logic allows?
            // Or use the limit index.
            // For now, let's assume specific hook: rowCount - 2
            if (tableRefs.current[0]) tableRefs.current[0].focusIndex(0, 'b');
        } else if (idx === 3) {
            if (tableRefs.current[2]) tableRefs.current[2].focusIndex(0, 'b');
        }
    };

    return (
        <div className="inline-block text-xs font-sans">
            {/* Header Table */}
            <table className="border-collapse border border-black mb-1" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td rowSpan={2} className="border border-black font-bold text-center align-middle" style={{ padding: '1mm 2mm', width: '8mm' }}>STD</td>
                        <td className="border border-black" style={{ padding: '1mm 2mm', width: '50%' }}>MAX {maxAB} µm</td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>DATA =</td>
                        <td className="border-b text-center" style={{ padding: '1mm 2mm', minWidth: '10mm', ...(globalMax !== '' && isGlobalMaxInvalid() ? invalidStyle : {}) }}>
                            {globalMax}
                        </td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>µm</td>
                    </tr>
                    <tr>
                        <td className="border border-black" style={{ padding: '1mm 2mm', width: '50%' }}>BACK LASH {maxDiff} µm</td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>DATA =</td>
                        <td className="text-center" style={{ padding: '1mm 2mm', minWidth: '10mm', ...(globalBacklash !== '' && isGlobalBacklashInvalid() ? invalidStyle : {}) }}>
                            {globalBacklash}
                        </td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>µm</td>
                    </tr>
                </tbody>
            </table>

            {/* 4 Tables */}
            <div className="flex" style={{ gap: '1mm' }}>
                {[0, 1, 2, 3].map((tableIndex) => (
                    <TablePitchCheck
                        key={tableIndex}
                        ref={(el) => tableRefs.current[tableIndex] = el}
                        name={`${name}.${tableIndex}`}
                        control={control}
                        axisLabel={tableLabels[tableIndex]}
                        rowCount={rowCount}
                        stepSize={stepSize}
                        maxAB={maxAB}
                        maxDiff={maxDiff}
                        showCalcCol={showCalcCol}
                        enabled={enabledTables[tableIndex]}
                        onToggle={() => toggleTable(tableIndex)}
                        minVal={getMinVal(tableIndex)}
                        linkedNextVal={getLinkedVal(tableIndex)}
                        onReachTop={() => handleReachTop(tableIndex)}
                        onReachBottomB={() => handleReachBottomB(tableIndex)}
                        disableTopRowB={tableIndex === 1 || tableIndex === 3} // Disable TopB for High Range
                        disableTopRowA={tableIndex === 1 || tableIndex === 3} // Disable TopA for High Range
                        disableSecondRowB={tableIndex === 1 || tableIndex === 3} // Disable SecondB (Runner-up) for High Range
                        disableBottomRowA={false}
                        disableBottomRowB={false}
                        disablePenultimateRowB={false}
                        disableReturnRow={tableIndex === 1 || tableIndex === 3} // Keep Return Row disabled for High Range
                    />
                ))}
            </div>
        </div>
    );
}

export default TablePitchXYZUVBigmodel;
