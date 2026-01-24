import React from 'react';
import { useAuth } from "../../context/AuthContext";

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

    if (!user) return null;

    const isWorker = user.role === 'worker';

    return (
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
                    onClick={onSave}
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
    );
}

export default ProfileBar;
