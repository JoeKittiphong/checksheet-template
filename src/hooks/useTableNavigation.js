import { useRef, useCallback } from 'react';

/**
 * useTableNavigation - Hook for managing focus in a table grid.
 * 
 * Usage:
 * const { registerInput, handleKeyDown } = useTableNavigation();
 * 
 * <input 
 *   ref={registerInput(rowIndex, colKey)}
 *   onKeyDown={(e) => handleKeyDown(e, rowIndex, colKey)}
 * />
 */
export const useTableNavigation = () => {
    // Stores refs in a 2D-like structure: refs.current[rowIndex][colKey] = element
    const refs = useRef({});

    const registerInput = useCallback((rowIndex, colKey) => (el) => {
        if (!refs.current[rowIndex]) {
            refs.current[rowIndex] = {};
        }
        if (el) {
            refs.current[rowIndex][colKey] = el;
        } else {
            delete refs.current[rowIndex][colKey];
        }
    }, []);

    const focusCell = (rowIndex, colKey) => {
        if (refs.current[rowIndex] && refs.current[rowIndex][colKey]) {
            refs.current[rowIndex][colKey].focus();
            return true;
        }
        return false;
    };

    const handleKeyDown = useCallback((e, rowIndex, colKey, totalRows, columns) => {
        // e: KeyboardEvent
        // rowIndex: number
        // colKey: string (current column key)
        // totalRows: number (optional, for boundary check)
        // columns: string[] (ordered array of column keys, for left/right navigation)

        if (e.key === 'Enter') {
            e.preventDefault();
            // Enter usually moves down, Shift+Enter moves up
            const direction = e.shiftKey ? -1 : 1;
            focusCell(rowIndex + direction, colKey);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusCell(rowIndex + 1, colKey);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusCell(rowIndex - 1, colKey);
        } else if (e.key === 'ArrowRight') {
            if (e.target.selectionStart === e.target.value.length) { // Only move if cursor at end
                if (columns) {
                    const currentColIndex = columns.indexOf(colKey);
                    if (currentColIndex !== -1 && currentColIndex < columns.length - 1) {
                        e.preventDefault();
                        focusCell(rowIndex, columns[currentColIndex + 1]);
                    }
                }
            }
        } else if (e.key === 'ArrowLeft') {
            if (e.target.selectionStart === 0) { // Only move if cursor at start
                if (columns) {
                    const currentColIndex = columns.indexOf(colKey);
                    if (currentColIndex > 0) {
                        e.preventDefault();
                        focusCell(rowIndex, columns[currentColIndex - 1]);
                    }
                }
            }
        }
    }, []);

    return { registerInput, handleKeyDown, focusCell };
};
