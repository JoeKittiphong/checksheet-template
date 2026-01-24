import React, { useRef } from 'react';

/**
 * DateInput Component
 * - Displays date in DD/MM/YYYY format (text).
 * - Switches to native date picker (YYYY-MM-DD) on focus/click.
 * - Converts selected date back to DD/MM/YYYY on change.
 */
function DateInput({
    value = '',
    onChange,
    className = '',
    placeholder = 'DD/MM/YYYY',
    readOnly = false,
    disabled = false,
    style = {}
}) {
    const inputRef = useRef(null);

    // Helpers
    const toISO = (dateStr) => {
        if (!dateStr) return '';
        const [d, m, y] = dateStr.split('/');
        if (!d || !m || !y) return '';
        return `${y}-${m}-${d}`;
    };

    const toDisplay = (isoDate) => {
        if (!isoDate) return '';
        const [y, m, d] = isoDate.split('-');
        return `${d}/${m}/${y}`;
    };

    const handleFocus = (e) => {
        if (readOnly || disabled) return;
        e.target.type = 'date';
        // Set value to ISO format so picker recognizes it
        const isoValue = toISO(value);
        e.target.value = isoValue; // Direct manipulation for type switch

        // Open picker immediately if supported
        try {
            if (e.target.showPicker) e.target.showPicker();
        } catch (err) { }
    };

    const handleBlur = (e) => {
        if (readOnly || disabled) return;
        e.target.type = 'text';
        e.target.value = value; // Restore display format from prop
    };

    const handleChange = (e) => {
        // e.target.value is YYYY-MM-DD from date input
        const newValue = e.target.value;
        if (!newValue) {
            onChange('');
            return;
        }
        const displayValue = toDisplay(newValue);
        onChange(displayValue);

        // Remove focus immediately after selection (restores text type)
        e.target.blur();
    };

    // We need to handle the render value carefully.
    // If we are just using onFocus/onBlur to switch types, reliability depends on when render happens.
    // Simpler approach: 
    // Just keep it simple.

    return (
        <input
            ref={inputRef}
            type="text"
            className={className}
            style={style}
            placeholder={placeholder}
            value={value} // Controlled display value (DD/MM/YYYY)
            disabled={disabled}
            readOnly={readOnly}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={handleFocus} // Ensure click also triggers
        />
    );
}

export default DateInput;
