import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import Cover from "./pages/Cover";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Page9 from "./pages/Page9";
import Page10 from "./pages/Page10";
import Page11 from "./pages/Page11";
import Page12 from "./pages/Page12";
import Page13 from "./pages/Page13";
import Page14 from "./pages/Page14";
import Page15 from "./pages/Page15";
import Page16 from "./pages/Page16";
import Page17 from "./pages/Page17";
import Page18 from "./pages/Page18";
import Page19 from "./pages/Page19";
import Page20 from "./pages/Page20";
import Page21 from "./pages/Page21";
import Page22 from "./pages/Page22";
import Page23 from "./pages/Page23";
import Blankpage from "./pages/Blankpage";
import ProfileBar from "@/components/UIcomponent/ProfileBar";
import Pagination from "@/components/UIcomponent/Pagination";
import { meta, apiEndpoint } from "./FAMB0002v2-setting";
import { saveForm, loadForm } from "@/utils/apiUtils";
import { ChecksheetProvider } from "@/context/ChecksheetContext"; // Import Provider

function FAMB0002V2() {
    // ... (state and effects remain the same)
    const [currentPage, setCurrentPage] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formId, setFormId] = useState(null);

    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            model: meta.model,
            machine_no: '',
        }
    });

    // Check authentication and load data
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            setIsLoading(true);
            try {
                // Check if user is logged in
                const authRes = await axios.get(`${apiEndpoint}/auth/me`, { withCredentials: true });
                if (!authRes.data.success) {
                    window.location.href = '/'; // Redirect to login
                    return;
                }

                const data = await loadForm({
                    apiEndpoint,
                    searchParams: window.location.search,
                    meta
                });

                if (data) {
                    if (data.checksheet_data) {
                        methods.reset(data.checksheet_data);
                    }
                    if (data.id) {
                        setFormId(data.id);
                    }
                }
            } catch (error) {
                console.error("Error checking auth or loading form data:", error);
                window.location.href = '/'; // Redirect on error (likely unauthorized)
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAndLoadData();
    }, [methods]);

    const pages = [
        <Cover />,
        <Blankpage />,
        <Page1 />,
        <Page2 />,
        <Page3 />,
        <Page4 />,
        <Page5 />,
        <Page6 />,
        <Page7 />,
        <Page8 />,
        <Page9 />,
        <Page10 />,
        <Page11 />,
        <Page12 />,
        <Page13 />,
        <Page14 />,
        <Page15 />,
        <Page16 />,
        <Page17 />,
        <Page18 />,
        <Page19 />,
        <Page20 />,
        <Page21 />,
        <Page22 />,
        <Page23 />,
    ];

    const pageLabels = [
        "Cover",
        "Blank",
        "Page 1", "Page 2", "Page 3", "Page 4", "Page 5",
        "Page 6", "Page 7", "Page 8", "Page 9", "Page 10",
        "Page 11", "Page 12", "Page 13", "Page 14", "Page 15",
        "Page 16", "Page 17", "Page 18", "Page 19", "Page 20",
        "Page 21", "Page 22", "Page 23"
    ];

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const formData = methods.getValues();
            const result = await saveForm({
                apiEndpoint,
                formId,
                meta,
                formData
            });

            if (result.success) {
                // Return result cleanly without forcing alerts here if component handles it
                alert(result.message);
                if (result.isNew) {
                    // Optionally reload to get ID or just stay
                    // window.location.reload(); or update id
                }
                return result;
            }
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการบันทึก: " + error.message);
            throw error; // Re-throw for caller to handle
        } finally {
            setIsSaving(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // Modified return to wrap with ChecksheetProvider
    return (
        <FormProvider {...methods}>
            <ChecksheetProvider handleSave={handleSave} isSaving={isSaving}>
                <div className="flex flex-col h-screen">
                    {/* Top Profile Bar */}
                    <ProfileBar
                        onSave={handleSave}
                        onPrint={handlePrint}
                        isSaving={isSaving}
                    />

                    {/* Screen-only elements - Pagination */}
                    <div className="print:hidden my-2">
                        {/* Remove FloatingActionMenu */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pages.length}
                            onPageChange={setCurrentPage}
                            pageLabels={pageLabels}
                            pageComponents={pages}
                        />

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="fixed top-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg z-50 animate-pulse">
                                <p className="font-bold">Loading...</p>
                                <p>Fetching data from server</p>
                            </div>
                        )}
                    </div>

                    {/* Pages Container */}
                    <div className="w-full flex flex-col items-center flex-1 overflow-auto bg-gray-100 print:bg-white print:overflow-visible">
                        {/* Wrap pages in a constrained width container for screen view */}
                        <div className="w-[210mm] bg-white shadow-lg print:shadow-none print:w-full">
                            {pages.map((page, index) => {
                                const pageNum = index + 1;
                                const isCurrent = pageNum === currentPage;

                                return (
                                    <div
                                        key={index}
                                        className={`
                                            ${isCurrent ? 'block' : 'hidden'} 
                                            print:block print:w-full print:h-[297mm] print:break-after-page
                                        `}
                                    >
                                        {page}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ChecksheetProvider>
        </FormProvider>
    );
}

export default FAMB0002V2;
