
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import { getValidationClass as getFormValidationClass } from '../../utils/formUtils';

const EDWFinalRecordCutting = ({ prefix = "", standards = {}, placeholders = {} }) => {
    // ... existing hook calls ...
    const { register, control, formState: { errors } } = useFormContext();
    const allValues = useWatch({ control });

    // ... defaultStandards and std logic ...
    const defaultStandards = {
        c0001: { v: "26~34", a: "10.0~14.0", speed: "0.8~1.3", time: "H071= 36:30~46:30" },
        c0002: { v: "42~52", a: "1.3~3.3", speed: "2.4~3.4", time: "H072= 10:30~12:30", color: "text-red-500" },
        c0003: { v: "1150~1400", a: "0.2~1.3", speed: "3.5~5.5", time: "H073= 07:00~09:00", color: "text-red-500" },
        c904: { v: "-", a: "", speed: "", time: "" },
        totalTime: "H081= 54:00~1:08:00"
    };

    const std = { ...defaultStandards, ...standards };

    // Helper to parse range string "26~34" or "H071= 36:30~46:30"
    const parseRange = (rangeStr) => {
        if (!rangeStr) return null;
        // Clean up prefixes like "H071= "
        const cleanStr = rangeStr.replace(/^[A-Z0-9]+=\s*/, '');
        const parts = cleanStr.split('~').map(s => s.trim());
        if (parts.length === 2) {
            return { min: parts[0], max: parts[1] };
        }
        return null;
    };

    // Helper to convert time "MM:SS" or "H:MM:SS" to minutes for comparison
    const timeToMinutes = (timeStr) => {
        if (!timeStr) return null;
        if (typeof timeStr !== 'string') return parseFloat(timeStr) || null;

        // Clean and handle different delimiters like . or , if user accidentally types them
        const cleanStr = timeStr.trim().replace(/[.,]/g, ':');
        const parts = cleanStr.split(':').map(Number);

        if (parts.length === 2) {
            // MM:SS -> MM.fraction
            return parts[0] + (parts[1] / 60);
        } else if (parts.length === 3) {
            // H:MM:SS -> (H*60) + MM + (SS/60)
            return (parts[0] * 60) + parts[1] + (parts[2] / 60);
        }

        return parseFloat(timeStr) || null;
    };

    const getUIVallidationClass = (val, range, isTime = false) => {
        if (!val || val === '-' || !range) return "";
        let isValid = true;

        if (isTime) {
            const currentMin = timeToMinutes(val);
            const minMin = timeToMinutes(range.min);
            const maxMin = timeToMinutes(range.max);
            if (currentMin !== null && minMin !== null && maxMin !== null) {
                isValid = currentMin >= minMin && currentMin <= maxMin;
            }
        } else {
            // Use global utility but map it to our UI class
            isValid = getFormValidationClass(val, { min: range.min, max: range.max }) === '';
        }

        return isValid ? "" : "bg-red-200 text-white font-bold";
    };

    const recordColumns = [
        { header: "", key: "id", width: "15%", className: "bg-gray-300 font-bold text-[9px]" },
        {
            header: "Voltage(LCD)\n(V)",
            key: "v",
            width: "20%",
            type: 'input',
            className: "text-[9px]",
            render: (val, row) => {
                const name = row.isFooter ? `${prefix}wire_broken` : `${prefix}${row.id.toLowerCase()}_v`;
                const currentVal = allValues?.[name];
                const range = parseRange(std[row.stdKey]?.v);
                const isError = errors[name];
                const validationClass = getUIVallidationClass(currentVal, range);

                return (
                    <input
                        {...register(name, { required: true })}
                        placeholder={row.placeholderV}
                        className={`w-full h-full text-center outline-none ${isError ? 'bg-red-500 placeholder:text-white' : (validationClass ? validationClass : 'bg-transparent')} placeholder:text-gray-300 text-[7px]`}
                    />
                );
            }
        },
        {
            header: "Current(LCD)\n(V)",
            key: "a",
            width: "20%",
            type: 'input',
            className: "text-[9px]",
            render: (val, row) => {
                if (row.isFooter) return <span className="font-bold text-[9px]">Time(s)</span>;
                const name = `${prefix}${row.id.toLowerCase()}_a`;
                const currentVal = allValues?.[name];
                const range = parseRange(std[row.stdKey]?.a);
                const isError = errors[name];
                const validationClass = getUIVallidationClass(currentVal, range);

                return (
                    <input
                        {...register(name, { required: true })}
                        placeholder={row.placeholderA}
                        className={`w-full h-full text-center outline-none ${isError ? 'bg-red-500 placeholder:text-white' : (validationClass ? validationClass : 'bg-transparent')} placeholder:text-gray-300 text-[7px]`}
                    />
                );
            }
        },
        {
            header: "Cutting Speed\n(mm/min)",
            key: "speed",
            width: "20%",
            type: 'input',
            className: "text-[9px]",
            render: (val, row) => {
                const name = row.isFooter ? `${prefix}time_s` : `${prefix}${row.id.toLowerCase()}_speed`;
                const currentVal = allValues?.[name];
                const range = parseRange(std[row.stdKey]?.speed);
                const isError = errors[name];
                const validationClass = getUIVallidationClass(currentVal, range);

                return (
                    <input
                        {...register(name, { required: true })}
                        placeholder={row.placeholderSpeed}
                        className={`w-full h-full text-center outline-none ${isError ? 'bg-red-500 placeholder:text-white' : (validationClass ? validationClass : 'bg-transparent')} placeholder:text-gray-300 text-[7px]`}
                    />
                );
            }
        },
        {
            header: "Cutting Time",
            key: "time",
            width: "20%",
            type: 'input',
            className: "text-[9px]",
            render: (val, row) => {
                const label = row.isFooter ? "H081=" : (row.timeLabel || "");
                const name = row.isFooter ? `${prefix}h081_time` : `${prefix}${row.id.toLowerCase()}_time`;
                const currentVal = allValues?.[name];
                const rangeStr = row.isFooter ? std.totalTime : std[row.stdKey]?.time;
                const range = parseRange(rangeStr);
                const isError = errors[name];
                const validationClass = getUIVallidationClass(currentVal, range, true);

                return (
                    <div className={`flex items-center px-1 h-full gap-1 ${isError ? 'bg-red-500' : validationClass} text-[9px]`}>
                        <span className="shrink-0 font-bold">{label}</span>
                        <input
                            {...register(name, { required: true })}
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
                );
            }
        },
    ];

    // Helper to get placeholder
    const getPlaceholder = (id, field, defaultVal) => {
        const key = id.toLowerCase();
        if (placeholders[key] && placeholders[key][field] !== undefined) {
            return placeholders[key][field];
        }
        return defaultVal;
    };

    const recordData = [
        {
            id: "C0001",
            placeholderV: getPlaceholder("c0001", "v", "H122"),
            placeholderA: getPlaceholder("c0001", "a", "H142"),
            placeholderSpeed: getPlaceholder("c0001", "speed", "H102"),
            timeLabel: "H071=", stdKey: "c0001"
        },
        {
            id: "C0002",
            placeholderV: getPlaceholder("c0002", "v", "H123"),
            placeholderA: getPlaceholder("c0002", "a", "H143"),
            placeholderSpeed: getPlaceholder("c0002", "speed", "H103"),
            timeLabel: "H072=", stdKey: "c0002"
        },
        {
            id: "C0003",
            placeholderV: getPlaceholder("c0003", "v", "H126"),
            placeholderA: getPlaceholder("c0003", "a", "H146"),
            placeholderSpeed: getPlaceholder("c0003", "speed", "H106"),
            timeLabel: "H073=", stdKey: "c0003"
        },
        {
            id: "C904",
            placeholderV: getPlaceholder("c904", "v", "H127"),
            placeholderA: getPlaceholder("c904", "a", ""),
            placeholderSpeed: getPlaceholder("c904", "speed", "H107"),
            timeLabel: "H074=", stdKey: "c904"
        },
        { id: "Wire broken", isFooter: true }
    ];

    const stdColumns = [
        { header: "Voltage(LCD)\n(V)", key: "v", width: "18%", className: "text-[9px] bg-gray-100" },
        { header: "Current(LCD)\n(V)", key: "a", width: "18%", className: "text-[9px] bg-gray-100" },
        { header: "Cutting Speed (mm/min)", key: "speed", width: "28%", className: "text-[9px] bg-gray-100" },
        { header: "Cutting Time", key: "time", width: "36%", align: 'left', className: "text-[9px] px-2" },
    ];

    const stdData = [
        { v: std.c0001.v, a: std.c0001.a, speed: std.c0001.speed, time: std.c0001.time },
        { v: std.c0002.v, a: std.c0002.a, speed: std.c0002.speed, time: std.c0002.time, className: "text-[9px] text-red-500 font-bold" },
        { v: std.c0003.v, a: std.c0003.a, speed: std.c0003.speed, time: std.c0003.time, className: "text-[9px] text-red-500 font-bold" },
        { v: std.c904.v, a: std.c904.a, speed: std.c904.speed, time: std.c904.time },
        { v: "", a: "", speed: "", time: std.totalTime, className: "text-[9px] bg-green-500 font-bold" }
    ];

    return (
        <div className="flex gap-2 font-sans text-[8px] w-full items-start">
            {/* Record Table */}
            <div className="w-[55%]">
                <FormQuickTable
                    columns={recordColumns}
                    data={recordData}
                />
            </div>

            {/* Standard Table */}
            <div className="w-[45%]">
                <FormQuickTable
                    columns={stdColumns}
                    data={stdData}
                    className="text-center"
                />
            </div>
        </div>
    );
};

export default EDWFinalRecordCutting;
