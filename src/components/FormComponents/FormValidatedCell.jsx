import React from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';

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
    const val = watch(name);

    // ทำการ Validate ค่าแบบ real-time
    const isValid = validateValue(val, { min, max });

    return (
        <td className={`border border-black px-2 py-1 ${!isValid ? 'bg-red-200' : ''} ${className}`}>
            <input
                type="text"
                {...register(name)}
                placeholder={placeholder}
                className={`w-full bg-transparent outline-none text-center ${inputClassName}`}
                {...props}
            />
        </td>
    );
};

export default FormValidatedCell;
