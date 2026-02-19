/**
 * PageHeader Component
 * หัวกระดาษ A4 สำหรับใช้ในทุกหน้าเอกสาร
 */
function PageHeader({
    documentNo = '',
    releaseNo = '',
    controlBy = 'Assembly Division',
    currentPage = 1,
    totalPage = 1,
    date = '',
    model = '',
    group = ''
}) {
    const title = "CHECKSHEET";
    const subtitle = "ASSEMBLY";
    const company = "Sodick (Thailand) Co.,Ltd";
    return (
        <div className="border-b-2 border-black text-[9pt] leading-tight">
            {/* Top Section */}
            <div className="flex border-b border-black">
                {/* Left Column */}
                <div className="w-[30%] border-r border-black flex flex-col">
                    <div className="flex border-b border-black">
                        <div className="w-1/2 p-1.5 pl-2 font-normal">Document No.</div>
                        <div className="w-1/2 p-1.5 pr-2 text-right font-black uppercase">{documentNo}</div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="w-1/2 p-1.5 pl-2 font-normal">Release No.</div>
                        <div className="w-1/2 p-1.5 pr-4 text-right font-black">{releaseNo}</div>
                    </div>
                    <div className="flex-1 p-1.5 pl-2 flex flex-col justify-start">
                        <div className="font-normal text-[8pt]">Control by</div>
                        <div className="font-bold">{controlBy}</div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="w-[40%] border-r border-black flex flex-col items-center justify-center p-2 text-center">
                    <div className="font-black text-[12pt] uppercase tracking-wide leading-tight mb-1">
                        {title}
                    </div>
                    <div className="font-black text-[11pt] uppercase leading-tight mb-1">
                        {subtitle}
                    </div>
                    <div className="font-normal text-[9pt]">
                        {company}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-[30%] flex flex-col">
                    <div className="flex flex-col border-b border-black p-1.5 pl-2 h-14 justify-between">
                        <div className="font-normal">Page</div>
                        <div className="font-black text-center text-[11pt]">
                            {currentPage} of {totalPage}
                        </div>
                    </div>
                    <div className="flex-1 p-1.5 pl-2 flex flex-col justify-start">
                        <div className="font-normal">Date</div>
                        <div className="font-bold text-center mt-1">{date}</div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: MODEL & GROUP */}
            <div className="flex bg-white px-2 py-1 items-center justify-between font-black text-[10pt]">
                <div className="flex gap-12">
                    <div className="uppercase">MODEL</div>
                    <div className="uppercase">{model}</div>
                </div>
                <div className="uppercase">
                    GROUP {group}
                </div>
            </div>
        </div>
    );
}

export default PageHeader;
