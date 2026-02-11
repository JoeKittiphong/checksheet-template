import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';
import { getValidationClass as getFormValidationClass } from '../../utils/formUtils';

const EDWFinalSizeRecord = ({ prefix = "", standards = {}, variant = "3rd", headerSuffix = "(4th)" }) => {
    const { register, control, formState: { errors } } = useFormContext();
    const allValues = useWatch({ control });

    // Helper to parse range string "7.9970~8.0020" or "14.9980-15.0020"
    const parseRange = (rangeStr) => {
        if (!rangeStr) return null;
        // Handle both ~ and - separators, but be careful with negative numbers if any (though size is usually positive)
        // Check for ~ first as it's common in this project
        let parts = rangeStr.split('~');
        if (parts.length !== 2) {
            parts = rangeStr.split('-'); // Fallback for - separator
        }

        if (parts.length === 2) {
            return { min: parts[0].trim(), max: parts[1].trim() };
        }
        return null;
    };

    const getUIVallidationClass = (val, range) => {
        if (!val || val === '-' || !range) return "";
        const isValid = getFormValidationClass(val, { min: range.min, max: range.max }) === '';
        return isValid ? "" : "bg-red-500 text-white font-bold";
    };

    // determine columns based on variant
    const getColumns = () => {
        const commonRender = (colKey, defaultStdKey) => (val, row) => {
            if (row.isStd) {
                const key = row.stdKeys ? (row.stdKeys[colKey] || defaultStdKey) : defaultStdKey;
                // Allow fallback to standards.range if key lookup fails, or explicit keys
                const stdValue = standards[key] || standards.range || "-";
                // If standards has x/y specifically, use those
                const specificStd = standards[colKey] || stdValue;

                return <span className={`font-bold ${variant === "3rd" ? "text-red-500" : "text-red-500"}`}>{specificStd}</span>;
            }

            const name = `${prefix}size_${row.id.toLowerCase()}_${colKey}`;
            const currentVal = allValues?.[name];
            // Find standard for this column
            // For validation, use 'valid' key if present (for dual std), otherwise use defaultStdKey
            const validKey = standards.valid ? 'valid' : defaultStdKey;
            // Use range from standards if direct lookup works, else fallback
            const stdStringForValidation = standards[validKey] || standards.range;
            const range = parseRange(stdStringForValidation);
            const isError = errors[name];
            const validationClass = getUIVallidationClass(currentVal, range);

            return (
                <input
                    {...register(name, { required: true })}
                    className={`w-full h-full text-center outline-none ${isError ? 'bg-red-500 placeholder:text-white' : (validationClass ? validationClass : 'bg-transparent')}`}
                />
            );
        };

        if (variant === "4th-pairs") {
            return [
                { header: "Size", key: "label", width: "20%", className: "font-bold bg-white text-[9px]" },
                { header: "a-e (4th)", key: "ae", width: "20%", render: commonRender("ae", "ae"), className: "text-[9px]" },
                { header: "b-f (4th)", key: "bf", width: "20%", render: commonRender("bf", "bf"), className: "text-[9px]" },
                { header: "c-g (4th)", key: "cg", width: "20%", render: commonRender("cg", "cg"), className: "text-[9px]" },
                { header: "d-h (4th)", key: "dh", width: "20%", render: commonRender("dh", "dh"), className: "text-[9px]" },
            ];
        }

        if (variant === "4th") {
            return [
                { header: "Size", key: "label", width: "34%", className: "font-bold bg-white" },
                { header: `X- ${headerSuffix}`, key: "x_minus", width: "33%", render: commonRender("x_minus", "x") },
                { header: `Y ${headerSuffix}`, key: "y", width: "33%", render: commonRender("y", "y") },
            ];
        }

        if (variant === "4th-dual-std") {
            return [
                { header: "Size", key: "label", width: "34%", className: "font-bold bg-white text-[9px]" },
                { header: "X- (4th)", key: "x_minus", width: "33%", render: commonRender("x_minus", "x_p") },
                { header: "Y (4th)", key: "y", width: "33%", render: commonRender("y", "y_p") },
            ];
        }

        // Default 3rd
        return [
            { header: "Size", key: "label", width: "33%", className: "font-bold bg-white" },
            { header: "X (3rd)", key: "x", width: "33%", render: commonRender("x", "x") },
            { header: "Y (3rd)", key: "y", width: "33%", render: commonRender("y", "y") },
        ];
    };

    const data = [
        { id: "Up", label: "Up", className: "text-[9px]" },
        { id: "Mid", label: "Mid", className: "text-[9px]" },
        { id: "Low", label: "Low", className: "text-[9px]" },
        ...(variant === "4th-dual-std" ? [
            { id: "STD_P", label: "STD(mm)", isStd: true, stdKeys: { x_minus: "x_p", y: "y_p" }, className: "text-[9px]" },
            { id: "STD_GQ", label: "STD(mm)", isStd: true, stdKeys: { x_minus: "x_gq", y: "y_gq" }, className: "text-[9px]" }
        ] : [
            { id: "STD", label: "STD(mm)", isStd: true, className: "text-[9px]" }
        ])
    ];

    return (
        <div className={`w-full ${variant === "4th-pairs" ? "max-w-full" : (variant === "4th" ? "max-w-[300px]" : "max-w-[300px]")}`}>
            <FormQuickTable
                columns={getColumns()}
                data={data}
                className="text-center"
                headerClassName="bg-white"
            />
        </div>
    );
};

export default EDWFinalSizeRecord;
