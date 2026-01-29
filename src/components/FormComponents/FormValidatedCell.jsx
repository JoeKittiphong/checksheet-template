import React from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { useKeypad } from '../../context/KeypadContext';

/**
 * FormValidatedCell Component
 * ช่องตาราง (td) ที่มี input ภายในและระบบ Validation ในตัว
 * 
 * @param {string} name - ชื่อ field สำหรับ react-hook-form
 * @param {number} min - ค่าต่ำสุดที่ยอมรับ
 * @param {number} max - ค่าสูงสุดที่ยอมรับ
 * @param {string} className - คลาสสำหรับ <td> (เช่น bg color, width)
 * @param {string} inputClassName - คลาสสำหรับ <input>
 * @param {string} placeholder - placeholder สำหรับ input
 */
const FormValidatedCell = ({
    name,
    min,
    max,
    className = "",
    inputClassName = "",
    placeholder = "-",
    ...props
}) => {
    const { register, watch } = useFormContext();
    const { openKeypad, isKeypadEnabled } = useKeypad();
    const val = watch(name);

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // ทำการ Validate ค่าแบบ real-time
    const isValid = validateValue(val, { min, max });

    return (
        <td className={`border border-black px-2 py-1 ${!isValid ? 'bg-red-200' : ''} ${className}`}>
            <input
                type="text"
                {...register(name)}
                placeholder={placeholder}
                inputMode={isMobile ? "none" : "text"}
                readOnly={isMobile}
                onClick={() => {
                    if (isMobile || isKeypadEnabled) {
                        openKeypad(name, watch(name), { label: placeholder === '-' ? name : placeholder, mode: 'numeric' });
                    }
                }}
                onFocus={(e) => {
                    if (isMobile) {
                        e.target.blur();
                        openKeypad(name, watch(name), { label: placeholder === '-' ? name : placeholder, mode: 'numeric' });
                    }
                }}
                className={`w-full bg-transparent outline-none text-center cursor-pointer ${inputClassName}`}
                {...props}
            />
        </td>
    );
};

export default FormValidatedCell;
