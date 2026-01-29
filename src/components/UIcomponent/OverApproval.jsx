import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useChecksheet } from "../../context/ChecksheetContext";
import SignatureModal from "./SignatureModal";
import DateInput from "./DateInput";
import TristateCheckbox from "@/components/UIcomponent/TristateCheckbox";

/**
 * OverApproval Component
 * Horizontal layout: [Checkbox] | [Name] | [Date] | [Reason]
 * 
 * Props:
 * - data: { isApproved, name, date, reason }
 * - onChange: callback (field, value)
 */
function OverApproval({
    data = { isApproved: false, name: '', date: '', reason: '' },
    onChange = () => { }
}) {
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (field, value) => {
        onChange(field, value);
    };

    const handleSignClick = () => {
        if (user) {
            setIsModalOpen(true);
        }
    };

    const handleConfirm = () => {
        if (user) {
            // Create a date in local timezone DD/MM/YYYY
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const today = `${day}/${month}/${year}`;

            // Update parent state
            onChange('name', user.username);
            onChange('date', today);
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
            <div className="flex border border-black bg-white text-xs over-approval-container" style={{ width: '120mm', height: '8mm' }}>
                <style>{`
                    .over-approval-container input[type="date"]::-webkit-calendar-picker-indicator {
                        display: none;
                    }
                `}</style>
                {/* Checkbox Column */}
                <div className="border-r border-black flex items-center justify-center" style={{ width: '8mm' }}>
                    <TristateCheckbox
                        value={data.isApproved}
                        onChange={(val) => handleChange('isApproved', val)}
                        size="w-5 h-5"
                    />
                </div>

                {/* Name Column */}
                <div className=" flex items-center justify-center relative" style={{ width: '25mm' }}>
                    <input
                        type="text"
                        placeholder={user ? "Sign" : "name"}
                        value={data.name || ''}
                        readOnly={true}
                        onClick={handleSignClick}
                        className={`w-full h-full text-center bg-transparent outline-none px-1 ${user ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                    />
                </div>

                {/* Date Column */}
                <div className="border-r border-black flex items-center justify-center relative" style={{ width: '18mm' }}>
                    <DateInput
                        value={data.date || ''}
                        onChange={(newValue) => handleChange('date', newValue)}
                        className="w-full h-full text-center bg-transparent outline-none px-1"
                        style={{ fontSize: '9px' }}
                    />
                </div>

                {/* Reason Column */}
                <div className="flex-1 flex items-center justify-center relative">
                    <input
                        type="text"
                        placeholder="reason"
                        value={data.reason || ''}
                        onChange={(e) => handleChange('reason', e.target.value)}
                        className="w-full h-full text-center bg-transparent outline-none px-1"
                    />
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
}

export default OverApproval;
