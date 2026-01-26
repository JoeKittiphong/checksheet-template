import React from 'react';

const Checknumber = React.forwardRef(({
    label = "BED No.",
    value = "",
    onChange = () => { },
    labelClass = "text-sm",
    inputClass = "w-20 text-sm"
}, ref) => {
    return (
        <div className="flex items-end">
            <span className={`mr-1 whitespace-nowrap font-arial ${labelClass}`}>{label}</span>
            <input
                ref={ref}
                type="text"
                className={`border-b border-black outline-none px-1 font-arial ${inputClass}`}
                style={{ textTransform: 'uppercase' }}
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
            />
        </div>
    );
});

export default Checknumber;
