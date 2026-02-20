import React, { useState, useEffect, useRef } from 'react';
import { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
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

const FormRenderer = ({ pages, isDraggable = false, isResizable = false }) => {
    const defaultProps = {
        className: "layout",
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 30,
        isDraggable: isDraggable,
        isResizable: isResizable,
        isDroppable: false,
    };

    const generateDOM = (pageLayout) => {
        return _.map(pageLayout, (l) => {
            const Component = ComponentMap[l.component];
            const key = String(l.i);

            return (
                <div key={key} className="bg-white border-transparent overflow-hidden">
                    <div className="h-full w-full p-2 overflow-auto">
                        {Component ? (
                            <Component {...(l.props || {})} name={`render_${key}`} />
                        ) : (
                            <div className="text-red-500">
                                Unknown Component: {l.component}
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
        // Fallback for old single-layout format or empty
        // If props.layout exists (old format), we might want to wrap it in a default page for backward compat
        return <div className="p-4 text-gray-500">No content to display.</div>;
    }

    return (
        <div className="flex flex-col items-center gap-8 py-8 w-full min-h-screen bg-white print:bg-white print:p-0 print:gap-0">
            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { margin: 0; }
                    .print\\:break-after-page { break-after: page; }
                }
            `}</style>

            {pages.map((page) => {
                const PageContainer = ComponentMap[page.component] || ComponentMap['A4Paper'];

                return (
                    <div key={page.id} className="print:break-after-page">
                        <PageContainer>
                            <ResponsiveGridLayout
                                {...defaultProps}
                                layouts={{
                                    lg: (page.layout || []).map(l => ({ ...l, static: !isDraggable })),
                                    md: (page.layout || []).map(l => ({ ...l, static: !isDraggable })),
                                    sm: (page.layout || []).map(l => ({ ...l, static: !isDraggable })),
                                    xs: (page.layout || []).map(l => ({ ...l, static: !isDraggable })),
                                    xxs: (page.layout || []).map(l => ({ ...l, static: !isDraggable }))
                                }}
                                useCSSTransforms={true}
                            >
                                {generateDOM(page.layout || [])}
                            </ResponsiveGridLayout>
                        </PageContainer>
                    </div>
                );
            })}
        </div>
    );
};

export default FormRenderer;
