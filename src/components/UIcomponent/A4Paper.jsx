import PageHeader from "@/components/UIcomponent/PageHeader";
import ProblemDirect from "@/components/UtilComponent/ProblemDirect";
import { useChecksheet } from "@/context/ChecksheetContext";

/**
 * A4Paper Component
 * แสดงหน้ากระดาษ A4 ขนาดคงที่ พร้อม PageHeader
 * A4 Size: 210mm x 297mm
 * @param {object} content - ข้อมูล content สำหรับ PageHeader
 * @param {number} currentPage - หมายเลขหน้าปัจจุบัน
 * @param {string} formNumber - หมายเลขฟอร์มที่จะแสดงที่มุมขวาล่าง
 * @param {boolean} showHeader - แสดง PageHeader หรือไม่ (default: true)
 */
function A4Paper({
    children,
    className = '',
    formNumber = '',
    content = null,
    currentPage = 1,
    showHeader = true
}) {
    const { apiEndpoint } = useChecksheet();
    // ใช้ formNumber จาก props หรือจาก content
    const displayFormNumber = formNumber || (content?.formNumber || '');

    return (
        <div className="min-h-screen py-8 px-4 flex justify-center overflow-auto print:p-0 print:bg-white print:overflow-visible print:block print:min-h-0 relative">
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
                    /* Ensure background images/colors print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
            <div
                className={`
          bg-white 
          shadow-2xl 
          border border-gray-300
          p-[10mm]
          box-border
          relative
          shrink-0
          print:shadow-none
          print:border-none
          print:m-0
          print:w-full
          print:h-full
          print:p-[10mm]
          ${className}
        `}
                style={{
                    width: '210mm',
                    height: '297mm',
                    breakAfter: 'page',
                    pageBreakAfter: 'always'
                }}
            >
                {/* ProblemDirect - Positioning at Top-Right of paper content */}
                <div className="absolute top-2 right-2 z-50">
                    <ProblemDirect
                        name={`p${currentPage}_problem_id`}
                        apiEndpoint={apiEndpoint}
                    />
                </div>

                {/* Inner content border */}
                <div className="w-full h-full border-2 border-black relative overflow-hidden flex flex-col">


                    {/* Content Area with Padding */}
                    <div>
                        {/* PageHeader - แสดงเมื่อมี content และ showHeader เป็น true */}
                        {showHeader && content && (
                            <div className="w-full">
                                <PageHeader
                                    documentNo={content.documentNo}
                                    releaseNo={content.releaseNo}
                                    controlBy={content.controlBy}
                                    title={content.title}
                                    subtitle={content.subtitle}
                                    company={content.company}
                                    currentPage={currentPage}
                                    totalPage={content.totalPage}
                                    date={content.date}
                                    model={content.model}
                                    group={content.group}
                                />
                            </div>
                        )}
                        <div className="m-2">
                            {children}
                        </div>
                    </div>
                </div>

                {/* Form Number at bottom right corner */}
                {displayFormNumber && (
                    <div
                        className="mr-10 absolute bottom-1 right-1 text-[8pt] text-gray-600"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        {displayFormNumber}
                    </div>
                )}
            </div>
        </div>
    );
}

export default A4Paper;
