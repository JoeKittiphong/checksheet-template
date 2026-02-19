import React from 'react';
import Builder from './Builder';
import { ChecksheetProvider } from '../../context/ChecksheetContext';
import { KeypadProvider } from '../../context/KeypadContext';

const FormBuilderPage = () => {
    // Mock handlers for the builder context
    const handleSave = async (data) => {
        console.log("Form Saved (Mock)", data);
        return { success: true };
    };

    return (
        <ChecksheetProvider
            handleSave={handleSave}
            isSaving={false}
            apiEndpoint=""
            meta={{}}
        >
            <KeypadProvider>
                <div className="h-screen w-full overflow-hidden">
                    <Builder />
                </div>
            </KeypadProvider>
        </ChecksheetProvider>
    );
};

export default FormBuilderPage;
