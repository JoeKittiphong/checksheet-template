import React from 'react';

/**
 * PureGrid Component
 * A minimal container for testing drag and drop without A4 template overhead.
 */
const PureGrid = ({ children, isBuilder = false }) => {
    return (
        <div
            className="bg-white border-2 border-dashed border-gray-300 relative shadow-sm"
            style={{
                width: '210mm',
                height: '297mm',
                margin: '0 auto',
                padding: '10mm'
            }}
        >
            <div className="absolute top-2 left-2 text-[10px] text-gray-400 font-mono uppercase tracking-widest pointer-events-none">
                Pure Grid Test Mode
            </div>
            {children}
        </div>
    );
};

export default PureGrid;
