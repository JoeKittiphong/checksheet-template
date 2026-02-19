import React from 'react';

/**
 * Spacer Component
 * A resizable empty space for the Form Builder.
 * In production/renderer, it is completely invisible.
 * In the builder, it shows a subtle text indicator on hover.
 */
const Spacer = () => {
    return (
        <div className="w-full h-full bg-transparent flex items-center justify-center min-h-[5px]">
            <div className="text-[10px] text-gray-300 italic select-none pointer-events-none opacity-0 group-hover:opacity-100 uppercase tracking-widest font-mono">
                Spacer
            </div>
        </div>
    );
};

export default Spacer;
