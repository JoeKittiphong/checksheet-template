/**
 * Format Utility Functions
 * Handles number formatting, arrow addition for directions, and parsing input.
 */

/**
 * Formats a number with directional arrows based on axis.
 * @param {string|number} value - The value to format.
 * @param {string} axis - 'x' (horizontal) or 'y' (vertical).
 * @returns {string} - The formatted string with arrow (e.g., "5→", "←5", "↑5", "5↓").
 */
export const formatWithArrows = (value, axis) => {
    if (value === '' || value === undefined || value === null) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    if (num === 0) return '0';

    const absValue = Math.abs(num);
    const axisLower = axis.toLowerCase();

    if (axisLower === 'x') {
        // X-Axis: horizontal arrows
        // Positive: Right (→), Negative: Left (←)
        return num > 0 ? `${absValue}→` : `←${absValue}`;
    } else if (axisLower === 'y') {
        // Y-Axis: vertical arrows
        // Positive: Up (↑), Negative: Down (↓)
        return num > 0 ? `↑${absValue}` : `${absValue}↓`;
    }
    return value;
};

/**
 * Parses an input string containing numbers and arrows back into a standard number string.
 * Used for cleaning input before saving/calculating.
 * @param {string} value - The raw input string.
 * @returns {string} - The cleaned numeric string (e.g., "-5", "5").
 */
export const parseArrowInput = (value) => {
    if (value === '' || value === undefined || value === null) return '';

    // Handle Right Arrow / Up Arrow (Positive)
    if (value.includes('→') || value.includes('↑')) {
        const num = value.replace(/[→↑]/g, '').replace(/[^0-9.]/g, '');
        return num ? num : '';
    }

    // Handle Left Arrow / Down Arrow (Negative)
    if (value.includes('←') || value.includes('↓')) {
        const num = value.replace(/[←↓]/g, '').replace(/[^0-9.]/g, '');
        return num ? `-${num}` : '';
    }

    // Standard numeric cleanup (handles manual minus sign)
    const cleanValue = value.replace(/[^0-9.\-]/g, '');

    // Check for negative sign placement
    if (cleanValue.endsWith('-') || cleanValue.startsWith('-')) {
        const num = cleanValue.replace(/-/g, '');
        return num ? `-${num}` : '';
    }

    return cleanValue;
};

/**
 * Basic numeric input cleaner (removes all non-numeric chars except . and -)
 * @param {string} value 
 * @returns {string}
 */
export const cleanNumericInput = (value) => {
    return value.replace(/[^0-9.\-]/g, '');
};
