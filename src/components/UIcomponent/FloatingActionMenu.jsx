import React, { useState } from 'react';

const FloatingActionMenu = ({ onSave, isSaving, onPrint }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handlePrint = () => {
        if (onPrint) {
            onPrint();
        } else {
            window.print();
        }
    };

    return (
        <div className="fixed top-8 left-8 z-50 flex items-center gap-2 print:hidden">
            {/* Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-gray-700 hover:bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-colors border-2 border-white"
                title={isExpanded ? "Collapse" : "Expand"}
            >
                {isExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                )}
            </button>

            {/* Save as PDF Button */}
            <button
                onClick={handlePrint}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 border-2 border-white overflow-hidden ${isExpanded ? 'px-4 h-10 w-auto' : 'w-10 h-10 p-0'}`}
                title="Print / Save as PDF"
            >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                    </svg>
                </div>
                <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'max-w-[100px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'}`}>Save PDF</span>
            </button>

            {/* Save Database Button */}
            <button
                onClick={onSave}
                disabled={isSaving}
                className={`${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 border-2 border-white overflow-hidden ${isExpanded ? 'px-4 h-10 w-auto' : 'w-10 h-10 p-0'}`}
                title="Save to Database"
            >
                {isSaving ? (
                    <>
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'max-w-[100px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'}`}>Saving...</span>
                    </>
                ) : (
                    <>
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                            <span className="text-xl leading-none">💾</span>
                        </div>
                        <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'max-w-[100px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'}`}>Save DB</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default FloatingActionMenu;
