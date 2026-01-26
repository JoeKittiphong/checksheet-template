import React from 'react';
/**
 * EntoSideSelector Component
 * แถวสำหรับเลือก Side (A, B, C, D, E) แบบ Single Selection
 * 
 * @param {Object} props
 * @param {string} props.label - ชื่อข้างหน้า เช่น "Front Side", "Back Side"
 * @param {string} props.value - ค่าที่ถูกเลือก (A, B, C, D, E)
 * @param {Function} props.onChange - callback เมื่อมีการเปลี่ยนการเลือก
 */
const EntoSideSelector = React.forwardRef(({
    label = '',
    value = '',
    onChange = () => { }
}, ref) => {
    const options = ['A', 'B', 'C', 'D', 'E'];

    const handleToggle = (option) => {
        // ถ้ากดอันเดิม ให้ล้างค่า (ถ้าต้องการ) หรือถ้าจะให้เลือกได้อย่างเดียวตลอดก็ onChange(option)
        if (value === option) {
            onChange('');
        } else {
            onChange(option);
        }
    };

    return (
        <div className="flex items-center gap-1 text-sm">
            {/* Label */}
            <span className="min-w-[40px] font-medium">{label}</span>

            {/* Checkboxes */}
            <div className="flex gap-1">
                {options.map((option, index) => (
                    <label key={option} className="flex items-center gap-1 cursor-pointer select-none">
                        <input
                            ref={index === 0 ? ref : null}
                            type="checkbox"
                            checked={value === option}
                            onChange={() => handleToggle(option)}
                            className="w-4 h-4 cursor-pointer accent-blue-600"
                        />
                        <span className={value === option ? 'font-bold text-blue-600' : ''}>
                            {option}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
});

export default EntoSideSelector;
