import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import SignatureModal from "../UIcomponent/SignatureModal";
import DateInput from "../UIcomponent/DateInput";
import { useChecksheet } from "../../context/ChecksheetContext";
import { useFormContext, Controller, useWatch } from 'react-hook-form';

/**
 * EDMBodyCheckTable Component
 * ตารางตรวจเช็ค Body สำหรับ EDM (LM-Guide, Magnet, etc.)
 * Refactored to use granular Validation.
 */
function EDMBodyCheckTable({
    name,
    control,
    defaultValue = [] // Initial config rows
}) {
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet();
    const { formState: { isSubmitted }, setValue, getValues } = useFormContext(); // control passed via props, but creating context is also fine.

    // Use defaultValue (config) directly for rendering structure
    // useWatch is not suitable here because it returns partial form state which lacks static descriptions.
    const rows = defaultValue;

    const [modalState, setModalState] = useState({ isOpen: false, rowNo: null, type: null });

    // Handle updates via React Hook Form's setValue
    // Since we are using Controller for individual cells, this might be redundant for handled fields,
    // but useful for generic updates if any.
    // However, with granular Controllers, we update specific fields directly.

    // Helper to get current row index by row.no (assuming rows are ordered or consistent)
    // Better to use index in map.

    const handleSignClick = (rowNo, type) => {
        if (user) {
            setModalState({ isOpen: true, rowNo, type });
        }
    };

    const handleConfirm = () => {
        if (user && modalState.rowNo && modalState.type) {
            const { rowNo, type } = modalState;
            const rowIndex = rows.findIndex(r => r.no === rowNo);

            if (rowIndex !== -1) {
                // Generate date
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const today = `${day}/${month}/${year}`;

                if (type === 'action') {
                    setValue(`${name}.${rowIndex}.actionBy`, user.username, { shouldValidate: true });
                    setValue(`${name}.${rowIndex}.actionDate`, today, { shouldValidate: true });
                } else if (type === 'double') {
                    setValue(`${name}.${rowIndex}.doubleBy`, user.username, { shouldValidate: true });
                    setValue(`${name}.${rowIndex}.doubleDate`, today, { shouldValidate: true });
                }
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
                    {rows && rows.length > 0 && rows.map((row, rowIndex) => {
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
                                        {/* Action By / Date */}
                                        <td rowSpan={rowSpan} style={{ ...tdStyle, padding: 0 }}>
                                            <div className="flex flex-col h-full divide-y divide-black">
                                                {/* Action By */}
                                                <Controller
                                                    name={`${name}.${rowIndex}.actionBy`}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field, fieldState: { error } }) => (
                                                        <input
                                                            type="text"
                                                            style={{
                                                                ...inputStyle,
                                                                ...(error ? { border: '1px solid #ef4444', backgroundColor: '#fef2f2' } : {})
                                                            }}
                                                            value={field.value || ''}
                                                            readOnly={true}
                                                            onClick={() => handleSignClick(row.no, 'action')}
                                                            placeholder={user ? "Click to Sign" : ""}
                                                            className={user ? "hover:bg-gray-100" : ""}
                                                        />
                                                    )}
                                                />
                                                {/* Action Date */}
                                                <Controller
                                                    name={`${name}.${rowIndex}.actionDate`}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field, fieldState: { error } }) => (
                                                        <DateInput
                                                            style={{
                                                                ...inputStyle,
                                                                fontSize: '8px'
                                                            }}
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            error={!!error}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </td>

                                        {/* Double Check By / Date */}
                                        <td rowSpan={rowSpan} style={{ ...tdStyle, padding: 0 }}>
                                            <div className="flex flex-col h-full divide-y divide-black">
                                                {/* Double By */}
                                                <Controller
                                                    name={`${name}.${rowIndex}.doubleBy`}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field, fieldState: { error } }) => (
                                                        <input
                                                            type="text"
                                                            style={{
                                                                ...inputStyle,
                                                                ...(error ? { border: '1px solid #ef4444', backgroundColor: '#fef2f2' } : {})
                                                            }}
                                                            value={field.value || ''}
                                                            readOnly={true}
                                                            onClick={() => handleSignClick(row.no, 'double')}
                                                            placeholder={user ? "Click to Sign" : ""}
                                                            className={user ? "hover:bg-gray-100" : ""}
                                                        />
                                                    )}
                                                />
                                                {/* Double Date */}
                                                <Controller
                                                    name={`${name}.${rowIndex}.doubleDate`}
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field, fieldState: { error } }) => (
                                                        <DateInput
                                                            style={{
                                                                ...inputStyle,
                                                                fontSize: '8px'
                                                            }}
                                                            value={field.value || ''}
                                                            onChange={field.onChange}
                                                            error={!!error}
                                                        />
                                                    )}
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
