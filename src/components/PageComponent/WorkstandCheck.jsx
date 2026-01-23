import React, { useRef, useCallback, useEffect, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';

/**
 * WorkstandCheck Component
 * Layout based on specific 5-column grouping pattern:
 * - D (Top): 5 Groups. Ends are Triangles (1 top, 2 bot). Middles are Vertical Pairs. (Total 12)
 * - B (Bottom): 5 Groups. Ends are Inverted Triangles (2 top, 1 bot). Middles are Vertical Pairs. (Total 12)
 * - A (Left): 3 Groups of Horizontal Pairs. (Total 6)
 * - C (Right): 3 Groups of Horizontal Pairs. (Total 6)
 */

// Input style helper
const getInputStyle = (isValid) => ({
    border: 'none',
    borderBottom: isValid ? '2px solid #9ca3af' : '2px solid #ef4444',
    backgroundColor: isValid ? 'rgba(254, 202, 202, 0.2)' : '#fecaca',
    color: isValid ? 'inherit' : '#b91c1c'
});

// Single Input Component - ใช้ local state เพื่อไม่ให้หลุด focus
const SingleInput = React.memo(({ section, index, value, isValid, onValueChange }) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef(null);

    // Sync with external value when it changes from outside
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e) => {
        const newVal = cleanNumericInput(e.target.value);
        setLocalValue(newVal);
        onValueChange(section, index, newVal);
    };

    return (
        <input
            ref={inputRef}
            type="text"
            className="w-12 h-7 text-center outline-none text-lg m-0.5"
            style={getInputStyle(isValid)}
            value={localValue}
            onChange={handleChange}
        />
    );
});

