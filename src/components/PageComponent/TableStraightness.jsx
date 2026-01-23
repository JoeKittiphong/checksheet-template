import { useRef, useState } from 'react';
import { validateValue } from '../../utils/validationUtils';
import { cleanNumericInput } from '../../utils/formatUtils';
import { useFocusNavigation } from '../../hooks/useFocusNavigation';

/**
 * TableStraightness Component
 * ตารางแสดงข้อมูล Straightness สำหรับ Y Axis
 * - คอลัมน์: Step, Stork, Top (Data), Side (Data)
 * - แสดงค่าตัวเลขปกติ (ไม่ใช้ลูกศร)
 * - Diff Max-Min: คำนวณ max - min ของ Top และ Side
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล { top: [], side: [] }
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 * @param {Object} props.standard - ค่า STD {min: -2, max: 2} สำหรับ Data
 * @param {Object} props.diffStandard - ค่า STD สำหรับ Diff {max: 2}
 * @param {number} props.rows - จำนวนแถว (default = 16)
 * @param {string} props.axisLabel - ชื่อแกน (default = "Y Axis.")
 * @param {string} props.topLabel - ชื่อหัวตาราง Top (default = "Top")
 * @param {string} props.sideLabel - ชื่อหัวตาราง Side (default = "Side")
 */
