import React, { useState } from 'react';
import axios from 'axios';
import { useFormContext, Controller } from 'react-hook-form';

/**
 * ProblemDirect Component - Post-it Style
 * 
 * Features:
 * - yellow post-it UI
 * - + button to add ID
 * - - button to delete (requires ID confirmation)
 * - "ปัญหา" link for redirection
 * - RHF integration via Controller for robust persistence
 * 
 * @param {string} name - Field name for React Hook Form
 * @param {string} apiEndpoint - Base URL for redirection
 */
const ProblemDirect = ({ name, apiEndpoint }) => {
    const { control, getValues } = useFormContext();
    const [isEditing, setIsEditing] = useState(false);
    const [tempId, setTempId] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    // Initial persistence check: Grab existing value from form store
    const initialValue = getValues(name) || "";

    // Post-it Style Base Classes
    const postItClasses = "relative w-24 h-24 bg-yellow-200 shadow-lg transform rotate-2 flex items-center justify-center p-2 border-l-4 border-yellow-300 transition-all hover:rotate-0 hover:scale-105";

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue} // Explicitly load saved value on mount
            shouldUnregister={false} // Ensure value persists even if unmounted
            render={({ field: { onChange, value } }) => {
                const problemId = value;

                const handleAdd = () => {
                    if (!tempId.trim()) {
                        alert("กรุณากรอก ID (Please enter an ID)");
                        return;
                    }
                    onChange(tempId.trim()); // Directly update RHF value
                    setIsEditing(false);
                    setTempId('');
                };

                const handleDelete = () => {
                    const confirmId = prompt("กรุณากรอก ID เดิมเพื่อยืนยันการลบ\n(Please enter the current ID to confirm deletion)");
                    if (confirmId === problemId) {
                        onChange(''); // Clear RHF value
                        alert("ลบลิงค์เรียบร้อยแล้ว (Link deleted successfully)");
                    } else if (confirmId !== null) {
                        alert("ID ไม่ถูกต้อง ไม่สามารถลบได้ (Incorrect ID. Deletion cancelled)");
                    }
                };

                const handleJump = async () => {
                    if (!problemId) return;

                    setIsValidating(true);
                    try {
                        // Verify if ID exists on server
                        const response = await axios.get(`${apiEndpoint}/api/load-form/${problemId}`, {
                            withCredentials: true
                        });

                        if (response.data.success && response.data.data) {
                            // Extract data for dynamic URL construction
                            const { machine_no, model } = response.data.data;
                            const targetForm = 'ASSY_PROBLEM';

                            // Construct URL with full query parameters as requested
                            // Format: /form/ASSY_PROBLEM/?machine_no=NO.1&model=AL400G&id=74
                            const queryParams = new URLSearchParams();
                            if (machine_no) queryParams.append('machine_no', machine_no);
                            if (model) queryParams.append('model', model);
                            queryParams.append('id', problemId);

                            window.location.href = `${apiEndpoint}/form/${targetForm}/?${queryParams.toString()}`;
                        } else {
                            alert("ไม่พบข้อมูลปัญหาสำหรับ ID นี้ (Problem ID not found)");
                        }
                    } catch (error) {
                        console.error("Verification failed:", error);

                        // Optional: If 404/500, alert user
                        if (error.response && error.response.status === 404) {
                            alert("ไม่พบข้อมูลปัญหาสำหรับ ID นี้ (Problem ID not found)");
                        } else {
                            // Network error or other issue, allow force jump on confirm
                            if (confirm("เกิดข้อผิดพลาดในการตรวจสอบข้อมูล คุณต้องการไปยังหน้าปัญหานี้หรือไม่?\n(Verification failed. Proceed anyway?)")) {
                                window.location.href = `${apiEndpoint}/form/ASSY_PROBLEM/id=${problemId}`;
                            }
                        }
                    } finally {
                        setIsValidating(false);
                    }
                };

                return (
                    <div className="p-4 flex flex-col items-center print:hidden">
                        {!problemId && !isEditing ? (
                            // Initial State: + Button
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                                title="Add Assy Problem Link"
                            >
                                <span className="text-2xl font-bold">+</span>
                            </button>
                        ) : isEditing ? (
                            // Editing State: Input + OK
                            <div className={`${postItClasses} rotate-0 scale-110 z-10`}>
                                <div className="flex flex-col gap-1 w-full">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={tempId}
                                        onChange={(e) => setTempId(e.target.value)}
                                        placeholder="ID..."
                                        className="w-full text-xs p-1 border border-yellow-400 bg-yellow-50 outline-none rounded"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleAdd();
                                            if (e.key === 'Escape') setIsEditing(false);
                                        }}
                                    />
                                    <div className="flex justify-between gap-1">
                                        <button onClick={handleAdd} className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded">OK</button>
                                        <button onClick={() => setIsEditing(false)} className="text-[10px] bg-gray-400 text-white px-2 py-0.5 rounded">X</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Active State: Link + - Button
                            <div className={postItClasses}>
                                {/* Deletion Button (-) */}
                                <button
                                    onClick={handleDelete}
                                    className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm text-xs font-bold"
                                    title="Delete Link"
                                >
                                    -
                                </button>

                                {/* REDIRECT LINK (ปัญหา) */}
                                <button
                                    onClick={handleJump}
                                    disabled={isValidating}
                                    className={`text-gray-800 font-bold text-sm underline hover:text-blue-700 decoration-2 transition-colors cursor-pointer flex items-center gap-1 ${isValidating ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    {isValidating && (
                                        <svg className="animate-spin h-3 w-3 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    Problem
                                </button>

                                {/* Small metadata ID display */}
                                <span className="absolute bottom-1 right-1 text-[8px] text-gray-500 italic opacity-50">#{problemId}</span>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default ProblemDirect;
