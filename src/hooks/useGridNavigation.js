/**
 * useGridNavigation Hook
 * Handles 2D navigation (Up/Down/Left/Right) for a grid of inputs.
 * 
 * @param {Object} options
 * @param {number} options.rows - Total number of rows
 * @param {number} options.cols - Total number of columns
 * @param {boolean} [options.loop=false] - Whether to loop navigation at edges (optional)
 * @param {Function} [options.onEnter] - Callback when Enter is pressed (optional)
 */
import { useRef, useCallback } from 'react';

export const useGridNavigation = ({ rows, cols, loop = false, onEnter }) => {
    // 2D Array of refs [row][col]
    const gridRefs = useRef([]);

    // Initialize/Ensures the grid structure exists
    if (gridRefs.current.length !== rows) {
        gridRefs.current = Array(rows).fill(null).map(() => Array(cols).fill(null));
    }

    /**
     * Set a ref for a specific cell
     * Usage: ref={el => setRef(el, rowIndex, colIndex)}
     */
    const setRef = useCallback((el, r, c) => {
        if (!gridRefs.current[r]) {
            gridRefs.current[r] = [];
        }
        gridRefs.current[r][c] = el;
    }, []);

    /**
     * Move focus to a specific cell
     */
    const focusCell = useCallback((r, c) => {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const el = gridRefs.current[r]?.[c];
            if (el && !el.disabled) {
                el.focus();
                // Select text if it's an input
                if (el.tagName === 'INPUT') {
                    // setTimeout to ensure focus happens before select in some browsers/contexts
                    setTimeout(() => el.select(), 0);
                }
                return true;
            }
        }
        return false;
    }, [rows, cols]);

    /**
     * Handle KeyDown event
     * Usage: onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
     */
    const handleKeyDown = useCallback((e, r, c) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                focusCell(r - 1, c);
                break;
            case 'ArrowDown':
                e.preventDefault();
                focusCell(r + 1, c);
                break;
            case 'ArrowLeft':
                // Only move left if cursor is at start or it's not a text input? 
                // Usually for grids, we want direct navigation. 
                // But for number inputs, Left/Right might be needed for editing.
                // Standard behavior: Ctrl+Left/Right or just if empty/selection at start.
                // For simplicity in this checksheet context (often number only), let's prioritize navigation
                // if the input is empty or selection is at boundaries, OR just always navigate (fast entry).
                // Given "Checksheet" high-speed entry context:
                e.preventDefault();
                focusCell(r, c - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                focusCell(r, c + 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (onEnter) {
                    onEnter(r, c, e);
                } else {
                    // Default behavior: Move down usually, or right? 
                    // Let's default to finding the next logical input (row-major)
                    if (!focusCell(r + 1, c)) {
                        // If end of column, try next column top? or just stop.
                        // For now just try down.
                    }
                }
                break;
            default:
                break;
        }
    }, [focusCell, onEnter]);

    return {
        gridRefs,
        setRef,
        handleKeyDown,
        focusCell
    };
};