function TableStraightness({
    data = { top: [], side: [] },
    onChange = () => { },
    standard = { min: -2, max: 2 },
    diffStandard = { max: 2 },
    rows = 16,
    axisLabel = "Y Axis.",
    topLabel = "Top",
    sideLabel = "Side"
}) {
    const { moveFocus } = useFocusNavigation();
    const inputRefsTop = useRef([]);
    const inputRefsSide = useRef([]);

    // Track which cell is being edited
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    // แปลงค่าที่แสดง (แสดงค่าตามจริง ไม่ต้องแปลงเป็นลูกศร)
    const formatDisplay = (value) => {
        if (value === '' || value === undefined || value === null) return '';
        return value;
    };

    // แปลงค่าจาก input (รองรับตัวเลขและเครื่องหมายลบ)
    const parseInput = (value) => {
        if (value === '' || value === undefined || value === null) return '';
        const cleanValue = value.replace(/[^0-9.\-]/g, '');
        if (cleanValue === '-' || cleanValue === '-.') return cleanValue;
        return cleanValue;
    };

    // เมื่อ focus
    const handleFocus = (col, index) => {
        const colData = data[col] || [];
        const currentValue = colData[index] || '';
        setEditingCell({ col, index });
        setEditingValue(currentValue);
    };

    // เมื่อพิมพ์
    const handleInputChange = (value) => {
        setEditingValue(cleanNumericInput(value));
    };

    // Ref to track if we just committed via Enter
    const justCommittedRef = useRef(false);

    // เมื่อ blur หรือ Enter
    const commitValue = (col, index) => {
        const numericValue = parseInput(editingValue);

        const newData = { ...data };
        if (!newData[col]) {
            newData[col] = [];
        }
        newData[col][index] = numericValue;
        onChange(newData);

        setEditingCell(null);
        setEditingValue('');
    };

    const handleBlur = (col, index) => {
        if (justCommittedRef.current) {
            justCommittedRef.current = false;
            return;
        }
        if (editingCell && editingCell.col === col && editingCell.index === index) {
            commitValue(col, index);
        }
    };

    // Handle Enter key - auto focus
    const handleKeyDown = (e, col, index) => {
        if (e.key === 'Enter') {
            justCommittedRef.current = true;
            commitValue(col, index);

            if (col === 'top') {
                moveFocus(e, index, inputRefsTop.current, {
                    direction: 1,
                    onBoundary: () => {
                        // Start Side row 0
                        if (inputRefsSide.current[0]) inputRefsSide.current[0].focus();
                    }
                });
            } else if (col === 'side') {
                moveFocus(e, index, inputRefsSide.current, { direction: 1 });
            }
        }
    };

    // Get display value
    const getInputValue = (col, index) => {
        const isEditing = editingCell && editingCell.col === col && editingCell.index === index;
        if (isEditing) {
            return editingValue;
        }
        const colData = data[col] || [];
        return formatDisplay(colData[index]);
    };

    // Validate value
    const isValid = (col, index) => {
        const colData = data[col] || [];
        return validateValue(colData[index], {
            min: standard.min,
            max: standard.max,
            validateStd: true
        });
    };

    // Calculate Diff Max-Min for a column
    const getDiffMaxMin = (col) => {
        const colData = data[col] || [];
        const values = [];
        for (let i = 0; i < rows; i++) {
            const val = parseFloat(colData[i]);
            if (!isNaN(val)) {
                values.push(val);
            }
        }
        if (values.length < 2) return '';
        const maxVal = Math.max(...values);
        const minVal = Math.min(...values);
        return Math.abs(maxVal - minVal).toFixed(2).replace(/\.?0+$/, '');
    };

    // Validate Diff Max-Min value
    const isDiffValid = (col) => {
        return validateValue(getDiffMaxMin(col), {
            maxValue: diffStandard.max,
            validateStd: true
        });
    };

    // Generate rows data (Step starts from 0, goes up)
    const generateRows = () => {
        const rowElements = [];
        for (let i = 0; i < rows; i++) {
            // Display step in descending order (rows-1 to 0)
            const displayStep = rows - 1 - i;
            const stork = displayStep * 20;
            const dataIndex = displayStep; // Index for data array

            const validTop = isValid('top', dataIndex);
            const validSide = isValid('side', dataIndex);

            rowElements.push(
                <tr key={i}>
                    <td className="border border-black p-1 text-center text-sm w-10">{displayStep}</td>
                    <td className="border border-black p-1 text-center text-sm w-12">{stork}</td>
                    <td className={`border border-black p-1 ${!validTop ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsTop.current[dataIndex] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('top', dataIndex)}
                            onFocus={() => handleFocus('top', dataIndex)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('top', dataIndex)}
                            onKeyDown={(e) => handleKeyDown(e, 'top', dataIndex)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                    <td className={`border border-black p-1 ${!validSide ? 'bg-red-200' : ''}`}>
                        <input
                            ref={(el) => (inputRefsSide.current[dataIndex] = el)}
                            type="text"
                            inputMode="numeric"
                            value={getInputValue('side', dataIndex)}
                            onFocus={() => handleFocus('side', dataIndex)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onBlur={() => handleBlur('side', dataIndex)}
                            onKeyDown={(e) => handleKeyDown(e, 'side', dataIndex)}
                            className="w-full h-full text-center bg-transparent outline-none text-sm"
                        />
                    </td>
                </tr>
            );
        }
        return rowElements;
    };

    return (
        <div className="inline-block">
            <table className="border-collapse border border-black text-sm">
                <thead>
                    <tr>
                        <th colSpan={4} className="border border-black p-1 text-center bg-gray-100">
                            {axisLabel}
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={2} className="border border-black p-1"></th>
                        <th className="border border-black p-1 text-center">{topLabel}</th>
                        <th className="border border-black p-1 text-center">{sideLabel}</th>
                    </tr>
                    <tr>
                        <th className="border border-black p-1 text-center" style={{ width: '35px' }}>Step</th>
                        <th className="border border-black p-1 text-center" style={{ width: '45px' }}>Stork</th>
                        <th className="border border-black p-1 text-center" style={{ width: '60px' }}>Data</th>
                        <th className="border border-black p-1 text-center" style={{ width: '60px' }}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {generateRows()}
                    {/* Footer rows */}
                    <tr>
                        <td colSpan={2} className="border border-black p-1 font-medium">Diff Max-Min</td>
                        <td className={`border border-black p-1 text-center ${!isDiffValid('top') ? 'bg-red-200' : ''}`}>
                            {getDiffMaxMin('top')} μm
                        </td>
                        <td className={`border border-black p-1 text-center ${!isDiffValid('side') ? 'bg-red-200' : ''}`}>
                            {getDiffMaxMin('side')} μm
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border border-black p-1 font-medium">Std.</td>
                        <td colSpan={2} className="border border-black p-1">≤ {diffStandard.max} μm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TableStraightness;
