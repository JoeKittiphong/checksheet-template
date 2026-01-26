import React from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * EDWVersionCheck Component
 * แสดง Layout 2 Column สำหรับเช็คเวอร์ชั่นต่างๆ
 * 
 * Column 1: GUI, HI, M4H, UWL
 * Column 2: PLC, Sm-ART, Disk, Checked by
 * 
 * @param {string} prefix - prefix สำหรับชื่อ field เพื่อป้องกันชื่อซ้ำ (default: "version_")
 */
const EDWVersionCheck = ({ prefix = "version_" }) => {
    const { register } = useFormContext();

    const renderField = (label, name) => (
        <div className="flex items-center gap-2 mb-2">
            <span className="text-sm min-w-[50px]">{label} : </span>
            <input
                type="text"
                {...register(`${prefix}${name}`)}
                className="border-b border-black outline-none px-1 text-sm flex-1"
            />
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-x-12 p-2">
            {/* Left Column */}
            <div>
                {renderField("GUI", "gui")}
                {renderField("HI", "hi")}
                {renderField("M4H", "m4h")}
                {renderField("UWL", "uwl")}
            </div>

            {/* Right Column */}
            <div>
                {renderField("PLC", "plc")}
                {renderField("Sm-ART", "smart")}
                {renderField("Disk", "disk")}
                {renderField("Checked by", "checkedBy")}
            </div>
        </div>
    );
};

export default EDWVersionCheck;
