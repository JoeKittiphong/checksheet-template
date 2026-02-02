import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import ProfileBar from "@/components/UIcomponent/ProfileBar";
import Pagination from "@/components/UIcomponent/Pagination";
import { saveForm, loadForm, uploadPendingFiles } from "@/utils/apiUtils";
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
    const [status, setStatus] = useState('prepare'); // Status state

    const [pageStatus, setPageStatus] = useState({});

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
                    // Set Status from DB
                    if (data.status) {
                        setStatus(data.status);
                    }

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
    const handleSave = async (targetStatus = null) => {
        setIsSaving(true);
        try {
            let formData = methods.getValues();

            // --- Validation Logic ---
            // Extract values using various possible field names
            const model = formData.mc_model_input || formData.mc_model || formData.model || meta.model;
            const machineNo = formData.mc_no_input || formData.mc_no || formData.machine_no;

            // Determine if at least one division/group is selected
            const DIV_FIELDS = ['div_semi', 'div_body', 'div_mc', 'div_insp', 'div_acc', 'div_other'];
            const hasGroup = DIV_FIELDS.some(field => formData[field]) || meta.as_group;

            let missingFields = [];
            if (!model || model === "ALL") missingFields.push("MACHINE MODEL");
            if (!machineNo) missingFields.push("MACHINE NO.");
            if (!hasGroup) missingFields.push("DIVISION / GROUP");

            if (missingFields.length > 0) {
                alert(`กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก:\n- ${missingFields.join("\n- ")}`);
                setIsSaving(false);
                return;
            }
            // --- End Validation Logic ---

            // Handling Deferred Uploads
            try {
                const { updatedData, hasChanges } = await uploadPendingFiles(formData, apiEndpoint);
                if (hasChanges) {
                    formData = updatedData;
                    // Update form state with uploaded strings so we don't re-upload
                    Object.keys(updatedData).forEach(key => {
                        methods.setValue(key, updatedData[key], { shouldValidate: true, shouldDirty: false });
                    });
                }
            } catch (uploadErr) {
                alert("Upload Error: " + uploadErr.message);
                setIsSaving(false);
                return;
            }

            // Determine status
            // If targetStatus is passed (e.g. 'finish'), use it.
            // Otherwise, if current status is 'prepare', move to 'work_in_progress'. 
            // If explicit save is called, usually implies work in progress.
            const nextStatus = targetStatus || (status === 'prepare' ? 'work_in_progress' : status);

            const result = await saveForm({
                apiEndpoint,
                formId,
                meta,
                formData,
                status: nextStatus
            });

            if (result.success) {
                // Synchronize ID if it's a new record
                if (result.data && result.data.id) {
                    setFormId(result.data.id);
                }

                // Update local status
                setStatus(nextStatus);

                clearSavedData(); // Clear auto-save on success

                // Show specific message for Submit
                if (targetStatus === 'finish') {
                    alert("บันทึกจบงานเรียบร้อยแล้ว!");
                } else {
                    alert(result.message); // Existing alert
                }

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
        const formData = methods.getValues();
        const machineNo = formData.machineNo || formData.machine_no || '';

        // Priority logic for naming parts
        const formName = meta.form_name || '';
        const version = meta.version || '';
        const model = meta.model || '';
        const title = meta.title || meta.checksheet_name || '';

        // Construct filename: form_name-version-model-title-machine_no
        // Remove characters that are problematic for filenames
        const sanitize = (str) => String(str || '').replace(/[\\/:*?"<>|]/g, '').trim();

        const parts = [
            sanitize(formName),
            sanitize(version),
            sanitize(model),
            sanitize(title),
            sanitize(machineNo)
        ].filter(part => part !== ''); // Remove empty parts to avoid double dashes

        const fileName = parts.join('-').replace(/\s+/g, '_');

        const originalTitle = document.title;
        document.title = fileName;

        window.print();

        // Restore original title
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    };

    return (
        <FormProvider {...methods}>
            <KeypadProvider>
                <ChecksheetProvider handleSave={() => handleSave()} isSaving={isSaving}>
                    <div className="flex flex-col h-screen">
                        {/* Top Profile Bar */}
                        <ProfileBar
                            onSave={() => handleSave()} // Default save
                            onSubmit={() => handleSave('finish')} // Submit action
                            status={status}
                            onPrint={handlePrint}
                            isSaving={isSaving}
                            onSetPage={setCurrentPage} // Pass page setter
                            onSetPageStatus={setPageStatus} // NEW: Pass status setter
                        />

                        {/* Screen-only elements - Pagination */}
                        <div className="print:hidden my-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pages.length}
                                onPageChange={setCurrentPage}
                                pageLabels={pageLabels}
                                pageComponents={pages}
                                pageStatus={pageStatus} // NEW: Pass pageStatus
                                pageOffset={2}
                                customLabels={{ 1: 'C', 2: 'B' }}
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
