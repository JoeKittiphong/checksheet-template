import React from 'react';

const FinalConditionTable = ({headers, tableRows}) => {

    return (
        <table className="w-full text-center border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-1"></th>
                    {headers.map(header => (
                        <th key={header} className="p-1">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableRows.map((row, rIdx) => (
                    <tr key={rIdx}>
                        <td className="p-1 font-bold whitespace-nowrap">{row.label}</td>
                        {row.values.map((val, cIdx) => (
                            <td key={cIdx} className="p-1">
                                {val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FinalConditionTable;
