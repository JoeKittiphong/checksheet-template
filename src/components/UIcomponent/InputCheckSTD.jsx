import React from 'react';
import { validateValue } from '../../utils/validationUtils';

/**
* InputCheckSTD Component
* Input พร้อม label ด้านหน้า และหน่วยด้านหลัง
* - มีการ validate ค่าตาม standard (min/max)
* - สามารถเปิด/ปิดการ validate ได้
* 
* @param {Object} props
* @param {string} props.label - ข้อความด้านหน้า input
* @param {string} props.unit - หน่วยด้านหลัง input (default: 'mm')
* @param {string|number} props.value - ค่าใน input
* @param {Function} props.onChange - callback เมื่อค่าเปลี่ยน
* @param {number} props.minStd - ค่า standard ต่ำสุด (default: 0)
* @param {number} props.maxStd - ค่า standard สูงสุด (default: 0)
* @param {boolean} props.validateStd - เปิด/ปิดการ validate (default: true)
* @param {string} props.inputWidth - ความกว้างของ input (default: 'w-24')
*/
const InputCheckSTD = React.forwardRef(({
    label = '',
    unit = 'mm',
    value = '',
    onChange = () => { },
    minStd = 0,
    maxStd = 0,
    validateStd = true,
    inputWidth = 'w-24',
    showCheckbox = false,
    checkboxProps = {}
}, ref) => {
    // Validate value against standard
    const isValid = () => {
        return validateValue(value, {
            min: minStd,
            max: maxStd,
            validateStd,
            useAbs: false
        });
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Allow numbers, decimal point, and minus sign
        let cleanValue = inputValue.replace(/[^0-9.-]/g, '');

        // Ensure only one minus sign and it must be at the beginning
        if (cleanValue.includes('-')) {
            const isNegative = cleanValue.startsWith('-');
            cleanValue = (isNegative ? '-' : '') + cleanValue.replace(/-/g, '');
        }

        // Ensure only one decimal point
        const parts = cleanValue.split('.');
        if (parts.length > 2) {
            cleanValue = parts[0] + '.' + parts.slice(1).join('');
        }

        onChange(cleanValue);
    };

    return (
        <div className="flex items-center text-sm">
            {/* Checkbox */}
            {showCheckbox && (
                <input
                    type="checkbox"
                    {...checkboxProps}
                    className="w-4 h-4 mr-2 border-black border-2 rounded-sm shrink-0"
                />
            )}

            {/* Label */}
            <span className="mr-2 whitespace-nowrap">{label}</span>

            {/* Input */}
            <input
                ref={ref}
                type="text"
                inputMode="decimal"
                value={value}
                onChange={handleChange}
                className={`border-b border-black outline-none px-1 text-center ${inputWidth} ${!isValid() ? 'bg-red-200' : ''}`}
            />

            {/* Unit */}
            <span className="ml-2 whitespace-nowrap">{unit}</span>
        </div>
    );
});

export default InputCheckSTD;
