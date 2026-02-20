import React, { Suspense, useMemo } from 'react';
import FormViewer from './checksheet/FORMVIEWER/FormViewer';

// Dynamic import of all checksheet forms
const forms = import.meta.glob('./checksheet/*/*.jsx');

function App() {
  const formName = import.meta.env.VITE_FORM_NAME || 'FAMB0002V2'; // Fallback
  console.log("Loading form:", formName);

  // Find the component that matches the formName
  // Expected path: ./checksheet/{formName}/{formName}.jsx
  const formPath = `./checksheet/${formName}/${formName}.jsx`;

  // Create a Lazy Component
  const FormComponent = useMemo(() => {
    const importFn = forms[formPath];
    if (!importFn) {
      // If no JSX file exists, we assume it's a JSON Form and use the Viewer
      console.log(`JSX form not found at ${formPath}. Handling with FormViewer.`);
      return FormViewer;
    }
    return React.lazy(importFn);
  }, [formName, formPath]);

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading Form...</div>
      </div>
    }>
      <FormComponent />
    </Suspense>
  )
}

export default App
