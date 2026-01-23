import React from 'react';

function SignatureModal({ isOpen, onClose, onConfirm, onDeny, user }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 print:hidden">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-300">
                <h3 className="text-lg font-bold mb-4 text-center">Confirm Signature</h3>
                <p className="mb-6 text-center text-gray-700">
                    Are you signing as <br />
                    <span className="font-bold text-blue-600 text-lg">{user?.username}</span>?
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-medium transition-colors"
                    >
                        Yes, Sign
                    </button>
                    <button
                        onClick={onDeny}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-medium transition-colors"
                    >
                        No, Switch User
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 text-xs text-gray-500 w-full text-center hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default SignatureModal;
