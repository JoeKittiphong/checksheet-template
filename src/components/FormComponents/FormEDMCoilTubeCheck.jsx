import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TristateCheckbox from '../UIcomponent/TristateCheckbox'; // Import TristateCheckbox directly

const FormEDMCoilTubeCheck = ({
    name,
    defaultValue,
    axes = [
        { key: 'x', label: 'x' },
        { key: 'ykc', label: 'Y(KC)' },
        { key: 'ykb', label: 'Y(KB)' }
    ],
    ...props
}) => {
    const { control } = useFormContext();

    // Use passed axes or default
    const axisConfig = axes;

    const renderRows = () => {
        const rows = [];

        axisConfig.forEach((axis) => {
            // Row 1: Axis Label + IN
            const inName = `${name}.${axis.key}.in`;
            const outName = `${name}.${axis.key}.out`;

            rows.push(
                <tr key={`${axis.key}-in`}>
                    <td
                        className="border border-black p-1 text-center font-medium"
                        rowSpan={2}
                    >
                        {axis.label}
                    </td>
                    <td className="border border-black p-1 text-center">Coil "IN"</td>
                    <td className="border border-black p-1 text-center flex justify-center">
                        <Controller
                            name={inName}
                            control={control}
                            rules={{ validate: (v) => (v !== null && v !== undefined && v !== '') || "Required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TristateCheckbox
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!error}
                                    size="w-4 h-4"
                                />
                            )}
                        />
                    </td>
                </tr>
            );

            // Row 2: OUT
            rows.push(
                <tr key={`${axis.key}-out`}>
                    <td className="border border-black p-1 text-center">Coil "OUT"</td>
                    <td className="border border-black p-1 text-center flex justify-center">
                        <Controller
                            name={outName}
                            control={control}
                            rules={{ validate: (v) => (v !== null && v !== undefined && v !== '') || "Required" }}
                            render={({ field, fieldState: { error } }) => (
                                <TristateCheckbox
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!error}
                                    size="w-4 h-4"
                                />
                            )}
                        />
                    </td>
                </tr>
            );
        });

        return rows;
    };

    return (
        <table className="border-collapse border border-black text-sm">
            <thead>
                <tr>
                    <th className="border border-black p-1 w-16 text-center">Axis</th>
                    <th className="border border-black p-1 w-24 text-center">Check</th>
                    <th className="border border-black p-1 w-28 text-center">ทดสอบด้วยการดึง</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
};

export default FormEDMCoilTubeCheck;
