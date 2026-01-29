import React from 'react';
import { useKeypad } from '../../context/KeypadContext';

const Checknumber = React.forwardRef(({
    label = "BED No.",
    value = "",
    onChange = () => { },
    labelClass = "text-sm",
    inputClass = "w-20 text-sm",
    name // Expect Name
}, ref) => {
    const { openKeypad, isKeypadEnabled } = useKeypad();
    // Simple mobile detection (can be extracted to util)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const handleInputClick = (e) => {
        if (isMobile || isKeypadEnabled) {
            // Blur to prevent system keyboard on mobile if readOnly logic fails
            e.target.blur();
            openKeypad(name, value, { label, mode: 'text' });
        }
    };

    return (
        <div className="flex items-end">
            <span className={`mr-1 whitespace-nowrap font-arial ${labelClass}`}>{label}</span>
            <input
                ref={ref}
                type="text"
                // Mobile: readOnly to force keypad. PC: readOnly=false to allow typing
                readOnly={isMobile}
                inputMode={isMobile ? "none" : "text"}
                className={`border-b border-black outline-none px-1 font-arial cursor-pointer ${inputClass}`}
                style={{ textTransform: 'uppercase' }}
                value={value}
                onClick={handleInputClick}
                onFocus={(e) => {
                    // For mobile, force blur. For PC, do nothing (allow focus) unless we strictly want to block
                    if (isMobile) e.target.blur();
                    // We don't auto-open on focus for PC to avoid annoyance if tabbing
                    if (isMobile && !isKeypadEnabled) {
                        // User said "Mobile Close Keypad: Cannot use system keyboard, must open keypad".
                        // So on mobile, ALWAYS open keypad.
                        openKeypad(name, value, { label, mode: 'text' });
                    }
                }}
                onChange={onChange} // Allow typing on PC
            />
        </div>
    );
});

export default Checknumber;
