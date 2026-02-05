
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import FormItemCheck from './FormItemCheck';
import { useAuth } from "../../context/AuthContext";
import { useChecksheet } from "../../context/ChecksheetContext";
import SignatureModal from "../UIcomponent/SignatureModal";
import DateInput from "../UIcomponent/DateInput";

const FinalEDWwireCheck = ({ prefix = "" }) => {
    const { control, setValue, watch, formState: { errors } } = useFormContext();
    const { user, logout } = useAuth();
    const { handleSave } = useChecksheet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nameValue = watch(`${prefix}name`) || "";
    const dateValue = watch(`${prefix}date`) || "";

    const handleConfirm = () => {
        if (user) {
            setValue(`${prefix}name`, user.username, { shouldValidate: true });

            // Auto set date if empty
            if (!dateValue) {
                const now = new Date();
                const today = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
                setValue(`${prefix}date`, today, { shouldValidate: true });
            }
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
            <div className="border border-black p-1 w-full max-w-[280px] font-sans text-[10px] bg-white">
                <div className="space-y-1">
                    {/* Row 1: Judge */}
                    <div className="flex items-center">
                        <span className="w-10 font-bold">Judge</span>
                        <FormItemCheck name={`${prefix}judge_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        <FormItemCheck name={`${prefix}judge_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                    </div>

                    {/* Row 2: Line & XY-Size */}
                    <div className="flex items-center">
                        <div className="flex items-center w-1/2">
                            <span className="w-10 font-bold">Line</span>
                            <FormItemCheck name={`${prefix}line_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                            <FormItemCheck name={`${prefix}line_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        </div>
                        <div className="flex items-center w-1/2">
                            <span className="font-bold">/ XY-Size</span>
                            <FormItemCheck name={`${prefix}xy_size_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                            <FormItemCheck name={`${prefix}xy_size_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        </div>
                    </div>

                    {/* Row 3: Ra/Rz & Size */}
                    <div className="flex items-center">
                        <div className="flex items-center w-1/2">
                            <span className="w-10 font-bold">Ra/Rz</span>
                            <FormItemCheck name={`${prefix}ra_rz_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                            <FormItemCheck name={`${prefix}ra_rz_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        </div>
                        <div className="flex items-center w-1/2">
                            <span className="font-bold">/ Size . . .</span>
                            <FormItemCheck name={`${prefix}size_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                            <FormItemCheck name={`${prefix}size_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        </div>
                    </div>

                    {/* Row 4: Barrel */}
                    <div className="flex items-center">
                        <span className="w-10 font-bold">Barrel</span>
                        <FormItemCheck name={`${prefix}barrel_ok`} label="OK" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                        <FormItemCheck name={`${prefix}barrel_ng`} label="NG" checkboxSize="w-3.5 h-3.5" labelClassName="text-[10px]" />
                    </div>

                    {/* Row 5: Date, Name */}
                    <div className="flex items-end justify-between pt-1">
                        <div className="flex items-center gap-1">
                            <span className="font-bold shrink-0">Date:</span>
                            <Controller
                                name={`${prefix}date`}
                                control={control}
                                render={({ field }) => (
                                    <DateInput
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        className="border-b border-black w-20 outline-none px-1 text-[10px] text-center"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold shrink-0">Name:</span>
                            <input
                                type="text"
                                {...control.register(`${prefix}name`)}                                
                                readOnly={!!user}
                                onClick={() => user && setIsModalOpen(true)}
                                placeholder={user ? "Click to sign" : ""}
                                className={`border-b border-black w-28 outline-none px-1 text-[10px] text-center ${user ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                            />
                        </div>
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
};

export default FinalEDWwireCheck;
