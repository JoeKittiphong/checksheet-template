import React from 'react';

function Checknumber({
    label = "BED No.",
    value = "",
    onChange = () => { },
    labelClass = "text-sm",
    inputClass = "w-20 text-sm"
}) {
    return (
        <div className="flex items-end">
            <span className={`mr-1 whitespace-nowrap font-arial ${labelClass}`}>{label}</span>
            <input
                type="text"
                className={`border-b border-black outline-none px-1 font-arial ${inputClass}`}
                style={{ textTransform: 'uppercase' }}
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
            />
        </div>
    );
}

export default Checknumber;
