import { createContext, useContext } from 'react';

const ChecksheetContext = createContext(null);

export const ChecksheetProvider = ({ children, handleSave, isSaving, apiEndpoint }) => {
    return (
        <ChecksheetContext.Provider value={{ handleSave, isSaving, apiEndpoint }}>
            {children}
        </ChecksheetContext.Provider>
    );
};

export const useChecksheet = () => {
    const context = useContext(ChecksheetContext);
    if (!context) {
        // Warn instead of throw to prevent white screen crashes
        console.warn('useChecksheet must be used within a ChecksheetProvider');
        // Return a dummy object so components don't crash on destructuring
        return {
            handleSave: async () => { console.error("handleSave called without provider"); return { success: false, message: "No provider" }; },
            isSaving: false,
            apiEndpoint: ''
        };
    }
    return context;
};
