import React from 'react';
import { useFormContext, Controller } from 'react-hook-form'; // Add Controller
import { handleInfinityShortcut, getValidationClass } from '../../utils/formUtils';
import TristateCheckbox from '@/components/UIcomponent/TristateCheckbox'; // Add TristateCheckbox

/**
 * FormItemCheck Component
 * component สำหรับสร้าง Checkbox พร้อม Label และ Input text (optional)
 * 
 * Supports layouts:
 * 1. Checkbox + Text
 * 2. Checkbox + Text + Input
 * 3. Checkbox + Text + Input + Suffix
 * 4. Checkbox + Multiple Items (using generic 'items' prop)
 * 
 * @param {string} name - ชื่อ field ของ checkbox (required)
 * @param {string} label - ข้อความ label (required for basic mode)
 * @param {object} input - ข้อมูลสำหรับ input field (optional, basic mode)
 * @param {Array} items - อาร์เรย์ของ items สำหรับโหมด Advance (label, input, date, etc.)
 * @param {string} className - คลาสเพิ่มเติมสำหรับ container
 */
const FormItemCheck = ({
    name,
    label,
    input,
    items,
    className = "",
    showCheckbox = true
}) => {
    const { register, watch, setValue, control, formState: { errors } } = useFormContext();

    const getNestedError = (obj, path) => {
        return path && path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // --- Helper to render specific item types ---
    const renderItem = (item, index) => {
        if (item.label) {
            return (
                <span key={`label-${index}`} className="text-sm whitespace-pre-wrap">
                    {item.label}
                </span>
            );
        }
        if (item.input) {
            const val = watch(item.input.name);
            const validationClass = getValidationClass(val, {
                min: item.input.minStd,
                max: item.input.maxStd,
                expectedValue: item.input.expectedValue,
                validateStd: item.input.validateStd ?? true
            });

            const error = getNestedError(errors, item.input.name);

            return (
                <div key={`input-${index}`} className="flex items-center gap-1">
                    <input
                        type={item.input.type || "text"}
                        {...register(item.input.name, { required: true })}
                        onChange={(e) => {
                            register(item.input.name).onChange(e);
                            handleInfinityShortcut(e, item.input.name, setValue);
                        }}
                        defaultValue={item.input.defaultValue || ""}
                        style={{ width: item.input.width || '150px' }}
                        className={`border-b ${error ? 'border-red-500' : 'border-black'} text-center text-sm outline-none px-1 ${validationClass}`}
                    />
                    {item.input.suffix && (
                        <span className="text-sm">
                            {item.input.suffix}
                        </span>
                    )}
                </div>
            );
        }
        return null; // Fallback
    };

    return (
        <div className={`flex items-start gap-2 ${className}`}>
            {/* Checkbox */}
            {/* Checkbox */}
            {showCheckbox && (
                <Controller
                    name={name}
                    control={control}
                    rules={{ validate: (v) => (v !== null && v !== undefined && v !== '') || "Required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TristateCheckbox
                            value={field.value}
                            onChange={field.onChange}
                            error={!!error}
                            className="mr-2 shrink-0 mt-0.5"
                            size="w-5 h-5"
                        />
                    )}
                />
            )}

            {/* --- Mode 1: Items Array (Advance) --- */}
            {items && items.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {items.map((item, idx) => renderItem(item, idx))}
                </div>
            ) : (
                /* --- Mode 2: Legacy (Label + Optional Input) --- */
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-start gap-2 flex-wrap">
                        {/* Label */}
                        <span className="text-sm whitespace-pre-wrap">
                            {label}
                        </span>

                        {/* Optional Input */}
                        {input && (() => {
                            const val = watch(input.name);
                            const error = getNestedError(errors, input.name);
                            const validationClass = getValidationClass(val, {
                                min: input.minStd,
                                max: input.maxStd,
                                expectedValue: input.expectedValue,
                                validateStd: input.validateStd ?? true
                            });

                            return (
                                <div className="flex items-center gap-1 shrink-0">
                                    <input
                                        type={input.type || "text"}
                                        {...register(input.name, { required: true })}
                                        onChange={(e) => {
                                            register(input.name).onChange(e);
                                            handleInfinityShortcut(e, input.name, setValue);
                                        }}
                                        defaultValue={input.defaultValue || ""}
                                        style={{ width: input.width || '150px' }}
                                        className={`border-b ${error ? 'border-red-500' : 'border-black'} text-center text-sm outline-none px-1 ${validationClass}`}
                                    />
                                    {input.suffix && (
                                        <span className="text-sm">
                                            {input.suffix}
                                        </span>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormItemCheck;
