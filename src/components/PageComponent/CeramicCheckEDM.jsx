import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { tl, tc, tr, ml, mc, mr, bl, br }
 * @param {Function} props.onChange - callback(newData)
 * @param {Object} props.standard - { min: -10, max: 10 } สำหรับเช็คค่าแต่ละช่อง
 * @param {number} props.parallelStandard - ค่า max ของ PARALLEL (default: 5)
 */
function CeramicCheckEDM({
    data = {},
    onChange = () => { },
    standard = { min: -10, max: 10 },
    parallelStandard = 5
}) {
    const { formState: { isSubmitted } } = useFormContext();
    // Refs for focus management
    const refs = {
        bl: useRef(null),
        ml: useRef(null),
        tl: useRef(null),
        tc: useRef(null),
        tr: useRef(null),
        mr: useRef(null),
        br: useRef(null),
        mc: useRef(null),
    };

    // Sequence keys for focus order
    const focusOrder = ['bl', 'ml', 'tl', 'tc', 'tr', 'mr', 'br', 'mc'];

    const [editingKey, setEditingKey] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // Positions for rendering layout
    const topRow = ['tl', 'tc', 'tr'];
    const midRow = ['ml', 'mc', 'mr'];
    const botRow = ['bl', 'zero', 'br']; // 'zero' is the reference point (0)

    // List of input keys
    const inputKeys = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'br'];

    // Get all values including 0
    const getAllValues = () => {
        const values = [0]; // จุด 0 เป็น reference
        inputKeys.forEach(key => {
            const val = parseFloat(data[key]);
            if (!isNaN(val)) {
                values.push(val);
            }
        });
        return values;
    };

    // Calculate MAX value from all 9 points
    const getMaxValue = () => {
        const values = getAllValues();
        if (values.length === 1) return ''; // Only 0
        return Math.max(...values).toFixed(2).replace(/\.?0+$/, '');
    };

    // Calculate MIN value from all 9 points
    const getMinValue = () => {
        const values = getAllValues();
        if (values.length === 1) return '';
        return Math.min(...values).toFixed(2).replace(/\.?0+$/, '');
    };

    // Calculate DIFF (MAX - MIN) for all 9 points
    const getDiffValue = () => {
        const values = getAllValues();
        if (values.length === 1) return '';
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(2).replace(/\.?0+$/, '');
    };

    // Check if DIFF is within standard range
    const isDiffValid = () => {
        const diffVal = getDiffValue();
        return validateValue(diffVal, {
            maxDiff: Math.abs(standard.max),
            validateStd: true,
            useAbs: true
        });
    };

    // Calculate PARALLEL value - max difference between adjacent points
    // Grid Layout:
    // [TL] [TC] [TR]
    // [ML] [MC] [MR]
    // [BL] [ 0 ] [BR]
    const getParallelValue = () => {
        // Get value for a key, 'zero' returns 0
        const getVal = (key) => {
            if (key === 'zero') return 0;
            const val = parseFloat(data[key]);
            return isNaN(val) ? null : val;
        };

        // Define adjacent pairs (horizontal and vertical neighbors)
        const adjacentPairs = [
            // Top row horizontal
            ['tl', 'tc'], ['tc', 'tr'],
            // Middle row horizontal
            ['ml', 'mc'], ['mc', 'mr'],
            // Bottom row horizontal
            ['bl', 'zero'], ['zero', 'br'],
            // Left column vertical
            ['tl', 'ml'], ['ml', 'bl'],
            // Center column vertical
            ['tc', 'mc'], ['mc', 'zero'],
            // Right column vertical
            ['tr', 'mr'], ['mr', 'br'],
        ];

        let maxDiff = null;

        adjacentPairs.forEach(([key1, key2]) => {
            const val1 = getVal(key1);
            const val2 = getVal(key2);

            // Only calculate if both values exist
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

    // Check if PARALLEL is within parallel standard
    const isParallelValid = () => {
        const parallelVal = getParallelValue();
        return validateValue(parallelVal, {
            maxValue: parallelStandard,
            validateStd: true
        });
    };

    const handleFocus = (key) => {
        setEditingKey(key);
        setEditingValue(data[key] || '');
    };

    const handleInputChange = (val) => {
        const cleanVal = val.replace(/[^0-9.\-]/g, '');
        setEditingValue(cleanVal);
    };

    const commitValue = (key) => {
        const newData = { ...data, [key]: editingValue };
        onChange(newData);
        setEditingKey(null);
        setEditingValue('');
    };

    const handleBlur = (key) => {
        if (editingKey === key) {
            commitValue(key);
        }
    };

    const handleKeyDown = (e, key) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitValue(key);

            const currentIndex = focusOrder.indexOf(key);
            if (currentIndex !== -1 && currentIndex < focusOrder.length - 1) {
                const nextKey = focusOrder[currentIndex + 1];
                if (refs[nextKey] && refs[nextKey].current) {
                    refs[nextKey].current.focus();
                }
            }
        }
    };

    const getValue = (key) => {
        if (editingKey === key) return editingValue;
        return data[key] || '';
    };

    const renderInput = (key) => {
        return (
            <div className="flex items-center justify-center">
                <span className="text-gray-500 text-lg">●</span>
                <input
                    ref={refs[key]}
                    type="text"
                    inputMode="numeric"
                    className={`w-12 border-b text-center outline-none bg-transparent text-xs ml-1 ${isSubmitted && !getValue(key) ? 'border-red-500 bg-red-50' : 'border-black'}`}
                    value={getValue(key)}
                    onFocus={() => handleFocus(key)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => handleBlur(key)}
                    onKeyDown={(e) => handleKeyDown(e, key)}
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
                    {/* Top Row */}
                    {topRow.map(key => (
                        <div key={key} className="h-8 flex items-center justify-center">
                            {renderCell(key)}
                        </div>
                    ))}

                    {/* Middle Row */}
                    {midRow.map(key => (
                        <div key={key} className="h-8 flex items-center justify-center">
                            {renderCell(key)}
                        </div>
                    ))}

                    {/* Bottom Row */}
                    {botRow.map(key => (
                        <div key={key} className="h-8 flex items-center justify-center">
                            {renderCell(key)}
                        </div>
                    ))}
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
                        {/* Row 1: Standard MAX and MAX/MIN/DIF values */}
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
                        {/* Row 2: PARALLEL */}
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
