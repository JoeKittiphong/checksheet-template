import { useEffect, useRef } from 'react';

/**
 * Hook to handle auto-saving form data to localStorage
 * @param {Object} methods - react-hook-form methods object
 * @param {string} key - Unique key for localStorage
 * @param {Object} [options] - Options
 * @param {number} [options.debounceMs=1000] - Debounce time in ms
 */
export const useAutoSave = (methods, key, options = {}) => {
    const { debounceMs = 1000 } = options;
    const timeoutRef = useRef(null);

    // Watch for changes and save to localStorage
    useEffect(() => {
        if (!key) return;

        const subscription = methods.watch((value) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    console.log(`[AutoSave] Saved to ${key}`);
                } catch (error) {
                    console.error('[AutoSave] Failed to save to localStorage:', error);
                }
            }, debounceMs);
        });

        return () => {
            subscription.unsubscribe();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [methods, key, debounceMs]);

    // Function to retrieve saved data
    const getSavedData = () => {
        if (!key) return null;
        try {
            const savedItem = localStorage.getItem(key);
            return savedItem ? JSON.parse(savedItem) : null;
        } catch (error) {
            console.error('[AutoSave] Failed to load from localStorage:', error);
            return null;
        }
    };

    // Function to clear saved data
    const clearSavedData = () => {
        if (!key) return;
        try {
            localStorage.removeItem(key);
            console.log(`[AutoSave] Cleared ${key}`);
        } catch (error) {
            console.error('[AutoSave] Failed to clear localStorage:', error);
        }
    };

    return { getSavedData, clearSavedData };
};
