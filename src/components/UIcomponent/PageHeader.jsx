/**
 * PageHeader Component
 * หัวกระดาษ A4 สำหรับใช้ในทุกหน้าเอกสาร
 */
function PageHeader({
    documentNo = 'FAEI0158',
    releaseNo = '5.0',
    controlBy = 'Assembly Division',
    title = 'Check Sheet',
    subtitle = 'ASSEMBLY',
    company = 'Sodick (Thailand) Co.,Ltd',
    currentPage = 1,
    totalPage = 1,
    date = '14/09/2017',
    model = 'T-MASTER',
    group = 'FINAL INSPECTION'
}) {
    return (
        <div className="border-b border-black text-sm">
            {/* Top Section */}
            <div className="flex border-b border-black">
                {/* Left Column */}
                <div className="w-1/3 border-r border-black">
                    <div className="flex border-b-0 border-black">
                        <div className="w-1/2 p-1 pl-2">Document No.</div>
                        <div className="w-1/2 p-1 text-center font-medium">{documentNo}</div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="w-1/2 p-1 pl-2">Release No.</div>
                        <div className="w-1/2 p-1 text-center font-medium">{releaseNo}</div>
                    </div>
                    <div className="flex border-b-0 border-black">
                        <div className="w-full p-1 pl-2">Control by</div>
                    </div>
                    <div className="flex">
                        <div className="w-full p-1 pl-2">{controlBy}</div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="w-1/3 border-r border-black flex flex-col">
                    <div className="flex-1 flex items-center justify-center border-b-0 border-black font-bold">
                        {title}
                    </div>
                    <div className="flex-1 flex items-center justify-center border-b-0 border-black font-bold">
                        {subtitle}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        {company}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-1/3">
                    <div className="flex border-b-0 border-black h-8 items-center pl-2">
                        Page
                    </div>
                    <div className="flex-1 flex items-center justify-center border-b border-black font-medium h-[33px]">
                        {currentPage} of {totalPage}
                    </div>
                    <div className="flex border-b-0 border-black">
                        <div className="w-full p-1 pl-2">Date</div>
                    </div>
                    <div className="flex">
                        <div className="w-full p-1 pl-2 text-center">{date}</div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex bg-white border-black font-bold text-sm">
                <div className="w-1/6 border-r-0 border-black p-1 pl-2">MODEL</div>
                <div className="w-1/6 border-r-0 border-black p-1 text-center">{model}</div>
                <div className="w-1/2 p-1 text-right pr-4">GROUP {group}</div>
            </div>
        </div>
    );
}

export default PageHeader;
