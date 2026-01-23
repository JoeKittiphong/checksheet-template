import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';

/**
 * CeramicCheckEDW Component
 * ตารางตรวจสอบ Ceramic สำหรับ EDW แบบ 3x3 (8 จุด + 1 สัญลักษณ์)
 * - Input 8 ช่อง พร้อมหน่วย μm
 * - Autofocus เรียงตามลำดับ: ล่างซ้าย -> กลางซ้าย -> บนซ้าย -> บนกลาง -> บนขวา -> กลางขวา -> ล่างขวา -> กลางกลาง
 * - Standard Check: min -5, max 5 (พื้นหลังแดงถ้าข้อมูลไม่อยู่ในเกณฑ์)
 * 
 * Layout:
 * [TL] [TC] [TR]
 * [ML] [MC] [MR]
 * [BL] [ ∅ ] [BR]
 * 
 * Focus Order map based on image numbers:
 * 1: BL
 * 2: ML
 * 3: TL
 * 4: TC
 * 5: TR
 * 6: MR
 * 7: BR
 * 8: MC
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { tl, tc, tr, ml, mc, mr, bl, br }
 * @param {Function} props.onChange - callback(newData)
 * @param {Object} props.standard - { min: -5, max: 5 }
 */
function CeramicCheckEDW({
    data = {},
    onChange = () => { },
    standard = { min: -5, max: 5 }
}) {
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
    // Row 1
    const topRow = ['tl', 'tc', 'tr'];
    // Row 2
    const midRow = ['ml', 'mc', 'mr'];
    // Row 3
    const botRow = ['bl', 'symbol', 'br'];

    // List of input keys to check
    const inputKeys = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'br'];

    // ไม่มี validation ที่ input แล้ว
    const isValid = (val) => true;

    // Calculate Diff Max-Min for all inputs + 0
    const getCeramicDiff = () => {
        const values = [0]; // เริ่มต้นด้วย 0
        inputKeys.forEach(key => {
            const val = parseFloat(data[key]);
            if (!isNaN(val)) {
                values.push(val);
            }
        });

        // ถ้ามีแค่ 0 ก็ไม่ต้องคำนวณ
        if (values.length === 1) return '';

        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(2).replace(/\.?0+$/, '');
    };

    const isDiffValid = () => {
        return validateValue(getCeramicDiff(), {
            maxValue: standard.max,
            validateStd: true,
            useAbs: true
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

            // Find current index in focus sequence
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
        // ไม่เช็ค standard ที่ช่อง input (ไม่มีพื้นหลังแดง)
        return (
            <div className="flex items-end justify-center gap-1 p-2">
                <input
                    ref={refs[key]}
                    type="text"
                    inputMode="numeric"
                    className="w-16 border-b border-black text-center outline-none bg-transparent"
                    value={getValue(key)}
                    onFocus={() => handleFocus(key)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => handleBlur(key)}
                    onKeyDown={(e) => handleKeyDown(e, key)}
                />
                <span className="text-sm">μm.</span>
            </div>
        );
    };

    const renderCell = (key) => {
        if (key === 'symbol') {
            return (
                <div className="flex items-center justify-center p-2 h-full">
                    <span className="text-xl">∅</span>
                </div>
            );
        }
        return renderInput(key);
    };

    return (
        <div className="inline-block">
            <div className="border border-black p-4 bg-white mb-2">
                <div className="grid grid-cols-3 gap-8">
                    {/* Top Row */}
                    {topRow.map(key => (
                        <div key={key} className="h-12">
                            {renderCell(key)}
                        </div>
                    ))}

                    {/* Middle Row */}
                    {midRow.map(key => (
                        <div key={key} className="h-12">
                            {renderCell(key)}
                        </div>
                    ))}

                    {/* Bottom Row */}
                    {botRow.map(key => (
                        <div key={key} className="h-12">
                            {renderCell(key)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Display Calculated Diff */}
            <div className="flex items-center text-sm font-bold">
                <span className="mr-2">CERAMIC DATA</span>
                <span className={`border-b border-black px-2 min-w-16 text-center ${!isDiffValid() ? 'bg-red-200' : ''}`}>
                    {getCeramicDiff()}
                </span>
                <span className="ml-1">μm.</span>
            </div>
        </div>
    );
}

export default CeramicCheckEDW;
