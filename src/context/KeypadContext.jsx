import React, { createContext, useContext, useState, useCallback } from 'react';

const KeypadContext = createContext();

export const useKeypad = () => {
    const context = useContext(KeypadContext);
    if (!context) {
        throw new Error('useKeypad must be used within a KeypadProvider');
    }
    return context;
};

export const KeypadProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mode, setMode] = useState('numeric'); // 'numeric' or 'text'
    const [targetField, setTargetField] = useState(null); // Field name from react-hook-form
    const [tempValue, setTempValue] = useState('');
    const [options, setOptions] = useState({});
    const [keypadPosition, setKeypadPosition] = useState(null);
    const [isKeypadEnabled, setIsKeypadEnabled] = useState(() => {
        const saved = localStorage.getItem('isKeypadEnabled');
        return saved !== null ? JSON.parse(saved) : false; // Default off (or true? User wants toggle. Let's default true? User said "Toggle... PC optional". Usually start with OFF for PC if optional. But mostly used on Tablet. Let's default false for PC feel, but Mobile will force it anyway.)
        // Actually, let's default to TRUE so the feature is discoverable, or FALSE?
        // User said "Keypad suitable for tablet but not PC". Probably default OFF for PC.
    });

    const toggleKeypadEnabled = useCallback(() => {
        setIsKeypadEnabled(prev => {
            const newValue = !prev;
            localStorage.setItem('isKeypadEnabled', JSON.stringify(newValue));
            return newValue;
        });
    }, []);

    /**
     * Open the keypad for a specific field
     * @param {string} name - Field name
     * @param {string} initialValue - Current value of the field
     * @param {Object} config - { mode: 'numeric'|'text', label: string }
     */
    const openKeypad = useCallback((name, initialValue, config = {}) => {
        setTargetField(name);
        setTempValue(initialValue?.toString() || '');
        setMode(config.mode || 'numeric');
        setOptions(config);
        setIsVisible(true);
    }, []);

    const closeKeypad = useCallback(() => {
        setIsVisible(false);
        setTargetField(null);
    }, []);

    const toggleMode = useCallback(() => {
        setMode(prev => prev === 'numeric' ? 'text' : 'numeric');
    }, []);

    return (
        <KeypadContext.Provider value={{
            isVisible,
            mode,
            targetField,
            tempValue,
            options,
            keypadPosition,
            setKeypadPosition,
            isKeypadEnabled,
            toggleKeypadEnabled,
            openKeypad,
            closeKeypad,
            setTempValue,
            toggleMode
        }}>
            {children}
        </KeypadContext.Provider>
    );
};
