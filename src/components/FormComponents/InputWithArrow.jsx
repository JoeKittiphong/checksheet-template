import React, { useState, useEffect } from 'react';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';

/**
 * InputWithArrow Component
 * 
 * An input component that formats numeric values with arrow indicators 
 * (↑ for positive, ↓ for negative) when not focused.
 * Used primarily for Y-axis leveling checks.
 * 
 * @param {Object} props
 * @param {string|number} props.value - The current value
 * @param {Function} props.onChange - Callback when value changes
 * @param {Function} props.onBlur - Callback when input loses focus
 * @param {string} props.className - Additional CSS classes
 */
const InputWithArrow = ({
    value,
    onChange,
    onBlur,
    className = "",
    inputRef,
    axis,
    showArrows,
    ...props
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Update local input string when value changes externally (and not editing)
    useEffect(() => {
        if (!isEditing) {
            // We do nothing here as we derive display value directly in render
            // But if we wanted to support external updates while editing, we'd need logic here
        }
    }, [value, isEditing]);

    const handleFocus = (e) => {
        setIsEditing(true);
        setInputValue(value === null || value === undefined ? '' : value.toString());
        if (props.onFocus) props.onFocus(e);
    };

    const handleChange = (e) => {
        const cleaned = cleanNumericInput(e.target.value);
        setInputValue(cleaned);
    };

    const handleBlur = (e) => {
        setIsEditing(false);
        const parsed = parseArrowInput(inputValue); // Handles conversion to number
        onChange(parsed);
        if (onBlur) onBlur(e);
    };

    const handleKeyDown = (e) => {
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    };

    // Determine what to show: raw input value triggers editing, otherwise formatted value
    const displayValue = isEditing ? inputValue : (showArrows === false ? inputValue : formatWithArrows(value, axis || 'y'));

    return (
        <input
            {...props}
            ref={inputRef}

            type="text"
            inputMode="numeric"
            value={displayValue}
            // ... (rest of props)
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`text-center bg-transparent outline-none w-full h-full ${className}`}
        />
    );
};

export default InputWithArrow;
