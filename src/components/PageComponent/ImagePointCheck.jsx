import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import TristateCheckbox from '@/components/UIcomponent/TristateCheckbox';

/**
 * ImagePointCheck Component
 * 
 * Displays a background image with positioned point checks (checkbox + text)
 * 
 * Props:
 * - backgroundImage: URL/path to background image
 * - width: container width (default '100%')
 * - height: container height (default 'auto')
 * - points: Array of point check configs (Controlled mode)
 *   [{ id, x, y, label, checked, textPosition }]
 *   - x, y: position as percentage (0-100) or mm
 *   - textPosition: 'left' | 'right' | 'top' | 'bottom' (default 'right')
 * - onChange: callback when a point check is toggled (Controlled mode: (pointId, checked) => void)
 * - name: RHF Field Name (Uncontrolled/Smart mode)
 * - defaultValue: Default value for RHF (Uncontrolled/Smart mode)
 * - control: RHF Control object (Optional)
 * - error: boolean default false
 */
function ImagePointCheck({
    backgroundImage = '',
    width = '100%',
    height = 'auto',
    points = [], // Controlled mode
    onChange = () => { }, // Controlled mode
    name, // RHF Mode
    defaultValue, // RHF Mode
    control: passedControl, // Optional explicit control
    aspectRatio = null,
    error = false
}) {
    // RHF Setup
    const formContext = useFormContext();
    const control = passedControl || formContext?.control;
    const setValue = formContext?.setValue;

    // Always call useWatch, but ignore if no name
    const watchedValue = useWatch({
        control,
        name: name || "ignore_watch",
        defaultValue: defaultValue
    });

    // Determine current points: RHF -> Watched -> Default -> Prop
    const currentPoints = name ? (watchedValue || defaultValue || []) : points;

    // Sync defaultValue changes (e.g. coordinates/layout updates from code) to the form state
    // while preserving the 'checked' status from the current form state.
    React.useEffect(() => {
        if (!name || !setValue || !defaultValue) return;

        const currentFormValue = watchedValue || [];
        // Map over defaultValue (source of truth for layout) and merge with current checked state
        const mergedPoints = defaultValue.map(defPoint => {
            const existingPoint = currentFormValue.find(p => p.id === defPoint.id);
            // Use default layout but keep existing 'checked' status if available
            return existingPoint
                ? { ...defPoint, checked: existingPoint.checked }
                : defPoint;
        });

        // Simple deep comparison to check if update is needed
        const isDifferent = JSON.stringify(mergedPoints) !== JSON.stringify(currentFormValue);

        if (isDifferent) {
            // Update form state with new layout + preserved values
            setValue(name, mergedPoints, { shouldDirty: false }); // Don't mark dirty for layout updates
        }
    }, [defaultValue, name, setValue, watchedValue]);

    const handleCheckChange = (pointId, checked) => {
        if (name && setValue) {
            // RHF Mode: Update Form State directly
            // Ensure we are working with an array
            const pointsArray = Array.isArray(currentPoints) ? currentPoints : [];
            const updatedPoints = pointsArray.map(point =>
                point.id === pointId ? { ...point, checked: checked } : point
            );
            setValue(name, updatedPoints, { shouldDirty: true, shouldValidate: true });
        }

        // Always call onChange callback if provided (for both modes)
        if (onChange) {
            onChange(pointId, checked);
        }
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
            {Array.isArray(currentPoints) && currentPoints.map((point) => (
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
                        <TristateCheckbox
                            value={point.checked}
                            onChange={(val) => handleCheckChange(point.id, val)}
                            size="w-5 h-5"
                            className="bg-white/80"
                            error={error && (point.checked === null || point.checked === '' || point.checked === undefined)}
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
