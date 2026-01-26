import React from 'react';

/**
 * SectionTitle Component
 * ใช้สำหรับแสดงหัวข้อของแต่ละ Section ใน Checksheet
 * Default Style: text-sm font-bold
 * 
 * @param {string} children - ข้อความที่จะแสดง
 * @param {string} className - class เพิ่มเติม (ถ้ามี)
 */
function SectionTitle({ children, className = "" }) {
    return (
        <p className={`text-sm font-bold ${className}`}>
            {children}
        </p>
    );
}

export default SectionTitle;
