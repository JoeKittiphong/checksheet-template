import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PageSettingsModal from './PageSettingsModal';
import FormSettingsModal from './FormSettingsModal';
import ComponentDefaults from './ComponentDefaults';
import PropertyEditor from './PropertyEditor';
import Toolbox from './Toolbox';
import Canvas from './Canvas';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const Builder = () => {
    const methods = useForm();

    // Helper to create a new page
    const createNewPage = (type = 'A4Paper') => {
        const defaults = ComponentDefaults[type] || {};
        const { w, h, props = {}, ...restDefaults } = defaults;
        return {
            id: uuidv4(),
            component: type,
            layout: [],
            props: { ...restDefaults, ...props }
        };
    };

    const [editingPageId, setEditingPageId] = useState(null);
    const [pages, setPages] = useState([createNewPage()]);
    const [formSettings, setFormSettings] = useState({
        meta: { form_name: '', checksheet_name: '', version: '' },
        cover: { title: '', docNumber: '' },
        content: { title: '', documentNo: '' }
    });
    const [isFormSettingsOpen, setIsFormSettingsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedPages = localStorage.getItem('form-builder-pages');
        const savedSettings = localStorage.getItem('form-builder-settings');

        if (savedPages) {
            try {
                const parsed = JSON.parse(savedPages);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPages(parsed);
                }
            } catch (e) {
                console.error("Failed to load layout", e);
            }
        }

        if (savedSettings) {
            try {
                setFormSettings(JSON.parse(savedSettings));
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('form-builder-pages', JSON.stringify(pages));
        localStorage.setItem('form-builder-settings', JSON.stringify(formSettings));
        alert('Form Layout & Settings saved!');
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear the form?')) {
            setPages([createNewPage()]);
        }
    };

    const onAddPage = (type) => {
        setPages(prev => [...prev, createNewPage(type)]);
    };

    const onRemovePage = (pageId) => {
        if (pages.length <= 1) {
            alert("Cannot delete the last page.");
            return;
        }
        if (window.confirm("Delete this page?")) {
            setPages(prev => prev.filter(p => p.id !== pageId));
        }
    };

    // Handler to update layout of a specific page
    const onPageLayoutChange = (pageId, newLayout) => {
        setPages(prevPages => prevPages.map(page => {
            if (page.id === pageId) {
                // IMPORTANT: newLayout ONLY contains (i, x, y, w, h).
                // We must merge it with the existing layout to keep 'component' and 'props'.
                const mergedLayout = newLayout.map(gridItem => {
                    const existingItem = (page.layout || []).find(item => item.i === gridItem.i);
                    return existingItem ? { ...existingItem, ...gridItem } : gridItem;
                });
                return { ...page, layout: mergedLayout };
            }
            return page;
        }));
    };

    const onEditPage = (pageId) => {
        setEditingPageId(pageId);
    };

    const onUpdatePageProps = (data) => {
        setPages(prev => prev.map(p =>
            p.id === editingPageId
                ? { ...p, props: { ...p.props, content: data, formNumber: data.formNumber } }
                : p
        ));
        setEditingPageId(null);
    };

    const [selectedElement, setSelectedElement] = useState(null); // { pageId, elementId }

    // ... existing handlers ...

    const onSelectElement = (pageId, elementId) => {
        setSelectedElement({ pageId, elementId });
    };

    const onUpdateElement = (newProps) => {
        if (!selectedElement) return;
        const { pageId, elementId } = selectedElement;

        setPages(prev => prev.map(page => {
            if (page.id === pageId) {
                const newLayout = page.layout.map(item =>
                    item.i === elementId
                        ? { ...item, props: { ...item.props, ...newProps } }
                        : item
                );
                return { ...page, layout: newLayout };
            }
            return page;
        }));
    };

    // This handler receives the item drop from Canvas
    const onDropElement = (pageId, layoutItem, componentType) => {
        // Get defaults or fallbacks
        console.log("onDropElement RECEIVED", { pageId, componentType, layoutItem });

        const typeKey = componentType || 'FormChecknumber'; // Fallback to a known working component for testing
        const propsData = ComponentDefaults[typeKey] || ComponentDefaults.default;
        const { w: defW, h: defH, props: defProps = {}, ...otherDefaults } = propsData;

        const newItem = {
            ...layoutItem,
            i: uuidv4(),
            component: typeKey,
            w: defW || layoutItem.w || 4,
            h: defH || layoutItem.h || 2,
            props: { ...otherDefaults, ...defProps }
        };

        console.log("CREATING NEW ITEM", newItem);

        setPages(prevPages => prevPages.map(page => {
            if (page.id === pageId) {
                return { ...page, layout: [...page.layout, newItem] };
            }
            return page;
        }));
    };

    if (!mounted) return <div>Loading Builder...</div>;

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col h-screen bg-white">
                {/* Toolbar */}
                <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between bg-white z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-800">Form Builder <span className="text-xs text-gray-500 font-normal ml-2">Page Mode</span></h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsFormSettingsOpen(true)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md transition-colors border border-gray-300"
                        >
                            Global Settings
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors border border-red-200"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                        >
                            Save Form
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <Toolbox />

                    {/* Canvas Container */}
                    <div
                        className="flex-1 overflow-auto bg-gray-100 relative custom-scrollbar"
                        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            const type = e.dataTransfer.getData("application/react-checksheet-type") || e.dataTransfer.getData("component-type");
                            const componentKey = e.dataTransfer.getData("text/plain");

                            console.log("BUILDER DROP", { type, componentKey });

                            if (type === 'PAGE') {
                                onAddPage(componentKey);
                            }
                        }}
                    >
                        <Canvas
                            pages={pages}
                            formSettings={formSettings}
                            onPageLayoutChange={onPageLayoutChange}
                            onRemovePage={onRemovePage}
                            onDropElement={onDropElement}
                            onEditPage={onEditPage}
                            onSelectElement={onSelectElement}
                            selectedElementId={selectedElement?.elementId}
                        />
                    </div>

                </div>

            </div>

            {/* Property Editor Sidebar */}
            {selectedElement && (
                <PropertyEditor
                    element={(() => {
                        const page = pages.find(p => p.id === selectedElement.pageId);
                        return page?.layout.find(i => i.i === selectedElement.elementId);
                    })()}
                    onUpdate={onUpdateElement}
                    onClose={() => setSelectedElement(null)}
                />
            )}

            {/* Page Settings Modal */}
            {editingPageId && (
                <PageSettingsModal
                    isOpen={!!editingPageId}
                    onClose={() => setEditingPageId(null)}
                    onSave={onUpdatePageProps}
                    initialValues={pages.find(p => p.id === editingPageId)?.props?.content || {}}
                />
            )}

            {/* Global Form Settings Modal */}
            <FormSettingsModal
                isOpen={isFormSettingsOpen}
                onClose={() => setIsFormSettingsOpen(false)}
                onSave={setFormSettings}
                initialValues={formSettings}
            />
        </FormProvider>
    );
};

export default Builder;
