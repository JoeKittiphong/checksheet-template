import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import SignatureModal from "../UIcomponent/SignatureModal";
import DateInput from "../UIcomponent/DateInput";
import { useChecksheet } from "../../context/ChecksheetContext";

/**
 * EDMBodyCheckTable Component
 * ตารางตรวจเช็ค Body สำหรับ EDM (LM-Guide, Magnet, etc.)
 */
function EDMBodyCheckTable({
    rows = [],
    onChange = () => { }
}) {
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet();
    const [modalState, setModalState] = useState({ isOpen: false, rowNo: null, type: null });

    const handleUpdate = (no, field, value) => {
        const newRows = rows.map(row => {
            if (row.no === no) {
                return { ...row, [field]: value };
            }
            return row;
        });
        onChange(newRows);
    };

    const handleSignClick = (rowNo, type) => {
        if (user) {
            setModalState({ isOpen: true, rowNo, type });
        }
    };

    const handleConfirm = () => {
        if (user && modalState.rowNo && modalState.type) {
            const { rowNo, type } = modalState;

            // Generate date
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const today = `${day}/${month}/${year}`;

            // Determine fields based on type
            if (type === 'action') {
                // Update both name and date for actionBy
                const newRows = rows.map(row => {
                    if (row.no === rowNo) {
                        return { ...row, actionBy: user.username, actionDate: today };
                    }
                    return row;
                });
                onChange(newRows);
            } else if (type === 'double') {
                const newRows = rows.map(row => {
                    if (row.no === rowNo) {
                        return { ...row, doubleBy: user.username, doubleDate: today };
                    }
                    return row;
                });
                onChange(newRows);
            }
        }
        setModalState({ isOpen: false, rowNo: null, type: null });
    };

    const handleDeny = async () => {
        setModalState({ isOpen: false, rowNo: null, type: null });
        try {
            await handleSave();
        } catch (err) {
            console.error("Save failed before logout", err);
        } finally {
            logout();
        }
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
        alignItems: 'center',
        cursor: user ? 'pointer' : 'default'
    };

    return (
        <>
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
                                                    readOnly={true}
                                                    onClick={() => handleSignClick(row.no, 'action')}
                                                    placeholder={user ? "Click to Sign" : ""}
                                                    className={user ? "hover:bg-gray-100" : ""}
                                                />
                                                <DateInput
                                                    style={{ ...inputStyle, fontSize: '8px' }}
                                                    value={row.actionDate || ''}
                                                    onChange={(newValue) => handleUpdate(row.no, 'actionDate', newValue)}
                                                />
                                            </div>
                                        </td>
                                        <td rowSpan={rowSpan} style={{ ...tdStyle, padding: 0 }}>
                                            <div className="flex flex-col h-full divide-y divide-black">
                                                <input
                                                    type="text"
                                                    style={inputStyle}
                                                    value={row.doubleBy || ''}
                                                    readOnly={true}
                                                    onClick={() => handleSignClick(row.no, 'double')}
                                                    placeholder={user ? "Click to Sign" : ""}
                                                    className={user ? "hover:bg-gray-100" : ""}
                                                />
                                                <DateInput
                                                    style={{ ...inputStyle, fontSize: '8px' }}
                                                    value={row.doubleDate || ''}
                                                    onChange={(newValue) => handleUpdate(row.no, 'doubleDate', newValue)}
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

            <SignatureModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={handleConfirm}
                onDeny={handleDeny}
                user={user}
            />
        </>
    );
}

export default EDMBodyCheckTable;
