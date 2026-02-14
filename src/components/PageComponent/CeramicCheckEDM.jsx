import { useRef, useState } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { validateValue } from '../../utils/validationUtils';

/**
 * CeramicCheckEDM Component
 * ตารางตรวจสอบ Ceramic แบบ 3x3 (8 จุด input + 1 จุด 0 reference)
 * - Input 8 ช่อง พร้อมหน่วย μm
 * - จุดกลางล่างเป็น 0 (reference point)
 * - คำนวณ MAX, MIN, DIF จากทั้ง 9 จุด
 * - เช็ค PARALLEL: ค่า DIF ต้องไม่เกิน parallelStandard
 * 
 * Layout:
 * [TL] [TC] [TR]
 * [ML] [MC] [MR]
 * [BL] [ 0 ] [BR]
 * 
 * Focus Order:
 * 1: BL -> 2: ML -> 3: TL -> 4: TC -> 5: TR -> 6: MR -> 7: BR -> 8: MC
 */
function CeramicCheckEDM({
    name, // field prefix e.g. "page10.ceramicData"
    control,
    standard = { min: -10, max: 10 },
    parallelStandard = 5
}) {
    const { formState: { isSubmitted } } = useFormContext();

    // Watch all fields for calculation
    const watchedValues = useWatch({
        control,
        name: name,
        defaultValue: {
            tl: '', tc: '', tr: '',
            ml: '', mc: '', mr: '',
            bl: '', br: ''
        }
    });

    // Positions for rendering layout
    const topRow = ['tl', 'tc', 'tr'];
    const midRow = ['ml', 'mc', 'mr'];
    const botRow = ['bl', 'zero', 'br'];

    const inputKeys = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'br'];

    // Refs for focus management
    const refs = {
        bl: useRef(null), ml: useRef(null), tl: useRef(null),
        tc: useRef(null), tr: useRef(null), mr: useRef(null),
        br: useRef(null), mc: useRef(null),
    };

    const focusOrder = ['bl', 'ml', 'tl', 'tc', 'tr', 'mr', 'br', 'mc'];

    // Get all values including 0
    const getAllValues = () => {
        const values = [0]; // Reference point
        inputKeys.forEach(key => {
            const val = parseFloat(watchedValues?.[key]);
            if (!isNaN(val)) {
                values.push(val);
            }
        });
        return values;
    };

    // Calculations
    const getMaxValue = () => {
        const values = getAllValues();
        if (values.length === 1 && values[0] === 0 && !inputKeys.some(k => watchedValues?.[k])) return '';
        return Math.max(...values).toFixed(2).replace(/\.?0+$/, '');
    };

    const getMinValue = () => {
        const values = getAllValues();
        if (values.length === 1 && values[0] === 0 && !inputKeys.some(k => watchedValues?.[k])) return '';
        return Math.min(...values).toFixed(2).replace(/\.?0+$/, '');
    };

    const getDiffValue = () => {
        const values = getAllValues();
        // If only 0 exists and no inputs, return empty
        if (values.length === 1 && values[0] === 0 && !inputKeys.some(k => watchedValues?.[k])) return '';

        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(2).replace(/\.?0+$/, '');
    };

    // Check DIFF validity
    const isDiffValid = () => {
        const diffVal = getDiffValue();
        if (diffVal === '') return true;
        return validateValue(diffVal, {
            // maxDiff: Math.abs(standard.max), // Removed duplicate
            // Assuming max diff allowed is max standard magnitude?
            // Page10 Item 16 has `standard={{ min: -10, max: 10 }}` passed.
            // If individual values are checked against min/max, then Diff is checked against what?
            maxValue: Math.abs(standard.max * 2), // Maybe? or just check min/max of inputs.
            // Original code checked diffVal against standard.max.
            // Let's keep original logic: maxDiff: Math.abs(standard.max)
            maxDiff: Math.abs(standard.max),
            validateStd: true,
            useAbs: true
        });
    };

    const getParallelValue = () => {
        const getVal = (key) => {
            if (key === 'zero') return 0;
            const val = parseFloat(watchedValues?.[key]);
            return isNaN(val) ? null : val;
        };

        const adjacentPairs = [
            ['tl', 'tc'], ['tc', 'tr'],
            ['ml', 'mc'], ['mc', 'mr'],
            ['bl', 'zero'], ['zero', 'br'],
            ['tl', 'ml'], ['ml', 'bl'],
            ['tc', 'mc'], ['mc', 'zero'],
            ['tr', 'mr'], ['mr', 'br'],
        ];

        let maxDiff = null;
        adjacentPairs.forEach(([key1, key2]) => {
            const val1 = getVal(key1);
            const val2 = getVal(key2);
            if (val1 !== null && val2 !== null) {
                const diff = Math.abs(val1 - val2);
                if (maxDiff === null || diff > maxDiff) {
                    maxDiff = diff;
                }
            }
        });

        if (maxDiff === null) return '';
        return maxDiff.toFixed(2).replace(/\.?0+$/, '');
    };

    const isParallelValid = () => {
        const parallelVal = getParallelValue();
        if (parallelVal === '') return true;
        return validateValue(parallelVal, {
            maxValue: parallelStandard,
            validateStd: true
        });
    };

    // Navigation logic
    const handleKeyDown = (e, key) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentIndex = focusOrder.indexOf(key);
            if (currentIndex !== -1 && currentIndex < focusOrder.length - 1) {
                const nextKey = focusOrder[currentIndex + 1];
                if (refs[nextKey]?.current) {
                    refs[nextKey].current.focus();
                }
            }
        }
    };

    const renderInput = (key) => {
        return (
            <div className="flex items-center justify-center">
                <span className="text-gray-500 text-lg">●</span>
                <Controller
                    name={`${name}.${key}`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                        <input
                            ref={(e) => {
                                field.ref(e);
                                refs[key].current = e; // Sync with our refs
                            }}
                            type="text"
                            inputMode="numeric"
                            className={`w-12 border-b text-center outline-none bg-transparent text-xs ml-1 ${error ? 'border-red-500 bg-red-50' : 'border-black'}`}
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            onKeyDown={(e) => handleKeyDown(e, key)}
                        />
                    )}
                />
            </div>
        );
    };

    const renderCell = (key) => {
        if (key === 'zero') {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-gray-500 text-lg">●</span>
                    <span className="ml-1 text-xs">0</span>
                </div>
            );
        }
        return renderInput(key);
    };

    return (
        <div className="flex gap-4">
            {/* Grid Section */}
            <div className="border border-black p-4 bg-white">
                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                    {topRow.map(key => <div key={key} className="h-8 flex items-center justify-center">{renderCell(key)}</div>)}
                    {midRow.map(key => <div key={key} className="h-8 flex items-center justify-center">{renderCell(key)}</div>)}
                    {botRow.map(key => <div key={key} className="h-8 flex items-center justify-center">{renderCell(key)}</div>)}
                </div>
            </div>

            {/* Data Table Section */}
            <div className=" bg-white text-xs">
                <table className="border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-1 font-bold">STD</th>
                            <th className="border border-black px-4 py-1 font-bold">DATA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-2 py-1 text-center align-top" rowSpan={3}>
                                <div>{Math.abs(standard.max)} μm</div>
                                <div>MAX</div>
                            </td>
                            <td className={`border border-black px-2 py-1 ${!isDiffValid() ? 'bg-red-200' : ''}`}>
                                <div className="flex items-center gap-1">
                                    <span>MAX</span>
                                    <span className="border-b border-black px-2 min-w-10 text-center inline-block">
                                        {getMaxValue()}
                                    </span>
                                    <span>μm</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-black px-2 py-1 ${!isDiffValid() ? 'bg-red-200' : ''}`}>
                                <div className="flex items-center gap-1">
                                    <span>MIN</span>
                                    <span className="border-b border-black px-2 min-w-10 text-center inline-block">
                                        {getMinValue()}
                                    </span>
                                    <span>μm</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={`border border-black px-2 py-1 ${!isDiffValid() ? 'bg-red-200' : ''}`}>
                                <div className="flex items-center gap-1">
                                    <span>DIF</span>
                                    <span className="border-b border-black px-2 min-w-10 text-center inline-block">
                                        {getDiffValue()}
                                    </span>
                                    <span>μm</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-center">
                                <div>PARALLEL</div>
                                <div>MAX {parallelStandard} μm</div>
                            </td>
                            <td className={`border border-black px-2 py-1 ${!isParallelValid() ? 'bg-red-200' : ''}`}>
                                <div className="flex items-center gap-1">
                                    <span className="border-b border-black px-2 min-w-16 text-center inline-block">
                                        {getParallelValue()}
                                    </span>
                                    <span>μm</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CeramicCheckEDM;
