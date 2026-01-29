import React from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * StartFinishTime Component
 * Input สำหรับ Start/Finish time และคำนวณ Total Hours
 * 
 * @param {Object} props
 * @param {string} props.startTime - เวลาเริ่มต้น (format: HH:MM)
 * @param {string} props.finishTime - เวลาสิ้นสุด (format: HH:MM)
 * @param {Function} props.onStartChange - callback เมื่อ start time เปลี่ยน
 * @param {Function} props.onFinishChange - callback เมื่อ finish time เปลี่ยน
 * @param {number} props.minHours - ค่า standard ต่ำสุด (default: 0)
 * @param {boolean} props.validateStd - เปิด/ปิดการ validate (default: false)
 */
const StartFinishTime = React.forwardRef(({
    startTime = '',
    finishTime = '',
    onStartChange = () => { },
    onFinishChange = () => { },
    minHours = 0,
    validateStd = false
}, ref) => {
    const { formState: { isSubmitted } } = useFormContext(); // Global validation state
    // คำนวณ Total Hours
    const calculateTotalHours = () => {
        if (!startTime || !finishTime) return '';

        const [startHour, startMin] = startTime.split(':').map(Number);
        const [finishHour, finishMin] = finishTime.split(':').map(Number);

        if (isNaN(startHour) || isNaN(startMin) || isNaN(finishHour) || isNaN(finishMin)) {
            return '';
        }

        const startMinutes = startHour * 60 + startMin;
        let finishMinutes = finishHour * 60 + finishMin;

        // ถ้า finish < start ให้ถือว่าข้ามวัน
        if (finishMinutes < startMinutes) {
            finishMinutes += 24 * 60;
        }

        const diffMinutes = finishMinutes - startMinutes;
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;

        if (mins === 0) {
            return hours.toString();
        }
        return `${hours}:${mins.toString().padStart(2, '0')}`;
    };

    const totalHours = calculateTotalHours();

    // Validate total hours against minHours
    const isValid = () => {
        if (!validateStd) return true;
        if (totalHours === '') return true;

        // แปลง totalHours เป็นตัวเลข (ชั่วโมง)
        const parts = totalHours.split(':');
        const hours = parseFloat(parts[0]) + (parts[1] ? parseFloat(parts[1]) / 60 : 0);

        return hours >= minHours;
    };

    return (
        <div className="flex items-center text-sm space-x-4">
            {/* Start */}
            <div className="flex items-center">
                <span className="mr-2">Start :</span>
                <input
                    ref={ref}
                    type="time"
                    value={startTime}
                    onChange={(e) => onStartChange(e.target.value)}
                    className={`border-b outline-none px-1 text-center w-28 ${isSubmitted && !startTime ? 'border-red-500 bg-red-50' : 'border-black'}`}
                />
            </div>

            {/* Finish */}
            <div className="flex items-center">
                <span className="mr-2">Finish :</span>
                <input
                    type="time"
                    value={finishTime}
                    onChange={(e) => onFinishChange(e.target.value)}
                    className={`border-b outline-none px-1 text-center w-28 ${isSubmitted && !finishTime ? 'border-red-500 bg-red-50' : 'border-black'}`}
                />
            </div>

            {/* Total */}
            <div className="flex items-center">
                <span className="mr-2">Total :</span>
                <span className={`border-b border-black px-1 text-center w-20 inline-block ${!isValid() ? 'bg-red-200' : ''}`}>
                    {totalHours}
                </span>
                <span className="ml-2">Hrs.</span>
            </div>
        </div>
    );
});

export default StartFinishTime;
