import React from 'react';

/**
 * SimpleText Component
 * A generic text component for headers or labels.
 * Props:
 * - text: The content to display
 * - fontSize: 'h1' (24px), 'h2' (20px), 'h3' (16px), 'h4' (14px) or custom px
 * - fontWeight: 'normal', 'medium', 'bold'
 * - textAlign: 'left', 'center', 'right'
 * - color: CSS color
 */
const SimpleText = ({
    text = 'New Text',
    fontSize = 'h3',
    fontWeight = 'normal',
    textAlign = 'left',
    color = 'inherit'
}) => {
    // Map preset sizes to tailwind or styles
    const fontSizes = {
        h1: '24px',
        h2: '20px',
        h3: '16px',
        h4: '14px',
    };

    const actualSize = fontSizes[fontSize] || fontSize;

    const style = {
        fontSize: actualSize,
        fontWeight: fontWeight === 'bold' ? '700' : fontWeight === 'medium' ? '500' : '400',
        textAlign: textAlign,
        color: color,
        width: '100%',
        lineHeight: '1.2'
    };

    return (
        <div style={style} className="select-none break-words">
            {text}
        </div>
    );
};

export default SimpleText;
