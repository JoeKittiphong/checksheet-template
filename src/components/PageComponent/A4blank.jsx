import React from 'react';

/**
 * A4blank Component
 * หน้า A4 เปล่าไม่มีข้อมูลอะไร เอาไว้เป็นหน้าคั่น
 * สามารถใส่ children เพื่อแสดงเนื้อหาได้
 */
function A4blank({ children }) {
    return (
        <div className="min-h-screen py-8 px-4 flex justify-center overflow-auto print:p-0 print:bg-white print:overflow-visible print:block print:min-h-0">
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            `}</style>
            <div
                className="bg-white shadow-2xl border border-gray-300 relative shrink-0 print:shadow-none print:border-none print:m-0 print:w-full print:h-full"
                style={{
                    width: '210mm',
                    height: '297mm',
                    breakAfter: 'page',
                    pageBreakAfter: 'always'
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default A4blank;
