
import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormQuickTable from './FormQuickTable';

const EDWFinalRoughnessCheck = ({ prefix = "", standards = {}, variant = "3rd", className = "", headerSuffix = "(4th)" }) => {
    const { register, formState: { errors } } = useFormContext();
    const stdRange = standards.range || (variant === "4th" ? "0.330~0.430" : "0.430~0.640");

    const renderCell = (row, colKey, name) => {
        // ... (renderCell logic unchanged)
        // If it's a standard row, check if we should show the range or "No Need"
        if (row.isStd) {
            // For 3rd variant
            if (variant === "3rd") {
                if (colKey === 'x_pos' || colKey === 'x_neg') return <span className="font-bold">{stdRange}</span>;
                return "No need";
            }
            // For 4th variant
            if (variant === "4th") {
                if (colKey === 'x_minus' || colKey === 'x_plus') return <span className="font-bold">{stdRange}</span>;
                return "No need";
            }
            // For 4th-7points variant
            if (variant === "4th-7points") {
                // Show standard if defined in row config or default logic
                if (row.stds?.[colKey]) return <span className="font-bold">{row.stds[colKey]}</span>;
                return "No Need";
            }
            return "No Need";
        }

        // For data rows, check if input is needed using the allowInput flag in data
        const allowInput = row.inputs?.[colKey];
        if (!allowInput) return "No Need";

        const isError = errors[name];
        return (
            <input
                {...register(name, { required: true })}
                className={`w-full h-full text-center outline-none ${isError ? 'bg-red-500 placeholder:text-white' : 'bg-transparent'}`}
            />
        );
    };

    // Configuration for columns based on variant
    const getColumns = () => {
        const commonRender = (colKey) => (val, row) => renderCell(row, colKey, `${prefix}roughness_${row.id.toLowerCase()}_${colKey}`);

        if (variant === "4th-7points") {
            return [
                { header: "Roughness", key: "label", width: "12%", className: "font-bold bg-gray-100 pl-1 text-[9px]", isLabel: true },
                { header: "a (4th)", key: "a", width: "12%", render: commonRender("a"), className: "text-[9px]" },
                { header: "b (4th)", key: "b", width: "12%", render: commonRender("b"), className: "text-[9px]" },
                { header: "c (4th)", key: "c", width: "12%", render: commonRender("c"), className: "text-[9px]" },
                { header: "d (4th)", key: "d", width: "12%", render: commonRender("d"), className: "text-[9px]" },
                { header: "e (4th)", key: "e", width: "12%", render: commonRender("e"), className: "text-[9px]" },
                { header: "f (4th)", key: "f", width: "12%", render: commonRender("f"), className: "text-[9px]" },
                { header: "g (4th)", key: "g", width: "12%", render: commonRender("g"), className: "text-[9px]" },
            ];
        }

        if (variant === "4th") {
            return [
                { header: "Roughness", key: "label", width: "25%", className: "font-bold text-[10px] bg-gray-100 pl-2", isLabel: true },
                {
                    header: `X- ${headerSuffix}`, key: "x_minus", width: "25%",
                    render: commonRender('x_minus')
                },
                {
                    header: `Y- ${headerSuffix}`, key: "y_minus", width: "25%",
                    render: commonRender('y_minus')
                },
                {
                    header: `X+ ${headerSuffix}`, key: "x_plus", width: "25%",
                    render: commonRender('x_plus')
                }
            ];
        }

        // Default 3rd variant
        return [
            { header: "Roughness", key: "label", width: "25%", className: "font-bold text-[10px] bg-gray-100" },
            {
                header: "X+ (3rd)", key: "x_pos", width: "25%",
                render: commonRender('x_pos')
            },
            {
                header: "Y (3rd)", key: "y", width: "25%",
                render: commonRender('y')
            },
            {
                header: "X- (3rd)", key: "x_neg", width: "25%",
                render: commonRender('x_neg')
            }
        ];
    };

    // Data definition with input flags
    const getData = () => {
        if (variant === "4th-7points") {
            // Using standards prop to configure which columns are active if needed, or default logic
            // Defaulting to d and f active based on typical 4th 7points usage
            return [
                { id: "Up", label: "Up", inputs: { d: true, f: true }, className: "text-[9px]" },
                { id: "Mid", label: "Mid", inputs: { d: true, f: true }, className: "text-[9px]" },
                { id: "Low", label: "Low", inputs: { d: true, f: true }, className: "text-[9px]" },
                { id: "STD", label: `STD(μm)`, isStd: true, stds: standards.stds || {}, className: "text-[9px]" }
            ];
        }

        if (variant === "4th") {
            // Allow overriding inputs via standards.inputs
            const customInputs = standards.inputs || {};

            return [
                { id: "Up", label: "Up", inputs: customInputs.Up || { x_minus: true }, className: "text-[9px]" },
                { id: "Mid", label: "Mid", inputs: customInputs.Mid || { x_minus: true }, className: "text-[9px]" },
                { id: "Low", label: "Low", inputs: customInputs.Low || { x_minus: true, x_plus: true }, className: "text-[9px]" },
                { id: "STD", label: "STD(μm)", isStd: true, className: "text-[9px]" }
            ];
        }

        // Default 3rd variant
        return [
            { id: "Up", label: "Up", inputs: { x_pos: true }, className: "text-[9px]" },
            { id: "Mid", label: "Mid", inputs: { x_pos: true }, className: "text-[9px]" },
            { id: "Low", label: "Low", inputs: { x_pos: true, x_neg: true }, className: "text-[9px]" },
            { id: "STD", label: "STD(μm)", isStd: true, className: "text-[9px]" }
        ];
    };

    return (
        <div className={`w-full ${className} ${!className ? (variant === "4th-7points" ? "max-w-[500px]" : (variant === "4th" ? "max-w-[400px]" : "max-w-[290px]")) : ""}`}>
            <FormQuickTable
                columns={getColumns()}
                data={getData()}
                className="text-center"
                headerClassName="bg-gray-200"
            />
        </div>
    );
};

export default EDWFinalRoughnessCheck;
