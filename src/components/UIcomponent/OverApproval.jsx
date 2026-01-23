import React from 'react';

/**
 * OverApproval Component
 * Horizontal layout: [Checkbox] | [Name] | [Date] | [Reason]
 * 
 * Props:
 * - data: { isApproved, name, date, reason }
 * - onChange: callback (field, value)
 */
function OverApproval({
    data = { isApproved: false, name: '', date: '', reason: '' },
    onChange = () => { }
}) {
    const handleChange = (field, value) => {
        onChange(field, value);
    };

    return (
        <div className="flex border border-black bg-white text-xs over-approval-container" style={{ width: '120mm', height: '8mm' }}>
            <style>{`
                .over-approval-container input[type="date"]::-webkit-calendar-picker-indicator {
                    display: none;
                }
            `}</style>
            {/* Checkbox Column */}
            <div className="border-r border-black flex items-center justify-center" style={{ width: '8mm' }}>
                <input
                    type="checkbox"
                    checked={data.isApproved || false}
                    onChange={(e) => handleChange('isApproved', e.target.checked)}
                    className="cursor-pointer"
                />
            </div>

            {/* Name Column */}
            <div className=" flex items-center justify-center relative" style={{ width: '25mm' }}>
                <input
                    type="text"
                    placeholder="name"
                    value={data.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-none px-1"
                />
            </div>

            {/* Date Column */}
            <div className="border-r border-black flex items-center justify-center relative" style={{ width: '18mm' }}>
                <input
                    type="date"
                    placeholder="date"
                    value={data.date || ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    onClick={(e) => {
                        try {
                            if (e.target.showPicker) e.target.showPicker();
                        } catch (err) { }
                    }}
                    className="w-full h-full text-center bg-transparent outline-none px-1"
                    style={{ fontSize: '9px' }}
                />
            </div>

            {/* Reason Column */}
            <div className="flex-1 flex items-center justify-center relative">
                <input
                    type="text"
                    placeholder="reason"
                    value={data.reason || ''}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-none px-1"
                />
            </div>
        </div>
    );
}

export default OverApproval;
