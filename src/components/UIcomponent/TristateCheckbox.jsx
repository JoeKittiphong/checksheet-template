import React from 'react';

/**
 * TristateCheckbox Component
 * 
 * Supports 4 states:
 * - null/undefined/"" : Empty (Initial)
 * - true              : OK (Green Tick)
 * - false             : NG (Red X)
 * - "N/A"             : N/A (Yellow Text)
 * 
 * Logic: Cycles on click: Empty -> True -> False -> N/A -> Empty
 */
const TristateCheckbox = ({
    value,
    onChange,
    readOnly = false,
    size = "w-6 h-6",
    error = false,
    className = ""
}) => {

    const handleClick = (e) => {
        if (readOnly) return;
        e.preventDefault(); // Prevent default label clicking behavior if wrapped

        // Cycle logic
        if (value === true) {
            onChange(false); // OK -> NG
        } else if (value === false) {
            onChange("N/A"); // NG -> N/A
        } else if (value === "N/A") {
            onChange(null); // N/A -> Empty
        } else {
            onChange(true); // Empty -> OK
        }
    };

    // Render Content based on state
    const renderContent = () => {
        if (value === true) {
            return <span className="text-green-600 font-bold text-lg">✓</span>; // Green Tick
        }
        if (value === false) {
            return <span className="text-red-600 font-bold text-lg">✕</span>; // Red X
        }
        if (value === "N/A") {
            return <span className="text-yellow-600 font-bold text-xs">N/A</span>; // Yellow N/A
        }
        return null; // Empty
    };

    return (
        <div
            onClick={handleClick}
            className={`
                ${size} border-2 flex items-center justify-center cursor-pointer select-none transition-colors bg-white
                ${error ? 'border-red-500' : 'border-gray-400'}
                ${readOnly ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                ${className}
            `}
            title={value === true ? "OK" : value === false ? "NG" : value === "N/A" ? "N/A" : "Empty"}
        >
            {renderContent()}
        </div>
    );
};

export default TristateCheckbox;
