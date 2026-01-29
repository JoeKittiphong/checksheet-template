import { useState, useRef, useEffect } from 'react';

/**
 * Pagination Component with Page Preview
 * Sidebar ขวา
 * - Expanded: แสดง Thumbnail รายการหน้า
 * - Collapsed: แสดงตัวเลขหน้า
 */
function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    pageComponents = [],
    pageStatus = {}, // { 1: 'success', 2: 'error' }
    ...props
}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);
    const initialZoom = useRef(window.devicePixelRatio);
    const sidebarRef = useRef(null);

    // ตรวจจับ zoom level
    useEffect(() => {
        const detectZoom = () => {
            const currentDPR = window.devicePixelRatio;
            const relativeZoom = currentDPR / initialZoom.current;
            setZoomLevel(relativeZoom);
        };
        detectZoom();
        window.addEventListener('resize', detectZoom);
        return () => window.removeEventListener('resize', detectZoom);
    }, []);

    // Handle click outside to collapse
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isExpanded) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    const counterScale = 1 / zoomLevel;

    // Helper for status color
    const getStatusColor = (page) => {
        const status = pageStatus[page];
        if (status === 'success') return '#22c55e'; // Green-500
        if (status === 'error') return '#ef4444'; // Red-500
        return null;
    };

    return (
        <>
            {/* Hide scrollbar CSS and Thumbnail overrides */}
            <style>{`
                .pagination-scroll::-webkit-scrollbar {
                    display: none;
                }
                .pagination-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                /* Override A4Paper styles in thumbnails */
                /* Outer Wrapper (Gray Bg) -> Make Transparent */
                .pagination-thumbnail > div {
                    min-height: 0 !important;
                    background-color: transparent !important;
                    padding: 0 !important;
                    display: block !important;
                    width: auto !important;
                    height: auto !important;
                    overflow: visible !important;
                    border: none !important;
                }
                
                /* Inner Paper (White Bg) -> Keep White */
                .pagination-thumbnail > div > div {
                    background-color: white !important;
                    box-shadow: none !important;
                    border: 1px solid #e5e7eb !important; /* Light border for paper definition */
                    margin: 0 !important;
                }
            `}</style>

            {/* Right Sidebar */}
            <div
                ref={sidebarRef}
                style={{
                    position: 'fixed',
                    right: 0,
                    top: '50%',
                    transform: `translateY(-50%) scale(${counterScale})`,
                    transformOrigin: 'right center',
                    zIndex: 9999,
                    height: 'auto',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {/* Toggle Button (Left of sidebar) */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        padding: '12px 4px',
                        background: '#9ca3af', // Gray-400
                        border: '1px solid #d1d5db',
                        borderRight: 'none',
                        borderRadius: '8px 0 0 8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
                    }}
                    title={isExpanded ? 'ย่อ' : 'ขยาย'}
                >
                    <span style={{
                        display: 'inline-block',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                    }}>
                        ◀
                    </span>
                </button>

                {/* Sidebar Content */}
                <div style={{
                    background: '#9ca3af', // Gray-400
                    border: '1px solid #d1d5db',
                    borderLeft: 'none',
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden',
                    width: isExpanded ? '160px' : '60px',
                    transition: 'width 0.3s ease-out',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '8px', flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Scrollable Area */}
                        <div
                            className="pagination-scroll"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                alignItems: 'center'
                            }}
                        >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                const logicalPage = page - (props.pageOffset || 0);
                                const displayLabel = (props.customLabels && props.customLabels[page]) || logicalPage;
                                const statusColor = getStatusColor(logicalPage > 0 ? logicalPage : null);

                                return (
                                    <div
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            opacity: 1, // Fixed opacity to 1 as requested
                                            transform: currentPage === page ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                    >
                                        {isExpanded ? (
                                            // Thumbnail View
                                            <div style={{
                                                width: '120px',
                                                height: '170px',
                                                background: 'white',
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                border: currentPage === page
                                                    ? '3px solid #3b82f6'
                                                    : statusColor ? `3px solid ${statusColor}` : '1px solid #6b7280'
                                            }}>
                                                <div
                                                    className="pagination-thumbnail"
                                                    style={{
                                                        transform: 'scale(0.15)',
                                                        transformOrigin: 'top left',
                                                        width: '210mm',
                                                        height: '297mm',
                                                        pointerEvents: 'none',
                                                    }}
                                                >
                                                    {pageComponents[page - 1]}
                                                </div>
                                                {/* Overlay for Click */}
                                                <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}></div>
                                                {/* Page Number Label */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    background: statusColor || 'rgba(0,0,0,0.6)',
                                                    color: 'white',
                                                    padding: '2px 6px',
                                                    fontSize: '10px',
                                                    borderTopLeftRadius: '4px',
                                                    fontWeight: statusColor ? 'bold' : 'normal'
                                                }}>
                                                    {displayLabel} {statusColor === '#22c55e' ? '✓' : ''}
                                                </div>
                                            </div>
                                        ) : (
                                            // Number View
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                background: currentPage === page
                                                    ? '#2563eb'
                                                    : statusColor || 'rgba(255, 255, 255, 0.5)',
                                                color: currentPage === page || statusColor ? 'white' : '#374151',
                                                border: currentPage === page ? 'none' : statusColor ? 'none' : '1px solid #9ca3af'
                                            }}>
                                                {displayLabel}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pagination;
