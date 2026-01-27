import { validateValue } from './validationUtils';

/**
 * Detects infinity symbol shortcuts (** or ***) and updates the form value.
 * 
 * @param {Event} e - The input change event
 * @param {string} name - Field name in react-hook-form
 * @param {function} setValue - setValue function from useFormContext
 * @returns {boolean} - true if replacement happened
 */
export const handleInfinityShortcut = (e, name, setValue) => {
    const val = e.target.value;
    if (val === '**' || val === '***') {
        setValue(name, '∞', { shouldValidate: true, shouldDirty: true });
        return true;
    }
    return false;
};

/**
 * Returns validation CSS class based on value and rules.
 * 
 * @param {any} val - Current value to validate
 * @param {object} options - Validation options (min, max, expectedValue, etc.)
 * @returns {string} - CSS class (bg-red-200 if invalid)
 */
export const getValidationClass = (val, options) => {
    const isValid = validateValue(val, options);
    return isValid ? '' : 'bg-red-200';
};
