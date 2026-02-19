import React, { useState, useEffect, useRef } from 'react';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import _ from 'lodash';
import { ComponentMap } from './ComponentMap';

// Custom WidthProvider to handle ESM export issues
const WidthProvider = (ComposedComponent) => {
    return (props) => {
        // We now use relative width because the grid is nested inside the paper content
        return (
            <div className={`${props.className} w-full`} style={props.style}>
                <ComposedComponent {...props} width={715} />
            </div>
        );
    };
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const Canvas = ({ pages, formSettings, onPageLayoutChange, onAddPage, onRemovePage, onDropElement, onEditPage, onSelectElement, selectedElementId, isPreview = false }) => {
    // Default props for the grid
    const defaultProps = {
        className: `layout ${isPreview ? 'isPreview' : 'isBuilder'}`,
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 36, md: 36, sm: 36, xs: 36, xxs: 36 },
        rowHeight: 30, // Restored to 30px
        margin: [0, 0],
        containerPadding: [0, 0],
        isDroppable: !isPreview,
        isDraggable: !isPreview,
        isResizable: !isPreview,
        compactType: null,
        preventCollision: false,
    };

    const generateDOM = (pageLayout, pageId) => {
        return _.map(pageLayout, (l) => {
            const Component = ComponentMap[l.component];
            const key = String(l.i);
            const isSelected = selectedElementId === l.i && !isPreview;

            return (
                <div
                    key={key}
                    className={`relative group ${isSelected ? 'ring-2 ring-blue-500 z-50' : ''}`}
                    onClick={(e) => {
                        if (isPreview) return;
                        e.stopPropagation();
                        onSelectElement(pageId, l.i);
                    }}
                >
                    {!isPreview && (
                        <div className="absolute top-0 right-0 p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-l border-b border-gray-200 rounded-bl text-[8px] scale-75 origin-top-right">
                            <span className="font-bold text-gray-600 uppercase">{l.component}</span>
                        </div>
                    )}
                    <div className={`h-full w-full ${isPreview ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                        {Component ? (
                            <Component {...(l.props || {})} name={`preview_${key}`} isBuilder={!isPreview} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-red-500 text-xs text-center p-2">
                                <div className="p-2 border border-red-200 bg-red-50 rounded">
                                    {l.component || 'Unknown'}?
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    const handlePageDrop = (e) => {
        if (isPreview) return;
        const dt = e.dataTransfer;
        const type = dt.getData("application/react-checksheet-type") || dt.getData("component-type");
        const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");

        if (type === 'PAGE') {
            e.preventDefault();
            e.stopPropagation();
            onAddPage(componentKey);
        }
    };

    if (!pages || pages.length === 0) {
        return (
            <div
                className="flex items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-200 m-8 rounded-xl"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handlePageDrop}
            >
                <div className="text-center">
                    <div className="text-4xl mb-2 opacity-20">📄</div>
                    <p>Drag a Page (A4) from the toolbox to start.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col items-center gap-12 py-12 w-full min-h-full"
            onDragOver={(e) => !isPreview && e.preventDefault()}
        >
            {(() => {
                const standardPages = pages.filter(p => !['CoverPage', 'A4blank'].includes(p.component));
                const totalStandardPages = standardPages.length;
                let currentStandardPageCount = 0;

                return pages.map((page, index) => {
                    const PageContainer = ComponentMap[page.component] || ComponentMap['A4Paper'];
                    const isStandardPage = !['CoverPage', 'A4blank'].includes(page.component);

                    let displayPageNum = index + 1;
                    let displayTotalPages = pages.length;

                    if (isStandardPage) {
                        currentStandardPageCount++;
                        displayPageNum = currentStandardPageCount;
                        displayTotalPages = totalStandardPages;
                    } else {
                        // For Cover and Blank, we can use their labels but might still want totalStandardPages for reference
                        displayPageNum = page.component === 'CoverPage' ? 'C' : 'B';
                        displayTotalPages = totalStandardPages;
                    }

                    const currentLayout = (page.layout || []).map(item => ({
                        ...item,
                        static: isPreview
                    }));

                    return (
                        <div
                            key={page.id}
                            id={`builder-page-${index + 1}`}
                            className={`relative group ${isPreview ? 'isPreview' : 'hover:ring-4 hover:ring-blue-100 transition-all'}`}
                            onDragOver={(e) => !isPreview && e.preventDefault()}
                        >
                            {/* Page Action Bar */}
                            {!isPreview && (
                                <div className="absolute top-0 -right-14 h-full py-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-3 z-50">
                                    <div className="bg-gray-800 text-white text-[10px] py-1 px-3 rounded-full shadow-lg -rotate-90 origin-bottom-left translate-y-12 translate-x-4 whitespace-nowrap font-bold">
                                        PAGE {displayPageNum}
                                    </div>
                                    <button
                                        onClick={() => onRemovePage(page.id)}
                                        className="p-2.5 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-xl border border-red-100 transition-all active:scale-90"
                                        title="Delete Page"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <PageContainer
                                currentPage={displayPageNum}
                                totalPage={displayTotalPages}
                                content={{
                                    ...formSettings?.content,
                                    totalPage: displayTotalPages
                                }}
                                headerData={formSettings?.cover}
                                formNumber={page.props?.formNumber || formSettings?.content?.formNumber}
                                isBuilder={true}
                            >
                                {/* Grid is now INSIDE the PageContainer content area */}
                                <div
                                    className={`w-full h-full relative transition-all ${isPreview ? 'bg-transparent' : ''}`}
                                    style={{
                                        backgroundImage: isPreview ? 'none' : 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                                        backgroundSize: `${190 / 36}mm 30px`, // Match 36 columns across 190mm inner A4 width
                                        minHeight: '800px' // Ensure enough space for empty pages
                                    }}
                                    onDragOver={(e) => !isPreview && e.preventDefault()}
                                    onDrop={(e) => {
                                        if (isPreview) return;
                                        const dt = e.dataTransfer;
                                        const type = dt.getData("application/react-checksheet-type") || dt.getData("component-type");
                                        const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");

                                        if (type === 'ELEMENT') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onDropElement(page.id, { x: 0, y: 0, w: 12, h: 4 }, componentKey);
                                        }
                                    }}
                                >
                                    <ResponsiveGridLayout
                                        {...defaultProps}
                                        key={isPreview ? 'preview-grid' : 'edit-grid'}
                                        layouts={{
                                            lg: currentLayout,
                                            md: currentLayout,
                                            sm: currentLayout,
                                            xs: currentLayout,
                                            xxs: currentLayout
                                        }}
                                        onLayoutChange={(newLayout) => {
                                            if (!isPreview) onPageLayoutChange(page.id, newLayout);
                                        }}
                                        onDrop={(layout, layoutItem, event) => {
                                            if (isPreview) return;
                                            event.preventDefault();
                                            event.stopPropagation();
                                            const dt = event.dataTransfer;
                                            const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");
                                            onDropElement(page.id, layoutItem, componentKey);
                                        }}
                                        droppingItem={{ i: '__dropping-elem__', w: 12, h: 4 }}
                                        measureBeforeMount={true}
                                        useCSSTransforms={true}
                                        resizeHandles={isPreview ? [] : ['s', 'e', 'se']}
                                    >
                                        {generateDOM(page.layout || [], page.id)}
                                    </ResponsiveGridLayout>
                                </div>
                            </PageContainer>
                        </div>
                    );
                });
            })()}

            {/* Add Page Button */}
            {!isPreview && (
                <div
                    className="h-32 w-[794px] border-4 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group shadow-inner"
                    onClick={() => onAddPage('A4Paper')}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handlePageDrop}
                >
                    <div className="text-5xl mb-2 group-hover:scale-125 transition-transform">+</div>
                    <div className="text-sm font-bold uppercase tracking-wider">Drag Page here or Click to Add</div>
                </div>
            )}
        </div>
    );
};

const style = `
    .react-resizable-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        z-index: 100;
        opacity: 0 !important;
        transition: opacity 0.2s, background-color 0.2s;
        background-color: #3b82f6 !important;
        display: block !important;
    }

    /* Hide handles and placeholders strictly in Preview Mode */
    .isPreview .react-resizable-handle,
    .isPreview .react-grid-placeholder {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
    }

    /* Only show handles on hover if we are in Builder Mode */
    .isBuilder .react-grid-item:hover > .react-resizable-handle {
        opacity: 0.5 !important;
    }

    .isBuilder .react-grid-item:has(.ring-2) > .react-resizable-handle {
        opacity: 0.8 !important;
        background-color: #3b82f6 !important;
    }

    .react-resizable-handle:hover {
        opacity: 1 !important;
        background-color: #2563eb !important;
        transform: scale(1.3);
    }

    .react-resizable-handle-n { top: 0; left: 50%; cursor: n-resize; transform: translateX(-50%); width: 40px; height: 6px; border-radius: 3px; }
    .react-resizable-handle-s { bottom: 0; left: 50%; cursor: s-resize; transform: translateX(-50%); width: 40px; height: 6px; border-radius: 3px; }
    .react-resizable-handle-e { right: 0; top: 50%; cursor: e-resize; transform: translateY(-50%); width: 6px; height: 40px; border-radius: 3px; }
    .react-resizable-handle-w { left: 0; top: 50%; cursor: w-resize; transform: translateY(-50%); width: 6px; height: 40px; border-radius: 3px; }

    .react-resizable-handle-se { bottom: 0; right: 0; cursor: se-resize; border-radius: 50%; }
    .react-resizable-handle-sw { bottom: 0; left: 0; cursor: sw-resize; border-radius: 50%; }
    .react-resizable-handle-ne { top: 0; right: 0; cursor: ne-resize; border-radius: 50%; }
    .react-resizable-handle-nw { top: 0; left: 0; cursor: nw-resize; border-radius: 50%; }

    .react-grid-layout { transition: height 200ms ease; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
}

export default Canvas;
