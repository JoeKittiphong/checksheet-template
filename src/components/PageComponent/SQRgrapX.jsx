import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { cleanNumericInput } from '../../utils/formatUtils';

/**
 * SQRgrapX Component
 * แสดงกราฟ Squareness X Axis
 * - แสดงเส้นกราฟ L shape (X horizontal, Y vertical)
 * - จุดวัด 3 จุด (Top, Mid, Bot) คลิกเพื่อกรอกค่า
 * 
 * @param {Object} props
 * @param {string} props.value - ค่าที่กรอก (Input หลักด้านล่าง)
 * @param {Function} props.onChange - callback เมื่อค่าเปลี่ยน
 * @param {string} [props.topLabel="X"] - Label for the top axis.
 * @param {string} [props.rightLabel="Y"] - Label for the right axis.
 * @param {string} [props.inputLabel="X+ ="] - Label for the input field.
 * @param {boolean} [props.showTopSigns=false] - Whether to show +/- signs on the top axis.
 * @param {boolean} [props.showZeros=false] - Whether to show 0 markers on the top axis.
 */
function SQRgrapX({
    value = '',
    onChange = () => { },
    topLabel = "X",
    rightLabel = "Y",
    inputLabel = "X+ =",
    showTopSigns = false, // Show +/- for top axis
    showZeros = false,    // Show 0 markers
}) {
    const { formState: { isSubmitted } } = useFormContext(); // Get submission state
    // State for points: mid1, mid2, bot (Top is fixed at 0)
    // Values in μm
    const [points, setPoints] = useState({ mid1: 0, mid2: 0, bot: 0 });

    // UI State
    const [activePoint, setActivePoint] = useState(null); // 'mid1', 'mid2', 'bot'
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    // Selection Handling
    const [isSelected, setIsSelected] = useState(false);

    const handleGraphClick = (e) => {
        e.stopPropagation(); // Prevent background click from deselecting immediately
        setIsSelected(true);
    };

    const handleBackgroundClick = () => {
        setIsSelected(false);
    };

    // Configuration
    const startX = 160;   // Center X (Zero line)
    const scale = 5;      // 1 μm = 5 pixels

    // Distribute Y positions evenly
    const yPositions = {
        top: 30,  // Fixed start
        mid1: 60, // ~1/3 down
        mid2: 90, // ~2/3 down
        bot: 120  // End
    };

    // Calculate X pixel position for a given μm value
    // Direction: Positive -> Left (-x), Negative -> Right (+x)
    const getX = (val) => {
        const num = parseFloat(val) || 0;
        // Direction from previous tasks: val > 0 moves LEFT
        return startX - (num * scale);
    };

    const handlePointClick = (pointKey) => {
        setActivePoint(pointKey);
        setInputValue(points[pointKey].toString());
    };

    const handleInputChange = (e) => {
        setInputValue(cleanNumericInput(e.target.value));
    };

    const submitValue = () => {
        if (activePoint) {
            const num = parseFloat(inputValue);
            setPoints(prev => ({
                ...prev,
                [activePoint]: isNaN(num) ? 0 : num
            }));
            setActivePoint(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitValue();
        }
    };

    const handleBlur = () => {
        submitValue();
    };

    // Auto focus input when active
    useEffect(() => {
        if (activePoint && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activePoint]);

    // Auto-calculate Diff and update parent
    useEffect(() => {
        const values = [0, points.mid1, points.mid2, points.bot];
        const max = Math.max(...values);
        const min = Math.min(...values);
        // Diff = Max - Min
        const diff = Math.abs(max - min); // abs just in case, but max-min is always >= 0

        // Format to remove trailing zeros if integer, or keep decimals if necessary
        // Assuming integer inputs usually, but let's be safe
        const formattedDiff = Number.isInteger(diff) ? diff.toString() : diff.toFixed(3).replace(/\.?0+$/, '');

        // Only trigger onChange if value is different to avoid loops (though parent likely handles it)
        if (formattedDiff !== value) {
            onChange(formattedDiff);
        }
    }, [points, onChange, value]);

    // Path: Top -> Mid1 -> Mid2 -> Bot
    const xTop = startX; // Fixed at 0
    const xMid1 = getX(points.mid1);
    const xMid2 = getX(points.mid2);
    const xBot = getX(points.bot);

    // Quadratic curve for smoother look? Or Polyline?
    // User asked "Create line from input". 
    // Usually squareness graph is a curve or line segments.
    // Let's use Q curve for smoother connection if it's "squareness ERROR curve".
    // Or 2 segments if it's strictly point-to-point. 
    // Let's stick to Polyline (L) as it's accurate to the points.
    // Or maybe Q curve: Start -> Control(Mid) -> End ? No, Mid is a point ON the line.
    // Spline would be best. 
    // Let's try quadratic bezier passing through Mid? Not trivial with 1 control point.
    // To pass THROUGH mid, we need 2 curves: Top->Mid and Mid->Bot.
    const redLinePath = `M ${xTop} ${yPositions.top} L ${xMid1} ${yPositions.mid1} L ${xMid2} ${yPositions.mid2} L ${xBot} ${yPositions.bot}`;

    return (
        <div className="border border-black bg-white p-4 w-64 h-48 relative">
            {/* SVG Graph */}
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 150"
                className="absolute top-0 left-0"
                onClick={handleBackgroundClick}
            >
                <defs>
                    <marker
                        id="arrowhead-red"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="brown" />
                    </marker>
                </defs>

                {/* Lines */}
                <line x1="80" y1="30" x2="160" y2="30" stroke="black" strokeWidth="1.5" />
                <line x1="160" y1="30" x2="160" y2="120" stroke="black" strokeWidth="1.5" />
                <line x1="80" y1="25" x2="80" y2="35" stroke="black" strokeWidth="1.5" />
                <line x1="155" y1="120" x2="165" y2="120" stroke="black" strokeWidth="1.5" />

                {/* Invisible Hit Area for Selection */}
                <path
                    d={redLinePath}
                    stroke="transparent"
                    strokeWidth="20"
                    fill="none"
                    className="cursor-pointer"
                    onClick={handleGraphClick}
                />

                {/* Red Graph Line */}
                <path
                    d={redLinePath}
                    stroke="brown"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#arrowhead-red)"
                    className="pointer-events-none"
                    style={{ pointerEvents: 'none' }} // Ensure clicks simulate pass-through to invisible path if needed, but hit area handles it
                />

                {/* Clickable Points and Values */}
                {['mid1', 'mid2', 'bot'].map((key) => {
                    const cx = getX(points[key]);
                    const cy = yPositions[key];
                    const val = points[key];
                    return (
                        <g key={key}>
                            {/* The Point - Visible Only When Selected */}
                            {isSelected && (
                                <circle
                                    cx={cx}
                                    cy={cy}
                                    r="5"
                                    fill="blue"
                                    stroke="white"
                                    className="cursor-pointer hover:fill-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePointClick(key);
                                    }}
                                >
                                    <title>Click to edit value</title>
                                </circle>
                            )}

                            {/* Value Label */}
                            <text
                                x={cx + 8}
                                y={cy + 4}
                                fontSize="10"
                                fill="blue"
                                fontWeight="bold"
                                className="pointer-events-none"
                            >
                                {val !== 0 ? val : ''}
                            </text>
                        </g>
                    );
                })}

                {/* Top Label (X) */}
                <text x="65" y="35" fontSize="14" textAnchor="end">{topLabel}</text>

                {/* Top Signs (+/-) */}
                {showTopSigns && (
                    <>
                        <text x="65" y="20" fontSize="12" textAnchor="end">-</text>
                        <text x="65" y="50" fontSize="12" textAnchor="end">+</text>
                    </>
                )}

                {/* Zeros (0) on top line */}
                {showZeros && (
                    <>
                        <text x="85" y="25" fontSize="12" textAnchor="start">0</text>
                        <text x="160" y="25" fontSize="12" textAnchor="middle">0</text>
                    </>
                )}

                {/* Right Label (Y) */}
                <text x="160" y="140" fontSize="14" textAnchor="middle">{rightLabel}</text>

                {/* Bottom Signs (+/-) for Y */}
                <text x="145" y="125" fontSize="12" textAnchor="end">+</text>
                <text x="175" y="125" fontSize="12" textAnchor="start">-</text>
            </svg>

            {/* Input Field Popover */}
            {activePoint && (
                <div
                    className="absolute bg-white border border-gray-400 p-1 flex items-center shadow-md rounded"
                    style={{
                        left: `${(getX(points[activePoint]) / 200) * 100}%`,
                        top: `${(yPositions[activePoint] / 150) * 100}%`,
                        transform: 'translate(10px, -50%)', // Shift right of the point
                        zIndex: 10
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-12 text-center outline-none border-b border-gray-300 text-sm"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />
                    <span className="text-xs ml-1">μm</span>
                </div>
            )}

            {/* Input Field Area */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-end">
                <span className="mr-2 text-sm font-medium">{inputLabel}</span>
                <input
                    type="text"
                    inputMode="numeric"
                    className={`w-16 border-b text-center outline-none bg-transparent text-sm ${isSubmitted && !value ? 'border-red-500 bg-red-50' : 'border-black'}`}
                    value={value}
                    onChange={(e) => {
                        const cleanVal = e.target.value.replace(/[^0-9.\-]/g, '');
                        onChange(cleanVal);
                    }}
                />
                <span className="ml-1 text-sm">μm</span>
            </div>
        </div>
    );
}

export default SQRgrapX;
