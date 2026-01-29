import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import ProfileBar from "@/components/UIcomponent/ProfileBar";
import Pagination from "@/components/UIcomponent/Pagination";
import { saveForm, loadForm } from "@/utils/apiUtils";
import { ChecksheetProvider } from "@/context/ChecksheetContext";
import { useAutoSave } from "@/hooks/useAutoSave";
import { KeypadProvider } from "@/context/KeypadContext";
import VirtualKeypad from "@/components/UIcomponent/VirtualKeypad";

/**
 * ChecksheetMaster Component
 * 
 * Reusable container for managing standard checksheet logic including:
 * - Authentication check
 * - Data loading/saving
 * - Form state management (react-hook-form)
 * - Pagination
 * - Screen/Print layout responsiveness
 * 
 * @param {Object} props
 * @param {Object} props.config - Configuration object containing { meta, apiEndpoint }
 * @param {Array<React.ReactNode>} props.pages - Array of page components to render
 * @param {Array<string>} props.pageLabels - Array of labels for pagination
 * @param {Object} [props.initialValues] - Optional default values for the form
 */
function ChecksheetMaster({ config, pages, pageLabels, initialValues = {} }) {
    const { meta, apiEndpoint } = config;

    // State
    const [currentPage, setCurrentPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formId, setFormId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Initialize Global Form State
    const methods = useForm({
        mode: 'all', // Validation triggers on change and blur for immediate feedback
        defaultValues: {
            model: meta.model,
            machine_no: '',
            ...initialValues
        }
    });

    // Auto-Save Hook
    // Derive ID from URL to scope the auto-save (separate drafts for separate records)
    const searchParams = new URLSearchParams(window.location.search);
    const urlId = searchParams.get('id');
    const autoSaveKey = currentUser ? `autosave_${currentUser.code}_${meta.checksheet_name}_${urlId || 'new'}` : null;
    const { clearSavedData } = useAutoSave(methods, autoSaveKey);

    // Check authentication and load data
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            setIsLoading(true);
            try {
                // Check if user is logged in
                const authRes = await axios.get(`${apiEndpoint}/auth/me`, {
                    withCredentials: true,
                    timeout: 5000 // Give it some time
                });

                if (!authRes.data.success) {
                    console.warn("Auth failed: Response success is false");
                    window.location.href = '/';
                    return;
                }
                const user = authRes.data.user;
                setCurrentUser(user);

                const data = await loadForm({
                    apiEndpoint,
                    searchParams: window.location.search,
                    meta
                });

                if (data) {
                    let finalData = data.checksheet_data || {};

                    // Auto-Restore logic: Merge DB data with LocalStorage data
                    const currentUrlParams = new URLSearchParams(window.location.search);
                    const currentId = currentUrlParams.get('id');
                    const key = `autosave_${user.code}_${meta.checksheet_name}_${currentId || 'new'}`;

                    try {
                        const savedLocal = localStorage.getItem(key);
                        if (savedLocal) {
                            const parsedLocal = JSON.parse(savedLocal);
                            console.log("Restoring data from AutoSave...", key);
                            // Merge: LocalStorage takes priority for draft changes
                            finalData = { ...finalData, ...parsedLocal };
                        }
                    } catch (e) {
                        console.error("Failed to restore auto-save data:", e);
                    }

                    methods.reset(finalData);

                    if (data.id) {
                        setFormId(data.id);
                    }
                }
            } catch (error) {
                console.error("ChecksheetMaster Load Error:", error);

                // Only redirect if it's an authentication error (401/403)
                // If it's a network error (no response) or 500, we might stay on page for PWA/offline
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.error("Authentication expired. Redirecting to home...");
                    window.location.href = '/';
                } else if (!error.response) {
                    console.error("Network error. Server might be down or you are offline.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAndLoadData();
    }, [methods, apiEndpoint, meta]);

    // Handle Save
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const formData = methods.getValues();
            const result = await saveForm({
                apiEndpoint,
                formId,
                meta,
                formData
            });

            if (result.success) {
                clearSavedData(); // Clear auto-save on success
                alert(result.message); // Existing alert
                return result; // Return result for ProfileBar to handle modal/redirect
            }
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการบันทึก: " + error.message);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <FormProvider {...methods}>
            <KeypadProvider>
                <ChecksheetProvider handleSave={handleSave} isSaving={isSaving}>
                    <div className="flex flex-col h-screen">
                        {/* Top Profile Bar */}
                        <ProfileBar
                            onSave={handleSave}
                            onPrint={handlePrint}
                            isSaving={isSaving}
                            onSetPage={setCurrentPage} // Pass page setter
                        />

                        {/* Screen-only elements - Pagination */}
                        <div className="print:hidden my-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pages.length}
                                onPageChange={setCurrentPage}
                                pageLabels={pageLabels}
                                pageComponents={pages}
                            />

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="fixed top-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg z-50 animate-pulse">
                                    <p className="font-bold">Loading...</p>
                                    <p>Fetching data from server</p>
                                </div>
                            )}
                        </div>

                        {/* Pages Container */}
                        <div className="w-full flex flex-col items-center flex-1 overflow-auto bg-gray-100 print:bg-white print:overflow-visible">
                            {/* Wrap pages in a constrained width container for screen view */}
                            <div className="w-[210mm] bg-white shadow-lg print:shadow-none print:w-full">
                                {pages.map((page, index) => {
                                    const pageNum = index + 1;
                                    const isCurrent = pageNum === currentPage;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                ${isCurrent ? 'block' : 'hidden'} 
                                                print:block print:w-full print:h-[297mm] print:break-after-page
                                            `}
                                        >
                                            {page}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Virtual Keypad */}
                        <VirtualKeypad />
                    </div>
                </ChecksheetProvider>
            </KeypadProvider>
        </FormProvider>
    );
}

export default ChecksheetMaster;
