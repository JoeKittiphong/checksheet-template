import { useCallback } from 'react';

/**
 * useFocusNavigation Hook
 * Handles focus movement logic for grid/list inputs.
 */
export const useFocusNavigation = () => {

    /**
     * Move focus to the next/prev element in the ref array.
     * @param {Event} e - Keyboard event
     * @param {number} currentIndex - Current index in the array
     * @param {Array} refs - The array of refs (current.refs)
     * @param {Object} options - Configuration
     * @param {number} [options.direction=1] - 1 for forward, -1 for backward
     * @param {Function} [options.onBoundary] - Callback when edge is reached (e.g. invalid next index)
     * @param {boolean} [options.preventDefault=true] - Whether to prevent default Enter behavior
     */
    /**
     * Programmatic focus move.
     */
    const focusNext = useCallback((currentIndex, refs, { direction = 1, onBoundary } = {}) => {
        if (!refs) return;
        let nextIndex = currentIndex + direction;

        // Loop to find the next existing ref (skip null/undefined holes)
        while (nextIndex >= 0 && nextIndex < refs.length) {
            const el = refs[nextIndex];
            if (el) {
                el.focus();
                return; // Focus found and set
            }
            // If el is null, continue skipping in the same direction
            nextIndex += direction;
        }

        // If we exit the loop, we hit the boundary
        if (onBoundary) onBoundary();
    }, []);

    const moveFocus = useCallback((e, currentIndex, refs, options = {}) => {
        if (e.key === 'Enter') {
            if (options.preventDefault !== false) e.preventDefault();
            focusNext(currentIndex, refs, options);
        }
    }, [focusNext]);

    return { moveFocus, focusNext };
};
