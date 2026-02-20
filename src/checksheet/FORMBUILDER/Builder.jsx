import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './BuilderStyles.css';
import PageSettingsModal from './PageSettingsModal';
import FormSettingsModal from './FormSettingsModal';
import ComponentDefaults from './ComponentDefaults';
import PropertyEditor from './PropertyEditor';
import Toolbox from './Toolbox';
import Canvas from './Canvas';
import Pagination from '../../components/UIcomponent/Pagination';
import ProfileBar from '../../components/UIcomponent/ProfileBar';
import WorkspaceModal from './WorkspaceModal';
import axios from 'axios';
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

    const [pages, setPages] = useState([createNewPage()]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPreview, setIsPreview] = useState(false);
    const [formName, setFormName] = useState('');
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState('work_in_progress');
    const [isVerifyMode, setIsVerifyMode] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [formSettings, setFormSettings] = useState({
        meta: {
            form_name: 'FAWI0008',
            checksheet_name: 'FAWI0038_V2',
            version: 'V1',
            department: 'EDW',
            as_group: 'FINAL'
        },
        cover: {
            docNumber: 'FAWI0008',
            version: 'V1',
            dateOfIssue: new Date().toISOString().split('T')[0],
            approvalDate: new Date().toISOString().split('T')[0],
            issuedBy: 'ENGINEERING DIV.',
            title: 'MACHINE CHECK SHEET',
            company: 'Sodick ( Thailand ) Co., Ltd.'
        },
        content: {
            documentNo: 'FAWI0008',
            releaseNo: '1',
            controlBy: 'Assembly Division',
            totalPage: 1,
            date: new Date().toISOString().split('T')[0],
            model: 'AL400G & AL600G',
            group: 'A',
            formNumber: 'Form No.FQAG-001'
        }
    });
    const [isFormSettingsOpen, setIsFormSettingsOpen] = useState(false);
    const handleWorkspaceSet = async (name) => {
        setFormName(name);
        setIsWorkspaceOpen(false);

        // Try to load existing form
        try {
            const response = await axios.get(`/api/forms/load?name=${name}`);
            if (response.data.success && response.data.data) {
                const { pages: loadedPages, formSettings: loadedSettings } = response.data.data;
                if (loadedPages) setPages(loadedPages);
                if (loadedSettings) setFormSettings(loadedSettings);
            }
        } catch (err) {
            console.error('Failed to load workspace data:', err);
        }
    };

    const handleSaveToServer = async () => {
        if (!formName) return;
        setIsSaving(true);
        try {
            const formData = {
                pages,
                formSettings,
                lastSaved: new Date().toISOString()
            };
            const response = await axios.post('/api/forms/save', {
                name: formName,
                data: formData
            });
            if (response.data.success) {
                alert('Project Saved to Server! \u2705');
            }
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save project');
        } finally {
            setIsSaving(false);
        }
    };
    const scrollContainerRef = useRef(null);

    // Auto-track current page based on scroll position
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const pageElements = container.querySelectorAll('[id^="builder-page-"]');
            let current = 1;
            const containerRect = container.getBoundingClientRect();
            const midpoint = containerRect.top + containerRect.height / 2;

            pageElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < midpoint) {
                    current = index + 1;
                }
            });
            setCurrentPage(current);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [pages.length]);

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

    const handleDuplicatePage = (pageId) => {
        const pageIndex = pages.findIndex(p => p.id === pageId);
        if (pageIndex === -1) return;

        const originalPage = pages[pageIndex];
        const newPageId = uuidv4();

        // Deep clone layout and regenerate component IDs
        const newLayout = originalPage.layout.map(item => ({
            ...item,
            i: uuidv4() // Generate new ID for component
        }));

        const newPage = {
            ...originalPage,
            id: newPageId,
            layout: newLayout,
            // You might want to update title or other props if needed
        };

        const newPages = [...pages];
        newPages.splice(pageIndex + 1, 0, newPage); // Insert after original
        setPages(newPages);

        // Switch to new page
        setTimeout(() => handlePageChange(pageIndex + 2), 100);
    };

    const handleMovePage = (dragIndex, hoverIndex) => {
        const dragPage = pages[dragIndex];
        const newPages = [...pages];
        newPages.splice(dragIndex, 1);
        newPages.splice(hoverIndex, 0, dragPage);
        setPages(newPages);
        setCurrentPage(hoverIndex + 1);
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

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        const element = document.getElementById(`builder-page-${pageNum}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const [selectedElement, setSelectedElement] = useState(null); // { pageId, elementId }

    // ... existing handlers ...

    const onSelectElement = (pageId, elementId) => {
        if (isPreview) return; // Disable selection in preview
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

    const handleDeleteComponent = () => {
        if (!selectedElement) return;
        const { pageId, elementId } = selectedElement;

        if (window.confirm("Are you sure you want to delete this component?")) {
            setPages(prev => prev.map(page => {
                if (page.id === pageId) {
                    return { ...page, layout: page.layout.filter(item => item.i !== elementId) };
                }
                return page;
            }));
            setSelectedElement(null);
        }
    };

    // This handler receives the item drop from Canvas
    const onDropElement = (pageId, layoutItem, componentType) => {
        if (isPreview) return; // Disable dropping in preview

        // Get defaults or fallbacks
        console.log("onDropElement RECEIVED", { pageId, componentType, layoutItem });

        const typeKey = componentType || 'FormChecknumber'; // Fallback to a known working component for testing
        const propsData = ComponentDefaults[typeKey] || ComponentDefaults.default;
        const { w: defW, h: defH, props: defProps = {}, ...otherDefaults } = propsData;

        const newItem = {
            ...layoutItem,
            i: uuidv4(),
            component: typeKey,
            w: defW || layoutItem.w || 8,
            h: defH || layoutItem.h || 4,
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
                <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between bg-white z-20 shadow-sm">
                    {/* Left: Branding & Form Name */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">ANTIGRAVITY</h1>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Checksheet Builder</span>
                        </div>
                        {formName && (
                            <div className="flex items-center gap-2 pl-6 border-l border-gray-200">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-black text-gray-500 uppercase tracking-wider">{formName}</span>
                                <button
                                    onClick={() => setIsWorkspaceOpen(true)}
                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition-all"
                                    title="Change Workspace"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">

                        <div className="w-px h-8 bg-gray-100 mx-2"></div>
                        <button
                            onClick={() => {
                                setIsPreview(!isPreview);
                                setSelectedElement(null); // Deselect when toggling
                            }}
                            className={`px-4 py-2 text-sm font-bold rounded-md transition-all flex items-center gap-2 ${isPreview
                                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md ring-2 ring-orange-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
                        >
                            {isPreview ? (
                                <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg> Back to Design</>
                            ) : (
                                <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg> Live Preview</>
                            )}
                        </button>

                        {!isPreview && (
                            <>
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
                                    onClick={handleSaveToServer}
                                    disabled={isSaving}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm transition-colors flex items-center gap-2 ${isSaving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Save Form
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    {!isPreview && <Toolbox workspace={formName} />}
                    {isPreview && (
                        <div className="absolute top-0 left-0 right-0 z-30">
                            <ProfileBar
                                onSave={handleSaveToServer}
                                onPrint={() => window.print()}
                                isSaving={isSaving}
                                onSetPage={handlePageChange}
                                status={status}
                                onSubmit={() => alert('Submit functionality is simulated in Preview Mode.')}
                                isVerifyMode={isVerifyMode}
                                setIsVerifyMode={setIsVerifyMode}
                                onSetPageStatus={(s) => console.log('Page Status Update:', s)}
                            />
                        </div>
                    )}

                    {/* Canvas Container */}
                    <div
                        ref={scrollContainerRef}
                        className={`flex-1 overflow-auto bg-gray-100 relative custom-scrollbar flex flex-col ${isPreview ? 'pt-16' : 'pt-4'}`}
                        onDragOver={(e) => !isPreview && e.preventDefault()}
                    >
                        <Canvas
                            pages={pages}
                            formSettings={formSettings}
                            onPageLayoutChange={onPageLayoutChange}
                            onAddPage={onAddPage}
                            onRemovePage={onRemovePage}
                            onDuplicatePage={handleDuplicatePage}
                            onMovePage={handleMovePage}
                            onDropElement={onDropElement}
                            onSelectElement={onSelectElement}
                            selectedElementId={selectedElement?.elementId}
                            isPreview={isPreview}
                        />
                    </div>

                    {/* Pagination Sidebar */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pages.length}
                        onPageChange={handlePageChange}
                        customLabels={(() => {
                            let standardPageCount = 0;
                            return pages.reduce((acc, page, index) => {
                                const pageNum = index + 1;
                                if (page.component === 'CoverPage') acc[pageNum] = 'C';
                                else if (page.component === 'A4blank') acc[pageNum] = 'B';
                                else {
                                    standardPageCount++;
                                    acc[pageNum] = String(standardPageCount);
                                }
                                return acc;
                            }, {});
                        })()}
                        style={{
                            right: !isPreview && selectedElement ? '340px' : '20px',
                            transition: 'right 0.3s ease-in-out'
                        }}
                    />

                    {/* Property Editor Sidebar */}
                    {!isPreview && selectedElement && (
                        <PropertyEditor
                            element={(() => {
                                const page = pages.find(p => p.id === selectedElement.pageId);
                                return page?.layout.find(i => i.i === selectedElement.elementId);
                            })()}
                            onUpdate={onUpdateElement}
                            onClose={() => setSelectedElement(null)}
                            workspace={formName}
                            onDelete={handleDeleteComponent}
                        />
                    )}
                </div>


                {/* Global Form Settings Modal */}
                <FormSettingsModal
                    isOpen={isFormSettingsOpen}
                    onClose={() => setIsFormSettingsOpen(false)}
                    onSave={(newSettings) => {
                        setFormSettings({
                            ...newSettings,
                            cover: {
                                ...newSettings.cover,
                                issuedBy: 'ENGINEERING DIV.',
                                company: 'Sodick ( Thailand ) Co., Ltd.'
                            },
                            content: {
                                ...newSettings.content,
                                controlBy: 'Assembly Division',
                                company: 'Sodick (Thailand) Co.,Ltd'
                            }
                        });
                    }}
                    initialValues={formSettings}
                />

                <WorkspaceModal
                    isOpen={isWorkspaceOpen}
                    onWorkspaceSet={handleWorkspaceSet}
                />
            </div>
        </FormProvider>
    );
};

export default Builder;
