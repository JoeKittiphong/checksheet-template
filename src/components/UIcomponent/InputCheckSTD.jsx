import React from 'react';
import { useFormContext, Controller } from 'react-hook-form'; // Add Controller
import { validateValue } from '../../utils/validationUtils';
import { useKeypad } from '../../context/KeypadContext';
import TristateCheckbox from '@/components/UIcomponent/TristateCheckbox'; // Add TristateCheckbox

/**
* InputCheckSTD Component
* ...
* @param {boolean} props.required - บังคับกรอกหรือไม่ (default: true)
*/
const InputCheckSTD = React.forwardRef(({
    label = '',
    unit = 'mm',
    value = '', // Note: value here comes from Controller usually, but if using register directly we might rely on watch or internal logic. The user uses Controller in some places? 
    // Wait, the previous code didn't use useFormContext inside, it relied on parent passing props? 
    // Actually typically we forwardRef for register. 
    // Let's check how it's used. It receives `ref` and `name`. 
    // If we use `{...register(name)}` in parent, `ref` is passed here.
    // BUT, we want to enforce required INSIDE component to avoid editing parent.
    // The issue: If parent does `<InputCheckSTD {...register('foo')} />`, the *props* contain the register methods (onChange, onBlur, ref).
    // The validation rules are usually passed to register(). 
    // If the parent ALREADY calls register(), we can't easily injection validation rules *here* unless we intercept the register call, which is hard if passed as spread props.
    // HOWEVER, checking `Page1.jsx`: It uses specific components like `FormLevelTableYAB`.
    // Let's look at `FormLevelTableYAB` or `FormChecknumber` to see how they render `InputCheckSTD`.
    // If they use `Controller`, we need to update the rules in Controller.
    // If they use `register`, we need to update that.

    // Let's look at `InputCheckSTD` usage first. 
    // Be careful. If I change this to use `useFormContext().register` BUT the parent ALSO registers, it might conflict.
    // BUT the user accepted "Edit Component".

    // Let's assume standard usage is: `FormChecknumber` wraps `InputCheckSTD`.
    // Let's view `FormChecknumber` or `FormLevelTableYAB` first to be safe.
    onChange = () => { },
    minStd = 0,
    maxStd = 0,
    validateStd = true,
    inputWidth = 'w-24',
    showCheckbox = false,
    checkboxProps = {},
    checkboxName, // New prop for Tristate
    name, // Received from Controller/Register
    required = true, // New prop
}, ref) => {
    const { openKeypad, isKeypadEnabled } = useKeypad();
    const { control, formState: { errors } } = useFormContext(); // Get validation errors and control
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check if this specific field has an error
    // Note: name might be nested "page1.levelYData.0.a". errors object is deep.
    // Helper to get error from path
    const getError = (obj, path) => {
        return path?.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
    const hasError = name ? getError(errors, name) : false;

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

    const handleInputClick = (e) => {
        if (isMobile || isKeypadEnabled) {
            e.target.blur();
            openKeypad(name, value, { label, mode: (name?.includes('machine_no') || label?.toLowerCase().includes('name')) ? 'text' : 'numeric' });
        }
    };

    return (
        <div className="flex items-center text-sm">
            {showCheckbox && (
                <Controller
                    name={checkboxName}
                    control={control}
                    rules={{ validate: (v) => !required || (v !== null && v !== undefined && v !== '') || "Required" }}
                    render={({ field, fieldState: { error } }) => (
                        <TristateCheckbox
                            value={field.value}
                            onChange={field.onChange}
                            error={!!error}
                            className="mr-2 shrink-0"
                            size="w-4 h-4"
                        />
                    )}
                />
            )}

            {/* Label */}
            <span className="mr-2 whitespace-nowrap">{label}</span>

            {/* Input */}
            <input
                ref={ref}
                type="text"
                inputMode={isMobile ? "none" : "decimal"} // Allow decimal input on PC
                value={value}
                onClick={handleInputClick}
                onFocus={(e) => {
                    if (isMobile) {
                        e.target.blur();
                        // Force open on mobile focus (in case of tab)
                        openKeypad(name, value, { label, mode: (name?.includes('machine_no') || label?.toLowerCase().includes('name')) ? 'text' : 'numeric' });
                    }
                }}
                readOnly={isMobile} // Only readOnly on mobile
                onChange={(e) => {
                    // PC Typing Logic
                    if (!isMobile) {
                        handleChange(e);
                    }
                }}
                className={`border-b outline-none px-1 text-center cursor-pointer ${inputWidth} 
                    ${!isValid() ? 'bg-red-200' : ''}
                    ${hasError ? 'border-red-500 bg-red-100 ring-1 ring-red-500' : 'border-black'} 
                `}
            />

            {/* Unit */}
            <span className="ml-2 whitespace-nowrap">{unit}</span>
        </div>
    );
});

export default InputCheckSTD;
