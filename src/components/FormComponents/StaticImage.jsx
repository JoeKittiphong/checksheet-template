import React from 'react';

/**
 * StaticImage Component
 * A component to display static illustrations or diagrams within the form.
 * Props:
 * - url: Image source URL
 * - alt: Alt text
 * - objectFit: 'contain', 'cover', 'fill'
 */
const StaticImage = ({
    url = '',
    alt = 'Illustration',
    objectFit = 'contain'
}) => {
    if (!url) {
        return (
            <div className="w-full h-full bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Static Image</div>
                <div className="text-[9px] text-gray-500 mt-1 italic text-center px-4">Click "Browse" in Property Editor to select an image from your device</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <img
                src={url}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: objectFit
                }}
                className="select-none pointer-events-none"
            />
        </div>
    );
};

export default StaticImage;
