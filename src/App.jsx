import React, { Suspense, useMemo } from 'react';

// Dynamic import of all checksheet forms
// Removing { eager: true } makes it return a function that returns a promise
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
    if (!importFn) return null;
    return React.lazy(importFn);
  }, [formName, formPath]);

  if (!FormComponent) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Form Not Found</h1>
          <p>Could not load form: <strong>{formName}</strong></p>
          <p className="text-xs mt-4 text-gray-500">Path: {formPath}</p>
        </div>
      </div>
    );
  }

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
