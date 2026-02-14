import React, { useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import TablePitchCheck from './TablePitchCheck';

/**
 * TablePitchXYZUV Component
 * 
 * Contains 4 TablePitchCheck tables (Y1, Y2, Y3, Y4)
 * Calculates Global MAX and BACKLASH from ALL 4 tables.
 * Includes Enable/Disable Toggle for each table.
 */
function TablePitchXYZUV({
    name,
    control,
    rowCount = 16,
    stepSize = 20,
    maxAB = 15,
    maxDiff = 1,
    showCalcCol = true,
    tableLabels = ['Y1', 'Y2', 'Y3', 'Y4']
}) {
    // Enabled state for 4 tables
    const [enabledTables, setEnabledTables] = useState([true, true, true, true]);

    // Watch all data for real-time header calculation
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
            const a = parseFloat(tableData.a[i]);
            const b = parseFloat(tableData.b[i]);
            if (!isNaN(a) && !isNaN(b)) {
                diffs.push(Math.abs(a - b));
            }
        }
        return diffs.length > 0 ? Math.max(...diffs) : -1;
    };

    // Calculate Global Max from all ENABLED tables
    const globalMax = useMemo(() => {
        let max = -1;
        // Ensure watchedData is iterable (handle sparse object or null)
        const dataArray = Array.isArray(watchedData) ? watchedData : Object.values(watchedData || {});

        dataArray.forEach((table, idx) => {
            // If object values, idx might not match original index order if sparse? 
            // Actually, if we use Object.values, we lose index correlation with enabledTables if unexpected order.
            // Better to use loop 0..3 and access safely.
        });

        // Better approach: Loop 0 to 3 explicitly
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
                        name={`${name}.${tableIndex}`}
                        control={control}
                        axisLabel={tableLabels[tableIndex]}
                        rowCount={rowCount}
                        stepSize={stepSize}
                        maxAB={maxAB}
                        maxDiff={maxDiff}
                        showCalcCol={showCalcCol}
                        enabled={enabledTables[tableIndex]} // Pass enabled state
                        onToggle={() => toggleTable(tableIndex)} // Pass toggle handler
                    />
                ))}
            </div>
        </div>
    );
}

export default TablePitchXYZUV;
