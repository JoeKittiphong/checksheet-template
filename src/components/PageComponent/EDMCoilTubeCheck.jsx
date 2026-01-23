

/**
 * EDMCoilTubeCheck Component
 * ตารางเช็ค Coil Tube IN/OUT สำหรับแต่ละ Axis
 * - Column 1: Axis (X, Y(KC), Y(KB))
 * - Column 2: Check (Coil "IN", Coil "OUT")
 * - Column 3: ทดสอบด้วยการดึง (checkbox)
 * 
 * @param {Object} props
 * @param {Object} props.data - ข้อมูล checkbox { x: { in: false, out: false }, ykc: { in: false, out: false }, ykb: { in: false, out: false } }
 * @param {Function} props.onChange - callback เมื่อข้อมูลเปลี่ยน
 */
function EDMCoilTubeCheck({
    data = {
        x: { in: false, out: false },
        ykc: { in: false, out: false },
        ykb: { in: false, out: false }
    },
    onChange = () => { }
}) {
    const handleCheckChange = (axis, type) => {
        const newData = { ...data };
        if (!newData[axis]) {
            newData[axis] = { in: false, out: false };
        }
        newData[axis][type] = !newData[axis][type];
        onChange(newData);
    };

    const axisConfig = [
        { key: 'x', label: 'x', rowSpan: 2 },
        { key: 'ykc', label: 'Y(KC)', rowSpan: 2 },
        { key: 'ykb', label: 'Y(KB)', rowSpan: 2 }
    ];

    const renderRows = () => {
        const rows = [];

        axisConfig.forEach((axis) => {
            // First row (Coil "IN")
            rows.push(
                <tr key={`${axis.key}-in`}>
                    <td
                        className="border border-black p-1 text-center font-medium"
                        rowSpan={2}
                    >
                        {axis.label}
                    </td>
                    <td className="border border-black p-1 text-center">Coil "IN"</td>
                    <td className="border border-black p-1 text-center">
                        <input
                            type="checkbox"
                            checked={data[axis.key]?.in || false}
                            onChange={() => handleCheckChange(axis.key, 'in')}
                            className="w-4 h-4 cursor-pointer"
                        />
                    </td>
                </tr>
            );

            // Second row (Coil "OUT")
            rows.push(
                <tr key={`${axis.key}-out`}>
                    <td className="border border-black p-1 text-center">Coil "OUT"</td>
                    <td className="border border-black p-1 text-center">
                        <input
                            type="checkbox"
                            checked={data[axis.key]?.out || false}
                            onChange={() => handleCheckChange(axis.key, 'out')}
                            className="w-4 h-4 cursor-pointer"
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
}

export default EDMCoilTubeCheck;
