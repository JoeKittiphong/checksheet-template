import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';
import { formatWithArrows, parseArrowInput, cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * EDMTable Component
 * Generic component for EDM tables (Pitching X/Y, Rolling X/Y).
 * Supports both Horizontal (X) and Vertical (Y) layouts.
 * 
 * Logic:
 * - Single data series (array).
 * - Per-cell standards (array of objects).
 * - Arrow key navigation (Enter moves Focus).
 * 
 * @param {Object} props
 * @param {Array} props.data - Data array (e.g. ['', '', ...])
 * @param {Function} props.onChange - Callback (newData) => void
 * @param {Array} props.standards - Standards array [{min, max, arrow}, ...]
 * @param {string} props.axis - 'x' (Horizontal) or 'y' (Vertical)
 * @param {string} props.arrowAxis - 'x' (Left/Right) or 'y' (Up/Down). Defaults to match axis.
 * @param {string} props.label - Row/Col label
 * @param {number} props.count - Number of columns/rows
 * @param {boolean} props.showStd - Show STD row/col
 * @param {boolean} props.validateStd - Enable validation
 */
const EDMTable = ({
    data = [],
    onChange = () => { },
    standards = [],
    axis = 'x',
    arrowAxis = null,
    label = 'Value',
    count = 5,
    showStd = true,
    validateStd = true
}) => {
    const { formState: { isSubmitted } } = useFormContext();
    const { moveFocus } = useFocusNavigation();
    const inputRefs = useRef([]);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const justCommittedRef = useRef(false);

    const isX = axis.toLowerCase() === 'x';
    const effectiveArrowAxis = arrowAxis || axis;

    // --- Helpers ---

    const formatDisplay = (value) => formatWithArrows(value, effectiveArrowAxis);
    const parseInput = (value) => parseArrowInput(value);

    const formatStd = (std) => {
        if (!std) return '';
        const { min, max, arrow } = std;

        // Determine arrow symbol based on direction
        const isArrowX = effectiveArrowAxis.toLowerCase() === 'x';
        const arrowSymbol = arrow === '+'
            ? (isArrowX ? '→' : '↑')
            : arrow === '-'
                ? (isArrowX ? '←' : '↓')
                : '';

        if (min === max) {
            if (min === 0 && !arrow) return '0';
            return `${min}${arrowSymbol}`;
        }
        return `${min}~${max}${arrowSymbol}`;
    };

    const isValid = (index) => {
        const std = standards[index] || {};
        return validateValue(data[index], {
            min: std.min,
            max: std.max,
            arrow: std.arrow,
            validateStd,
            useAbs: true
        });
    };

    // --- Handlers ---

    const handleFocus = (index) => {
        const currentValue = data[index] || '';
        setEditingCell(index);
        setEditingValue(currentValue);
    };

    const handleChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    const commitValue = (index) => {
        const numericValue = parseInput(editingValue);
        const newData = [...data];
        // Ensure array size
        for (let i = 0; i < count; i++) {
            if (newData[i] === undefined) newData[i] = '';
        }
        newData[index] = numericValue;
        onChange(newData);
        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (index) => {
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell === index) {
            commitValue(index);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(index);
            // Navigation Logic:
            // X Axis: Move Right (+1)
            // Y Axis: Move Up (-1) (As per existing logic in EDMTablePitchingY)
            const direction = isX ? 1 : -1;
            moveFocus(e, index, inputRefs.current, { direction });
        }
    };

    const getInputValue = (index) => {
        if (editingCell === index) return editingValue;
        return formatDisplay(data[index]);
    };

    // --- Renders ---

    if (isX) {
        // Horizontal Layout (X)
        const renderHeaderCols = () => {
            return Array.from({ length: count }).map((_, i) => (
                <th key={i} className="border border-black p-1 w-12 text-center">{i + 1}</th>
            ));
        };

        const renderStdRow = () => {
            return Array.from({ length: count }).map((_, i) => (
                <td key={i} className="border border-black p-1 text-center text-xs">
                    {standards[i] ? formatStd(standards[i]) : ''}
                </td>
            ));
        };

        const renderInputCols = () => {
            return Array.from({ length: count }).map((_, i) => {
                const valid = isValid(i);
                const hasValue = data[i] !== undefined && data[i] !== '' && data[i] !== null;
                const isReqError = isSubmitted && !hasValue;

                return (
                    <td key={i} className={`border border-black p-1 ${!valid ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue(i)}
                            onFocus={() => handleFocus(i)}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur(i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className={`w-full h-full text-center outline-none ${isReqError ? 'bg-red-50 border border-red-500' : 'bg-transparent'}`}
                        />
                    </td>
                );
            });
        };

        return (
            <table className="border-collapse border border-black text-sm">
                <thead>
                    <tr>
                        <th className="border border-black p-1 w-16 bg-gray-100"></th>
                        {renderHeaderCols()}
                    </tr>
                </thead>
                <tbody>
                    {showStd && (
                        <tr>
                            <td className="border border-black p-1 text-center font-medium bg-gray-100">STD</td>
                            {renderStdRow()}
                        </tr>
                    )}
                    <tr>
                        <td className="border border-black p-1 text-center font-medium">{label}</td>
                        {renderInputCols()}
                    </tr>
                </tbody>
            </table>
        );
    } else {
        // Vertical Layout (Y)
        const renderRows = () => {
            return Array.from({ length: count }).map((_, i) => {
                const std = standards[i];
                const valid = isValid(i);
                const hasValue = data[i] !== undefined && data[i] !== '' && data[i] !== null;
                const isReqError = isSubmitted && !hasValue;

                return (
                    <tr key={i}>
                        <td className="border border-black py-0.5 px-1 text-center w-8">{i + 1}</td>
                        {showStd && (
                            <td className="border border-black py-0.5 px-1 text-center w-14">
                                {std ? formatStd(std) : ''}
                            </td>
                        )}
                        <td className={`border border-black py-0.5 px-1 ${!valid ? 'bg-red-200' : ''}`}>
                            <input
                                ref={(el) => (inputRefs.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                value={getInputValue(i)}
                                onFocus={() => handleFocus(i)}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={() => handleBlur(i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className={`w-full h-full text-center outline-none ${isReqError ? 'bg-red-50 border border-red-500' : 'bg-transparent'}`}
                            />
                        </td>
                    </tr>
                );
            });
        };

        return (
            <table className="border-collapse border border-black text-sm">
                <thead>
                    <tr>
                        <th className="border border-black py-0.5 px-1 w-8"></th>
                        {showStd && <th className="border border-black py-0.5 px-1 w-14">STD</th>}
                        <th className="border border-black py-0.5 px-1 w-16">{label.toUpperCase()}</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        );
    }
};

export default EDMTable;