function WorkstandCheck({
    data = { a: [], b: [], c: [], d: [] },
    onChange = () => { },
    maxDiff = 8,
    maxCornerDiff = 5,
    maxTotalDiff = 8,
    maxAdjacentDiff = 5
}) {
    // ใช้ ref เพื่อเก็บ data ล่าสุด
    const dataRef = useRef(data);
    dataRef.current = data;

    const handleChange = useCallback((section, index, val) => {
        const newData = { ...dataRef.current };
        if (!newData[section]) newData[section] = [];
        newData[section] = [...newData[section]];
        newData[section][index] = val;
        onChange(newData);
    }, [onChange]);

    const getValue = (section, index) => {
        return data[section]?.[index] || '';
    };

    // คำนวณ diff (max - min) สำหรับแต่ละ section
    const getSectionDiff = (section) => {
        const values = (data[section] || [])
            .map(v => parseFloat(v))
            .filter(v => !isNaN(v));
        if (values.length === 0) return 0;
        const max = Math.max(...values);
        const min = Math.min(...values);
        return max - min;
    };

    // คำนวณ diff สำหรับ corner (รับ array ของค่า)
    const getCornerDiff = (values) => {
        const nums = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
        if (nums.length === 0) return 0;
        return Math.max(...nums) - Math.min(...nums);
    };

    // คำนวณ MAX, MIN, DIFF รวมทั้ง 4 แผ่น
    const getAllValues = () => {
        const allValues = [
            ...(data.a || []),
            ...(data.b || []),
            ...(data.c || []),
            ...(data.d || [])
        ].map(v => parseFloat(v)).filter(v => !isNaN(v));
        return allValues;
    };

    const allValues = getAllValues();
    const totalMax = allValues.length > 0 ? Math.max(...allValues) : 0;
    const totalMin = allValues.length > 0 ? Math.min(...allValues) : 0;
    const totalDiff = allValues.length > 0 ? totalMax - totalMin : 0;

    // Adjacent pairs validation - จุดที่ติดกัน (ตามเส้นสีแดง)
    // คู่จุดที่ต้องเช็ค [section1, index1, section2, index2]
    // ใช้ 'ø' เป็น section พิเศษหมายถึงตำแหน่ง diameter (ค่า = 0)
    const adjacentPairs = [
        // Section D - top
        // Triangle left: 0(top), 1,2(bottom) - vertical & horizontal
        ['d', 0, 'd', 1], ['d', 0, 'd', 2], ['d', 1, 'd', 2],
        // Center vertical pairs
        ['d', 3, 'd', 4], ['d', 5, 'd', 6], ['d', 7, 'd', 8],
        // Center horizontal pairs (top row)
        ['d', 3, 'd', 5], ['d', 5, 'd', 7],
        // Center horizontal pairs (bottom row)
        ['d', 4, 'd', 6], ['d', 6, 'd', 8],
        // Triangle right: 9(top), 10,11(bottom) - vertical & horizontal
        ['d', 9, 'd', 10], ['d', 9, 'd', 11], ['d', 10, 'd', 11],

        // Section A - left (horizontal pairs)
        ['a', 0, 'a', 1], ['a', 2, 'a', 3], ['a', 4, 'a', 5],

        // Section C - right (horizontal pairs)
        ['c', 0, 'c', 1], ['c', 2, 'c', 3], ['c', 4, 'c', 5],

        // Section B - bottom
        // Triangle left: 0,1(top), 2(bottom) - vertical & horizontal
        ['b', 0, 'b', 1], ['b', 0, 'b', 2], ['b', 1, 'b', 2],
        // Center vertical pairs
        ['b', 3, 'b', 4], ['b', 7, 'b', 8],
        // 3 จุดที่อ้างอิงกับ diameter (ø = 0): B[4], B[5], B[8]
        ['b', 4, 'ø', 0], ['b', 5, 'ø', 0], ['b', 8, 'ø', 0],
        // Center horizontal pairs (top row)
        ['b', 3, 'b', 5], ['b', 5, 'b', 7],
        // Center horizontal pairs (bottom row) - B[4] to B[8] (skip ø)
        ['b', 4, 'b', 8],
        // Triangle right: 9,10(top), 11(bottom) - vertical & horizontal
        ['b', 9, 'b', 10], ['b', 9, 'b', 11], ['b', 10, 'b', 11]
    ];

    // เช็ค adjacent pair diff
    // 'ø' section หมายถึง diameter = ค่า 0 เสมอ
    const getAdjacentPairDiff = (section1, idx1, section2, idx2) => {
        const v1 = section1 === 'ø' ? 0 : parseFloat(data[section1]?.[idx1]);
        const v2 = section2 === 'ø' ? 0 : parseFloat(data[section2]?.[idx2]);
        if (isNaN(v1) || isNaN(v2)) return 0;
        return Math.abs(v1 - v2);
    };

    // สร้าง Map เก็บว่าแต่ละ input มี adjacent validation fail หรือไม่
    const getAdjacentValid = (section, index) => {
        // หาทุกคู่ที่ input นี้เกี่ยวข้อง
        const relatedPairs = adjacentPairs.filter(
            ([s1, i1, s2, i2]) =>
                (s1 === section && i1 === index) || (s2 === section && i2 === index)
        );
        // เช็คว่าทุกคู่ผ่านการ validate
        return relatedPairs.every(([s1, i1, s2, i2]) => validateValue(getAdjacentPairDiff(s1, i1, s2, i2), { maxDiff: maxAdjacentDiff, useAbs: true }));
    };

    // Corner validation - เช็คจาก data โดยตรง
    // มุมซ้ายบน: D[0,1,2] + A[0,1]
    const topLeftCornerDiff = getCornerDiff([
        data.d?.[0], data.d?.[1], data.d?.[2],
        data.a?.[0], data.a?.[1]
    ]);
    const validTopLeft = validateValue(topLeftCornerDiff, { maxDiff: maxCornerDiff, useAbs: true });

    // มุมขวาบน: D[9,10,11] + C[0,1]
    const topRightCornerDiff = getCornerDiff([
        data.d?.[9], data.d?.[10], data.d?.[11],
        data.c?.[0], data.c?.[1]
    ]);
    const validTopRight = validateValue(topRightCornerDiff, { maxDiff: maxCornerDiff, useAbs: true });

    // มุมซ้ายล่าง: B[0,1,2] + A[4,5]
    const bottomLeftCornerDiff = getCornerDiff([
        data.b?.[0], data.b?.[1], data.b?.[2],
        data.a?.[4], data.a?.[5]
    ]);
    const validBottomLeft = validateValue(bottomLeftCornerDiff, { maxDiff: maxCornerDiff, useAbs: true });

    // มุมขวาล่าง: B[9,10,11] + C[4,5]
    const bottomRightCornerDiff = getCornerDiff([
        data.b?.[9], data.b?.[10], data.b?.[11],
        data.c?.[4], data.c?.[5]
    ]);
    const validBottomRight = validateValue(bottomRightCornerDiff, { maxDiff: maxCornerDiff, useAbs: true });

    // Validation states สำหรับแต่ละ section
    const validA = validateValue(getSectionDiff('a'), { maxDiff: maxDiff, useAbs: true });
    const validB = validateValue(getSectionDiff('b'), { maxDiff: maxDiff, useAbs: true });
    const validC = validateValue(getSectionDiff('c'), { maxDiff: maxDiff, useAbs: true });
    const validD = validateValue(getSectionDiff('d'), { maxDiff: maxDiff, useAbs: true });

    // Total diff validation
    const validTotalDiff = validateValue(totalDiff, { maxDiff: maxTotalDiff, useAbs: true });

    // ฟังก์ชันเช็คว่า input ที่ตำแหน่งนี้ valid หรือไม่
    const getInputValid = (section, index) => {
        // เช็ค section ก่อน
        let sectionValid = true;
        if (section === 'a') sectionValid = validA;
        else if (section === 'b') sectionValid = validB;
        else if (section === 'c') sectionValid = validC;
        else if (section === 'd') sectionValid = validD;

        // เช็คว่าอยู่ในมุมไหน
        let cornerValid = true;
        if (section === 'd' && [1, 2].includes(index)) cornerValid = validTopLeft;
        else if (section === 'd' && [10, 11].includes(index)) cornerValid = validTopRight;
        else if (section === 'a' && [0, 1].includes(index)) cornerValid = validTopLeft;
        else if (section === 'a' && [4, 5].includes(index)) cornerValid = validBottomLeft;
        else if (section === 'c' && [0, 1].includes(index)) cornerValid = validTopRight;
        else if (section === 'c' && [4, 5].includes(index)) cornerValid = validBottomRight;
        else if (section === 'b' && [0, 1].includes(index)) cornerValid = validBottomLeft;
        else if (section === 'b' && [9, 10].includes(index)) cornerValid = validBottomRight;

        // เช็ค adjacent validation
        const adjacentValid = getAdjacentValid(section, index);

        return sectionValid && cornerValid && adjacentValid;
    };

    // Helper to render input
    const renderInput = (section, index) => (
        <SingleInput
            key={`${section}-${index}`}
            section={section}
            index={index}
            value={getValue(section, index)}
            isValid={getInputValid(section, index)}
            onValueChange={handleChange}
        />
    );

    return (
        <div className="flex gap-4">
            {/* Main Component */}
            <div className="mx-auto" style={{ width: '25rem', height: '18rem' }}>
                <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '40rem' }}>
                    <div className="border border-black max-w-4xl mx-auto bg-white relative">
                        {/* Top Section D */}
                        <div className="border-b border-black h-28 flex">
                            {/* Left Aligned Part (Matches A Width) */}
                            <div className="w-36 flex justify-center items-center border-r border-transparent">
                                {/* Top Triangle D: indices 0,1,2 */}
                                <div className="flex justify-between flex-col items-center w-30 h-25">
                                    {renderInput('d', 0)}
                                    <div className="flex w-full justify-between">
                                        {renderInput('d', 1)}
                                        {renderInput('d', 2)}
                                    </div>
                                </div>
                            </div>

                            {/* Center Part (Matches Void Width) */}
                            <div className="flex-1 flex justify-between items-start px-8 relative">
                                {/* Vertical Pair D: 3,4 */}
                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('d', 3)}
                                    {renderInput('d', 4)}
                                </div>
                                {/* Vertical Pair D: 5,6 */}
                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('d', 5)}
                                    {renderInput('d', 6)}
                                </div>
                                {/* Vertical Pair D: 7,8 */}
                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('d', 7)}
                                    {renderInput('d', 8)}
                                </div>
                            </div>

                            {/* Right Aligned Part (Matches C Width) */}
                            <div className="w-36 flex justify-center items-center">
                                {/* Top Triangle D: indices 9,10,11 */}
                                <div className="flex justify-between flex-col items-center w-30 h-25">
                                    {renderInput('d', 9)}
                                    <div className="flex w-full justify-between">
                                        {renderInput('d', 10)}
                                        {renderInput('d', 11)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Container */}
                        <div className="flex h-64">
                            {/* Left Section A */}
                            <div className="w-36 border-r border-black relative flex flex-col justify-around py-4 bg-gray-50/5">
                                {/* Horizontal Pair A: 0,1 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('a', 0)}
                                    {renderInput('a', 1)}
                                </div>
                                {/* Horizontal Pair A: 2,3 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('a', 2)}
                                    {renderInput('a', 3)}
                                </div>
                                {/* Horizontal Pair A: 4,5 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('a', 4)}
                                    {renderInput('a', 5)}
                                </div>
                            </div>

                            {/* Center Empty Space */}
                            <div className="flex-1 relative bg-white">
                                {/* Inner Space - Labels A, B, C, D */}
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 font-bold text-3xl">D</div>
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-bold text-3xl">B</div>
                                <div className="absolute top-1/2 left-4 transform -translate-y-1/2 font-bold text-3xl">A</div>
                                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 font-bold text-3xl">C</div>
                            </div>

                            {/* Right Section C */}
                            <div className="w-36 border-l border-black relative flex flex-col justify-around py-4 bg-gray-50/5">
                                {/* Horizontal Pair C: 0,1 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('c', 0)}
                                    {renderInput('c', 1)}
                                </div>
                                {/* Horizontal Pair C: 2,3 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('c', 2)}
                                    {renderInput('c', 3)}
                                </div>
                                {/* Horizontal Pair C: 4,5 */}
                                <div className="flex justify-between w-full px-2">
                                    {renderInput('c', 4)}
                                    {renderInput('c', 5)}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section B */}
                        <div className="border-t border-black h-28 flex">
                            {/* Left Part (Matches A Width) */}
                            <div className="w-36 flex justify-center items-center">
                                {/* Bottom Triangle B: indices 0,1,2 */}
                                <div className="flex justify-between flex-col items-center h-25 w-30">
                                    <div className="flex w-full justify-between">
                                        {renderInput('b', 0)}
                                        {renderInput('b', 1)}
                                    </div>
                                    {renderInput('b', 2)}
                                </div>
                            </div>

                            {/* Center Part */}
                            <div className="flex-1 flex justify-between items-end px-8 relative">
                                {/* Vertical Pair B: 3,4 */}
                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('b', 3)}
                                    {renderInput('b', 4)}
                                </div>

                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('b', 5)}
                                    <span className="text-xl leading-none">ø</span>
                                </div>

                                {/* Vertical Pair B: 7,8 */}
                                <div className="flex flex-col items-center justify-between h-full py-0.5">
                                    {renderInput('b', 7)}
                                    {renderInput('b', 8)}
                                </div>
                            </div>

                            {/* Right Part (Matches C Width) */}
                            <div className="w-36 flex justify-center items-center">
                                {/* Bottom Triangle B: indices 9,10,11 */}
                                <div className="flex justify-between flex-col items-center h-25 w-30">
                                    <div className="flex w-full justify-between">
                                        {renderInput('b', 9)}
                                        {renderInput('b', 10)}
                                    </div>
                                    {renderInput('b', 11)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Panel - ด้านขวา */}
            <div className="text-xs space-y-1" style={{ minWidth: '280px' }}>
                <div>ค่า DIF แผ่นเดียวกัน <span className="text-gray-500">(STD MAX {maxDiff} μm)</span></div>
                <div>ค่า DIF แผ่นติดกัน <span className="text-gray-500">(STD MAX {maxCornerDiff} μm)</span></div>
                <div>ค่า DIF จุดติดกัน <span className="text-gray-500">(STD MAX {maxAdjacentDiff} μm)</span></div>
                <div>ค่า DIF รวมทั้ง 4 แผ่น <span className="text-gray-500">(STD MAX {maxTotalDiff} μm)</span></div>

                <div className="mt-4 space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                        <span>MAX =</span>
                        <span className="border-b border-gray-400 px-2 min-w-16 text-center">
                            {allValues.length > 0 ? totalMax.toFixed(1) : ''}
                        </span>
                        <span>μm</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>MIN =</span>
                        <span className="border-b border-gray-400 px-2 min-w-16 text-center">
                            {allValues.length > 0 ? totalMin.toFixed(1) : ''}
                        </span>
                        <span>μm</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Diff A,B,C,D =</span>
                        <span className={`border-b px-2 min-w-16 text-center ${validTotalDiff ? 'border-gray-400' : 'border-red-500 text-red-600 font-bold'}`}>
                            {allValues.length > 0 ? totalDiff.toFixed(1) : ''}
                        </span>
                        <span>μm</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkstandCheck;
