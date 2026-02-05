// Configuration for Assy Problem Checksheet

// Determine API Endpoint based on environment
// For local dev, usually http://localhost:3000/api
// For production, usually empty string (relative path) or specific URL
// For local dev with proxy, use empty string. For prod, use empty string (relative).
export const apiEndpoint = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin;

export const meta = {
    checksheet_name: "ASSY PROBLEM FORM",
    form_name: "ASSY_PROBLEM",
    version: "VER.0",
    model: "ALL", // Default model or specific
    title: "Assy Problem Report",

    // Metadata for saving/loading
    header: "ASS'Y PROBLEM FORM",
    department: "ASSEMBLY", // Default Department
    as_group: "ASSY" // Default Group
};

export const content = {
    formId: "ASSY_PROBLEM",
    version: "VER.0",
    header: "ASS'Y PROBLEM FORM"
};
