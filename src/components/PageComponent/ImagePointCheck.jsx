import React from 'react';

/**
 * ImagePointCheck Component
 * 
 * Displays a background image with positioned point checks (checkbox + text)
 * 
 * Props:
 * - backgroundImage: URL/path to background image
 * - width: container width (default '100%')
 * - height: container height (default 'auto')
 * - points: Array of point check configs
 *   [{ id, x, y, label, checked, textPosition }]
 *   - x, y: position as percentage (0-100) or mm
 *   - textPosition: 'left' | 'right' | 'top' | 'bottom' (default 'right')
 * - onChange: callback when a point check is toggled
 */
function ImagePointCheck({
    backgroundImage = '',
    width = '100%',
    height = 'auto',
    points = [],
    onChange = () => { },
    aspectRatio = null  // e.g., '16/9' or '4/3'
}) {
    const handleCheckChange = (pointId, checked) => {
        onChange(pointId, checked);
    };

    const getTextStyle = (position) => {
        switch (position) {
            case 'left':
                return { right: '100%', marginRight: '1mm', whiteSpace: 'pre' };
            case 'top':
                return { bottom: '100%', marginBottom: '1mm', whiteSpace: 'pre' };
            case 'bottom':
                return { top: '100%', marginTop: '1mm', whiteSpace: 'pre' };
            case 'right':
            default:
                return { left: '100%', marginLeft: '1mm', whiteSpace: 'pre' };
        }
    };

    return (
        <div
            className="relative bg-white"
            style={{
                width,
                height,
                aspectRatio: aspectRatio || 'auto',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {points.map((point) => (
                <div
                    key={point.id}
                    className="absolute flex items-center"
                    style={{
                        left: typeof point.x === 'number' ? `${point.x}%` : point.x,
                        top: typeof point.y === 'number' ? `${point.y}%` : point.y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {/* Checkbox */}
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={point.checked || false}
                            onChange={(e) => handleCheckChange(point.id, e.target.checked)}
                            className="cursor-pointer"
                            style={{ width: '5mm', height: '5mm' }}
                        />

                        {/* Label */}
                        {point.label && (
                            <span
                                className="absolute text-xs"
                                style={{
                                    fontSize: '12px',
                                    ...getTextStyle(point.textPosition || 'right')
                                }}
                            >
                                {point.label}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ImagePointCheck;
