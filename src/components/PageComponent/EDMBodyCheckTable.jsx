import React from 'react';

/**
 * EDMBodyCheckTable Component
 * ตารางตรวจเช็ค Body สำหรับ EDM (LM-Guide, Magnet, etc.)
 */
function EDMBodyCheckTable({
    rows = [],
    onChange = () => { }
}) {
    const handleUpdate = (no, field, value) => {
        const newRows = rows.map(row => {
            if (row.no === no) {
                return { ...row, [field]: value };
            }
            return row;
        });
        onChange(newRows);
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif',
        border: '2px solid black'
    };

    const thStyle = {
        border: '1.5px solid black',
        padding: '2mm 1mm',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '1mm',
        textAlign: 'center',
        verticalAlign: 'middle',
        height: '8mm'
    };

    const inputStyle = {
        width: '100%',
        height: '100%',
        border: 'none',
        textAlign: 'center',
        fontSize: '10px',
        background: 'transparent',
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={{ ...thStyle, width: '35px' }}>NO.</th>
                    <th style={{ ...thStyle, width: '120px' }}>PART NAME</th>
                    <th style={{ ...thStyle, width: '150px' }}>POINT CHECK</th>
                    <th style={{ ...thStyle, width: '40px' }}>QTY.</th>
                    <th style={{ ...thStyle, width: '70px' }}>TORQUE<br /><span className="text-[8px]">(Kgf.cm)</span></th>
                    <th style={{ ...thStyle, width: '150px' }}>ACTION BY / DATE</th>
                    <th style={{ ...thStyle, width: '150px' }}>DOUBLE CHECK BY / DATE</th>
                </tr>
            </thead>
            <tbody>
                {rows && rows.length > 0 && rows.map((row) => {
                    const rowSpan = row.points?.length || 1;

                    return (row.points || [{ check: '', qty: '', torque: '' }]).map((point, pIdx) => (
                        <tr key={`${row.no}-${pIdx}`}>
                            {pIdx === 0 && (
                                <>
                                    <td rowSpan={rowSpan} style={tdStyle}>{row.no}</td>
                                    <td rowSpan={rowSpan} style={{ ...tdStyle, textAlign: 'left', paddingLeft: '2mm' }}>{row.partName}</td>
                                </>
                            )}

                            <td style={{ ...tdStyle, textAlign: 'left', paddingLeft: '2mm', fontSize: (point.check?.length || 0) > 15 ? '8px' : '10px' }}>
                                {point.check}
                            </td>
                            <td style={tdStyle}>{point.qty}</td>
                            <td style={tdStyle}>{point.torque}</td>

                            {pIdx === 0 && (
                                <>
                                    <td rowSpan={rowSpan} style={{ ...tdStyle, padding: 0 }}>
                                        <div className="flex flex-col h-full divide-y divide-black">
                                            <input
                                                type="text"
                                                style={inputStyle}
                                                value={row.actionBy || ''}
                                                onChange={(e) => handleUpdate(row.no, 'actionBy', e.target.value)}
                                                placeholder="Name"
                                            />
                                            <input
                                                type="date"
                                                style={{ ...inputStyle, fontSize: '8px' }}
                                                value={row.actionDate || ''}
                                                onChange={(e) => handleUpdate(row.no, 'actionDate', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td rowSpan={rowSpan} style={{ ...tdStyle, padding: 0 }}>
                                        <div className="flex flex-col h-full divide-y divide-black">
                                            <input
                                                type="text"
                                                style={inputStyle}
                                                value={row.doubleBy || ''}
                                                onChange={(e) => handleUpdate(row.no, 'doubleBy', e.target.value)}
                                                placeholder="Name"
                                            />
                                            <input
                                                type="date"
                                                style={{ ...inputStyle, fontSize: '8px' }}
                                                value={row.doubleDate || ''}
                                                onChange={(e) => handleUpdate(row.no, 'doubleDate', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ));
                })}
            </tbody>
        </table>
    );
}

export default EDMBodyCheckTable;
