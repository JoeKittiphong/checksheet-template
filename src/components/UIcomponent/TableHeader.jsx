/**
 * TableHeader Component
 * แสดงส่วนหัวของเอกสารพร้อมข้อมูล Doc Number, Version, Date, Approval
 */
function TableHeader({
    docNumber = 'FAWB0005',
    version = '6.0',
    dateOfIssue = '7-Apr-2025',
    approvalDate = '21-Apr-2025',
    issuedBy = 'ENGINEERING DIV.',
    title = 'CHECK SHEET BODY ASS\'Y'
}) {
    return (
        <div className="m-5 border border-black text-sm">
            {/* Row 1 */}
            <div className="grid grid-cols-12 border-b border-black">
                <div className="col-span-2 border-r border-black p-1 text-left">{docNumber}</div>
                <div className="col-span-2 border-0 border-black p-1 text-left">Date of issue</div>
                <div className="col-span-2 border-r border-black p-1 text-blue-700 font-medium flex justify-center items-center">{dateOfIssue}</div>
                <div className="col-span-4 border-0 border-black p-1 text-left">Engineering Div. Approval</div>
                <div className="col-span-2 p-1 text-blue-700 font-medium flex justify-center items-center">{approvalDate}</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 border-b border-black">
                <div className="col-span-1 border-0 border-black p-1 text-left">Ver.</div>
                <div className="col-span-1 border-r border-black p-1 text-blue-700 font-medium text-center">{version}</div>
                <div className="col-span-10 p-1 pl-2">Issued by {issuedBy}</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-12">
                <div className="col-span-2 border-0 border-black p-1 text-left">TITLE:</div>
                <div className="col-span-10 p-1 pl-2 font-bold">{title}</div>
            </div>
        </div>
    );
}

export default TableHeader;
