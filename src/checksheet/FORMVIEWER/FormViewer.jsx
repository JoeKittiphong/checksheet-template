import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChecksheetMaster from '@/components/ChecksheetMaster';
import FormRenderer from '../FORMBUILDER/FormRenderer'; // Shared Renderer from Builder

/**
 * FormViewer Component
 * 
 * This component acts as the public-facing engine for forms built with the Form Builder.
 * It reuses the exact same FormRenderer and ComponentMap from the Builder, ensuring
 * that "What You See Is What You Get" (WYSIWYG) fidelity.
 * 
 * Features:
 * - Loads form.json structure
 * - Loads meta.json metadata
 * - Wraps content in ChecksheetMaster for DB sync
 */
const FormViewer = () => {
    const [config, setConfig] = useState(null);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formName, setFormName] = useState("");
    const apiEndpoint = ""; // Use relative paths for production

    useEffect(() => {
        const loadFormData = async () => {
            setIsLoading(true);
            try {
                // 1. Get form name from URL (preferred) or Environment
                // URL Pattern: /form/{FORM_NAME}
                const pathParts = window.location.pathname.split('/');
                const urlFormName = pathParts.length > 2 ? pathParts[2] : null;
                const targetFormName = urlFormName || import.meta.env.VITE_FORM_NAME;

                if (!targetFormName) {
                    throw new Error("Form name not found in URL or VITE_FORM_NAME");
                }

                setFormName(targetFormName);
                console.log("FormViewer Loading:", targetFormName);

                // 2. Parse Query Params
                const queryParams = new URLSearchParams(window.location.search);
                const recordId = queryParams.get('record_id');
                const isNew = queryParams.get('new') === 'true';
                const machineNo = queryParams.get('machine_no');
                const model = queryParams.get('model');
                const department = queryParams.get('department');
                const asGroup = queryParams.get('as_group');

                // 3. Load Template Data (Structure)
                let templateData = null;
                let meta = { checksheet_name: targetFormName };

                try {
                    // Try Flat File: /form/Test.json
                    const flatRes = await axios.get(`/form/${targetFormName}.json`, { withCredentials: true });
                    templateData = flatRes.data;
                    if (templateData.formSettings?.meta) {
                        meta = { ...meta, ...templateData.formSettings.meta };
                    }
                } catch (flatErr) {
                    console.warn(`Flat file load failed, trying folder structure...`);
                    try {
                        const folderRes = await axios.get(`/form/${targetFormName}/form.json`, { withCredentials: true });
                        templateData = folderRes.data;
                        try {
                            const metaRes = await axios.get(`/form/${targetFormName}/meta.json`, { withCredentials: true });
                            meta = { ...meta, ...metaRes.data };
                        } catch (e) { console.warn("meta.json not found"); }
                    } catch (folderErr) {
                        throw new Error(`Form definition not found for ${targetFormName}`);
                    }
                }

                if (!templateData || !templateData.pages) {
                    throw new Error("Invalid template data: 'pages' missing");
                }

                // 4. Load Transaction Data (Values)
                let existingData = null;

                if (recordId) {
                    // 4.1 Load by Record ID
                    try {
                        const dbRes = await axios.get(`${apiEndpoint}/api/load-form/${recordId}`, { withCredentials: true });
                        if (dbRes.data && dbRes.data.success) {
                            existingData = dbRes.data.data;
                        }
                    } catch (e) {
                        console.error("Failed to load record by ID:", e);
                        // Optional: Show warning but continue with blank template?
                    }
                } else if (isNew && machineNo) {
                    // 4.2 Check if a record already exists for this machine (to prevent duplicates or resume)
                    try {
                        const dbRes = await axios.get(`${apiEndpoint}/api/load-form-by-machine`, {
                            params: { department, model, machine_no: machineNo, as_group: asGroup, checksheet_name: targetFormName },
                            withCredentials: true
                        });
                        if (dbRes.data && dbRes.data.success && dbRes.data.data) {
                            existingData = dbRes.data.data;
                            console.log("Found existing record for this machine, loading it instead of new.");
                        }
                    } catch (e) {
                        console.warn("No existing record found, proceeding as new.");
                    }
                }

                // 5. Merge Data
                let finalPages = templateData.pages;
                let finalConfig = { meta, apiEndpoint };

                if (existingData) {
                    // Hydrate template with values from DB
                    // values are stored in 'checksheet_data' column
                    const dbValues = existingData.checksheet_data;

                    // IF dbValues has 'pages' (entire structure saved), use it? 
                    // OR if it's just values map? 
                    // Current ChecksheetMaster usually saves the whole "pages" structure if it changes?
                    // Let's inspect structure. Based on Page1.jsx etc, usually we save 'checksheet_data' as the key-value pairs?
                    // Wait, ChecksheetMaster saves: checksheet_data: JSON.stringify(methods.getValues()) ??
                    // NO, let's check dbRoutes.js save-form.
                    // It saves 'checksheet_data' column.

                    if (dbValues && dbValues.pages) {
                        // Full Structure Restore (Dynamic Form)
                        finalPages = dbValues.pages;
                        if (dbValues.formSettings) {
                            finalConfig.meta = { ...finalConfig.meta, ...dbValues.formSettings.meta };
                        }
                    } else if (dbValues) {
                        // Value-only Restore (Legacy or partial) - Not fully supported for Dynamic Forms yet 
                        // unless we implement value injection into pages.
                        // For now, assuming Dynamic Forms save full structure in checksheet_data.
                        console.warn("Restoring values only not fully implemented for dynamic forms yet.");
                    }

                    // Inject DB Metadata
                    finalConfig.dbId = existingData.id;
                    finalConfig.status = existingData.status;
                } else {
                    // New Form: Inject Query Params into Meta
                    if (isNew) {
                        finalConfig.meta = {
                            ...finalConfig.meta,
                            machine_no: machineNo,
                            model: model,
                            department: department,
                            as_group: asGroup
                        };
                    }
                }

                setConfig(finalConfig);
                setPages(finalPages);

            } catch (err) {
                console.error("Failed to load Form Viewer data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadFormData();
    }, []); // Run once on mount

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading Form: {formName}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 text-red-700 p-8">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-2">Error Loading Form</h1>
                    <p className="mb-4">{error}</p>
                    <p className="text-sm opacity-70">
                        Please ensure <strong>form.json</strong> exists in the form directory.
                    </p>
                </div>
            </div>
        );
    }

    // Generate page labels for pagination
    const pageLabels = pages.map((page, index) => {
        if (page.component === 'CoverPage') return 'C';
        if (page.component === 'PaperBlank') return 'B';
        return `Page ${index + 1}`;
    });

    return (
        <ChecksheetMaster
            config={config}
            pages={pages.length > 0 ? [<FormRenderer pages={pages} isDraggable={false} isResizable={false} />] : []}
            pageLabels={['Form']} // Simplified master label, Renderer handles internal layout
        />
    );
};

export default FormViewer;
