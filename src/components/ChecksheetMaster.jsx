import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import ProfileBar from "@/components/UIcomponent/ProfileBar";
import Pagination from "@/components/UIcomponent/Pagination";
import { saveForm, loadForm } from "@/utils/apiUtils";
import { ChecksheetProvider } from "@/context/ChecksheetContext";
import { useAutoSave } from "@/hooks/useAutoSave";

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
        mode: 'onBlur',
        defaultValues: {
            model: meta.model,
            machine_no: '',
            ...initialValues
        }
    });

    // Auto-Save Hook
    const autoSaveKey = currentUser ? `autosave_${currentUser.code}_${meta.checksheet_name}` : null;
    const { clearSavedData } = useAutoSave(methods, autoSaveKey);

    // Check authentication and load data
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            setIsLoading(true);
            try {
                // Check if user is logged in
                const authRes = await axios.get(`${apiEndpoint}/auth/me`, { withCredentials: true });
                if (!authRes.data.success) {
                    window.location.href = '/'; // Redirect to login/home
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
                    const key = `autosave_${user.code}_${meta.checksheet_name}`;
                    try {
                        const savedLocal = localStorage.getItem(key);
                        if (savedLocal) {
                            const parsedLocal = JSON.parse(savedLocal);
                            console.log("Restoring data from AutoSave...");
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
                console.error("Error checking auth or loading form data:", error);
                window.location.href = '/'; // Redirect on error
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
            <ChecksheetProvider handleSave={handleSave} isSaving={isSaving}>
                <div className="flex flex-col h-screen">
                    {/* Top Profile Bar */}
                    <ProfileBar
                        onSave={handleSave}
                        onPrint={handlePrint}
                        isSaving={isSaving}
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
                </div>
            </ChecksheetProvider>
        </FormProvider>
    );
}

export default ChecksheetMaster;
