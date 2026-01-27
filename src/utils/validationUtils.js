/**
 * Centralized validation utility for Checksheet components
 * Handles various validation scenarios including range checks, absolute value checks,
 * direction/sign checks, and maximum limit checks.
 */

/**
 * Validates a value against standard rules.
 * 
 * @param {string|number} value - The input value to validate
 * @param {Object} options - Validation options
 * @param {number} [options.min] - Minimum allowed value for range check
 * @param {number} [options.max] - Maximum allowed value for range check
 * @param {number} [options.maxValue] - Maximum allowed absolute value (simplified limit check)
 * @param {number} [options.maxDiff] - Maximum allowed difference value
 * @param {string} [options.arrow] - Direction constraint ('+', '-', 'up', 'down')
 * @param {boolean} [options.useAbs] - Whether to use absolute value for range comparison (default: false)
 * @param {boolean} [options.validateStd] - Master switch to enable/disable validation (default: true)
 * @returns {boolean} - true if valid, false otherwise
 */
export const validateValue = (value, options = {}) => {
    const {
        min = null,
        max = null,
        maxValue = null,
        maxDiff = null,
        arrow = null,
        useAbs = false,
        validateStd = true,
        expectedValue = null // New: specifically for '∞' or exact matches
    } = options;

    // 1. Master switch
    if (validateStd === false) return true;

    // 2. Empty check
    if (value === '' || value === undefined || value === null) return true;

    // 3. Infinity Check Logic
    if (value === '∞') {
        // If we expect infinity or have no numeric range, it's valid
        if (expectedValue === '∞') return true;
        // If we have a range but infinity is entered, it's invalid unless explicitly allowed
        return false;
    }

    // 4. Expected Value Check (Exact match)
    if (expectedValue === '∞' && value !== '∞') {
        return false; // Expected infinity but got something else
    }

    // 5. Numeric check
    const num = parseFloat(value);
    if (isNaN(num)) return true; // Treat other non-numeric as valid strings (e.g. "N/A")

    // 6. Max Value Check (Absolute Limit)
    if (maxValue !== null) {
        if (Math.abs(num) > maxValue) return false;
    }

    // 7. Max Diff Check
    if (maxDiff !== null) {
        if (Math.abs(num) > maxDiff) return false;
    }

    // 8. Range Check (Min/Max)
    if (min !== null && max !== null) {
        let valToCheck = num;
        let minLimit = min;
        let maxLimit = max;

        if (useAbs) {
            valToCheck = Math.abs(num);
            minLimit = Math.min(Math.abs(min), Math.abs(max));
            maxLimit = Math.max(Math.abs(min), Math.abs(max));
        }

        if (valToCheck < minLimit || valToCheck > maxLimit) return false;
    }

    // 9. Direction/Arrow Check
    if (arrow) {
        if ((arrow === '-' || arrow === 'down') && num > 0) return false;
        if ((arrow === '+' || arrow === 'up') && num < 0) return false;
    }

    return true;
};
