/**
 * SignBox Component
 * กล่องลงนาม Checked By และ Approved By
 */
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useChecksheet } from "../../context/ChecksheetContext";
import SignatureModal from "./SignatureModal";

function SignBox({
    formData = {},
    onChange = () => { }
}) {
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet(); // Global save
    const [modalState, setModalState] = useState({ isOpen: false, roleType: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const handleSignClick = (roleType) => {
        if (user) {
            setModalState({ isOpen: true, roleType });
        }
    };

    const handleConfirm = () => {
        if (user && modalState.roleType) {
            const updates = {};
            const roleType = modalState.roleType;

            if (roleType === 'check') {
                updates.checkCode = user.code;
                updates.checkName = user.username;
            } else if (roleType === 'approve') {
                updates.approveCode = user.code;
                updates.approveName = user.username;
            }

            onChange(updates);
        }
        setModalState({ isOpen: false, roleType: null });
    };

    const handleDeny = async () => {
        setModalState({ isOpen: false, roleType: null });
        try {
            await handleSave();
        } catch (err) {
            console.error("Save failed before logout", err);
            alert("Save failed, but logging out.");
        } finally {
            logout();
        }
    };

    const bgHeader = 'bg-gray-300';

    return (
        <>
            <div className="mr-10 mt-12 flex justify-end">
                <div className="w-[45%] border border-black text-sm">
                    {/* Checked By */}
                    <div className={`${bgHeader} text-center border-b border-black font-medium py-1 relative group`}>
                        CHECKED BY
                    </div>
                    <div className="grid grid-cols-2 border-b border-black">
                        <div className="border-r border-black text-center py-1 bg-white">Code.</div>
                        <div className="text-center py-1 bg-white">Name</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-black h-16 bg-yellow-300">
                        <div className="border-r border-black h-full">
                            <input
                                name="checkCode"
                                value={formData.checkCode || ''}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none cursor-pointer"
                                placeholder={user ? "Click to sign" : ""}
                                onClick={() => handleSignClick('check')}
                                readOnly={!!user}
                            />
                        </div>
                        <div className="h-full">
                            <input
                                name="checkName"
                                value={formData.checkName || ''}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none cursor-pointer"
                                onClick={() => handleSignClick('check')}
                                readOnly={!!user}
                            />
                        </div>
                    </div>

                    {/* Approved By */}
                    <div className={`${bgHeader} text-center border-b border-black font-medium py-1 relative group`}>
                        APPROVED BY
                    </div>
                    <div className="grid grid-cols-2 border-b border-black">
                        <div className="border-r border-black text-center py-1 bg-white">Code.</div>
                        <div className="text-center py-1 bg-white">Name</div>
                    </div>
                    <div className="grid grid-cols-2 h-16 bg-yellow-300">
                        <div className="border-r border-black h-full">
                            <input
                                name="approveCode"
                                value={formData.approveCode || ''}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none cursor-pointer"
                                placeholder={user ? "Click to sign" : ""}
                                onClick={() => handleSignClick('approve')}
                                readOnly={!!user}
                            />
                        </div>
                        <div className="h-full">
                            <input
                                name="approveName"
                                value={formData.approveName || ''}
                                onChange={handleChange}
                                className="w-full h-full bg-transparent text-center outline-none cursor-pointer"
                                onClick={() => handleSignClick('approve')}
                                readOnly={!!user}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <SignatureModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, roleType: null })}
                onConfirm={handleConfirm}
                onDeny={handleDeny}
                user={user}
            />
        </>
    );
}

export default SignBox;
