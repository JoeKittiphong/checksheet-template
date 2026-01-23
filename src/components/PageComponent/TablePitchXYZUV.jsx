import React, { useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import TablePitchCheck from './TablePitchCheck';

/**
 * TablePitchXYZUV Component
 * 
 * Contains 4 TablePitchCheck tables (Y1, Y2, Y3, Y4)
 * Tracks last modified table for MAX and BACKLASH display
 */
function TablePitchXYZUV({
    data = [
        { a: [], b: [] },
        { a: [], b: [] },
        { a: [], b: [] },
        { a: [], b: [] }
    ],
    onChange = () => { },
    rowCount = 16,
    stepSize = 20,
    maxAB = 15,
    maxDiff = 1,
    showCalcCol = true,
    tableLabels = ['Y1', 'Y2', 'Y3', 'Y4']
}) {
    // Track which table was last modified (0-3)
    const [lastModified, setLastModified] = useState(null);

    // Handle change for a specific table
    const handleTableChange = (tableIndex, newTableData) => {
        const newData = [...data];
        newData[tableIndex] = newTableData;
        onChange(newData);
        setLastModified(tableIndex);
    };

    // Calculate MAX (Position Max) from last modified table
    const getMaxValue = () => {
        if (lastModified === null) return '';
        const tableData = data[lastModified];
        const nums = (tableData.a || []).slice(0, rowCount).map(v => parseFloat(v)).filter(v => !isNaN(v));
        if (nums.length === 0) return '';
        return Math.max(...nums).toFixed(3).replace(/\.?0+$/, '');
    };

    // Calculate BACKLASH (Lost Motion) from last modified table
    const getBacklashValue = () => {
        if (lastModified === null) return '';
        const tableData = data[lastModified];
        const diffs = [];
        for (let i = 0; i < rowCount; i++) {
            const a = parseFloat(tableData.a?.[i]);
            const b = parseFloat(tableData.b?.[i]);
            if (!isNaN(a) && !isNaN(b)) {
                diffs.push(Math.abs(a - b));
            }
        }
        if (diffs.length === 0) return '';
        return Math.max(...diffs).toFixed(3).replace(/\.?0+$/, '');
    };
    // Check if MAX value exceeds standard
    const isMaxInvalid = () => {
        return !validateValue(getMaxValue(), {
            maxValue: maxAB,
            validateStd: true
        });
    };

    // Check if BACKLASH value exceeds standard
    const isBacklashInvalid = () => {
        return !validateValue(getBacklashValue(), {
            maxValue: maxDiff,
            validateStd: true
        });
    };

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
                        <td className="border-b text-center" style={{ padding: '1mm 2mm', minWidth: '10mm', ...(isMaxInvalid() ? invalidStyle : {}) }}>{getMaxValue()}</td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>µm</td>
                    </tr>
                    <tr>
                        <td className="border border-black" style={{ padding: '1mm 2mm', width: '50%' }}>BACK LASH {maxDiff} µm</td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>DATA =</td>
                        <td className="text-center" style={{ padding: '1mm 2mm', minWidth: '10mm', ...(isBacklashInvalid() ? invalidStyle : {}) }}>{getBacklashValue()}</td>
                        <td className="border-b" style={{ padding: '1mm 2mm' }}>µm</td>
                    </tr>
                </tbody>
            </table>

            {/* 4 Tables */}
            <div className="flex" style={{ gap: '1mm' }}>
                {[0, 1, 2, 3].map((tableIndex) => (
                    <TablePitchCheck
                        key={tableIndex}
                        data={data[tableIndex]}
                        onChange={(newData) => handleTableChange(tableIndex, newData)}
                        axisLabel={tableLabels[tableIndex]}
                        rowCount={rowCount}
                        stepSize={stepSize}
                        maxAB={maxAB}
                        maxDiff={maxDiff}
                        showCalcCol={showCalcCol}
                    />
                ))}
            </div>
        </div>
    );
}

export default TablePitchXYZUV;
