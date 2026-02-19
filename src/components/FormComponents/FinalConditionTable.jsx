import React from 'react';

const FinalConditionTable = ({ headers = [], tableRows = [] }) => {
    // Ensure headers and tableRows are arrays to prevent crashes if props are misconfigured
    const safeHeaders = Array.isArray(headers) ? headers : (typeof headers === 'string' ? JSON.parse(headers || '[]') : []);
    const safeRows = Array.isArray(tableRows) ? tableRows : (typeof tableRows === 'string' ? JSON.parse(tableRows || '[]') : []);

    return (
        <div className="overflow-x-auto w-full border border-gray-200 rounded">
            <table className="w-full text-center border-collapse text-[10px]">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-1 border-r border-gray-200 bg-gray-100 min-w-[60px]"></th>
                        {safeHeaders.map((header, idx) => (
                            <th key={idx} className="p-1 border-r border-gray-200 font-bold text-gray-700">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {safeRows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <td className="p-1 font-bold whitespace-nowrap bg-gray-50 border-r border-gray-200 text-left pl-2">{row?.label || ''}</td>
                            {(row?.values || []).map((val, cIdx) => (
                                <td key={cIdx} className="p-1 border-r border-gray-200 last:border-r-0 font-mono">
                                    {val}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {safeRows.length === 0 && (
                        <tr>
                            <td colSpan={safeHeaders.length + 1} className="p-4 text-gray-400 italic">No data rows defined.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FinalConditionTable;
