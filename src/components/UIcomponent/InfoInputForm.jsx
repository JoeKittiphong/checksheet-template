import { useAuth } from '../../context/AuthContext';
import { useKeypad } from '../../context/KeypadContext';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

/**
 * InfoInputForm Component
 * ฟอร์มกรอกข้อมูลเครื่องจักร: Model, Spec, Machine No., Controller No., Start/Finish Date, Option
 */
function InfoInputForm({
    formData = {},
    model = "", // Receive model from props
    onChange = () => { }
}) {
    const { openKeypad, isKeypadEnabled } = useKeypad();
    const { user } = useAuth(); // Get user
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isWorker = user?.role === 'worker'; // Check if worker

    // Add validation
    const { register } = useFormContext();
    useEffect(() => {
        register('machineNo', { required: true });
        register('controllerNo', { required: true });
        // register('startDate', { required: true }); // Start/Finish Date might be optional? User didn't specify.
        // Usually Machine No is critical. I'll require Machine/Controller No for now.
    }, [register]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const handleInputClick = (name, value, label) => {
        if (!isWorker && (isMobile || isKeypadEnabled)) { // Disable keypad for restricted fields if worker
            openKeypad(name, value, { label, mode: 'text' });
        }
    };

    // Keypad handler for allowed fields
    const handleAllowedInputClick = (name, value, label) => {
        if (isMobile || isKeypadEnabled) {
            openKeypad(name, value, { label, mode: 'text' });
        }
    };

    const bgGreenLight = 'bg-green-200';
    const bgRestricted = isWorker ? 'bg-gray-300' : bgGreenLight; // Visual cue

    return (
        <div className="mt-12 flex justify-center">
            <table className="w-[65%] border-collapse table-fixed">
                <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                    {/* Model Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">MODEL:</td>
                        <td className={`border-b border-black ${bgGreenLight} p-0 min-h-9 relative`}>
                            {/* Check if model contains & */}
                            {model && model.includes('&') ? (
                                // Multiple models - show radio selection
                                <div className="w-full h-full flex items-center justify-center gap-6 py-1">
                                    {model.split('&').map((m, idx) => {
                                        const trimmedModel = m.trim();
                                        return (
                                            <label key={idx} className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="model"
                                                    value={trimmedModel}
                                                    checked={formData.model === trimmedModel}
                                                    onChange={(e) => onChange('model', e.target.value)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="font-medium text-sm">{trimmedModel}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            ) : (
                                // Single model - show as text
                                <div className="w-full h-full flex items-center justify-center font-medium text-sm">
                                    {model || formData.model || ''}
                                </div>
                            )}
                        </td>
                    </tr>



                    {/* Machine No Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">MACHINE NO:</td>
                        <td className={`border-b border-black ${bgRestricted} p-0 h-9`}>
                            <input
                                type="text"
                                name="machineNo"
                                value={formData.machineNo || ''}
                                readOnly={isMobile || isWorker} // Restricted for worker
                                inputMode={isMobile ? "none" : "text"}
                                onClick={(e) => {
                                    if (isWorker) return;
                                    isMobile && e.target.blur();
                                    handleInputClick('machineNo', formData.machineNo || '', 'MACHINE NO');
                                }}
                                onFocus={(e) => {
                                    if (isWorker) return;
                                    isMobile && e.target.blur();
                                    isMobile && handleInputClick('machineNo', formData.machineNo || '', 'MACHINE NO');
                                }}
                                onChange={handleChange}
                                className={`w-full h-full bg-transparent text-center outline-none font-medium text-sm ${isWorker ? 'cursor-not-allowed text-gray-600' : 'cursor-pointer'}`}
                                placeholder={isWorker ? "" : "Enter Machine No."}
                            />
                        </td>
                    </tr>

                    {/* Controller No Row */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">CONTROLLER NO.</td>
                        <td className={`border-b border-black ${bgRestricted} p-0 h-9`}>
                            <input
                                type="text"
                                name="controllerNo"
                                value={formData.controllerNo || ''}
                                readOnly={isMobile || isWorker} // Restricted for worker
                                inputMode={isMobile ? "none" : "text"}
                                onClick={(e) => {
                                    if (isWorker) return;
                                    isMobile && e.target.blur();
                                    handleInputClick('controllerNo', formData.controllerNo || '', 'CONTROLLER NO');
                                }}
                                onFocus={(e) => {
                                    if (isWorker) return;
                                    isMobile && e.target.blur();
                                    isMobile && handleInputClick('controllerNo', formData.controllerNo || '', 'CONTROLLER NO');
                                }}
                                onChange={handleChange}
                                className={`w-full h-full bg-transparent text-center outline-none font-medium text-sm ${isWorker ? 'cursor-not-allowed text-gray-600' : 'cursor-pointer'}`}
                                placeholder={isWorker ? "" : "Enter Controller No."}
                            />
                        </td>
                    </tr>

                    {/* Start Date */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">START DATE :</td>
                        <td className="border-b border-black bg-yellow-300 p-0 h-9 relative flex items-center justify-center">
                            <input
                                type="date"
                                name="startDate"
                                style={{ textAlign: 'center', textAlignLast: 'center' }}
                                className="w-full h-full bg-transparent outline-none font-medium text-sm cursor-pointer text-center [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-date-and-time-value]:text-center [&::-webkit-datetime-edit]:flex [&::-webkit-datetime-edit]:justify-center"
                                value={formData.startDate || ''}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    {/* Finish Date */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm">FINISH DATE:</td>
                        <td className="border-b border-black bg-yellow-300 p-0 h-9 relative flex items-center justify-center">
                            <input
                                type="date"
                                name="finishDate"
                                style={{ textAlign: 'center', textAlignLast: 'center' }}
                                className="w-full h-full bg-transparent outline-none font-medium text-sm cursor-pointer text-center [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-date-and-time-value]:text-center [&::-webkit-datetime-edit]:flex [&::-webkit-datetime-edit]:justify-center"
                                value={formData.finishDate || ''}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>

                    {/* Options (Single Textarea) */}
                    <tr>
                        <td className="text-right pr-4 py-2 font-medium text-sm align-top pt-2">OPTION:</td>
                        <td className="p-0">
                            <textarea
                                name="options"
                                value={formData.options || ''}
                                onChange={handleChange}
                                placeholder="Enter options..."
                                className="w-full h-40 bg-yellow-300 px-2 py-1 outline-none resize-none text-sm"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InfoInputForm;
