import React, { useState, useEffect, useRef } from 'react';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import _ from 'lodash';
import { ComponentMap } from './ComponentMap';

// Custom WidthProvider to handle ESM export issues
const WidthProvider = (ComposedComponent) => {
    return (props) => {
        const [width, setWidth] = useState(1200);
        const elementRef = useRef(null);

        useEffect(() => {
            const handleResize = () => {
                if (elementRef.current) {
                    setWidth(elementRef.current.offsetWidth);
                }
            };

            // Initial measure
            handleResize();

            // Window resize
            window.addEventListener('resize', handleResize);

            // ResizeObserver for container resize
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    setWidth(entry.contentRect.width);
                }
            });

            if (elementRef.current) {
                resizeObserver.observe(elementRef.current);
            }

            return () => {
                window.removeEventListener('resize', handleResize);
                resizeObserver.disconnect();
            };
        }, []);

        return (
            <div className={props.className} style={props.style} ref={elementRef}>
                <ComposedComponent {...props} width={width} />
            </div>
        );
    };
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const Canvas = ({ pages, formSettings, onPageLayoutChange, onRemovePage, onDropElement, onEditPage, onSelectElement, selectedElementId }) => {
    // Default props for the grid
    const defaultProps = {
        className: "layout",
        // A4 width ~ 210mm. At 96 DPI -> ~794px. At 72 DPI -> ~595px.
        // Tailwind 'max-w-4xl' is 56rem (896px). 
        // We want 12 columns by default.
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 30,
        isDroppable: true,
        compactType: null, // Free movement
        preventCollision: false,
    };

    const generateDOM = (pageLayout, pageId) => {
        return _.map(pageLayout, (l) => {
            const Component = ComponentMap[l.component];
            const key = String(l.i);
            const isSelected = selectedElementId === l.i;

            return (
                <div
                    key={key}
                    className={`bg-white border ${isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-dashed border-gray-400'} overflow-hidden relative group`}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent deselecting or selecting page
                        onSelectElement(pageId, l.i);
                    }}
                >
                    <div className="absolute top-0 right-0 p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-l border-b border-gray-200 rounded-bl text-xs">
                        <span className="font-bold text-gray-600">{l.component}</span>
                    </div>
                    <div className="h-full w-full p-2 overflow-auto pointer-events-none">
                        {Component ? (
                            <Component {...(l.props || {})} name={`preview_${key}`} />
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

    if (!pages || pages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Drag a Page (A4) from the toolbox to start.
            </div>
        );
    }

    return (
        <div
            className="flex flex-col items-center gap-8 py-8 w-full min-h-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                // Global fallback for Canvas to prevent bubbling to Builder
                const dt = e.dataTransfer;
                const type = dt.getData("application/react-checksheet-type") || dt.getData("component-type");
                const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");

                if (type === 'ELEMENT') {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("CANVAS GLOBAL FALLBACK DROP", { componentKey });
                }
            }}
        >
            {pages.map((page, index) => {
                const PageContainer = ComponentMap[page.component] || ComponentMap['A4Paper'];

                return (
                    <div
                        key={page.id}
                        className="relative group w-[210mm] h-[297mm] bg-white shadow-2xl my-8"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            // Page level fallback: Catch drops that hit the margin but were intended for this page
                            const dt = e.dataTransfer;
                            const type = dt.getData("application/react-checksheet-type") || dt.getData("component-type");
                            const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");

                            if (type === 'ELEMENT') {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("PAGE FALLBACK DROP", { componentKey, pageId: page.id });
                                // Add to a default position if it missed the grid
                                onDropElement(page.id, { x: 0, y: 0, w: 4, h: 2 }, componentKey);
                            }
                        }}
                    >
                        {/* Page Action Bar - Floating to the right */}
                        <div className="absolute top-0 -right-12 h-full py-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 z-50">
                            <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded -rotate-90 origin-bottom-left translate-y-8 translate-x-2 whitespace-nowrap">
                                Page {index + 1}
                            </div>
                            <button
                                onClick={() => onEditPage(page.id)}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-sm mb-2"
                                title="Page Settings"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onRemovePage(page.id)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm"
                                title="Delete Page"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Background Layer: Page Template (Inert) */}
                        <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-80">
                            <PageContainer
                                className="w-full h-full"
                                currentPage={index + 1}
                                totalPage={pages.length}
                                content={{ ...formSettings?.content, ...page.props?.content }}
                                headerData={formSettings?.cover}
                                formNumber={page.props?.formNumber || formSettings?.content?.formNumber}
                                isBuilder={true}
                            />
                        </div>

                        {/* Foreground Layer: Draggable Grid (Live Drop Zone) */}
                        <div
                            className="absolute inset-0 z-10 flex flex-col bg-transparent"
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <ResponsiveGridLayout
                                {...defaultProps}
                                className="flex-1 bg-blue-50/5 p-[10mm]" // Subtle hint of grid area
                                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                                layouts={{
                                    lg: page.layout || [],
                                    md: page.layout || [],
                                    sm: page.layout || [],
                                    xs: page.layout || [],
                                    xxs: page.layout || []
                                }}
                                onLayoutChange={(newLayout) => {
                                    onPageLayoutChange(page.id, newLayout);
                                }}
                                onDrop={(layout, layoutItem, event) => {
                                    event.preventDefault();
                                    event.stopPropagation();

                                    const dt = event.dataTransfer;
                                    const type = dt.getData("application/react-checksheet-type") || dt.getData("component-type");
                                    const componentKey = dt.getData("application/x-component-name") || dt.getData("component-name") || dt.getData("text/plain");

                                    console.log("CANVAS GRID DROP", { type, componentKey, pageId: page.id, layoutItem });

                                    if (type === 'ELEMENT') {
                                        onDropElement(page.id, layoutItem, componentKey);
                                    }
                                }}
                                droppingItem={{ i: '__dropping-elem__', w: 4, h: 2 }}
                                measureBeforeMount={true}
                                useCSSTransforms={true}
                                style={{ minHeight: '100%', width: '100%' }}
                            >
                                {generateDOM(page.layout || [], page.id)}
                            </ResponsiveGridLayout>
                        </div>
                    </div>
                );
            })}

            {/* Add Page Button at Bottom */}
            <div className="h-32 w-[210mm] border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => {
                    // Adding a default A4 page
                    const event = new Event('drop');
                    // We can't simulate DnD easily, but we can call parent's add method if exposed, 
                    // or just tell user to drag.
                    // Let's just create a mock "Add Page" interaction or leave it as a drop zone hint.
                }}
            >
                <div className="text-4xl mb-2">+</div>
                <div>Drag a Page template here to add</div>
            </div>
        </div>
    );
};

export default Canvas;
