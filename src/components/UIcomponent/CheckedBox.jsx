import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useChecksheet } from "../../context/ChecksheetContext";
import SignatureModal from "./SignatureModal";
import DateInput from "./DateInput";

/**
 * CheckedBox Component
 * กล่องสำหรับกรอกชื่อผู้ตรวจและวันที่
 * - ชื่อ: 70% ของความสูง
 * - วันที่: 30% ของความสูง
 * 
 * @param {Object} props
 * @param {string} props.name - ชื่อผู้ตรวจ
 * @param {string} props.date - วันที่ตรวจ
 * @param {Function} props.onNameChange - callback เมื่อชื่อเปลี่ยน
 * @param {Function} props.onDateChange - callback เมื่อวันที่เปลี่ยน
 * @param {string} props.label - หัวข้อ (default: "CHECKED BY / DATE")
 */
const CheckedBox = React.forwardRef(({
    name = '',
    date = '',
    onNameChange,
    onDateChange,
    onChange, // New unified handler
    label = 'CHECKED BY / DATE',
    error = false
}, ref) => {
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet(); // Global save
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Opening modal logic
    const handleNameClick = () => {
        if (user) {
            setIsModalOpen(true);
        }
    };

    // Helper to dispatch updates securely
    const dispatchUpdate = (updates) => {
        // updates = { name: '...', date: '...' }
        const newName = updates.name !== undefined ? updates.name : name;
        const newDate = updates.date !== undefined ? updates.date : date;

        if (onChange) {
            // Use unified handler if available (Preferred)
            onChange({ name: newName, date: newDate });
        } else {
            // Legacy fallback (Prone to race conditions if both update)
            if (updates.name !== undefined && onNameChange) onNameChange(updates.name);
            if (updates.date !== undefined && onDateChange) onDateChange(updates.date);
        }
    };

    const handleConfirm = () => {
        if (user) {
            // DEBUG ALERTS - TEMPORARY
            // alert(`Current User: ${JSON.stringify(user)}`);

            const updates = {};
            updates.name = user.username;

            // Create a date in local timezone DD/MM/YYYY
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const today = `${day}/${month}/${year}`;

            if (!date) {
                updates.date = today;
            }

            // alert(`Dispatching Updates: ${JSON.stringify(updates)}`);
            dispatchUpdate(updates);
        }
        setIsModalOpen(false);
    };

    const handleDeny = async () => {
        setIsModalOpen(false);
        try {
            await handleSave();
        } catch (err) {
            console.error("Save failed before logout", err);
        } finally {
            logout();
        }
    };

    return (
        <>
            <div className={`border w-[150px] h-[120px] relative group ${error ? 'border-red-500' : 'border-black'}`}>
                {/* Header */}
                <div className="border-b border-black px-2 py-1 text-xs font-medium bg-white flex justify-between items-center">
                    <span>{label}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col h-[calc(100%-25px)]">
                    {/* Name - 70% */}
                    <div className="h-[70%] border-b border-black relative">
                        <input
                            ref={ref}
                            type="text"
                            value={name}
                            onChange={(e) => dispatchUpdate({ name: e.target.value })}
                            onClick={(e) => {
                                if (user) {
                                    handleNameClick();
                                    e.target.blur(); // Unfocus to prevent virtual keyboard or cursor
                                }
                            }}
                            placeholder={user ? "Click to sign" : ""}
                            readOnly={!!user}
                            className={`w-full h-full px-2 text-center text-sm bg-transparent outline-none placeholder:text-gray-300 placeholder:text-[10px] ${user ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                        />
                    </div>

                    {/* Date - 30% */}
                    <div className="h-[30%] relative">
                        <DateInput
                            value={date}
                            onChange={(newValue) => dispatchUpdate({ date: newValue })}
                            className="w-full h-full px-2 text-center text-xs bg-transparent outline-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <SignatureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                onDeny={handleDeny}
                user={user}
            />
        </>
    );
});

export default CheckedBox;
