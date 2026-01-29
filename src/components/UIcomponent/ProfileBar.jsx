import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useKeypad } from "../../context/KeypadContext";

/**
 * ProfileBar Component
 * Displays:
 * - User Info: Code, Name, Role
 * - Actions: Save, Print
 * 
 * Logic:
 * - Hides Print button if user.role === 'worker'
 */
function ProfileBar({ onSave, onPrint, isSaving }) {
    const { user } = useAuth();
    const { isKeypadEnabled, toggleKeypadEnabled } = useKeypad();

    if (!user) return null;

    const isWorker = user.role === 'worker';

    const [showExitModal, setShowExitModal] = useState(false);

    return (
        <>
            {showExitModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">บันทึกข้อมูลเรียบร้อย</h3>
                        <p className="text-gray-600 mb-6">ต้องการทำรายการต่อ หรือกลับหน้าหลัก?</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                            >
                                ทำรายการต่อ
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                กลับหน้าหลัก
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full bg-gray-800 text-white px-4 py-2 flex justify-between items-center shadow-md print:hidden sticky top-0 z-50">
                {/* User Profile Info */}
                <div className="flex space-x-6 text-sm">
                    <div className="flex items-center">
                        <span className='text-gray-400 mr-2'>ผู้ใช้งาน</span>
                        <span className="font-semibold">{user.code || '-'}</span>
                        <span className='text-gray-400 mr-2 ml-2'> : </span>
                        <span className="font-semibold">{user.username || '-'}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-400 mr-2">ตำแหน่ง:</span>
                        <span className={`font-semibold px-2 py-0.5 rounded ${isWorker ? 'bg-yellow-600' : 'bg-blue-600'
                            }`}>
                            {user.role || '-'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <button
                        onClick={toggleKeypadEnabled}
                        title={isKeypadEnabled ? "Disable Virtual Keypad" : "Enable Virtual Keypad"}
                        className={`flex items-center px-3 py-1.5 rounded transition-colors ${isKeypadEnabled
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                            }`}
                    >
                        <span className="mr-2">⌨️</span>
                        <span className="text-xs font-bold">{isKeypadEnabled ? 'ON' : 'OFF'}</span>
                    </button>

                    <button
                        onClick={async () => {
                            if (onSave) {
                                try {
                                    const result = await onSave();
                                    if (result && result.success) {
                                        setShowExitModal(true);
                                    }
                                } catch (error) {
                                    console.error("Save failed:", error);
                                }
                            }
                        }}
                        disabled={isSaving}
                        className={`flex items-center px-4 py-1.5 rounded transition-colors ${isSaving
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <span className="mr-2">💾</span> Save DB
                            </>
                        )}
                    </button>

                    {!isWorker && (
                        <button
                            onClick={onPrint}
                            className="flex items-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                            <span className="mr-2">🖨️</span> Print PDF
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProfileBar;
