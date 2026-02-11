import { useState, useRef, useEffect } from 'react';

/**
 * Pagination Component - Connected Vertical Strip
 * Design:
 * - Vertical Stack
 * - Connected Borders (No gaps)
 * - Larger Touch Area (48px width x 60px height)
 * - Teal Active State
 * - Supports Status Indicators (Green/Red) + Problem Indicator (Yellow)
 */
function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    pageComponents = [],
    pageStatus = {}, // { 1: { status: 'success', hasProblem: true }, 2: 'error' }
    ...props
}) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const initialZoom = useRef(window.devicePixelRatio);
    const sidebarRef = useRef(null);

    // Detect zoom level
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

    const counterScale = 1 / zoomLevel;

    // Helper for status color (Validation: Green/Red)
    const getStatusColor = (page) => {
        const statusData = pageStatus[page];
        // Support both old string format and new object format
        const status = typeof statusData === 'object' ? statusData?.status : statusData;

        if (status === 'success') return '#22c55e'; // Green-500
        if (status === 'error') return '#ef4444'; // Red-500
        return null;
    };

    // Helper for problem indicator (Yellow)
    const hasProblem = (page) => {
        const statusData = pageStatus[page];
        return typeof statusData === 'object' && statusData?.hasProblem;
    };

    return (
        <>
            <style>{`
                .pagination-scroll::-webkit-scrollbar {
                    display: none;
                }
                .pagination-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
            `}</style>

            <div
                ref={sidebarRef}
                style={{
                    position: 'fixed',
                    right: '20px', // Adjusted to not block content too much
                    top: '50%',
                    transform: `translateY(-50%) scale(${counterScale})`,
                    transformOrigin: 'right center',
                    zIndex: 9999,
                    height: 'auto',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    // Drop Shadow for the whole strip
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // No Gap
                    gap: '0',
                    // Transparent Container, No Padding
                    background: 'transparent',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }} className="pagination-scroll">

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index, arr) => {
                        const logicalPage = page - (props.pageOffset || 0);
                        const displayLabel = (props.customLabels && props.customLabels[page]) || logicalPage;

                        const statusColor = getStatusColor(logicalPage > 0 ? logicalPage : null);
                        const isProblem = hasProblem(logicalPage > 0 ? logicalPage : null);
                        const isActive = currentPage === page;

                        // Border Radius Logic: First Top, Last Bottom
                        const isFirst = index === 0;
                        const isLast = index === arr.length - 1;
                        let borderRadius = '0';
                        if (isFirst && isLast) borderRadius = '8px';
                        else if (isFirst) borderRadius = '8px 8px 0 0';
                        else if (isLast) borderRadius = '0 0 8px 8px';

                        return (
                            <div
                                key={page}
                                onClick={() => onPageChange(page)}
                                style={{
                                    width: '48px', // Larger Size
                                    height: '60px', // Tall vertical buttons
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    background: isActive ? '#14b8a6' : 'white', // Teal or White
                                    color: isActive ? 'white' : '#374151',

                                    // Connected Borders Logic
                                    border: '1px solid #d1d5db',
                                    borderBottom: isLast ? '1px solid #d1d5db' : 'none', // Overlap bottom

                                    fontWeight: isActive ? 'bold' : 'normal',
                                    fontSize: '16px',
                                    position: 'relative',
                                    borderRadius: borderRadius,
                                    zIndex: isActive ? 10 : 1 // Active sits on top
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = '#f3f4f6'; // Hover Gray
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'white';
                                    }
                                }}
                            >
                                {displayLabel}

                                {/* Status Dot (Green/Red) - Shifted left if Problem dot exists */}
                                {statusColor && !isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: isProblem ? '12px' : '4px', // Shift left to make room
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: statusColor,
                                    }} />
                                )}

                                {/* Problem Indicator Dot (Yellow) */}
                                {isProblem && !isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '2px',
                                        right: '2px', // Rightmost position
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#eab308', // Yellow-500
                                        border: '1px solid white' // Separation border
                                    }} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Pagination;
